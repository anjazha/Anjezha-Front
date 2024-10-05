import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTaskerApplication } from "../functions/getTaskerApplication";
import Spinner from "../components/Spinner";
import defaultImage from "../assets/default-user-image.jpg"
import { assignment } from "../functions/taskAssignment";

export interface taskersData {
    content:string;
    id:number;
    status:string;
    task_id:string
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
    const taskAssignment = (taskId:string,taskerId:number)=>{
        assignment(taskId,taskerId)
    }
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
                                        <div className="flex flex-col items-start gap-5 sm:flex-row justify-between sm:items-center">
                                            <div onClick={()=>myUrl(`/taskerProfile/${ele.tasker.id}`)} className="flex items-center gap-3">
                                                <div>
                                                    <img src={ele.tasker.profile_picture || defaultImage} alt="tasker" className="w-14 h-14 rounded-full" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold dark:text-bodyColor capitalize">{ele.tasker.name}</h3>
                                                    <p className="dark:text-bodyColor text-sm">{ele.content}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-center w-full sm:w-fit gap-5">
                                                <button onClick={()=>taskAssignment(ele.task_id,ele.tasker.id)} className="p-2 bg-indigo-500 hover:bg-buttonsColor duration-300 text-white rounded-md">قبول</button>
                                                <button className="p-2 border-[2px] border-buttonsColor hover:bg-indigo-600 hover:text-white duration-300 dark:text-white rounded-md">مناقشة</button>
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
