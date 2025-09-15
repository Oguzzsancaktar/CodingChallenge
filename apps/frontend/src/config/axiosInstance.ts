import axios from 'axios'

const apiClient = axios.create({
  baseURL: '/api/v1',
  timeout: 30000,
  headers: {
    'Accept-Language': 'en-US'
  }
})

export default apiClient


