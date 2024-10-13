import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    // explicitly define extra variables to the context (c)
    Variables: {
        userId: string
    }
}>();

// all handles need to be authenticated
blogRouter.use("/*", async (c, next) => {

    const authHeader = c.req.header("authorization") || "" //if c.req.header is undefined, then default it to empty string, this is done to remove error in verify
    try {
        //authHeader will have our token and verify
        const user = await verify(authHeader, c.env.JWT_SECRET)
        if (user) {
            c.set("userId", user.id as string) // as i was still getting errors so I used user.id as string
            await next() //go to next handler
        } else {
            c.status(403)
            return c.json({
                message: "Unauthorized"
            })
        }
    } catch (e) {
        c.status(401)
        return c.json({
            message: "Unauthorized"
        })
    }
})



blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const authorId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId) // as authorId is a string and its expecting a number so convert it into Number
        }
    });
    return c.json({
        id: blog.id
    });
})

// to update title and content
blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    });
    return c.json({
        id: blog.id
    });
})


//ideally we should be adding "pagination" here, meaning we should be able to fetch 10 blog posts at a time and user can ask for more as the scroll down 

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.blog.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });
    return c.json({
        blogs
    });
})



blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id") //taking id from url
    // const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // might fail for multiple reason, the blog with this id doesn't exist or database connectoin error,etc
    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }

        });
        return c.json({
            blog
        });
    } catch (e) {
        c.status(411)
        return c.json({
            message: "error while fteching blog post"
        })
    }

})


