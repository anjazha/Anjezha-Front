import { taskersData } from "../pages/TaskerApplication";
import { axiosInstance, cookie } from "./axiosInstance"

export const getTaskerApplication = (taskId:string,setTaskers: React.Dispatch<React.SetStateAction<taskersData[]>>,setLoading: React.Dispatch<React.SetStateAction<boolean>>)=>{
    axiosInstance.get(`/task-application/${taskId}`,{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json",
        }
    })
    .then(res=>{
        console.log(res);
        setTaskers(res.data.data);
        setLoading(false);
    })
    .catch(err=>{
        console.log(err);
    })
}