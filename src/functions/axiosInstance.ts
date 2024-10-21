import axios from "axios";
import Cookie from "cookie-universal";

export const baseURL="http://localhost:5000"
// export const baseURL="https://anjezha-production.up.railway.app"
// export const  baseURL="https://api.anjez.tech"
// export const  baseURL="https://e-learning-0wji.onrender.com"

export const axiosInstance = axios.create({
    baseURL:`${baseURL}/api/v1`,
    // withCredentials:true,
})

export const cookie = Cookie()