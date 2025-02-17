import { Col, DatePicker, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { INgayNghi } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddNgayNghi, GetNgayNghi, SearchNgayNghi, UpdateNgayNghi } from "../redux/action"
import { useNgayNghiContext } from "../context/NgayNghiContext"
import { useSearchParams } from "react-router-dom"
import dayjs from 'dayjs'

export const NgayNghiDetail = () => {
    const dispatch = useAppDispatch()
    const { data: ngaynghi, datas: ngaynghis, loading } = useAppSelector(state => state.danhmucngaynghi)
    const ngayNghiContext = useNgayNghiContext()
    let [searchRouterParams] = useSearchParams();
    const [form] = Form.useForm<INgayNghi>()
    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (ngayNghiContext?.ngayNghiId) {
            dispatch(UpdateNgayNghi({ id: ngayNghiContext.ngayNghiId, data: { ...formData} },))
        } else {
            dispatch(AddNgayNghi({ ...formData }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        ngayNghiContext.setNgayNghiModalVisible(false)
        ngayNghiContext.setNgayNghiId(undefined)
    };
    useEffect(() => {
        if (ngayNghiContext.ngayNghiId) {
            dispatch(GetNgayNghi(ngayNghiContext.ngayNghiId))
        }
    }, [ngayNghiContext.ngayNghiId])

    useEffect(() => {
        if (ngaynghi) {
            form.setFieldsValue({ ...ngaynghi, date: ngaynghi.date ? dayjs(ngaynghi.date) : null, } as any)
        }
    }, [ngaynghi])

    useEffect(() => {
        if (!ngaynghis?.length && !loading) {
            dispatch(SearchNgayNghi({}))
        }
    }, [])

    return (
        <AntdModal title="Thêm mới ngày nghỉ" visible={ngayNghiContext.ngayNghiModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='ngaynghi' layout="vertical" onFinish={onFinish} form={form} requiredMark={ngayNghiContext.ngayNghiId === null} initialValues={{ thuTu: 1 }}>
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Ngày nghỉ"
                            name="date"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày nghỉ' }]}
                        >
                            <DatePicker />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mô tả"
                            name="description"
                            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
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