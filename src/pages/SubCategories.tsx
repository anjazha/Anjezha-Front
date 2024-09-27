import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubCategoriesById } from "../functions/getSubCategoriesById";
import Spinner from '../components/Spinner';
import HowItWorks from "../components/HowItWorks";

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
        <div className="flex items-center justify-center min-h-screen bg-[#eae4d3]">
        <div className="w-full max-w-4xl  shadow-lg p-8 rounded-lg my-8">
        {data ? (
            <>
                <h2 className="text-3xl font-bold mb-6 text-[#333] text-center">{data.subcategory}</h2>

                
                <div className="flex flex-col md:flex-row items-center">
                    
                    <img
                        src={data.imageUrl}
                        alt={data.subcategory}
                        className="w-full md:w-1/2 object-cover rounded-lg mb-6 md:mb-0 shadow-lg"
                    />

                    
                    <div className="md:ml-6">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {data.description}
                        </p>
                    </div>
                </div>

                
                <div className="text-center mt-8">
                    <button className="bg-[#7c6932] text-white px-8 py-3 rounded-full hover:bg-[#625c2f] transition">
                        احجز الآن
                    </button>
                </div>
            </>
        ) : <Spinner/>
        }
        <HowItWorks/>
    </div>
    </div>        
    );
};

export default SubCategories;