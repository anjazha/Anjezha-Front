/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getTaskersSearch } from "../functions/getTaskersSearch";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { List } from "lucide-react";
import FiltersTasker from "../components/FiltersTasker";
import TaskerList, { taskerData } from "../components/TaskerList";

const TaskersSearch = () => {
    const [search,setSearch] = useSearchParams()
    const [allData, setAllData] = useState<any>(null);
    const [rightFiltersVisibility, setRightFiltersVisibility] = useState<string>("right-[-100%]");
    const handleOpenFilters = ()=> setRightFiltersVisibility("right-0");
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
                        
                        {/* Open Filters Icon */}
                        <div
                            onClick={handleOpenFilters}
                            className="p-2 rounded-md shadow-md cursor-pointer dark:bg-inputDark w-fit dark:text-bodyColor"
                        >
                            <List />
                        </div>
                    </div>

                    {/* Filters Component */}
                    <FiltersTasker
                        right={rightFiltersVisibility}
                        setRightFilters={setRightFiltersVisibility}
                        search={search}
                        setSearch={setSearch}
                    />
    
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
                        <div className="grid grid-cols-1 gap-5 mt-5">
                        {allData.data.map((tasker: taskerData, index: number) => (
                            <TaskerList
                            key={index}
                            tasker={tasker}
                            />
                        ))}
                        </div>

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