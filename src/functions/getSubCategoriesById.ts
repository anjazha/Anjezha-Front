import { subCategories } from "../types/categories"
import { axiosInstance, cookie } from "./axiosInstance"

export const getSubCategoriesById = (id:string | undefined,setData: React.Dispatch<React.SetStateAction<subCategories|null>>)=>{
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