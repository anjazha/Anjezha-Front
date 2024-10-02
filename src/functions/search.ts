import { dataTypeSearch } from "../types/search"
import { axiosInstance } from "./axiosInstance"

export const getSearch = (search:string,limit:number,setData: React.Dispatch<dataTypeSearch>)=>{
    axiosInstance.get(`/search/tasks?${search}&limit=${limit}`)
    .then((res)=>{
        console.log(res)
        setData(res.data)
    }).catch((err)=>{
        console.log(err)
    })
}