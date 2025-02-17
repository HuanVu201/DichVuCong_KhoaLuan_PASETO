import { Button } from "antd"
import LeftSideChuyenDLTKTable from "./leftside/LeftSideTable"
import RightSideChuyenDLTKTable from "./rightside/RightSideTable"
import { FastForwardOutlined } from "@ant-design/icons"
import { AntdSelect } from "@/lib/antd/components"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ChuyenDuLieuTaiKhoan, SearchHoSo } from "@/features/hoso/redux/action"
import { ChuyenDLTKProvider, useChuyenDLTKContext } from "../contexts/ChuyenDLTKContext"
import { HoSoChuyenTaiKhoan } from "./HoSoChuyenTaiKhoan"

const ChuyenDLTK = () => {
    const currentYear = new Date().getFullYear().toString()
    const dispatch = useAppDispatch()
    const { datas: hoSos, count, loading } = useAppSelector((state) => state.hoso);
    const chuyenDLTKContext = useChuyenDLTKContext()
    const handleChuyenDLTK = () => {
        dispatch(ChuyenDuLieuTaiKhoan({ idUserCurr: chuyenDLTKContext.ChuyenDLTKLeftSideId, idUserNew: chuyenDLTKContext.ChuyenDLTKRightSideId, maHoSo: chuyenDLTKContext.maHoSoChuyenDLTK as any })).unwrap()
    }

    return (
        <div className='row' style={{ marginTop: '50px' }}>
            <div className='col-sm-6 col-md-6'>
                <LeftSideChuyenDLTKTable />
            </div>
            <div className='col-sm-6 col-md-6'>
                <div style={{ borderLeft: '1px solid #ccc', paddingLeft: '25px' }}>
                    <RightSideChuyenDLTKTable />
                </div>
            </div>
            {hoSos ?
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <Button onClick={handleChuyenDLTK} style={{ alignItems: 'center', display: 'flex' }} type="primary"><FastForwardOutlined style={{ fontSize: '18px' }} /><span>Chuyển dữ liệu tài khoản</span></Button>
                </div> : null
            }
            <div>
                <HoSoChuyenTaiKhoan></HoSoChuyenTaiKhoan>
            </div>
        </div>
    )
}
const ChuyenDLTKWrapper = () => (<ChuyenDLTKProvider>
    <ChuyenDLTK />
</ChuyenDLTKProvider>)
export default ChuyenDLTKWrapper