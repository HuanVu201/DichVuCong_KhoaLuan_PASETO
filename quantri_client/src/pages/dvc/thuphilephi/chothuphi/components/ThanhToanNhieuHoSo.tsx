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
  soDienThoaiNguoiNopTienBienLai?: string;
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

}
export const ThanhToanNhieuHoSo = ({
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

  const [form] = Form.useForm<FormThongTinYeuCauThanhToan>();

  const onOk: FormProps["onFinish"] = async () => {
    try{
      
      var postData = {
        id: YeuCauThanhToanId.toString(),
        data: {
          ids: YeuCauThanhToanId,
          trangThai: DA_THANH_TOAN,
          hinhThucThanhToan: form.getFieldValue("hinhThucThanhToan") ?? "tien-mat",
        },
      };
      var resPay = await dispatch(PayYeuCauThanhToan(postData)).unwrap();
      reFetch();
      handleCancel();
    }catch(ex){

    }
   
  };

  return (
    <AntdModal
      title="Xác nhận thanh toán"
      visible={true}
      handlerCancel={handleCancel}
    
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
        Ông bà có chắc chắn thanh toán {YeuCauThanhToanId.length} không?
      </Spin>
    </AntdModal>
  );
};
