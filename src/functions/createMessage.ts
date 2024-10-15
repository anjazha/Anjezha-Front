import { axiosInstance, cookie } from "./axiosInstance"

interface dataType {
    senderId:string,
    conversationId:string,
    message:string,
}
export const createMessage = (data:dataType)=>{
    axiosInstance.post("/create-message",data,{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json",
        }
    })
    .then(res=>{
        console.log(res);
    })
    .catch(err=>{
        console.log(err);
    })
}