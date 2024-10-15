import { messages } from "../components/Messages";
import { axiosInstance,cookie } from "./axiosInstance"

export const getMessages = (id:string,setMessages: React.Dispatch<React.SetStateAction<messages[] | null>>)=>{
    axiosInstance.get(`/get-messages/${id}`,{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json"
        }
    })
    .then(res=>{
        console.log(res);
        setMessages(res.data);
    })
    .catch(err=>{
        console.log(err);
    })
}