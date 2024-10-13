import toast from "react-hot-toast"
import { axiosInstance, cookie } from "./axiosInstance"

export const updatePassword = (data:{oldPassword:string,newPassword:string},setLoad:React.Dispatch<React.SetStateAction<boolean>>) => {
    axiosInstance.patch("/profile/change-password",data,{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json"
        }
    })
    .then(()=>{
        // console.log(res)
        toast.success("تم تعديل كلمة المرور بنجاح")
    }).catch(()=>{
        // console.log(err)
        toast.error("كلمة المرور غير صحيحة")
    }).finally(()=>{
        setLoad(false)
    })
}