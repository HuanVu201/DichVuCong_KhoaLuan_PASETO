import { FORMAT_DATE_WITHOUT_TIME } from "@/data"
import { IUser } from "@/features/user/models"
import { AntdButton, AntdModal } from "@/lib/antd/components"
import { Col, DatePicker, Form, Input, Row } from "antd"
import { useEffect, useState } from "react"
import { socket } from "@/lib/socketio";
import { IUserKiosk } from "../models"
import dayjs from 'dayjs'
import { useAppSelector } from "@/lib/redux/Hooks"

export const UserKioskModal = ({ handlerClose }: { handlerClose: () => void }) => {
    const [form] = Form.useForm<IUser>()
    const { userKiosk } = useAppSelector(state => state.user)

    const handlerCancel = () => {
        handlerClose();
    }
    useEffect(() => {
        if (userKiosk) {
            form.setFieldsValue({
                soDinhDanh: userKiosk.idCode,
                soCMND: userKiosk.oldIdCode,
                fullName: userKiosk.personName,
                ngayThangNamSinh: userKiosk.dateOfBirth,
                gioiTinh: userKiosk.gender,
                quocTich: userKiosk.nationality,
                danToc: userKiosk.race,
                tonGiao: userKiosk.religion,
                queQuan: userKiosk.originPlace,
                thuongTru: userKiosk.residencePlace,
                nhanDang: userKiosk.personalIdentification,
                ngayCap: userKiosk.issueDate,
                ngayHetHan: userKiosk.expiryDate,
                cha: userKiosk.fatherName,
                me: userKiosk.motherName,
                voChong: userKiosk.wifeName,
            } as any)
        }
    }, [userKiosk])




    const onOk = async () => {
        const formData = await form.validateFields() as IUser
    }

    return <AntdModal visible={true} title="THÔNG TIN NGƯỜI DÙNG" footer={null} handlerCancel={handlerCancel} onOk={onOk} cancelText="Đóng" fullsizeScrollable bodyStyle={{ padding: "16px 50px" }}>
        {/* {JSON.stringify(userKiosk)} */}
        <Form name="ThongTinNguoiDung" form={form} layout="vertical" >
            <Row gutter={[8, 0]}>
                <Col span={24} md={12}>
                    <Form.Item name="soDinhDanh" label="Số CCCD">
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col span={24} md={12}>
                    <Form.Item name="SoCMND" label="Số CMND">
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col span={24} md={12}>
                    {/* chua co column */}
                    <Form.Item name="ngayCap" label="Ngày cấp">
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col span={24} md={12}>
                    {/* chua co column */}
                    <Form.Item name="ngayHetHan" label="Ngày hết hạn">
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="fullName" label="Họ và tên">
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col span={24} md={8}>
                    {/* formatlai */}
                    <Form.Item name="ngayThangNamSinh" label="Ngày sinh">
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col span={24} md={8}>
                    {/* format lai */}
                    <Form.Item name="quocTich" label="Quốc tịch">
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col span={24} md={8}>
                    {/* format lai */}
                    <Form.Item name="gioiTinh" label="Giới tính">
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col span={24} md={12}>
                    {/* format lai */}
                    <Form.Item name="danToc" label="Dân tộc">
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col span={24} md={12}>
                    {/* format lai */}
                    <Form.Item name="tonGiao" label="Tôn giáo">
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col span={24} md={8}>
                    {/* format lai, khong co cccd, ...*/}
                    <Form.Item name="cha" label="Tên bố">
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col span={24} md={8}>
                    {/* format lai, khong co cccd, ...*/}
                    <Form.Item name="me" label="Tên mẹ">
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col span={24} md={8}>
                    {/* format lai, khong co cccd, ...*/}
                    <Form.Item name="voChong" label="Vợ/Chồng">
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    {/* chua co column */}
                    <Form.Item name="nhanDang" label="Nhận dạng">
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    {/* format lai, khong co ma tinh, quan, xa ...*/}
                    <Form.Item name="queQuan" label="Quê quán">
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    {/* format lai, khong co ma tinh, quan, xa ...*/}
                    <Form.Item name="thuongTru" label="Thường trú">
                        <Input disabled />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <div >
                    <AntdButton type="primary" onClick={handlerCancel}>
                        Xác nhận
                    </AntdButton>
                </div>
            </Form.Item>
        </Form>
    </AntdModal>
}