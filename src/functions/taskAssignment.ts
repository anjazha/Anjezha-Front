import toast from "react-hot-toast";
import { axiosInstance, cookie } from "./axiosInstance"

export const assignment = (taskId:string,taskerId:number)=>{
    axiosInstance.post(`/task-assignment/${taskId}`,{taskerId},{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json"
        }
    })
    .then(res=>{
        console.log(res);
        toast.success("تم تعيين المهمة بنجاح")
    })
    .catch(err=>{
        console.log(err);
        toast.error("حدث خطأ أثناء تعيين المهمة")
    })
}