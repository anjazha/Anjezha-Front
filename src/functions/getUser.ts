/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigateFunction } from "react-router-dom"
import { axiosInstance } from "./axiosInstance"
import Cookie from "cookie-universal"
import { addUser } from "../store/Slices/userSlice"

export const getUser = (dispatch:any,myUrl:NavigateFunction)=>{
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