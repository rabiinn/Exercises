import Blog from '../models/blog.js'
import Router, { response }  from 'express'
import jwt from 'jsonwebtoken'
import middleware from '../utils/middleware.js'
const blogRouter = Router()

blogRouter.get('/', async (request, response, next) => {
  try{
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1})
    if(blogs){
      response.status(200).json(blogs)
    }
    else{
      response.status(400).end()
    }
  }
  catch(error){
    next(error)
  }
})

blogRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    response.status(200).json(blog)
  }
  catch(error) {
    next(error)
  }
})

blogRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const body  = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if(!decodedToken.id){
    return response.status(401).json({ error: 'token invalid'})
  }

  if (!body.url || !body.title) {
    return response.status(400).json({ error: "title or url missing" })
  }

  try {
    const user = request.user
    const blog = new Blog({...body, user: user._id})
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
  } 
  
  catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try{
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    if(!blog){
      return response.status(404).json({ error: 'Blog not found' })
    }

    if(blog.user.toString() !== user._id.toString()){
      return response.status(403).json({Error : "You can only delete your own blogs"})
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()

  }
  catch(error){
    next(error)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const {likes} = request.body
  try{
    const blogTobeUpdated = await Blog.findById(request.params.id)
    if(!blogTobeUpdated){
      return response.status(404).json({error: "Not found"})
    }
    blogTobeUpdated.likes = likes

    const updatedBlog = await blogTobeUpdated.save()
    response.status(200).json(updatedBlog)

  }
  catch(error){
    next(error)
  }
})

export default blogRouter
