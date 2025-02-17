import { useState, useEffect, useMemo } from "react";
import { Form, Input, Space, Row, Col, Typography, Card, Spin } from "antd";
import { ITraCuuHopTacXa, ISearchTraCuuHopTacXa } from "../models";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import { TraCuuHopTacXaProvider } from "../contexts/TraCuuHopTacXaContext";
import { GetTraCuuHopTacXa } from "../redux/action";
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
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const TraCuuHopTacXaTable = () => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const [ketqua] = Form.useForm();
    const [searchParams, setSearchParams] = useState<ISearchTraCuuHopTacXa>({ pageNumber: 1, pageSize: 50 });

    // Lấy dữ liệu từ Redux store
    const { data: traCuuHopTacXa, loading, error } = useAppSelector(state => state.tracuuhoptacxa);

    useEffect(() => {
        if (traCuuHopTacXa) {
            const {
                maSoHTX,
                tenTiengViet,
                tenVietTat,
                tenNuocNgoai,
                ngayDangKyLanDau,
                ngayDangKyThayDoi,
                soLanDangKyThayDoi,
                daiDienPhapLuat,
                diaChiTruSo,
                nganhNgheKinhDoanh
            } = traCuuHopTacXa;

            const diaChi = diaChiTruSo?.[0]?.diaChiDayDu || '';
            const nguoiDaiDien = daiDienPhapLuat?.hoVaTen || '';
            const soGiayChungThuc = daiDienPhapLuat?.soGiayChungThuc || '';

            // Điền dữ liệu vào form
            ketqua.setFieldsValue({
                tenTiengViet,
                tenNuocNgoai,
                tenVietTat,
                maSoHTX,
                diaChi,
                nguoiDaiDien,
                dienThoai: soGiayChungThuc,
                ngayDangKyLanDau,
                ngayDangKyThayDoi,
                soLanDangKyThayDoi,
                loaiHinhHTX: traCuuHopTacXa.loaiHinhHTX,
                tinhTrangPhapLy: '', // Nếu có thông tin về tình trạng pháp lý, điền vào đây
                quanLyBy: '', // Nếu có thông tin về quản lý bởi, điền vào đây
            });
        }
    }, [traCuuHopTacXa, ketqua]);

    const onFinish = (values: { maSoHTX: string }) => {
        // Cập nhật tham số tìm kiếm và kích hoạt tìm kiếm
        setSearchParams(curr => ({
            ...curr,
            pageNumber: 1, // Reset to the first page when a new search is initiated
            pageSize: 50
        }));
        
        // Dispatch action với ID đã nhập
        dispatch(GetTraCuuHopTacXa(values.maSoHTX));
    };

    return (
        <>
            <Row justify="center" style={{ marginBottom: '20px' }}>
                <Col span={24} md={12} lg={8}>
                    <Form
                        name='TraCuuHopTacXaSearch'
                        layout="vertical"
                        onFinish={onFinish}
                        form={form}
                    >
                        <Form.Item
                            label="Mã hợp tác xã"
                            name="maSoHTX"
                            rules={[{ required: true, message: 'Vui lòng nhập mã hợp tác xã!' }]}
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
                <Typography.Text type="danger">{error}</Typography.Text>
            ) : (
                traCuuHopTacXa ? (
                    <Row justify="center">
                        <Col span={24} md={16} lg={12}>
                            <Card title="Thông tin hợp tác xã">
                                <Form form={ketqua} layout="vertical">
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <Form.Item
                                                label={<><GlobalOutlined style={{ marginRight: 8 }} /> Tên tiếng Việt</>}
                                                name="tenTiengViet"
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
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item
                                                label={<><IdcardOutlined style={{ marginRight: 8 }} /> Mã số hợp tác xã</>}
                                                name="maSoHTX"
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
                                                label={<><IdcardOutlined style={{ marginRight: 8 }} /> Người đại diện pháp luật</>}
                                                name="nguoiDaiDien"
                                            >
                                                <Input disabled />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item
                                                label={<><PhoneOutlined style={{ marginRight: 8 }} /> Số giấy chứng thực</>}
                                                name="dienThoai"
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
                                                label={<><FileTextOutlined style={{ marginRight: 8 }} /> Ngày đăng ký thay đổi</>}
                                                name="ngayDangKyThayDoi"
                                            >
                                                <Input disabled />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item
                                                label={<><FileTextOutlined style={{ marginRight: 8 }} /> Số lần đăng ký thay đổi</>}
                                                name="soLanDangKyThayDoi"
                                            >
                                                <Input disabled />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item
                                                label={<><BankOutlined style={{ marginRight: 8 }} /> Loại hình hợp tác xã</>}
                                                name="loaiHinhHTX"
                                            >
                                                <Input disabled />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item
                                                label={<><InfoCircleOutlined style={{ marginRight: 8 }} /> Tình trạng pháp lý</>}
                                                name="tinhTrangPhapLy"
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
                            Mã số hợp tác xã chưa chính xác.
                        </Typography.Text>
                    </Col>
                </Row>
                )
            )}
        </>
    );
};

const TraCuuHopTacXaTableWrapper = () => {
    const { publicModule } = useAppSelector(state => state.config);
    const recaptchaSiteKey = useMemo(() => {
        return publicModule?.find(module => module.code === "recaptcha_site_key")?.content || "";
    }, [publicModule]);

    if (!recaptchaSiteKey)
        return <></>;

    return (
        <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
            <TraCuuHopTacXaProvider>
                <TraCuuHopTacXaTable />
            </TraCuuHopTacXaProvider>
        </GoogleReCaptchaProvider>
    );
};

export default TraCuuHopTacXaTableWrapper;
