import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from 'hono/jwt'
import { PrismaClient } from "../generated/prisma/client";

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

  const user = await verify(token, c.env.JWT_SECRET, 'HS256');
  if(user.id){
    c.set('userId', String(user.id))
    return next()
  } else {
    return c.json({ error: 'Unauthorized' }, 401)
  }
})

blogRouter.post('/', async(c) => {
    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const userId = c.get('userId');

    await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        }
    })
    return c.json({
      id: userId
    })
})
blogRouter.put('/', async(c) => {
  const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const userId = c.get('userId');

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
      id: userId
    })
})
blogRouter.get('/:id', async(c) => {
  const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    try{
      const blog = await prisma.post.findFirst({
          where:{
              id: body.id
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