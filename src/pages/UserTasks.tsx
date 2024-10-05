import  { useEffect, useState } from "react";
import { getUserTasks } from "../functions/getUserTasks";
import { tasks } from "../types/search";
import Spinner from "../components/Spinner";


const UserTasksPage = () => {
    const [tasks, setTasks] = useState<tasks[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserTasks(setTasks,setLoading);
    },[]);

    return (
        <div>
            <h2 className="text-center" >المهام المنشورة</h2>
            <div className="p-4 rounded-lg shadow-md bg-bodyColor dark:bg-inputDark border border-transparent hover:border-navColor duration-300 transition-transform transform hover:scale-105 cursor-pointer flex flex-col sm:flex-row items-start">
                {loading ? (
                    <Spinner />
                ) : tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <div className="flex-1" key={index}>
                            {/* Task Title */}
                            <h2 className="font-semibold md:text-xl text-darkColor dark:text-bodyColor text-ellipsis line-clamp-1">
                                {task.title}
                            </h2>

                            {/* Task Details */}
                            <div className="text-xs text-gray-500 dark:text-gray-400 flex gap-x-5 flex-wrap">
                                <p>{task.address}</p>
                                <p>{new Date(task.date).toLocaleDateString()}</p>
                                <p>
                                    {task.start_time} - {task.end_time}
                                </p>
                                <p>{task.schedule_type}</p>
                            </div>

                            {/* Task Description */}
                            <p className="my-2 text-sm text-darkColor dark:text-bodyColor line-clamp-3">
                                {task.description}
                            </p>

                            {/* Task Category as a Primary Color Tag */}
                            <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                                <span className="inline-block bg-buttonsColor text-white px-2 py-1 rounded-full text-xs font-medium">
                                    {task.category}
                                </span>

                                {/* Task Skills as Gray Tags */}
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {task.skills.map((skill, skillIndex) => (
                                        <span
                                            key={skillIndex}
                                            className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Task Budget */}
                            <div className="mt-4 text-lg font-bold text-primaryColor dark:text-bodyColor">
                                $ {task.budget}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center">لم تقم بنشر أي مهام بعد.</div>
                )}
            </div>
        </div>
    );
};

export default UserTasksPage;
