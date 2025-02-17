import { FORMAT_DATE_WITHOUT_TIME } from "@/data"
import { IUser } from "@/features/user/models"
import { AntdModal } from "@/lib/antd/components"
import { Col, DatePicker, Form, Input, Row } from "antd"
import { useEffect, useState } from "react"
import { socket } from "@/lib/socketio";
import { IUserKiosk } from "../models"
import dayjs from 'dayjs'

export const UserKioskModal = ({handlerClose, userData}: {userData: IUserKiosk["data"] | undefined; handlerClose: () => void}) => {
    const [form] = Form.useForm<IUser>()
    const handlerCancel = () => {
        handlerClose();
    }
    useEffect(() => {
        if(userData){
            form.setFieldsValue({
                soDinhDanh: userData.idCode,
                soCMND: userData.oldIdCode,
                fullName: userData.personName,
                ngayThangNamSinh: userData.dateOfBirth ? dayjs(userData.dateOfBirth) : undefined,
                gioiTinh: userData.gender,
                quocTich: userData.nationality,
                danToc: userData.race,
                tonGiao: userData.religion,
                queQuan: userData.originPlace,
                thuongTru: userData.residencePlace,
                nhanDang: userData.personalIdentification,
                ngayCap: userData.issueDate ? dayjs(userData.issueDate) : undefined,
                ngayHetHan: userData.expiryDate ? dayjs(userData.expiryDate) : undefined,
                cha: userData.fatherName,
                me: userData.motherName,
                voChong: userData.wifeName,
            } as any)
        }
    }, [userData])
    
    const onOk = async () => {
        const formData = await form.validateFields() as IUser
    }
    
    return <AntdModal visible={true} title="THÔNG TIN NGƯỜI DÙNG" handlerCancel={handlerCancel} onOk={onOk} cancelText="Đóng" fullsizeScrollable bodyStyle={{padding:"16px 50px"}}>
        {JSON.stringify(userData)}
        <Form name="ThongTinNguoiDung" form={form} layout="vertical" >
            <Row gutter={[8,0]}>
                <Col span={24} md={12}>
                    <Form.Item name="soDinhDanh" label="Số CCCD">
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={24} md={12}>
                    <Form.Item name="soCMND" label="Số CMND">
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={24} md={12}>
                    {/* chua co column */}
                    <Form.Item name="ngayCap" label="Ngày cấp">
                        <DatePicker format={FORMAT_DATE_WITHOUT_TIME}/>
                    </Form.Item>
                </Col>
                <Col span={24} md={12}>
                    {/* chua co column */}
                    <Form.Item name="ngayHetHan" label="Ngày hết hạn">
                        <DatePicker format={FORMAT_DATE_WITHOUT_TIME}/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="fullName" label="Họ và tên">
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={24} md={8}>
                    {/* formatlai */}
                    <Form.Item name="ngayThangNamSinh" label="Ngày sinh">
                        <DatePicker format={FORMAT_DATE_WITHOUT_TIME}/>
                    </Form.Item>
                </Col>
                <Col span={24} md={8}>
                    {/* format lai */}
                    <Form.Item name="quocTich" label="Quốc tịch">
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={24} md={8}>
                    {/* format lai */}
                    <Form.Item name="gioiTinh" label="Giới tính">
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={24} md={12}>
                    {/* format lai */}
                    <Form.Item name="danToc" label="Dân tộc">
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={24} md={12}>
                    {/* format lai */}
                    <Form.Item name="tonGiao" label="Tôn giáo">
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={24} md={8}>
                    {/* format lai, khong co cccd, ...*/}
                    <Form.Item name="cha" label="Tên bố">
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={24} md={8}>
                    {/* format lai, khong co cccd, ...*/}
                    <Form.Item name="me" label="Tên mẹ">
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={24} md={8}>
                    {/* format lai, khong co cccd, ...*/}
                    <Form.Item name="voChong" label="Vợ/Chồng">
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    {/* chua co column */}
                    <Form.Item name="nhanDang" label="Nhận dạng">
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    {/* format lai, khong co ma tinh, quan, xa ...*/}
                    <Form.Item name="queQuan" label="Quê quán">
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    {/* format lai, khong co ma tinh, quan, xa ...*/}
                    <Form.Item name="thuongTru" label="Thường trú">
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </AntdModal>
}