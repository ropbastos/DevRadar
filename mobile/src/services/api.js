import axios from 'axios'

const api = axios.create({
    baseURL: 'http://10.1.1.64:3333',
})

export default api