import { useEffect, useRef, useState } from "react";
import Map from "./Map";
import Spinner from "./Spinner";
import { getAllCategory } from "../functions/getAllCategory";
import { Categories } from "../types/categories";
import { useForm } from "react-hook-form";
import { tasks } from "../types/search";
import { XIcon } from "lucide-react";
import { updateTaskById } from "../functions/updateTaskById";

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

const FormUpdateTask = ({task}:{task:tasks}) => {
    const [data,setData] = useState<Categories[]>([])
    const date = `${new Date(task.date).getFullYear()}-${new Date(task.date).getMonth()+1 >=10 ? `${new Date(task.date).getMonth()+1}` : `0${new Date(task.date).getMonth()+1}` }-${new Date(task.date).getDate()}`
    // const cate = data.find((ele)=>ele.category=== task.category);
    // console.log(cate);
    const {register,handleSubmit,formState:{errors}} = useForm<formType>({
        defaultValues: {
            title: task.title,
            description: task.description,
            date: date,
            budget: task.budget.toString(),
            address: task.address,
            status: task.status,
            start_time: task.start_time,
            end_time: task.end_time,
            schedule_type: task.schedule_type
        }
    })
    // console.log(date);
    const [loading,setLoading] = useState(false)
    const [errorMap,setErrorMap] = useState(false)
    const [errorSkills,setErrorSkills] = useState(false)
    const inputSkills = useRef<HTMLInputElement | null>(null)
    const [skills,setSkills] = useState<string[]>(task.skills)
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
        const startPush = data.start_time.split(":").concat(["00"]).join(":")
        const start = data.start_time.split(":").length === 2 ? startPush : data.start_time
        // console.log(start);

        const endPush = data.end_time.split(":").concat(["00"]).join(":")
        const end = data.end_time.split(":").length === 2 ? endPush : data.end_time
        // console.log(end);

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
                start_time:start,
                end_time:end,
                schedule_type:data.schedule_type,
            },
            location :{
                latitude: +localStorage.latitude,
                longitude: +localStorage.longitude
            }
        }
        console.log(allData);
        updateTaskById(task.id,allData,setLoading)
    }
    useEffect(() => {
        getAllCategory(setData)
    },[])
    return (
        <div className="bg-bodyColor dark:bg-inputDark p-5 rounded-xl w-full  mt-5 shadow-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-lg font-semibold text-darkColor dark:text-bodyColor">الاسم</label>
                        <input
                            type="text"
                            {...register("title", { required: true })}
                            id="title"
                            className="w-full h-10 p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"
                        />
                        {errors.title?.type === "required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل اسم المهمة</p>}
                    </div>
    
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-lg font-semibold text-darkColor dark:text-bodyColor">الوصف</label>
                        <textarea
                            rows={10}
                            {...register("description", { required: true })}
                            id="description"
                            className="w-full h-50 p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"
                        />
                        {errors.description?.type === "required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل وصف المهمة</p>}
                    </div>
    
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-lg font-semibold text-darkColor dark:text-bodyColor">التاريخ</label>
                        <input
                            type="date"
                            {...register("date", { required: true })}
                            id="date"
                            className="w-full h-10 p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"
                        />
                        {errors.date?.type === "required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل تاريخ المهمة</p>}
                    </div>
    
                    <div className="mb-4">
                        <label htmlFor="budget" className="block text-lg font-semibold text-darkColor dark:text-bodyColor">السعر</label>
                        <input
                            type="number"
                            {...register("budget", { required: true })}
                            id="budget"
                            className="w-full h-10 p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"
                        />
                        {errors.budget?.type === "required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل السعر</p>}
                    </div>
    
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-lg font-semibold text-darkColor dark:text-bodyColor">الفئة</label>
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
                        <label htmlFor="address" className="block text-lg font-semibold text-darkColor dark:text-bodyColor">العنوان</label>
                        <input
                            type="text"
                            {...register("address", { required: true })}
                            id="address"
                            className="w-full h-10 p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"
                        />
                        {errors.address?.type === "required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل العنوان</p>}
                    </div>
    
                    <div className="mb-4">
                        <label htmlFor="status" className="block text-lg font-semibold text-darkColor dark:text-bodyColor">الحالة</label>
                        <select
                            {...register("status", { required: true })}
                            id="status"
                            className="w-full h-10 px-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"
                        >
                            <option value="pending">Pending</option>
                            <option value="open">Open</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="closed">Closed</option>
                        </select>
                        {errors.status?.type === "required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل الحالة</p>}
                    </div>
    
                    <div className="mb-4">
                        <label htmlFor="skills" className="block text-lg font-semibold text-darkColor dark:text-bodyColor">المهارات</label>
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
                            <label className="block text-lg font-semibold text-darkColor dark:text-bodyColor">مهاراتك</label>
                            <div className="flex flex-wrap items-center gap-5 mt-2">
                                {skills.map((ele, index) => (
                                    <div key={index} className="relative flex items-center gap-2 p-2 text-white bg-buttonsColor rounded">
                                        <span className="text-sm">{ele}</span>
                                        <span onClick={() => deleteSkill(ele)} className="absolute bg-black rounded cursor-pointer -left-1 -top-1"><XIcon size={15} /></span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
    
                    <div className="mb-4">
                        <label htmlFor="schedule_type" className="block text-lg font-semibold text-darkColor dark:text-bodyColor">وقت العمل</label>
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
                        <label htmlFor="start_time" className="block text-lg font-semibold text-darkColor dark:text-bodyColor">وقت بدء العمل</label>
                        <input
                            type="time"
                            {...register("start_time", { required: true })}
                            id="start_time"
                            className="w-full h-10 p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"
                        />
                        {errors.start_time?.type === "required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل وقت بدء العمل</p>}
                    </div>
    
                    <div className="mb-4">
                        <label htmlFor="end_time" className="block text-lg font-semibold text-darkColor dark:text-bodyColor">وقت نهاية العمل</label>
                        <input
                            type="time"
                            {...register("end_time", { required: true })}
                            id="end_time"
                            className="w-full h-10 p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"
                        />
                        {errors.end_time?.type === "required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل وقت نهاية العمل</p>}
                    </div>
    
                    <div className="mb-4 z-10">
                        <label htmlFor="location" className="block text-lg font-semibold text-darkColor dark:text-bodyColor">الموقع</label>
                        <Map latitude={+task.latitude} location={true} longitude={+task.longitude} setErrorMap={setErrorMap} />
                        {errorMap && <p className="text-sm text-red-500 animate-bounce">من فضلك قوم بتحديد موقعك</p>}
                    </div>
    
                    <div className="flex justify-center mt-6">
                            <button
                                disabled={loading}
                                className={`w-full p-2 py-2 ${loading?"border-b-2 border-buttonsColor":"bg-buttonsColor hover:bg-indigo-600 "} text-white rounded  transition duration-200`}              >
                                {loading ? (
                                <Spinner/>
                                ) : (
                                "تعديل"
                                )}
                            </button>
                    </div>
                </form>
            </div>
    );
}

export default FormUpdateTask;