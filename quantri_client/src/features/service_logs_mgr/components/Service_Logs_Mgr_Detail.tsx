import {
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import {
  IService_Logs_Mgr,
  IRequestZalo,
  IRequestSMS,
  IRequestEMC,
  IRequestEmail,
  IRequestTBKM,
  IResponeZalo,
  IResponeTBKM,
  IResponeEMC,
} from "../models";
import { useEffect, useRef, useState } from "react";
import { AntdButton, AntdModal } from "../../../lib/antd/components";
import {GetService_Logs_Mgr} from "../redux/action";
import { useService_Logs_Mgr_Context } from "../context/Service_Logs_Mgr_Context";
import { resetData } from "@/features/service_logs_mgr/redux/slice";
import TextArea from "antd/es/input/TextArea";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
export const Service_Logs_Mgr_Detail = () => {
  const dispatch = useAppDispatch();
  const Service_Logs_MgrContext = useService_Logs_Mgr_Context();
  const { data: service_logs_mgr } = useAppSelector(
    (state) => state.service_logs_mgr
  );

  const [form] = Form.useForm();
  const [requestType, setRequestType] = useState<any>(null);

  const handleCancel = () => {
    form.resetFields();
    dispatch(resetData());
    Service_Logs_MgrContext.setService_Logs_MgrModalVisible(false);
    Service_Logs_MgrContext.setService_Logs_MgrId(undefined);
  };

  useEffect(() => {
    if (Service_Logs_MgrContext.Service_Logs_MgrId) {
      dispatch(GetService_Logs_Mgr(Service_Logs_MgrContext.Service_Logs_MgrId));
    }
  }, [Service_Logs_MgrContext.Service_Logs_MgrId]);

  useEffect(() => {
    if (service_logs_mgr) {
      let parsedRequest;
      if(service_logs_mgr.request.length>0)
      {
        switch (service_logs_mgr.service) {
          case "Zalo":
            parsedRequest = JSON.parse(service_logs_mgr.request) as IRequestZalo;
            // parseRespone = JSON.parse(service_logs_mgr.response) as IResponeZalo;
            break;
          case "Email":
            parsedRequest = JSON.parse(service_logs_mgr.request) as IRequestEmail;
            break;
          case "SMS":
            parsedRequest = JSON.parse(service_logs_mgr.request) as IRequestSMS;
            break;
          case "TBKM":
            parsedRequest = JSON.parse(service_logs_mgr.request) as IRequestTBKM;
            // parseRespone = JSON.parse(service_logs_mgr.response) as IResponeTBKM;
            break;
          case "EMC":
            parsedRequest = JSON.parse(service_logs_mgr.request) as IRequestEMC;
            // parseRespone  =JSON.parse(service_logs_mgr.response) as IResponeEMC;
            break;
          default:
            console.error("Loại dịch vụ không hợp lệ:", service_logs_mgr.service);
            return;
      }
      }
      
      setRequestType(parsedRequest);

      form.setFieldsValue({
        ...service_logs_mgr,
        ...parsedRequest, // Thêm các giá trị từ parsedRequest
      });
    }
  }, [service_logs_mgr]);

  return (
    <AntdModal
      title={
        Service_Logs_MgrContext.Service_Logs_MgrId ? "Chi tiết log dịch vụ" : ""
      }
      visible={Service_Logs_MgrContext.Service_Logs_MgrModalVisible}
      onCancel={handleCancel}
      footer={null}
      width={1000}
    >
      <Form
        name="Service_Logs_Mgr"
        layout="vertical"
        form={form}
        requiredMark={Service_Logs_MgrContext.Service_Logs_MgrId !== null}
        initialValues={{ uuTien: 1 }}
      >
        <Row gutter={[8, 8]}>
          <Col md={10} span={24}>
            <Form.Item label="Người nhận" name="receiver">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col md={10} span={24}>
            <Form.Item label="Mã hồ sơ" name="maHoSo">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col md={4} span={24}>
            <Form.Item label="Kết quả">
              <Space>
                {service_logs_mgr?.isSucceed ? (
                  <CheckCircleOutlined
                    style={{ color: "green", fontSize: "20px" }}
                  />
                ) : (
                  <CloseCircleOutlined
                    style={{ color: "red", fontSize: "20px" }}
                  />
                )}
                <span>
                  {service_logs_mgr?.isSucceed ? "Thành công" : "Thất bại"}
                </span>
              </Space>
            </Form.Item>
          </Col>
          <Col md={24} span={24}>
            <h6 style={{ color: "#4caf50" }}>Thông tin yêu cầu</h6>
          </Col>
          {service_logs_mgr?.service === "Zalo" && (
            <Row gutter={[8, 8]}>
              {/* <Col md={12} span={24}>
            <Form.Item label="Banner" name="Banner">
              <Input disabled />
            </Form.Item>
          </Col> */}
              <Col md={12} span={24}>
                <Form.Item label="Số điện thoại" name="SoDienThoai">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={24} span={24}>
                <Form.Item label="Tên hồ sơ" name="TenHoSo">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={24} span={24}>
                <Form.Item label="Tên người dân" name="TenNguoiDan">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={24} span={24}>
                <Form.Item label="Mã hồ sơ" name="MaHoSo">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={24} span={24}>
                <Form.Item label="Trạng thái" name="TrangThai">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={24} span={24}>
                <Form.Item label="Tên dịch vụ" name="TenDichVu">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={24} span={24}>
                <Form.Item label="Lời nhắn" name="LoiNhan">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={24} span={24}>
                <Form.Item label="Link CTA" name="CtaLink">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={24} span={24}>
                <Form.Item label="Văn bản CTA" name="CtaText">
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
          )}
          {service_logs_mgr?.service === "Email" && (
            <Row gutter={[8, 8]}>
              <Col md={12} span={24}>
                <Form.Item label="Địa chỉ email người nhận" name="To">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="Tiêu đề" name="Subject">
                  <Input disabled />
                </Form.Item>
              </Col>
              {/* <Col md={12} span={24}>
                <Form.Item label="Mã hồ sơ" name="MaHoSo">
                  <Input disabled />
                </Form.Item>
              </Col> */}
              <Col md={24} span={24}>
                <Form.Item label="Nội dung" name="Body">
                  {/* <Input.TextArea disabled /> */}
                  {/* <div
                    style={{ border: '1px solid #d9d9d9', padding: '8px' }}
                    dangerouslySetInnerHTML={{ __html: form.getFieldValue('Body') }}
                  /> */}
                  <div
                    style={{
                      border: "1px solid #d9d9d9",
                      padding: "8px",
                      maxHeight: "400px", // Điều chỉnh chiều cao tối đa
                      overflowY: "auto", // Thêm thanh cuộn dọc nếu nội dung quá dài
                      whiteSpace: "pre-wrap", // Giữ định dạng văn bản và cho phép xuống dòng
                      wordBreak: "break-word", // Ngăn văn bản bị tràn ra ngoài
                    }}
                    dangerouslySetInnerHTML={{
                      __html: form.getFieldValue("Body"),
                    }}
                  />
                </Form.Item>
              </Col>
              {/* <Col md={12} span={24}>
                <Form.Item label="Email người gửi" name="From">
                  <Input disabled />
                </Form.Item>
              </Col> */}
              {/* <Col md={12} span={24}>
                <Form.Item label="Tên hiển thị người gửi" name="DisplayName">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="Email phản hồi" name="ReplyTo">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="Tên phản hồi" name="ReplyToName">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="Bcc" name="Bcc">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="Cc" name="Cc">
                  <Input disabled />
                </Form.Item>
              </Col> */}
              {/* <Col md={24} span={24}>
                <Form.Item label="Dữ liệu đính kèm" name="AttachmentData">
                  <Input.TextArea disabled />
                </Form.Item>
              </Col>
              <Col md={24} span={24}>
                <Form.Item label="Headers" name="Headers">
                  <Input.TextArea disabled />
                </Form.Item>
              </Col> */}
            </Row>
          )}

          {service_logs_mgr?.service === "SMS" && (
            <Row gutter={[8, 8]}>
              <Col md={12} span={24}>
                <Form.Item label="Số điện thoại" name="soDienThoai">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="Nội dung tham số" name="noiDungthamSo">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="ID mẫu tin nhắn" name="idMauTin">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="Thời gian gửi" name="gioGui">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="Mã phần mềm" name="maPhanMem">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="Nhà mạng" name="nhaMang">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="Mã hồ sơ" name="MaHoSo">
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
          )}
          {service_logs_mgr?.service === "TBKM" && (
            <Row gutter={[8, 8]}>
              <Col md={12} span={24}>
                <Form.Item label="Dịch vụ" name="service">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="Trạng thái cập nhật" name="isUpdating">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item
                  label="Mã hồ sơ quốc gia"
                  name={["data", "MaHoSoQG"]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item
                  label="Mã thủ tục hành chính"
                  name={["data", "MaTTHC"]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="Số văn bản" name={["data", "SoVanBan"]}>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item
                  label="Ngày nộp hồ sơ"
                  name={["data", "NgayNopHoSo"]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item
                  label="Tên thương nhân"
                  name={["data", "TenThuongNhan"]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>

              {/* Địa chỉ doanh nghiệp */}
              <Col md={12} span={24}>
                <Form.Item
                  label="Mã tỉnh"
                  name={["data", "DiaChiDoanhNghiep", "MaTinh"]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item
                  label="Mã huyện"
                  name={["data", "DiaChiDoanhNghiep", "MaHuyen"]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item
                  label="Mã xã"
                  name={["data", "DiaChiDoanhNghiep", "MaXa"]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={24} span={24}>
                <Form.Item
                  label="Địa chỉ chi tiết"
                  name={["data", "DiaChiDoanhNghiep", "DiaChiChiTiet"]}
                >
                  <Input.TextArea disabled />
                </Form.Item>
              </Col>

              {/* Thông tin liên hệ */}
              <Col md={12} span={24}>
                <Form.Item label="Số điện thoại" name={["data", "DienThoai"]}>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="Số fax" name={["data", "Fax"]}>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="Email" name={["data", "Email"]}>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="Mã số thuế" name={["data", "MaSoThue"]}>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="Người liên hệ" name={["data", "NguoiLienHe"]}>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item
                  label="Số điện thoại người liên hệ"
                  name={["data", "SoDienThoaiNguoiLienHe"]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>

              {/* Thông tin đã nộp */}
              <Col md={24} span={24}>
                <Form.Item
                  label="Mã hồ sơ quốc gia đã nộp"
                  name={["data", "ThongTinDaNop", "MaHoSoQGDNP"]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={24} span={24}>
                <Form.Item
                  label="Số văn bản đã nộp"
                  name={["data", "ThongTinDaNop", "SoVanBanDaNopDNP"]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={24} span={24}>
                <Form.Item
                  label="Ngày nộp hồ sơ đã nộp"
                  name={["data", "ThongTinDaNop", "NgayNopHoSoDNP"]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={24} span={24}>
                <Form.Item
                  label="Tên chương trình khuyến mại đã nộp"
                  name={["data", "ThongTinDaNop", "TenChuongTrinhKhuyenMaiDNP"]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item
                  label="Thời gian khuyến mại từ"
                  name={["data", "ThongTinDaNop", "ThoiGianKhuyenMaiTuDNP"]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item
                  label="Thời gian khuyến mại đến"
                  name={["data", "ThongTinDaNop", "ThoiGianKhuyenMaiDenDNP"]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item
                  label="Địa bàn khuyến mại"
                  name={["data", "ThongTinDaNop", "DiaBanKhuyenMaiDNP"]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>

              {/* Thông tin sửa đổi */}
              <Col md={12} span={24}>
                <Form.Item
                  label="Số lượng hàng hóa dịch vụ khuyến mại"
                  name={["data", "ThongTinSuaDoi", "SoLuongHangHoaDichVuKM"]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item
                  label="Hàng hóa dịch vụ khuyến mại"
                  name={["data", "ThongTinSuaDoi", "HangHoaDichVuKM"]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item
                  label="Cơ cấu giải thưởng khuyến mại"
                  name={["data", "ThongTinSuaDoi", "CoCauGiaiThuongKM"]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={24} span={24}>
                <Form.Item
                  label="Nội dung chi tiết khuyến mại"
                  name={["data", "ThongTinSuaDoi", "NoiDungChiTietKM"]}
                >
                  <Input.TextArea disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item
                  label="Hàng hóa dịch vụ không dùng khuyến mại"
                  name={["data", "ThongTinSuaDoi", "HangHoaDichVuDungKM"]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>

              {/* Thông tin khác */}
              <Col md={12} span={24}>
                <Form.Item
                  label="Lý do điều chỉnh"
                  name={["data", "LyDoDieuChinh"]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={24} span={24}>
                <Form.Item
                  label="Nội dung cam kết khác"
                  name={["data", "NoiDungCamKetKhac"]}
                >
                  <Input.TextArea disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item
                  label="Tên tập đăng ký"
                  name={["data", "TenTepDangKy"]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item
                  label="URL tập đăng ký"
                  name={["data", "URLTepDangKy"]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
          )}

          {service_logs_mgr?.service === "EMC" && (
            <Row gutter={[8, 8]}>
              <Col md={12} span={24}>
                <Form.Item label="Mã hồ sơ" name="CodeProfile">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="ID site" name="SiteId">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="Mã thủ tục hành chính" name="CodeTTHC">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="Tên thủ tục hành chính" name="NameTTHC">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="Mã hồ sơ" name="MaHoSo">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="Trạng thái" name="Status">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="Số mẫu tiếp nhận" name="FormsReception">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="Số mẫu thanh toán" name="FormsPayments">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="Cấp độ" name="Level">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item label="Từ DVCQG" name="IsFromDVCQG">
                  <Checkbox disabled />
                </Form.Item>
              </Col>
              {/* <Col md={12} span={24}>
                <Form.Item label="DVCBC" name="IsDVCBC">
                  <Checkbox disabled />
                </Form.Item>
              </Col>
              <Col md={24} span={24}>
                <Form.Item label="Dữ liệu bổ sung" name="Data">
                  <Input.TextArea disabled />
                </Form.Item>
              </Col>
              <Col md={24} span={24}>
                <Form.Item label="Thông tin người dùng" name="User">
                  <Input.TextArea disabled />
                </Form.Item>
              </Col> */}
            </Row>
          )}
          <Col md={24} span={24}>
            <h6 style={{ color: "#4caf50" }}>Thông tin phản hồi </h6>
            <Col md={24} span={24}>
              <Form.Item label="Kết quả trả về" name="response">
                <TextArea
                  disabled
                  autoSize={{ minRows: 3, maxRows: 10 }} // Điều chỉnh số dòng tối thiểu và tối đa
                  style={{ resize: "none" }} // Ngăn người dùng thay đổi kích thước
                />
              </Form.Item>
            </Col>
          </Col>
          {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <AntdButton type="primary" onClick={onFinish}>
                Xác nhận
              </AntdButton>
              <AntdButton type="default" onClick={handleCancel}>
                Đóng
              </AntdButton>
            </Space>
          </Form.Item> */}
        </Row>
      </Form>
    </AntdModal>
  );
};
