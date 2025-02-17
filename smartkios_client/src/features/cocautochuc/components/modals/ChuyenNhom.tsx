import { IUser } from "@/features/user/models";
import { ChangeUserGroup } from "@/features/user/redux/Actions";
import {
  AntdButton,
  AntdModal,
  AntdSelect,
  AntdSpace,
  AntdTab,
  AntdUpLoad,
  IAntdTabsProps,
} from "@/lib/antd/components";
import { AntdTreeSelect } from "@/lib/antd/components/select/TreeSelect";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Col, Form, FormProps, Input, InputNumber, Row } from "antd";
import { DataNode } from "antd/es/tree";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useCoCauModalContext } from "../../contexts/CoCauModalContext";
const INPUT_RULES = {
  groupName: [{ required: true, message: "Không được để trống!" }],
  groupCode: [{ required: true, message: "Không được để trống!" }],
};
export const ChuyenNhomModal = ({
  visible,
  handleCancel,
}: {
  visible: boolean;
  handleCancel: () => void;
}) => {
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const dispatch = useAppDispatch();
  const coCauModalContext = useCoCauModalContext();
  const handleSubmit: FormProps["onFinish"] = (values) => {
    if (coCauModalContext.selectedUser?.id) {
      let postData = {
        ...values,
        id: coCauModalContext.selectedUser?.id,
        oldGroupCode: coCauModalContext.selectedUser.groupCode,
      };
      dispatch(ChangeUserGroup(postData));
    }

    handleCancel();
  };
  const [form] = Form.useForm();

  return (
    <>
      <AntdModal
        title="Chuyển nhóm"
        handlerCancel={handleCancel}
        visible={visible}
        footer={null}
        destroyOnClose
      >
        <Form
          name="CoCauToChuc"
          layout="vertical"
          onFinish={handleSubmit}
          form={form}
          requiredMark={true}
        >
          <Row gutter={[8, 8]}>
            <Col md={24} span={24}>
              <Form.Item
                name="groupCode"
                label="Danh sách nhóm"
                required
                rules={INPUT_RULES.groupCode}
              >
                <AntdTreeSelect
                  generateOptions={{
                    model: coCauToChucs,
                    title: "groupName",
                    value: "groupCode",
                    parentKey: "ofGroupCode",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <AntdSpace align="center">
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
    </>
  );
};
