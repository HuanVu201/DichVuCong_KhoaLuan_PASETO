import { ThongKe } from "./components/ThongKe"
import { ThongKePortalProvider } from "./context/ThongKePortalContext"

const ThongKePage = () => {
    return (
        <ThongKePortalProvider>
            <div className="containerThongKe commonBackgroundTrongDong">
                <ThongKe></ThongKe>
            </div>
        </ThongKePortalProvider>
    )
}
export default ThongKePage