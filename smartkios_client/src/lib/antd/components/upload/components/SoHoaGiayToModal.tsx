import { IGiayToSoHoa } from "@/features/giaytosohoa/models"
import { AddGiayToSoHoa } from "@/features/giaytosohoa/redux/action"
import { LOAISOHOA_OPTIONS } from "@/features/hoso/data/formData"
import { AntdButton, AntdModal } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useTiepNhanHoSoTrucTuyenContext } from "@/pages/dvc/tiepnhanhoso/tructuyen/contexts/TiepNhanHoSoContext"
import { Checkbox, CheckboxProps, Col, DatePicker, DatePickerProps, Form, Input, Row, Select, Space } from "antd"
import { toast } from "react-toastify"
import dayjs from 'dayjs'
import { AddGiayToSoHoaParams } from "@/features/giaytosohoa/services"
import { forwardRef, useImperativeHandle } from "react"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { GetHoSo } from "@/features/hoso/redux/action"
import { FORMAT_DATE } from "@/data"
import { SoHoaData } from "../RegularUpload"
import { FormInstance } from "antd/lib"
// import { setDinhKemSoHoa } from "@/features/hoso/redux/slice"

export type SoHoaKetQuaRef = {
    onSubmit: () => Promise<void>;
    setOCRData: (ocrData: string) => void;
    setData: (data: IGiayToSoHoa | undefined) => void;
}
export type SoHoaKetQuaProps = {
    soHoaData: SoHoaData | undefined;
    closePickKetQuaModal?: () => void;
    hideSubmitBtn: boolean;
    dinhKemSoHoa: string | undefined;
    dinhKem: string | undefined;
}

export const SoHoaGiayToModal = forwardRef<SoHoaKetQuaRef, SoHoaKetQuaProps>((props, ref) => {
        const [form] = Form.useForm<IGiayToSoHoa & { hoSoId: string }>()
        const dispatch = useAppDispatch()
        const thoiHanVinhVien = Form.useWatch("thoiHanVinhVien", form)
        const { loading } = useAppSelector(state => state.giaytosohoa)
        const buttonActionContext = useButtonActionContext()
        const { data: hoSo } = useAppSelector(state => state.hoso)

        const onOk = async () => {
            const formData = await form.validateFields() as IGiayToSoHoa & { hoSoId: string }
            const giayToSoHoa: AddGiayToSoHoaParams = {
                ...formData,
                loaiSoHoa: "1",
                hoSoId: buttonActionContext.selectedHoSos[0] as string,
                dinhKem: props.dinhKem,
                dinhKemSoHoa: props.dinhKemSoHoa,
                ma: hoSo?.soGiayToChuHoSo + "." + props.soHoaData?.maKetQua + "." + formData.soKyHieu,
                maGiayTo: props.soHoaData?.maKetQua, //?
                maDinhDanh: hoSo?.soGiayToChuHoSo,
                ten: props.soHoaData?.tenGiayTo,
                maHoSo: hoSo?.maHoSo,
                trichYeuKetQua: formData.trichYeuNoiDung,
            }
            var res = await dispatch(AddGiayToSoHoa(giayToSoHoa)).unwrap()
            if (res.succeeded) {
                toast.success("Số hóa thành công")
                // dispatch(setDinhKemSoHoa(props.dinhKemSoHoa))
                dispatch(GetHoSo({ id: buttonActionContext.selectedHoSos[0] as string, view: "capNhatKetQuaXuLyHoSo" }))
                props.closePickKetQuaModal ? props.closePickKetQuaModal() : null
            }
        }
        const setOCRData = (ocrData: string) => {
            form.setFieldValue("jsonOcr", ocrData)
        }

        const setData = (data: IGiayToSoHoa | undefined) => {
            if (data) {
                form.setFieldsValue(data)
            }
        }


        useImperativeHandle(ref, () => ({
            onSubmit: onOk,
            setOCRData,
            setData
        }), [])

        const onNgayBanHanhChange: DatePickerProps["onChange"] = (value) => {
            form.setFieldValue("thoiHanHieuLuc", dayjs(value).add(props.soHoaData?.thoiHanMacDinh || 6, props.soHoaData?.loaiThoiHan || "month" as any))
        }
        const onChangThoiHanVinhVien: CheckboxProps["onChange"] = (e) => {
            e.target.checked ? form.setFieldValue("thoiHanHieuLuc", undefined) : form.setFieldValue("thoiHanHieuLuc", dayjs(form.getFieldValue("ngayBanHanh")).add(props.soHoaData?.thoiHanMacDinh || 6, props.soHoaData?.loaiThoiHan || "month" as any))
        }

        return <Form form={form} name="ThongTinGiayToSoHoa" onFinish={onOk} layout="vertical" initialValues={{ loaiSoHoa: "Số hóa kết quả" }}>
            <Form.Item name="jsonOcr" hidden><Input /></Form.Item>
            <Form.Item name="trichYeuKetQua" hidden><Input /></Form.Item>
            <Row gutter={8}>
                <Col span={8}>
                    <Form.Item name="ngayBanHanh" label="Ngày ban hành" rules={[{ required: true, message: "Vui lòng nhập ngày ban hành" }]}>
                        <DatePicker format="DD-MM-YYYY" onChange={onNgayBanHanhChange} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="thoiHanHieuLuc" tooltip="Mặc định 6 tháng tính từ thời điểm số hóa" label="Ngày hết hiệu lực">
                        <DatePicker disabled={thoiHanVinhVien} format="DD-MM-YYYY" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="thoiHanVinhVien" label="Hiệu lực vĩnh viễn" valuePropName="checked">
                        <Checkbox onChange={onChangThoiHanVinhVien} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="soKyHieu" label="Số ký hiệu giấy tờ" rules={[{ required: true, message: "Vui lòng nhập số ký hiệu giấy tờ" }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="phamViHieuLuc" label="Phạm vi hiệu lực">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="coQuanBanHanh" label="Cơ quan ban hành">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="nguoiKy" label="Người ký">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="loaiSoHoa" label="Loại số hóa" >
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="trichYeuNoiDung" label="Trích yếu nội dung">
                        <Input.TextArea rows={2} />
                    </Form.Item>
                </Col>
            </Row>
            {props.hideSubmitBtn ? null : <Form.Item>
                <Row justify="end">
                    <Space size="large">
                        <AntdButton type="primary" htmlType="submit" >
                            Lưu số hóa
                        </AntdButton>
                    </Space>
                </Row>
            </Form.Item>}

        </Form>
    })