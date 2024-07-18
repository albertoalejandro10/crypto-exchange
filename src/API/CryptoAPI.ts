import axios from 'axios'

const getCryptoData = axios.create({
  baseURL: 'https://api.coincap.io/v2',
  headers: {
    'Content-Type': 'application/json'
  }
})

export { getCryptoData }
