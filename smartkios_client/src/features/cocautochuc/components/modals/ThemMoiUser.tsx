import { useEffect, useState } from "react";
import {
  CreateUser,
  CreateUserWithDefaultPassword,
  GetUserById,
  UpdateUser,
} from "@/features/user/redux/Actions";
import {
  AntdButton,
  AntdModal,
  AntdSelect,
  AntdSelectProps,
  AntdSpace,
  AntdTab,
  AntdUpLoad,
  IAntdTabsProps,
} from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Col, Form, FormProps, Input, InputNumber, Row, Spin } from "antd";
import { useCoCauModalContext } from "../../contexts/CoCauModalContext";
import { useFolderContext } from "@/contexts/FolderContext";
import { IUser } from "../../../user/models";
import { IOmitUpdate, IPickSearch } from "@/models";
import { OptionProps } from "antd/es/select";
import { danhMucChungApi } from "@/features/danhmucdungchung/services";
import { IDanhMucChung } from "@/features/danhmucdungchung/models";
import { SelectProps } from "antd/lib";
import { ICoCauToChuc, ISearchCoCauToChuc } from "../../models";
import { coCauToChucService } from "../../services";
import { userService } from "@/features/user/services";
const INPUT_RULES = {
  ACCOUNT: [
    {
      required: true,
      message: "Không được để trống!",
    },
  ],
  PASSWORD: [
    {
      required: true,
      message: "Không được để trống!",
    },
  ],
  FULLNAME: [
    {
      required: true,
      message: "Không được để trống!",
    },
  ],
  OFFICECODE: [
    {
      required: true,
      message: "Không được để trống!",
    },
  ],
  EMAIL: [
    {
      required: true,
      message: "Không được để trống!",
    },
  ],
  PHONENUMBER: [
    {
      type: "regexp",
      pattern: new RegExp(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g),
      message: "Số điện thoại không đúng định dạng",
    },
  ] as any,
};

