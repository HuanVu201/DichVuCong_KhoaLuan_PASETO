import { AntdModal } from "@/lib/antd/components";
import { Col, Form, FormProps, Input, Row, Select } from "antd";
import { IYeuCauThanhToan } from "../../models/YeuCauThanhToan";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/redux/Hooks";
import {
  GetYeuCauThanhToan,
  PayYeuCauThanhToan,
} from "@/features/yeucauthanhtoan/redux/action";
import { SelectProps } from "antd/lib";
const DA_THANH_TOAN = "Đã thanh toán";
const HINH_THUC_THANH_TOAN: SelectProps["options"] = [
  { value: "tien-mat", label: "Tiền mặt" },
  { value: "chuyen-khoan", label: "Chuyển khoản" },
  { value: "truc-tuyen", label: "Trực tuyến" },
];
export const ThanhToan = ({
  handleCancel,
  reFetch,
  YeuCauThanhToanId,
}: {
  handleCancel: () => void;
  reFetch: () => void;
  YeuCauThanhToanId: React.Key[];
}) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<IYeuCauThanhToan>();

  const onOk: FormProps["onFinish"] = async () => {
    var postData = {
      id: YeuCauThanhToanId.toString(),
      data: {
        ids: [YeuCauThanhToanId.toString()],
        trangThai: DA_THANH_TOAN,
        hinhThucThanhToan: form.getFieldValue("hinhThucThanhToan"),
        ghiChu: form.getFieldValue("ghiChu"),
      },
    };
    var resPay = await dispatch(PayYeuCauThanhToan(postData)).unwrap();
    reFetch();
    handleCancel();
  };
  useEffect(() => {
    (async () => {
      var yeuCauThanhToan = await dispatch(
        GetYeuCauThanhToan(YeuCauThanhToanId.toString())
      ).unwrap();
      form.setFieldsValue(yeuCauThanhToan.data);
    })();
  }, []);
  return (
    <AntdModal
      title="Thanh toán"
      visible={true}
      handlerCancel={handleCancel}
      onOk={onOk}
      okText="Xác nhận"
      fullsizeScrollable
    >
      <Form form={form} layout="vertical">
        <Row gutter={[8, 0]}>
          <Col md={12} span={24}>
            <Form.Item name="maHoSo" label="Mã hồ sơ">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item name="tenNguoiYeuCau" label="Người yêu cầu">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item name="hinhThucThanhToan" label="Hình thức thanh toán">
              <Select
                options={HINH_THUC_THANH_TOAN}
                placeholder="Chọn hình thức thanh toán"
              />
            </Form.Item>
          </Col>
          <Col md={12} span={24}></Col>
          <Col md={8} span={24}>
            <Form.Item name="phi" label="Phí">
              <Input />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item name="lePhi" label="Lệ phí">
              <Input />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item name="soTien" label="Thành tiền">
              <Input />
            </Form.Item>
          </Col>
          <Col md={24} span={24}>
            <Form.Item name="ghiChu" label="Ghi chú">
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </AntdModal>
  );
};
