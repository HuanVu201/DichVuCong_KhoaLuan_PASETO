import { AntdButton } from "@/lib/antd/components"
import { useCallback } from "react"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"
import { toast } from "react-toastify"
import { BaseActionProps } from "./type"
import { ICON_HOLDER } from "@/data"
import { useAppSelector } from "@/lib/redux/Hooks"

export interface LienThongHeThongLLTPHoSoProps extends BaseActionProps{
    actionName : string
}
// sử dụng comp này bọc ngoài do không thể sử dụng customhook, và các hook bth ở trong useMemo, useEffect
export const LienThongHeThongLLTPHoSoWrapper = (props: LienThongHeThongLLTPHoSoProps) => {
    
    return <LienThongHeThongLLTPHoSo {...props}></LienThongHeThongLLTPHoSo>
}

const LienThongHeThongLLTPHoSo = ({actionName, colorCode,iconName}: LienThongHeThongLLTPHoSoProps) => {
    const buttonActionContext = useButtonActionContext()
    const {datas: hoSos} = useAppSelector(state => state.hoso) 
    const onClick = () => {
        if(buttonActionContext.selectedHoSos.length){
            const selectedHoSo = hoSos?.find(x => x.id == buttonActionContext.selectedHoSos[0])
            if(!selectedHoSo){
                toast.info("Vui lòng chọn hồ sơ trước")
                return;
            }
            if(selectedHoSo.loaiDuLieuKetNoi == "LLTPVneid" || selectedHoSo.loaiDuLieuKetNoi == "LLTPVneidUyQuyen"){
                buttonActionContext.setGuiLienThongLLTPModalVisible(true)
                return;
            }
            buttonActionContext.setLienThongHeThongLLTPHoSoModalVisible(true)
        }else {
            toast.info("Vui lòng chọn hồ sơ trước")
        }
    }
    return <AntdButton onClick={onClick} style={{backgroundColor: colorCode, color: "#fff"}} icon={iconName ? ICON_HOLDER[iconName] : undefined} disabled={buttonActionContext.selectedHoSos.length > 1}>{actionName}</AntdButton>
}