import { useState } from "react"
import { SidebarQLVB } from "./components/SidebarQLVB"
import { TableQLVB } from "./components/TableQLVB"

const QuanLyVanBanWrapper = () => {


    return (
        <div style={{marginTop : '50px'}}>
            <div className="container ">
                <div className="row" style={{ marginRight: '100px', marginLeft: '100px' }}>
                    <div className="col-sm-4 col-md-3 container">
                        <SidebarQLVB></SidebarQLVB>
                    </div>
                    <div className="col-sm-8 col-md-9 container">
                        <TableQLVB></TableQLVB>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuanLyVanBanWrapper