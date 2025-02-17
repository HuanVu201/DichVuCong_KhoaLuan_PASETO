import { Outlet } from "react-router-dom"
import SidebarProfileComponent from "./Sidebar"
import '../Index.scss'

export const HoSoCaNhanLayout = () => {
    return <div className="containerHoSoCaNhan commonBackgroundTrongDong">
        <div className="dichVuCong mt-3" >
        <div className="row">
            <div className="col-lg-3 col--12" style={{marginTop:'20px'}}>
                <SidebarProfileComponent />
            </div>
            <div className="col-lg-9 col--12" style={{marginTop:'20px'}}>
                <Outlet />
            </div>
        </div>
    </div>
    </div>
}