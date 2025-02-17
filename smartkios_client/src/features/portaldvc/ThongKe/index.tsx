import { ThongKe } from "./components/ThongKe"
import { ThongKePortalProvider } from "./context/ThongKePortalContext"

const ThongKePage = () => {
    return (
        <ThongKePortalProvider>
            <div className="container" style={{marginTop : '50px'}}>
                <ThongKe></ThongKe>
            </div>
        </ThongKePortalProvider>
    )
}
export default ThongKePage