import toast from "react-hot-toast";
import { axiosInstance, cookie } from "./axiosInstance";

interface dataType {
    bio: string;
    pricing: number;
    categoryId: number;
    longitude: number;
    latitude: number;
}

export const updateTasker = (data:dataType,setLoad: React.Dispatch<React.SetStateAction<boolean>>)=>{
    axiosInstance.put("/update-tasker",data,{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json"
        }
    })
    .then((res)=>{
        console.log(res);
        toast.success("تم تحديث معلوماتك بنجاح")
    })
    .catch((err)=>{
        console.log(err);
        toast.error("حدث خطأ اثناء تحديث معلوماتك")
    })
    .finally(()=>setLoad(false));
}