import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubCategoriesById } from "../functions/getSubCategoriesById";

interface SubData {
    categoryId:string,
    subcategory:string,
    id:string,
    imageUrl:string,
    description:string,
}

const SubCategories = () => {
    const {id} = useParams()
    const [data,setData] = useState<SubData | null>(null) 
    useEffect(() => {
        getSubCategoriesById(id,setData)
    }, [id])
    return (
        <div>
            Sub Categories {data?.subcategory}
        </div>
    );
}

export default SubCategories;