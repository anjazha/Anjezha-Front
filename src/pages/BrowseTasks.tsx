import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSearch } from "../functions/search";
import Spinner from "../components/Spinner";
import { dataTypeSearch, tasks } from "../types/search";
import TaskDetails from "../components/TaskDetails";
import TaskList from "../components/TaskList";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { useSelector } from 'react-redux';
import { RootState } from "../store/store";
import image from "../assets/default-user-image.jpg";
import UserTasks from "../components/getHistory";
import { Settings, XIcon } from "lucide-react";

const BrowseTasks = () => {
    const user = useSelector((state: RootState) => state.user);
    const [search, setSearch] = useSearchParams();
    const [allData, setData] = useState<dataTypeSearch | null>(null);
    const [task, setTask] = useState<tasks | null>(null);
    const [leftDetails, setLeftDetails] = useState<string>("left-[-100%]");
    const myUrl = useNavigate()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // حالة التحكم في القائمة الجانبية للموبايل

    useEffect(() => {
        getSearch(search.toString(), 7, setData);
    }, [search]);

    return (
        <div className="flex justify-center py-10">
            <div className="container relative">
                {allData ? (
                    <>
                        <div className="flex justify-center gap-3 flex-row-reverse items-start mb-5">
                            <SearchBar search={search} setSearch={setSearch} />
                            <div onClick={()=>setIsSidebarOpen(true)}
                                className="p-2 md:hidden shadow-md cursor-pointer rounded-md dark:bg-inputDark w-fit dark:text-bodyColor"
                            >
                                <Settings />
                            </div>
                        </div>

                        <div className="flex justify-between gap-6">
                            <div className={`fixed top-20 ${isSidebarOpen ? 'right-0' : 'right-[-100%]'} duration-500 h-[calc(100vh-78px)] overflow-y-scroll md:h-full md:overflow-visible py-5 pt-14 rounded-l-md md:py-0 px-5 md:px-0 flex items-center flex-col z-40 shadow-lg bg-bodyColor dark:bg-inputDark md:dark:bg-transparent md:bg-transparent w-[270px] md:block md:w-1/4 md:sticky md:top-12 md:right-0 mb-5`}>
                                <div onClick={()=>setIsSidebarOpen(false)} className="absolute top-2 left-2 cursor-pointer hover:text-buttonsColor dark:text-bodyColor">
                                        <XIcon size={28}/>
                                </div>
                                <div onClick={()=>myUrl('/profile')} className="bg-bodyColor w-full border border-transparent hover:border-navColor duration-300 transition-transform transform hover:scale-105 cursor-pointer dark:bg-inputDark p-4 rounded-lg shadow-md mb-5">
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={user.profilePicture || image}
                                            alt="Profile"
                                            className="w-20 h-20 rounded-full border-4 border-white shadow-md mb-2"
                                        />
                                        <h2 className="text-lg text-center font-bold dark:text-bodyColor">
                                                {user.name || "User Name"}
                                        </h2>
                                    </div>
                                </div>

                                <UserTasks />
                            </div>
                        
                            {allData?.data.tasks.length === 0 ? (
                                <div className="w-full md:w-3/4">
                                    <h2 className="text-2xl text-center font-semibold dark:text-bodyColor">
                                        لا يوجد مهام في هذه الفئة
                                    </h2>
                                </div>
                            ) : (
                                <>
                                        <div className="w-full md:w-3/4">
                                            <div className="grid grid-cols-1 gap-5">
                                                {allData?.data.tasks.map((ele: tasks, x: number) => (
                                                    <TaskList
                                                        key={x}
                                                        ele={ele}
                                                        setTask={setTask}
                                                        setLeftDetails={setLeftDetails}
                                                    />
                                                ))}
                                            </div>

                                            <Pagination
                                                search={search}
                                                setSearch={setSearch}
                                                pagination={allData?.pagination}
                                            />

                                            <TaskDetails
                                                task={task}
                                                left={leftDetails}
                                                setLeftDetails={setLeftDetails}
                                            />
                                        </div>
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    <Spinner />
                )}
            </div>
        </div>
    );
};

export default BrowseTasks;
