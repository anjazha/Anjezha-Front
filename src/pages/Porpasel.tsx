import { useNavigate, useParams } from "react-router-dom";
import { getTaskerApplication } from "../functions/getTaskerApplication";
import { useEffect, useState } from "react";
import { taskersData } from "./TaskerApplication";
import Spinner from "../components/Spinner";
import image from "../assets/default-user-image.jpg"
import { assignment } from "../functions/taskAssignment";
import { useAppDispatch } from "../store/store";
import { addUserChat } from "../store/Slices/userChat";

const Porpasel = () => {
    const {id,index} = useParams()
    const [taskers,setTaskers] = useState<taskersData[]>([])
    const [loading,setLoading] = useState<boolean>(true)
    const myUrl = useNavigate()
    const dispatch = useAppDispatch()
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
                    loading ? 
                    <Spinner />
                    :
                        taskers.map((tasker,i)=>(
                            i===+(index as string) &&  (
                            <div key={i} className="bg-[#D9D9D9] dark:bg-inputDark shadow-lg p-5 rounded-md">
                                <div onClick={()=>myUrl(`/taskerProfile/${tasker.tasker.id}`)} className="flex cursor-pointer flex-col items-center gap-3 sm:flex-row sm:items-start">
                                    <div>
                                        <img src={tasker?.tasker.profile_picture || image} alt="tasker image" className="w-20 h-20 rounded-full"/>
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-lg text-center sm:text-start font-semibold capitalize dark:text-bodyColor">{tasker?.tasker.name}</h2>
                                        <p className="dark:text-bodyColor text-center sm:text-start my-2">{tasker.price || 2000} ج.م</p>
                                        <p className="dark:text-bodyColor text-center sm:text-start">{tasker.content}</p>
                                    </div>
                                </div>
                                <div className="flex justify-center w-full mt-5 gap-5">
                                    <button onClick={()=>taskAssignment(tasker.task_id,tasker.tasker.id)} className="p-2 bg-indigo-500 hover:bg-buttonsColor duration-300 text-white rounded-md">قبول</button>
                                    <button onClick={()=>{
                                        dispatch(addUserChat({id:tasker.tasker.user_id,name:tasker.tasker.name,profilePicture:tasker.tasker.profile_picture}))
                                        myUrl(`/chats/userChat/${tasker.tasker.user_id}`)
                                    }} className="p-2 border-[2px] border-buttonsColor hover:bg-indigo-600 hover:text-white duration-300 dark:text-white rounded-md">مناقشة</button>
                                </div>
                            </div>
                            )
                        ))
                }
            </div>
        </div>
    );
}

export default Porpasel;
