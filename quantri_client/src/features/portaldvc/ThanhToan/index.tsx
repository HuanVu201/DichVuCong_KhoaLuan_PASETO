import "./index.scss";
import { SearchHoSoPortal } from "./components/Search";
import DetailThanhToan from "./components/DetailThanhToan";
import { DanhSachYeuCauThanhToan } from "./components/DanhSachYeuCauThanhToan";
import {
  ThanhToanProvider,
  UseThanhToanContext,
} from "./context/UseThanhToanContext";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { InitPayment } from "./redux/action";
import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Col, Input, Row, Form, InputNumber, Radio, Spin } from "antd";
import { getCurrency, numberToCurrencyText } from "@/utils";
import { RenderTitle } from "@/components/common";
import { IYeuCauThanhToan } from "@/features/yeucauthanhtoan/models";
import { IYeuCauThanhToanPortal } from "./models/YeuCauThanhToanPortal";
import { Value } from "sass";
import { INPUT_RULES } from "@/features/screenaction/data";
import { AntdSelect } from "@/lib/antd/components";
import { ISearchDanhMucChung } from "@/features/danhmucdungchung/models";
import { SearchDanhMucDiaBan } from "@/features/danhmucdiaban/redux/action";
interface FormThongTinYeuCauThanhToan {
  chuHoSo: string;
  soGiayToChuHoSo: string;
  diaChiChuHoSo: string;
  maHoSo: string;
  tenTTHC: string;
  phi: string;
  lePhi: string;
  soTien: string;
  nguoiNopTienBienLai?: string;
  maSoThueBienLai?: string;
  diaChiBienLai?: string;
  trichYeuHoSo?: string;
  tenTaiKhoanHoanPhi?: string;
  tenNganHangHoanPhi?: string;
  soTaiKhoanHoanPhi?: string;
  soGiayToNguoiNopTienBienLai?: string;
  emailNguoiNopTienBienLai?: string;
  tinhThanh?: string;
  quanHuyen?: string;
  xaPhuong?: string;
  soNha?: string;
  doiTuongNopPhi?: string;
  quocGia?: string;
}
const DOI_TUONG_OPTIONS = [
  { label: "Cá nhân", value: "canhan" },
  { label: "Cơ quan, tổ chức", value: "tochuc" },

];
const DEFAULT_QUOCGIA = 'Việt Nam';
const ThanhToanContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { datas: danhmucdiabans } = useAppSelector(state => state.danhmucdiaban)

  const formatter = (value: number | undefined) =>
    value ? getCurrency(value) : "0";
  const thanhToanContext = UseThanhToanContext();
  const { datas: yeuCauThanhToans, giaoDichThanhToan } = useAppSelector(
    (state) => state.portalThanhToan
  );
  const [defaultMaTinh, setDefaultMaTinh] = useState<string>();
  const [defaultTenTinh, setDefaultTenTinh] = useState<string>("")
  const [form] = Form.useForm<FormThongTinYeuCauThanhToan>();
  const [yeuCauThanhToan, setYeuCauThanhToan] =
    useState<IYeuCauThanhToanPortal>();
  var sotien = Form.useWatch("soTien", form);
  var doiTuongNopPhi = Form.useWatch("doiTuongNopPhi", form);
  const selectedTinh = Form.useWatch("tinhThanh", form);
  const selectedHuyen = Form.useWatch("quanHuyen", form);
  const [searchDanhMucDiaBanParams, setSearchDanhMucDiaBanParams] =
    useState<ISearchDanhMucChung>({
      pageNumber: 1,
      pageSize: 200000,
    });
  const { publicModule: config } = useAppSelector(state => state.config)
  useEffect(() => {
    config?.map((item: any) => {
      if (item.code == 'ma-tinh')
        setDefaultMaTinh(item.content)
      if (item.code == 'ten-don-vi')
        setDefaultTenTinh(item.content)
    })
  }, [config])
  useEffect(() => {
    if (giaoDichThanhToan) {
      thanhToanContext.setMaYeuCauThanhToan("");
      if (
        giaoDichThanhToan.maGiaoDichThanhToan &&
        giaoDichThanhToan.duongDanThanhToan
      ) {
        location.href = giaoDichThanhToan.duongDanThanhToan;
      } else {
        toast.warning("Tạo giao dịch thanh toán thất bại!");
      }
    }
  }, [giaoDichThanhToan]);
  const tinhs = useMemo(() => {

    return danhmucdiabans?.filter((x) => x.maTinh && !x.maHuyen && !x.maXa);
  }, [danhmucdiabans]);
  const huyens = useMemo(() => {
    if (selectedTinh && danhmucdiabans && danhmucdiabans.length > 0)
      return (
        danhmucdiabans?.filter(
          (x) => x.maTinh == selectedTinh && x.maHuyen && !x.maXa
        ) ?? []
      );
    return [];
  }, [selectedTinh, danhmucdiabans]);
  const xas = useMemo(() => {
    if (selectedTinh)
      return (
        danhmucdiabans?.filter((x) => x.maHuyen == selectedHuyen && x.maXa) ??
        []
      );
    return [];
  }, [selectedHuyen]);
  useEffect(() => {
    (async () => {
      await dispatch(SearchDanhMucDiaBan(searchDanhMucDiaBanParams));
    })();
  }, [searchDanhMucDiaBanParams]);
  const onFinish = async () => {
    if (yeuCauThanhToan) {
      setIsSubmitting(true);
      var diaChi = "";
      try {
        const formData = await form.validateFields();
        if (doiTuongNopPhi == 'tochuc') {
          var tinhThanh = tinhs?.find(x => x.maTinh == formData.tinhThanh);
          var quanHuyen = huyens?.find(x => x.maHuyen == formData.quanHuyen);
          var xaPhuong = xas?.find(x => x.maXa == formData.xaPhuong);
          var soNha = formData.soNha
          diaChi = `${soNha} - ${xaPhuong?.tenDiaBan} - ${quanHuyen?.tenDiaBan} - ${tinhThanh?.tenDiaBan} - ${DEFAULT_QUOCGIA}`
        }
        const postData = {
          id: yeuCauThanhToan.id,
          NguoiNopTienBienLai: doiTuongNopPhi == "canhan" ? yeuCauThanhToan.chuHoSo : formData.nguoiNopTienBienLai,
          DiaChiBienLai: doiTuongNopPhi == "canhan" ? yeuCauThanhToan.diaChiChuHoSo : doiTuongNopPhi == 'tochuc' ? diaChi : formData.diaChiBienLai,
          MaSoThueBienLai: formData.maSoThueBienLai,
          TenTaiKhoanHoanPhi: formData.tenTaiKhoanHoanPhi,
          TenNganHangHoanPhi: formData.tenNganHangHoanPhi,
          SoTaiKhoanHoanPhi: formData.soTaiKhoanHoanPhi,
          SoGiayToNguoiNopTienBienLai: formData.soGiayToNguoiNopTienBienLai,
          EmailNguoiNopTienBienLai: formData.emailNguoiNopTienBienLai
        };
        await dispatch(InitPayment(postData));
        setIsSubmitting(false);

      } catch (e) {
        setIsSubmitting(false);
      }

    }
  };
  useEffect(() => {
    if (yeuCauThanhToans && yeuCauThanhToans.length > 0) {
      setYeuCauThanhToan(yeuCauThanhToans[0]);
    }
  }, [yeuCauThanhToans]);
  useEffect(() => {
    if (yeuCauThanhToan)
      form.setFieldsValue({
        soGiayToChuHoSo: yeuCauThanhToan.soGiayToChuHoSo,
        chuHoSo: yeuCauThanhToan.chuHoSo,
        diaChiChuHoSo: yeuCauThanhToan.diaChiChuHoSo,
        phi: yeuCauThanhToan.phi,
        lePhi: yeuCauThanhToan.lePhi,
        soTien: yeuCauThanhToan.soTien,
        nguoiNopTienBienLai:
          yeuCauThanhToan?.nguoiNopTienBienLai ?? yeuCauThanhToan?.chuHoSo,
        diaChiBienLai:
          yeuCauThanhToan?.diaChiBienLai ?? yeuCauThanhToan?.diaChiChuHoSo,
        soGiayToNguoiNopTienBienLai:
          yeuCauThanhToan?.soGiayToNguoiNopTienBienLai ??
          yeuCauThanhToan?.soGiayToChuHoSo,
        maSoThueBienLai: yeuCauThanhToan?.maSoThueBienLai,
        maHoSo: yeuCauThanhToan.maHoSo,
        trichYeuHoSo: yeuCauThanhToan.trichYeuHoSo,
        emailNguoiNopTienBienLai: yeuCauThanhToan.emailChuHoSo ?? yeuCauThanhToan.emailNguoiNopTienBienLai,
        tinhThanh: defaultMaTinh,
        quocGia: DEFAULT_QUOCGIA,
        doiTuongNopPhi: 'canhan'
      });
  }, [yeuCauThanhToan]);
  useEffect(() => {
    if (sotien) {
      var bangChu = numberToCurrencyText(parseInt(sotien));
      form.setFieldValue("bangChu", bangChu);
    }
  }, [sotien]);
  return (
    <Spin spinning={isSubmitting}>
      <div className="containerThanhToan commonBackgroundTrongDong">
        <SearchHoSoPortal />
        {yeuCauThanhToan ? (
          <div className="thanhToanBlock">
            <Form form={form} layout="vertical">
              <div className="bodyThanhToan table-responsive">
                <RenderTitle title="THÔNG TIN CHỦ HỒ SƠ" />
                <Row gutter={[8, 8]}>
                  <Col span={12}>
                    <Form.Item label="Chủ hồ sơ" name="chuHoSo">
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Số CCCD" name="soGiayToChuHoSo">
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Địa chỉ chủ hồ sơ" name="diaChiChuHoSo">
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Mã hồ sơ" name="maHoSo">
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Nội dung" name="trichYeuHoSo">
                      <Input disabled />
                    </Form.Item>
                  </Col>
                </Row>
                <RenderTitle title="THÔNG TIN BIÊN LAI" />
                <Row gutter={[8, 8]}>
                  <Col span={24}>
                    <Form.Item
                      label=""
                      name="doiTuongNopPhi"

                    >
                      <Radio.Group
                        options={DOI_TUONG_OPTIONS}
                        defaultValue={"canhan"}
                        optionType="button"
                        buttonStyle="solid"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Tên đơn vị/người nộp"
                      name="nguoiNopTienBienLai"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên đơn vị/người nộp",
                        },
                      ]}

                    >
                      <Input disabled={doiTuongNopPhi == "canhan"} />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item label="Số CCCD" name="soGiayToNguoiNopTienBienLai"
                      rules={[
                        { max: 20, message: "Số CCCD không vượt quá 20 ký tự" }
                      ]}  >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12} hidden={doiTuongNopPhi != "canhan"}>
                    <Form.Item
                      label="Địa chỉ"
                      name="diaChiBienLai"
                      rules={[
                        {
                          required: doiTuongNopPhi == "canhan",
                          message: "Vui lòng nhập địa chỉ",
                        },
                      ]}
                    >
                      <Input disabled={doiTuongNopPhi == "canhan"} />
                    </Form.Item>

                  </Col>
                  <Col span={12}>
                    <Form.Item label="Mã số thuế" name="maSoThueBienLai">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Email" name="emailNguoiNopTienBienLai"
                      rules={[
                        {
                          required: doiTuongNopPhi == "tochuc",
                          message: "Vui lòng nhập email",
                        },

                      ]}  >
                      <Input />
                    </Form.Item>
                  </Col>


                </Row>
                <Row gutter={[8, 8]} hidden={doiTuongNopPhi != "tochuc"}>
                  <Col span={6}>
                    <Form.Item label="Quốc gia" name="quocGia"
                      rules={[
                        {
                          required: doiTuongNopPhi == "tochuc",
                          message: "Không được để trống",
                        },]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col md={6} span={24}>
                    <Form.Item
                      label="Tỉnh/Thành phố"
                      name="tinhThanh"
                      rules={[{ required: doiTuongNopPhi == "tochuc", message: "Không được để trống" }]}
                    >
                      <AntdSelect
                        generateOptions={{
                          model: tinhs,
                          value: "maTinh",
                          label: "tenDiaBan",
                        }}
                        defaultValue={defaultMaTinh}
                        showSearch
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                  <Col md={6} span={24}>
                    <Form.Item
                      label="Quận/Huyện"
                      name="quanHuyen"
                      rules={[{ required: doiTuongNopPhi == "tochuc", message: "Không được để trống" }]}
                    >
                      <AntdSelect
                        generateOptions={{
                          model: huyens,
                          value: "maHuyen",
                          label: "tenDiaBan",
                        }}
                        showSearch
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                  <Col md={6} span={24}>
                    <Form.Item
                      label="Phường/Xã"
                      name="xaPhuong"
                      rules={[{ required: doiTuongNopPhi == "tochuc", message: "Không được để trống" }]}
                    >
                      <AntdSelect
                        generateOptions={{
                          model: xas,
                          value: "maXa",
                          label: "tenDiaBan",
                        }}
                        showSearch
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                  <Col md={12} span={24}>
                    <Form.Item
                      label="Số nhà/Đường/Xóm"
                      name="soNha"
                      rules={[{ required: doiTuongNopPhi == "tochuc", message: "Không được để trống" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                </Row>
                <Col span={24}>
                  <i style={{ color: "red" }}>Ông/bà chịu trách nhiệm hoàn toàn về các thông tin đã cung cấp cho Hệ thống thông tin giải quyết TTHC {defaultTenTinh} để xuất biên lai điện tử.</i>
                  <br />
                  <i style={{ color: "red" }}>Trong trường hợp chưa chắc chắn, vui lòng kiểm tra lại trước khi cập nhật.</i>
                </Col>
                <RenderTitle title="THÔNG TIN HOÀN PHÍ" />
                <Row gutter={[8, 8]}>
                  <Col span={12}>
                    <Form.Item
                      label="Tên tài khoản hoàn phí"
                      name="tenTaiKhoanHoanPhi"
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Số tài khoản hoàn phí"
                      name="soTaiKhoanHoanPhi"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Tên ngân hàng hoàn phí"
                      name="tenNganHangHoanPhi"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Col span={24}>
                  <Row gutter={[8, 8]}>
                    <Col span={8}>
                      <Form.Item label="Phí (VNĐ)" name="phi">
                        <InputNumber
                          style={{ width: "100%" }}
                          disabled
                          defaultValue={0}
                          formatter={formatter}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Lệ phí (VNĐ)" name="lePhi">
                        <InputNumber
                          style={{ width: "100%" }}
                          disabled
                          defaultValue={0}
                          formatter={formatter}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Tổng (VNĐ)" name="soTien">
                        <InputNumber
                          style={{ width: "100%" }}
                          disabled
                          defaultValue={0}
                          formatter={formatter}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item label="Bằng chữ" name="bangChu">
                        <Input style={{ width: "100%" }} disabled />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item>
                        <Button onClick={onFinish} disabled={isSubmitting} loading={isSubmitting}>
                          Thanh toán
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </div>
            </Form>
          </div>
        ) : (
          <i>Không có thông tin thanh toán!</i>
        )}

        {/* <DetailThanhToan /> */}
      </div>
    </Spin>
  );
};
const ThanhToanPortalWrapper = () => {
  return (
    <ThanhToanProvider>
      <ThanhToanContainer />
    </ThanhToanProvider>
  );
};
export default ThanhToanPortalWrapper;
