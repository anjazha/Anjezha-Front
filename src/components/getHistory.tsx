import { useEffect, useState } from "react";
import { getUserTasks } from "../functions/getUserTasks";
import { tasks } from "../types/search";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

const UserTasks = () => {
    const [tasks, setTasks] = useState<tasks[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        getUserTasks(setTasks, setLoading);
    }, []);

    return (
        <div className="bg-bodyColor border border-transparent hover:border-navColor duration-300 transition-transform transform hover:scale-105 dark:bg-inputDark p-4 rounded-lg shadow-md w-full">
            {loading ? (
                <Spinner />
            ) : tasks.length > 0 ? (
                < >
                    <h2 className="text-center text-xl mb-4 font-bold dark:text-bodyColor">مهامي</h2>
                    <div className="flex flex-col gap-5">
                        {tasks.slice(0, 5).map((task, index) => (
                            <Link to={`/taskerApplication/${task.id}`} key={index} className="font-semibold block text-lg duration-500 hover:text-buttonsColor text-darkColor dark:text-bodyColor text-ellipsis line-clamp-1">
                                {task.title}
                            </Link>
                        ))}
                    </div>
                    <Link to={"/userTasks"} className="mt-4 block text-center bg-buttonsColor text-white py-1 px-4 rounded-full text-sm hover:bg-buttonsHover transition w-full">
                        Show All
                    </Link>
                </>
            ) : (
                <p className="text-center dark:text-bodyColor">لا توجد مهام متاحة.</p>
            )}
        </div>
    );
};

export default UserTasks;