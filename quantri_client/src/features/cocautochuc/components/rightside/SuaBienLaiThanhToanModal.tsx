import { Checkbox, Col, Form, Input, InputNumber, Row, Select, SelectProps, Space, Spin, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad, AntdUploadPublicFile } from "@/lib/antd/components"
import { resetData } from "@/features/quanlymauphoi/redux/slice"
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { toast } from "react-toastify"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { LoadingOutlined } from "@ant-design/icons"
import { useCoCauModalContext } from "../../contexts/CoCauModalContext"
import { ICauHinhBienLaiThanhToan } from "../../models"



export const SuaBienLaiThanhToanModal = () => {
    const dispatch = useAppDispatch()
    const [form] = Form.useForm<ICauHinhBienLaiThanhToan>()
    const [data, setData] = useState<ICauHinhBienLaiThanhToan>()
    const [loading, setLoading] = useState<boolean>(false)
    const coCauToChucContext = useCoCauModalContext()

    const onFinish = () => {
        const jsonString = `{` +
            `ADMINACCOUNT: "${form.getFieldValue('ADMINACCOUNT') || ''}",` +
            `ADMINPASS: "${form.getFieldValue('ADMINPASS') || ''}",` +
            `SERVICEACCOUNT:"${form.getFieldValue('SERVICEACCOUNT') || ''}",` +
            `SERVICEPASS: "${form.getFieldValue('SERVICEPASS') || ''}",` +
            `PUBLISHSERVICE: "${form.getFieldValue('PUBLISHSERVICE') || ''}",` +
            `PORTALSERVICE: "${form.getFieldValue('PORTALSERVICE') || ''}",` +
            `BUSINESSSERVICE: "${form.getFieldValue('BUSINESSSERVICE') || ''}",` +
            `SERIAL: "${form.getFieldValue('SERIAL') || ''}",` +
            `PATTERN: "${form.getFieldValue('PATTERN') || ''}"` +
            `}`
        coCauToChucContext.setJsonBienLai(jsonString)

        handleCancel()
    };
    const handleCancel = () => {
        form.resetFields();
        coCauToChucContext.setConfigBienLaiModalVisible(false)

    };


    useEffect(() => {
        if (coCauToChucContext.jsonBienLai && coCauToChucContext.configBienLaiModalVisible) {
            try {
                console.log(coCauToChucContext.jsonBienLai)
                let configString = coCauToChucContext.jsonBienLai;
                configString = configString.replace(/([{,])(\w+):/g, '$1"$2":');
                configString = configString.replace(/'/g, '"');
                const configObject = JSON.parse(configString);

                form.setFieldsValue({
                    ...configObject,
                });
            } catch (error) {
                toast.error('Lỗi phân tích chuỗi JSON')
                console.error("Lỗi khi phân tích chuỗi JSON:", error);
            }

        }
    }, [coCauToChucContext.jsonBienLai, coCauToChucContext.configBienLaiModalVisible])


    return (
        <AntdModal title={"Cấu hình biên lai thanh toán"} visible={coCauToChucContext.configBienLaiModalVisible} handlerCancel={handleCancel} width={800}
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
                <Form name='cauHinhBienLaiThanhToan' layout="vertical" onFinish={onFinish} form={form}
                    initialValues={{ uuTien: 1 }}>
                    <Row gutter={[8, 8]}>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="ADMINACCOUNT"
                                name="ADMINACCOUNT"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="ADMINPASS"
                                name="ADMINPASS"
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col md={12} span={24}>
                            <Form.Item
                                label="SERVICEACCOUNT"
                                name="SERVICEACCOUNT"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="SERVICEPASS"
                                name="SERVICEPASS"
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col md={24} span={24}>
                            <Form.Item
                                label="PUBLISHSERVICE"
                                name="PUBLISHSERVICE"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col md={24} span={24}>
                            <Form.Item
                                label="PORTALSERVICE"
                                name="PORTALSERVICE"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col md={24} span={24}>
                            <Form.Item
                                label="BUSINESSSERVICE"
                                name="BUSINESSSERVICE"
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col md={12} span={24}>
                            <Form.Item
                                label="SERIAL"
                                name="SERIAL"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="PATTERN"
                                name="PATTERN"
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                    </Row>

                </Form>
            </Spin>
        </AntdModal>
    )
}