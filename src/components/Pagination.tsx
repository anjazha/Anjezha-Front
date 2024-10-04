import { SetURLSearchParams } from "react-router-dom";
import { paginaton } from "../types/search";
import { ChevronsRight,ChevronsLeft } from 'lucide-react';

const Pagination = ({ pagination,search,setSearch }:{pagination:paginaton| undefined,search: URLSearchParams,setSearch: SetURLSearchParams}) => {
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
                    className={`relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-white dark:ring-inputDark bg-bodyColor border dark:border-inputDark text-inputDark dark:bg-inputDark dark:text-bodyColor shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0`}
                    onClick={() => {
                    setPage(`${pagination.prevPage}`);
                    }}
                >
                    {/* &lt;&lt; */}
                    <ChevronsRight />
                </button>
            )}
            {Array.from({length:pagination?.totalPages || 0},(_e, i) => (
                i+1 === pagination?.currentPage || i+1 === pagination?.totalPages || i+1 ===1 ?
                <button
                    key={i}
                    className={` relative z-10 inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold shadow-md focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                    pagination?.currentPage === i + 1 ? "bg-indigo-600 text-white" : "bg-bodyColor border dark:border-inputDark text-inputDark dark:bg-inputDark dark:text-bodyColor hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => {
                    setPage(`${i + 1}`);
                    }}
                >
                    {i + 1}
                </button>
                : i+1 === +(pagination?.totalPages || 1)-1 || i+1 ===2 ? <div className="flex items-center"><span className="dark:text-white px-2">...</span></div>
                :null
            ))}
            {pagination?.nextPage && (
                <button
                    className={`relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-white dark:ring-inputDark bg-bodyColor border dark:border-inputDark text-inputDark dark:bg-inputDark dark:text-bodyColor shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0`}
                    onClick={() => {
                    setPage(`${pagination.nextPage}`);
                    }}
                >
                    {/* &gt;&gt; */}
                    <ChevronsLeft />
                </button>
            )}
        </div>
    );
};

export default Pagination;