import { axiosInstance,cookie } from "./axiosInstance"

export const createConversation = (id:number)=>{
    axiosInstance.post("/create-conversation",{receiverId:id},{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json"
        }
    })
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    })
}