import { AntdButton, AntdModal, AntdSelect, AntdSpace } from "@/lib/antd/components";
import {
  Col,
  Form,
  FormProps,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Spin,
} from "antd";

import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  GetYeuCauThanhToan,
  PayYeuCauThanhToan,
} from "@/features/yeucauthanhtoan/redux/action";
import { SelectProps } from "antd/lib";
import { RenderTitle } from "@/components/common";
import { getCurrency, numberToCurrencyText } from "@/utils";
import TextArea from "antd/es/input/TextArea";
import { IYeuCauThanhToan } from "../../models/YeuCauThanhToan";
import { yeuCauThanhToanApi } from "../../services";
import { SearchDanhMucDiaBan } from "@/features/danhmucdiaban/redux/action";
import { ISearchDanhMucChung } from "@/features/danhmucdungchung/models";
const DA_THANH_TOAN = "Đã thanh toán";
const HINH_THUC_THANH_TOAN: SelectProps["options"] = [
  { value: "tien-mat", label: "Tiền mặt" },
  { value: "chuyen-khoan", label: "Chuyển khoản" },
  // { value: "truc-tuyen", label: "Trực tuyến" },
];
const LOAI_THONG_TIN_NGUOI_IN_BIEN_LAI: SelectProps["options"] = [
  { value: "chu-ho-so", label: "Chủ hồ sơ" },
  { value: "nguoi-nop", label: "Người nộp hồ sơ" },
  { value: "nguoi-khac", label: "Người khác" },
];
const DOI_TUONG_OPTIONS = [
  { label: "Cá nhân", value: "canhan" },
  { label: "Cơ quan, tổ chức", value: "tochuc" },
 
];
const DEFAULT_QUOCGIA = 'Việt Nam';
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
  hinhThucThanhToan?: string,
  ghiChu?: string,
  hinhThucThu?: string,
  phiTheoTTHC?: string,
  lePhiTheoTTHC?: string,
  noiDung?: string,
  tenPhiBienLai?: string,
  tenLePhiBienLai?: string,
  soDienThoaiNguoiNopTienBienLai?: string
}
export const ThanhToan = ({
  handleCancel,
  reFetch,
  YeuCauThanhToanId,
}: {
  handleCancel: () => void;
  reFetch: () => void;
  YeuCauThanhToanId: React.Key[];
}) => {
  const { loading, data: dataYctt } = useAppSelector(
    (state) => state.yeucauthanhtoan
  );

  const dispatch = useAppDispatch();
  const { datas: danhmucdiabans} = useAppSelector(state => state.danhmucdiaban)
  const [form] = Form.useForm<FormThongTinYeuCauThanhToan>();
  var doiTuongNopPhi = Form.useWatch("doiTuongNopPhi", form);
  const selectedTinh = Form.useWatch("tinhThanh", form);
  const selectedHuyen = Form.useWatch("quanHuyen", form);
  const [searchDanhMucDiaBanParams, setSearchDanhMucDiaBanParams] =
  useState<ISearchDanhMucChung>({
    pageNumber: 1,
    pageSize: 200000,
  });
  const [defaultMaTinh, setDefaultMaTinh] = useState<string>();
  const [defaultTenTinh,setDefaultTenTinh] = useState<string>("")
  const { publicModule: config } = useAppSelector(state => state.config)
  useEffect(() => {
          config?.map((item: any) => {
              if (item.code == 'ma-tinh')
                setDefaultMaTinh(item.content)
              if(item.code == 'ten-don-vi') 
                setDefaultTenTinh(item.content) 
          })
      }, [config])
  const tongSo = Form.useWatch("soTien", form);
  const formatter = (value: number | undefined) =>
    value ? getCurrency(value) : "0";
  const onOk: FormProps["onFinish"] = async () => {
    try{
      var formData = await form.validateFields();
      var diaChi = "";
      if(doiTuongNopPhi == 'tochuc') {
        var tinhThanh = tinhs?.find(x=>x.maTinh == formData.tinhThanh);
        var quanHuyen = huyens?.find(x=>x.maHuyen == formData.quanHuyen);
        var xaPhuong = xas?.find(x=>x.maXa == formData.xaPhuong);
        var soNha = formData.soNha
        diaChi = `${soNha} - ${xaPhuong?.tenDiaBan} - ${quanHuyen?.tenDiaBan} - ${tinhThanh?.tenDiaBan} - ${DEFAULT_QUOCGIA}`
      }
      var postData = {
        id: YeuCauThanhToanId.toString(),
        data: {
          ids: [YeuCauThanhToanId.toString()],
          trangThai: DA_THANH_TOAN,
          hinhThucThanhToan: form.getFieldValue("hinhThucThanhToan"),
  
          phi: form.getFieldValue("phi"),
          lePhi: form.getFieldValue("lePhi"),
          tenPhiBienLai: form.getFieldValue("tenPhiBienLai"),
          tenLePhiBienLai: form.getFieldValue("tenLePhiBienLai"),
          nguoiNopTienBienLai: form.getFieldValue("nguoiNopTienBienLai"),
          diaChiBienLai:  doiTuongNopPhi == 'tochuc' ? diaChi : formData.diaChiBienLai,
          maSoThueBienLai: form.getFieldValue("maSoThueBienLai"),
          soGiayToNguoiNopTienBienLai:  formData.soGiayToNguoiNopTienBienLai,
          emailNguoiNopTienBienLai: formData.emailNguoiNopTienBienLai,
          soDienThoaiNguoiNopTienBienLai: formData.soDienThoaiNguoiNopTienBienLai,
        },
      };
      var resPay = await dispatch(PayYeuCauThanhToan(postData)).unwrap();
      reFetch();
      handleCancel();
    }catch(ex){

    }
   
  };
  const tinhs = useMemo(() => {
     
    return danhmucdiabans?.filter((x) => x.maTinh && !x.maHuyen && !x.maXa);
  }, [danhmucdiabans]);
  const huyens = useMemo(() => {
    if (selectedTinh)
      return (
        danhmucdiabans?.filter(
          (x) => x.maTinh == selectedTinh && x.maHuyen && !x.maXa
        ) ?? []
      );
    return [];
  }, [selectedTinh]);
  const xas = useMemo(() => {
    if (selectedTinh)
      return (
        danhmucdiabans?.filter((x:any) => x.maHuyen == selectedHuyen && x.maXa) ??
        []
      );
    return [];
  }, [selectedHuyen]);
  useEffect(() => {
    (async () => {
      await dispatch(SearchDanhMucDiaBan(searchDanhMucDiaBanParams));
    })();
  }, [searchDanhMucDiaBanParams]);
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
      var soDienThoai = yeuCauThanhToan.data.soDienThoaiChuHoSo;
      if(yeuCauThanhToan.data.soDienThoaiNguoiNopTienBienLai) soDienThoai = yeuCauThanhToan.data.soDienThoaiNguoiNopTienBienLai;
      else if(yeuCauThanhToan.data.soDienThoaiNguoiUyQuyen) soDienThoai = yeuCauThanhToan.data.soDienThoaiNguoiUyQuyen;
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
        nguoiNopTienBienLai:yeuCauThanhToan.data.nguoiNopTienBienLai ?? yeuCauThanhToan.data.chuHoSo,
        diaChiBienLai: yeuCauThanhToan.data.diaChiBienLai ?? yeuCauThanhToan.data.diaChiChuHoSo,
        maSoThueBienLai: yeuCauThanhToan.data.maSoThueBienLai,
        tenTTHC: yeuCauThanhToan.data.tenTTHC,
        noiDung: yeuCauThanhToan.data.tenTTHC,
        tenPhiBienLai: "Phí " + yeuCauThanhToan.data.tenTTHC,
        tenLePhiBienLai: "Lệ phí " + yeuCauThanhToan.data.tenTTHC,
        soGiayToNguoiNopTienBienLai: yeuCauThanhToan.data.soGiayToNguoiNopTienBienLai ??  yeuCauThanhToan.data.soGiayToChuHoSo,
        emailNguoiNopTienBienLai: yeuCauThanhToan.data.emailNguoiNopTienBienLai ?? yeuCauThanhToan.data.emailChuHoSo,
        tinhThanh: defaultMaTinh,
        quocGia: DEFAULT_QUOCGIA,
        doiTuongNopPhi: 'canhan',
        soDienThoaiNguoiNopTienBienLai: soDienThoai,
      });
    })();
  }, [defaultMaTinh]);
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
              if (fieldChange[0].name[0] == "loaiThongTinNguoiInBienLai") {
                var loaiThongTinNguoiInBienLai = form.getFieldValue(
                  "loaiThongTinNguoiInBienLai"
                );
                if (loaiThongTinNguoiInBienLai == "chu-ho-so") {
                  form.setFieldValue("nguoiNopTienBienLai", dataYctt?.chuHoSo);
                  form.setFieldValue("diaChiBienLai", dataYctt?.diaChiChuHoSo);
                } else {
                  if (loaiThongTinNguoiInBienLai == "nguoi-nop") {
                    form.setFieldValue(
                      "nguoiNopTienBienLai",
                      dataYctt?.nguoiUyQuyen ?? dataYctt?.chuHoSo
                    );
                    form.setFieldValue(
                      "diaChiBienLai",
                      dataYctt?.diaChiNguoiUyQuyen ?? dataYctt?.diaChiChuHoSo
                    );
                  } else {
                    form.setFieldValue(
                      "nguoiNopTienBienLai",
                      dataYctt?.nguoiNopTienBienLai ?? undefined
                    );
                    form.setFieldValue(
                      "diaChiBienLai",
                      dataYctt?.diaChiBienLai ?? undefined
                    );
                  }
                }
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
          </Row>
           
            
              <Row gutter={[8, 8]}>
              <Col md={24} span={24}>
            <RenderTitle title="THÔNG TIN BIÊN LAI" />
            </Col>
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
                      {max: 20, message:"Số CCCD không vượt quá 20 ký tự"}
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12} hidden= {doiTuongNopPhi !="canhan"}>
                  <Form.Item
                    label="Địa chỉ"
                    name="diaChiBienLai"
                    rules={[
                      {
                        required: doiTuongNopPhi =="canhan",
                        message: "Vui lòng nhập địa chỉ",
                      },
                    ]}
                  >
                    <Input  />
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
                    <Input  />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Số điện thoại" name="soDienThoaiNguoiNopTienBienLai"  
                   >
                    <Input  />
                  </Form.Item>
                </Col>
                
              </Row>
              <Row gutter={[8, 8]} hidden= {doiTuongNopPhi != "tochuc"}>
              <Col span={6}>
                  <Form.Item label="Quốc gia" name="quocGia"   
                  rules={[
                      {
                        required: doiTuongNopPhi == "tochuc",
                        message: "Không được để trống" ,
                      },  ]}
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
                 <Input/>
                </Form.Item>
              </Col>
              
              </Row>
              <Col span={24}>
                  <i style={{color:"red"}}>Ông/bà chịu trách nhiệm hoàn toàn về các thông tin đã cung cấp cho Hệ thống thông tin giải quyết TTHC {defaultTenTinh} để xuất biên lai điện tử.</i>
                  <br/>
                  <i style={{color:"red"}}>Trong trường hợp chưa chắc chắn, vui lòng kiểm tra lại trước khi cập nhật.</i>
                </Col>
            <Row gutter={[8, 8]} >
            <Col md={24} span={24}>
              <RenderTitle title="HÌNH THỨC THANH TOÁN" />
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
            <Col md={12} span={24}>
              <Form.Item
                name="tenLePhiBienLai"
                label="Tên lệ phí viết tắt (in biên lai)"
              >
                <TextArea cols={3} />
              </Form.Item>
            </Col>
            <Col md={12} span={24}>
              <Form.Item
                name="tenPhiBienLai"
                label="Tên phí viết tắt (in biên lai)"
              >
                <TextArea cols={3} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </AntdModal>
  );
};
