import toast from "react-hot-toast";
import { axiosInstance, cookie } from "./axiosInstance";
import { formType } from "../components/AddReview";

interface dataType {
    review:string;
    rating:number;
}

export const addReviews = (data:dataType,taskerId:string,setUpdateReview:React.Dispatch<React.SetStateAction<formType>>,setLoading: React.Dispatch<React.SetStateAction<boolean>>,setChanges: React.Dispatch<React.SetStateAction<boolean>>)=>{
    axiosInstance.post(`/review/${taskerId}`, data,{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json"
        }
    })
    .then(res=>{
        console.log(res);
        setChanges(prev=> prev ? false : true)
        setUpdateReview({id:"",review:"",rating:""})
        toast.success("تم اضافة التقييم بنجاح")
    }).catch((err)=>{
        console.log(err);
        toast.error("حدث خطأ أثناء اضافة التقييم")
    })
    .finally(()=>setLoading(false));
}