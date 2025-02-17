import { IGiayToSoHoa } from "@/features/giaytosohoa/models"
import { AddGiayToSoHoa } from "@/features/giaytosohoa/redux/action"
import { LOAISOHOA_OPTIONS } from "@/features/hoso/data/formData"
import { AntdModal } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useTiepNhanHoSoTrucTuyenContext } from "@/pages/dvc/tiepnhanhoso/tructuyen/contexts/TiepNhanHoSoContext"
import { Checkbox, CheckboxProps, Col, DatePicker, DatePickerProps, Form, Input, Row, Select } from "antd"
import { toast } from "react-toastify"
import dayjs from 'dayjs'
import { AddGiayToSoHoaParams } from "@/features/giaytosohoa/services"
import { useEffect, useState } from "react"

export const GiayToSoHoaHoSoTrucTuyenModal = () => {
    const [form] = Form.useForm<IGiayToSoHoa>()
    const dispatch = useAppDispatch()
    const thoiHanVinhVien = Form.useWatch("thoiHanVinhVien", form)
    const {loading} = useAppSelector(state => state.giaytosohoa)
    const [loaiSoHoas, setLoaiSoHoas] = useState(LOAISOHOA_OPTIONS)
    const tiepNhanHoSoContext = useTiepNhanHoSoTrucTuyenContext()
    const {data: hoSo} = useAppSelector(state => state.hoso)
    useEffect(() => {
        if(tiepNhanHoSoContext.soHoaData?.loaiSoHoa){
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
        if(!tiepNhanHoSoContext.soHoaData?.thanhPhanHoSoId){
            return;
        }
        const giayToSoHoa: AddGiayToSoHoaParams = {...formData, ...tiepNhanHoSoContext.soHoaData, maHoSo: hoSo?.maHoSo, chuGiayTo: hoSo?.chuHoSo,}
        var res = await dispatch(AddGiayToSoHoa(giayToSoHoa)).unwrap()
        if(res.succeeded){
            toast.success("Số hóa thành công")
            tiepNhanHoSoContext.soHoaData?.onOk()
        }
        handleCancel()
        
    }
    const onNgayBanHanhChange: DatePickerProps["onChange"] = (value) => {
        // form.setFieldValue("thoiHanHieuLuc",  dayjs(value).add(6, 'month'))
    }
    const onChangThoiHanVinhVien: CheckboxProps["onChange"] = (e) => {
        if(e.target.checked){
            form.setFieldValue("thoiHanHieuLuc",  undefined)
        }
        // e.target.checked ? form.setFieldValue("thoiHanHieuLuc",  undefined) : form.setFieldValue("thoiHanHieuLuc",  dayjs(form.getFieldValue("ngayBanHanh")).add(6, 'month'))
    }

    const disabledNgayHetHanDate: DatePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        const ngayBanHanh = form.getFieldValue("ngayBanHanh")
        return current && current < dayjs(ngayBanHanh).endOf('day');
    };
    return <AntdModal confirmLoading={loading} title="Thông tin số hóa" visible={true} onOk={onOk} handlerCancel={handleCancel} okText="Số hóa">
        <Form form={form} name="ThongTinGiayToSoHoa" layout="vertical" initialValues={{
            // thoiHanHieuLuc: dayjs().add(6, 'month'),
            loaiSoHoa: tiepNhanHoSoContext.soHoaData?.loaiSoHoa, ngayBanHanh:dayjs()}}>
            <Row gutter={8}>
            <Col span={8}>
                    <Form.Item name="ngayBanHanh" label="Ngày ban hành" rules={[{required: true, message:"Vui lòng nhập số ký hiệu giấy tờ"}]}>
                        <DatePicker format="DD-MM-YYYY" onChange={onNgayBanHanhChange}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="thoiHanHieuLuc" tooltip="Mặc định 6 tháng tính từ thời điểm số hóa" label="Ngày hết hiệu lực">
                        <DatePicker disabled={thoiHanVinhVien} format="DD-MM-YYYY" disabledDate={disabledNgayHetHanDate}/>
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