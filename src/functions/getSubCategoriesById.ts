import { subCategories } from "../types/categories"
import { axiosInstance } from "./axiosInstance"
import Cookie from "cookie-universal"

export const getSubCategoriesById = (id:string | undefined,setData: React.Dispatch<React.SetStateAction<subCategories|null>>)=>{
    const cookie = Cookie()
    axiosInstance.get(`/subcategory/${id}`,{
        headers:{
            "Authorization":`Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json",
        }
    })
    .then((res)=>{
        // console.log(res);
        setData(res.data.data);
    }).catch((err)=>{
        console.log(err);
    })
}