import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSearch } from "../functions/search";
import Spinner from "../components/Spinner";
import { dataTypeSearch, tasks } from "../types/search";
import TaskDetails from "../components/TaskDetails";
import TaskList from "../components/TaskList";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const BrowseTasks = ()=>{
    const [search, setSearch] = useSearchParams();
    const [allData, setData] = useState<dataTypeSearch | null>(null);
    const [task, setTask] = useState<tasks | null>(null);
    const [leftDetails, setLeftDetails] = useState<string>("left-[-100%]");
    useEffect(()=>{
        getSearch(search.toString(),7,setData)
    },[search])
    console.log(allData)
    return (
        <div className="flex justify-center py-10">
            <div className="container relative">
                {allData ? (
                <>
                    {
                    <>
                        <div className="flex justify-center gap-3 flex-row-reverse items-start">
                        {/* search bar Component*/}
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
                            {/* Task details */}
                            <div className="grid grid-cols-1 gap-5 mt-5">
                            {allData?.data.tasks.map((ele: tasks, x: number) => (
                                <TaskList
                                key={x}
                                ele={ele}
                                setTask={setTask}
                                setLeftDetails={setLeftDetails}
                                />
                            ))}
                            </div>

                            {/* Pagination Component */}
                            <Pagination
                            search={search}
                            setSearch={setSearch}
                            pagination={allData?.pagination}
                            />

                            {/* Task Details Component */}
                            <TaskDetails
                            task={task}
                            left={leftDetails}
                            setLeftDetails={setLeftDetails}
                            />
                        </>
                        )}
                    </>
                    }
                </>
                ) : (
                    <Spinner />
                )}
            </div>
        </div>
    )
}

export default BrowseTasks