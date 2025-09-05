import { Hono } from 'hono'
import { PrismaClient } from "../generated/prisma/edge.js";
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, decode, verify } from "hono/jwt"
import { auth } from 'hono/utils/basic-auth';
import { tr } from 'zod/locales';
import { cors } from 'hono/cors'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use('*', cors());

blogRouter.use("/*", async (c, next) => {
    const token = c.req.header("Authorization");

    if (!token) {
        return c.json({ message: "you need to signin first" }, 401);
    }
    try {
        const user = await verify(token, c.env.JWT_SECRET) as { id: string };

        if (user) {
            c.set("userId", user.id);
            await next();
        } else {
            return c.json({ message: "authorisation failed" }, 403);
        }
    }
    catch (e) {
        return c.text("jwt error");
    }


});
blogRouter.get('/bulk', async (c) => {
    // const body = await c.req.json();
    const author_id = parseInt(c.get("userId"));
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const posts = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            published: true,
            author: {
                select: {
                    name: true
                }
            }
        },
        where: {
            author_id: author_id
        }
    })
    if (!posts) {
        return c.json({
            message: "posts not found"
        })
    }
    return c.json({
        posts: posts
    })
})

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const author_id = parseInt(c.get("userId"));
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            author_id: author_id
        }
    })
    return c.json({
        id: blog.id
    })
})
blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const author_id = parseInt(c.get("userId"))
    const post = await prisma.post.findFirst({
        select: {
            id: true,
            title: true,
            content: true,
            published: true,
            author: {
                select: {
                    name: true
                }
            }
        },
        where: {
            author_id: author_id,
            id: parseInt(id)
        }
    })
    if (!post) {
        return c.json({
            message: "no blog for given blog id"
        })
    }
    return c.json({
        post: post
    })
})
blogRouter.put('/:id', async (c) => {
    const body = await c.req.json();
    const id=c.req.param();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const updatedpost = await prisma.post.update({
            where: {
                id: parseInt(id.id)
            },
            data: {
                title: body.title,
                content: body.content
            },
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                author: {
                    select: {
                        name: true
                    }
                }

            }
        })
        if (!updatedpost) {
            return c.json({
                message: "post not updated"
            })
        }
        return c.json({
            updatedpost:updatedpost
        })
    }
    catch (e) {
        c.json({
            message: "post not found"
        })
    }

})
