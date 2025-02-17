import { Form, Input, Space, Row } from "antd";
import { CollapseContent } from "../../../components/common/CollapseContent";
import { AntdButton } from "../../../lib/antd/components";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import {
  INguoiDungNhomNguoiDung,
  ISearchNguoiDungNhomNguoiDung,
} from "../models";
import { useCallback } from "react";
import { useNguoiDungNhomNguoiDungContext } from "../contexts/NguoiDungNhomNguoiDungContext";
import { useNhomNguoiDungContext } from "@/features/nhomnguoidung/contexts/NhomNguoiDungContext";

export const NguoiDungNhomNguoiDungSearchDonVi = ({
  setSearchParams,
}: {
  setSearchParams: React.Dispatch<
    React.SetStateAction<ISearchNguoiDungNhomNguoiDung>
  >;
}) => {
  const nguoiDungNhomNguoiDungContext = useNguoiDungNhomNguoiDungContext();
  const nhomNguoiDungContext = useNhomNguoiDungContext();
  const { data: user } = useAppSelector(state => state.user)
  const [form] = Form.useForm();
  const onFinish = (values: ISearchNguoiDungNhomNguoiDung) => {
    setSearchParams((curr) => ({ ...curr, ...values }));
  };
  const resetSearchParams = useCallback(() => {
    setSearchParams({
      pageNumber: 1,
      pageSize: 50,
      reFetch: true,
      nhomNguoiDungId: nhomNguoiDungContext.nhomNguoiDungId,
      orderBy: ["OfficeCode", "FullName"],
      userGroupCode: user?.officeCode,
      loaiBuoc: "Khác"
    });
    form.resetFields();
  }, []);
  return (
    <CollapseContent
      extraButtons={[
        <AntdButton
          onClick={() => {
            nguoiDungNhomNguoiDungContext.setThemNguoiDungModalVisible(true);
          }}
        >
          Thêm mới
        </AntdButton>,
        <AntdButton
          onClick={() => {
            nguoiDungNhomNguoiDungContext.setPhanQuyenNguoiDungModalVisible(true);
          }}        >
          Phân quyền
        </AntdButton>
      ]}
    >
      <Form
        name="NguoiDungNhomNguoiDungSearch"
        layout="vertical"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item label="Tên nhóm người dùng" name="officeName">
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
