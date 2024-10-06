import { useSearchParams } from "react-router-dom";
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
import { AlignJustify, XIcon } from "lucide-react"; // استدعاء الأيقونات

const BrowseTasks = () => {
    const user = useSelector((state: RootState) => state.user);
    const profilePicture = user.profilePicture || image;
    const [search, setSearch] = useSearchParams();
    const [allData, setData] = useState<dataTypeSearch | null>(null);
    const [task, setTask] = useState<tasks | null>(null);
    const [leftDetails, setLeftDetails] = useState<string>("left-[-100%]");
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
                        </div>

                        {allData?.data.tasks.length === 0 ? (
                            <div>
                                <h2 className="text-2xl font-semibold text-center dark:text-bodyColor">
                                    لا يوجد مهام في هذه الفئة
                                </h2>
                            </div>
                        ) : (
                            <>
                                {/* Mobile Sidebar Toggle Button */}
                                <div className="sm:hidden fixed right-0 top-0 p-4 z-50">
                                    <AlignJustify className="w-8 h-8 text-blue-500 cursor-pointer" onClick={() => setIsSidebarOpen(true)} />
                                </div>

                                {/* Sidebar for Mobile */}
                                <div className={`fixed top-[0] right-0 w-64 h-full bg-bodyColor dark:bg-inputDark p-4 shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50 md:hidden`}>
                                    <div className="flex justify-end mb-4">
                                        <XIcon className="w-6 h-6 text-gray-600 cursor-pointer" onClick={() => setIsSidebarOpen(false)} />
                                    </div>
                                    <div className="flex  items-center">
                                        <h2 className="text-lg text-center font-bold dark:text-bodyColor flex justify-center pb-2 pl-2">
                                            {user.name || "User Name"}
                                        </h2>
                                        <img
                                            src={profilePicture}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full border-4 border-white shadow-md mb-2"
                                        />

                                    </div>
                                    <UserTasks />
                                </div>

                                {/* Main Content */}
                                <div className="flex justify-between mt-12">
                                    <div className="hidden md:block w-full md:w-1/4 sticky top-20 mb-5">
                                        <div className="bg-bodyColor dark:bg-inputDark p-4 rounded-lg shadow-md mb-2 mt-20 ml-9">
                                            <div className="flex flex-col items-center">
                                                <img
                                                    src={profilePicture}
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

                                    <div className="w-full md:w-3/4 mt-12">
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
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <Spinner />
                )}
            </div>
        </div>
    );
};

export default BrowseTasks;
