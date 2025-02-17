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
import { AntdModal, AntdSelect, AntdUpLoad } from "@/lib/antd/components";
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Checkbox, Col, DatePicker, Form, Input, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { AdminUpdateHoSoParams } from "@/features/adminHoSo/services";
import { FormHeader } from "@/features/portaldvc/NopHoSoTrucTuyen/components/FormHeader";
import dayjs from "dayjs";
import { FORMAT_DATE } from "@/data/constant";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { ISearchCoCauToChuc } from "@/features/cocautochuc/models";
import { ISearchUser } from "@/features/user/models";
import { SearchUser } from "@/features/user/redux/Actions";
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
  const dinhKem = Form.useWatch("dinhKemTuChoi", form);
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
  const onOk = async () => {
    const formData =
      (await form.validateFields()) as AdminUpdateHoSoParams["data"];
    if (buttonActionContext.selectedHoSos.length) {
      const res = await dispatch(
        AdminUpdateHoSo({
          id: buttonActionContext.selectedHoSos[0] as string,
          data: formData,
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
      width={1000}
      onOk={onOk}
      okText="Xác nhận"
    >
      <Form form={form} layout="vertical" name="AdminCapNhatHoSo">
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
            <Form.Item name="trichYeuKetQua" label="Trích yếu kết quả">
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
            <Form.Item name="dinhKemKetQua" label="Đính kèm kết quả">
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
          <Col span={12}>
            <Form.Item name="ngayHenTra" label="Ngày hẹn trả">
              <DatePicker placeholder="Chọn ngày" format={"DD/MM/YYYY"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ngayHenTraCaNhan" label="Ngày hẹn trả cá nhân">
              <DatePicker placeholder="Chọn ngày" format={"DD/MM/YYYY"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ngayTra" label="Ngày trả">
              <DatePicker placeholder="Chọn ngày" format={"DD/MM/YYYY"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ngayKetThucXuLy" label="Ngày kết thúc xử lý">
              <DatePicker placeholder="Chọn ngày" format={"DD/MM/YYYY"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ngayTuChoi" label="Ngày từ chối">
              <DatePicker placeholder="Chọn ngày" format={"DD/MM/YYYY"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="deletedOn" label="Ngày xóa">
              <DatePicker
                placeholder="Chọn ngày"
                format={FORMAT_DATE}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="thongBaoEmail"
              label="Thông báo email"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="thongBaoZaolo"
              label="thongBaoZalo"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="thongBaoSMS"
              label="Thông báo sms"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col span={12}>
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
        </Row>
      </Form>
    </AntdModal>
  );
};

export default AdminCapNhatHoSoModal;
