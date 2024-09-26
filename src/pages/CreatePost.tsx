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
            <h1 className="text-xl font-bold text-center dark:text-bodyColor">نشر مهمة</h1>
                <div className="bg-[#D4CDA6] p-3 py-4 rounded-xl w-full sm:w-[500px] mt-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="title">الاسم</label><br/>
                            <input type="text" {...register("title",{required:true})} id="title" className="w-full h-8 p-2 mt-1 rounded outline-none bg-inputColor " />
                            {errors.title?.type==="required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل اسم المهمة</p>}
                        </div>
                        <div className="mt-3">
                            <label htmlFor="description">الوصف</label><br/>
                            <input type="text" {...register("description",{required:true})} id="description" className="w-full h-8 p-2 mt-1 rounded outline-none bg-inputColor " />
                            {errors.description?.type==="required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل وصف المهمة</p>}
                        </div>
                        <div className="mt-3">
                            <label htmlFor="date">التاريخ</label><br/>
                            <input type="date" {...register("date",{required:true})} id="date" className="w-full h-8 p-2 mt-1 rounded outline-none bg-inputColor " />
                            {errors.date?.type==="required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل تاريخ المهمة</p>}
                        </div>
                        <div className="mt-3">
                            <label htmlFor="budget">السعر</label><br/>
                            <div className="flex items-center justify-between w-full h-8 px-2 mt-1 rounded bg-inputColor">
                                <input type={"number"} {...register("budget",{required:true})} id="budget" className="w-full h-full bg-transparent rounded outline-none" />
                            </div>
                            {errors.budget?.type==="required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل السعر</p>}
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
                            <label htmlFor="address">العنوان</label><br/>
                            <input type="text" {...register("address",{required:true})} id="address" className="w-full h-8 p-2 mt-1 rounded outline-none bg-inputColor " />
                            {errors.address?.type==="required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل العنوان</p>}
                        </div>
                        <div className="mt-3">
                            <label htmlFor="status">الحالة</label><br/>
                            <input type="text" {...register("status",{required:true})} id="status" className="w-full h-8 p-2 mt-1 rounded outline-none bg-inputColor " />
                            {errors.status?.type==="required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل الحالة</p>}
                        </div>
                        <div className="mt-3">
                            <label htmlFor="skills">المهارات</label><br/>
                            <div className="flex items-center gap-5 mt-1">
                                <input type="text" ref={inputSkills} id="skills" className="w-full h-8 p-2 rounded outline-none bg-inputColor " />
                                <button type="button" onClick={()=>addSkills()} className="h-8 p-2 py-0 text-white rounded bg-buttonsColor">اضافة</button>
                            </div>
                            {errorSkills && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل المهارات</p>}
                        </div>
                        {
                            skills.length > 0 && 
                                <div className="mt-3">
                                    <label htmlFor="skills">مهاراتك</label><br/>
                                    <div className="flex flex-wrap items-center gap-5 mt-2">
                                        {
                                            skills.map((ele,index)=>(
                                                <div key={index} className="relative flex items-center gap-2 p-2 text-white bg-green-500 rounded">
                                                    <span className="text-sm">{ele}</span>
                                                    <span onClick={()=>deleteSkill(ele)} className="absolute bg-black rounded cursor-pointer -left-1 -top-1"><XIcon size={15} /></span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                        }
                        <div className="mt-3">
                            <label htmlFor="schedule_type">وقت العمل</label>
                            <select required {...register("schedule_type",{required:true})} id="schedule_type" name="schedule_type" className="w-full h-8 px-2 mt-1 rounded outline-none bg-inputColor">
                                {
                                    ["morning","evening"].map((ele,index)=>(
                                        <option key={index} value={ele}>{ele === "morning" ? "صباحا" : "مساءا" }</option>
                                    ))
                                }
                            </select>
                            {errors.schedule_type?.type==="required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل وقت العمل</p>}
                        </div>
                        <div className="mt-3">
                            <label htmlFor="start_time">وقت بدء العمل</label><br/>
                            <input type="time" {...register("start_time",{required:true})} id="start_time" className="w-full h-8 p-2 mt-1 rounded outline-none bg-inputColor " />
                            {errors.start_time?.type==="required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل وقت بدء العمل</p>}
                        </div>
                        <div className="mt-3">
                            <label htmlFor="end_time">وقت نهاية العمل</label><br/>
                            <input type="time" {...register("end_time",{required:true})} id="end_time" className="w-full h-8 p-2 mt-1 rounded outline-none bg-inputColor " />
                            {errors.end_time?.type==="required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل وقت نهاية العمل</p>}
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
    )
}
export default CreatePost;