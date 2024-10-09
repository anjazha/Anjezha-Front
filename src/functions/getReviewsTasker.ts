import { axiosInstance, cookie } from "./axiosInstance"
import { reviewsTypes } from "../components/ReviewsTasker"

export const getReviewsTasker = (taskerId:string,setReviews: React.Dispatch<React.SetStateAction<reviewsTypes[] | null>>)=>{
    axiosInstance.get(`/tasker-reviews/${taskerId}`,{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json"
        }
    })
    .then(res=>{
        console.log(res);
        const data = res.data.data === null ? [] : res.data.data 
        setReviews(data);
    })
    .catch((err)=>{
        console.log(err);
    })
}