import { axiosInstance, cookie } from "./axiosInstance"

export const getTaskerById = (taskerId: string)=>{
    axiosInstance.get(`/tasker/${taskerId}`,{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json"
        }
    })
    .then(res=>{
        console.log(res);
    })
    .catch(err=>{
        console.log(err);
    })
}