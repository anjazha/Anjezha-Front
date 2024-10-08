import { ArrowDownToLine, FileText, Image, XIcon } from "lucide-react";
import { tasks } from "../types/search";
import Map from "./Map";
import { Link } from "react-router-dom";

const TaskDetails = ({task,left,setLeftDetails}:{task:tasks | null,left:string,setLeftDetails: React.Dispatch<React.SetStateAction<string>>}) => {
    return (
        <div className={`w-full sm:w-[500px] bg-bodyColor dark:bg-inputDark dark:text-bodyColor shadow-xl rounded-lg h-[calc(100vh-75px)] overflow-y-scroll fixed top-[80px] px-4 py-5 ${left} duration-500 z-40`}>
            <h1 className="text-center text-xl font-bold">تفاصيل المهمة</h1>
            <div onClick={()=>setLeftDetails("left-[-100%]")} className="absolute top-2 cursor-pointer right-3 hover:text-buttonsColor duration-300">
                <XIcon size={30}/>
            </div>
            <div className="mt-5">
                
                <div className="flex-1">
                    {/* Task Title */}
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold md:text-xl text-darkColor dark:text-bodyColor text-ellipsis line-clamp-1">
                            {task?.title}
                        </h2>
                        <h2 className="text-green-500 text-center font-semibold mb-3">{task?.status}</h2>
                    </div>
                    <div className="mb-1 text-lg font-bold text-primaryColor dark:text-bodyColor">
                        {task?.budget} ج.م 
                    </div>
                
                    {/* Task Address, Date, Time, Schedule - Small Text */}
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex gap-x-5 flex-wrap">
                        <p>{task?.address}</p>
                        <p>{new Date(task?.date as string).toLocaleDateString()}</p>
                        <p>{task?.start_time} - {task?.end_time}</p>
                        <p>{task?.schedule_type}</p>
                    </div>
                
                    {/* Task Description */}
                    <p className="my-2 text-sm text-darkColor dark:text-bodyColor line-clamp-3">
                        {task?.description}
                    </p>
                
                    {/* Task Category as a Primary Color Tag */}
                    <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                        <span className="inline-block bg-buttonsColor text-white px-2 py-1 rounded-full text-xs font-medium">
                            {task?.category}
                        </span>
                    
                        {/* Task Skills as Gray Tags */}
                        <div className="mt-2 mb-4 flex flex-wrap gap-2">
                            {task?.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs font-medium"
                                    >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {
                        task?.attachments &&
                        <div className="mb-4">
                            {
                                task?.attachments.map((attachment, index) => (
                                    <div className="flex gap-3 items-center" key={index}>
                                        {
                                            attachment.type === "image" ?
                                            <Image className="text-green-500" />
                                            : <FileText className="text-red-500" />
                                        }
                                        <a href={attachment.url} download={true} className={`${attachment.type === "image" ? "bg-green-500 hover:bg-red-600" : "bg-red-500 hover:bg-red-600"} duration-300 p-1 px-3 text-white text-sm flex items-center gap-2 rounded-full`}><ArrowDownToLine size={18}/>{attachment.size}</a>
                                    </div>
                                ))
                            }
                        </div>
                    }
                    
                    {
                        task?.latitude && task?.longitude &&
                        <Map latitude={(task?.latitude)} location={false} longitude={(task?.longitude)}/>
                    }
                </div>
                <div className="mt-4 flex justify-center gap-5">
                    <Link to={`/applyTask/${task?.id}`} className="bg-buttonsColor text-center text-white py-2 px-4 w-full rounded-lg text-sm hover:bg-navColor transition">
                        Apply Now
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default TaskDetails;
