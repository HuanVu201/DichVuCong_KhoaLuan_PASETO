import { Checkbox, Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { ITrangThaiHoSo } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddTrangThaiHoSo, GetTrangThaiHoSo, UpdateTrangThaiHoSo } from "../redux/action"
import { useTrangThaiHoSoContext } from "../contexts/TrangThaiHoSoContext"

export const TrangThaiHoSoDetail = () => {
    const dispatch = useAppDispatch()
    const { data: TrangThaiHoSo, datas: TrangThaiHoSos } = useAppSelector(state => state.trangthaihoso)
    const TrangThaiHoSoContext = useTrangThaiHoSoContext()
    const [form] = Form.useForm<ITrangThaiHoSo>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (TrangThaiHoSoContext?.trangThaiHoSoId) {
            dispatch(UpdateTrangThaiHoSo({ id: TrangThaiHoSoContext.trangThaiHoSoId, data: { ...formData,} }))
        } else {
            dispatch(AddTrangThaiHoSo({ ...formData}))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        TrangThaiHoSoContext.setTrangThaiHoSoModalVisible(false)
        TrangThaiHoSoContext.setTrangThaiHoSoId(undefined)
    };
    useEffect(() => {
        if (TrangThaiHoSoContext.trangThaiHoSoId) {
            dispatch(GetTrangThaiHoSo(TrangThaiHoSoContext.trangThaiHoSoId))
        }
    }, [TrangThaiHoSoContext.trangThaiHoSoId])

    useEffect(() => {
        if (TrangThaiHoSo) {
            form.setFieldsValue({ ...TrangThaiHoSo})
        }
    }, [TrangThaiHoSo])

    // useEffect(() => {
    //     if (!loaiTrangThaiHoSos?.length && !loading) {
    //         dispatch(SearchLoaiTrangThaiHoSo({}))
    //     }
    // }, [])

    return (
        <AntdModal title="Thêm mới trạng thái hồ sơ" visible={TrangThaiHoSoContext.trangThaiHoSoModalVisible} handlerCancel={handleCancel} footer={null}>
        <Form name='TrangThaiHoSo' layout="vertical" onFinish={onFinish} form={form} requiredMark={TrangThaiHoSoContext.trangThaiHoSoId !== null} 
            initialValues={{ soLuongThuTuc: 0 }}>
            <Row gutter={[8, 8]}>
                <Col md={24} span={24}>
                    <Form.Item
                        label="Tên trạng thái hồ sơ"
                        name="ten"
                        hasFeedback
                        rules={[{ required: true, message: 'Vui lòng nhập tên trạng thái hồ sơ' }]}
                        
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Mã trạng thái hồ sơ"
                        name="ma"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Là trạng thái quy trình"
                        name="laTrangThaiQuyTrinh"
                        valuePropName="checked"
                    >
                        <Checkbox />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label="Mô tả"
                        name="moTa"
                    >
                        <Input.TextArea rows={5} />
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