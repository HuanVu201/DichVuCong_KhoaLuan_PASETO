import { AntdModal, AntdSelect } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Col, Form, InputNumber, Row } from "antd"
import { useCallback, useEffect } from "react"
import { resetData } from "@/features/quytrinhxuly/redux/slice"
import { useTruongHopThuTucContext } from "../../contexts/TruongHopThuTucContext"
import { AddNodeModalProps } from "./AddNodeModal"
import { IQuyTrinhXuLy } from "@/features/quytrinhxuly/models"
import { GetQuyTrinhXuLy, UpdateQuyTrinhXuLyWithoutSearch } from "@/features/quytrinhxuly/redux/action"

export const EditStartNodeModal = ({ nodes, onChangeNode} : Omit<AddNodeModalProps, "addNode">) =>{
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()
    const {data: quytrinhxuly} = useAppSelector(state => state.quytrinhxuly)
    const truongHopThuTucContext = useTruongHopThuTucContext()
    const onFinish = useCallback(async () => {
        const formData: IQuyTrinhXuLy = await form.validateFields()
        if(truongHopThuTucContext.quyTrinhId){
            if(truongHopThuTucContext.truongHopThuTucId)
            onChangeNode(truongHopThuTucContext.quyTrinhId, {...formData, truongHopId:truongHopThuTucContext.truongHopThuTucId})
            if(quytrinhxuly){
                dispatch(UpdateQuyTrinhXuLyWithoutSearch({id: truongHopThuTucContext.quyTrinhId, data: formData}))
            }
        }
        handlerCancel()
    }, [quytrinhxuly])
    const handlerCancel = () => {
        form.resetFields()
        dispatch(resetData())
        truongHopThuTucContext.setQuyTrinhId(undefined)
        truongHopThuTucContext.setEditStartModalVisible(false)
    }
    useEffect(() => {
        if(truongHopThuTucContext.quyTrinhId){
            dispatch(GetQuyTrinhXuLy(truongHopThuTucContext.quyTrinhId))
        }
    }, [truongHopThuTucContext.quyTrinhId])
    useEffect(() => {
        if(quytrinhxuly){
            form.setFieldsValue(quytrinhxuly)
        } else {
            const node = nodes.find(x => x.id === truongHopThuTucContext.quyTrinhId)
            form.setFieldsValue(node?.data)
        }
    }, [quytrinhxuly])
    return <AntdModal title="Thêm bước quy trình" onOk={onFinish} okText={"Lưu"}
    cancelText={"Đóng"} visible={true} handlerCancel={handlerCancel} >
    <Form name='TruongHopThuTuc_startNode'
            initialValues={{ thoiGianXuLy: 4}}
            layout="vertical" onFinish={onFinish} 
            form={form}  >
            <Row gutter={[8, 8]}>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Thời gian xử lý trực tiếp (giờ)"
                        name="thoiGianXuLy"
                        hasFeedback
                        rules={[
                            {  
                                required: true, 
                                message: 'Vui lòng nhập thời gian xử lý trực tiếp' 
                            }]}
                    >
                        <InputNumber min={1}/>
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Thời gian xử lý trực tuyến (giờ)"
                        name="thoiGianThucHienTrucTuyen"
                        hasFeedback
                        rules={[
                            {  
                                required: true, 
                                message: 'Vui lòng nhập thời gian xử lý trực tuyến' 
                            }]}
                    >
                        <InputNumber min={1}/>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
</AntdModal>
}