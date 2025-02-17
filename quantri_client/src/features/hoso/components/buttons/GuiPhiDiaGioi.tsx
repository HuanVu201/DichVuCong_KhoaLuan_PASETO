import { AntdButton } from "@/lib/antd/components"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { toast } from "react-toastify"
import { BaseActionProps } from "./type"
import { ICON_HOLDER } from "@/data"

export interface GuiPhiDiaGioiProps extends BaseActionProps{
    actionName : string
}
// sử dụng comp này bọc ngoài do không thể sử dụng customhook, và các hook bth ở trong useMemo, useEffect
export const GuiPhiDiaGioiWrapper = (props: GuiPhiDiaGioiProps) => {
    
    return <GuiPhiDiaGioi {...props}></GuiPhiDiaGioi>
}

const GuiPhiDiaGioi = ({actionName, colorCode, iconName}: GuiPhiDiaGioiProps) => {
    const buttonActionContext = useButtonActionContext()
    const onClick = () => {
        if(buttonActionContext.selectedHoSos.length){
            buttonActionContext.setGuiPhiDiaGioiModalVisible(true)
        }else {
            toast.info("Vui lòng chọn một hồ sơ")
        }
    }
    return <AntdButton onClick={onClick} style={{backgroundColor: colorCode, color: "#fff"}} icon={iconName ? ICON_HOLDER[iconName] : undefined} disabled={buttonActionContext.selectedHoSos.length > 1}>{actionName}</AntdButton>
}