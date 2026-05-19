import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from 'hono/jwt'
import { PrismaClient } from "../generated/prisma/client";
import { signinInput, signupInput } from "@yashveersinghh/excerpt-common";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
        GOOGLE_CLIENT_ID: string
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

	// Use case-insensitive lookup so signup casing doesn't block signin
	const user = await prisma.user.findFirst({
		where: {
			email: {
				equals: email,
				mode: 'insensitive',
			},
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

userRouter.post('/google-auth', async(c)=>{
  const body = await c.req.json();
  const { token } = body;

  if(!token){
    return c.json({ error: 'Token is required'}, 400);
  }
  const client = new OAuth2Client(c.env.GOOGLE_CLIENT_ID);

  try{
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: c.env.GOOGLE_CLIENT_ID,
      })
    
      const payload = ticket.getPayload();
      if(!payload){
        return c.json({ error: 'Invalid token'}, 401);
      }
      const { email,name } = payload;
    
      const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    
      let user = await prisma.user.findUnique({
        where: { email: email! }
      })
    
      if(!user){
        user = await prisma.user.create({
          data:{
            email: email!,
            name: name || null,
            password: ''
          }
        })
      }
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt });
  } catch(err){
    console.error('Google authentication failed:', err);
    return c.json({ error: 'Google authentication failed'}, 401);
  }
})