import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubCategoriesById } from "../functions/getSubCategoriesById";
import Spinner from '../components/Spinner';
import HowItWorks from "../components/HowItWorks";
import { subCategories } from "../types/categories";

const SubCategories = () => {
    const {id} = useParams()
    const [data,setData] = useState<subCategories | null>(null) 
    useEffect(() => {
        getSubCategoriesById(id,setData)
    }, [id])
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#eae4d3]">
        <div className="w-full max-w-4xl p-8 my-8 rounded-lg shadow-lg">
        {data ? (
            <>
                <h2 className="text-3xl font-bold mb-6 text-[#333] text-center">{data.subcategory}</h2>

                
                <div className="flex flex-col items-center md:flex-row">
                    
                    <img
                        src={data.imageUrl}
                        alt={data.subcategory}
                        className="object-cover w-full mb-6 rounded-lg shadow-lg md:w-1/2 md:mb-0"
                    />

                    
                    <div className="md:ml-6">
                        <p className="text-lg leading-relaxed text-gray-700">
                            {data.description}
                        </p>
                    </div>
                </div>

                
                <div className="mt-8 text-center">
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