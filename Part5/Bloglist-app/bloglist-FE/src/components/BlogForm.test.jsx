import { screen, render } from '@testing-library/react'
import { expect } from 'vitest'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('the form calls the event handler with right details when new blog is created', async () => {

  const createBlog = vi.fn()
  const user = userEvent.setup()



  const { container } = render(<BlogForm createAblog={createBlog}/>)
  screen.debug(container)

  const titleInput = screen.getByPlaceholderText('write title here')
  const authorInput = screen.getByPlaceholderText('write author here')
  const urlInput = screen.getByPlaceholderText('url')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'Hello World')
  await user.type(authorInput, 'Rabin')
  await user.type(urlInput, 'www.hello.com')
  await user.click(sendButton)

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'Hello World',
    author: 'Rabin',
    url: 'www.hello.com',
  })
  expect(titleInput.value).toBe('')
  expect(authorInput.value).toBe('')
  expect(urlInput.value).toBe('')


})