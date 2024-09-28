import  { useState, useEffect } from 'react';
import { getAllCategory } from '../functions/getAllCategory'; 
import image1 from "../assets/featuredTask.jpg";
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { Categories } from '../types/categories';

const CategoriesPage = () => {
    const [categories, setCategories] = useState<Categories[]>([]);

    useEffect(() => {
        getAllCategory(setCategories);
    }, []);

    return (
        <div className="container p-6 mx-auto">
            <h1 className="mb-6 text-3xl font-bold text-center">الفئات</h1>
            {
                categories.length > 0 ?
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category,index) => (
                        <div key={index} className="bg-[#C2C2C2] overflow-hidden rounded-lg shadow-lg">
                            <img
                                src={category.imageUrl ? category.imageUrl : image1} 
                                alt={category.category}
                                className="object-cover w-full h-48 transition duration-300 ease-in-out delay-150 bg-gray-500 rounded-md hover:-translate-y-1 hover:scale-110 hover:bg-gray-600"
                            />
                            <div className='p-4'>
                                <h2 className="mb-2 text-xl font-bold">{category.category}</h2>
                                <ul className="flex flex-col list-disc list-inside">
                                    {category.subcategories.map((sub,index) => (
                                        <Link to={`/subCategories/${sub.id}`} key={index} className="text-[#000000] cursor-pointer underline">
                                            {sub.subcategory}
                                        </Link>
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
