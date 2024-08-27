import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="flex justify-center py-5 bg-footerColor">
            <div className="container">
                <div className="grid grid-cols-2 gap-5 font-semibold sm:grid-cols-3">
                    <div className="flex justify-start">
                        <ul className="flex flex-col gap-1">
                            <li>انجزها 2024 &copy;</li>
                            <li>شروط الاستخدام.</li>
                            <li>خصوصية.</li>
                            <li>ترخيص السياسة.</li>
                            <li>تواصل.</li>
                        </ul>
                    </div>
                    <div className="flex justify-center">
                        <ul className="flex flex-col gap-1">
                            <li>اكتشف :</li>
                            <li>- جميع الخدمات</li>
                            <li>- المهام</li>
                            <li>- تصفح المهام</li>
                            <li>- المساعدة</li>
                        </ul>
                    </div>
                    <div className="flex flex-col sm:items-end">
                        <p className="text-xl font-bold">تابعنا :</p>
                        <ul className="flex gap-1 mt-3">
                            <li><Link to={""}><Twitter size={25}/></Link></li>
                            <li><Link to={""}><Instagram size={25}/></Link></li>
                            <li><Link to={""}><Youtube size={25}/></Link></li>
                            <li><Link to={""}><Linkedin size={25}/></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;