import Blog from "../models/blog.js";
import assert, { strictEqual } from "node:assert"
import supertest from "supertest";
import app from '../app.js'
import { beforeEach } from "node:test";
import logger from "../utils/logger.js";
import testhelper from "./testhelper.js";
import mongoose from "mongoose";
import test from "node:test";
import { after } from "node:test";
const api = supertest(app)

beforeEach( async () => {

    logger.info("About to run a test")
    await Blog.deleteMany({})
    await Blog.insertMany(testhelper.initialBlogs)
}
)

test('returns correct amount of blog posts in json format', async() => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)

    const blogsatEnd = await testhelper.blogsinDB()
    assert.strictEqual(testhelper.initialBlogs.length, blogsatEnd.length)
})

test('Idenitifier is named id', async() => {
    const blogsatStart = await testhelper.blogsinDB()
    const blogToView = blogsatStart[1]
   const response =  await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)

    assert.ok(response.body.id)
})

test('a new blog can be added', async() => {
    const blogsAtStart = testhelper.initialBlogs
    const aBlog = {
        title: "A Guide to Node.js Streams 2",
        author: "John Smith",
        url: "http://example.com/node-streams",
        likes: 7
    }
    await api.post('/api/blogs')
    .send(aBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsatEnd =  await testhelper.blogsinDB()

    assert.strictEqual(blogsAtStart.length + 1, blogsatEnd.length)

    const alltheTitles = blogsatEnd.map(result => result.title)

    assert(alltheTitles.includes('A Guide to Node.js Streams 2'))

})

test('default like would be 0', async() => {
    const newblog = {
        title: "A Guide to Node.js Streams 2",
        author: "John Smith",
        url: "http://example.com/node-streams",
    }

    const response =  await api.post('/api/blogs')
    .send(newblog)
    .expect(201)

    assert.strictEqual(response.body.likes, 0)
})

test('checks if title or url are missing', async() => {
    const newblog = {
        author: "jajf"
    }

    await api.post('/api/blogs')
    .send(newblog)
    .expect(400)
})

test('deletes a blog', async () => {
    const blogsatStart =  await testhelper.blogsinDB()
    const blogtoDelete = blogsatStart[0]
    await api.delete(`/api/blogs/${blogtoDelete.id}`)
    .expect(204)

    const blogsAtend = await testhelper.blogsinDB()
    const titles = blogsAtend.map(blog => blog.title)
    assert.strictEqual(blogsatStart.length - 1, blogsAtend.length)
    assert(!titles.includes(blogtoDelete.title))
})

test('updates a blog', async() => {
    const blogsatStart = await testhelper.blogsinDB()
    const blogtoUpdate = blogsatStart[1]
    const newBlog = { likes : blogtoUpdate.likes + 10}
    const result = await api.put(`/api/blogs/${blogtoUpdate.id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.likes, blogtoUpdate.likes + 10)
})

after( async () => {
    await mongoose.connection.close()
})