import axios from "axios"

const api = axios.create({
    baseURL: 'https://us-central1-gymbuddy-5fe24.cloudfunctions.net/api',
    headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
    }
})

export default api