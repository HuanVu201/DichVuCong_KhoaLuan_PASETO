import { Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { ILoaiPhiLePhi } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddLoaiPhiLePhi, GetLoaiPhiLePhi, UpdateLoaiPhiLePhi } from "../redux/action"
import { useLoaiPhiLePhiContext } from "../contexts/LoaiPhiLePhiContext"
import { resetData } from "@/features/loaiphilephi/redux/slice"

const suDungPhiLePhiOptions: SelectProps["options"] = [
    { label: "Có", value: true as any },
    { label: "Không", value: false },
];
export const LoaiPhiLePhiDetail = () => {
    const dispatch = useAppDispatch()
    const { data: loaiPhiLePhi, datas: loaiPhiLePhis } = useAppSelector(state => state.loaiphilephi)
    const loaiPhiLePhiContext = useLoaiPhiLePhiContext()
    const [form] = Form.useForm<ILoaiPhiLePhi>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (loaiPhiLePhiContext?.maPhiLePhi) {
            dispatch(UpdateLoaiPhiLePhi({ id: loaiPhiLePhiContext.maPhiLePhi, data: { ...formData, } }))
        } else {
            dispatch(AddLoaiPhiLePhi({ ...formData }))
        }
        form.resetFields()
        loaiPhiLePhiContext.setMaPhiLePhiModalVisible(false)
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        loaiPhiLePhiContext.setMaPhiLePhiModalVisible(false)
        loaiPhiLePhiContext.setMaPhiLePhiaPhiLePhi(undefined)
    };
    useEffect(() => {
        if (loaiPhiLePhiContext.maPhiLePhi) {
            dispatch(GetLoaiPhiLePhi(loaiPhiLePhiContext.maPhiLePhi))
        }
    }, [loaiPhiLePhiContext.maPhiLePhi])

    useEffect(() => {
        if (loaiPhiLePhi) {
            form.setFieldsValue({ ...loaiPhiLePhi })
        }
    }, [loaiPhiLePhi])

    return (
        <AntdModal title="Thêm mới loại phí,lệ phí" visible={loaiPhiLePhiContext.maPhiLePhiModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='dichvu' layout="vertical" onFinish={onFinish} form={form} requiredMark={loaiPhiLePhiContext.maPhiLePhi === null} initialValues={{ thuTu: 1 }}>
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã"
                            name="ma"
                            rules={[{ required: true, message: 'Vui lòng nhập mã' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tên"
                            name="ten"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Sử dụng"
                            name="suDung"
                        >
                            <AntdSelect options={suDungPhiLePhiOptions} />
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