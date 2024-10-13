import  { useEffect, useState } from "react";
import { getUserTasks } from "../functions/getUserTasks";
import { tasks } from "../types/search";
import Spinner from "../components/Spinner";
import UpadteADeleteTask from "../components/UpadteADeleteTask";
import { useNavigate } from "react-router-dom";


const UserTasksPage = () => {
    const [tasks, setTasks] = useState<tasks[]>([]);
    const [loading, setLoading] = useState(true);
    const myUrl = useNavigate()
    const [changes,setChanges] = useState(false);

    useEffect(() => {
        getUserTasks(setTasks,setLoading);
    },[changes]);

    return (
        <div className="flex justify-center py-10">
            <div className="container">
                {loading ? (
                    <Spinner />
                ) : tasks.length > 0 ? (
                    <>
                    <h2 className="mb-5 text-xl font-bold text-center dark:text-bodyColor" >المهام المنشورة</h2>
                    <div className="flex flex-col gap-5">
                    {tasks.map((task, index) => (
                        <div key={index} className="relative flex flex-col items-start p-4 transition-transform duration-300 transform border border-transparent rounded-lg shadow-md cursor-pointer bg-bodyColor dark:bg-inputDark hover:border-navColor hover:scale-105 sm:flex-row">
                            {/* update and delete */}
                            <UpadteADeleteTask id={task.id} setChanges={setChanges}/>

                            <div onClick={()=>myUrl(`/taskerApplication/${task.id}`)} className="flex-1" >
                                {/* Task Title */}
                                <div className="flex items-center gap-3">
                                    <h2 className="font-semibold md:text-xl text-darkColor dark:text-bodyColor text-ellipsis line-clamp-1">
                                        {task.title}
                                    </h2>
                                    <p className="dark:text-bodyColor"> - </p>
                                    <p className="text-sm text-green-500 capitalize">{task.status}</p>
                                </div>
                                {/* Task Details */}
                                <div className="flex flex-wrap text-xs text-gray-500 dark:text-gray-400 gap-x-5">
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
                                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                    <span className="inline-block px-2 py-1 text-xs font-medium text-white rounded-full bg-buttonsColor">
                                        {task.category}
                                    </span>

                                    {/* Task Skills as Gray Tags */}
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {task.skills.map((skill, skillIndex) => (
                                            <span
                                                key={skillIndex}
                                                className="inline-block px-2 py-1 text-xs font-medium text-gray-800 bg-gray-200 rounded-full"
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
                        </div>
                    ))}
                    </div>
                    </>
                ) : (
                    <div className="text-xl font-bold text-center dark:text-bodyColor">لم تقم بنشر أي مهام بعد.</div>
                )}
            </div>
        </div>
    );
};

export default UserTasksPage;
