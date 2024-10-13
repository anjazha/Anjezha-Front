import { tasks } from "../types/search"
import { axiosInstance, cookie } from "./axiosInstance"

export const getTaskById = (id:string,setTask: React.Dispatch<React.SetStateAction<tasks | null>>)=>{
    axiosInstance.get(`/tasks/${id}`,{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json"
        }
    })
    .then((res)=>{
        console.log(res);
        setTask({...res.data.data.task})
    })
    .catch(err=>{
        console.log(err);
    })
}