
import axios from 'axios'

axios.defaults.withCredentials=true;

axios.interceptors.request.use(config => {
    return config;
}, error => {
    console.log(error); // for debug
    Promise.reject(error);
})

export default axios;
