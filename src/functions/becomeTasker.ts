import Cookie from "cookie-universal";
import { axiosInstance } from "./axiosInstance";

interface dataType{
    bio: string;
    pricing: number;
    categoryId: number;
    bidding:number;
    longitude:number;
    latitude: number;
}

export const becomeTasker = (data:dataType,setLoading:React.Dispatch<React.SetStateAction<boolean>>)=>{
    const cookie = Cookie()
    axiosInstance.post("/become-tasker",data,{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json",
        }
    }).then((res)=>{
        console.log(res)
        // toast.success('تم تسجيلك كعامل بنجاح')
    }).catch((err)=>{
        console.log(err)
        // toast.error('حدث خطأ أثناء تسجيلك كعامل')
    }).finally(()=>setLoading(false));
}