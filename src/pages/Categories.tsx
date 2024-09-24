import  { useState, useEffect } from 'react';
import { getAllCategory } from '../functions/getAllCategory'; 
import image1 from "../assets/featuredTask.jpg";
import Spinner from '../components/Spinner';


interface SubData {
    categoryId: string;
    subcategory: string;
}

interface DataType {
    id: string;
    category: string;
    subcategories: SubData[];
}

const CategoriesPage = () => {
    const [categories, setCategories] = useState<DataType[]>([]);

    useEffect(() => {
        getAllCategory(setCategories);
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">الفئات</h1>
            {
                categories.length > 0 ?
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category,index) => (
                        <div key={index} className="bg-[#C2C2C2] overflow-hidden rounded-lg shadow-lg">
                            <img
                                src={image1} 
                                alt={category.category}
                                className="h-40 w-full object-cover rounded-md transition ease-in-out delay-150 bg-gray-500 hover:-translate-y-1 hover:scale-110 hover:bg-gray-600 duration-300"
                            />
                            <div className='p-4'>
                                <h2 className="text-xl font-bold mb-2">{category.category}</h2>
                                <ul className="list-inside list-disc">
                                    {category.subcategories.map((sub,index) => (
                                        <li key={index} className="text-[#000000] cursor-pointer underline">
                                            {sub.subcategory}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
                : <Spinner />
            }
        </div>
    );
};

export default CategoriesPage;
