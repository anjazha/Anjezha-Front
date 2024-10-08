import { taskerProfile } from "../types/taskerProfile";
import { axiosInstance, cookie } from "./axiosInstance"

export const getTaskerById = (taskerId: string,setTasker: React.Dispatch<React.SetStateAction<taskerProfile | null>>)=>{
    axiosInstance.get(`/tasker/${taskerId}`,{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json"
        }
    })
    .then(res=>{
        console.log(res);
        setTasker(res.data)
    })
    .catch(err=>{
        console.log(err);
    })
}