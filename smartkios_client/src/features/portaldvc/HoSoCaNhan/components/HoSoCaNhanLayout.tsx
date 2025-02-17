import { Outlet } from "react-router-dom"
import SidebarProfileComponent from "./Sidebar"

export const HoSoCaNhanLayout = () => {
    return <div className="container">
        <div className="dichVuCong mt-5" >
        <div className="row">
            <div className="col-sm-3 col-xs-12">
                <SidebarProfileComponent />
            </div>
            <div className="col-sm-9 col-xs-12">
                <Outlet />
            </div>
        </div>
    </div>
    </div>
}