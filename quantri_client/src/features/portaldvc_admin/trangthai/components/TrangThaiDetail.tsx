import { Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { ITrangThai } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddTrangThai, GetTrangThai, UpdateTrangThai } from "../redux/action"
import { useTrangThaiContext } from "../contexts/TrangThaiContext"
import { resetData } from "../redux/slice"

const suDungPhiLePhiOptions: SelectProps["options"] = [
    { label: "Có", value: true as any },
    { label: "Không", value: false },
];
export const TrangThaiDetail = () => {
    const dispatch = useAppDispatch()
    const { data: TrangThai, datas: TrangThais } = useAppSelector(state => state.trangthai)
    const TrangThaiContext = useTrangThaiContext()
    const [form] = Form.useForm<ITrangThai>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (TrangThaiContext?.maTrangThai) {
            dispatch(UpdateTrangThai({ id: TrangThaiContext.maTrangThai, data: { ...formData, } }))
        } else {
            dispatch(AddTrangThai({ ...formData }))
        }
        form.resetFields()
        TrangThaiContext.setMaTrangThaiModalVisible(false)
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        TrangThaiContext.setMaTrangThaiModalVisible(false)
        TrangThaiContext.setMaTrangThai(undefined)
    };
    useEffect(() => {
        if (TrangThaiContext.maTrangThai) {
            dispatch(GetTrangThai(TrangThaiContext.maTrangThai))
        }
    }, [TrangThaiContext.maTrangThai])

    useEffect(() => {
        if (TrangThai) {
            form.setFieldsValue({ ...TrangThai })
        }
    }, [TrangThai])

    return (
        <AntdModal title="Thêm mới TrangThai" visible={TrangThaiContext.maTrangThaiModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='TrangThai' layout="vertical" onFinish={onFinish} form={form} requiredMark={TrangThaiContext.maTrangThai === null} initialValues={{ thuTu: 1 }}>
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            label="Tên trạng thái"
                            name="tenTrangThai"
                        // rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Thứ tự"
                            name="thuTu"
                        >
                            <InputNumber></InputNumber>
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