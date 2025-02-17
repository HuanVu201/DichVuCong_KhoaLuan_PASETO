import { Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IQuyTrinhXuLy } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddQuyTrinhXuLy, GetQuyTrinhXuLy, UpdateQuyTrinhXuLy } from "../redux/action"
import { useQuyTrinhXuLyContext } from "../contexts/QuyTrinhXuLyContext"
import { resetData } from "@/features/quytrinhxuly/redux/slice"

export const QuyTrinhXuLyDetail = () => {
    const dispatch = useAppDispatch()
    const { data: QuyTrinhXuLy, datas: QuyTrinhXuLys } = useAppSelector(state => state.quytrinhxuly)
    const QuyTrinhXuLyContext = useQuyTrinhXuLyContext()
    const [form] = Form.useForm<IQuyTrinhXuLy>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (QuyTrinhXuLyContext?.quyTrinhXuLyId) {
            dispatch(UpdateQuyTrinhXuLy({ id: QuyTrinhXuLyContext.quyTrinhXuLyId, data: { ...formData,} }))
        } else {
            dispatch(AddQuyTrinhXuLy({ ...formData}))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        QuyTrinhXuLyContext.setQuyTrinhXuLyModalVisible(false)
        QuyTrinhXuLyContext.setQuyTrinhXuLyId(undefined)
    };
    useEffect(() => {
        if (QuyTrinhXuLyContext.quyTrinhXuLyId) {
            dispatch(GetQuyTrinhXuLy(QuyTrinhXuLyContext.quyTrinhXuLyId))
        }
    }, [QuyTrinhXuLyContext.quyTrinhXuLyId])

    useEffect(() => {
        if (QuyTrinhXuLy) {
            form.setFieldsValue({ ...QuyTrinhXuLy})
        }
    }, [QuyTrinhXuLy])
    return (
        <AntdModal title="Thêm mới thủ tục" visible={QuyTrinhXuLyContext.quyTrinhXuLyModalVisible} handlerCancel={handleCancel} footer={null}>
        <Form name='QuyTrinhXuLy' layout="vertical" onFinish={onFinish} form={form} requiredMark={QuyTrinhXuLyContext.quyTrinhXuLyId === null} 
            initialValues={{ soLuongQuyTrinhXuLy: 0, soLuongQuyTrinhXuLyCapTinh: 0, soLuongQuyTrinhXuLyCapHuyen: 0, soLuongQuyTrinhXuLyCapXa: 0 }}>
            <Row gutter={[8, 8]}>
                <Col span={24}>
                    <Form.Item
                        label="Tên thủ tục"
                        name="ten"
                        rules={[{ required: true, message: 'Vui lòng nhập tên thủ tục' }]}
                        
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Mã thủ tục"
                        name="ma"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Mã ngành"
                        name="maNganh"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Số lượng thủ tục"
                        name="soLuongQuyTrinhXuLy"
                    >
                        <InputNumber min={0}/>
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Số lượng thủ tục cấp tỉnh"
                        name="soLuongQuyTrinhXuLyCapTinh"
                    >
                        <InputNumber min={0}/>
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Số lượng thủ tục cấp huyện"
                        name="soLuongQuyTrinhXuLyCapHuyen"
                    >
                        <InputNumber min={0}/>
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Số lượng thủ tục cấp xã"
                        name="soLuongQuyTrinhXuLyCapXa"
                    >
                        <InputNumber min={0}/>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Space >
                    <AntdButton type="primary" onClick={onFinish}>
                        Xác nhận
                    </AntdButton>
                    <AntdButton type="default" onClick={handleCancel}>
                        Đóng
                    </AntdButton>
                </Space>
            </Form.Item>
        </Form>
        </AntdModal>
    )
}