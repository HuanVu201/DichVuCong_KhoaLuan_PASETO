import { Col, DatePicker, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { useThongKeDanhGiaHaiLongContext } from "../contexts/ThongKeDanhGiaHaiLongContext"
import { IPhieuKhaoSat } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/models"
import { GetPhieuKhaoSat } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/redux/action"
import dayjs from 'dayjs'

const options = [
    { label: 'True', value: true as any },
    { label: 'False', value: false as any },
];
export const ThongKeDanhGiaHaiLongDetail = () => {
    const dispatch = useAppDispatch()
    const { data: ThongKeDanhGiaHaiLong, } = useAppSelector(state => state.phieukhaosat)
    const { datas: donVis, } = useAppSelector(state => state.cocautochuc)
    const ThongKeDanhGiaHaiLongContext = useThongKeDanhGiaHaiLongContext()
    const [form] = Form.useForm<IPhieuKhaoSat>()
    const dinhKem = Form.useWatch("tepDinhKem", form)
    const onFinish = async () => {
        const formData = form.getFieldsValue()

    }
    const tenDonVi = donVis?.find(x => x.groupCode == ThongKeDanhGiaHaiLong?.donVi)

    const handleCancel = () => {
        form.resetFields();
        // dispatch(resetData)
        ThongKeDanhGiaHaiLongContext.setThongKeDanhGiaHaiLongModalVisible(false)
        ThongKeDanhGiaHaiLongContext.setThongKeDanhGiaHaiLongId(undefined)
    };
    useEffect(() => {
        if (ThongKeDanhGiaHaiLongContext.ThongKeDanhGiaHaiLongId) {
            dispatch(GetPhieuKhaoSat(ThongKeDanhGiaHaiLongContext.ThongKeDanhGiaHaiLongId))
        }
    }, [ThongKeDanhGiaHaiLongContext.ThongKeDanhGiaHaiLongId])

    useEffect(() => {
        if (ThongKeDanhGiaHaiLong) {
            form.setFieldsValue({ ...ThongKeDanhGiaHaiLong, donVi: tenDonVi?.groupName, ngayTao: ThongKeDanhGiaHaiLong.ngayTao ? dayjs(ThongKeDanhGiaHaiLong.ngayTao) : null, } as any,)
        }
    }, [ThongKeDanhGiaHaiLong])
    return (
        <AntdModal title="Chi tiết đánh giá" visible={ThongKeDanhGiaHaiLongContext.ThongKeDanhGiaHaiLongModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='ThongKeDanhGiaHaiLong' layout="vertical" onFinish={onFinish} form={form} requiredMark={ThongKeDanhGiaHaiLongContext.ThongKeDanhGiaHaiLongId === null} initialValues={{ thuTu: 1 }}>
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã hồ sơ"
                            name="maHoSo"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Đơn vị"
                            name="donVi"
                        >
                            <Input defaultValue={tenDonVi?.groupName} disabled />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Ngày tạo"
                            name="ngayTao"
                        >
                            <DatePicker disabled></DatePicker>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Trả lời 1"
                            name="traLoi1"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Trả lời 2"
                            name="traLoi2"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Trả lời 3"
                            name="traLoi3"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Trả lời 4"
                            name="traLoi4"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Trả lời 5"
                            name="traLoi5"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Trả lời 6"
                            name="traLoi6"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Trả lời 7"
                            name="traLoi7"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Trả lời 8"
                            name="traLoi8"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Trả lời 9"
                            name="traLoi9"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Trả lời 10"
                            name="traLoi10"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Trả lời 11"
                            name="traLoi11"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Space >
                        <AntdButton type="primary" onClick={onFinish}>
                            Xác nhận
                        </AntdButton>
                        <AntdButton type="default" onClick={handleCancel}>
                            Đóng
                        </AntdButton>
                    </Space>
                </Form.Item> */}
            </Form>
        </AntdModal>
    )
}