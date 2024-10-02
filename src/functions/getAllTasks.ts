import { axiosInstance } from "./axiosInstance"
import Cookie from "cookie-universal";

export const getAllTasks = ()=>{
    const cookie = Cookie()
    axiosInstance.get(`/tasks?limit=7&page=1`,{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json",
        }
    })
    .then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
}