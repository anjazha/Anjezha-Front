import Cookie from "cookie-universal";
import { axiosInstance } from "./axiosInstance";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { addUser } from "../store/Slices/userSlice";
import toast from "react-hot-toast";

interface formData {
    name: string;
    email: string;
    phone_number: string;
}

type dispatch = ThunkDispatch<{
    user: {
        id: string;
        name: string;
        email: string;
        password: string;
        phone_number: string;
        profile_picture: string;
        created_at: string;
    };
}, undefined, UnknownAction> 

export const updateProfile = (data: formData,dispatch:dispatch,setLoad: React.Dispatch<React.SetStateAction<boolean>>) => {
    const cookie = Cookie()
    axiosInstance.put("/profile",data,{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json"
        }
    })
    .then((res)=>{
        // console.log(res)
        dispatch(addUser(res.data))
        toast.success("تم تعديل ملفك الشخصي بنجاح")
    }).catch((err)=>{
        console.log(err)
        toast.error("حدث خطأ أثناء تعديل ملفك الشخصي")
    }).finally(()=>{
        setLoad(false)
    })
}

export const updatePicture = (data:{profilePicture:File | null | undefined}) => {
    const cookie = Cookie()
    axiosInstance.patch("/profile/picture",data,{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"multipart/form-data"
        }
    })
    .then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })
}