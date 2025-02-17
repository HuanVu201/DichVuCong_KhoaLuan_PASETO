import { AntdButton } from "@/lib/antd/components"
import { useCallback, useEffect } from "react"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"
import { toast } from "react-toastify"
import { BaseActionProps } from "./type"
import { ICON_HOLDER } from "@/data"
import { useAppSelector } from "@/lib/redux/Hooks"

export interface ThuHoiHoSoDaTraKetQuaProps extends BaseActionProps {
    actionName: string
}
// sử dụng comp này bọc ngoài do không thể sử dụng customhook, và các hook bth ở trong useMemo, useEffect
export const ThuHoiHoSoDaTraKetQuaWrapper = (props: ThuHoiHoSoDaTraKetQuaProps) => {

    return <ThuHoiHoSoDaTraKetQua {...props}></ThuHoiHoSoDaTraKetQua>
}

const ThuHoiHoSoDaTraKetQua = ({ actionName, colorCode, iconName }: ThuHoiHoSoDaTraKetQuaProps) => {
    const buttonActionContext = useButtonActionContext()
    const { datas: hoSos } = useAppSelector((state) => state.hoso);
    useEffect(() => {
        const hoSoSelected = hoSos?.find(x => x.id == buttonActionContext.selectedHoSos[0])
        buttonActionContext.setSelectedHoSo(hoSoSelected)
    }, [buttonActionContext.selectedHoSos])

    const onClick = () => {
        if (buttonActionContext.selectedHoSos.length) {
            buttonActionContext.setThuHoiHoSoDaTraKetQuaModalVisible(true)
        }
        // else if (buttonActionContext.selectedHoSos.length && buttonActionContext.selectedHoSo?.trangThaiThuPhi == "Đã thanh toán") {
        //     toast.warning("Hồ sơ đã thanh toán, không thể thu hồi")
        // }
        else {
            toast.info("Vui lòng chọn hồ sơ trước")
        }
    }
    return <AntdButton onClick={onClick} style={{ backgroundColor: colorCode, color: "#000" }} icon={iconName ? ICON_HOLDER[iconName] : undefined} disabled={buttonActionContext.selectedHoSos.length > 1}>{actionName}</AntdButton>
}