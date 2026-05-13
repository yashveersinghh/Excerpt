import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from 'hono/jwt'
import { PrismaClient } from "../generated/prisma/client";
import { signinInput, signupInput } from "@yashveersinghh/excerpt-common";
import bcrypt from "bcryptjs";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();


userRouter.post('/signup', async (c) => {
  const body = await c.req.json();
  const email = body?.email ?? body?.username;
  if (!email || !body?.password) {
    return c.json({ error: 'Email and password are required' }, 400)
  }
  const success = signupInput.safeParse({
    ...body,
    email,
  });
  if (!success.success) {
    return c.json({ error: 'Invalid input', details: success.error }, 400)
  }
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data:{
        email,
        password: hashedPassword,
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

userRouter.post('/signin', async (c) => {
  const body = await c.req.json();
  const email = body?.email ?? body?.username;
  const success = signinInput.safeParse({
    ...body,
    email,
  });
  if (!success.success) {
    return c.json({ error: 'Invalid input', details: success.error }, 400)
  }
	const prisma = new PrismaClient({
		accelerateUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const user = await prisma.user.findUnique({
		where: {
      email,
		}
	});

	if (!user) {
		c.status(403);
		return c.json({ error: "user not found" });
	}

  const isPasswordValid = await bcrypt.compare(body.password, user.password);
  if (!isPasswordValid) {
    c.status(403);
    return c.json({ error: "invalid password" });
  }

	const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
	return c.json({ jwt });
})