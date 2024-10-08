import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';

// as the ENV variables are not directly accessible, we have  to initilize it in each and every route
export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();


app.use('/*', cors())

app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)

export default app
