// import { useState, useEffect ,useMemo} from "react";
// import { Form, Input, Space, Row, Col, Typography, Card, Spin } from "antd";
// import { ISearchTraCuuThongTinDoanhNghiep } from "../models";
// import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
// import { TraCuuThongTinDoanhNghiepProvider } from "../contexts/TraCuuThongTinDoanhNghiepContext";
// import { GetTraCuuThongTinDoanhNghiep } from "../redux/action";
// import { AntdButton } from "../../../lib/antd/components";
// import { 
//     InfoCircleOutlined, 
//     IdcardOutlined, 
//     GlobalOutlined, 
//     HomeOutlined, 
//     PhoneOutlined, 
//     FileTextOutlined, 
//     BankOutlined 
// } from '@ant-design/icons';
// import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
// const TraCuuThongTinDoanhNghiepTable = () => {
//     const dispatch = useAppDispatch();
//     const [form] = Form.useForm();
//     const [ketqua] = Form.useForm();
//     const [searchParams, setSearchParams] = useState<ISearchTraCuuThongTinDoanhNghiep>({ pageNumber: 1, pageSize: 50 });

//     // Lấy dữ liệu từ Redux store
//     const { data: traCuuThongTinDoanhNghiep, loading, error } = useAppSelector(state => state.tracuuthongtindoanhnghiep);

//     useEffect(() => {
//         if (traCuuThongTinDoanhNghiep) {
//             const {
//                 maSoDoanhNghiep,
//                 tenNuocNgoai,
//                 tenVietTat,
//                 tenTiengViet,
//                 loaiHinhDN,
//                 ngayDangKyLanDau,
//                 diaChiTruSo,
//                 daiDienPhapLuat,
//                 tinhTrangPhapLy
//             } = traCuuThongTinDoanhNghiep;

//             const diaChi = diaChiTruSo?.[0]?.diaChi?.[0]?.diaChi || '';
//             const nguoiDaiDien = daiDienPhapLuat?.[0]?.thongTinCaNhan?.[0]?.hoVaTen || '';
//             const soGiayChungThuc = daiDienPhapLuat?.[0]?.thongTinCaNhan?.[0]?.soGiayChungThuc || '';

//             // Điền dữ liệu vào form
//             ketqua.setFieldsValue({
//                 tenTiengViet,
//                 tenNuocNgoai,
//                 tenVietTat,
//                 maSoDoanhNghiep,
//                 diaChi,
//                 nguoiDaiDien,
//                 dienThoai: soGiayChungThuc,
//                 ngayDangKyLanDau,
//                 loaiHinhDN,
//                 tinhTrangPhapLy: tinhTrangPhapLy?.[0]?.tinhTrangPhapLy || '',
//                 quanLyBy: '' // Nếu có thông tin về quản lý bởi, điền vào đây
//             });
//         }
//     }, [traCuuThongTinDoanhNghiep, form]);

//     const onFinish = (values: { msdn: string }) => {
//         // Cập nhật tham số tìm kiếm và kích hoạt tìm kiếm
//         setSearchParams(curr => ({
//             ...curr,
//             pageNumber: 1, // Reset to the first page when a new search is initiated
//             pageSize: 50
//         }));
        
//         // Dispatch action với ID đã nhập
//         dispatch(GetTraCuuThongTinDoanhNghiep(values.msdn));
//     };

//     return (
//         <>
//             <Row justify="center" style={{ marginBottom: '20px' }}>
//                 <Col span={24} md={12} lg={8}>
//                     <Form
//                         name='TraCuuThongTinDoanhNghiepSearch'
//                         layout="vertical"
//                         onFinish={onFinish}
//                         form={form}
//                     >
//                         <Form.Item
//                             label="Mã doanh nghiệp"
//                             name="msdn"
//                             rules={[{ required: true, message: 'Vui lòng nhập mã doanh nghiệp!' }]}
//                         >
//                             <Input />
//                         </Form.Item>
//                         <Form.Item>
//                             <Row justify="center">
//                                 <Space size="large">
//                                     <AntdButton type="primary" htmlType="submit">
//                                         Xác nhận
//                                     </AntdButton>
//                                 </Space>
//                             </Row>
//                         </Form.Item>
//                     </Form>
//                 </Col>
//             </Row>

