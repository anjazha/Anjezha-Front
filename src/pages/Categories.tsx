import  { useState, useEffect } from 'react';
import { getAllCategory } from '../functions/getAllCategory'; 
import image1 from "../assets/featuredTask.jpg";


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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <div key={category.id} className="bg-[#C2C2C2] p-4 rounded-lg shadow-lg">
                        <img
                            src={image1} 
                            alt={category.category}
                            className="h-40 w-full object-cover rounded-md mb-4 transition ease-in-out delay-150 bg-gray-500 hover:-translate-y-1 hover:scale-110 hover:bg-gray-600 duration-300"
                        />
                        <h2 className="text-xl font-bold mb-2">{category.category}</h2>
                        <ul className="list-disc pl-5">
                            {category.subcategories.map((sub) => (
                                <li key={sub.categoryId} className="text-[#000000]">
                                    {sub.subcategory}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default CategoriesPage;
