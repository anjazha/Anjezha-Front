import { NavigateFunction } from "react-router-dom"
import { axiosInstance } from "./axiosInstance"
import toast from "react-hot-toast";

export const sendCode = (data:{email:string},myUrl: NavigateFunction,setLoading: React.Dispatch<React.SetStateAction<boolean>>)=>{
    axiosInstance.post("/send-code",data,{
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then((res)=>{
        console.log(res)
        toast.success('تم ارسال رمز التحقق بنجاح')
        myUrl(`/verifyCode`)
        localStorage.email = data.email
    })
    .catch((err)=>{
        console.log(err)
        toast.error("حدث خطأ اثناء التحقق من الايميل")
    })
    .finally(()=>setLoading(false));
}