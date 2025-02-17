
import { AntdButton } from "@/lib/antd/components"
import { useCallback } from "react"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"
import { toast } from "react-toastify"
import { BaseActionProps } from "./type"
import { ICON_HOLDER } from "@/data"
import { useAppSelector } from "@/lib/redux/Hooks"
import dayjs from "dayjs"

export interface TraCuuBTPHoSoProps extends BaseActionProps{
    actionName : string
}
// sử dụng comp này bọc ngoài do không thể sử dụng customhook, và các hook bth ở trong useMemo, useEffect
export const TraCuuBTPHoSoWrapper = (props: TraCuuBTPHoSoProps) => {
    
    return <TraCuuBTPHoSo {...props}></TraCuuBTPHoSo>
}

const TraCuuBTPHoSo = ({actionName, colorCode,iconName}: TraCuuBTPHoSoProps) => {
    const buttonActionContext = useButtonActionContext()
    const {thoiGianTraCuuBTP} = useAppSelector(state => state.hoso)
    const onClick = () => {
        if(buttonActionContext.selectedHoSos.length){
            const soLuongTraCuuMax = import.meta.env.VITE_SOLUONGTRACUUBTPNHIEUHOSO || 3
            if(buttonActionContext.selectedHoSos.length > +soLuongTraCuuMax){
                toast.warn(`Vui lòng chọn tối đa ${soLuongTraCuuMax} hồ sơ`)
                return;
            }
            if(thoiGianTraCuuBTP){
                const thoiGianCauHinh = import.meta.env.VITE_THOIGIANTHUCHIENTRACUUBTP;
                const now = dayjs();
                const thoiGianTraCuuBTPParse = dayjs(thoiGianTraCuuBTP)
                const diffInSeconds = now.diff(thoiGianTraCuuBTPParse, 'second');
                const remainingSeconds = (thoiGianCauHinh ? + thoiGianCauHinh : 3) * 60 - diffInSeconds;

                if (remainingSeconds > 0) {
                    const minutes = Math.floor(remainingSeconds / 60);
                    const seconds = remainingSeconds % 60;
                    toast.warn(`Vui lòng sử dụng lại chức năng sau ${minutes} phút: ${seconds} giây`);
                    return
                }
            }
            buttonActionContext.setTraCuuBTPHoSoModalVisible(true)
        }else {
            toast.info("Vui lòng chọn hồ sơ trước")
        }
    }
    return <AntdButton onClick={onClick} style={{backgroundColor: colorCode, color: "#fff"}} icon={iconName ? ICON_HOLDER[iconName] : undefined} >{actionName}</AntdButton>
}