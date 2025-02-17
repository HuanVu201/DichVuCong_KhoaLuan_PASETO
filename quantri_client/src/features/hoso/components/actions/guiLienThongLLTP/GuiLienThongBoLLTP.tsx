import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { ISearchHoSo } from "@/features/hoso/models"
import { GetHoSo } from "@/features/hoso/redux/action"
import { hoSoApi } from "@/features/hoso/services"
import { AntdModal } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Modal } from "antd"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const GuiLienThongLLTPModal = ({setSearchHoSoParams}: {setSearchHoSoParams : React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const buttonActionContext = useButtonActionContext()
    const [btnLoading, setBtnLoading] = useState(false)
    const {datas: hoSos} = useAppSelector(state => state.hoso)
    const handleCancel = () => {
        buttonActionContext.setGuiLienThongLLTPModalVisible(false)
    }
    const onOk = async () =>{
        if(buttonActionContext.selectedHoSos.length){
            setBtnLoading(true)
            try {
                const hoSo = hoSos?.find(x => x.id == buttonActionContext.selectedHoSos[0])
                const maHoSo = hoSo?.maHoSo
                if(maHoSo){
                    const res = await hoSoApi.GuiLienThongLLTP(maHoSo)
                    if(res.data.succeeded){
                        setSearchHoSoParams((curr) => ({...curr}))
                        toast.success("Thao tác thành công")
                        handleCancel()
                    } else {
                        toast.warn(res.data.message)
                    }
                }
            } catch (error) {
                console.log(error);
                toast.warn("Thao tác thất bại")
            }
            setBtnLoading(false)
        }
    }

    return <AntdModal title="Xác nhận chuyển hồ sơ qua hệ thống LLTP" visible={true} onOk={onOk} confirmLoading={btnLoading} onCancel={handleCancel} okText={"Đồng ý"} closable={false} maskClosable={false}>
    </AntdModal>
}

export default GuiLienThongLLTPModal