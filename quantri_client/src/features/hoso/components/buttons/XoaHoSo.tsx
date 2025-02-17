import { AntdButton } from "@/lib/antd/components"
import { useCallback } from "react"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { toast } from "react-toastify"
import { BaseActionProps } from "./type"
import { ICON_HOLDER } from "@/data"
import { useAppSelector } from "@/lib/redux/Hooks"

export interface XoaHoSoProps extends BaseActionProps {
    actionName : string
}
// sử dụng comp này bọc ngoài do không thể sử dụng customhook, và các hook bth ở trong useMemo, useEffect
export const XoaHoSoWrapper = (props: XoaHoSoProps) => {
    
    return <XoaHoSo {...props}></XoaHoSo>
}

const XoaHoSo = ({actionName, colorCode, iconName}: XoaHoSoProps) => {
    const buttonActionContext = useButtonActionContext()
    const {datas: hoSos} = useAppSelector(state => state.hoso)
    const onClick = () => {
        if(buttonActionContext.selectedHoSos.length){
            // const hoSoTrucTuyens = hoSos?.filter(x => buttonActionContext.selectedHoSos.includes(x.id) && x.kenhThucHien == "2")
            // if(hoSoTrucTuyens?.length){
            //     toast.warn("Vui lòng liên hệ quản trị hệ thống để được hỗ trợ xóa hồ sơ được gửi bằng hình thức trực tuyến!")
            // }
            // if(hoSoTrucTuyens && hoSoTrucTuyens.length == buttonActionContext.selectedHoSos.length){
            //     return
            // }

            buttonActionContext.setXoaHoSoModalVisible(true)
        }else {
            toast.info("Vui lòng chọn hồ sơ trước")
        }
    }
    return <AntdButton onClick={onClick} style={{backgroundColor: colorCode, color: "#fff"}} icon={iconName ? ICON_HOLDER[iconName] : undefined} >{actionName}</AntdButton>
}