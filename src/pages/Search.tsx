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
    // console.log(allData.data)
    return (
        <div className='flex justify-center py-10'>
            <div className="container">
            {
                allData ? 
                <>
                    {
                        allData.data.tasks.length === 0 ?
                        <div>
                            <h2 className='text-2xl font-semibold text-center'>لا يوجد مهام في هذه الفئة</h2>
                        </div>
                        :
                        <>
                            <div className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                                {allData.data.tasks.map((ele:tasks,x:number)=>(
                                    <div key={x} className="p-3 bg-[#E2DDC6] rounded-md cursor-pointer hover:border hover:border-[#7F7442] duration-300">
                                        <img src={image} alt="image task" className="h-[200px] w-full"/>
                                        <div className="mt-3">
                                            <h2 className="font-semibold text-ellipsis line-clamp-1">{ele.title}</h2>
                                            <p className='my-2 text-ellipsis line-clamp-3'>{ele.description}</p>
                                            <p className='text-red-500'>$ {ele.budget}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Pagination search={search} setSearch={setSearch} pagination={allData.pagination} />
                        </>
                    }
                </>
                :<Spinner />
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
                    className={` border border-gray-400 rounded p-1 w-8 h-8  flex justify-center align-middle `}
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
                    className={` border border-gray-400 rounded p-1 w-8 h-8  flex justify-center align-middle ${
                    pagination.currentPage === i + 1 ? "bg-gray-300" : ""
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
                    className={` border border-gray-400 rounded p-1 w-8 h-8  flex justify-center align-middle `}
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