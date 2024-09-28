import { dataTypeSearch } from "../types/search"
import { axiosInstance } from "./axiosInstance"

export const getSearch = (query:string,search:string | null,limit:number,page:number,setData: React.Dispatch<dataTypeSearch>)=>{
    axiosInstance.get(`/search/tasks?${query}=${search}&limit=${limit}&page=${page}`)
    .then((res)=>{
        console.log(res)
        setData(res.data)
    }).catch((err)=>{
        console.log(err)
    })
}