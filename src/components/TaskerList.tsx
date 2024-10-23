import { useNavigate } from "react-router-dom";
import image from "../assets/default-user-image.jpg"
import { useAppDispatch } from "../store/store";
import { addUserChat } from "../store/Slices/userChat";

export interface taskerData{
    name:string;
    email:string;
    bio:string;
    phonenumber:string;
    profilepicture:string | null;
    price:string;
    userid:string;
    id:string;
    totaltasker:string;
    skillname:string[] | null[];
}

const TaskerList = ({tasker}:{tasker:taskerData})=>{
    const myUrl = useNavigate()
    const dispatch = useAppDispatch()
    return(
        <div className="bg-[#D9D9D9] dark:bg-inputDark shadow-lg p-5 rounded-md border border-transparent hover:border-navColor duration-300 transition-transform transform hover:scale-105 cursor-pointer ">
            <div onClick={()=>myUrl(`/taskerProfile/${tasker.id}`)} className="flex cursor-pointer flex-col items-center gap-3 sm:flex-row sm:items-start">
                <div>
                    <img src={tasker.profilepicture || image} alt="tasker image" className="w-20 h-20 rounded-full"/>
                </div>
                <div className="flex-1">
                    <h2 className="text-lg text-center sm:text-start font-semibold capitalize dark:text-bodyColor">{tasker.name}</h2>
                    <p className="dark:text-bodyColor text-center sm:text-start ">{tasker.price} ج.م</p>
                    <p className="dark:text-bodyColor text-center sm:text-start">{tasker.bio}</p>
                </div>
            </div>
            <div className="flex justify-center w-full mt-5 gap-5">
                <button onClick={()=>{
                    dispatch(addUserChat({id:tasker.userid,name:tasker.name,profilePicture:tasker.profilepicture}))
                    myUrl(`/chats/userChat/${tasker.userid}`)
                }} className="p-2 border-[2px] border-buttonsColor bg-indigo-600 hover:bg-indigo-700  duration-300 text-white rounded-md">دردشة</button>
            </div>
        </div>
    )
}
export default TaskerList;