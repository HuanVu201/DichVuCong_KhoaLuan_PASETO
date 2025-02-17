import { AntdButton } from "@/lib/antd/components"
import { useCallback } from "react"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { BaseActionProps } from "./type"
import { ICON_HOLDER } from "@/data"

export interface ThemMoiHoSoProps extends BaseActionProps {
    actionName : string
}
// sử dụng comp này bọc ngoài do không thể sử dụng customhook, và các hook bth ở trong useMemo, useEffect
export const ThemMoiHoSoWrapper = (props: ThemMoiHoSoProps) => {
    return <ThemMoiHoSo {...props}></ThemMoiHoSo>
}

const ThemMoiHoSo = ({actionName, colorCode, iconName}: ThemMoiHoSoProps) => {
    const buttonActionContext = useButtonActionContext()
    const onClick = () => {
        buttonActionContext.setThemMoiTiepNhanHoSoModalVisible(true)
    }
    return <AntdButton onClick={onClick} style={{backgroundColor: colorCode, color: "#000"}} icon={iconName ? ICON_HOLDER[iconName] : undefined}>{actionName}</AntdButton>
}