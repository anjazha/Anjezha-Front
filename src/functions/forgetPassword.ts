import toast from "react-hot-toast"
import { axiosInstance } from "./axiosInstance"

export const forgetPassword = (data:{email:string},setLoading: React.Dispatch<React.SetStateAction<boolean>>)=>{
    axiosInstance.patch("/auth/forgot-password", data,{
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(res=>{
        console.log(res)
        toast.success('تم ارسال رسالة علي الايميل لتغيير كلمة المرور')
    })
    .catch(err=>{
        console.log(err)
        toast.error('حد خطأ اثناء التاكد من الايميل')
    })
    .finally(()=>setLoading(false))
}