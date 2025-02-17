import { AntdButton, AntdModal, AntdSpace } from "@/lib/antd/components";
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

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  GetYeuCauThanhToan,
  PayYeuCauThanhToan,
  YeuCauThanhToanLai,
} from "@/features/yeucauthanhtoan/redux/action";
import { SelectProps } from "antd/lib";
import { RenderTitle } from "@/components/common";
import { getCurrency, numberToCurrencyText } from "@/utils";
import TextArea from "antd/es/input/TextArea";
import { IYeuCauThanhToan } from "../../models/YeuCauThanhToan";
const DA_THANH_TOAN = "Đã thanh toán";
const HINH_THUC_THANH_TOAN: SelectProps["options"] = [
  { value: "tien-mat", label: "Tiền mặt" },
  { value: "chuyen-khoan", label: "Chuyển khoản" },
  { value: "truc-tuyen", label: "Trực tuyến" },
];
export const YeuCauThanhToanLaiModal = ({
  handleCancel,
  reFetch,
  YeuCauThanhToanId,
}: {
  handleCancel: () => void;
  reFetch: () => void;
  YeuCauThanhToanId: React.Key[];
}) => {
  const { loading } = useAppSelector((state) => state.yeucauthanhtoan);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<IYeuCauThanhToan>();
  const tongSo = Form.useWatch("soTien", form);
  const formatter = (value: number | undefined) =>
    value ? getCurrency(value) : "0";
  const onOk: FormProps["onFinish"] = async () => {
    var postData = {
      id: YeuCauThanhToanId.toString(),
      data: {
        id: YeuCauThanhToanId.toString(),
        phi: form.getFieldValue("phi"),
        lePhi: form.getFieldValue("lePhi"),
      },
    };
    var resPay = await dispatch(YeuCauThanhToanLai(postData)).unwrap();
    reFetch();
    handleCancel();
  };
  useEffect(() => {
    if (tongSo) {
      var bangChu = numberToCurrencyText(parseInt(tongSo));
      form.setFieldValue("bangChu", bangChu);
    }
  }, [tongSo]);
  useEffect(() => {
    (async () => {
      var yeuCauThanhToan = await dispatch(
        GetYeuCauThanhToan(YeuCauThanhToanId.toString())
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
      title=""
      visible={true}
      handlerCancel={handleCancel}
      fullsizeScrollable
      style={{ fontSize: "22px" }}
      footer={
        <AntdSpace>
          <AntdButton onClick={handleCancel} key={"1"}>
            Đóng
          </AntdButton>
          {/* {eFormKetQuaData ? <AntdButton onClick={onExtractDataModify} key={"2"}>Sửa dữ liệu trích xuất OCR</AntdButton> : null} */}
          <AntdButton
            onClick={onOk}
            key={"3"}
            type="primary"
            disabled={loading}
          >
            Xác nhận
          </AntdButton>
        </AntdSpace>
      }
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
              <RenderTitle title="LỆ PHÍ, PHÍ THEO THỦ TỤC" />
            </Col>
            <Col md={12} span={24}>
              <Form.Item name="phiTheoTTHC" label="Phí (VNĐ)">
                <InputNumber
                  defaultValue={0}
                  formatter={formatter}
                  style={{ width: "100%" }}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col md={12} span={24}>
              <Form.Item name="lePhiTheoTTHC" label="Lệ phí (VNĐ)">
                <InputNumber
                  defaultValue={0}
                  formatter={formatter}
                  style={{ width: "100%" }}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col md={24} span={24}>
              <RenderTitle title="HÌNH THỨC THU PHÍ" />
            </Col>
            <Col md={8} span={24}>
              <Form.Item name="phi" label="Phí thu (VNĐ)">
                <InputNumber
                  defaultValue={0}
                  formatter={formatter}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col md={8} span={24}>
              <Form.Item name="lePhi" label="Lệ phí thu (VNĐ)">
                <InputNumber
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
            <Col md={24} span={24}>
              <Form.Item name="bangChu" label="Bằng chữ">
                <Input defaultValue={0} style={{ width: "100%" }} disabled />
              </Form.Item>
            </Col>
            <Col md={12} span={24}>
              <Form.Item name="hinhThucThu" label="Hình thức thu phí">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col md={24} span={24}>
              <RenderTitle title="HÌNH THỨC THANH TOÁN" />
            </Col>
            <Col md={12} span={24}>
              <Form.Item name="hinhThucThanhToan" label="Hình thức thanh toán">
                <Select
                  options={HINH_THUC_THANH_TOAN}
                  placeholder="Chọn hình thức thanh toán"
                  disabled
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
          </Row>
        </Form>
      </Spin>
    </AntdModal>
  );
};