//             {loading ? (
//                 <Row justify="center" align="middle" style={{ minHeight: '200px' }}>
//                 <Col>
//                     <Spin tip="Đang tải dữ liệu..." />
//                 </Col>
//             </Row>
//             ) : error ? (
//                 <Typography.Text type="danger">{error}</Typography.Text>
//             ) : (
//                 traCuuThongTinDoanhNghiep ? (
//                     <Row justify="center">
//                         <Col span={24} md={16} lg={12}>
//                             <Card title="Thông tin doanh nghiệp">
//                                 <Form form={ketqua} layout="vertical">
//                                     <Row gutter={16}>
//                                         <Col span={24}>
//                                             <Form.Item 
//                                                 label={<><GlobalOutlined style={{ marginRight: 8 }} /> Tên quốc tế</>} 
//                                                 name="tenNuocNgoai"
//                                             >
//                                                 <Input disabled />
//                                             </Form.Item>
//                                         </Col>
//                                         <Col span={24}>
//                                             <Form.Item 
//                                                 label={<><GlobalOutlined style={{ marginRight: 8 }} /> Tên viết tắt</>} 
//                                                 name="tenVietTat"
//                                             >
//                                                 <Input disabled />
//                                             </Form.Item>
//                                         </Col>
//                                         <Col span={24}>
//                                             <Form.Item 
//                                                 label={<><IdcardOutlined style={{ marginRight: 8 }} /> Mã số thuế</>} 
//                                                 name="maSoDoanhNghiep"
//                                             >
//                                                 <Input disabled />
//                                             </Form.Item>
//                                         </Col>
//                                         <Col span={24}>
//                                             <Form.Item 
//                                                 label={<><HomeOutlined style={{ marginRight: 8 }} /> Địa chỉ</>} 
//                                                 name="diaChi"
//                                             >
//                                                 <Input.TextArea rows={4} disabled style={{ resize: 'none' }} />
//                                             </Form.Item>
//                                         </Col>
//                                         <Col span={24}>
//                                             <Form.Item 
//                                                 label={<><IdcardOutlined style={{ marginRight: 8 }} /> Người đại diện</>} 
//                                                 name="nguoiDaiDien"
//                                             >
//                                                 <Input disabled />
//                                             </Form.Item>
//                                         </Col>
//                                         <Col span={24}>
//                                             <Form.Item 
//                                                 label={<><PhoneOutlined style={{ marginRight: 8 }} /> Điện thoại</>} 
//                                                 name="dienThoai"
//                                             >
//                                                 <Input disabled />
//                                             </Form.Item>
//                                         </Col>
//                                         <Col span={24}>
//                                             <Form.Item 
//                                                 label={<><FileTextOutlined style={{ marginRight: 8 }} /> Ngày hoạt động</>} 
//                                                 name="ngayDangKyLanDau"
//                                             >
//                                                 <Input disabled />
//                                             </Form.Item>
//                                         </Col>
//                                         <Col span={24}>
//                                             <Form.Item 
//                                                 label={<><BankOutlined style={{ marginRight: 8 }} /> Quản lý bởi</>} 
//                                                 name="quanLyBy"
//                                             >
//                                                 <Input disabled />
//                                             </Form.Item>
//                                         </Col>
//                                         <Col span={24}>
//                                             <Form.Item 
//                                                 label={<><BankOutlined style={{ marginRight: 8 }} /> Loại hình doanh nghiệp</>} 
//                                                 name="loaiHinhDN"
//                                             >
//                                                 <Input disabled />
//                                             </Form.Item>
//                                         </Col>
//                                         <Col span={24}>
//                                             <Form.Item 
//                                                 label={<><InfoCircleOutlined style={{ marginRight: 8 }} /> Tình trạng</>} 
//                                                 name="tinhTrangPhapLy"
//                                             >
//                                                 <Input disabled />
//                                             </Form.Item>
//                                         </Col>
//                                     </Row>
//                                 </Form>
//                             </Card>
//                         </Col>
//                     </Row>
//                 ):(
//                     <Row justify="center" align="middle" style={{ minHeight: '200px' }}>
//                     <Col>
//                         <Typography.Text type="warning">
//                             Mã số thuế doanh nghiệp chưa  chính xác.
//                         </Typography.Text>
//                     </Col>
//                 </Row>
//                 )
//             )}
//         </>
//     );
// };

// // const TraCuuThongTinDoanhNghiepTableWrapper = () => (
    
// //     <TraCuuThongTinDoanhNghiepProvider>
// //         <TraCuuThongTinDoanhNghiepTable />
// //     </TraCuuThongTinDoanhNghiepProvider>
// // );

// const TraCuuThongTinDoanhNghiepTableWrapper = () => {
//     const { publicModule } = useAppSelector(state => state.config)
//     const dispatch = useAppDispatch()

//     const recaptchaSiteKey = useMemo(() => {
//         return publicModule?.find(module => module.code === "recaptcha_site_key")?.content || ""
//     }, [publicModule])
//     // console.log(recaptchaSiteKey);

//     if (!recaptchaSiteKey)
//         return <></>
//     return (
//         <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}
//             container={{
//                 parameters: {
//                     badge: undefined,
//                     theme: undefined,
//                 }
//             }}>
          
//      <TraCuuThongTinDoanhNghiepProvider>
//          <TraCuuThongTinDoanhNghiepTable />
//      </TraCuuThongTinDoanhNghiepProvider>

//         </GoogleReCaptchaProvider>
//     )
// };
// export default TraCuuThongTinDoanhNghiepTableWrapper;
