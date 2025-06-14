import { screen, render } from '@testing-library/react'
import Blog from './Blog'
import { test } from 'vitest'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'
test('Blog only renders title and author initially', async () => {
  const newBlog = {
    title: 'something',
    author: 'someone',
    likes: 333,
    url: 'afjj'
  }
  const mockHandler = vi.fn()
  const { container } = render(
    <Blog blog={newBlog} updateBlog={mockHandler} deleteBlog={mockHandler}/>)
 

  const titleElement = container.querySelector('.title')
  const authorElement = container.querySelector('.author')

  expect(titleElement).toHaveTextContent('something')
  expect(authorElement).toHaveTextContent('someone')

  expect(screen.queryByText(/Likes:/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/URL:/i)).not.toBeInTheDocument()

})

test('renders url and likes when the button is clicked', async () => {

  const newBlog = {
    title: 'something',
    author: 'someone',
    likes: 333,
    url: 'afjj'
  }

  const mockHandler = vi.fn()
  render(<Blog blog={newBlog} updateBlog={mockHandler} deleteBlog={mockHandler}/>)

  expect(screen.queryByText(/Likes:/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/URL:/i)).not.toBeInTheDocument()

  const user = userEvent.setup()
  const buttonElement = screen.getByRole('button', { name: /show/i })
  await user.click(buttonElement)

  expect(screen.getByText(/Likes:/i)).toBeInTheDocument()
  expect(screen.getByText(/URL:/i)).toBeInTheDocument()
  expect(screen.getByText('afjj')).toBeInTheDocument()
  expect(screen.getByText('333')).toBeInTheDocument()

})

test('when like is clicked twice, the event handler is called twice ', async () => {

  const newBlog = {
    title: 'something',
    author: 'someone',
    likes: 333,
    url: 'afjj'
  }

  const mockHandler = vi.fn()
  render(<Blog blog={newBlog} updateBlog={mockHandler} deleteBlog={mockHandler}/>)

  const user = userEvent.setup()
  const buttonElement = screen.getByRole('button', { name : /show/i })
  await user.click(buttonElement)

  const likeButton = screen.getByRole('button', { name: /like/i })

  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)


})

