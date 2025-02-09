/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance, cookie } from "./axiosInstance"

export const getTaskersSearch = (search:string,limit:number,setAllData: React.Dispatch<any>)=>{
    axiosInstance.get(`/search/taskers?limit=${limit}&${search}`,{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json"
        }
    })
    .then(res=>{
        console.log(res);
        setAllData(res.data)
    })
    .catch(err=>{
        console.log(err);
    })
}