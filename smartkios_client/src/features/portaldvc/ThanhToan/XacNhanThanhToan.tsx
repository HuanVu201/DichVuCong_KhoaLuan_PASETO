import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  IGiaoDichThanhToan,
  IGiaoDichThanhToanDetailPortal,
} from "./models/GiaoDichThanhToan";
import { giaoDichThanhToanApi } from "./services/GiaoDichThanhToanServices";
import { Button, Col, Form, Input, Row, Spin, Tag } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { GetGiaoDichThanhToanByMaThamChieu } from "./redux/action";
import { Document, Page } from "react-pdf";
const XacNhanThanhToanPortal = () => {
  const location = useLocation();
  const { giaoDichThanhToanDetail: giaoDichThanhToan, loading } =
    useAppSelector((state) => state.portalThanhToan);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispath = useAppDispatch();
  const [form] = Form.useForm<IGiaoDichThanhToanDetailPortal>();
  const [maLoi, setMaLoi] = useState<string>("");
  useEffect(() => {
    (async () => {
      var maThamChieu = searchParams.get("data");
      setMaLoi(searchParams.get("responseCode") ?? "");
      var maXacThuc = searchParams.get("secureCode");
      if (maThamChieu) {
        var res = await dispath(GetGiaoDichThanhToanByMaThamChieu(maThamChieu));
      }
    })();
  }, [searchParams]);
  useEffect(() => {
    if (giaoDichThanhToan) form.setFieldsValue(giaoDichThanhToan);
  }, [giaoDichThanhToan]);
  return (
    <Spin spinning={loading}>
      <div className="container">
        <Form
          form={form}
          title="Xác nhận thanh toán"
          layout="horizontal"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
        >
          <Row gutter={[4, 4]}>
            <Form.Item name="maThamChieu" hidden>
              <Input disabled />
            </Form.Item>
            <Col span={24}>
              <Form.Item
                name="hoTenNguoiNop"
                label={<strong>Họ tên người nộp</strong>}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="soCMNDNguoiNop"
                label={<strong>Số giấy tờ</strong>}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="diaChiNguoiNop" label={<strong>Địa chỉ</strong>}>
                <Input disabled />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="tenThuTucDVCQG" label={<strong>Thủ tục</strong>}>
                <Input.TextArea rows={3} disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="hoSo" label={<strong>Mã hồ sơ</strong>}>
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="soTien" label={<strong>Số tiền</strong>}>
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="trangThai" label={<strong>Trạng thái</strong>}>
                {maLoi == "00" ? (
                  <Tag color="success">Thanh toán thành công</Tag>
                ) : (
                  <Tag color="error">Thanh toán thất bại</Tag>
                )}
              </Form.Item>
            </Col>
            <Col span={24} style={{ textAlign: "center" }}>
              {/* <Document file="https://pakn.ninhthuan.gov.vn/TepDinhKem/2024-03/133(07.03.2024_11h01p59)_signed.pdf">
                <Page pageNumber={1} />
              </Document> */}
              <iframe
                src={`https://docs.google.com/gview?embedded=true&url=${window.location.origin}/${giaoDichThanhToan?.duongDanBienLai}`}
                width="100%"
                height="600px"
              ></iframe>
            </Col>
          </Row>
        </Form>
      </div>
    </Spin>
  );
};

export default XacNhanThanhToanPortal;
