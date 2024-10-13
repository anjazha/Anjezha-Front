import toast from "react-hot-toast";
import { axiosInstance, cookie } from "./axiosInstance";
import { NavigateFunction } from "react-router-dom";

interface dataType {
    email:string;
    password:string;
}

export const loginUser = (data:dataType,myUrl:NavigateFunction,setLoading:React.Dispatch<React.SetStateAction<boolean>>)=>{
    axiosInstance.post("/auth/login",{...data},{
        headers:{
            "Content-Type":"application/json"
        }
    }).then((res)=>{
        // console.log(res);
        cookie.set("token",res.data.token)
        toast.success("تم تسجيل الدخول بنجاح")
        myUrl("/")
    }).catch(()=>{
        // console.log(err);
        toast.error("حدث خطأ أثناء تسجيل الدخول")
    }).finally(()=>setLoading(false));
}