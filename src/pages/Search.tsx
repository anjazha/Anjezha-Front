import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSearch } from "../functions/search";
import Spinner from "../components/Spinner";
import TaskDetails from "../components/TaskDetails";
import Filters from "../components/Filters";
import { List } from "lucide-react";
import TaskList from "../components/TaskList";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { dataTypeSearch, tasks } from "../types/search";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allData, setAllData] = useState<dataTypeSearch | null>(null);
  const [selectedTask, setSelectedTask] = useState<tasks | null>(null);
  const [leftDetailsVisibility, setLeftDetailsVisibility] = useState<string>("left-[-100%]");
  const [rightFiltersVisibility, setRightFiltersVisibility] = useState<string>("right-[-100%]");

  // Fetch search results whenever search parameters change
  useEffect(() => {
    getSearch(searchParams.toString(), 7, setAllData);
  }, [searchParams]);

  const handleOpenFilters = ()=> setRightFiltersVisibility("right-0");

  return (
    <div className="flex justify-center py-10">
      <div className="container relative">
        {allData ? (
          <>
            <div className="flex flex-row-reverse items-start justify-center gap-3">
              {/* Search Bar Component */}
              <SearchBar search={searchParams} value={searchParams.get("q")} setSearch={setSearchParams} />
              
              {/* Open Filters Icon */}
              <div
                onClick={handleOpenFilters}
                className="p-2 rounded-md shadow-md cursor-pointer dark:bg-inputDark w-fit dark:text-bodyColor"
              >
                <List />
              </div>
            </div>

            {/* Filters Component */}
            <Filters
              right={rightFiltersVisibility}
              setRightFilters={setRightFiltersVisibility}
              search={searchParams}
              setSearch={setSearchParams}
            />

            {/* Display tasks or no task message */}
            {allData.data.tasks.length === 0 ? (
              <div>
                <h2 className="text-2xl font-semibold text-center dark:text-bodyColor">
                  لا يوجد مهام في هذه الفئة
                </h2>
              </div>
            ) : (
              <>
                {/* Task List */}
                <div className="grid grid-cols-1 gap-5 mt-5">
                  {allData.data.tasks.map((taskItem: tasks, index: number) => (
                    <TaskList
                      key={index}
                      ele={taskItem}
                      setTask={setSelectedTask}
                      setLeftDetails={setLeftDetailsVisibility}
                    />
                  ))}
                </div>

                {/* Pagination Component */}
                <Pagination
                  search={searchParams}
                  setSearch={setSearchParams}
                  pagination={allData.pagination}
                />

                {/* Task Details Component */}
                {selectedTask && (
                  <TaskDetails
                    task={selectedTask}
                    setTask={setSelectedTask}
                    left={leftDetailsVisibility}
                    setLeftDetails={setLeftDetailsVisibility}
                  />
                )}
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

export default Search;
