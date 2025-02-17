import React, { useEffect } from "react";
import { Button, Checkbox, Form, FormProps, Input } from "antd";
import { IChangePassWord, IUser } from "../models";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { ChangePasswordUser, GetUser, GetUserById, UpdateUser } from "../redux/Actions";
import { toast } from "react-toastify";
import { ICredential, IParseUserToken } from "@/models";
import { useMainContext } from "../../../lib/antd/components/layout/context/MainContext";
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload";
import { userService } from "../services";
import { parseJwt } from "@/utils/common";
import { setUserData, UpdateUserData } from "../redux/Slice";
import { setAuth } from "@/features/auth/redux/Slice";

const ThongTinNguoiDung = () => {
  const dispatch = useAppDispatch();
  const { data: user } = useAppSelector((state) => state.user);
  const { data: auth } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm<IUser>();
  const mainContext = useMainContext();
  const dinhKem = Form.useWatch("imageUrl", form)
  // useEffect(() => {
  //   if (user?.id) {
  //     dispatch(GetUserById(user?.id));
  //   }
  // }, [user?.id]);
  const parseToken: IParseUserToken = parseJwt(auth?.token as any)
  
  useEffect(() => {
    if (user) {
      form.setFieldsValue({ ...user } as any);

    }
  }, [user]);
 
  
  const onFinish: FormProps["onFinish"] = async (values) => {
    const res = await userService.UpdateCurrentUser({ ...values, id: user?.id })

    if (res.data.succeeded) {
      dispatch(GetUserById(user?.id as any));
      dispatch(UpdateUserData(user as any))
      toast.success("Cập nhật thông tin người dùng thành công")
    }
    else {
      toast.warn(res.data.message || "Có lỗi khi cập nhật thông tin người dùng")
    }
    // dispatch(UpdateUser({ ...values, id: user?.id }));
    mainContext.setUserInfoModalVisible(false);

  }


  return (
    <div style={{}}>
      <Form
        name="thongtinnguoidung"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item<IUser> label="Tên đầy đủ" name="fullName">
          <Input />
        </Form.Item>

        <Form.Item<IUser> label="Tên người dùng" name="userName">
          <Input disabled />
        </Form.Item>
        <Form.Item<IUser> label="CCCD" name="soCMND">
          <Input disabled />
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
        <Form.Item<IUser> label="Ảnh đại diện" name="imageUrl">
          <RegularUpload
            accept={"image/*"}
            dinhKem={dinhKem}
            fieldName={"imageUrl"}
            folderName={"avata"}
            maxCount={1}
            form={form} />
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
