const loginUrl = 'http://localhost:3003/api/login'
import axios from 'axios'

const login = async (credentials) => {
  const response = await axios.post(loginUrl,credentials)
  return response.data
}

export default { login }
