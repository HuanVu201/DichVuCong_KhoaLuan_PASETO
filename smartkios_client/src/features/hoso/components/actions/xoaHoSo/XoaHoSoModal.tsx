import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { ISearchHoSo } from "@/features/hoso/models"
import { DeleteHoSo } from "@/features/hoso/redux/action"
import { AntdModal } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Col, Form, Input, Row } from "antd"


const XoaHoSoModal = ({setSearchHoSoParams}: {setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const [form] = Form.useForm<{lyDoXoa: string}>()
    const buttonActionContext = useButtonActionContext()
    const dispatch = useAppDispatch()
    const {loading} = useAppSelector(state => state.hoso)
    const handleCancel = () => {
        buttonActionContext.setXoaHoSoModalVisible(false)
        buttonActionContext.setSelectedHoSos([])
    }
    const onOk = async () => {
        const formData = await form.validateFields() as {lyDoXoa: string}
        const res = await dispatch(DeleteHoSo({ids: buttonActionContext.selectedHoSos as string[], lyDoXoa: formData.lyDoXoa, forceDelete: false})).unwrap()
        if(res.succeeded){
            setSearchHoSoParams((curr) => ({...curr}))
            handleCancel()
        }
    }
    return <AntdModal confirmLoading={loading} title="XÓA HỒ SƠ" visible={true} handlerCancel={handleCancel} width={700}
    onOk={onOk} okText="Xác nhận">
    <Form form={form} layout="vertical" name="TraKetQuaHoSoModal" >
        <Row gutter={8}>
            <Col span={24}>
                <Form.Item name="lyDoXoa" label="Lý do xóa hồ sơ" rules={[{required:true, message:"Vui lòng nhập lý do xóa hồ sơ"}]}>
                    <Input.TextArea rows={5} showCount maxLength={1500}/>
                </Form.Item>
            </Col>
        </Row>
    </Form>
</AntdModal>
}

export default XoaHoSoModal