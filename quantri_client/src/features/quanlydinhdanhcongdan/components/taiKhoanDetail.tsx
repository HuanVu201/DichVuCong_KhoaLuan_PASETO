import { Checkbox, Col, Form, Input, InputNumber, Row, Select, SelectProps, Space, Upload } from "antd"
import { useEffect, useMemo, useRef } from "react"
import { resetData } from "@/features/quanlymauphoi/redux/slice"
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { toast } from "react-toastify"
import { IQuanLyTaiKhoanDinhDanh } from "../models/QuanLyTaiKhoanModel"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useQuanLyDinhDanhContext } from "../context/quanLyDinhDanhCongDanContext"
import { GetThongTinTaiKhoan } from "../redux/action"
import { AntdButton, AntdModal, AntdSelect } from "@/lib/antd/components"
import { danhGiaHaiLongRouters } from "@/pages/routers/admin"

export const TaiKhoanDinhDanhDetail = () => {
    const dispatch = useAppDispatch()
    const QuanLyDinhDanhContext = useQuanLyDinhDanhContext()
    const { data: dinhdanhcongdan } = useAppSelector(state => state.dinhdanhcongdan)
    const [form] = Form.useForm<IQuanLyTaiKhoanDinhDanh>()

    const handleCancel = () => {
        form.resetFields();

        QuanLyDinhDanhContext.setDetailUserModalVisible(false)
        QuanLyDinhDanhContext.setUserId(undefined)
    };

    useEffect(() => {
        if (QuanLyDinhDanhContext.userId) {

            dispatch(GetThongTinTaiKhoan({ id: QuanLyDinhDanhContext.userId }))
        }
    }, [QuanLyDinhDanhContext.userId])


    useEffect(() => {
        if (dinhdanhcongdan) {
            let nam, thang, ngay: any
            if (dinhdanhcongdan.ngayThangNamSinh) {
                const ngayThangNamSinh: string = JSON.parse(dinhdanhcongdan.ngayThangNamSinh).NgayThangNam
                nam = ngayThangNamSinh.substring(0, 4);
                thang = ngayThangNamSinh.substring(4, 6);
                ngay = ngayThangNamSinh.substring(6, 8);

            }

            form.setFieldsValue({
                ...dinhdanhcongdan,
                gioiTinh: dinhdanhcongdan.gioiTinh == "1" ? `Nam` : 'Nữ',
                ngayThangNamSinh: ngay && thang && nam ? `${ngay}/${thang}/${nam}` : ``
            })
        }
    }, [dinhdanhcongdan])



    return (
        <AntdModal title={`Thông tin người dùng: ${dinhdanhcongdan?.fullName}`} visible={QuanLyDinhDanhContext.detailUserModalVisible} handlerCancel={handleCancel} footer={null} width={800}>
            <Form name='QuanLyTaiKhoanDinhDanh' layout="vertical" form={form} requiredMark={QuanLyDinhDanhContext.userId !== null}>
                <Row gutter={[8, 8]}>

                    {dinhdanhcongdan?.soDinhDanh
                        ?
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Số định danh"
                                name="soDinhDanh"
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        : null}



                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tài khoản"
                            name="userName"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Ngày sinh"
                            name="ngayThangNamSinh"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>


                    <Col md={12} span={24}>
                        <Form.Item
                            label="Giới tính"
                            name="gioiTinh"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>


                    <Col md={12} span={24}>
                        <Form.Item
                            label="Email"
                            name="email"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>


                    <Col md={12} span={24}>
                        <Form.Item
                            label="Số điện thoại"
                            name="phoneNumber"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>


                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={24} style={{display: 'flex', justifyContent: 'right'}}>
                        <Form.Item>
                            <Space >
                                <AntdButton type="default" onClick={handleCancel}>
                                    Đóng
                                </AntdButton>
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        </AntdModal>
    )
}