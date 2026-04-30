import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from 'hono/jwt'
import { PrismaClient } from "../generated/prisma/client";
import { createBlogInput } from "@yashveersinghh/excerpt-common";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
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
    const body = await c.req.json();
    const success = createBlogInput.safeParse(body);
    if (!success.success) {
      return c.json({ error: 'Invalid input', details: success.error }, 400)
    }
    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const userId = c.get('userId');

  const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        }
    })
    return c.json({
    id: blog.id
    })
})
blogRouter.put('/', async(c) => {
  const body = await c.req.json();
  const success = createBlogInput.safeParse(body);
    if (!success.success) {
      return c.json({ error: 'Invalid input', details: success.error }, 400)
    }
  const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    if (!body?.id || !body?.title || !body?.content) {
      return c.json({ error: 'id, title and content are required' }, 400)
    }

    try {
      await prisma.post.update({
          where:{
              id: body.id
          },
          data: {
              title: body.title,
              content: body.content,
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
//add pagination
blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.post.findMany();
    return c.json({
      blogs
    })
})

blogRouter.get('/:id', async(c) => {
  const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const id = await c.req.param('id');
    try{
      const blog = await prisma.post.findFirst({
          where:{
              id: id
          }
      })
      return c.json({
        blog
      })
    } catch(e){
      c.status(404);
      return c.json({
        error: 'Blog not found'
      })
    }
})