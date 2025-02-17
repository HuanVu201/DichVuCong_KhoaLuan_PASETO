import { AntdButton, AntdModal } from "@/lib/antd/components"
import { useForm } from "antd/es/form/Form"
import { IGiayToSoHoa } from "@/features/giaytosohoa/models"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Checkbox, Col, DatePicker, Form, Input, Row, Space, Typography } from "antd"
import { FORMAT_DATE_WITHOUT_TIME } from "@/data"
import ReactJson from "react-json-view";
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { useEffect, useState } from "react"
import dayjs from 'dayjs'
import { giayToSoHoaApi } from "@/features/giaytosohoa/services"
import { resetData } from "@/features/giaytosohoa/redux/slice"
import { toast } from "react-toastify"
import { LOAIKETQUA_GIAYTOSOHOA_FROM_CODE } from "@/features/giaytosohoa/data/format"
import { useKhoTaiLieuDienTuManagerContext } from "../../contexts/KhoTaiLieuDienTuManagerContext"

export const TaiLieuDienTuTrongKhoDetailManager = () => {
    const khoTaiLieuDienTuContext = useKhoTaiLieuDienTuManagerContext()
    const [form] = useForm<IGiayToSoHoa>()
    const dinhKem = Form.useWatch("dinhKem", form)
    const handlerCancel = () => {
        form.resetFields()
        khoTaiLieuDienTuContext.setGiayToSoHoaItem(undefined)
        khoTaiLieuDienTuContext.setTaiLieuDetailModalVisible(false)
    }

    useEffect(() => {
        if (khoTaiLieuDienTuContext.giayToSoHoaItem) {
            form.setFieldsValue({
                ...khoTaiLieuDienTuContext.giayToSoHoaItem,
                thoiGianSoHoa: khoTaiLieuDienTuContext.giayToSoHoaItem?.thoiGianSoHoa ? dayjs(khoTaiLieuDienTuContext.giayToSoHoaItem.thoiGianSoHoa) : undefined,
                ngayBanHanh: khoTaiLieuDienTuContext.giayToSoHoaItem?.ngayBanHanh ? dayjs(khoTaiLieuDienTuContext.giayToSoHoaItem.ngayBanHanh) : undefined,
                thoiHanHieuLuc: khoTaiLieuDienTuContext.giayToSoHoaItem?.thoiHanHieuLuc ? dayjs(khoTaiLieuDienTuContext.giayToSoHoaItem.thoiHanHieuLuc) : undefined,
                loaiSoHoa: khoTaiLieuDienTuContext.giayToSoHoaItem?.loaiSoHoa == "1" || khoTaiLieuDienTuContext.giayToSoHoaItem?.loaiSoHoa == "0" ? (LOAIKETQUA_GIAYTOSOHOA_FROM_CODE as any)[khoTaiLieuDienTuContext.giayToSoHoaItem.loaiSoHoa] : khoTaiLieuDienTuContext.giayToSoHoaItem?.loaiSoHoa
            } as any)
        }
    }, [khoTaiLieuDienTuContext.giayToSoHoaItem])

    return (
        <AntdModal visible={khoTaiLieuDienTuContext.taiLieuDetailModalVisible} title={"Chi tiết giấy tờ số hóa"} handlerCancel={handlerCancel} fullsizeScrollable
            footer={[
                <Space >
                    <AntdButton type="default" onClick={handlerCancel}>
                        Đóng
                    </AntdButton>
                </Space>
            ]}
        >
            <Form disabled name="GiayToSoHoaDetail" form={form} layout="vertical">
                <Row gutter={[8, 8]}>
                    <Col md={6} span={24}>
                        <Form.Item name="thoiGianSoHoa" label="Ngày số hóa">
                            <DatePicker style={{ width: '200px' }} format={FORMAT_DATE_WITHOUT_TIME} />
                        </Form.Item>
                    </Col><Col md={6} span={24}>
                        <Form.Item name="thoiHanHieuLuc" label="Ngày hết hạn">
                            <DatePicker style={{ width: '200px' }} format={FORMAT_DATE_WITHOUT_TIME} />
                        </Form.Item>
                    </Col>
                    <Col md={6} span={24}>
                        <Form.Item name="ngayBanHanh" label="Ngày ban hành">
                            <DatePicker style={{ width: '200px' }} format={FORMAT_DATE_WITHOUT_TIME} />
                        </Form.Item>
                    </Col>
                    <Col md={6} span={24}>
                        <Form.Item name="dinhKem" label="Đính kèm">
                            <RegularUpload fieldName="dinhKem" folderName="" form={form} dinhKem={dinhKem} hideUpload={true} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="ten" label="Tên giấy tờ số hóa">
                            <Input.TextArea />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item name="ma" label="Mã giấy tờ số hóa">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item name="fullName" label="Người số hóa">
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col md={12} span={24}>
                        <Form.Item name="phamViHieuLuc" label="Phạm vi hiệu lực">
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col md={12} span={24}>
                        <Form.Item name="coQuanBanHanh" label="Cơ quan ban hành">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item name="nguoiKy" label="Người ký">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item name="loaiSoHoa" label="Loại số hóa">
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item name="trichYeuNoiDung" label="Trích yếu nội dung">
                            <Input.TextArea />
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        </AntdModal>
    )
}