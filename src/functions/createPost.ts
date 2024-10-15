import { axiosInstance, cookie } from "./axiosInstance";
import toast from "react-hot-toast";

interface dataType {
    title: string;
    description: string;
    attachments?:(File | null | undefined);
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
    }
}

export const createPost = (data:dataType,setLoading: React.Dispatch<React.SetStateAction<boolean>>)=>{
    axiosInstance.post("/tasks",data,{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"multipart/form-data",
        }
    })
    .then((res)=>{
        console.log(res);
        toast.success("تم إنشاء المهمة بنجاح")
    }).catch((err)=>{
        console.log(err);
        toast.error("حدث خطأ أثناء إنشاء المهمة")
    }).finally(()=>{
        setLoading(false)
    })
}