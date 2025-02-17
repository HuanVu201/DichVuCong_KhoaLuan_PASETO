import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { IChangePassWord, IUser } from "../models";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { ChangePasswordUser, GetUser } from "../redux/Actions";
import { toast } from "react-toastify";
import { ICredential } from "@/models";

const ThongTinNguoiDung = () => {
  const dispatch = useAppDispatch();
  const { data: user } = useAppSelector((state) => state.user);
  const [form] = Form.useForm<IUser>();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({ ...user } as any);
      // console.log(user);
    }
  }, [user]);
  return (
    <div style={{}}>
      <Form
        name="thongtinnguoidung"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
      >
        <Form.Item<IUser> label="Tên đầy đủ" name="fullName">
          <Input />
        </Form.Item>

        <Form.Item<IUser> label="Tên người dùng" name="userName">
          <Input />
        </Form.Item>
        {/* <Form.Item<IUser>
                    label="Họ"
                    name="firstName"
                >
                    <Input />
                </Form.Item>

                <Form.Item<IUser>
                    label="Tên"
                    name="lastName"
                >
                    <Input />
                </Form.Item> */}
        <Form.Item<IUser> label="Số điện thoại" name="phoneNumber">
          <Input />
        </Form.Item>
        <Form.Item<IUser> label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ThongTinNguoiDung;
