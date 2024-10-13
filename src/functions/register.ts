import { NavigateFunction } from "react-router-dom"
import { axiosInstance } from "./axiosInstance"
import toast from "react-hot-toast";

interface dataType {
    name:string,
    email:string,
    password:string,
    phoneNumber:string
}

export const registerUser = (data:dataType,myUrl:NavigateFunction,setLoading:React.Dispatch<React.SetStateAction<boolean>>)=>{
    axiosInstance.post("/auth/signup",{...data},{
        headers:{
            "Content-Type":"application/json"
        }
    }).then(()=>{
        // console.log(res)
        toast.success('تم انشاء حسابك بنجاح')
        myUrl("/login")
    }).catch((err)=>{
        console.log(err)
        toast.error("هذا الايميل مستخدم بالفعل")
    }).finally(()=>setLoading(false));
}