import image from "../assets/taskImage.jpeg"

const PopularTask = () => {
    return (
        <div className="p-3 bg-[#E2DDC6] rounded-md">
            <img src={image} alt="image task" />
            <div className="mt-3">
                <h2 className="font-semibold">إزالة الأثاث</h2>
                <p className="text-red-500 font-semibold mt-2">0$</p>
            </div>
        </div>
    );
}

export default PopularTask;