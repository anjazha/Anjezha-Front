import { SetURLSearchParams } from "react-router-dom";
import { paginaton } from "../types/search";

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
                    className={`relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset  bg-bodyColor border text-inputDark shadow hover:bg-gray-200 focus:z-20 focus:outline-offset-0`}
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
                    pagination?.currentPage === i + 1 ? "bg-indigo-600" : "bg-bodyColor text-inputDark border shadow hover:bg-gray-200"
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
                    className={`relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset bg-bodyColor border text-inputDark shadow hover:bg-gray-200 focus:z-20 focus:outline-offset-0`}
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

export default Pagination;