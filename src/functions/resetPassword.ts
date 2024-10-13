import { axiosInstance } from "./axiosInstance"

export const resetPassword = (data:{password:string},token:string,setLoading: React.Dispatch<React.SetStateAction<boolean>>)=>{
    axiosInstance.patch("/auth/reset-password",data,{
        headers:{
            "Authorization":`Bearer ${token}`,
            "Content-Type":"application/json"
        }
    })
    .then(res=>{
        console.log(res);
    })
    .catch(err=>{
        console.log(err);
    })
    .finally(()=>setLoading(false));
}