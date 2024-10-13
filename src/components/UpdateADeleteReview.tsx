import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteReviewById } from "../functions/deleteReviewById";

interface reviewData {
    id: string;
    review: string;
    rating: string;
}

interface IProp {
    review:reviewData,
    setUpdateReview: React.Dispatch<React.SetStateAction<reviewData>>,
    setChanges: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateADeleteReview = ({review,setUpdateReview,setChanges}:IProp) => {
    const [display, setDisplay] = useState(false);
    const [loading, setLoading] = useState(false);
    const update = ()=>{
        // console.log(review);
        setUpdateReview({id:review.id,review: review.review, rating: `${review.rating}`});
        setDisplay(false);
    }

    const deleteReview = ()=>{
        setLoading(true);
        // console.log(review);
        deleteReviewById(review.id,setChanges,setLoading); // this is a function to delete review by id
    }
    return (
        <div>
            <div onClick={()=>setDisplay(display===true ? false : true)} className="absolute top-2 left-2 dark:text-bodyColor cursor-pointer">
                <Ellipsis />
            </div>
            <div className={`${display ? 'block' : 'hidden'} w-[100px] border absolute top-8 left-2 p-1 rounded-md bg-bodyColor shadow-md dark:bg-inputDark`}>
                <div onClick={()=>update()} className="w-full flex border-b items-center gap-2 hover:bg-slate-200 dark:hover:bg-[#65676b] p-1 rounded-md cursor-pointer">
                    <Pencil size={16} className="inline-block text-buttonsColor dark:text-[#0866ff] font-bold"/>
                    <span className="text-inputDark dark:text-bodyColor text-sm">تعديل</span>
                </div>
                <button disabled={loading} onClick={()=>deleteReview()} className="w-full flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-[#65676b] p-1 rounded-md">
                    {
                        loading ? 
                        <div className="flex justify-center w-full">
                            <span className="inline-block w-5 h-5 rounded-full border-2 border-buttonsColor border-l-transparent animate-spin"></span>
                        </div>
                        :<>
                            <Trash2 size={16} className="inline-block text-red-500 font-bold"/>
                            <span className="text-inputDark dark:text-bodyColor text-sm">حذف</span>
                        </>
                    }
                </button>
            </div>
        </div>
    );
}

export default UpdateADeleteReview;