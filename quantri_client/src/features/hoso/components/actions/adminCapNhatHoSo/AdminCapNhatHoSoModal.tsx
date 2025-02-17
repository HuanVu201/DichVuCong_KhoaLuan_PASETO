import { RenderTitle } from "@/components/common";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import {
  GetHoSo,
  TuChoiTiepNhanHoSoTrucTuyen,
} from "@/features/hoso/redux/action";
import {
  AdminGetHoSo,
  AdminUpdateHoSo,
} from "@/features/adminHoSo/redux/action";
import { AntdAutoComplete, AntdModal, AntdSelect, AntdUpLoad } from "@/lib/antd/components";
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Checkbox, Col, DatePicker, Form, Input, Row, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { AdminUpdateHoSoParams } from "@/features/adminHoSo/services";
import { FormHeader } from "@/features/portaldvc/NopHoSoTrucTuyen/components/FormHeader";
import dayjs from "dayjs";
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME, FORMAT_ISO_DATE } from "@/data/constant";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { ISearchCoCauToChuc } from "@/features/cocautochuc/models";
import { ISearchUser } from "@/features/user/models";
import { SearchUser } from "@/features/user/redux/Actions";
import { LOAI_KET_QUA_OPTIONS } from "@/features/hoso/data/formData";
import { AdminTepDinhKemSuaHoSo } from "./AdminTepDinhKemSuaHoSo";
import { AdminTepDinhKem } from "./AdminTepDinhKem";
import { AdminThanhPhanChungThucHoSo } from "./AdminThanhPhanChungThuc";
import { resetDatas } from "@/features/thanhphanhoso/redux/slice"
import { resetData } from "@/features/hoso/redux/slice"

import { allItemHasFile } from "../themMoiHoSoChungThuc/utils/validate";
import { formatISOtoDate, getFileName } from "@/utils";
import { hasDuplicateValue } from "@/features/hoso/data/formRules";
import { toast } from "react-toastify";
import { KetQuaLienQuanWrapper } from "@/features/ketqualienquan/components/KetQuaLienQuan";

const loaiKetQuas = [
  { label: 'Kết quả', value: 'Kết quả' },
  { label: 'Bổ sung', value: 'Bổ sung' },
  { label: 'Trả lại/Xin rút', value: 'Trả lại/Xin rút' },
]

