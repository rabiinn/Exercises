import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
let token  = null

const setToken = (newtoken) => {
  token = `Bearer ${newtoken}`

}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async ( newBlog ) => {

  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)

  return response.data

}

const update = async (id, newBlog) => {

  const updatedBlog = await axios.put(`${baseUrl}/${id}`,newBlog)
  return updatedBlog.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${id}`,config)
}

export default { getAll, create, setToken, update, deleteBlog }
