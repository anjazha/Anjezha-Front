import axios from "axios";
import Cookie from "cookie-universal";

// const  baseURL="http://localhost:5000/api/v1"
// const  baseURL="https://anjezha-production.up.railway.app/api/v1"
const  baseURL="http://api.anjez.tech/api/v1"
// const  baseURL="https://e-learning-0wji.onrender.com/api/v1"

export const axiosInstance = axios.create({
    // baseURL:"https://e-learning-0wji.onrender.com/api/v1",
    baseURL,
    withCredentials:true,
})

export const cookie = Cookie()