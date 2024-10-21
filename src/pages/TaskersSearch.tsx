/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getTaskersSearch } from "../functions/getTaskersSearch";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

const TaskersSearch = () => {
    const [search,setSearch] = useSearchParams()
    const [allData, setAllData] = useState<any>(null);
    useEffect(()=>{
        getTaskersSearch(search.toString(),7,setAllData)
    },[search])

    return (
        <div className="flex justify-center py-10">
            <div className="container relative">
                {allData ? (
                <>
                    <div className="flex flex-row-reverse items-start justify-center gap-3">
                    {/* Search Bar Component */}
                        <SearchBar search={search} value={search.get("q")} setSearch={setSearch} />
                    </div>
    
                    {/* Display tasks or no task message */}
                    {allData.data.length === 0 ? (
                        <div>
                            <h2 className="text-2xl font-semibold text-center dark:text-bodyColor">
                            لا يوجد عمال في هذه الفئة
                            </h2>
                        </div>
                    ) : (
                    <>
                        {/* Tasker List */}
                        {/* <div className="grid grid-cols-1 gap-5 mt-5">
                        {allData.data.tasks.map((taskItem: tasks, index: number) => (
                            <TaskList
                            key={index}
                            ele={taskItem}
                            setTask={setSelectedTask}
                            setLeftDetails={setLeftDetailsVisibility}
                            />
                        ))}
                        </div> */}

                        {/* Pagination Component */}
                        <Pagination
                        search={search}
                        setSearch={setSearch}
                        pagination={allData.pagination}
                        />
                    </>
                    )}
                </>
                ) : (
                <Spinner />
                )}
            </div>
        </div>
    );
}

export default TaskersSearch;