import mongoose from "mongoose";

mongoose.set('strictQuery', false)

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const blog = mongoose.model('Blog', blogSchema)

export default blog