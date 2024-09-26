import image from "../assets/taskImage.jpeg"
import { useNavigate } from "react-router-dom";

const PopularTask = ({name,id,imageUrl}:{name:string,id:string,imageUrl:string | null}) => {
    const myUrl = useNavigate()
    return (
        <div onClick={()=>myUrl(`/search?categoryId=${id}`)} className="p-3 bg-[#E2DDC6] rounded-md cursor-pointer hover:border hover:border-[#7F7442] duration-300">
            <img src={imageUrl ? imageUrl : image} alt="image task" className="h-[200px] w-full"/>
            <div className="mt-3">
                <h2 className="font-semibold">{name}</h2>
            </div>
        </div>
    );
}

export default PopularTask;