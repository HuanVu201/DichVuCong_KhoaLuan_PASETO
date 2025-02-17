import HeaderLayout from "@/lib/antd/components/BothLayout/HeaderLayout"
import { HeaderSmartKiost } from "./components/HeaderSmartKiosk"
import { SmartKioskPage } from "./components/SmartKioskPage"
import './scss/index.scss'
import { useEffect } from "react"
const SmartKioskWrapper = () => {
    useEffect(() => {
        var element = document.querySelector('.yhy-append-wrap') as HTMLElement;
        if (element) {
            const initialDisplay = element.style.display;
            // Thay đổi CSS khi component được mout
            element.style.display = 'none';
            // Cleanup khi component bị unmounted
            return () => {
                // Khôi phục trạng thái CSS ban đầu
                element.style.display = initialDisplay;
            };
        }
    }, [])
    return (
        <div className="wrapper">
            <SmartKioskPage></SmartKioskPage>
        </div>

    )
}

export default SmartKioskWrapper