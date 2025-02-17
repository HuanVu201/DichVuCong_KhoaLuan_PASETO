import { AntdButton } from "@/lib/antd/components"
import { useCallback } from "react"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"
import { toast } from "react-toastify"
import { BaseActionProps } from "./type"
import { ICON_HOLDER } from "@/data"

export interface ThemMoiHoSoChungThucProps extends BaseActionProps{
    actionName : string
}
// sử dụng comp này bọc ngoài do không thể sử dụng customhook, và các hook bth ở trong useMemo, useEffect
export const ThemMoiHoSoChungThucWrapper = (props: ThemMoiHoSoChungThucProps) => {
    
    return <ThemMoiHoSoChungThuc {...props}></ThemMoiHoSoChungThuc>
}

const ThemMoiHoSoChungThuc = ({actionName, colorCode, iconName}: ThemMoiHoSoChungThucProps) => {
    const buttonActionContext = useButtonActionContext()
    const onClick = () => {
        buttonActionContext.setThemMoiHoSoChungThucModalVisible(true)
    }
    return <AntdButton onClick={onClick} style={{backgroundColor: colorCode, color: "#000"}} icon={iconName ? ICON_HOLDER[iconName] : undefined} disabled={buttonActionContext.selectedHoSos.length > 1}>{actionName}</AntdButton>
}