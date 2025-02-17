import { Form, Input, Space, Row, Col, DatePicker } from "antd";
import { CollapseContent } from "../../../components/common/CollapseContent";
import { AntdButton } from "../../../lib/antd/components";
import { useAppDispatch } from "../../../lib/redux/Hooks";
import { IHuongDanNopHoSo, ISearchHuongDanNopHoSo } from "../models";
import { useCallback } from "react";
import { HuongDanNopHoSoDetail } from "./HuongDanNopHoSoDetail";
import { useHuongDanNopHoSoContext } from "../contexts/HuongDanNopHoSoContext";
import { FORMAT_DATE } from "@/data";

export const HuongDanNopHoSoSearch = ({
  setSearchParams,
}: {
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchHuongDanNopHoSo>>;
}) => {
  const huongDanNopHoSoContext = useHuongDanNopHoSoContext();
  const [form] = Form.useForm();
  const onFinish = (values: ISearchHuongDanNopHoSo) => {
    setSearchParams((curr) => ({ ...curr, ...values }));
  };
  const resetSearchParams = useCallback(() => {
    setSearchParams({ reFetch: true });
    form.resetFields();
  }, []);
  return (
    <CollapseContent
      extraButtons={[
            <AntdButton
              type="primary"
              onClick={() => {
                huongDanNopHoSoContext.setHuongDanNopHoSoModalVisible(true);
              }}
            >
              Thêm mới
            </AntdButton>
      
      ]}
    >
      <Form
        name="huongDanNopHoSoSearch"
        layout="vertical"
        onFinish={onFinish}
        form={form}
      >
        <Row gutter={[8, 8]}>
          <Col md={12} span={24}>
            <Form.Item label="Tìm kiếm" name="tuKhoa">
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}></Col>

          <Col md={12} span={24}>
            <Form.Item label="Tiếp nhận ngày" name="tuNgay">
              <DatePicker
                format={FORMAT_DATE}
                showTime
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Đến ngày" name="denNgay">
              <DatePicker
                format={FORMAT_DATE}
                showTime
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Row justify="space-around">
            <Space size="large">
              <AntdButton type="primary" htmlType="submit">
                Xác nhận
              </AntdButton>
              <AntdButton type="default" onClick={resetSearchParams}>
                Tải lại
              </AntdButton>
            </Space>
          </Row>
        </Form.Item>
      </Form>
    </CollapseContent>
  );
};
