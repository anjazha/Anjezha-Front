
import { NavigateFunction } from "react-router-dom"
import { axiosInstance } from "./axiosInstance"
import Cookie from "cookie-universal"
import { addUser } from "../store/Slices/userSlice"
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit"

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

export const getUser = (dispatch:dispatch,myUrl:NavigateFunction)=>{
    const cookie = Cookie()
    axiosInstance.get("/profile",{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json"
        }
    })
    .then((res)=>{
        // console.log(res)
        dispatch(addUser(res.data))
    }).catch(()=>{
        // console.log(err)
        cookie.remove("token")
        myUrl("/login")
    })
}