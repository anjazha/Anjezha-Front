import image from "../assets/taskImage.jpeg"
import { useNavigate } from "react-router-dom";

const PopularTask = ({name,id,imageUrl}:{name:string,id:string,imageUrl:string | null}) => {
    const myUrl = useNavigate()
    return (
        <div 
        onClick={() => myUrl(`/search?category=${id}&page=1`)} 
        className="p-3 rounded-md shadow-lg  duration-300 transition-transform transform hover:scale-105 cursor-pointer bg-bodyColor dark:bg-inputDark border border-transparent hover:border-navColor "
    >
        <img 
            src={imageUrl ? imageUrl : image} 
            alt="image task" 
            className="h-[200px] w-full rounded-md object-cover "
        />
        <div className="mt-3">
            <h2 className="font-semibold text-navColor dark:text-bodyColor">{name}</h2>
        </div>
    </div>
    
    
    );
}

export default PopularTask;