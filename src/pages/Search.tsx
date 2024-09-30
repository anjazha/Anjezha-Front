import { SetURLSearchParams, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getSearch } from '../functions/search'
import Spinner from '../components/Spinner'
import image from "../assets/taskImage.jpeg"
import { dataTypeSearch, paginaton, tasks } from '../types/search'

const Search = () => {
    const [search,setSearch] = useSearchParams()
    const [allData,setData] = useState<dataTypeSearch | null>(null)
    // console.log([...search]);
    useEffect(() => {
        getSearch([...search][0][0],[...search][0][1],7,+[...search][1][1],setData)
    },[search])
    console.log(allData?.data)
    return 
        (
            <div className='flex justify-center py-10'>
              <div className="container">
                {
                  allData ? (
                    <>
                      {
                        allData.data.tasks.length === 0 ? (
                          <div>
                            <h2 className='text-2xl font-semibold text-center'>لا يوجد مهام في هذه الفئة</h2>
                          </div>
                        ) : (
                          <>
                            <div className="grid grid-cols-1 gap-5 mt-5">
                              {allData.data.tasks.map((ele: tasks, x: number) => (
                                <div
                                  key={x}
                                  className="p-4 rounded-lg shadow-md bg-bodyColor dark:bg-inputDark border border-transparent hover:border-navColor duration-300 transition-transform transform hover:scale-105 cursor-pointer flex flex-col sm:flex-row items-start"
                                >
                                  <div className="flex-1">
                                    {/* Task Title */}
                                    <h2 className="font-semibold md:text-xl text-darkColor dark:text-bodyColor text-ellipsis line-clamp-1">
                                      {ele.title}
                                    </h2>
          
                                    {/* Task Address, Date, Time, Schedule - Small Text */}
                                    <div className="text-xs text-gray-500 dark:text-gray-400 flex gap-x-5 flex-wrap">
                                      <p>{ele.address}</p>
                                      <p>{new Date(ele.date).toLocaleDateString()}</p>
                                      <p>{ele.start_time} - {ele.end_time}</p>
                                      <p>{ele.schedule_type}</p>
                                    </div>
          
                                    {/* Task Description */}
                                    <p className="my-2 text-sm text-darkColor dark:text-bodyColor line-clamp-3">
                                      {ele.description}
                                    </p>
          
                                    {/* Task Category as a Primary Color Tag */}
                                    <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                                      <span className="inline-block bg-buttonsColor text-white px-2 py-1 rounded-full text-xs font-bold font-medium">
                                        {ele.category}
                                      </span>
          
                                      {/* Task Skills as Gray Tags */}
                                      <div className="mt-2 flex flex-wrap gap-2">
                                        {ele.skills.map((skill, index) => (
                                          <span
                                            key={index}
                                            className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs font-medium"
                                          >
                                            {skill}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
          
                                    {/* Task Budget */}
                                    <div className="mt-4 text-lg font-bold text-primaryColor">
                                      $ {ele.budget}
                                    </div>
                                  </div>
          
                                  {/* Action Button */}
                                  <div className="flex items-center mt-4 sm:mt-0 sm:ml-5">
                                    <button
                                      className="bg-buttonsColor text-white py-1 px-4 rounded-full text-sm hover:bg-buttonsHover transition"
                                    >
                                      Apply Now
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
          
                            {/* Pagination Component */}
                            <Pagination search={search} setSearch={setSearch} pagination={allData.pagination} />
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

const Pagination = ({ pagination,search,setSearch }:{pagination:paginaton,search: URLSearchParams,setSearch: SetURLSearchParams}) => {
    const setPage = (number:string) => {
        const currentParams = new URLSearchParams(search);
    
        if (currentParams.has("page")) currentParams.set("page", number);
        else currentParams.append("page", number);
    
        setSearch(currentParams);
    };
    return (
        <div className="mt-5 flex justify-center gap-[3px] flex-wrap">
            {pagination?.prevPage && (
                <button
                    className={`relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-gray-300 bg-bodyColor border text-inputDark shadow hover:bg-gray-200 focus:z-20 focus:outline-offset-0`}
                    onClick={() => {
                    setPage(`${pagination.prevPage}`);
                    }}
                >
                    &lt;&lt;
                </button>
            )}
            {Array.from({length:pagination?.totalPages || 0},(_e, i) => (
                <button
                    key={i}
                    className={` relative z-10 inline-flex items-center rounded px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                    pagination.currentPage === i + 1 ? "bg-indigo-600" : "bg-bodyColor text-inputDark border shadow hover:bg-gray-200"
                    }`}
                    onClick={() => {
                    setPage(`${i + 1}`);
                    }}
                >
                    {i + 1}
                </button>
            ))}
            {pagination?.nextPage && (
                <button
                    className={`relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-gray-300 bg-bodyColor border text-inputDark shadow hover:bg-gray-200 focus:z-20 focus:outline-offset-0`}
                    onClick={() => {
                    setPage(`${pagination.nextPage}`);
                    }}
                >
                    &gt;&gt;
                </button>
            )}
        </div>
    );
};