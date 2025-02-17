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
import { getCurrency } from "@/utils";
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
    if (giaoDichThanhToan) {
      
      form.setFieldsValue({
        ...giaoDichThanhToan,
        soTien: getCurrency(giaoDichThanhToan.soTien),
      });
    }
  }, [giaoDichThanhToan]);
  return (
    <div className="container" style={{ marginTop: "50px", padding: "0 16px" }}>
      <Spin spinning={loading}>
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
                name="nguoiNopTienBienLai"
                label={<strong>Họ tên người nộp</strong>}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="soGiayToNguoiNopTienBienLai"
                label={<strong>Số giấy tờ</strong>}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="diaChiBienLai" label={<strong>Địa chỉ</strong>}>
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="maSoThueBienLai"
                label={<strong>Mã số thuế</strong>}
              >
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
              <Form.Item name="soTien" label={<strong>Số tiền (VNĐ)</strong>}>
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
            {giaoDichThanhToan?.duongDanBienLai ? (
              <Col span={24} style={{ textAlign: "center" }}>
                <iframe
                  src={`${window.location.origin}${giaoDichThanhToan?.duongDanBienLai}`}
                  width="100%"
                  height="600px"
                ></iframe>
              </Col>
            ) : null}
          </Row>
        </Form>
      </Spin>
    </div>
  );
};

export default XacNhanThanhToanPortal;
