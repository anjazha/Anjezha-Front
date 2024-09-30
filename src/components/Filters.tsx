import { XIcon } from "lucide-react";
import { SetURLSearchParams } from "react-router-dom";

interface IProp {
    right:string,
    setRightFilters: React.Dispatch<React.SetStateAction<string>>,
    search: URLSearchParams,
    setSearch: SetURLSearchParams
}

const Filters = ({right,setRightFilters,search,setSearch}:IProp) => {
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
    console.log(search.toString());
    return (
        <div className={`h-[calc(100vh-75px)] w-[300px] fixed top-[80px] ${right} py-5 px-4 duration-500 z-40  bg-bodyColor dark:bg-inputDark dark:text-bodyColor shadow-xl rounded-lg`}>
            <h1 className="text-center text-xl font-bold">تصفية</h1>
            <div onClick={()=>setRightFilters('right-[-100%]')} className="absolute top-2 cursor-pointer left-3 hover:text-buttonsColor duration-300">
                <XIcon size={30}/>
            </div>
            <div className="mt-4">
                <form action="">
                    <div>
                        <label htmlFor="least" className="block font-semibold text-darkColor dark:text-bodyColor">اقل سعر</label>
                        <input type="number" onChange={(e)=>inputsChange(e.target.name,e.target.value)} name="minBudget" id="least" className="w-full h-9 p-2 mt-2 rounded border dark:text-bodyDark border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"/>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="max" className="block font-semibold text-darkColor dark:text-bodyColor">اكثر سعر</label>
                        <input type="number" onChange={(e)=>inputsChange(e.target.name,e.target.value)} name="maxBudget" id="max" className="w-full h-9 p-2 mt-2 rounded border dark:text-bodyDark border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"/>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="address" className="block font-semibold text-darkColor dark:text-bodyColor">العنوان</label>
                        <input type="text" onChange={(e)=>inputsChange(e.target.name,e.target.value)} name="government" id="address" className="w-full h-9 p-2 mt-2 rounded border dark:text-bodyDark border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"/>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="status" className="block font-semibold text-darkColor dark:text-bodyColor">الحالة</label>
                        <select onChange={(e)=>inputsChange(e.target.name,e.target.value)} name="status" id="status" className="w-full h-9 px-2 mt-2 rounded border dark:text-bodyDark border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor">
                            <option value="">...</option>
                            <option value="pending">Pending</option>
                            <option value="open">Open</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="skills" className="block font-semibold text-darkColor dark:text-bodyColor">المهارات</label>
                        <input type="text" onChange={(e)=>inputsChange(e.target.name,e.target.value)} name="skills" id="skills" className="w-full h-9 p-2 mt-2 rounded border dark:text-bodyDark border-gray-300 focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Filters;