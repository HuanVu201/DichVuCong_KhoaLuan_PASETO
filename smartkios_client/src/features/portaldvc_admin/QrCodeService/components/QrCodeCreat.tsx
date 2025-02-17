import { Col, DatePicker, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { IQrCodeService } from "../Models"
import { useEffect, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { useQrCodeServiceContext } from "../context/QrCodeService"
import TextArea from "antd/es/input/TextArea"
import { v4 as uuidv4 } from 'uuid';
import { HOST_PATH } from "@/data"
import { toast } from "react-toastify"
import axiosInstance from "@/lib/axios"

const saveQrToDatabase = async (id: string, content: string) => {
    const requestBodyCreatQr = {
        id: id,
        content: content
    };

    try {
        const response = await axiosInstance.post(`${HOST_PATH}/api/v1/hosos/saveqrcodedata/${id}`, requestBodyCreatQr, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

export const QrCodeServiceCreat = () => {
    const dispatch = useAppDispatch()
    const QrCodeServiceContext = useQrCodeServiceContext()
    const guid = uuidv4();
    const valueQr: string = `${window.location.origin}/apiqr/qr?id=${guid}`

    const [form] = Form.useForm<IQrCodeService>()


    const onFinish = async () => {
        let check: boolean = true

        if (!form.getFieldValue('content')) {
            toast.warning('Nhập nội dung cho mã QR!')
            check = false
        }

        if (check) {
            await saveQrToDatabase(guid, form.getFieldValue('content'))

            const storedData = localStorage.getItem(QrCodeServiceContext.localStorageName);
            const parsedData = storedData ? JSON.parse(storedData) : [];
            const newValue = [...parsedData, {
                link: valueQr
            }];
            localStorage.setItem(QrCodeServiceContext.localStorageName, JSON.stringify(newValue));

            handleCancel()
            QrCodeServiceContext.setViewQrCodeService(true)
            QrCodeServiceContext.setUrlQrView(valueQr)
            QrCodeServiceContext.setReloadTable(!QrCodeServiceContext.reloadTable)
        }

    }
    const handleCancel = () => {
        form.resetFields();
        QrCodeServiceContext.setCreatQrCodeService(false)
    };


    return (
        <AntdModal title="Tạo mới mã QR" visible={QrCodeServiceContext.creatQrCodeService} handlerCancel={handleCancel} footer={null}>
            <Form name='qrCodeService' layout="vertical" onFinish={onFinish} form={form} >
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            label="Nội dung:"
                            name="content"
                        >
                            <TextArea />
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