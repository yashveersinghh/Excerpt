import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from 'hono/jwt'
import { PrismaClient } from "../generated/prisma/client";
import { createBlogInput } from "@yashveersinghh/excerpt-common";
import { GoogleGenAI } from "@google/genai";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
        GEMINI_API_KEY: string
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use('/*', async (c, next) => {
  const authHeader = c.req.header('Authorization') || "";
  const token = authHeader.split(' ')[1];
  if (!token) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  try{
    const user = await verify(token, c.env.JWT_SECRET, 'HS256');
    if(user.id){
      c.set('userId', String(user.id))
      return next()
    } else {
      return c.json({ error: 'Unauthorized' }, 401)
    }
  } catch (error) {
    console.error('JWT verification failed:', error)
    return c.json({ error: 'Unauthorized' }, 401)
  }
})

blogRouter.post('/', async(c) => {
  try {
    const body = await c.req.json();
    const parsed = createBlogInput.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: 'Invalid input', details: parsed.error.flatten() }, 400)
    }
    const data = parsed.data;
    const prisma = new PrismaClient({
      accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const userId = c.get('userId');

    const blog = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: userId,
        summary: data.summary,
        publishedAt: new Date(data.publishedAt),
        imageUrl: data.imageUrl ?? null,
      },
    });
    return c.json({ id: blog.id });
  } catch (err) {
    console.error('Create blog error:', err);
    const message =
      err && typeof err === 'object' && 'message' in err
        ? String((err as { message: unknown }).message)
        : String(err);
    if (message.includes('column') || message.includes('does not exist')) {
      return c.json(
        {
          error: 'Database schema is out of date. Run: npx prisma migrate deploy',
          details: message,
        },
        500
      );
    }
    return c.json({ error: 'Create blog failed', details: message }, 500);
  }
})
blogRouter.put('/', async(c) => {
  const body = await c.req.json();
  const parsed = createBlogInput.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: 'Invalid input', details: parsed.error.flatten() }, 400)
    }
  const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    if (!body?.id) {
      return c.json({ error: 'id is required' }, 400)
    }

    const data = parsed.data;

    try {
      await prisma.post.update({
          where:{
              id: body.id
          },
          data: {
              title: data.title,
              content: data.content,
              summary: data.summary,
              publishedAt: new Date(data.publishedAt),
              imageUrl: data.imageUrl ?? null
          }
      })
      return c.json({
        id: body.id
      })
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
        return c.json({ error: 'Blog not found' }, 404)
      }

      console.error('Update blog failed:', error)
      return c.json({ error: 'Internal Server Error' }, 500)
    }
})
blogRouter.delete('/:id', async(c) => {
    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const id = c.req.param('id');

    try {
      await prisma.post.delete({
        where: { id }
      })
      return c.json({ message: 'Blog deleted successfully' })
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
        return c.json({ error: 'Blog not found' }, 404)
      }

      console.error('Delete blog failed:', error)
      return c.json({ error: 'Internal Server Error' }, 500)
    }
})
//add pagination
blogRouter.get('/bulk', async(c) => {
  try {
    const prisma = new PrismaClient({
      accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.post.findMany({
      select: {
        content: true,
        id: true,
        title: true,
        summary: true,
        publishedAt: true,
        imageUrl: true,
        author: {
          select: {
            name: true
          }
        }
      },
      orderBy: { publishedAt: 'desc' }
    });
    return c.json({
      blogs
    })
  } catch (err) {
    console.error('Fetch bulk blogs error:', err);
    return c.json({ error: 'Failed to fetch blogs', details: String(err) }, 500);
  }
})

blogRouter.get('/:id', async(c) => {
  try {
    const prisma = new PrismaClient({
      accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const id = await c.req.param('id');
    const blog = await prisma.post.findFirst({
      where: { id: id },
      select: {
        content: true,
        id: true,
        title: true,
        summary: true,
        publishedAt: true,
        imageUrl: true,
        author: {
          select: {
            name: true
          }
        }
      }
    })
    if (!blog) {
      c.status(404);
      return c.json({ error: 'Blog not found' })
    }
    return c.json({ blog })
  } catch (err) {
    console.error('Fetch blog error:', err);
    return c.json({ error: 'Failed to fetch blog', details: String(err) }, 500);
  }
})

blogRouter.post("/summarize", async (c) => {
  try {
    const body = await c.req.json();
    const { content } = body;

    if (!content || typeof content !== 'string') {
      return c.json({ error: 'content is required and must be a string' }, 400);
    }

    const apiKey = c.env.GEMINI_API_KEY;
    if (!apiKey) {
      return c.json({ error: 'Gemini API key is not configured' }, 500);
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Provide a concise, 2-sentence summary of the following blog post. Do not include any introductory phrases like "Here is a summary". Just return the summary:\n\n${content}`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API responded with status ${response.status}: ${errorText}`);
    }

    const data: any = await response.json();
    const summary = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

    return c.json({ summary });
  } catch (err) {
    console.error('Error generating summary:', err);
    return c.json({ error: 'Failed to generate summary', details: String(err) }, 500);
  }
});
