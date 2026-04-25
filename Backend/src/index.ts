import { Hono } from 'hono'
import { PrismaClient } from "./generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

app.use('/api/v1/blog/*', async (c, next) => {
  const authHeader = c.req.header('Authorization') || "";
  const token = authHeader.split(' ')[1];
  const response = await verify(token, c.env.JWT_SECRET, 'HS256');
  if(response.id){
    next()
  }else {
    return c.json({ error: 'Unauthorized' }, 401)
  }
})

app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    if (!body?.email || !body?.password) {
      return c.json({ error: 'Email and password are required' }, 400)
    }

    const user = await prisma.user.create({
      data:{
        email: body.email,
        password: body.password,
        name: body.name || null
      }
    })
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)

    return c.json({
      jwt: token
    })
  } catch (error) {
    console.error('Signup failed:', error)

    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return c.json({ error: 'Email already exists' }, 409)
    }

    return c.json({ error: 'Internal Server Error' }, 500)
  }
})

app.post('/api/v1/signin', async (c) => {
	const prisma = new PrismaClient({
		accelerateUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const user = await prisma.user.findUnique({
		where: {
			email: body.email,
      password: body.password
		}
	});

	if (!user) {
		c.status(403);
		return c.json({ error: "user not found" });
	}

	const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
	return c.json({ jwt });
})

app.post('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})
app.put('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})
app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})

export default app
