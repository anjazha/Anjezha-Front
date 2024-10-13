import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskById } from "../functions/getTaskById";
import { tasks } from "../types/search";
import Spinner from "../components/Spinner";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { applyTask } from "../functions/applyTask";
import toast from "react-hot-toast";

interface ApplyFormData {
    price:string;
    content:string;
}

const ApplyTask = () => {
    const tasker = useSelector((state:RootState)=>state.tasker)
    const {id} = useParams()
    const [task, setTask] = useState<tasks | null>(null)
    const {register,handleSubmit,formState:{errors}} = useForm<ApplyFormData>()
    const [loading, setLoading] = useState(false)
    const onSubmit = (data:ApplyFormData) =>{
        setLoading(true)
        console.log("Form Data:", data);
        if(!tasker.id){
            toast.error("من فضلك اصبح عامل حتي تستطيع التقديم علي المهام")
            setLoading(false)
            return;
        }
        // Apply task logic here
        const allData = {
            taskId:+(id as string),
            taskerId:+tasker.id,
            ...data,
            price:+data.price,
        }
        console.log(tasker);
        console.log(allData);
        applyTask(allData,setLoading)
    }
    useEffect(()=>{
        if(id){
            getTaskById(id,setTask)
        }
    },[id])
    return (
        <div className="flex justify-center py-10">
            <div className="container">
                {task ? (
                    <div className="p-4 rounded-lg shadow-md bg-bodyColor dark:bg-inputDark border border-transparent hover:border-navColor duration-300 transition-transform transform hover:scale-105 cursor-pointer flex flex-col items-start">
                        <h2 className="font-semibold md:text-xl text-darkColor dark:text-bodyColor text-ellipsis line-clamp-1">
                            {task.title}
                        </h2>
                        <p className="mb-2 text-darkColor dark:text-bodyColor line-clamp-3">
                            {task.description}
                        </p>
                        <div className="mb-2 text-lg font-bold text-primaryColor dark:text-bodyColor">
                            $ {task.budget}
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} action="" className="w-full">
                            <div className="mb-4">
                                <label htmlFor="expectedSalary" className="block text-lg font-semibold text-darkColor dark:text-bodyColor">الراتب المتوقع</label>
                                <input
                                    type="number"
                                    {...register("price", { required: true })}
                                    id="expectedSalary"
                                    className="w-full h-10 p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"
                                />
                                {errors.price?.type === "required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل الراتب المتوقع</p>}
                            </div>
                            <div className="">
                                <label htmlFor="content" className="block text-lg font-semibold text-darkColor dark:text-bodyColor">اخبرنا عن نفسك و لماذا يتم اختيارك</label>
                                <textarea
                                    {...register("content", { required: true })}
                                    id="content"
                                    className="w-full h-28 resize-none p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"
                                >
                                </textarea>
                                {errors.content?.type === "required" && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل هذا</p>}
                            </div>
                            <div className="mt-4 flex justify-center">
                                <button
                                    disabled={loading}
                                    className={`w-full p-2 py-2 ${loading?"border-b-2 border-buttonsColor":"bg-buttonsColor hover:bg-indigo-600 "} text-white rounded  transition duration-200`}              >
                                    {loading ? (
                                    <Spinner/>
                                    ) : (
                                    "Apply now"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                    )
                :<Spinner/>
                }
            </div>
        </div>
    );
}

export default ApplyTask;