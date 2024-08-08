import axios from 'axios'

const getCurrency = axios.create({
  baseURL: 'https://api.exchangeratesapi.net/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

export { getCurrency }