export const ThemMoiUser = ({
  handlerClose,
  visible,
  selectedUser,
}: {
  handlerClose: () => void;
  visible: boolean;
  selectedUser?: IUser;
}) => {
  const { data: user } = useAppSelector((state) => state.user);
  const folderContext = useFolderContext();
  const modalContext = useCoCauModalContext();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [positionOptions, setPositionOptions] = useState<
    SelectProps["options"]
  >([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { datas: coCauToChucs, data: coCauToChuc } = useAppSelector(
    (state) => state.cocautochuc
  );
  const onFinish: FormProps["onFinish"] = (values) => {
    var tmpPosition = positionOptions?.find(
      (x) => x.value == values.positionName
    );
    var tmpOffice = coCauToChucs?.find((x) => x.groupCode == values.officeCode);
    var tmpGroupCode = coCauToChucs?.find(
      (x) => x.groupCode == folderContext.folderId
    );
    if (!selectedUser?.id) {
      let postData = {
        ...values,
        confirmPassword: values["password"],
        groupCode: folderContext.folderId,
        groupName: tmpGroupCode?.groupName,
        positionName: tmpPosition?.label,
        officeName: tmpOffice?.groupName,
        maDinhDanhOfficeCode: tmpOffice?.maDinhDanh,
        email: values?.email ? values?.email : `${values?.userName}@email.com`,
        typeUser: "CanBo",
      };
      dispatch(CreateUserWithDefaultPassword(postData));
    } else {
      let postData = {
        ...values,
        id: selectedUser?.id,
        positionName: tmpPosition?.label,
        officeName: tmpOffice?.groupName,
        maDinhDanhOfficeCode: tmpOffice?.maDinhDanh,
        email: values?.email ? values?.email : `${values?.userName}@email.com`,
      };
      dispatch(UpdateUser(postData));
    }

    handleCancel();
  };
  const handleCancel = () => {
    form.resetFields();

    handlerClose();
  };
  const loadPositions = async () => {
    let positionParams: IPickSearch<IDanhMucChung, "type"> = {
      pageNumber: 1,
      pageSize: 1000,
      type: "chuc-vu",
    };
    let resPositions = await danhMucChungApi.Search(positionParams);
    if (resPositions?.data && resPositions?.data?.data) {
      let tmpPositionOptions = resPositions.data.data.map((i) => {
        return {
          value: i.code,
          label: i.tenDanhMuc,
        };
      });
      setPositionOptions(tmpPositionOptions);
    }
  };

  const loadUserInfor = async () => {
    if (selectedUser?.id) {
      let tmpUser = await userService.GetById(selectedUser.id);
      if (tmpUser?.data) {
        form.setFieldsValue(tmpUser?.data);
      }
    }
  };
  useEffect(() => {
    (async () => {
      setIsLoading(true);

      await loadPositions();
      await loadUserInfor();
      setIsLoading(false);
    })();
  }, []);
  const TABDATA: IAntdTabsProps["items"] = [
    {
      label: "Thông tin người dùng",
      key: "thong-tin-nguoi-dung",
      children: (
        <Row gutter={[8, 8]}>
          <Col md={12} span={24}>
            <Col md={12} span={24}>
              <Form.Item label="Nhóm" name="groupCode" hidden>
                <Input />
              </Form.Item>
            </Col>
            <Form.Item
              label="Tên đăng nhập"
              name="userName"
              required
              rules={INPUT_RULES.ACCOUNT}
            >
              <Input disabled={selectedUser?.id ? true : false} />
            </Form.Item>
          </Col>
          {/* <Col md={12} span={24}>
            <Form.Item
              label="Mật khẩu"
              name="password"
              required
              rules={INPUT_RULES.PASSWORD}
            >
              <Input type="password" />
            </Form.Item>
          </Col> */}
          <Col md={12} span={24}>
            <Form.Item
              label="Họ và tên"
              name="fullName"
              required
              rules={INPUT_RULES.FULLNAME}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Chức vụ" name="positionName">
              <AntdSelect showSearch options={positionOptions} />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Đơn vị"
              name="officeCode"
              rules={INPUT_RULES.OFFICECODE}
            >
              <AntdSelect
                generateOptions={{
                  model: coCauToChucs,
                  label: "groupName",
                  value: "groupCode",
                }}
              />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Điện thoại" name="phoneNumber">
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Số CCCD" name="soDinhDanh">
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Chức danh" name="chucDanh">
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Thứ tự" name="userOrder">
              <InputNumber style={{ width: "100%" }} defaultValue={1} />
            </Form.Item>
          </Col>
          {/* <Col md={12} span={24}>
              <Form.Item
                  label="Thứ tự"
                  name="thuTu"
              >
                  <InputNumber min={1} />
              </Form.Item>
          </Col> */}
        </Row>
      ),
    },
    // {
    //   label: "Vai trò",
    //   key: "vai-tro",
    //   children: (
    //     <Row gutter={[8, 8]}>
    //       <Col md={12} span={24}>
    //         <Form.Item label="Tên tài khoản" name="tenusers">
    //           <Input />
    //         </Form.Item>
    //       </Col>
    //       <Col md={12} span={24}>
    //         <Form.Item label="Họ và tên" name="tomTat">
    //           <Input />
    //         </Form.Item>
    //       </Col>
    //       <Col md={12} span={24}>
    //         <Form.Item label="Thứ tự" name="thuTu">
    //           <InputNumber min={1} />
    //         </Form.Item>
    //       </Col>
    //     </Row>
    //   ),
    // },
  ];
  return (
    <AntdModal
      title={selectedUser ? "Sửa thông tin người dùng" : "Thêm mới người dùng"}
      handlerCancel={handleCancel}
      visible={visible}
      footer={null}
      // xóa modal khỏi dom khi đóng modal thay vì ẩn (nên xóa khi xử lý nhiều form trên 1 trang)
      destroyOnClose
    >
      <Form
        name="users"
        layout="vertical"
        onFinish={onFinish}
        form={form}
        requiredMark={true}
      >
        <Spin spinning={isLoading}>
          <AntdTab items={TABDATA}></AntdTab>
        </Spin>

        <Form.Item wrapperCol={{ offset: 16, span: 24 }}>
          <AntdSpace>
            <AntdButton type="primary" htmlType="submit">
              Xác nhận
            </AntdButton>
            <AntdButton type="default" onClick={handleCancel}>
              Đóng
            </AntdButton>
          </AntdSpace>
        </Form.Item>
      </Form>
    </AntdModal>
  );
};
