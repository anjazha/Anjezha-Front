/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance, cookie } from "./axiosInstance"

export const getConversationByUserId = (userId: string,setConversation: React.Dispatch<React.SetStateAction<any[] | null>>)=>{
    axiosInstance.get(`/conversations/${userId}`,{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json"
        }
    })
    .then((res)=>{
        console.log(res);
        setConversation(res.data)
    })
    .catch((err)=>{
        console.log(err);
    })
}