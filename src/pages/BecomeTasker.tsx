import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { getAllCategory } from "../functions/getAllCategory";
import Map from "../components/Map";
import { becomeTasker } from "../functions/becomeTasker";
import { Categories } from "../types/categories";
import Spinner from "../components/Spinner";

interface formType {
    bio: string;
    pricing: string;
    categoryId: string;
    bidding:string
}

const BecomeTasker = () => {
    const {register,handleSubmit,formState:{errors}} = useForm<formType>()
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState<Categories[]>([])
    const [errorMap,setErrorMap] = useState(false)
    const onSubmit = (data:formType) => {
        setLoading(true)
        // console.log(data);
        if(!localStorage.longitude || !localStorage.latitude){
            setErrorMap(true)
            setLoading(false)
            return
        }
        const allData = {
            bio: data.bio,
            pricing: +data.pricing,
            categoryId: +data.categoryId,
            bidding: 222,
            latitude: +localStorage.latitude,
            longitude: +localStorage.longitude
        }
        console.log(allData);
        becomeTasker(allData,setLoading)
    }
    useEffect(() => {
        getAllCategory(setData)
    },[])
    return (
        <div className="flex justify-center py-5">
            <div className="container z-30 flex flex-col items-center">
                <h1 className="text-2xl font-bold text-center text-darkColor dark:text-bodyColor">اصبح عامل</h1>
                <div className="bg-bodyColor dark:bg-inputDark p-3 py-4 rounded-xl shadow-md w-full my-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="bio" className="block text-lg font-semibold text-darkColor dark:text-bodyColor">وصف ملفك الشخصي</label>
                            <textarea {...register("bio",{required:true})} id="bio" className="w-full h-28 p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor" />
                            {errors.bio?.type==="required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل وصف ملفك الشخصي</p>}
                        </div>
                        <div className="mt-3">
                            <label htmlFor="pricing" className="block text-lg font-semibold text-darkColor dark:text-bodyColor">السعر</label>
                            <div className="flex items-center justify-between">
                                <input type={"number"} {...register("pricing",{required:true})} id="pricing" className="w-full h-10 p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor" />
                            </div>
                            {errors.pricing?.type==="required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل السعر</p>}
                        </div>
                        <div className="mt-3">
                            <label htmlFor="category" className="block text-lg font-semibold text-darkColor dark:text-bodyColor">الفئة</label>
                            <select required {...register("categoryId",{required:true})} id="category" className="w-full h-10 p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor">
                                {
                                    data.map(item=>(
                                        <option key={item.id} value={item.id}>{item.category}</option>
                                    ))
                                }
                            </select>
                            {errors.categoryId?.type==="required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل الفئة</p>}
                        </div>
                        <div className="mt-3">
                            <label htmlFor="location" className="block mb-2 text-lg font-semibold text-darkColor dark:text-bodyColor">الموقع</label>
                            <Map latitude={+localStorage.latitude} longitude={+localStorage.longitude} setErrorMap={setErrorMap}/>
                            {errorMap && <p className="text-sm text-red-500 animate-bounce">من فضلك قوم بتحديد موقعك </p>}
                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                disabled={loading}
                                className={`w-full p-2 py-2 ${loading?"border-b-2 border-buttonsColor":"bg-buttonsColor hover:bg-indigo-600 "} text-white rounded  transition duration-200`}              >
                                {loading ? (
                                <Spinner/>
                                ) : (
                                "ارسال"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BecomeTasker;