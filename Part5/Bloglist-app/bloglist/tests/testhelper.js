import Blog from "../models/blog.js";

const initialBlogs = [
    {
        title: "Understanding JavaScript Closures",
        author: "Jane Doe",
        url: "http://example.com/js-closures",
        likes: 10
    },
    {
        title: "A Guide to Node.js Streams",
        author: "John Smith",
        url: "http://example.com/node-streams",
        likes: 7
    },
    {
        title: "React Hooks in Depth",
        author: "Alice Johnson",
        url: "http://example.com/react-hooks",
        likes: 15
    },
    {
        title: "Mastering MongoDB Aggregations",
        author: "Bob Brown",
        url: "http://example.com/mongodb-aggregations",
        likes: 5
    }
]

const blogsinDB = async () => {

    const blogs  = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

export default {initialBlogs, blogsinDB}