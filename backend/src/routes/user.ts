import {Hono} from 'hono'
export const userRouter=new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    }
}>();
import { signoutinput, signininput} from "zod-validation-by-utkarsh"
import { PrismaClient } from "../generated/prisma/edge.js";
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, decode, verify } from "hono/jwt"
import { cors } from 'hono/cors'

userRouter.use('*', cors());
// any request coming to /api/v1/signup will be redirected here
userRouter.post('/signup', async (c) => {
  const body = await c.req.json();
  const {success} = signoutinput.safeParse(body);
  if(!success){
    return c.json({
        message:"missing/invalid format of credentials"
    })
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name
      }
    })
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);//needs to await 
    return c.json({
      token: token
    })
  }
  catch (e) {
    console.log(e);
    return c.text('email already exists')
  }


})
userRouter.post('/signin', async (c) => {
  const body = await c.req.json();
  const {success} = signininput.safeParse(body);
  if(!success){
    return c.json({
        message:"missing/invalid format of credentials"
    })
  }
  if(!body.email || !body.password){
    return c.json({
      message:"both email and password are required"
    })
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password
      }
    })
    if (!user) {
      c.status(403);
      return c.json({
        message: "user does not exists"
      })
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      message:"user found",
      token: token
    })
  }
  catch(e){
    c.json({
      message:"user not found"
    })
  }
})