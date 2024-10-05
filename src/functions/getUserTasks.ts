import { tasks } from "../types/search";
import { axiosInstance } from "./axiosInstance"
import Cookie from "cookie-universal";

export const getUserTasks = (setTasks: React.Dispatch<React.SetStateAction<tasks[]>>,setLoading: React.Dispatch<React.SetStateAction<boolean>>)=>{
    const cookie = Cookie()
    axiosInstance.get('/user-tasks',{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json",
        }
    })
    .then((res)=>{
        console.log(res);
        setTasks(res.data);
        setLoading(false);
    }).catch((err)=>{
        console.log(err);
    })
}