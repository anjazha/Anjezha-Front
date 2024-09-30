import { Categories } from "../types/categories"
import { axiosInstance } from "./axiosInstance"

export const getAllCategory = (setData:React.Dispatch<React.SetStateAction<Categories[]>>) => {
    axiosInstance.get("/category")
    .then((res) => {
        // console.log(res)
        setData(res.data.data)
    })
    .catch((err) => {
        console.log(err)
    })
}