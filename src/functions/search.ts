import { axiosInstance } from "./axiosInstance"
export const getSearch = (query:string,search:string | null)=>{
    axiosInstance.get(`/search/tasks?${query}=${search}`)
    .then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })
}