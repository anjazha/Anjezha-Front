/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance, cookie } from "./axiosInstance";
import toast from "react-hot-toast";
import { addTasker } from "../store/Slices/taskerSlice";

interface dataType{
    bio: string;
    pricing: number;
    categoryId: number;
    bidding:number;
    longitude:number;
    latitude: number;
}

export const becomeTasker = (data:dataType,dispatch:any,setLoading:React.Dispatch<React.SetStateAction<boolean>>)=>{
    axiosInstance.post("/become-tasker",data,{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json",
        }
    }).then((res)=>{
        console.log(res)
        dispatch(addTasker(res.data))
        toast.success('تم تسجيلك كعامل بنجاح')
    }).catch((err)=>{
        console.log(err)
        toast.error('حدث خطأ أثناء تسجيلك كعامل')
    }).finally(()=>setLoading(false));
}