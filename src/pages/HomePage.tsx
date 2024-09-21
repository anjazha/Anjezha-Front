import { Search } from "lucide-react";
import image from "../assets/homeImage.png"
import PopularTask from "../components/PopularTask";

const HomePage = () => {
    return (
        <div className="flex justify-center py-5">
            <div className="container">
                <div className="flex items-center justify-center mb-5">
                    <h1 className="font-serif text-4xl font-extrabold sm:text-5xl dark:text-bodyColor">أنجزها|Anjezha</h1>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <h1 className="text-lg font-bold dark:text-bodyColor">ما هي المساعدة التي تحتاجها؟</h1>
                    <div className="w-full sm:w-[400px] h-10 rounded-full mt-1 bg-inputColor dark:bg-inputDark flex justify-between items-center px-4">
                        <input type="text" className="w-full h-full bg-transparent rounded outline-none dark:text-bodyColor dark:caret-bodyColor"/>
                        <div>
                            <Search size={16} className="dark:text-bodyColor"/>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-8">
                    <div className="relative">
                        <img src={image} alt="image"  className="h-[300px]"/>
                        <div className="bg-[#C2B884] absolute top-5 left-0 md:-left-10 p-2 px-3 w-[200px] h-fit">
                            <h2 className="text-[#433A0F] font-semibold">كيف يعمل:</h2>
                            <ol className="mt-1 font-semibold">
                                <li>1- نشر مهمة.</li>
                                <li>2- اختر عامل حسب السعر والمهارات و التقييمات.</li>
                                <li>3- جدولة العامل في وقت مبكر من اليوم.</li>
                                <li>4- الدردشة والدفع والنصائح و التقييمات.</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="py-3 mt-8 border-t border-black dark:border-bodyColor">
                    <h2 className="text-xl font-bold dark:text-bodyColor">المهام الشائعة:</h2>
                    <div className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {
                            Array.from({length:8},(_,x)=><PopularTask key={x}/>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
