import React, { useEffect } from "react";
import { Button, Col, Form, Input, Popconfirm, Row, Space, Upload } from "antd";
import "./DetailThanhToan.scss";

import { IYeuCauThanhToanPortal } from "../models/YeuCauThanhToanPortal";
import { UseThanhToanContext } from "../context/UseThanhToanContext";
import { IHoSo } from "@/features/hoso/models";
interface FormThongTinYeuCauThanhToan {
  chuHoSo: string;
  soGiayToChuHoSo: string;
  diaChiChuHoSo: string;
  maHoSo: string;
  tenTTHC: string;
}
export const DanhSachYeuCauThanhToan = ({
  yeuCauThanhToans,
  hoSoInfo,
}: {
  yeuCauThanhToans: IYeuCauThanhToanPortal[];
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
  return (
    <div className="thanhToanBlock">
      <div className="header">
        <h3>THÔNG TIN THANH TOÁN</h3>
      </div>
      <Form form={form} layout="vertical">
        <div className="bodyThanhToan table-responsive">
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
          <Col span={24}>
            {yeuCauThanhToans.map((item: IYeuCauThanhToanPortal) => {
              return (
                <Row gutter={[8, 8]}>
                  <Col span={8}>
                    <Form.Item label="Phí">
                      <Input value={item.phi} disabled />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Lệ phí">
                      <Input value={item.lePhi} disabled />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Tổng">
                      <Input value={item.soTien} disabled />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item>
                      <Button
                        onClick={() => {
                          thanhToanContext.setMaYeuCauThanhToan(item.id);
                        }}
                      >
                        Thanh toán
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              );
            })}
          </Col>
        </div>
      </Form>
    </div>
  );
};
