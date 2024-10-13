/* eslint-disable @typescript-eslint/no-explicit-any */
import { addTasker } from "../store/Slices/taskerSlice"
import { axiosInstance, cookie } from "./axiosInstance"

export const getTasker = (dispatch:any)=>{
    axiosInstance.get("/about-tasker",{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json",
        }
    })
    .then((res)=>{
        // console.log(res);
        dispatch(addTasker(res.data))
    }).catch((err)=>{
        console.log(err);
    })
}