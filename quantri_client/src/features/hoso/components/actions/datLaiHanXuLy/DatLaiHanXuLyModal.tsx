import { RenderTitle } from "@/components/common";
import { CURRENTTIME_ISOSTRING, FORMAT_DATE, FORMAT_ISO_DATE } from "@/data";
import { DatLaiNgayHenTra } from "@/features/adminHoSo/redux/action";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { AntdDivider, AntdModal } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Col, DatePicker, Form, Input, Row } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
export const DatLaiHanXuLyModal = () => {
  const [form] = Form.useForm();
  const buttonActionContext = useButtonActionContext();
  const dispatch = useAppDispatch();
  const [btnLoading, setBtnLoading] = useState(false)
  const handleCancel = () => {
    buttonActionContext.setDatLaiHanXuLyModalVisible(false);
    form.resetFields();
    buttonActionContext.setSelectedHoSos([]);
    setBtnLoading(false)
  };
  const onOk = async () => {
    if (buttonActionContext.selectedHoSos.length) {
     setBtnLoading(true)
     try {
      const res = await dispatch(
        DatLaiNgayHenTra({
          NgayHenTra: form.getFieldValue("ngayHenTra")
            ? dayjs(form.getFieldValue("ngayHenTra")).format(FORMAT_ISO_DATE)
            : "",
          id: buttonActionContext.selectedHoSos[0] as string,
        })
      ).unwrap();
      handleCancel();
     } catch (error) {
      setBtnLoading(false)
     } finally {
      setBtnLoading(false)
     }
    }
  };
  return (
    <AntdModal
      title={"Đặt lại ngày hẹn trả"}
      visible={true}
      handlerCancel={handleCancel}
      confirmLoading={btnLoading}
      onOk={onOk}
      okText="Xác nhận "
    >
      <Form form={form} layout="vertical" name="datLaiNgayHenTraModal">
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item
              name="ngayHenTra"
              label="Ngày hẹn trả"
              rules={[{ required: true, message: "Không được để trống" }]}
            >
              <DatePicker format={FORMAT_DATE} showTime />
            </Form.Item>
            <AntdDivider />
          </Col>
        </Row>
      </Form>
    </AntdModal>
  );
};
