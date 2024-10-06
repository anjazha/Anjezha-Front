import { useEffect, useState } from "react";
import { getUserTasks } from "../functions/getUserTasks";
import { tasks } from "../types/search";
import Spinner from "../components/Spinner";

const UserTasks = () => {
    const [tasks, setTasks] = useState<tasks[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        getUserTasks(setTasks, setLoading);
    }, []);

    return (
        <div className="bg-bodyColor dark:bg-inputDark p-4 rounded-lg shadow-md ml-9">
            {loading ? (
                <Spinner />
            ) : tasks.length > 0 ? (
                < >
                    <h2 className="text-center text-xl mb-5 font-bold dark:text-bodyColor">المهام المنشورة</h2>
                    <div className="flex flex-col gap-5">
                        {tasks.slice(0, 5).map((task, index) => (
                            <div key={index} className=" p-4 rounded-lg shadow-md bg-bodyColor dark:bg-inputDark border border-transparent hover:border-navColor duration-300 transition-transform transform hover:scale-105 cursor-pointer">
                                <h2 className="font-semibold text-darkColor dark:text-bodyColor text-ellipsis line-clamp-1">
                                    {task.title}
                                </h2>
                            </div>
                        ))}
                    </div>
                    <button className="mt-4 bg-buttonsColor text-white py-1 px-4 rounded-full text-sm hover:bg-buttonsHover transition w-full">
                        Show All
                    </button>
                </>
            ) : (
                <p className="text-center">لا توجد مهام متاحة.</p>
            )}
        </div>
    );
};

export default UserTasks;