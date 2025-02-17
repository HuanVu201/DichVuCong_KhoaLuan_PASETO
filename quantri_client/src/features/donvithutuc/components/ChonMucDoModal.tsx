import {
  AntdButton,
  AntdModal,
  AntdSelect,
  AntdSpace,
} from "@/lib/antd/components";
import { Col, Form, Row, SelectProps, Spin } from "antd";
import { Suspense, useState } from "react";
import { IUpdateMultiDonViThuTuc } from "../models";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/lib/redux/Hooks";
import { UpdateMultiDonViThuTuc } from "../redux/action";
import { useDonViContext } from "@/features/donvi/contexts/DonViContext";

export const ChonMucDoModal = ({
  handleCancel,
  onReload,
}: {
  handleCancel: () => void;
  onReload: () => void;
}) => {
  const mucDoOptions: SelectProps["options"] = [
    { label: "Dịch vụ công", value: "2" },
    {
      label: "Dịch vụ công trực tuyến một phần",
      value: "3",
    },
    {
      label: "Dịch vụ công trực tuyến toàn trình",
      value: "4",
    },
  ];
  const dispatch = useAppDispatch();
  const donViThuTucContext = useDonViContext();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async () => {
    setLoading(true);
    var mucDo = form.getFieldValue("mucDo");
    if (mucDo) {
      var putData = {
        Ids: donViThuTucContext.selectedDonViThuTucs,
        MucDo: mucDo as string,
      } as IUpdateMultiDonViThuTuc;
      var result = await dispatch(UpdateMultiDonViThuTuc(putData)).unwrap();
      if (result) toast.success("Cập nhật mức độ thành công");
      onReload();
      handleCancel();
    } else {
      toast.warning("Vui lòng chọn mức độ");
    }
    setLoading(false);
  };
  return (
    <AntdModal
      footer={
        <AntdSpace align="center">
          <AntdButton type="primary" onClick={handleSubmit}>
            Xác nhận
          </AntdButton>
          <AntdButton type="default" onClick={handleCancel}>
            Đóng
          </AntdButton>
        </AntdSpace>
      }
      visible={true}
      title="Chọn mức độ"
      handlerCancel={handleCancel}
    >
      <Spin spinning={loading}>
        <Form
          name="ChonMucDo"
          onFinish={handleSubmit}
          layout="horizontal"
          form={form}
          requiredMark={true}
        >
          <Col md={24} span={24}>
            <Form.Item
              name="mucDo"
              rules={[{ required: true, message: "Vui lòng chọn mức độ" }]}
            >
              <AntdSelect options={mucDoOptions}></AntdSelect>
            </Form.Item>
          </Col>
        </Form>
      </Spin>
    </AntdModal>
  );
};
