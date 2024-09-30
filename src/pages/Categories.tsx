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
        <h1 className="mb-6 text-3xl font-bold text-center dark:text-bodyColor">الفئات</h1>
        {
            categories.length > 0 ?
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category, index) => (
                    <div key={index} className="overflow-hidden rounded-lg bg-white dark:bg-inputDark shadow-lg transition-transform duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
                        <img
                            src={category.imageUrl ? category.imageUrl : image1}
                            alt={category.category}
                            className="object-cover w-full h-48 transition-transform duration-300 ease-in-out hover:scale-105"
                        />
                        <div className='p-4 bg-white dark:bg-inputDark rounded-b-lg'>
                            <h2 className="mb-2 text-xl font-bold dark:text-bodyColor">{category.category}</h2>
                            <div className="flex flex-wrap gap-2">
                                {category.subcategories.map((sub, index) => (
                                    <Link 
                                        to={`/subCategories/${sub.id}`} 
                                        key={index} 
                                        className="inline-block px-3 py-1 text-sm font-semibold text-white bg-buttonsColor rounded-full hover:bg-[#4F46E599] dark:bg-[#B8B294] dark:hover:bg-[#C2B884] transition-colors duration-300"
                                    >
                                        {sub.subcategory}
                                    </Link>
                                ))}
                            </div>
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
