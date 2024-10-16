import { messages } from "../components/Messages";
import { axiosInstance,cookie } from "./axiosInstance"

export const getMessages = (id:string,setMessages: React.Dispatch<React.SetStateAction<messages[]>>,setLoading: React.Dispatch<React.SetStateAction<boolean>>)=>{
    axiosInstance.get(`/get-messages/${id}`,{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json"
        }
    })
    .then(res=>{
        console.log(res);
        setMessages(res.data.reverse());
    })
    .catch(err=>{
        console.log(err);
    })
    .finally(()=>setLoading(false))
}