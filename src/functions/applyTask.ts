import toast from "react-hot-toast";
import { axiosInstance } from "./axiosInstance"
import Cookie from "cookie-universal"

interface dataType{
    taskId: number;
    taskerId: number;
    content:string;
    expectedSalary:string;
}

export const applyTask = (data:dataType,setLoading: React.Dispatch<React.SetStateAction<boolean>>)=>{
    const cookie = Cookie()
    axiosInstance.post("/task-application",data,{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json",
        }
    })
    .then(()=>{
        // console.log(res);
        toast.success("تم تسجيلك ردك بنجاح")
    })
    .catch((err)=>{
        console.log(err);
    })
    .finally(()=>setLoading(false))
}