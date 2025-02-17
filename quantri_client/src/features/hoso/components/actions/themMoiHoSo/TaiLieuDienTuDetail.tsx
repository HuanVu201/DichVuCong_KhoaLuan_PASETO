import { AntdModal } from "@/lib/antd/components"
import { useForm } from "antd/es/form/Form"
import { IGiayToSoHoa } from "@/features/giaytosohoa/models"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Checkbox, Col, DatePicker, Form, Input, Row, Typography } from "antd"
import { FORMAT_DATE_WITHOUT_TIME } from "@/data"
import ReactJson from "react-json-view";
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { useEffect, useState } from "react"
import { GetGiayToSoHoa, UpdateGiayToSoHoa } from "@/features/giaytosohoa/redux/action"
import dayjs from 'dayjs'
import { giayToSoHoaApi } from "@/features/giaytosohoa/services"
import { resetData } from "@/features/giaytosohoa/redux/slice"
import { toast } from "react-toastify"
import { useTaiLieuDienTuContext } from "../../../../portaldvc/HoSoCaNhan/context/TaiLieuDienTu/TaiLieuDienTuContext"
import { LOAIKETQUA_GIAYTOSOHOA_FROM_CODE } from "@/features/giaytosohoa/data/format"

export const TaiLieuDienTuDetail = ({ id, setId, visibleModal, setVisibleModal }: { id: string | undefined, setId: React.Dispatch<React.SetStateAction<string | undefined>>, visibleModal: boolean, setVisibleModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { data: giayToSoHoa } = useAppSelector(state => state.giaytosohoa)
    const [form] = useForm<IGiayToSoHoa>()
    const dispatch = useAppDispatch()
    const dinhKem = Form.useWatch("dinhKem", form)
    const handlerCancel = () => {
        form.resetFields()
        dispatch(resetData)
        setId(undefined)
        setVisibleModal(false)
    }

    const onOk = async () => {
        handlerCancel()
    }

    useEffect(() => {
        if (id !== undefined) {
            dispatch(GetGiayToSoHoa({ id: id }))
        }
    }, [id])

    useEffect(() => {
        if (giayToSoHoa) {
            form.setFieldsValue({
                ...giayToSoHoa,
                thoiGianSoHoa: giayToSoHoa.thoiGianSoHoa ? dayjs(giayToSoHoa.thoiGianSoHoa) : undefined,
                ngayBanHanh: giayToSoHoa.ngayBanHanh ? dayjs(giayToSoHoa.ngayBanHanh) : undefined,
                thoiHanHieuLuc: giayToSoHoa.thoiHanHieuLuc ? dayjs(giayToSoHoa.thoiHanHieuLuc) : undefined,
                loaiSoHoa: giayToSoHoa.loaiSoHoa == "1" || giayToSoHoa.loaiSoHoa == "0" ? (LOAIKETQUA_GIAYTOSOHOA_FROM_CODE as any)[giayToSoHoa.loaiSoHoa] : giayToSoHoa.loaiSoHoa
            } as any)
        }
    }, [giayToSoHoa])

    return (
        <AntdModal visible={true} title={"Chi tiết giấy tờ số hóa"} handlerCancel={handlerCancel} fullsizeScrollable onOk={onOk}>
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