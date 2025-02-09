import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskById } from "../functions/getTaskById";
import { tasks } from "../types/search";
import Spinner from "../components/Spinner";
import FormUpdateTask from "../components/formUpdateTask";

const UpdateTask = () => {
    const {id} = useParams()
    const [task, setTask] = useState<tasks | null>(null)
    // console.log(id);
    useEffect(()=>{
        if(id){
            getTaskById(id,setTask)
        }
    },[id])
    return (
        <div className="flex justify-center py-5">
            <div className="container">
                {
                    task? (
                        <>
                            <h1 className="text-2xl font-bold text-center text-darkColor dark:text-bodyColor">تعديل مهمة</h1>
                            <FormUpdateTask task={task}/>
                        </>
                    ) : (
                        <Spinner />
                    )
                }
            </div>
        </div>
    );
}

export default UpdateTask;