import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { getAllCategory } from "../functions/getAllCategory";
import Map from "../components/Map";
import { XIcon } from "lucide-react";
import { createPost } from "../functions/createPost";

interface formType {
    title: string;
    description: string;
    date: string;
    budget: string;
    address: string;
    status: string;
    skills: string;
    categoryId: string;
    start_time:string;
    end_time:string;
    schedule_type:string;
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

const CreatePost = ()=>{
    const {register,handleSubmit,formState:{errors}} = useForm<formType>()
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState<dataType[]>([])
    const [errorMap,setErrorMap] = useState(false)
    const [errorSkills,setErrorSkills] = useState(false)
    const inputSkills = useRef<HTMLInputElement | null>(null)
    const [skills,setSkills] = useState<string[]>([])
    const addSkills = ()=>{
        setErrorSkills(false)
        const newSkill = inputSkills.current?.value
        if(newSkill){
            setSkills((prev)=>[...prev,newSkill])
            inputSkills.current!.value = ""
        }
    }
    const deleteSkill = (item:string)=>{
        const newSkills = skills.filter((ele)=>ele !== item)
        setSkills(newSkills)
    }
    const onSubmit = (data:formType) => {
        setLoading(true)
        if(skills.length === 0){
            setErrorSkills(true)
            setLoading(false)
            return
        }
        if(!localStorage.longitude || !localStorage.latitude){
            setErrorMap(true)
            setLoading(false)
            return
        }
        const allData = {
            title: data.title,
            description: data.description,
            date: data.date,
            budget: +data.budget,
            address: data.address,
            status: data.status,
            category_id: +data.categoryId,
            skills: skills,
            schedule : {
                start_time:`${data.start_time}:00`,
                end_time:`${data.end_time}:00`,
                schedule_type:data.schedule_type,
            },
            location :{
                latitude: +localStorage.latitude,
                longitude: +localStorage.longitude
            }
        }
        console.log(allData);
        createPost(allData,setLoading)
    }
    useEffect(() => {
        getAllCategory(setData)
    },[])
    return(
        <div className="flex justify-center py-5">
        <div className="container z-30 flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center text-darkColor">نشر مهمة</h1>
            <div className="bg-lightColor p-5 rounded-xl w-full  mt-5 shadow-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-lg font-semibold">الاسم</label>
                        <input
                            type="text"
                            {...register("title", { required: true })}
                            id="title"
                            className="w-full h-10 p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"
                        />
                        {errors.title?.type === "required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل اسم المهمة</p>}
                    </div>
    
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-lg font-semibold">الوصف</label>
                        <textarea
                            rows={10}
                            {...register("description", { required: true })}
                            id="description"
                            className="w-full h-50 p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"
                        />
                        {errors.description?.type === "required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل وصف المهمة</p>}
                    </div>
    
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-lg font-semibold">التاريخ</label>
                        <input
                            type="date"
                            {...register("date", { required: true })}
                            id="date"
                            className="w-full h-10 p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"
                        />
                        {errors.date?.type === "required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل تاريخ المهمة</p>}
                    </div>
    
                    <div className="mb-4">
                        <label htmlFor="budget" className="block text-lg font-semibold">السعر</label>
                        <input
                            type="number"
                            {...register("budget", { required: true })}
                            id="budget"
                            className="w-full h-10 p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"
                        />
                        {errors.budget?.type === "required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل السعر</p>}
                    </div>
    
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-lg font-semibold">الفئة</label>
                        <select
                            required
                            {...register("categoryId", { required: true })}
                            id="category"
                            className="w-full h-10 p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"
                        >
                            {data.map(item => (
                                <option key={item.id} value={item.id}>{item.category}</option>
                            ))}
                        </select>
                        {errors.categoryId?.type === "required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل الفئة</p>}
                    </div>
    
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-lg font-semibold">العنوان</label>
                        <input
                            type="text"
                            {...register("address", { required: true })}
                            id="address"
                            className="w-full h-10 p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"
                        />
                        {errors.address?.type === "required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل العنوان</p>}
                    </div>
    
                    <div className="mb-4">
                        <label htmlFor="status" className="block text-lg font-semibold">الحالة</label>
                        <input
                            type="text"
                            {...register("status", { required: true })}
                            id="status"
                            className="w-full h-10 p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"
                        />
                        {errors.status?.type === "required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل الحالة</p>}
                    </div>
    
                    <div className="mb-4">
                        <label htmlFor="skills" className="block text-lg font-semibold">المهارات</label>
                        <div className="flex items-center gap-3 mt-1">
                            <input
                                type="text"
                                ref={inputSkills}
                                id="skills"
                                className="w-full h-10 p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"
                            />
                            <button
                                type="button"
                                onClick={() => addSkills()}
                                className="h-10 p-2 text-white rounded bg-buttonsColor"
                            >
                                اضافة
                            </button>
                        </div>
                        {errorSkills && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل المهارات</p>}
                    </div>
    
                    {skills.length > 0 && (
                        <div className="mb-4">
                            <label className="block text-lg font-semibold">مهاراتك</label>
                            <div className="flex flex-wrap items-center gap-5 mt-2">
                                {skills.map((ele, index) => (
                                    <div key={index} className="relative flex items-center gap-2 p-2 text-white bg-green-500 rounded">
                                        <span className="text-sm">{ele}</span>
                                        <span onClick={() => deleteSkill(ele)} className="absolute bg-black rounded cursor-pointer -left-1 -top-1"><XIcon size={15} /></span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
    
                    <div className="mb-4">
                        <label htmlFor="schedule_type" className="block text-lg font-semibold">وقت العمل</label>
                        <select
                            required
                            {...register("schedule_type", { required: true })}
                            id="schedule_type"
                            className="w-full h-10 p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"
                        >
                            {["morning", "evening"].map((ele, index) => (
                                <option key={index} value={ele}>{ele === "morning" ? "صباحا" : "مساءا"}</option>
                            ))}
                        </select>
                        {errors.schedule_type?.type === "required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل وقت العمل</p>}
                    </div>
    
                    <div className="mb-4">
                        <label htmlFor="start_time" className="block text-lg font-semibold">وقت بدء العمل</label>
                        <input
                            type="time"
                            {...register("start_time", { required: true })}
                            id="start_time"
                            className="w-full h-10 p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"
                        />
                        {errors.start_time?.type === "required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل وقت بدء العمل</p>}
                    </div>
    
                    <div className="mb-4">
                        <label htmlFor="end_time" className="block text-lg font-semibold">وقت نهاية العمل</label>
                        <input
                            type="time"
                            {...register("end_time", { required: true })}
                            id="end_time"
                            className="w-full h-10 p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"
                        />
                        {errors.end_time?.type === "required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل وقت نهاية العمل</p>}
                    </div>
    
                    <div className="mb-4">
                        <label htmlFor="location" className="block text-lg font-semibold">الموقع</label>
                        <Map setErrorMap={setErrorMap} />
                        {errorMap && <p className="text-sm text-red-500 animate-bounce">من فضلك قوم بتحديد موقعك</p>}
                    </div>
    
                    <div className="flex justify-center mt-6">
                        <button
                            disabled={loading}
                            className="w-full p-2 py-2 text-white rounded bg-buttonsColor hover:bg-buttonsHover"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-3 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    <span>جاري التحميل...</span>
                                </div>
                            ) : "نشر"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    )
}
export default CreatePost;