import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"https://e-learning-0wji.onrender.com/api/v1",
    withCredentials:true,
})