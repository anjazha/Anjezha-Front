import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { getAllCategory } from "../functions/getAllCategory";
import Map from "../components/Map";
import { becomeTasker } from "../functions/becomeTasker";

interface formType {
    bio: string;
    pricing: string;
    categoryId: string;
    bidding:string
}
interface subData {
    categoryId:string,
    subcategory:string,
    id:string,
    imageUrl:string,
    description:string,
}
interface dataType {
    id:string,
    category:string,
    imageUrl:string,
    description:string,
    subcategories:subData[]
}

const BecomeTasker = () => {
    const {register,handleSubmit,formState:{errors}} = useForm<formType>()
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState<dataType[]>([])
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
                <h1 className="text-xl font-bold text-center dark:text-bodyColor">اصبح عامل</h1>
                <div className="bg-[#D4CDA6] p-3 py-4 rounded-xl w-full sm:w-[500px] mt-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="bio">وصف ملفك الشخصي</label><br/>
                            <input type="text" {...register("bio",{required:true})} id="bio" className="w-full h-8 p-2 mt-1 rounded outline-none bg-inputColor " />
                            {errors.bio?.type==="required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل وصف ملفك الشخصي</p>}
                        </div>
                        <div className="mt-3">
                            <label htmlFor="pricing">السعر</label><br/>
                            <div className="flex items-center justify-between w-full h-8 px-2 mt-1 rounded bg-inputColor">
                                <input type={"number"} {...register("pricing",{required:true})} id="pricing" className="w-full h-full bg-transparent rounded outline-none" />
                            </div>
                            {errors.pricing?.type==="required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل السعر</p>}
                        </div>
                        <div className="mt-3">
                            <label htmlFor="category">الفئة</label>
                            <select required {...register("categoryId",{required:true})} id="category" className="w-full h-8 px-2 mt-1 rounded outline-none bg-inputColor">
                                {
                                    data.map(item=>(
                                        <option key={item.id} value={item.id}>{item.category}</option>
                                    ))
                                }
                            </select>
                            {errors.categoryId?.type==="required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل الفئة</p>}
                        </div>
                        <div className="mt-3">
                            <label htmlFor="location" className="inline-block mb-1">الموقع</label><br/>
                            <Map setErrorMap={setErrorMap}/>
                            {errorMap && <p className="text-sm text-red-500 animate-bounce">من فضلك قوم بتحديد موقعك </p>}
                        </div>
                        <div className="flex justify-center mt-4">
                            <button disabled={loading} className="w-full p-2 py-1 text-white rounded bg-buttonsColor">
                                {
                                    loading ? 
                                    <div className="flex items-center justify-center">
                                        <span className="inline-block w-5 h-5 rounded-full border border-black border-l-[#D4CDA6] animate-spin"></span>
                                    </div>
                                    :"ارسال"
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BecomeTasker;