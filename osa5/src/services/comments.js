import axios from 'axios'
const baseUrl = '/api/blogs/'

const create = async (request) => {
  const url = baseUrl + request.content.id + '/comment'
  const text = request.content.text
  const response = await axios.post(url, { text })
  return response.data
}

export default { create }