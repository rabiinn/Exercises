import { useState } from 'react'

const BlogForm = ({ createAblog }) => {
  const [newtitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleCreateAblog = (event) => {
    event.preventDefault()
    createAblog({
      title: newtitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  return (
    <>
      <form onSubmit={handleCreateAblog}>
        <div>
          title: <input value={newtitle} placeholder='write title here' onChange={(event) => setNewTitle(event.target.value)} />
        </div>
        <div>
          author: <input value={newAuthor} placeholder='write author here' onChange={(event) => setNewAuthor(event.target.value)} />
        </div>
        <div>
          url: <input value={newUrl} placeholder='url' onChange={(event) => setNewUrl(event.target.value)} />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default BlogForm