import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addReviews } from "../functions/addReviews";
import { updateReview } from "../functions/updateReviewById";

export interface formType {
    id:string;
    review: string;
    rating: string;
}

interface IProp {
    data: formType;
    setUpdateReview:React.Dispatch<React.SetStateAction<formType>>;
    setChanges: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddReview = ({data,setUpdateReview,setChanges}:IProp) => {
    // console.log(data);
    const {id} = useParams()
    const [formData,setFormData] = useState({
        review: data.review,
        rating: data.rating,
    })
    const [errRating, setErrRating] = useState(false);
    const [loading, setLoading] = useState(false);
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if(!formData.rating){
            setErrRating(true)
            setLoading(false)
            return
        }
        // console.log(formData);
        addReviews({...formData,rating:+formData.rating},id as string,setUpdateReview,setLoading,setChanges)
    }
    const update = () => {
        // console.log("update");
        setLoading(true);
        if(!formData.rating){
            setErrRating(true)
            setLoading(false)
            return
        }
        // console.log(formData);
        updateReview(data.id,{...formData,rating:+formData.rating},setUpdateReview,setLoading,setChanges)
    }
    useEffect(()=>{
        setFormData({review:data.review, rating:data.rating})
    },[data])
    return (
        <div className="w-full">
            <form onSubmit={onSubmit} action="" className="w-full">
                <div className="flex flex-col items-center gap-2 sm:flex-row">
                    <div className="w-full">
                        <input type="text" value={formData.review} onChange={(e)=>setFormData({...formData,review:e.target.value})} required placeholder="ادخل تقييم" className="w-full h-10 p-2 py-0 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor"/>
                    </div>
                    <div className="w-full sm:w-[100px]">
                        <select value={formData.rating} onChange={(e)=>{
                            setFormData({...formData,rating:e.target.value})
                            setErrRating(false)
                        }} required id="rate" className="w-full h-10 p-2 py-0 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primaryColor bg-inputColor">
                            {Array.from({length:5},(_e,x)=>(
                                <option key={x} value={x+1}>{x+1}</option>
                            ))}
                        </select>
                        {errRating && <p className="text-sm text-red-500 animate-bounce">من فضلك ادخل التقييم</p>}
                    </div>
                    {
                        data?.review.length > 0 ?
                        <button onClick={()=>update()}
                            type="button"
                            disabled={loading}
                            className={`w-full sm:w-[100px] h-10  mt-1 ${loading?"border-b-2 border-buttonsColor":"bg-buttonsColor border-0 hover:bg-indigo-600 "} text-white rounded  transition duration-200`}>
                            {loading ? (
                                <Spinner/>
                            ) : (
                                "تعديل"
                            )}
                        </button>
                        :<button
                            type="submit"
                            disabled={loading}
                            className={`w-full sm:w-[100px] h-10  mt-1 ${loading?"border-b-2 border-buttonsColor":"bg-buttonsColor border-0 hover:bg-indigo-600 "} text-white rounded  transition duration-200`}>
                            {loading ? (
                                <Spinner/>
                            ) : (
                                "ارسال"
                            )}
                        </button>
                    }
                </div>
            </form>
        </div>
    );
}

export default AddReview;
