import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { ISearchHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { AntdModal } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useState } from "react"
import { toast } from "react-toastify"
import DonViPhiDiaGioi from "../themMoiHoSoPhiDiaGioi/DonViPhiDiaGioi"
import { Col, Form, Row } from "antd"

const GuiLienThongLLTPModal = ({setSearchHoSoParams}: {setSearchHoSoParams : React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const buttonActionContext = useButtonActionContext()
    const [form] = Form.useForm()
    const [btnLoading, setBtnLoading] = useState(false)
    const {datas: hoSos} = useAppSelector(state => state.hoso)
    const handleCancel = () => {
        buttonActionContext.setGuiPhiDiaGioiModalVisible(false)
    }
    const onOk = async () =>{
        if(buttonActionContext.selectedHoSos.length){
            setBtnLoading(true)
            try {
                const hoSo = hoSos?.find(x => x.id == buttonActionContext.selectedHoSos[0])
                const maHoSo = hoSo?.maHoSo
                if(maHoSo){
                    const res = await hoSoApi.ChuyenHoSoPhiDiaGioi(maHoSo)
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

    return <>
    <AntdModal title="Xác nhận chuyển phi địa giới" visible={true} onOk={onOk}
    width={1280}
     confirmLoading={btnLoading} onCancel={handleCancel} okText={"Đồng ý"} closable={false} maskClosable={false}>
        <Form form={form} layout="vertical" name="DonViPhiDiaGioi">
            <DonViPhiDiaGioi form={form}/>
        </Form> 
    </AntdModal>
    </>
}

export default GuiLienThongLLTPModal