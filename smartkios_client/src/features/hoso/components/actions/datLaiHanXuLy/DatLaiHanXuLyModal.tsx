import { RenderTitle } from "@/components/common";
import { DatLaiNgayHenTra } from "@/features/adminHoSo/redux/action";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { AntdDivider, AntdModal } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Col, DatePicker, Form, Input, Row } from "antd";

export const DatLaiHanXuLyModal = () => {
  const [form] = Form.useForm();
  const buttonActionContext = useButtonActionContext();
  const dispatch = useAppDispatch();
  const { data: hoSo } = useAppSelector((state) => state.hoso);
  const handleCancel = () => {
    buttonActionContext.setDatLaiHanXuLyModalVisible(false);
    form.resetFields();
    buttonActionContext.setSelectedHoSos([]);
  };
  const onOk = async () => {
    if (buttonActionContext.selectedHoSos.length) {
      const res = await dispatch(
        DatLaiNgayHenTra({
          NgayHenTra: form.getFieldValue("ngayHenTra"),
          id: buttonActionContext.selectedHoSos[0] as string,
        })
      ).unwrap();

      handleCancel();
    }
  };
  return (
    <AntdModal
      title={"Đặt lại ngày hẹn trả"}
      visible={true}
      handlerCancel={handleCancel}
      onOk={onOk}
      okText="Xác nhận "
    >
      <Form form={form} layout="vertical" name="datLaiNgayHenTraModal">
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item name="ngayHenTra" label="Ngày hẹn trả">
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
            <AntdDivider />
          </Col>
        </Row>
      </Form>
    </AntdModal>
  );
};
