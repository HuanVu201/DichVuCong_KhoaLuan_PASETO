import { AntdButton } from "@/lib/antd/components"
import { useCallback, useEffect } from "react"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"
import { toast } from "react-toastify"
import { BaseActionProps } from "./type"
import { ICON_HOLDER } from "@/data"
import { useAppSelector } from "@/lib/redux/Hooks"

export interface DatLaiHoSoQuaHanProps extends BaseActionProps {
    actionName: string
}
// sử dụng comp này bọc ngoài do không thể sử dụng customhook, và các hook bth ở trong useMemo, useEffect
export const DatLaiHoSoQuaHanWrapper = (props: DatLaiHoSoQuaHanProps) => {

    return <DatLaiHoSoQuaHan {...props}></DatLaiHoSoQuaHan>
}

const DatLaiHoSoQuaHan = ({ actionName, colorCode, iconName }: DatLaiHoSoQuaHanProps) => {
    const { datas: hoSos } = useAppSelector((state) => state.hoso);
    const soLuong = 10

    const buttonActionContext = useButtonActionContext()
    useEffect(() => {
        const hoSoSelected = hoSos?.find(x => x.id == buttonActionContext.selectedHoSos[0])
        buttonActionContext.setSelectedHoSo(hoSoSelected)
    }, [buttonActionContext.selectedHoSos])

    const onClick = () => {
        if (buttonActionContext.selectedHoSos.length > soLuong) {
            toast.info(`Vui lòng chọn tối đa ${soLuong} hồ sơ`)
            return
        }
        if (buttonActionContext.selectedHoSos.length) {
            console.log(123);
            buttonActionContext.setSelectedHoSoKeyByTHTTs(buttonActionContext.selectedHoSos as string[])
            buttonActionContext.setDatLaiNhieuHoSoQuaHanModalVisible(true)
        }
        else if (buttonActionContext.selectedHoSos.length == 0) {
            toast.info("Vui lòng chọn hồ sơ trước")
        }
    }
    return <AntdButton onClick={onClick} style={{ backgroundColor: colorCode, color: "#fff" }} icon={iconName ? ICON_HOLDER[iconName] : undefined} >{actionName}</AntdButton>
}