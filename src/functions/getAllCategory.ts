import { axiosInstance } from "./axiosInstance"

interface subData {
    categoryId:string,
    subcategory:string
}
interface dataType {
    id:string,
    category:string,
    subcategories:subData[]
}

export const getAllCategory = (setData:React.Dispatch<React.SetStateAction<dataType[]>>) => {
    axiosInstance.get("/category")
    .then((res) => {
        // console.log(res)
        setData(res.data.data)
    })
    .catch((err) => {
        console.log(err)
    })
}