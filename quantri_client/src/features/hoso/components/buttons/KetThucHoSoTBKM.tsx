import { AntdButton } from "@/lib/antd/components"
import { useCallback, useEffect } from "react"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"
import { toast } from "react-toastify"
import { BaseActionProps } from "./type"
import { ICON_HOLDER } from "@/data"
import { useAppSelector } from "@/lib/redux/Hooks"

export interface KetThucHoSoTBKMProps extends BaseActionProps {
    actionName: string
}
// sử dụng comp này bọc ngoài do không thể sử dụng customhook, và các hook bth ở trong useMemo, useEffect
export const KetThucHoSoTBKMWrapper = (props: KetThucHoSoTBKMProps) => {

    return <KetThucHoSoTBKM {...props}></KetThucHoSoTBKM>
}


const KetThucHoSoTBKM = ({ actionName, colorCode, iconName }: KetThucHoSoTBKMProps) => {
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
        if (buttonActionContext.selectedHoSos.length && buttonActionContext.selectedHoSo?.thuTucKhongCoKetQua == "True") {
            buttonActionContext.setSelectedHoSoKeyByTHTTs(buttonActionContext.selectedHoSos as string[])
            buttonActionContext.setKetThucHoSoTBKMModalVisible(true)
        }
        else if (buttonActionContext.selectedHoSos.length == 0) {
            toast.info("Vui lòng chọn hồ sơ trước")
        }
        else if (buttonActionContext.selectedHoSo?.thuTucKhongCoKetQua == "False" || buttonActionContext.selectedHoSo?.thuTucKhongCoKetQua == null) {
            toast.info("Thủ tục là thủ tục có kết quả, không thể kết thúc")
        }
        // else if (buttonActionContext.selectedHoSo?.maGiayToHoSo == null) {
        //     toast.info("Hồ sơ không có giấy tiếp nhận, không thể kết thúc")
        // }


    }


    return <AntdButton onClick={onClick} style={{ backgroundColor: colorCode, color: "#fff" }} icon={iconName ? ICON_HOLDER[iconName] : undefined} >{actionName}</AntdButton>
}