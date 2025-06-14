import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const removeStyle = {
    backgroundColor: 'green',
  }

  const [showDetails, setShowDetails] = useState(false)

  const handleLike = (event) => {
    event.preventDefault()
    updateBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : null,
    })
  }

  const handleDelete = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      deleteBlog(blog)
    }
  }

  const label = showDetails ? 'hide' : 'show'

  return (
    <div
      style={blogStyle}
      data-testid={`blog-${blog.title.replace(/\s+/g, '-').toLowerCase()}`}
      className='blog'
    >
      <strong className='title'>{blog.title} </strong>
      <strong className='author'>{blog.author}</strong>{' '}
      <button className='showButton' onClick={() => setShowDetails(!showDetails)}>{label}</button>
      {showDetails && (
        <div>
          <div>
            <strong className='url'>URL:</strong> {blog.url}
          </div>
          <div>
            <strong className='likes'>Likes:</strong> {blog.likes}{' '}
            <button onClick={handleLike}>like</button>
          </div>
          <div>
            <strong>Added by:</strong> {blog.user ? blog.user.username : 'unknown'}
          </div>
          <button style={removeStyle} onClick={handleDelete}>
            remove
          </button>
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog