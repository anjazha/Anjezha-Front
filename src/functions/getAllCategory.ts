import { axiosInstance } from "./axiosInstance"

interface subData {
    categoryId:string,
    subcategory:string,
    id:string,
    imageUrl:string,
    description:string,
}
interface dataType {
    id:string,
    category:string,
    imageUrl:string,
    description:string,
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