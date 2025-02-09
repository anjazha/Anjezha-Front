import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSubCategoriesById } from "../functions/getSubCategoriesById";
import Spinner from '../components/Spinner';
import { subCategories } from "../types/categories";
import { getAllCategory } from "../functions/getAllCategory";
import { Categories } from "../types/categories";
import Map from "../components/Map";


interface FormData {
    address: {
        street: string;
        unit?: string;
    };
    taskSize: string[];
    taskDetails?: string;
    categoryid:string;
}

const HelpMovingForm = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<subCategories | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [categories,setCategories]= useState<Categories []>([]);
    const [errorMap,setErrorMap] = useState(false);
    

    const onSubmit: SubmitHandler<FormData> = (data) => {
        if(!localStorage.longitude || !localStorage.latitude){
            setErrorMap(true)
            return
        }
        console.log("Form Data:", data);
    };

    
    useEffect(() => {
        if (id) {
            getSubCategoriesById(id, setData);  
        }
    }, [id]);

    useEffect(() => {
        getAllCategory(setCategories)
    },[]);

    return (
        <div className="py-6 flex justify-center ">
            <div className="container">
            {data ? (
                <div className="bg-white dark:bg-inputDark dark:text-white shadow-lg rounded-lg p-5">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                        {data.subcategory}
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-white font-semibold mb-2">عنوان المهمة</label>
                            <input
                                type="text"
                                placeholder="عنوان الشارع"
                                className="w-full p-2 border border-gray-300 rounded"
                                {...register("address.street", { required: true })}
                            />
                            {errors.address?.street && (
                                <span className="text-red-500 text-sm">This field is required</span>
                            )}

                            <input
                                type="text"
                                placeholder="الوحدة أو الشقة"
                                className="w-full p-2 border border-gray-300 rounded mt-2"
                                {...register("address.unit")}
                            />
                        </div>

                        
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-white font-semibold mb-2">ما حجم مهمتك؟</label>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        value="small"
                                        className="form-checkbox h-4 w-4 text-blue-500"
                                        {...register("taskSize")}
                                    />
                                    <span>صغير = ساعة واحدة </span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        value="medium"
                                        className="form-checkbox h-4 w-4 text-blue-500"
                                        {...register("taskSize")}
                                    />
                                    <span>متوسط = 2-3 ساعات</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        value="large"
                                        className="form-checkbox h-4 w-4 text-blue-500"
                                        {...register("taskSize")}
                                    />
                                    <span>كبير = 4 ساعات و أكثر</span>
                                </label>
                            </div>
                        </div>
                        {
                        categories.length > 0?
                        <div className="mb-4">
                        <label htmlFor="category" className="block text-lg font-semibold text-darkColor dark:text-bodyColor">الفئة</label>
                        <select
                            required
                            {...register("categoryid", { required: true })}
                            id="category"
                            className="w-full h-10 p-2 py-0 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"
                            >
                            {categories.map((category ,index) => (
                                <option key={index} >{category.category}</option>
                            ))}
                        </select>
                        {errors.categoryid?.type === "required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل الفئة</p>}
                    </div>
                    : <Spinner />
                        }
                        <div className="mb-6">
                            <label className="block text-gray-700 dark:text-white font-semibold mb-2">أخبرنا بتفاصيل مهمتك؟</label>
                            <textarea
                                placeholder="أوصف مهمتك..."
                                className="w-full p-2 border border-gray-300 rounded"
                                {...register("taskDetails")}
                            ></textarea>
                        </div>

                        <div className="mb-4">
                        <label htmlFor="location" className="block text-lg font-semibold text-darkColor dark:text-bodyColor">الموقع</label>
                        <Map latitude={+localStorage.latitude} location={true} longitude={+localStorage.longitude} setErrorMap={setErrorMap} />
                        {errorMap && <p className="text-sm text-red-500 animate-bounce">من فضلك قوم بتحديد موقعك</p>}
                        </div>

                        <Link to={`/Next/${data.id}`}>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-[#4F46E5] text-white font-semibold rounded-lg hover:bg-[#3832a9] transition duration-300"
                        >
                            التالي
                        </button>
                        </Link>
                    </form>
                </div>
            ) : (
                <Spinner />
            )}
            </div>
        </div>
    );
};

export default HelpMovingForm;
