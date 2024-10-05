import { tasks } from "../types/search";
import { axiosInstance, cookie } from "./axiosInstance"

export const getUserTasks = (setTasks: React.Dispatch<React.SetStateAction<tasks[]>>,setLoading: React.Dispatch<React.SetStateAction<boolean>>)=>{
    axiosInstance.get('/user-tasks',{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json",
        }
    })
    .then((res)=>{
        console.log(res);
        setTasks(res.data.data.tasks);
        setLoading(false);
    }).catch((err)=>{
        console.log(err);
    })
}