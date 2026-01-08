import axios from 'axios'

export default {
    install(app, options) {
        const api = axios.create({
            baseURL: options.baseURL,
            headers: {
                Authorization: `key=${options.apiKey}`
            }
        })

        app.config.globalProperties.$api = api
    }
}
