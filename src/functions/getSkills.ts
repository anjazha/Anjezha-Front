import { axiosInstance } from "./axiosInstance"
import Cookie from "cookie-universal"

export const getSkills = ()=>{
    const cookie = Cookie()
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