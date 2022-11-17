import axios from "axios"
const axiosInstance = axios.create({
    baseURL: 'https://kkchatapp.herokuapp.com'
  });
  

export default axiosInstance