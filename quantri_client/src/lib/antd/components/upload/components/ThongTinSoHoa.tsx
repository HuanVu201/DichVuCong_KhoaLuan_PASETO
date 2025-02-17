import { giayToSoHoaApi } from "@/features/giaytosohoa/services"
import { useAppSelector } from "@/lib/redux/Hooks"
import { Checkbox, Col, DatePicker, Form, Input, Row } from "antd"
import { useEffect } from "react"
import dayjs from 'dayjs'
import { AntdModal } from "../.."
import { LOAIKETQUA_GIAYTOSOHOA_FROM_CODE } from "@/features/giaytosohoa/data/format"


export const ThongTinSoHoa = ({fileUrl, handleClose}: {fileUrl: string; handleClose: () => void}) => {
    const [form] = Form.useForm()
    const {data: hoSo} = useAppSelector(state => state.hoso)
    useEffect(() => {
        (async () => {
            const res = await giayToSoHoaApi.Get({fileUrl, soDinhDanh: hoSo?.soGiayToChuHoSo})
            const giayToSoHoa = res.data.data
            if(res.data.succeeded){
                form.setFieldsValue({
                    ...giayToSoHoa,
                    ngayBanHanh : giayToSoHoa.ngayBanHanh ? dayjs(giayToSoHoa.ngayBanHanh) : undefined,
                    thoiHanHieuLuc : giayToSoHoa.thoiHanHieuLuc ? dayjs(giayToSoHoa.thoiHanHieuLuc) : undefined,
                    loaiSoHoa: giayToSoHoa.loaiSoHoa == "1" || giayToSoHoa.loaiSoHoa == "0" ? (LOAIKETQUA_GIAYTOSOHOA_FROM_CODE as any)[giayToSoHoa.loaiSoHoa] : giayToSoHoa.loaiSoHoa
                })
            }
        })()
    }, [])
    return <AntdModal visible={true} footer={null} title="CHI TIẾT GIẤY TỜ SỐ HÓA" handlerCancel={handleClose}>
        <Form name="ThongTinGiayToSoHoa"layout="vertical" form={form} disabled>
    <Form.Item name="jsonOcr" hidden><Input/></Form.Item>
    <Row gutter={8}>
        <Col span={8}>
            <Form.Item name="ngayBanHanh" label="Ngày ban hành" rules={[{required: true, message:"Vui lòng nhập ngày ban hành"}]}>
                <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
        </Col>
        <Col span={8}>
            <Form.Item name="thoiHanHieuLuc"  label="Ngày hết hiệu lực">
                <DatePicker format="DD-MM-YYYY"/>
            </Form.Item>
        </Col>
        <Col span={8}>
            <Form.Item name="thoiHanVinhVien" label="Hiệu lực vĩnh viễn" valuePropName="checked">
                <Checkbox />
            </Form.Item>
        </Col>
        <Col span={24}>
            <Form.Item name="ma" label="Mã giấy tờ">
                <Input style={{fontWeight:700}}/>
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
            <Form.Item name="loaiSoHoa" label="Loại số hóa" >
                <Input disabled/>
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