const AdminCapNhatHoSoModal = ({
  setSearchHoSoParams,
}: {
  setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
}) => {
  const [form] = Form.useForm<any>();
  const { data: hoSo, loading } = useAppSelector((state) => state.adminHoSo);
  const { datas: groups } = useAppSelector((state) => state.cocautochuc);
  const { datas: users } = useAppSelector((state) => state.user);
  const buttonActionContext = useButtonActionContext();
  const dinhKem = Form.useWatch("dinhKemKetQua", form);
  const { publicModule } = useAppSelector(state => state.config)


  const dispatch = useAppDispatch();
  const [searchGroupParams, setSearchGroupParams] =
    useState<ISearchCoCauToChuc>({ pageNumber: 1, pageSize: 5000 });
  const [searchUserParams, setSearchuserParams] = useState<ISearchUser>({
    pageNumber: 1,
    pageSize: 200000,
  });
  const handleCancel = () => {
    buttonActionContext.setSelectedHoSos([]);
    buttonActionContext.setAdminCapNhatHoSoModalVisible(false);
    buttonActionContext.setScanHoSoModalVisible(false);
    dispatch(resetDatas())
    dispatch(resetData())
  };

  useEffect(() => {
    if (buttonActionContext.selectedHoSos.length) {
      dispatch(AdminGetHoSo(buttonActionContext.selectedHoSos[0] as string));
    }
  }, [buttonActionContext.selectedHoSos.length]);
  useEffect(() => {
    (async () => {
      if (hoSo) {
        form.setFieldsValue({
          ...hoSo,
          ngayHenTra: hoSo.ngayHenTra ? dayjs(hoSo.ngayHenTra) : undefined,
          ngayTiepNhan: hoSo.ngayTiepNhan
            ? dayjs(hoSo.ngayTiepNhan)
            : undefined,
          ngayTra: hoSo.ngayTra ? dayjs(hoSo.ngayTra) : undefined,
          ngayHenTraCaNhan: hoSo.ngayHenTraCaNhan
            ? dayjs(hoSo.ngayHenTraCaNhan)
            : undefined,
          ngayTuChoi: hoSo.ngayTuChoi ? dayjs(hoSo.ngayTuChoi) : undefined,
          ngayKetThucXuLy: hoSo.ngayKetThucXuLy
            ? dayjs(hoSo.ngayKetThucXuLy)
            : undefined,
          deletedOn: hoSo.deletedOn ? dayjs(hoSo.deletedOn) : undefined,
          ngayYeuCauBoSung: hoSo.ngayYeuCauBoSung
            ? dayjs(hoSo.ngayYeuCauBoSung)
            : undefined,
          ngayCongDanBoSung: hoSo.ngayCongDanBoSung
            ? dayjs(hoSo.ngayCongDanBoSung)
            : undefined,
          ngayBanHanhKetQua: hoSo.ngayBanHanhKetQua
            ? (dayjs(hoSo.ngayBanHanhKetQua) as any)
            : undefined,
          ngayKyKetQua: hoSo.ngayKyKetQua
            ? (dayjs(hoSo.ngayKyKetQua) as any)
            : undefined,
        });
      }
    })();
  }, [hoSo]);

  useEffect(() => {
    (async () => {
      await dispatch(SearchCoCauToChuc(searchGroupParams));
      await dispatch(SearchUser(searchUserParams));
    })();
  }, []);
  const uploadFileConfig = useMemo(() => {
    return publicModule?.find(x => x.code == "post_create_hoso")?.content
  }, [publicModule])
  const onOk = async () => {

    const formData =
      (await form.validateFields()) as AdminUpdateHoSoParams["data"];

    if (formData.thanhPhanHoSos && formData.thanhPhanHoSos.length == 0) {
      toast.warn(<span>Vui lòng thêm <strong>ít nhất một</strong> thành phần hồ sơ</span>)
      return
    }

    if (uploadFileConfig) {
      try {
        const uploadFileConfigParsed: { uploadSignedFile: boolean; allowSameFileName: boolean } = JSON.parse(uploadFileConfig)
        if (uploadFileConfigParsed.uploadSignedFile && !allItemHasFile(formData.thanhPhanHoSos, "dinhKem")) {
          toast.warn("Vui lòng đính kèm tệp vào từng thành phần hồ sơ")
          return;
        }
        if (!uploadFileConfigParsed.allowSameFileName) {
          const tphsFileName = formData.thanhPhanHoSos?.flatMap(x => getFileName(x.dinhKem))
          if (hasDuplicateValue(tphsFileName)) {
            toast.warn(<span>Vui lòng <strong>không</strong> đính kèm các tệp <strong>trùng tên</strong></span>)
            return;
          }
        }
      } catch { }
    }


    if (formData.thanhPhanHoSos?.findIndex(thanhPhan => thanhPhan.dinhKem) == -1) {
      toast.warn("Vui lòng đính kèm ít nhất 1 tệp")
      return
    }

    if (buttonActionContext.selectedHoSos.length) {
      console.log(formData.dinhKemKetQua);

      const res = await dispatch(
        AdminUpdateHoSo({
          id: buttonActionContext.selectedHoSos[0] as string,
          data: {
            ...formData,
            dinhKemKetQua: formData.dinhKemKetQua ? formData.dinhKemKetQua : undefined,
            ngayHenTra: formData.ngayHenTra ? dayjs(formData.ngayHenTra).format(FORMAT_ISO_DATE) : undefined,
            ngayHenTraCaNhan: formData.ngayHenTraCaNhan ? dayjs(formData.ngayHenTraCaNhan).format(FORMAT_ISO_DATE) : undefined,
            ngayTra: formData.ngayTra ? dayjs(formData.ngayTra).format(FORMAT_ISO_DATE) : undefined,
            ngayKetThucXuLy: formData.ngayKetThucXuLy ? dayjs(formData.ngayKetThucXuLy).format(FORMAT_ISO_DATE) : undefined,
            ngayTuChoi: formData.ngayTuChoi ? dayjs(formData.ngayTuChoi).format(FORMAT_ISO_DATE) : undefined,
            ngayBanHanhKetQua: formData.ngayBanHanhKetQua ? dayjs(formData.ngayBanHanhKetQua).format(FORMAT_ISO_DATE) : undefined,
            ngayKyKetQua: formData.ngayKyKetQua ? dayjs(formData.ngayKyKetQua).format(FORMAT_ISO_DATE) : undefined,
            ngayYeuCauBoSung: formData.ngayYeuCauBoSung ? dayjs(formData.ngayYeuCauBoSung).format(FORMAT_ISO_DATE) : undefined
          }
        })
      ).unwrap();
      if (res.succeeded) {
        setSearchHoSoParams((curr) => ({ ...curr }));
        handleCancel();
      }
    }
  };
  return (
    <AntdModal
      confirmLoading={loading}
      title={`Chỉnh sửa hồ sơ`}
      visible={true}
      handlerCancel={handleCancel}
      // width={1200}
      fullsizeScrollable
      onOk={onOk}
      okText="Xác nhận"
    >
      <Form form={form} layout="vertical" name="AdminCapNhatHoSo" initialValues={{ deletedThanhPhanIds: [] }}>
        <Form.Item name="deletedThanhPhanIds" hidden><Input /></Form.Item>
        <Form.Item name="thanhPhanHoSos" hidden><Input /></Form.Item>
        <Form.Item name="hinhThucTra" hidden><Input /></Form.Item>

        <Row gutter={[8, 8]}>
          <Col span={24}>
            <FormHeader>Thông tin chủ hồ sơ</FormHeader>
          </Col>
          <Col span={12}>
            <Form.Item name="chuHoSo" label="Chủ hồ sơ">
              <Input />
            </Form.Item>
          </Col>
          <Form.Item name="ngaySinhChuHoSo" label="Năm sinh">
            <Input placeholder="Nhập năm sinh VD:2000" />
          </Form.Item>
          <Col span={12}>
            <Form.Item name="diaChiChuHoSo" label="Địa chỉ chủ hồ sơ">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="soDienThoaiChuHoSo" label="Sđt chủ hồ sơ">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="emailChuHoSo" label="Email chủ hồ sơ">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="soGiayToChuHoSo" label="Giấy tờ chủ hồ sơ">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="loaiGiayToChuHoSo" label="Loại giấy tờ chủ hồ sơ">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="loaiDoiTuong" label="Loại đối tượng">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="maDoiTuong" label="Mã đối tượng">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="tinhThanhChuHoSo" label="Tỉnh thành chủ hồ sơ">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="quanHuyenChuHoSo" label="Quận huyện chủ hồ sơ">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="xaPhuongChuHoSo" label="Xã phường chủ hồ sơ">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <FormHeader>Thông tin uỷ quyền</FormHeader>
          </Col>
          <Col span={12}>
            <Form.Item name="uyQuyen" label="Uỷ quyền" valuePropName="checked">
              <Checkbox />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="nguoiUyQuyen" label="Người uỷ quyền">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="soDienThoaiNguoiUyQuyen"
              label="Số điện thoại người uỷ quyền"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="emailNguoiUyQuyen" label="Email người uỷ quyền">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="soGiayToNguoiUyQuyen"
              label="Số giấy tờ người uỷ quyền"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="loaiGiayToNguoiUyQuyen"
              label="Loại giấy tờ người uỷ quyền"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="ngaySinhNguoiUyQuyen"
              label="Ngày sinh người uỷ quyền"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="diaChiNguoiUyQuyen" label="Địa chỉ người uỷ quyền">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="tinhThanhNguoiUyQuyen"
              label="Tỉnh thành người uỷ quyền"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="quanHuyenNguoiUyQuyen"
              label="Quận huyện người uỷ quyền"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="xaPhuongNguoiUyQuyen"
              label="Xã phường người uỷ quyền"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <FormHeader>Thông tin hồ sơ</FormHeader>
          </Col>
          <Col span={12}>
            <Form.Item name="maHoSo" label="Mã hồ sơ">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="trangThaiHoSoId" label="Trạng thái hồ sơ Id">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="trangThaiTraKq" label="Trạng thái trả kết quả">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="hinhThucTra" label="Hình thức trả">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="maTTHC" label="Mã thủ tục">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="maTruongHop" label="Mã trường hợp">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="tenTruongHop" label="Tên trường hợp">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="kenhThucHien" label="Kênh thực hiện">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="yKienNguoiChuyenXuLy"
              label="Ý kiến người chuyển xử lý"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="dinhKemNguoiChuyenXuLy"
              label="Đính kèm người chuyển xủ lý"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="donViId" label="Đơn vị xử lý">
              <AntdSelect
                generateOptions={{
                  model: groups,
                  label: "groupName",
                  value: "groupCode",
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="mucDo" label="Mức độ">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="soBoHoSo" label="Số bộ hồ sơ">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="buocHienTai" label="Bước hiện tại">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="tenBuocHienTai" label="Tên bước hiện tại">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="nguoiXuLyTruoc" label="Người xử lý trước">
              <AntdSelect
                generateOptions={{
                  model: users,
                  label: "fullName",
                  value: "id",
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="buocXuLyTruoc" label="Bước xử lý trước">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="donViQuanLy" label="Đơn vị quản lý">
              <AntdSelect
                generateOptions={{
                  model: groups,
                  label: "groupName",
                  value: "groupCode",
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="trichYeuHoSo" label="Trích yếu hồ sơ">
              <Input.TextArea maxLength={1000} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="dangKyNhanHoSoQuaBCCIDatá"
              label="Đăng ký nhận qua BCCI"
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ngayTiepNhan" label="Ngày tiếp nhận">
              <DatePicker
                placeholder="Chọn ngày"
                format={FORMAT_DATE}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="nguoiXuLyTiep" label="Người xử lý tiếp">
              <AntdSelect
                generateOptions={{
                  model: users,
                  label: "fullName",
                  value: "id",
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="buocXuLyTiep" label="Bước xử lý tiếp">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="nguoiNhanHoSo" label="Người nhận hồ sơ">
              <AntdSelect
                generateOptions={{
                  model: users,
                  label: "fullName",
                  value: "id",
                }}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="ngayHenTra" label="Ngày hẹn trả">
              <DatePicker placeholder="Chọn ngày" format={FORMAT_DATE} showTime style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="ngayHenTraCaNhan" label="Ngày hẹn trả cá nhân">
              <DatePicker placeholder="Chọn ngày" format={FORMAT_DATE} showTime style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="ngayTra" label="Ngày trả">
              <DatePicker placeholder="Chọn ngày" format={FORMAT_DATE} showTime style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="ngayKetThucXuLy" label="Ngày kết thúc xử lý">
              <DatePicker placeholder="Chọn ngày" format={FORMAT_DATE} showTime style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="ngayTuChoi" label="Ngày từ chối">
              <DatePicker placeholder="Chọn ngày" format={FORMAT_DATE} showTime style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="deletedOn" label="Ngày xóa">
              <DatePicker
                placeholder="Chọn ngày"
                format={FORMAT_DATE}
                allowClear
                showTime
                style={{ width: "100%" }}

              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="thongBaoEmail"
              label="Thông báo email"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="thongBaoZaolo"
              label="thongBaoZalo"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="thongBaoSMS"
              label="Thông báo sms"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="chuyenNoiBo"
              label="Chuyển nội bộ"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col span={24}>
            <FormHeader>Thông tin bổ sung hồ sơ</FormHeader>
          </Col>
          <Col span={12}>
            <Form.Item name="trangThaiBoSung" label="Trạng thái bổ sung">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="dinhKemBoSung" label="Đính kèm bổ sung">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="lyDoBoSung" label="Lý do bổ sung">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="thanhPhanBoSung" label="Thành phần bổ sung">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="thoiHanBoSung" label="Thời hạn bổ sung">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="noiDungBoSung" label="Nội dung bô sung">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ngayYeuCauBoSung" label="Ngày yêu cầu bổ sung">
              <DatePicker
                placeholder="Chọn ngày"
                format={FORMAT_DATE}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ngayCongDanBoSung" label="Ngày công dân bổ sung">
              <DatePicker
                placeholder="Chọn ngày"
                format={FORMAT_DATE}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <FormHeader>Thông tin xác nhận trả kết quả</FormHeader>
          </Col>
          <Col span={12}>
            <Form.Item name="donViTraKq" label="Đơn vị trả kết quả">
              <AntdSelect
                generateOptions={{
                  model: groups,
                  label: "groupName",
                  value: "groupCode",
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="trangThaiTraKq"
              label="Chuyển nội bộ"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col span={24}>
            <FormHeader>Kết quả xử lý</FormHeader>
          </Col>
          <Col span={24}>
            <Row gutter={[8, 8]}>
              <Col span={24} md={6}>
                <Form.Item name="loaiVanBanKetQua" label="Loại văn bản kết quả">
                  <AntdAutoComplete generateOptions={{ model: LOAI_KET_QUA_OPTIONS, value: 'value', label: 'label' }}>
                    <Input placeholder="Nhập hoặc chọn loại kết quả" />
                  </AntdAutoComplete>
                </Form.Item>
              </Col>
              <Col span={24} md={6}>
                <Form.Item name="soKyHieuKetQua" label="Số ký hiệu">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24} md={6}>
                <Form.Item name="nguoiKyKetQua" label="Người ký">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24} md={6}>
                <Form.Item name="coQuanBanHanhKetQua" label="Cơ quan ban hành">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24} md={8}>
                <Form.Item name="trichYeuKetQua" label="Trích yếu kết quả">
                  <Input.TextArea rows={3} />
                </Form.Item>
              </Col>
              <Col span={24} md={4}>
                <Form.Item name="dinhKemKetQua" label="Đính kèm kết quả">
                  {/* <AntdUpLoad editing = {buttonActionContext.chiTietHoSoModalVisible !== undefined} formInstance={form} fieldName="dinhKemKetQua" folderName="DinhKemKetQua" listType="text" showUploadList={true} /> */}
                  {/* <AntdUpLoad editing={true} formInstance={form} fieldName="dinhKemKetQua" folderName="DinhKemKetQua" listType="text" showUploadList={true} /> */}
                  {hoSo?.maHoSo ? (
                    <RegularUpload
                      // kySo={KY_SO}
                      // hideUpload={true}
                      dinhKem={dinhKem}
                      fieldName={'dinhKemKetQua'}
                      folderName={hoSo.maHoSo}
                      form={form}
                    />
                  ) : null}
                </Form.Item>
              </Col>
              <Col span={24} md={4}>
                <Form.Item name="loaiKetQua" label="Loại kết quả">
                  <AntdSelect
                    virtual={true}
                    generateOptions={{
                      model: loaiKetQuas,
                      label: "label",
                      value: "value",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24} md={4}>
                <Form.Item name="ngayBanHanhKetQua" label="Ngày ban hành">
                  <DatePicker format={FORMAT_DATE} style={{ width: '100%' }} showTime />
                </Form.Item>
              </Col>
              <Col span={24} md={4}>
                <Form.Item name="ngayKyKetQua" label="Ngày ký">
                  <DatePicker format={FORMAT_DATE} style={{ width: '100%' }} showTime />
                </Form.Item>
              </Col>
              {/* <Col span={24}>
                            <RenderTitle title="Kết quả liên quan (nếu có)" />
                            {hoSo ? <KetQuaLienQuanWrapper maHoSo={hoSo.maHoSo} /> : null}
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Ý kiến chuyển xử lý" name="yKienNguoiChuyenXuLy" >
                                <AntdAutoComplete generateOptions={{ model: yKienChuyenXuLyOptions, value: 'value', label: 'label' }}>
                                    <Input placeholder="Nhập ý kiến chuyển xử lý" />
                                </AntdAutoComplete>
                            </Form.Item>
                        </Col> */}
            </Row>
          </Col>
          <Col span={24}>
            <FormHeader>Kết quả liên quan (nếu có)</FormHeader>
          </Col>
          <Col span={24}>
            {hoSo ? <KetQuaLienQuanWrapper maHoSo={hoSo.maHoSo as any} /> : null}
          </Col>
          <Col span={24}>
            <FormHeader>Tệp tin đính kèm</FormHeader>
          </Col>
          <Col span={24}>
            {hoSo?.laHoSoChungThuc ? (
              <>
                <AdminThanhPhanChungThucHoSo form={form} />
              </>
            ) : (
              <>
                <RenderTitle title="Tệp tin đính kèm" />
                <AdminTepDinhKem form={form} />
              </>
            )}
          </Col>
        </Row>
      </Form>
    </AntdModal>
  );
};

export default AdminCapNhatHoSoModal;
