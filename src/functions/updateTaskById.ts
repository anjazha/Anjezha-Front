import toast from "react-hot-toast";
import { axiosInstance, cookie } from "./axiosInstance"

interface dataType {
    title: string;
    description: string;
    date: string;
    budget: number;
    address: string;
    status: string;
    skills: string[];
    category_id: number;
    location :{
        latitude:number;
        longitude:number;
    }
    schedule :{
        start_time:string;
        end_time:string;
        schedule_type:string;
    },
    attachments: File | null | undefined;
}

export const updateTaskById = (taskId: string,data:dataType,setLoading: React.Dispatch<React.SetStateAction<boolean>>)=>{
    console.log(data);
    axiosInstance.put(`/tasks/${taskId}`,data,{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json"
        }
    })
    .then((res)=>{
        console.log(res);
        toast.success("تم  تعديل المهمة بنجاح")
    }).catch((err)=>{
        console.log(err);
        toast.error("حدث خطأ اثناء تعديل المهمة")
    })
    .finally(()=>setLoading(false));
}