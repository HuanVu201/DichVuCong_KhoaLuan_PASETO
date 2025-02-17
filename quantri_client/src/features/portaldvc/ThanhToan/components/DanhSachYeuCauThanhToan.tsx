import React, { useEffect } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Space,
  Upload,
} from "antd";
import "./DetailThanhToan.scss";

import { IYeuCauThanhToanPortal } from "../models/YeuCauThanhToanPortal";
import { UseThanhToanContext } from "../context/UseThanhToanContext";
import { IHoSo } from "@/features/hoso/models";
import { getCurrency } from "@/utils";
import { RenderTitle } from "@/components/common";
interface FormThongTinYeuCauThanhToan {
  chuHoSo: string;
  soGiayToChuHoSo: string;
  diaChiChuHoSo: string;
  maHoSo: string;
  tenTTHC: string;
}
export const DanhSachYeuCauThanhToan = ({
  yeuCauThanhToan,
  hoSoInfo,
}: {
  yeuCauThanhToan: IYeuCauThanhToanPortal;
  hoSoInfo: IHoSo | undefined;
}) => {
  const thanhToanContext = UseThanhToanContext();
  const [form] = Form.useForm<FormThongTinYeuCauThanhToan>();
  useEffect(() => {
    if (hoSoInfo) {
      form.setFieldsValue({
        chuHoSo: hoSoInfo?.chuHoSo,
        diaChiChuHoSo: hoSoInfo?.diaChiChuHoSo,
        soGiayToChuHoSo: hoSoInfo?.soGiayToChuHoSo,
        maHoSo: hoSoInfo?.maHoSo,
        tenTTHC: hoSoInfo?.tenTTHC,
      });
    }
  }, [hoSoInfo]);
  const formatter = (value: number | undefined) =>
    value ? getCurrency(value) : "0";
  return (
    <div className="thanhToanBlock">
      <Form form={form} layout="vertical">
        <div className="bodyThanhToan table-responsive">
          <RenderTitle title="THÔNG TIN CHỦ HỒ SƠ" />
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Form.Item label="Chủ hồ sơ" name="chuHoSo">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Số giấy tờ chủ hồ sơ" name="soGiayToChuHoSo">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Địa chỉ chủ hồ sơ" name="diaChiChuHoSo">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Mã hồ sơ" name="maHoSo">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Thủ tục" name="tenTTHC">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <RenderTitle title="THÔNG TIN BIÊN LAI" />
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Form.Item
                label="Tên Đơn vị/người nộp"
                name="nguoiNopTienBienLai"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Mã số thuế" name="maSoThueBienLai">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Địa chỉ" name="diaChiBienLai">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Col span={24}>
            <Row gutter={[8, 8]}>
              <Col span={8}>
                <Form.Item label="Phí">
                  <InputNumber
                    style={{ width: "100%" }}
                    disabled
                    value={parseInt(yeuCauThanhToan.phi)}
                    defaultValue={0}
                    formatter={formatter}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Lệ phí">
                  <InputNumber
                    style={{ width: "100%" }}
                    disabled
                    value={parseInt(yeuCauThanhToan.lePhi)}
                    defaultValue={0}
                    formatter={formatter}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Tổng">
                  <InputNumber
                    style={{ width: "100%" }}
                    disabled
                    value={parseInt(yeuCauThanhToan.soTien)}
                    defaultValue={0}
                    formatter={formatter}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  <Button
                    onClick={() => {
                      thanhToanContext.setMaYeuCauThanhToan(yeuCauThanhToan.id);
                    }}
                  >
                    Thanh toán
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </div>
      </Form>
    </div>
  );
};
