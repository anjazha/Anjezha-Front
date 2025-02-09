import { SearchIcon } from "lucide-react";
import { SetURLSearchParams, useNavigate } from "react-router-dom";

const SearchBar = ({search,setSearch,value,selectValue}:{search: URLSearchParams,setSearch: SetURLSearchParams,value:string | null,selectValue?:string}) => {
    const myUrl = useNavigate()
    const inputsChange = (ele:string,value:string)=>{
        if(selectValue==="tasker"){
            myUrl(`/taskerSearch?page=1&${ele}=${value}`)
        }
        else{
            const currentParams = new URLSearchParams(search);
            if(value === ""){
                currentParams.delete(ele);
                setSearch(currentParams);
                return;
            }
            if(currentParams.has(ele)){
                currentParams.set(ele, value);
                setSearch(currentParams);
            }
            else{
                currentParams.append(ele, value);
                setSearch(currentParams);
            }
        }
    }
    return (
        <div
            className="w-full sm:w-[400px] mx-auto h-10 rounded-full mb-4 bg-inputColor dark:bg-inputDark flex justify-between items-center px-4 shadow-md"
            >
            <input defaultValue={value? value : ""} onChange={(e)=>inputsChange(e.target.name,e.target.value)}
                type="text"
                name="q"
                className="w-full h-full bg-transparent rounded-full outline-none text-navColor dark:text-bodyColor dark:caret-bodyColor"
                placeholder="ابحث هنا..."
            />
            <div
                className="flex items-center justify-center text-navColor dark:text-bodyColor"
                >
                <SearchIcon size={16} />
            </div>
        </div>
    );
}

export default SearchBar;
