import toast from "react-hot-toast";
import { axiosInstance, cookie } from "./axiosInstance"
import { NavigateFunction } from "react-router-dom";

export const resetPassword = (data:{password:string,token:string},myUrl: NavigateFunction,setLoading: React.Dispatch<React.SetStateAction<boolean>>)=>{
    axiosInstance.patch("/auth/reset-password",data,{
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(res=>{
        console.log(res);
        cookie.set("token",res.data.newToken)
        toast.success('تم تغيير كلمة المرور بنجاح')
        myUrl('/')
    })
    .catch(err=>{
        console.log(err);
        toast.error('حدث خطأ اثناء تغيير كلمة المرور')
    })
    .finally(()=>setLoading(false));
}