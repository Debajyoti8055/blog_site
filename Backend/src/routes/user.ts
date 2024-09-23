import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signupInput } from '@djdanger/medium-common-project'
// @djdanger/medium-common-blog-project
export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', async (c) => {

    const body = await c.req.json()
    const { success } = signupInput.safeParse(body)
    if (!success) {
        c.status(411)
        return c.json({
            message: 'Invalid input'
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // we are adding no check here because if the username is unique, defined in schema;  so put it in try catch block
    try {
        const user = await prisma.user.create({
            data: {
                username: body.username,
                password: body.password,
                name: body.name
            }
        })

        const jwt = await sign({
            id: user.id
        }, c.env.JWT_SECRET)
        return c.text(jwt)

    } catch (e) {
        console.log(e)
        c.status(411)
        return c.text('User already exists')

    }

})


userRouter.post('/signin', async (c) => {

    const body = await c.req.json()

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const user = await prisma.user.findFirst({
            where: {
                username: body.username,
                password: body.password,
            }
        })

        if (!user) {
            c.status(403) // unauthorized
            return c.json({
                message: 'Incorrect username or password'
            })
        }

        const jwt = await sign({
            id: user.id
        }, c.env.JWT_SECRET)
        return c.text(jwt)

    } catch (e) {
        console.log(e)
        c.status(411)
        return c.text('User already exists')
    }

})