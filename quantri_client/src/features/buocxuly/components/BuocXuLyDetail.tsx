import { Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IBuocXuLy } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddBuocXuLy, GetBuocXuLy, UpdateBuocXuLy } from "../redux/action"
import { useBuocXuLyContext } from "../contexts/BuocXuLyContext"
import { resetData } from "@/features/buocxuly/redux/slice"

export const BuocXuLyDetail = () => {
    const dispatch = useAppDispatch()
    const { data: buocXuLy } = useAppSelector(state => state.buocxuly)
    const buocXuLiContext = useBuocXuLyContext()
    const [form] = Form.useForm<IBuocXuLy>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (buocXuLiContext?.buocXuLiId) {
            dispatch(UpdateBuocXuLy({ id: buocXuLiContext.buocXuLiId, data: { ...formData,} }))
        } else {
            dispatch(AddBuocXuLy({ ...formData}))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        buocXuLiContext.setBuocXuLiModalVisibleModalVisible(false)
        buocXuLiContext.setBuocXuLiId(undefined)
    };
    useEffect(() => {
        if (buocXuLiContext.buocXuLiId) {
            dispatch(GetBuocXuLy(buocXuLiContext.buocXuLiId))
        }
    }, [buocXuLiContext.buocXuLiId])

    useEffect(() => {
        if (buocXuLy) {
            form.setFieldsValue({ ...buocXuLy})
        }
    }, [buocXuLy])

    return (
        <AntdModal title="Thêm mới bước xử lý" visible={buocXuLiContext.buocXuLiModalVisible} handlerCancel={handleCancel} footer={null}>
        <Form name='buocxuli' layout="vertical" onFinish={onFinish} form={form} requiredMark={buocXuLiContext.buocXuLiId !== null} initialValues={{ thuTu: 1 }}>
            <Row gutter={[8, 8]}>
                <Col md={24} span={24}>
                    <Form.Item
                        label="Tên bước"
                        name="tenBuoc"
                    >
                        <Input />
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