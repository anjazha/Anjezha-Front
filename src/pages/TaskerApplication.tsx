import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTaskerApplication } from "../functions/getTaskerApplication";
import Spinner from "../components/Spinner";
import defaultImage from "../assets/default-user-image.jpg"

export interface taskersData {
    content:string;
    id:number;
    status:string;
    task_id:string
    price:string | null,
    tasker : {
        id:number,
        name:string,
        profile_picture:string | null,
    }
}

const TaskerApplication = () => {
    const {id} = useParams()
    const [taskers,setTaskers] = useState<taskersData[]>([])
    const [loading,setLoading] = useState<boolean>(true)
    const myUrl = useNavigate()
    useEffect(()=>{
        if(id){
            getTaskerApplication(id,setTaskers,setLoading)
        }
    },[id])
    return (
        <div className="flex justify-center py-10">
            <div className="container">
                {
                    loading? (
                        <Spinner />
                    ) : taskers.length === 0 ? (
                        <h1 className="text-center text-xl mb-5 font-bold dark:text-bodyColor">لايوجد متقدمين حاليا</h1>
                    ) : <div>
                        <h1 className="text-center text-xl mb-5 font-bold dark:text-bodyColor">المتقدمين علي هذه المهمة</h1>
                        <div  className="flex flex-col gap-5">
                            {
                                taskers.map((ele,i)=>(
                                    <div key={i} className="p-4 rounded-lg relative shadow-md bg-bodyColor dark:bg-inputDark border border-transparent hover:border-navColor duration-300 transition-transform transform hover:scale-105 cursor-pointer">
                                        <div className="">
                                            <div className="flex flex-col sm:flex-row items-center gap-3">
                                                <div onClick={()=>myUrl(`/taskerProfile/${ele.tasker.id}`)}>
                                                    <img src={ele.tasker.profile_picture || defaultImage} alt="tasker" className="w-14 h-14 rounded-full" />
                                                </div>
                                                <div className="flex flex-col items-center sm:items-start" onClick={()=>myUrl(`/porpasel/${id}/${i}`)}>
                                                    <h3 className="font-semibold dark:text-bodyColor capitalize">{ele.tasker.name}</h3>
                                                    <p className="dark:text-bodyColor text-sm">{ele.content.slice(0,50)}...</p>
                                                    <p className="dark:text-bodyColor text-sm">{ele.price || 2000} ج.م</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default TaskerApplication;
