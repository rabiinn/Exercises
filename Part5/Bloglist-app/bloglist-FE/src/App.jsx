import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [Message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const blogs = async () => {
      const result = await blogService.getAll()
      setBlogs(result)
    }
    blogs()
  }, [])

  useEffect( () => {
    const loggedinBloguserJson = window.localStorage.getItem('loggedinBloguser')
    if(loggedinBloguserJson){
      const user = JSON.parse(loggedinBloguserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedinBloguser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage({ text: 'Login successful!', type: 'successful' })
      setTimeout(() => setMessage(null), 4000)
    } catch (error) {
      setMessage({ text:'Wrong username or password', type: 'error' })
      setTimeout(() => setMessage(null), 4000)
    }
  }

  const handlelogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedinBloguser')
    setUser(null)
    setMessage({ text: 'logged out', type: 'successful' })
    setTimeout(() => setMessage(null), 4000)
  }

  const createAblog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const res = await blogService.create(blogObject)
      res.user = user
      setBlogs(blogs.concat(res))
    } catch (error) {
      setMessage({ text: 'Error creating blog', type: 'error' })
      setTimeout(() => setMessage(null), 4000)
    }
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createAblog={createAblog} />
      </Togglable>
    )
  }

  const updateBlog = async (updatedBlog) => {
    try {
      const res = await blogService.update(updatedBlog.id, updatedBlog)
      console.log('Updating blog with id', res.id)
      setBlogs(prevBlogs => prevBlogs.map(blog => blog.id === res.id ? { ...blog, ...res, user: blog.user } : blog)
      )

    } catch (error) {
      setMessage({
        text: 'Error uptading likes',
        type: 'error'
      })
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    }
  }

  const deleteABlog = async (deletedBlog) => {
    try {
      await blogService.deleteBlog(deletedBlog.id)
      setBlogs(blogs.filter(blog => blog.id !== deletedBlog.id))
      setMessage({ text: 'blog deleted', type: 'successful' })
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    } catch (error) {
      console.log(error)
    }
  }

  // console.log(blogs)

  // console.log(blogs)
  const blogsToshow = blogs
    .filter(blog => blog.user && user && blog.user.username === user.username)
    .sort((a,b) => b.likes - a.likes)

  return (
    <div>
      <div className='notification'>

        {Message && (
          <div>{Message.text}</div>
        )}

      </div>
      <h1>BlogList</h1>
      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </Togglable>
      ) : (
        <div>
          <h2>Blogs</h2>
          <div>
            {`${user.username} logged in`} <button onClick={handlelogout}>Logout</button>
          </div>
          <div>{blogForm()}</div>
          {blogsToshow.map(blog => (
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteABlog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
