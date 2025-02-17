import { AntdButton } from "@/lib/antd/components"
import React, { useCallback, useEffect } from "react"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"
import { toast } from "react-toastify"
import { BaseActionProps } from "./type"
import { ICON_HOLDER } from "@/data"
import { useAppSelector } from "@/lib/redux/Hooks"

export interface TuChoiTiepNhanHoSoTrucTuyenProps extends BaseActionProps {
    actionName: string
}
// sử dụng comp này bọc ngoài do không thể sử dụng customhook, và các hook bth ở trong useMemo, useEffect
export const TuChoiTiepNhanHoSoTrucTuyenWrapper = (props: TuChoiTiepNhanHoSoTrucTuyenProps) => {

    return <TuChoiTiepNhanHoSoTrucTuyen {...props}></TuChoiTiepNhanHoSoTrucTuyen>
}


const TuChoiTiepNhanHoSoTrucTuyen = ({ actionName, colorCode, iconName}: TuChoiTiepNhanHoSoTrucTuyenProps) => {
    const buttonActionContext = useButtonActionContext()
    const { data: hoSo, loading, datas: hoSos } = useAppSelector(state => state.hoso)

    useEffect(() => {
        const hoSoSelected = hoSos?.find(x => x.id == buttonActionContext.selectedHoSos[0])
        buttonActionContext.setSelectedHoSo(hoSoSelected)
    }, [buttonActionContext.selectedHoSos])
    const onClick = () => {
        if(!buttonActionContext.selectedHoSos.length){
            return
        }
        const hoSoSelected = hoSos?.find(x => x.id == buttonActionContext.selectedHoSos[0])
        if (buttonActionContext.selectedHoSos.length && buttonActionContext.selectedHoSo?.trangThaiThuPhi !== "Đã thanh toán" || hoSoSelected?.loaiDuLieuKetNoi == "LLTPVneidUyQuyen" || hoSoSelected?.loaiDuLieuKetNoi == "LLTPVneid") {
            buttonActionContext.setTuChoiTiepNhanHoSoTrucTuyenModalVisible(true)
        }
        else if(buttonActionContext.selectedHoSo?.trangThaiThuPhi == "Đã thanh toán"){
            toast.info("Hồ sơ đã thanh toán, không thể từ chối tiếp nhận")
        }
        else {
            toast.info("Vui lòng chọn hồ sơ trước")
        }
    }
    return <AntdButton onClick={onClick} style={{backgroundColor: colorCode, color: "#000"}} icon={iconName ? ICON_HOLDER[iconName] : undefined} 
        >{actionName}</AntdButton>
}