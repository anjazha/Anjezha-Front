import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskerById } from "../functions/getTaskerById";
import Spinner from "../components/Spinner";
import { taskerProfile } from "../types/taskerProfile";
import image from "../assets/default-user-image.jpg"
import ReviewsTasker from "../components/ReviewsTasker";

const TaskerProfile = () => {
    const {id} = useParams()
    const [tasker,setTasker] = useState<taskerProfile | null>(null)
    // console.log(id);
    useEffect(()=>{
        if(id){
            getTaskerById(id,setTasker)
        }
    },[id])
    // console.log(tasker);
    return (
        <div className="flex justify-center py-10">
            <div className="container">
                {
                    tasker ? (
                        <div className="bg-[#D9D9D9] dark:bg-inputDark shadow-lg p-5 rounded-md">
                            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                                <div>
                                    <img src={tasker?.profile.profilePicture || image} alt="tasker image" className="w-20 h-20 rounded-full"/>
                                </div>
                                <div className="flex-1">
                                    <h2 className="font-semibold text-lg dark:text-bodyColor capitalize">{tasker?.profile.name}</h2>
                                    
                                    <p className="dark:text-bodyColor ">{tasker?.profile.email}</p>
                                    <div className="mt-5">
                                        <h2 className="font-semibold text-lg dark:text-bodyColor">وصفي :</h2>
                                        <p className="dark:text-bodyColor">{tasker?.bio}</p>
                                    </div>
                                    <div className="mt-5">
                                        <h2 className="font-semibold text-lg dark:text-bodyColor">الاراء :</h2>
                                        <div>
                                            <ReviewsTasker taskerId={id} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Spinner />
                    )
                }
            </div>
        </div>
    );
}

export default TaskerProfile;
