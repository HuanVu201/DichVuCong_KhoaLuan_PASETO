import { AntdModal } from "@/lib/antd/components"
import { useMenuKetQuaThuTucContext } from "../../contexts/MenuKetQuaThuTucContext"
import { useForm } from "antd/es/form/Form"
import { IGiayToSoHoa } from "@/features/giaytosohoa/models"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Checkbox, Col, DatePicker, Form, Input, Row, Typography } from "antd"
import { FORMAT_DATE_WITHOUT_TIME } from "@/data"
import ReactJson from "react-json-view";
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { useEffect, useState } from "react"
import { AddGiayToSoHoa, GetGiayToSoHoa, UpdateGiayToSoHoa } from "@/features/giaytosohoa/redux/action"
import dayjs from 'dayjs'
import { giayToSoHoaApi } from "@/features/giaytosohoa/services"
import { resetData } from "@/features/giaytosohoa/redux/slice"
import { toast } from "react-toastify"

export const GiayToSoHoaDetail = () => {
    const { data: giayToSoHoa } = useAppSelector(state => state.giaytosohoa)
    const [form] = useForm<IGiayToSoHoa>()
    const dispatch = useAppDispatch()
    const menuKetQuaThuTucContext = useMenuKetQuaThuTucContext()
    const dinhKem = Form.useWatch("dinhKem", form)
    const handlerCancel = () => {
        form.resetFields()
        dispatch(resetData)
        menuKetQuaThuTucContext.setGiayToSoHoaModalVisible(false)
        menuKetQuaThuTucContext.setGiayToSoHoaId(undefined)
    }

    const onOk = async () => {
        try {
            const formData = await form.validateFields()
            if(menuKetQuaThuTucContext.giayToSoHoaId) {
                await dispatch(UpdateGiayToSoHoa({id: menuKetQuaThuTucContext.giayToSoHoaId, data: formData}))
            } else {
                const res = await dispatch(AddGiayToSoHoa(formData)).unwrap()
                if(res.succeeded){
                    toast.success("Thêm mới thành công")
                }
            } 
            handlerCancel()
        } catch (error) {
            toast.error("Thao tác thất bại")
            console.error(error)
        }
        
    }

    useEffect(() => {
        if(menuKetQuaThuTucContext.giayToSoHoaId !== undefined) {
            dispatch(GetGiayToSoHoa({id: menuKetQuaThuTucContext.giayToSoHoaId}))
        }
    }, [menuKetQuaThuTucContext.giayToSoHoaId])

    useEffect(() => {
        if(giayToSoHoa){
            form.setFieldsValue({
                ...giayToSoHoa,
                thoiGianSoHoa: giayToSoHoa.thoiGianSoHoa ? dayjs(giayToSoHoa.thoiGianSoHoa) : undefined,
                ngayBanHanh: giayToSoHoa.ngayBanHanh ? dayjs(giayToSoHoa.ngayBanHanh) : undefined,
                thoiHanHieuLuc: giayToSoHoa.thoiHanHieuLuc ? dayjs(giayToSoHoa.thoiHanHieuLuc) : undefined,
            } as any)
        }
    }, [giayToSoHoa])

    return (
        <AntdModal visible={true} title={`${menuKetQuaThuTucContext.giayToSoHoaId ? 'CẬP NHẬT' : "THÊM"} GIẤY TỜ SỐ HÓA`} handlerCancel={handlerCancel} fullsizeScrollable onOk={onOk}>
            <Form name="GiayToSoHoaDetail" form={form} layout="vertical">
                <Row gutter={[8, 0]}>
                    <Col md={12} span={24}>
                        <Form.Item name="ten" label="Tên giấy tờ số hóa">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item name="ma" label="Mã giấy tờ số hóa">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item name="tenNguoiSoHoa" label="Người số hóa">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item name="thoiGianSoHoa" label="Ngày số hóa">
                            <DatePicker format={FORMAT_DATE_WITHOUT_TIME} />
                        </Form.Item>
                    </Col><Col md={12} span={24}>
                        <Form.Item name="thoiGianHieuLuc" label="Ngày hết hạn">
                            <DatePicker format={FORMAT_DATE_WITHOUT_TIME} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item name="ngayBanHanh" label="Ngày ban hành">
                            <DatePicker format={FORMAT_DATE_WITHOUT_TIME} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item name="phamViHieuLuc" label="Phạm vi hiệu lực">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item name="trichYeuNoiDung" label="Trích yếu nội dung">
                            <Input.TextArea />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item name="coQuanBanHanh" label="Cơ quan ban hành">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item name="nguoiKy" label="nguoiKy">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item name="loaiSoHoa" label="loaiSoHoa">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item name="dinhKem" label="Đính kèm">
                            <RegularUpload fieldName="dinhKem" folderName="" form={form} dinhKem={dinhKem} hideUpload={true} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item valuePropName="checked" name="thoiHanVinhVien" label="Giấy tờ vô thời hạn">
                            <Checkbox />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Typography.Title level={5}>Dữ liệu trích xuất</Typography.Title>
                        <ReactJson
                            src={
                                giayToSoHoa?.jsonOcr != undefined
                                    ? JSON.parse(giayToSoHoa.jsonOcr)
                                    : {}
                            }
                        />
                    </Col>
                </Row>
            </Form>
        </AntdModal>
    )
}