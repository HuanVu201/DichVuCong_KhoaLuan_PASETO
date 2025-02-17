import { useState, useEffect } from "react";
import { Form, Input, Space, Row, Col, Typography, Card, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import { TraCuuHoKinhDoanhProvider } from "../contexts/TraCuuHoKinhDoanhContext";
import { GetTraCuuHoKinhDoanh } from "../redux/action";
import { AntdButton } from "../../../lib/antd/components";
import { 
    InfoCircleOutlined, 
    IdcardOutlined, 
    GlobalOutlined, 
    HomeOutlined, 
    PhoneOutlined, 
    FileTextOutlined, 
    BankOutlined 
} from '@ant-design/icons';

const TraCuuHoKinhDoanhTable = () => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const [ketqua] = Form.useForm();

    // Lấy dữ liệu từ Redux store
    const { data: traCuuHoKinhDoanh, loading, error } = useAppSelector(state => state.tracuuhokinhdoanh);

    useEffect(() => {
        if (traCuuHoKinhDoanh) {
            const {
                maNoiBo,
                maSoHKD,
                maSoDangKyHKD,
                foundinG_DATE,
                maLoaiHinhHKD,
                loaiHinhHKD,
                tenTiengViet,
                tenVietTat,
                tenNuocNgoai,
                ngayDangKyLanDau,
                ngayDangKyThayDoi,
                soLanDangKyThayDoi,
                chuHoKinhDoanh,
                diaChiTruSo
            } = traCuuHoKinhDoanh;

            const diaChi = diaChiTruSo?.[0]?.diaChiDayDu || '';
            const chuHo = chuHoKinhDoanh?.[0]?.hoVaTen || '';
            const soGiayChungThuc = chuHoKinhDoanh?.[0]?.soGiayChungThuc || '';

            // Điền dữ liệu vào form
            ketqua.setFieldsValue({
                tenTiengViet,
                tenNuocNgoai,
                tenVietTat,
                maSoHKD,
                diaChi,
                chuHoKinhDoanh: chuHo,
                soGiayChungThuc: soGiayChungThuc,
                ngayDangKyLanDau,
                loaiHinhHKD,
                ngayDangKyThayDoi: ngayDangKyThayDoi || '',
                soLanDangKyThayDoi
            });
        }
    }, [traCuuHoKinhDoanh, form]);

    const onFinish = (values: { mst: string }) => {
        console.log('Submitting:', values.mst); // Thêm log để kiểm tra tham số

        // Dispatch action với ID đã nhập
        dispatch(GetTraCuuHoKinhDoanh(values.mst));
    };

    return (
        <>
            <Row justify="center" style={{ marginBottom: '20px' }}>
                <Col span={24} md={12} lg={8}>
                    <Form
                        name='TraCuuHoKinhDoanhSearch'
                        layout="vertical"
                        onFinish={onFinish}
                        form={form}
                    >
                        <Form.Item
                            label="Mã số thuế"
                            name="mst"
                            rules={[{ required: true, message: 'Vui lòng nhập mã số thuế!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Row justify="center">
                                <Space size="large">
                                    <AntdButton type="primary" htmlType="submit">
                                        Xác nhận
                                    </AntdButton>
                                </Space>
                            </Row>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>

            {loading ? (
                <Row justify="center" align="middle" style={{ minHeight: '200px' }}>
                    <Col>
                        <Spin tip="Đang tải dữ liệu..." />
                    </Col>
                </Row>
            ) : error ? (
                <Row justify="center" align="middle" style={{ minHeight: '200px' }}>
                    <Col>
                        <Typography.Text type="danger">{error}</Typography.Text>
                    </Col>
                </Row>
            ) : traCuuHoKinhDoanh ? (
                <Row justify="center">
                    <Col span={24} md={16} lg={12}>
                        <Card title="Thông tin doanh nghiệp">
                            <Form form={ketqua} layout="vertical">
                                <Row gutter={16}>
                                    {/* <Col span={24}>
                                        <Form.Item 
                                            label={<><GlobalOutlined style={{ marginRight: 8 }} /> Tên quốc tế</>} 
                                            name="tenNuocNgoai"
                                        >
                                            <Input disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item 
                                            label={<><GlobalOutlined style={{ marginRight: 8 }} /> Tên viết tắt</>} 
                                            name="tenVietTat"
                                        >
                                            <Input disabled />
                                        </Form.Item>
                                    </Col> */}
                                    <Col span={24}>
                                        <Form.Item 
                                            label={<><IdcardOutlined style={{ marginRight: 8 }} /> Mã số thuế</>} 
                                            name="maSoHKD"
                                        >
                                            <Input disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item 
                                            label={<><HomeOutlined style={{ marginRight: 8 }} /> Địa chỉ</>} 
                                            name="diaChi"
                                        >
                                            <Input.TextArea rows={4} disabled style={{ resize: 'none' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item 
                                            label={<><IdcardOutlined style={{ marginRight: 8 }} /> Chủ hộ kinh doanh</>} 
                                            name="chuHoKinhDoanh"
                                        >
                                            <Input disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item 
                                            label={<><PhoneOutlined style={{ marginRight: 8 }} /> Số giấy chứng thực</>} 
                                            name="soGiayChungThuc"
                                        >
                                            <Input disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item 
                                            label={<><FileTextOutlined style={{ marginRight: 8 }} /> Ngày đăng ký lần đầu</>} 
                                            name="ngayDangKyLanDau"
                                        >
                                            <Input disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item 
                                            label={<><BankOutlined style={{ marginRight: 8 }} /> Loại hình hộ kinh doanh</>} 
                                            name="loaiHinhHKD"
                                        >
                                            <Input disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item 
                                            label={<><InfoCircleOutlined style={{ marginRight: 8 }} /> Ngày đăng ký thay đổi</>} 
                                            name="ngayDangKyThayDoi"
                                        >
                                            <Input disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item 
                                            label={<><BankOutlined style={{ marginRight: 8 }} /> Số lần đăng ký thay đổi</>} 
                                            name="soLanDangKyThayDoi"
                                        >
                                            <Input disabled />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <Row justify="center" align="middle" style={{ minHeight: '200px' }}>
                    <Col>
                        <Typography.Text type="warning">
                        Mã số thuế chưa chính xác.
                        </Typography.Text>
                    </Col>
                </Row>
            )}
        </>
    );
};

const TraCuuHoKinhDoanhTableWrapper = () => {
    return (
        <TraCuuHoKinhDoanhProvider>
            <TraCuuHoKinhDoanhTable />
        </TraCuuHoKinhDoanhProvider>
    );
};

export default TraCuuHoKinhDoanhTableWrapper;
