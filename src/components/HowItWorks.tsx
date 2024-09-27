import step1Image from "../assets/helpCard1.png";
import step2Image from "../assets/helpCard2.png";
import step3Image from "../assets/helpCard3.png";

const HowItWorks = () => {
    return (
        <div className="p-6 rounded-lg shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center">كيفية العمل</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Step 1 */}
                <div className="bg-white p-4 rounded-md shadow-md text-center">
                    <img src={step1Image} alt="Describe your task" className="w-full h-40 object-cover mb-4" />
                    <h3 className="font-semibold text-lg mb-2">1.وصف مهمتك</h3>
                    <p> أخبرنا بما تريد إنجازه و متى و أين يناسبك</p>
                </div>

                {/* Step 2 */}
                <div className="bg-white p-4 rounded-md shadow-md text-center">
                    <img src={step2Image} alt="Choose your Tasker" className="w-full h-40 object-cover mb-4" />
                    <h3 className="font-semibold text-lg mb-2">2.اختر الشخص الذي تثق فيه</h3>
                    <p>تصفح الأشخاص الذين تثق بهم من خلال المهارات والتقييمات والسعر. تحدث معهم لتأكيد التفاصيل.</p>
                </div>

                {/* Step 3 */}
                <div className="bg-white p-4 rounded-md shadow-md text-center">
                    <img src={step3Image} alt="Get it done" className="w-full h-40 object-cover mb-4" />
                    <h3 className="font-semibold text-lg mb-2">3.قم بإنجاز المهمة!</h3>
                    <p>يصل الموظف ويقوم بإنجاز المهمة.اترك تقييمًا، كل ذلك من خلال Anjezha.</p>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
