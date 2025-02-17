import { AntdModal } from "@/lib/antd/components";
import {
  Col,
  Form,
  FormProps,
  Input,
  InputNumber,
  Row,
  Select,
  Spin,
} from "antd";
import { IYeuCauThanhToan } from "../../models/YeuCauThanhToan";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  GetYeuCauThanhToan,
  PayYeuCauThanhToan,
} from "@/features/yeucauthanhtoan/redux/action";
import { SelectProps } from "antd/lib";
import TextArea from "antd/es/input/TextArea";
import { RenderTitle } from "@/components/common";
import { getCurrency, numberToCurrencyText } from "@/utils";
import { TRANGTHAITHUPHI } from "../../constants/TrangThaiConstant";

const HINH_THUC_THANH_TOAN: SelectProps["options"] = [
  { value: "tien-mat", label: "Tiền mặt" },
  { value: "chuyen-khoan", label: "Chuyển khoản" },
  { value: "truc-tuyen", label: "Trực tuyến" },
];
const formatter = (value: number | undefined) =>
  value ? getCurrency(value) : "0";
export const HuyThanhToan = ({
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
  var sotien = Form.useWatch("soTien", form);
  const { loading } = useAppSelector((state) => state.yeucauthanhtoan);
  const onOk: FormProps["onFinish"] = async () => {
    var postData = {
      id: YeuCauThanhToanId[0].toString(),
      data: {
        ids: [YeuCauThanhToanId[0].toString()],
        trangThai: TRANGTHAITHUPHI.HUY_THANH_TOAN,
        hinhThucThanhToan: form.getFieldValue("hinhThucThanhToan"),
        lyDoHuy: form.getFieldValue("lyDoHuy"),
      },
    };
    var resPay = await dispatch(PayYeuCauThanhToan(postData)).unwrap();
    reFetch();
    handleCancel();
  };
  useEffect(() => {
    if (sotien) {
      var bangChu = numberToCurrencyText(parseInt(sotien));
      form.setFieldValue("bangChu", bangChu);
    }
  }, [sotien]);
  useEffect(() => {
    (async () => {
      var yeuCauThanhToan = await dispatch(
        GetYeuCauThanhToan(YeuCauThanhToanId[0].toString())
      ).unwrap();
      form.setFieldsValue({
        phi: yeuCauThanhToan.data.phi,
        lePhi: yeuCauThanhToan.data.lePhi,
        hinhThucThanhToan: yeuCauThanhToan.data.hinhThucThanhToan ?? "tien-mat",
        maHoSo: yeuCauThanhToan.data.maHoSo,
        ghiChu: yeuCauThanhToan.data.ghiChuThanhToan,
        soTien: yeuCauThanhToan.data.phi + yeuCauThanhToan.data.lePhi,
        hinhThucThu: yeuCauThanhToan.data.hinhThucThu,
        phiTheoTTHC: yeuCauThanhToan.data.phiTheoTTHC,
        lePhiTheoTTHC: yeuCauThanhToan.data.lePhiTheoTTHC,
        nguoiNopTienBienLai:
          yeuCauThanhToan.data.nguoiNopTienBienLai ??
          yeuCauThanhToan.data.chuHoSo,
        diaChiBienLai:
          yeuCauThanhToan.data.diaChiBienLai ??
          yeuCauThanhToan.data.diaChiChuHoSo,
        maSoThueBienLai: yeuCauThanhToan.data.maSoThueBienLai,
        tenTTHC: yeuCauThanhToan.data.tenTTHC,
        noiDung: yeuCauThanhToan.data.tenTTHC,
        tenPhiBienLai: "Phí " + yeuCauThanhToan.data.tenTTHC,
        tenLePhiBienLai: "Lệ phí " + yeuCauThanhToan.data.tenTTHC,
      });
    })();
  }, []);
  return (
    <AntdModal
      title="Hoàn phí"
      visible={true}
      handlerCancel={handleCancel}
      onOk={onOk}
      okText="Xác nhận"
      fullsizeScrollable
    >
      <Spin spinning={loading}>
        <Form
          form={form}
          layout="vertical"
          onFieldsChange={(fieldChange: any) => {
            if (fieldChange && fieldChange[0]) {
              if (
                fieldChange[0].name[0] == "phi" ||
                fieldChange[0].name[0] == "lePhi"
              ) {
                var phi = form.getFieldValue("phi") ?? 0;
                var lePhi = form.getFieldValue("lePhi") ?? 0;
                var tongSo = phi + lePhi;
                form.setFieldValue("soTien", tongSo);
              }
            }
          }}
        >
          <Row gutter={[8, 0]}>
            <Col md={24} span={24}>
              <RenderTitle title="HÌNH THỨC THU PHÍ" />
            </Col>
            <Col md={8} span={24}>
              <Form.Item name="phi" label="Phí thu (VNĐ)">
                <InputNumber
                  disabled
                  defaultValue={0}
                  formatter={formatter}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col md={8} span={24}>
              <Form.Item name="lePhi" label="Lệ phí thu (VNĐ)">
                <InputNumber
                  disabled
                  defaultValue={0}
                  formatter={formatter}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col md={8} span={24}>
              <Form.Item name="soTien" label="Thành tiền (VNĐ)">
                <InputNumber
                  defaultValue={0}
                  formatter={formatter}
                  style={{ width: "100%" }}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Bằng chữ" name="bangChu">
                <Input style={{ width: "100%" }} disabled />
              </Form.Item>
            </Col>
            <Col md={12} span={24}>
              <Form.Item name="hinhThucThu" label="Hình thức thu phí">
                <Input disabled />
              </Form.Item>
            </Col>

            <Col md={12} span={24}>
              <Form.Item name="nguoiNopTienBienLai" label="Họ tên người nộp">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col md={12} span={24}>
              <Form.Item name="diaChiBienLai" label="Địa chỉ chủ hồ sơ">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col md={12} span={24}>
              <Form.Item name="maSoThueBienLai" label="Mã số thuế chủ hồ sơ">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col md={24} span={24}>
              <RenderTitle title="HÌNH THỨC THANH TOÁN" />
            </Col>
            <Col md={12} span={24}>
              <Form.Item name="hinhThucThanhToan" label="Hình thức thanh toán">
                <Select
                  disabled
                  options={HINH_THUC_THANH_TOAN}
                  placeholder="Chọn hình thức thanh toán"
                />
              </Form.Item>
            </Col>
            <Col md={12} span={24}></Col>
            <Col md={12} span={24}>
              <Form.Item name="tenTTHC" label="Tên thủ tục">
                <TextArea cols={3} disabled />
              </Form.Item>
            </Col>
            <Col md={12} span={24}>
              <Form.Item name="noiDung" label="Nội dung">
                <TextArea cols={3} disabled />
              </Form.Item>
            </Col>
            <Col md={24} span={24}>
              <Form.Item name="lyDoHuy" label="Lý do">
                <TextArea cols={3} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </AntdModal>
  );
};
