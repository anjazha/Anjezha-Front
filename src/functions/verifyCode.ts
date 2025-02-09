import toast from "react-hot-toast";
import { axiosInstance } from "./axiosInstance"
import { NavigateFunction } from "react-router-dom";

export const verifyCode = (data:{email:string,code: string},setLoading: React.Dispatch<React.SetStateAction<boolean>>,myUrl: NavigateFunction)=>{
    axiosInstance.post("/verify-code",data,{
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(res=>{
        console.log(res)
        toast.success("تم التحقق من الكود بنجاح")
        myUrl("/register")
    })
    .catch(err=>{
        console.log(err)
        toast.error("كود التحقق غير صحيح")
    })
    .finally(()=>setLoading(false));
}