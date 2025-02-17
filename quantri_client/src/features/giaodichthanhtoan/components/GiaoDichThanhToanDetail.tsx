import { Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IGiaoDichThanhToan } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddGiaoDichThanhToan, GetGiaoDichThanhToan, UpdateGiaoDichThanhToan } from "../redux/action"
import { useGiaoDichThanhToanContext } from "../contexts/GiaoDichThanhToanContext"
import { resetData } from "@/features/linhvuc/redux/slice"

export const GiaoDichThanhToanDetail = () => {
    const dispatch = useAppDispatch()
    const { data: giaoDichThanhToan, datas: giaoDichThanhToans } = useAppSelector(state => state.linhvuc)
    const giaoDichThanhToanContext = useGiaoDichThanhToanContext()
    const [form] = Form.useForm<IGiaoDichThanhToan>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (giaoDichThanhToanContext?.giaoDichThanhToanId && giaoDichThanhToanContext?.giaoDichThanhToanId.length > 0) {
            dispatch(UpdateGiaoDichThanhToan({ id: giaoDichThanhToanContext.giaoDichThanhToanId[0].toString(), data: { ...formData, } }))
        } else {
            dispatch(AddGiaoDichThanhToan({ ...formData }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        giaoDichThanhToanContext.setGiaoDichThanhToanModalVisible(false)
        giaoDichThanhToanContext.setGiaoDichThanhToanId([])
    };
    useEffect(() => {
        if (giaoDichThanhToanContext?.giaoDichThanhToanId && giaoDichThanhToanContext?.giaoDichThanhToanId.length > 0) {
            dispatch(GetGiaoDichThanhToan(giaoDichThanhToanContext.giaoDichThanhToanId[0].toString()))
        }
    }, [giaoDichThanhToanContext.giaoDichThanhToanId])

    useEffect(() => {
        if (giaoDichThanhToan) {
            form.setFieldsValue({ ...giaoDichThanhToan })
        }
    }, [giaoDichThanhToan])

    // useEffect(() => {
    //     if (!loaiGiaoDichThanhToans?.length && !loading) {
    //         dispatch(SearchLoaiGiaoDichThanhToan({}))
    //     }
    // }, [])

    return (
        <AntdModal title="Thêm mới lĩnh vực" visible={giaoDichThanhToanContext.giaoDichThanhToanModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='GiaoDichThanhToan' layout="vertical" onFinish={onFinish} form={form} requiredMark={giaoDichThanhToanContext.giaoDichThanhToanId !== null}
                initialValues={{ soLuongThuTuc: 0, soLuongThuTucCapTinh: 0, soLuongThuTucCapHuyen: 0, soLuongThuTucCapXa: 0 }}>
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            label="Tên lĩnh vực"
                            name="ten"
                            rules={[{ required: true, message: 'Vui lòng nhập tên lĩnh vực' }]}

                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã lĩnh vực"
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
                            name="soLuongThuTuc"
                        >
                            <InputNumber min={0} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Số lượng thủ tục cấp tỉnh"
                            name="soLuongThuTucCapTinh"
                        >
                            <InputNumber min={0} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Số lượng thủ tục cấp huyện"
                            name="soLuongThuTucCapHuyen"
                        >
                            <InputNumber min={0} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Số lượng thủ tục cấp xã"
                            name="soLuongThuTucCapXa"
                        >
                            <InputNumber min={0} />
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