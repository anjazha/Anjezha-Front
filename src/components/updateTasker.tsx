import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Categories } from "../types/categories";
import { getAllCategory } from "../functions/getAllCategory";
import Map from "./Map";
import { updateTasker } from "../functions/updateTasker";

interface formData {
    bio:string;
    pricing: string;
    categoryId: string;
    longitude: string;
    latitude: string;
}

const UpdateTasker = () => {
    const tasker = useSelector((state:RootState)=>state.tasker)
    // console.log(tasker);
    const {register,handleSubmit,formState:{errors}} = useForm<formData>({
        defaultValues: {
            bio:tasker.bio,
            pricing: tasker.pricing,
            categoryId: tasker.categoryId,
            longitude: tasker.longitude,
            latitude: tasker.latitude
        }
    })
    const [load, setLoad] = useState(false);
    const [data,setData] = useState<Categories[]>([])
    // console.log(data);
    const onSubmit = (data:formData)=>{
        setLoad(true);
        console.log(data);
        const allData = {
            bio: data.bio,
            pricing: +data.pricing,
            categoryId: +data.categoryId,
            longitude: +localStorage.longitude,
            latitude: +localStorage.latitude
        }
        console.log(allData);
        updateTasker(allData,setLoad)
    }
    useEffect(() => {
        getAllCategory(setData)
    },[])
    useEffect(()=>{
        localStorage.latitude = tasker.latitude
        localStorage.longitude = tasker.longitude
    },[tasker])
    return (
        tasker.id && data.length > 1 &&
        <div className="w-full mt-10 max-w-4xl">
            <h1 className="mb-4 text-2xl font-extrabold dark:text-bodyColor">تعديل العامل</h1>
            <div className="border rounded-lg p-6 shadow-lg bg-lightBg dark:bg-bodyDark">
                <form onSubmit={handleSubmit(onSubmit)} action="">
                    <div>
                        <label htmlFor="bio" className="text-base font-bold dark:text-bodyColor">النبذة الشخصية</label>
                        <textarea
                            {...register("bio", { required: true })}
                            id="bio"
                            className="w-full h-24 p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"
                        />
                        {errors.bio?.type==="required" && <span className="text-red-500">من فضلك ادخل النبذة الشخصية</span>}
                    </div>
                    <div className="mt-2">
                        <label htmlFor="pricing" className="block text-lg font-semibold text-darkColor dark:text-bodyColor">السعر</label>
                        <div className="flex items-center justify-between">
                            <input type={"number"} {...register("pricing",{required:true})} id="pricing" className="w-full h-10 p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor" />
                        </div>
                        {errors.pricing?.type==="required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل السعر</p>}
                    </div>
                    <div className="mt-2">
                        <label htmlFor="category" className="block text-lg font-semibold text-darkColor dark:text-bodyColor">الفئة</label>
                        <select {...register("categoryId",{required:true})} id="category" className="w-full h-10 px-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor">
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
                        <Map latitude={+tasker.latitude} location={true} longitude={+tasker.longitude}/>
                    </div>
                    <div className="flex items-center justify-end mt-6">
                        <button
                            type="submit"
                            disabled={load}
                            className="p-2 px-6 font-bold text-white bg-buttonsColor rounded-lg shadow-md hover:bg-primaryDark transition duration-300 ease-in-out focus:outline-none"
                        >
                            {load ? (
                                <div className="flex items-center gap-1">
                                    <span className="inline-block w-4 h-4 border-2 border-white rounded-full border-l-gray-500 animate-spin"></span>
                                </div>
                            ) : (
                                "حفظ"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateTasker;
