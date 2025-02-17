import { Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IDanhMucDiaBan } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddDanhMucDiaBan, GetDanhMucDiaBan, UpdateDanhMucDiaBan } from "../redux/action"
import { useDiaBanContext } from "../contexts/DiaBanContext"
import { resetData } from "@/features/danhmucdiaban/redux/slice"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"

const options = [
    { label: 'Có', value: true as any },
    { label: 'Không', value: false as any },
];

export const DiaBanDetail = () => {
    const dispatch = useAppDispatch()
    const { data: diaBan } = useAppSelector(state => state.danhmucdiaban)
    const diaBanContext = useDiaBanContext()
    const [form] = Form.useForm<IDanhMucDiaBan>()
    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (diaBanContext?.DiaBanId) {
            dispatch(UpdateDanhMucDiaBan({ id: diaBanContext.DiaBanId, data: { ...formData, } }))
        } else {
            dispatch(AddDanhMucDiaBan({ ...formData, }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        diaBanContext.setDiaBanModalVisible(false)
        diaBanContext.setDiaBanId(undefined)
    };
    useEffect(() => {
        if (diaBanContext.DiaBanId) {
            dispatch(GetDanhMucDiaBan(diaBanContext.DiaBanId))
        }
    }, [diaBanContext.DiaBanId])

    useEffect(() => {
        if (diaBan) {
            form.setFieldsValue({ ...diaBan })
        }
    }, [diaBan])

    return (
        <AntdModal title={diaBanContext.DiaBanId ? 'Thông tin chi tiết địa bàn' : 'Thêm mới địa bàn'} visible={true} handlerCancel={handleCancel} footer={null}>
            <Form name='donvi' layout="vertical" onFinish={onFinish} form={form} requiredMark={diaBanContext.DiaBanId !== null}>
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tên địa bàn"
                            name="tenDiaBan"
                            rules={[{ required: true, message: 'Vui lòng nhập tên địa bàn' }]}
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã địa bàn"
                            name="maDiaBan"
                            rules={[{ required: true, message: 'Vui lòng nhập mã địa bàn' }]}
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Thứ tự hiển thị"
                            name="thuTu"
                        >
                            <InputNumber />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Sử dụng"
                            name="active"
                        >
                            <AntdSelect options={options}></AntdSelect>
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