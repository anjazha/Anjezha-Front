import { Search } from "lucide-react";
// import image from "../assets/homeImage.png"
import PopularTask from "../components/PopularTask";
import { useEffect, useState } from "react";
import { getAllCategory } from "../functions/getAllCategory";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import HowItWorks from "../components/HowItWorks";

interface subData {
  categoryId: string;
  subcategory: string;
  id: string;
  imageUrl: string;
  description: string;
}
interface dataType {
  id: string;
  category: string;
  imageUrl: string;
  description: string;
  subcategories: subData[];
}
interface form {
  search: string;
}
const HomePage = () => {
  const { register, handleSubmit } = useForm<form>();
  const [data, setData] = useState<dataType[]>([]);
  const myUrl = useNavigate();
  const onSubmit = (data: form) => {
    // console.log(data);
    myUrl(`/search?q=${data.search}&page=1`);
  };
  useEffect(() => {
    getAllCategory(setData);
  }, []);
  return (
    <div className="flex justify-center py-5 bg-bodyColor dark:bg-bodyDark transition duration-300">
      <div className="container mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold text-bodyDark  dark:text-bodyColor text-center">
          Anjezha | أنجزها
        </h1>
        <br/>

        <div style={{ backgroundImage: 'url(src/assets/cover.jpeg)', backgroundRepeat: "no-repeat", backgroundSize: 'cover' }} className="h-[50vh] py-6 relative before:absolute before:bg-[#cecccc5d] before:w-full before:h-full before:top-0 before:left-0">

          <div className="flex flex-col items-center gap-2 z-100 relative">
            <h2 className="text-lg font-bold text-bodyDark">
              ما هي المساعدة التي تحتاجها؟
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full sm:w-[400px] h-10 rounded-full mt-1 bg-inputColor dark:bg-inputDark flex justify-between items-center px-4 shadow-md"
            >
              <input
                type="text"
                {...register("search", { required: true })}
                className="w-full h-full bg-transparent rounded-full outline-none text-navColor dark:text-bodyColor dark:caret-bodyColor"
                placeholder="ابحث هنا..."
              />
              <button
                type="submit"
                className="flex items-center justify-center text-navColor dark:text-bodyColor"
              >
                <Search size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* <div className="flex justify-center my-8 relative">
                <img src={image} alt="image" className="h-[300px] w-auto rounded-md shadow-lg" />
                {/* <div className="bg-bodyColor absolute top-5 left-0 md:-left-10 p-2 px-3 w-[200px] h-fit rounded-md shadow-md">
                    <h3 className="text-[#433A0F] font-semibold">كيف يعمل:</h3>
                    <ol className="mt-1 font-semibold">
                        <li>1- نشر مهمة.</li>
                        <li>2- اختر عامل حسب السعر والمهارات و التقييمات.</li>
                        <li>3- جدولة العامل في وقت مبكر من اليوم.</li>
                        <li>4- الدردشة والدفع والنصائح و التقييمات.</li>
                    </ol>
                </div> 
            </div> */}
        <HowItWorks />
        <div className="py-5 mt-8 ">
          <h2 className="text-2xl font-bold text-navColor dark:text-bodyColor text-center ">
            المهام الشائعة
          </h2>
          <div className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.length > 0 ? (
              data.map((ele, x) => (
                <PopularTask
                  name={ele.category}
                  imageUrl={ele.imageUrl}
                  id={ele.id}
                  key={x}
                />
              ))
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
