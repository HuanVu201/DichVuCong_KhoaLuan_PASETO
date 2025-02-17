import { AntdButton } from "@/lib/antd/components"
import { useCallback } from "react"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"
import { toast } from "react-toastify"
import { BaseActionProps } from "./type"
import { ICON_HOLDER } from "@/data"
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel"

export interface XuatExcelDanhSachHoSoProps extends BaseActionProps{
    actionName : string
}
// sử dụng comp này bọc ngoài do không thể sử dụng customhook, và các hook bth ở trong useMemo, useEffect
export const XuatExcelDanhSachHoSoWrapper = (props: XuatExcelDanhSachHoSoProps) => {
    
    return <XuatExcelDanhSachHoSo {...props}></XuatExcelDanhSachHoSo>
}

const XuatExcelDanhSachHoSo = ({actionName, colorCode,iconName}: XuatExcelDanhSachHoSoProps) => {
    const buttonActionContext = useButtonActionContext()
    const onClick = () => {
       
            downloadPhieuExcel("Danh sách hồ sơ", "danhSachHoSoTable");
        
    }
    return <AntdButton onClick={onClick} style={{backgroundColor: colorCode, color: "#000"}} icon={iconName ? ICON_HOLDER[iconName] : undefined} disabled={buttonActionContext.selectedHoSos.length > 1}>{actionName}</AntdButton>
}