import { AntdButton } from "@/lib/antd/components"
import { useCallback } from "react"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { BaseActionProps } from "./type"
import { ICON_HOLDER } from "@/data"

export interface ThuHoiQuyetDinhLLTPProps extends BaseActionProps {
    actionName : string
}
// sử dụng comp này bọc ngoài do không thể sử dụng customhook, và các hook bth ở trong useMemo, useEffect
export const ThuHoiQuyetDinhLLTPWrapper = (props: ThuHoiQuyetDinhLLTPProps) => {
    return <ThuHoiQuyetDinhLLTP {...props}></ThuHoiQuyetDinhLLTP>
}

const ThuHoiQuyetDinhLLTP = ({actionName, colorCode, iconName}: ThuHoiQuyetDinhLLTPProps) => {
    const buttonActionContext = useButtonActionContext()
    const onClick = () => {
        buttonActionContext.setThuHoiQuyetDinhLLTPModalVisible(true)
    }
    return <AntdButton onClick={onClick} style={{backgroundColor: colorCode, color: "#fff"}} icon={iconName ? ICON_HOLDER[iconName] : undefined}>{actionName}</AntdButton>
}