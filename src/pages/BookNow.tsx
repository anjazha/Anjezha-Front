import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSubCategoriesById } from "../functions/getSubCategoriesById";
import Spinner from '../components/Spinner';
import { subCategories } from "../types/categories";

interface FormData {
    address: {
        street: string;
        unit?: string;
    };
    taskSize: string[];
    taskDetails?: string;
}

const HelpMovingForm = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<subCategories | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log("Form Data:", data);
    };

    
    useEffect(() => {
        if (id) {
            getSubCategoriesById(id, setData);  
        }
    }, [id]);

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg ">
            
            {data ? (
                <>
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        {data.subcategory}
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">عنوان المهمة</label>
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
                            <label className="block text-gray-700 font-semibold mb-2">ما حجم مهمتك؟</label>
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

                        
                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-2">أخبرنا بتفاصيل مهمتك؟</label>
                            <textarea
                                placeholder="أوصف مهمتك..."
                                className="w-full p-2 border border-gray-300 rounded"
                                {...register("taskDetails")}
                            ></textarea>
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
                </>
            ) : (
                <Spinner />
            )}
        </div>
    );
};

export default HelpMovingForm;
