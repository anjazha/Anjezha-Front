import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteTaskById } from "../functions/deleteTaskById";
import { useNavigate } from "react-router-dom";

const UpadteADeleteTask = ({id,setChanges}:{id:string,setChanges: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [display, setDisplay] = useState(false);
    const myUrl = useNavigate()
    const deleteTask = ()=>{
        deleteTaskById(id,setChanges);
    }
    return (
        <div>
            <div onClick={()=>setDisplay(display===true ? false : true)} className="absolute top-2 left-2 dark:text-bodyColor">
                <Ellipsis />
            </div>
            <div className={`${display ? 'block' : 'hidden'} w-[150px] border absolute top-8 left-2 p-2 rounded-md bg-bodyColor shadow-md dark:bg-inputDark`}>
                <div onClick={()=>myUrl(`/updateTask/${id}`)} className="w-full flex border-b items-center gap-2 hover:bg-slate-200 dark:hover:bg-[#65676b] p-2 rounded-md cursor-pointer">
                    <Pencil size={20} className="inline-block text-buttonsColor dark:text-[#0866ff] font-bold"/>
                    <span className="text-inputDark dark:text-bodyColor">تعديل</span>
                </div>
                <div onClick={()=>deleteTask()} className="w-full flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-[#65676b] p-2 rounded-md cursor-pointer">
                    <Trash2 size={20} className="inline-block text-red-500 font-bold"/>
                    <span className="text-inputDark dark:text-bodyColor">حذف</span>
                </div>
            </div>
        </div>
    );
}

export default UpadteADeleteTask;