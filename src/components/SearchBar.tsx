import { SearchIcon } from "lucide-react";
import { SetURLSearchParams } from "react-router-dom";

const SearchBar = ({search,setSearch}:{search: URLSearchParams,setSearch: SetURLSearchParams}) => {
    const inputsChange = (ele:string,value:string)=>{
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
    return (
        <div
            className="w-full sm:w-[400px] mx-auto h-10 rounded-full mb-4 bg-inputColor dark:bg-inputDark flex justify-between items-center px-4 shadow-md"
            >
            <input onChange={(e)=>inputsChange(e.target.name,e.target.value)}
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
