import { Col, Form, Input, Radio, Row, SelectProps, UploadFile } from "antd";
import { AntdButton, AntdModal, AntdSelect, AntdSpace } from "../.."
import { useState } from "react";
import { NEACGetCertificateResponse, NEACSignFile, NEACSignFileRequest, NEACUserCertificateResponse } from "@/features/neac/models";
import { neacService } from "@/features/neac/services";
import { useAppSelector } from "@/lib/redux/Hooks";
import {v4 as uuid} from 'uuid'
import { uploadFileToBase64 } from "@/utils/common";
import { toast } from "react-toastify";
import { ID_SEPARATE } from "@/data";

const NEAC_CA_OPTIONS : SelectProps['options'] = [
    {
        label: "Tập đoàn Bưu chính Viễn thông Việt Nam",
        value: "VNPT-CA"
    },
    {
        label: "Tập đoàn Công nghiệp - Viễn thông Quân đội",
        value: "Viettel-CA"
    },
    {
        label: "Công ty Cổ phần Công nghệ thẻ Nacencom",
        value: "CA2"
    },
    {
        label: "Công ty Cổ phần Bkav",
        value: "BkavCA"
    }, 
    {
        label: "Công ty TNHH Hệ thống thông tin FPT",
        value: "FPT-CA"
    },
    {
        label: "Công ty Cổ phần Công nghệ SAVIS",
        value: "TrustCA"
    },
    {
        label: "Công ty Cổ phần MISA",
        value: "MISA-CA"
    }
]

export const NeacModal = ({visible, setVisible, fileList} : {visible: boolean; setVisible: React.Dispatch<React.SetStateAction<boolean>>; fileList: string | undefined}) => {
    const [form] = Form.useForm<NEACSignFileRequest>()
    const [certificate, setCertificate] = useState<NEACGetCertificateResponse>()
    const {data: user} = useAppSelector(state => state.user)
    const handlerCancel = () => {
        form.resetFields()
        setCertificate(undefined)
        setVisible(false)
    }
    
    const onOk = async () => {
        const formData = await form.validateFields() as NEACSignFileRequest & {certificateData : string}
        if(!formData.certificateData){
            toast.warn("Vui lòng chọn tài khoản ký số")
            return;
        }
        const currentSelectCertificateData : NEACUserCertificateResponse = JSON.parse(formData.certificateData)
        if(!user){
            return;
        }
        if(fileList === undefined){
            toast.warn("Không tìm thấy tệp")
            return;
        }
        
        const signFiles: NEACSignFile[] = await Promise.all(fileList.split(ID_SEPARATE).map(async (filePath) => ({
            doc_id: uuid(),
            file_name: filePath.substring(filePath.lastIndexOf("/") + 1),
            file_base64: await uploadFileToBase64(filePath) as string
        })))
        const res = await neacService.SignFile({
            ca_name: formData.ca_name, 
            user_id: user?.id, 
            cert_data: currentSelectCertificateData.cert_data,
            serial_number: currentSelectCertificateData.serial_number,
            transaction_id: currentSelectCertificateData.transaction_id,
            sign_files: signFiles
        })
        
        if(res.status == 200) {
            toast.success("Ký số thành công")
            handlerCancel()
        }
    }

    const onGetCertificate = async () => {
        const ca_name = form.getFieldValue("ca_name")
        if(!user){
            return;
        }
        const res = await neacService.GetCertificates({user_id: user?.id, ca_name })
        if(res.status === 200) {
            setCertificate(res.data)
        }
    }

    return <AntdModal width={800} visible={visible} handlerCancel={handlerCancel} maskClosable={false} title={"Thông tin ký số"} 
        footer={
            <AntdSpace direction="horizontal">
                <AntdButton key={"1"} onClick={onOk}>Đồng ý</AntdButton>
                <AntdButton key={"2"} onClick={handlerCancel}>Đóng</AntdButton>
            </AntdSpace>
        }>
        <Form name="NEAC" layout="vertical" form={form} initialValues={{"ca_name": "VNPT-CA"}}>
            <Row>
                <Col span={24}>
                    <Form.Item name={"ca_name"} label="Nhà cung cấp">
                        <AntdSelect options={NEAC_CA_OPTIONS}/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name={"user_id"} label="Tài khoản ký số">
                        <AntdSpace.Compact style={{ width: '100%' }}>
                            <Input />
                            <AntdButton type="primary" onClick={onGetCertificate}>Lấy chứng thư số</AntdButton>
                        </AntdSpace.Compact>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name={"certificateData"} label="Tài khoản ký số">
                        <Radio.Group>
                            <AntdSpace direction="vertical">
                                {certificate?.data.user_certificates.map((cer, index) => {
                                    return <Radio value={JSON.stringify(cer)} key={index}>
                                        {cer.serial_number}
                                    </Radio>
                                })}
                            </AntdSpace>
                        </Radio.Group>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </AntdModal>
}