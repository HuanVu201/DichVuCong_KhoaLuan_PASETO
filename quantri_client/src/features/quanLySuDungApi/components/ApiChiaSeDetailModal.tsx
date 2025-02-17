import { Checkbox, Col, Form, Input, InputNumber, Row, Select, SelectProps, Space, Spin, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useEffect, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad, AntdUploadPublicFile } from "../../../lib/antd/components"
import { resetData } from "@/features/quanlymauphoi/redux/slice"
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { toast } from "react-toastify"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { IApiChiaSe } from "../models"
import { useQuanLySuDungAPIContext } from "../contexts"
import { ApiChiaSe } from "../services"
import { LoadingOutlined } from "@ant-design/icons"

export const ApiChiaSeDetail = () => {
    const dispatch = useAppDispatch()
    const apiChiaSeContext = useQuanLySuDungAPIContext();
    const [form] = Form.useForm<IApiChiaSe>()
    const [data, setData] = useState<IApiChiaSe>()
    const [loading, setLoading] = useState<boolean>(false)

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        console.log(formData)
        if (formData) {
            (async () => {
                setLoading(true)
                const res = await ApiChiaSe.UpdateApiChiaSe({
                    id: apiChiaSeContext.apiId,
                    data: {
                        ...formData
                    }
                })
                if (res.status == 200) {
                    toast.success("Cập nhật thành công")
                    apiChiaSeContext.setReload(!apiChiaSeContext.reload)
                    handleCancel()
                } else {
                    toast.error('Cập nhật thất bại')
                }
                setLoading(false)
            })()
        }
    }
    const handleCancel = () => {
        form.resetFields();
        apiChiaSeContext.setApiId(undefined)
        apiChiaSeContext.setApiDetailModalVisible(false)

    };
    useEffect(() => {
        if (apiChiaSeContext.apiId && apiChiaSeContext.apiDetailModalVisible) {
            (async () => {
                const res = await ApiChiaSe.Get(apiChiaSeContext.apiId || '')
                if (res) {
                    setData(res.data.data)
                } else {
                    toast.error('Lỗi lấy thông tin!')
                }
            })()
        }
    }, [apiChiaSeContext.apiId, apiChiaSeContext.apiDetailModalVisible])

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                ...data,

            })
        }
    }, [data])


    return (
        <AntdModal title={"Thông tin API"} visible={apiChiaSeContext.apiDetailModalVisible} handlerCancel={handleCancel} width={780}
            footer={[
                <Space >
                    <AntdButton type="primary" onClick={onFinish}>
                        Xác nhận
                    </AntdButton>
                    <AntdButton type="default" onClick={handleCancel}>
                        Đóng
                    </AntdButton>
                </Space>
            ]}
        >
            <Spin spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <Form name='MauPhoi' layout="vertical" onFinish={onFinish} form={form}
                    initialValues={{ uuTien: 1 }}>
                    <Row gutter={[8, 8]}>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Mã API chia sẻ"
                                name="maApiChiaSe"
                            >
                                <Input disabled/>
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Tên"
                                name="tenApiChiaSe"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col md={20} span={24}>
                            <Form.Item
                                label="Đường dẫn"
                                name="duongDan"
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col md={4} span={24}>
                            <Form.Item
                                label="Giới hạn"
                                name="gioiHan"

                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col md={24} span={24}>
                            <Form.Item
                                label="Nội dung"
                                name="noiDung"
                            >
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </Spin>
        </AntdModal>
    )
}