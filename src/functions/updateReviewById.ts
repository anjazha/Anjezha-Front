import toast from "react-hot-toast";
import { axiosInstance, cookie } from "./axiosInstance"
import { formType } from "../components/AddReview";

export const updateReview = (id:string,data:{review:string,rating:number},setUpdateReview:React.Dispatch<React.SetStateAction<formType>>,setLoading: React.Dispatch<React.SetStateAction<boolean>>,setChanges: React.Dispatch<React.SetStateAction<boolean>>) => {
    axiosInstance.put(`/review/${id}`,data,{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json"
        }
    })
    .then(res=>{
        console.log(res);
        setChanges(prev=> prev ? false : true)
        setUpdateReview({id:"",review:"",rating:""})
        toast.success("تم تعديل رايك بنجاح")
    })
    .catch(err=>{
        console.log(err);
        toast.error("حدث خطأ أثنا تعديل الرأي")
    })
    .finally(()=>setLoading(false));
}