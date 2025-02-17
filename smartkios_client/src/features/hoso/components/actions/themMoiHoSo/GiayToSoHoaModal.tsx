import { IGiayToSoHoa } from "@/features/giaytosohoa/models"
import { AddGiayToSoHoa } from "@/features/giaytosohoa/redux/action"
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"
import { LOAISOHOA_OPTIONS } from "@/features/hoso/data/formData"
import { AntdModal } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { InfoCircleOutlined } from "@ant-design/icons"
import { Checkbox, CheckboxProps, Col, DatePicker, Form, Input, Row, Select } from "antd"
import dayjs from 'dayjs'
import { IThanhPhanThuTucWithSoHoa } from "./TepDinhKem"
import { toast } from "react-toastify"
import { AddGiayToSoHoaParams } from "@/features/giaytosohoa/services"
import { DatePickerProps } from "antd/lib"
import { useEffect, useState } from "react"

export const GiayToSoHoaModal = () => {
    const [form] = Form.useForm<IGiayToSoHoa>()
    const dispatch = useAppDispatch()
    const thoiHanVinhVien = Form.useWatch("thoiHanVinhVien", form)
    const {loading} = useAppSelector(state => state.giaytosohoa)
    const [loaiSoHoas, setLoaiSoHoas] = useState(LOAISOHOA_OPTIONS)
    const {data: hoSo} = useAppSelector(state => state.hoso)
    const tiepNhanHoSoContext = useTiepNhanHoSoContext()

    useEffect(() => {
        if(tiepNhanHoSoContext.soHoaData){
            form.setFieldValue("loaiSoHoa", tiepNhanHoSoContext.soHoaData?.loaiSoHoa)
            setLoaiSoHoas((curr) => curr?.filter(x => x.value == tiepNhanHoSoContext.soHoaData?.loaiSoHoa))
        }
    }, [tiepNhanHoSoContext.soHoaData])

    const handleCancel = () => {
        tiepNhanHoSoContext.setGiayToSoHoaModalVisible(false)
        tiepNhanHoSoContext.setSoHoaData(undefined)
    }
    const onOk = async () => {
        const formData = await form.validateFields() as IGiayToSoHoa
        
        const giayToSoHoa: AddGiayToSoHoaParams = {...formData, ...tiepNhanHoSoContext.soHoaData, maHoSo: hoSo?.maHoSo}
        var res = await dispatch(AddGiayToSoHoa(giayToSoHoa)).unwrap()
        if(res.succeeded){
            toast.success("Số hóa thành công")
            tiepNhanHoSoContext.soHoaData?.onOk(res.data)// api trả về mã giấy tờ số hóa
        }
        handleCancel()
    }

   

    const onNgayBanHanhChange: DatePickerProps["onChange"] = (value) => {
        form.setFieldValue("thoiHanHieuLuc",  dayjs(value).add(6, 'month'))
    }

    const onChangThoiHanVinhVien: CheckboxProps["onChange"] = (e) => {
        e.target.checked ? form.setFieldValue("thoiHanHieuLuc",  undefined) : form.setFieldValue("thoiHanHieuLuc",  dayjs(form.getFieldValue("ngayBanHanh")).add(6, 'month'))
    }

    return <AntdModal confirmLoading={loading} title="Thông tin số hóa" visible={true} onOk={onOk} handlerCancel={handleCancel} okText="Số hóa">
        <Form form={form} name="ThongTinGiayToSoHoa" layout="vertical" initialValues={{thoiHanHieuLuc: dayjs().add(6, 'month'), ngayBanHanh:dayjs()}}>
            <Row gutter={8}>
            <Col span={8}>
                    <Form.Item name="ngayBanHanh" label="Ngày ban hành" rules={[{required: true, message:"Vui lòng nhập số ký hiệu giấy tờ"}]}>
                        <DatePicker format="DD-MM-YYYY" onChange={onNgayBanHanhChange}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="thoiHanHieuLuc" tooltip="Mặc định 6 tháng tính từ thời điểm số hóa" label="Ngày hết hiệu lực">
                        <DatePicker disabled={thoiHanVinhVien} format="DD-MM-YYYY" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="thoiHanVinhVien" label="Hiệu lực vĩnh viễn" valuePropName="checked">
                        <Checkbox onChange={onChangThoiHanVinhVien}/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="soKyHieu" label="Số ký hiệu giấy tờ" rules={[{required: true, message:"Vui lòng nhập số ký hiệu giấy tờ"}]}>
                        <Input/>
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
                    <Form.Item name="loaiSoHoa" label="Loại số hóa">
                        <Select options={loaiSoHoas}/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="trichYeuNoiDung" label="Trích yếu nội dung">
                        <Input.TextArea rows={2} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </AntdModal>
}