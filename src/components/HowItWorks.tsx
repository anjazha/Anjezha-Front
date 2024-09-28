import step1Image from "../assets/helpCard1.png";
import step2Image from "../assets/helpCard2.png";
import step3Image from "../assets/helpCard3.png";

const HowItWorks = () => {
  return (
    <div className="p-6 rounded-lg shadow-sm  dark:bg-inputDark">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-bodyColor">
        كيفية العمل
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <div className="p-4 rounded-md shadow-md transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
          <img
            src={step1Image}
            alt="Describe your task"
            className="w-full h-40 object-cover mb-4 rounded-md"
          />
          <h3 className="font-semibold text-lg mb-2 dark:text-bodyColor">
            1. وصف مهمتك
          </h3>
          <p className="dark:text-bodyColor">
            أخبرنا بما تريد إنجازه ومتى وأين يناسبك.
          </p>
        </div>

        {/* Step 2 */}
        <div className="p-4 rounded-md shadow-md transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
          <img
            src={step2Image}
            alt="Choose your Tasker"
            className="w-full h-40 object-cover mb-4 rounded-md"
          />
          <h3 className="font-semibold text-lg mb-2 dark:text-bodyColor">
            2. اختر الشخص الذي تثق فيه
          </h3>
          <p className="dark:text-bodyColor">
            تصفح الأشخاص الذين تثق بهم من خلال المهارات والتقييمات والسعر. تحدث
            معهم لتأكيد التفاصيل.
          </p>
        </div>

        {/* Step 3 */}
        <div className="p-4 rounded-md shadow-md transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
          <img
            src={step3Image}
            alt="Get it done"
            className="w-full h-40 object-cover mb-4 rounded-md"
          />
          <h3 className="font-semibold text-lg mb-2 dark:text-bodyColor">
            3. قم بإنجاز المهمة!
          </h3>
          <p className="dark:text-bodyColor">
            يصل الموظف ويقوم بإنجاز المهمة. اترك تقييمًا، كل ذلك من خلال
            Anjezha.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
