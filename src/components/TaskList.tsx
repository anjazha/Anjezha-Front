import { tasks } from "../types/search";

interface IProp {
    ele:tasks,
    setTask: React.Dispatch<React.SetStateAction<tasks | null>>,
    setLeftDetails: React.Dispatch<React.SetStateAction<string>>
}

const TaskList = ({ele,setTask,setLeftDetails}:IProp) => {
    const displayTaskDetails = (ele:tasks)=>{
        setTask(ele)
        setLeftDetails("left-0")
    }
    return (
        <div onClick={()=>displayTaskDetails(ele)} className="p-4 rounded-lg shadow-md bg-bodyColor dark:bg-inputDark border border-transparent hover:border-navColor duration-300 transition-transform transform hover:scale-105 cursor-pointer flex flex-col sm:flex-row items-start">
            <div className="flex-1">
                {/* Task Title */}
                <h2 className="font-semibold md:text-xl text-darkColor dark:text-bodyColor text-ellipsis line-clamp-1">
                    {ele.title}
                </h2>
            
                {/* Task Address, Date, Time, Schedule - Small Text */}
                <div className="text-xs text-gray-500 dark:text-gray-400 flex gap-x-5 flex-wrap">
                    <p>{ele.address}</p>
                    <p>{new Date(ele.date).toLocaleDateString()}</p>
                    <p>{ele.start_time} - {ele.end_time}</p>
                    <p>{ele.schedule_type}</p>
                </div>
            
                {/* Task Description */}
                <p className="my-2 text-sm text-darkColor dark:text-bodyColor line-clamp-3">
                    {ele.description}
                </p>
            
                {/* Task Category as a Primary Color Tag */}
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    <span className="inline-block bg-buttonsColor text-white px-2 py-1 rounded-full text-xs font-medium">
                        {ele.category}
                    </span>
                
                    {/* Task Skills as Gray Tags */}
                    <div className="mt-2 flex flex-wrap gap-2">
                        {ele.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs font-medium"
                                >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            
                {/* Task Budget */}
                <div className="mt-4 text-lg font-bold text-primaryColor dark:text-bodyColor">
                    $ {ele.budget}
                </div>
            </div>
        </div>
    );
}

export default TaskList;
