import { Router } from "express";
import User from "../models/user.js";
import Blog from "../models/blog.js";

const testingRouter = Router()

testingRouter.post('/reset', async (req, res) => {
    await User.deleteMany({})
    await Blog.deleteMany({})
    res.status(204).end()
})


testingRouter.get('/', async (req, res) => {
    res.status(200).send("Testing route")
})
export default testingRouter