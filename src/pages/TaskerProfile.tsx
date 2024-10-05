import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTaskerById } from "../functions/getTaskerById";

const TaskerProfile = () => {
    const {id} = useParams()
    console.log(id);
    useEffect(()=>{
        if(id){
            getTaskerById(id)
        }
    },[id])
    return (
        <div>
            <h1>Profile Tasker</h1>
        </div>
    );
}

export default TaskerProfile;
