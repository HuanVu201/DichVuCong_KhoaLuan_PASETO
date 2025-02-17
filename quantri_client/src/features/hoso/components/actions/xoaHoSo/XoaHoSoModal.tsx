import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { ISearchHoSo } from "@/features/hoso/models"
import { DeleteHoSo } from "@/features/hoso/redux/action"
import { AntdModal } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Col, Form, Input, Row } from "antd"
import { useState } from "react"
import { toast } from "react-toastify"


const XoaHoSoModal = ({setSearchHoSoParams}: {setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const [form] = Form.useForm<{lyDoXoa: string, deleteSecurityCode:string}>()
    const buttonActionContext = useButtonActionContext()
    const dispatch = useAppDispatch()
    const [btnLoading, setBtnLoading] = useState(false)
    const handleCancel = () => {
        buttonActionContext.setXoaHoSoModalVisible(false)
        buttonActionContext.setSelectedHoSos([])
    }
    const onOk = async () => {
        const formData = await form.validateFields() as {lyDoXoa: string, deleteSecurityCode:string}
        try {
            setBtnLoading(true)
            const res = await dispatch(DeleteHoSo({
                ids: buttonActionContext.selectedHoSos as string[],
                 lyDoXoa: formData.lyDoXoa, 
                 forceDelete: false,
                 deleteSecurityCode: formData.deleteSecurityCode})).unwrap()
            if(res.succeeded){
                setSearchHoSoParams((curr) => ({...curr}))
                handleCancel()
            }
            else{
                toast.error("Xóa thất bại")
            }
            setBtnLoading(false)
        } catch (error) {
            setBtnLoading(false)
        }
        
    }
    return <AntdModal confirmLoading={btnLoading} title="XÓA HỒ SƠ" visible={true} handlerCancel={handleCancel} width={700}
    onOk={onOk} okText="Xác nhận">
    <Form form={form} layout="vertical" name="TraKetQuaHoSoModal" >
        <Row gutter={8}>
            <Col span={24}>
                <Form.Item name="lyDoXoa" label="Lý do xóa hồ sơ" rules={[{required:true, message:"Vui lòng nhập lý do xóa hồ sơ"}]}>
                    <Input.TextArea rows={5} showCount maxLength={1500}/>
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item name="deleteSecurityCode" label="Mã xác thực" rules={[{required:true, message:"Vui lòng nhập mã xác thực"}]}>
                    <Input/>
                </Form.Item>
            </Col>
        </Row>
    </Form>
</AntdModal>
}

export default XoaHoSoModal