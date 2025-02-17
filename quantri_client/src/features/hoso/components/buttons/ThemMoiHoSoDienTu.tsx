import { AntdButton } from "@/lib/antd/components"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { BaseActionProps } from "./type"
import { ICON_HOLDER } from "@/data"

export interface ThemMoiHoSoDienTuProps extends BaseActionProps {
    actionName : string
}
// sử dụng comp này bọc ngoài do không thể sử dụng customhook, và các hook bth ở trong useMemo, useEffect
export const ThemMoiHoSoDienTuWrapper = (props: ThemMoiHoSoDienTuProps) => {
    return <ThemMoiHoSoDienTu {...props}></ThemMoiHoSoDienTu>
}

const ThemMoiHoSoDienTu = ({actionName, colorCode, iconName}: ThemMoiHoSoDienTuProps) => {
    const buttonActionContext = useButtonActionContext()
    const onClick = () => {
        buttonActionContext.setThemMoiHoSoDienTuModalVisible(true)
    }
    return <AntdButton onClick={onClick} style={{backgroundColor: colorCode, color: "#fff"}} icon={iconName ? ICON_HOLDER[iconName] : undefined}>{actionName}</AntdButton>
}