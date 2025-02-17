import { useState } from "react"
import { SidebarQLVB } from "./components/SidebarQLVB"
import { TableQLVB } from "./components/TableQLVB"
import './index.scss'

const QuanLyVanBanWrapper = () => {


    return (
        <div className="QlvbSwapper commonBackgroundTrongDong">
            <div className="QlvbBlock row">
                <div className="col-12 col-lg-3 mb-4">
                    <SidebarQLVB />
                </div>
                <div className="col-12 col-lg-9">
                    <TableQLVB />
                </div>
            </div>
        </div>
    )
}

export default QuanLyVanBanWrapper