import { AntdButton } from "@/lib/antd/components"
import { useCallback } from "react"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"
import { toast } from "react-toastify"
import { BaseActionProps } from "./type"
import { ICON_HOLDER } from "@/data"
import { useAppSelector } from "@/lib/redux/Hooks"

export interface TraKetQuaVaDanhGiaHaiLongProps extends BaseActionProps {
    actionName: string
}
// sử dụng comp này bọc ngoài do không thể sử dụng customhook, và các hook bth ở trong useMemo, useEffect
export const TraKetQuaVaDanhGiaHaiLongWrapper = (props: TraKetQuaVaDanhGiaHaiLongProps) => {

    return <TraKetQuaVaDanhGiaHaiLong {...props}></TraKetQuaVaDanhGiaHaiLong>
}

const TraKetQuaVaDanhGiaHaiLong = ({ actionName, colorCode, iconName }: TraKetQuaVaDanhGiaHaiLongProps) => {
    const buttonActionContext = useButtonActionContext()
    const { data: hoSo, loading, datas: hoSos } = useAppSelector(state => state.hoso)

    const onClick = () => {
        let check: boolean = true
        if (hoSos?.find(x => x.id === buttonActionContext.selectedHoSos[0])?.nguoiNhapDanhGiaText) {
            check = false
            toast.warning("Hồ sơ đã được đánh giá!")
        }


        if (buttonActionContext.selectedHoSos.length) {
            if (check)
                buttonActionContext.setTraKetQuaVaDanhGiaHaiLongModalVisible(true)
        } else {
            toast.info("Vui lòng chọn hồ sơ trước!")
        }
    }
    return <AntdButton onClick={onClick} style={{ backgroundColor: colorCode, color: "#fff" }} icon={iconName ? ICON_HOLDER[iconName] : undefined} disabled={buttonActionContext.selectedHoSos.length > 1}>{actionName}</AntdButton>
}