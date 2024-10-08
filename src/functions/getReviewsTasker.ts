/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance, cookie } from "./axiosInstance"

export const getReviewsTasker = (taskerId:string,setReviews: React.Dispatch<React.SetStateAction<any[] | null>>)=>{
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