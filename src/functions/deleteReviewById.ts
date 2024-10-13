import toast from "react-hot-toast";
import { axiosInstance, cookie } from "./axiosInstance"

export const deleteReviewById = (id: string,setChanges: React.Dispatch<React.SetStateAction<boolean>>,setLoading: React.Dispatch<React.SetStateAction<boolean>>) =>{
    axiosInstance.delete(`/review/${id}`,{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json"
        }
    })
    .then(()=>{
        // console.log(res);
        setChanges(prev=> prev ? false : true)
        toast.success("تم حذف التقييم بنجاح")
    })
    .catch(err=>{
        console.log(err);
        toast.error("حدث خطأ أثناء حذف التقييم")
    })
    .finally(()=>setLoading(false));
}