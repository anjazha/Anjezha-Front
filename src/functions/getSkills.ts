import { axiosInstance, cookie } from "./axiosInstance"

export const getSkills = ()=>{
    axiosInstance.get("/get-skills",{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json",
        }
    })
    .then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
}