import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getSearch } from '../functions/search'
import Spinner from '../components/Spinner'
import { dataTypeSearch, tasks } from '../types/search'
import TaskDetails from '../components/TaskDetails'
import Filters from '../components/Filters'
import { List } from 'lucide-react'
import TaskList from '../components/TaskList'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'

const Search = () => {
    const [search,setSearch] = useSearchParams()
    const [allData,setData] = useState<dataTypeSearch | null>(null)
    const [task,setTask] = useState<tasks | null>(null)
    const [leftDetails,setLeftDetails] = useState<string>("left-[-100%]")
    const [right,setRightFilters] = useState<string>("right-[-100%]")
    // console.log([...search]);
    
    useEffect(() => {
        getSearch(search.toString(),7,setData)
    },[search])
    // console.log(allData?.data)
    return (
        <div className='flex justify-center py-10'>
            <div className="container relative">
                {
                    allData ? (
                        <>
                        {
                            allData?.data.tasks.length === 0 ? (
                                <div>
                                    <h2 className='text-2xl font-semibold text-center dark:text-bodyColor'>لا يوجد مهام في هذه الفئة</h2>
                                </div>
                            ) : (
                            <>
                                {/* search bar Component*/}
                                <SearchBar search={search} setSearch={setSearch}/>

                                {/* Filters Component*/}
                                <Filters right={right} setRightFilters={setRightFilters} search={search} setSearch={setSearch}/>
                                <div onClick={()=>setRightFilters("right-0")} className='p-2 shadow-md cursor-pointer rounded-md dark:bg-inputDark w-fit dark:text-bodyColor'>
                                    <List />
                                </div>
                                
                                {/* Task List Component*/}
                                <div className="grid grid-cols-1 gap-5 mt-5">
                                {allData?.data.tasks.map((ele: tasks, x: number) => (
                                    <TaskList key={x} ele={ele} setTask={setTask} setLeftDetails={setLeftDetails} />
                                ))}
                                </div>
            
                                {/* Pagination Component */}
                                <Pagination search={search} setSearch={setSearch} pagination={allData?.pagination} />

                                {/* Task Details Component */}
                                <TaskDetails task={task} left={leftDetails} setLeftDetails={setLeftDetails}/>
                            </>
                            )
                        }
                        </>
                    ) : <Spinner />
                }
            </div>
        </div>
    )
}
export default Search