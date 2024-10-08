/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getReviewsTasker } from "../functions/getReviewsTasker";
import AddReview from "./AddReview";
import Spinner from "./Spinner";
import image from "../assets/default-user-image.jpg"
import { Star } from "lucide-react";
import UpdateADeleteReview from "./UpdateADeleteReview";

const ReviewsTasker = ({taskerId}:{taskerId:string | undefined}) => {
    const [reviews, setReviews] = useState<any[] | null>(null);
    const [changes, setChanges] = useState(false);
    const [updateReview,setUpdateReview] = useState({
        id:"",
        review:"",
        rating:"",
    });
    useEffect(()=>{
        if(taskerId){
            getReviewsTasker(taskerId,setReviews)
        }
    },[taskerId,changes])
    return (
        <div>
            <AddReview data={updateReview} setUpdateReview={setUpdateReview} setChanges={setChanges}/>
            <div className="mt-5">
                {
                    reviews ? 
                        <>
                            {
                                reviews.length === 0 ? 
                                <div>
                                    <h2 className="text-lg font-semibold text-center dark:text-bodyColor">لا يوجد اراء بعد</h2>
                                </div>
                                :
                                reviews.map((review, index) => (
                                    <div key={index} className="bg-bodyColor dark:bg-bodyDark relative p-3 rounded-md flex gap-3 shadow-md">
                                        <div>
                                            <img src={image} alt="user image" className="w-10 h-10 rounded-full border" />
                                        </div>
                                        <div>
                                            <h2 className="font-semibold dark:text-bodyColor m-0">Abdo Ahmed</h2>
                                            <p className="text-xl text-yellow-500 flex items-center gap-1 m-0">{review.rating} <Star size={20}/></p>
                                            <p className="dark:text-bodyColor m-0">
                                                {review.review}
                                            </p>
                                        </div>
                                        <UpdateADeleteReview review={review} setChanges={setChanges} setUpdateReview={setUpdateReview}/>
                                    </div>
                                ))
                            }
                        </>
                    : (
                        <Spinner />
                    )
                }
            </div>
        </div>
    );
}

export default ReviewsTasker;
