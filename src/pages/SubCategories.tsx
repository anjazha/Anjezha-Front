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
        <div className="flex items-center justify-center min-h-screen bg-lightBg dark:bg-darkBg p-4">
        <div className="w-full max-w-4xl  p-8 rounded-lg my-8 bg-white dark:bg-inputDark">
            {data ? (
                <>
                    <h2 className="text-4xl font-extrabold mb-6 text-center dark:text-bodyColor">{data.subcategory}</h2>
    
                    <div className="flex flex-col md:flex-row items-center mb-8">
                        <img
                            src={data.imageUrl}
                            alt={data.subcategory}
                            className="w-full md:w-1/2 object-cover rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:shadow-xl hover:scale-105"
                        />
    
                        <div className="md:ml-8 mt-4 md:mt-0">
                            <p className="text-lg text-gray-700 leading-relaxed dark:text-bodyColor">
                                {data.description}
                            </p>
                        </div>
                    </div>
    
                    <div className="text-center">
                        <button className="bg-primary text-white px-10 py-4 rounded-full text-lg hover:bg-primaryDark transition duration-300 ease-in-out shadow-lg">
                            احجز الآن
                        </button>
                    </div>
                </>
            ) : (
                <Spinner />
            )}
            <HowItWorks />
        </div>
    </div>
    
    );
};

export default SubCategories;