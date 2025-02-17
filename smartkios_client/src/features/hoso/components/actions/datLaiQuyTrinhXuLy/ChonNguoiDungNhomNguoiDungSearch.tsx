import { CollapseContent } from "@/components/common";
import { useNguoiDungNhomNguoiDungContext } from "@/features/nguoidungnhomnguoidung/contexts/NguoiDungNhomNguoiDungContext";
import { ISearchNguoiDungNhomNguoiDung } from "@/features/nguoidungnhomnguoidung/models";
import { AntdButton } from "@/lib/antd/components";
import { Form, Input, Row, Space } from "antd";
import { useCallback } from "react";

export const ChonNguoiDungNhomNguoiDungSearch = ({
  setSearchParams,
}: {
  setSearchParams: React.Dispatch<
    React.SetStateAction<ISearchNguoiDungNhomNguoiDung>
  >;
}) => {
  const nguoiDungNhomNguoiDungContext = useNguoiDungNhomNguoiDungContext();

  const [form] = Form.useForm();
  const onFinish = (values: ISearchNguoiDungNhomNguoiDung) => {
    setSearchParams((curr) => ({ ...curr, ...values }));
  };
  const resetSearchParams = useCallback(() => {
    form.resetFields();
    setSearchParams((curr) => ({ ...curr, tenNhomNguoiDung: undefined }));
  }, []);
  return (
    <CollapseContent>
      <Form
        name="NguoiDungNhomNguoiDungSearch"
        layout="vertical"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item label="Tên nhóm người dùng" name="tenNhomNguoiDung">
          <Input />
        </Form.Item>
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
