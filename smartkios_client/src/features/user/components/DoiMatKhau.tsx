import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { IChangePassWord } from "../models";
import { useAppDispatch } from "@/lib/redux/Hooks";
import { ChangePasswordUser } from "../redux/Actions";
import { toast } from "react-toastify";

const Changepassword = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<IChangePassWord>();
  const onFinish = async (value: any) => {
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /[0-9]/;
    const lowercaseRegex = /[a-z]/;
    if (value.newPassword !== value.confirmNewPassword) {
      toast.error("Mật khẩu mới và mật khẩu xác nhận không trùng khớp");
    }
    if (!uppercaseRegex.test(value.newPassword)) {
      toast.error("Mật khẩu mới phải chứa ít nhất một chữ hoa.");
      return;
    }

    if (!digitRegex.test(value.newPassword)) {
      toast.error("Mật khẩu mới phải chứa ít nhất một số.");
      return;
    }
    if (!lowercaseRegex.test(value.newPassword)) {
      toast.error("Mật khẩu mới phải chứa ít nhất một chữ thường.");
      return;
    } else {
      dispatch(ChangePasswordUser({ data: { ...value } }));
    }
    // form.resetFields()
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        name="doimatkhau"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item<IChangePassWord>
          label="Mật khẩu hiện tại"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu hiện tại !" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<IChangePassWord>
          label="Mật khẩu mới"
          name="newPassword"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới !" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<IChangePassWord>
          label="Xác nhận mật khẩu mới"
          name="confirmNewPassword"
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu mới !" },
          ]}
        >
          <Input.Password />
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

export default Changepassword;
