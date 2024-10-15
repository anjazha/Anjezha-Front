import { ArrowDownToLine, FileText, Image, XIcon } from "lucide-react";
import { tasks } from "../types/search";
import Map from "./Map";
import { Link } from "react-router-dom";

const TaskDetails = ({task,setTask,left,setLeftDetails}:{task:tasks,setTask: React.Dispatch<React.SetStateAction<tasks | null>>,left:string,setLeftDetails: React.Dispatch<React.SetStateAction<string>>}) => {
    return (
        <div className={`w-full sm:w-[500px] bg-bodyColor dark:bg-inputDark dark:text-bodyColor shadow-xl rounded-lg h-[calc(100vh-75px)] overflow-y-scroll fixed top-[80px] px-4 py-5 ${left} duration-500 z-40`}>
            <h1 className="text-xl font-bold text-center">تفاصيل المهمة</h1>
            <div onClick={()=>{
                setLeftDetails("left-[-100%]")
                setTask(null);
            }} 
            className="absolute duration-300 cursor-pointer top-2 right-3 hover:text-buttonsColor">
                <XIcon size={30}/>
            </div>
            <div className="mt-5">
                
                <div className="flex-1">
                    {/* Task Title */}
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold md:text-xl text-darkColor dark:text-bodyColor text-ellipsis line-clamp-1">
                            {task?.title}
                        </h2>
                        <h2 className="mb-3 font-semibold text-center text-green-500">{task?.status}</h2>
                    </div>
                    <div className="mb-1 text-lg font-bold text-primaryColor dark:text-bodyColor">
                        {task?.budget} ج.م 
                    </div>
                
                    {/* Task Address, Date, Time, Schedule - Small Text */}
                    <div className="flex flex-wrap text-xs text-gray-500 dark:text-gray-400 gap-x-5">
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
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        <span className="inline-block px-2 py-1 text-xs font-medium text-white rounded-full bg-buttonsColor">
                            {task?.category}
                        </span>
                    
                        {/* Task Skills as Gray Tags */}
                        <div className="flex flex-wrap gap-2 mt-2 mb-4">
                            {task?.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="inline-block px-2 py-1 text-xs font-medium text-gray-800 bg-gray-200 rounded-full"
                                    >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {
                        task?.attachments && task?.attachments[0]?.url &&
                        <div className="mb-4">
                            {
                                task?.attachments.map((attachment, index) => (
                                    <div className="flex items-center gap-3" key={index}>
                                        {
                                            attachment.type.startsWith('image') ?
                                            <Image className="text-green-500" />
                                            : <FileText className="text-red-500" />
                                        }
                                        <a href={attachment.url} download target="_blank" className={`${attachment.type.startsWith('image') ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} duration-300 p-1 px-3 text-white text-sm flex items-center gap-2 rounded-full`}><ArrowDownToLine size={18}/>{attachment.size}</a>
                                    </div>
                                ))
                            }
                        </div>
                    }
                    <Map latitude={+(task?.latitude as string)} location={false} longitude={+(task?.longitude as string)}/>
                </div>
                <div className="flex justify-center gap-5 mt-4">
                    <Link to={`/applyTask/${task?.id}`} className="w-full px-4 py-2 text-sm text-center text-white transition rounded-lg bg-buttonsColor hover:bg-navColor">
                        Apply Now
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default TaskDetails;
