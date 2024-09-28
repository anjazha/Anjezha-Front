import image from "../assets/taskImage.jpeg"
import { useNavigate } from "react-router-dom";

const PopularTask = ({name,id,imageUrl}:{name:string,id:string,imageUrl:string | null}) => {
    const myUrl = useNavigate()
    return (
        <div 
        onClick={() => myUrl(`/search?categoryId=${id}`)} 
        className="p-3 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-white dark:bg-[#3B371E] border border-transparent dark:border-[#7F7442] hover:border-[#7F7442]"
    >
        <img 
            src={imageUrl ? imageUrl : image} 
            alt="image task" 
            className="h-[200px] w-full rounded-md object-cover transition-transform duration-300 transform hover:scale-105"
        />
        <div className="mt-3">
            <h2 className="font-semibold text-navColor dark:text-bodyColor">{name}</h2>
        </div>
    </div>
    
    
    );
}

export default PopularTask;