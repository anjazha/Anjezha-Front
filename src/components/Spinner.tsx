
const Spinner = () => {
    return (
        // <div className="flex justify-center items-center mt-5">
        //     <span className="inline-block w-7 h-7 rounded-full border-2 border-black border-l-[#D4CDA6] animate-spin"></span>
        // </div>

                <div className="flex items-center justify-center">
                    <div className="flex space-x-2">
                        <div className="w-4 h-4 bg-buttonsColor rounded-full animate-bounce"></div>
                        <div className="w-4 h-4 bg-buttonsColor rounded-full animate-bounce " style={{animationDelay:'.2s'}}></div>
                        <div className="w-4 h-4 bg-buttonsColor rounded-full animate-bounce animation-delay-400" style={{animationDelay:'.3s'}}></div>
                    </div>
                </div>

        
    );
}

export default Spinner;
