import { Spin } from "antd";
import React, { Suspense } from "react";
import { useButtonActionContext } from "../../contexts/ButtonActionsContext";
import { ISearchHoSo } from "../../models";
import { DatLaiHanXuLyModal } from "./datLaiHanXuLy/DatLaiHanXuLyModal";
import { DatLaiQuyTrinhXuLyModal } from "./datLaiQuyTrinhXuLy/DatLaiQuyTrinhXuLyModal";
import AdminCapNhatHoSoModal from "./adminCapNhatHoSo/AdminCapNhatHoSoModal";
import ChuyenTraKqHCCModal from "./ChuyenTraKqHCC/ChuyenTraKqHCC";
import ThuHoiChuyenTraKqModal from "./thuHoiChuyenTraKq/ThuHoiChuyenTraKq";
import ChuyenPhiDiaGioiModal from "./chuyenPhiDiaGioi/ChuyenPhiDiaGioiModal";
import { ThuHoiMaVanDonBuuDien, XacNhanTraLaiXinRut, YeuCauBCCILayKetQua } from "../../redux/action";
import YeuCauBCCILayKetQuaModal from "./yeuCauBCCILayKetQua/YeuCauBCCILayKetQuaModal";
import XacNhanVaYeuCauBCCILayKetQuaModal from "./xacNhanVaYeuCauBBCILayKetQua/XacNhanVaYeuCauBCCILayKetQuaModal";
import DangKyNhanKetQuaBCCIModal from "./dangKyNhanKetQuaBCCI/DangKyNhanKetQuaBCCI";
import YeuCauThanhToanVaXacNhanKqModal from "@/pages/dvc/traketqua/choxacnhantrachuathuphi/components/ThanhToanVaXacNhanKqModal";
import { lazy } from "@/utils/lazyLoading";
import YeuCauThanhToanNhieuHoSosModal from "./yeuCauThanhToan/YeuCauThanhToanNhieuHoSosModal";
import { ThuHoiHoSoDaTraKetQuaModal } from "./thuHoiHoSoDaTraKetQua/ThuHoiHoSoDaTraKetQuaModal";
import { KetThucHoSoTBKMModal } from "./ketthuchosotbkm/KetThucHoSoTBKMModal";
import XacNhanTraLaiXinRutModal from "./xacNhanTraLaiXinRut/XacNhanTraLaiXinRutModal";
import XacNhanBoSungModal from "./xacNhanBoSung/xacNhanBoSungModal";
import AdminCapNhatThanhPhanHoSoModal from "./adminCapNhatHoSo/AdminCapNhatThanhPhanHoSoModal";
import ThuHoiMaVanDonBuuDienModal from "./thuHoiMaVanDonBuuDien/ThuHoiMaVanDonBuuDienModal";
import YeuCauBCCILayKetQuaWithoutItemCodeModal from "./yeuCauBCCILayKetQuaWithoutItemCode/YeuCauBCCILayKetQuaWithoutItemCodeModal";
import ThuHoiDangKyNhanKqQuaBCCIModal from "./ThuHoiDangKyNhanKqQuaBCCI/ThuHoiDangKyNhanKqQuaBCCIModal";
import YeuCauBCCILayKetQuaNhieuHoSoItemCodeModal from "./yeuCauBCCILayKetQuaNhieuHoSoItemCode/YeuCauBCCILayKetQuaNhieuHoSoItemCode";
import XuatQuaTrinhXuLyHoSoModal from "./chiTietHoSo/XuatQuaTrinhXuLyHoSoModal";
import CapNhatKetQuaXuLyNhieuHoSoModal from "./capNhatKetQuaXuLyHoSo/CapNhatKetQuaXuLyNhieuHoSoModal";
import { DatLaiNhieuHoSoQuaHanModal } from "./datLaiHoSoQuaHan/DatLaiHoSoQuaHanModal";
import TiepNhanGuiVBDLISModal from "./vbdlis/TiepNhanGuiVBDLISModal";
import BoSungHoSoGuiVBDLISModal from "./vbdlis/BoSungHoSoGuiVBDLISModal";
import ThucHienNghiaVuTaiChinhGuiVBDLISModal from "./vbdlis/ThucHienNghiaVuTaiChinhGuiVBDLISModal";
import { ExcelXuatDanhSachHoSoTheoDoiModal } from "./xuatDanhSachHoSoTheoDoi/ExcelXuatDanhSachHoSoTheoDoiModal";


const ChiTietHoSoModal = lazy(
  () => import("../actions/chiTietHoSo/ChiTietHoSoModal")
);
const DanhGiaHoSoModal = lazy(
  () => import("../actions/traKetQua/DanhGiaHoSoModal")
);
const ChuyenBuocXuLyModal = lazy(
  () => import("../actions/chuyenBuocXuLy/ChuyenBuocXuLyModal")
);
const ChuyenBuocXuLyChungThucModal = lazy(
  () => import("../actions/chuyenBuocXuLyChungThuc/ChuyenBuocXuLyChungThuc")
);
const CapNhatBoSungHoSoModal = lazy(
  () => import("../actions/capNhatBoSungHoSo/CapNhatBoSungHoSoModal")
);
const CapNhatKetQuaXuLyHoSoModal = lazy(
  () => import("../actions/capNhatKetQuaXuLyHoSo/CapNhatKetQuaXuLyHoSoModal")
);
const ThemMoiTiepNhanHoSoModal = lazy(
  () => import("../actions/themMoiHoSo/ThemMoiTiepNhanHoSoModal")
);
const SuaHoSoModal = lazy(() => import("../actions/suaHoSo/SuaHoSoModal"));
const ThemNguoiTiepNhanHoSoModalModal = lazy(
  () => import("./themNguoiTiepNhanHoSo/ThemNguoiTiepNhanHoSoModal")
);
const ThayDoiTruongHopXuLyModal = lazy(
  () => import("./thayDoiTruongHopXuLy/ThayDoiTruongHopXuLyModal")
);
const YeuCauThanhToanModal = lazy(
  () => import("../actions/yeuCauThanhToan/YeuCauThanhToanModal")
);
const XoaHoSoModal = lazy(() => import("../actions/xoaHoSo/XoaHoSoModal"));
const ChuyenNoiBoModal = lazy(
  () => import("../actions/chuyenNoiBo/ChuyenNoiBoModal")
);
const ChuyenBuocNhanhModal = lazy(
  () => import("../actions/chuyenBuocNhanh/ChuyenBuocNhanhModal")
);
const GhiChuViTriHoSoModal = lazy(
  () => import("../actions/ghiChuViTriHoSo/GhiChuViTriHoSoModal")
);
const BanGiaoKetQuaModal = lazy(
  () => import("../../../../pages/dvc/traketqua/chotraketquatthcc/components/BanGiaoKetQuaModal")
);
const PhieuBienNhanKetQuaModal = lazy(
  () => import("../../../../pages/dvc/traketqua/chotraketquatthcc/components/BienNhanKetQuaModal")
);
const TiepNhanNhieuHoSoModal = lazy(
  () => import("../../../../pages/dvc/tiepnhanhoso/tiepNhanNhieuHoSo/components/TiepNhanNhieuHoSoModal")
);
const TraKetQuaNhieuHoSoModal = lazy(
  () =>
    import(
      "../../../../pages/dvc/traketqua/chotraketquatthcc/components/TraKetQuaNhieuHoSoModal"
    )
);
const TraKetQuaHccHuyenXaModal = lazy(
  () =>
    import(
      "../../../../pages/dvc/traketqua/chotratructiep/components/TraKetQuaHCCHuyenXaModal"
    )
);
const TraKetQuaHCCModal = lazy(
  () =>
    import(
      "../../../../pages/dvc/traketqua/chotraketquatthcc/components/TraKetQuaHCCModal"
    )
);
const TraKetQuaVaThuLaiBanGocModal = lazy(
  () =>
    import(
      "../../../../pages/dvc/traketqua/chotraketquatthcc/components/TraKetQuaVaThuLaiBanGocModal"
    )
);

const PhieuTiepNhanHoSoModal = lazy(
  () => import("../documentActions/PhieuTiepNhanHoSoModal")
);
const PhieuTiepNhanHoSoChungThucModal = lazy(
  () => import("../documentActions/PhieuTiepNhanChungThucModel")
);
const PhieuKiemSoatModal = lazy(
  () => import("../documentActions/PhieuKiemSoatModel")
);
const PhieuHuongDanModal = lazy(
  () => import("../documentActions/PhieuHuongDanModal")
);
const PhieuTuChoiModal = lazy(
  () => import("../documentActions/PhieuTuChoiModal")
);
const YeuCauMotCuaBoSungModal = lazy(
  () => import("../actions/yeuCauMotCuaBoSung/YeuCauMotCuaBoSungModal")
);
const TiepNhanHoSoTrucTuyenModal = lazy(
  () => import("../actions/tiepNhanHoSoTrucTuyen/TiepNhanHoSoTrucTuyenModal")
);
const TuChoiTiepNhanHoSoTrucTuyenModal = lazy(
  () =>
    import(
      "../actions/tuChoiTiepNhanHoSoTrucTuyen/TuChoiTiepNhanHoSoTrucTuyenModal"
    )
);
const TraKetQuaXuLyHoSoModal = lazy(
  () => import("../actions/traKetQua/TraKetQuaModal")
);
const TraKetQuaXuLyVaDanhGiaHaiLongModal = lazy(
  () =>
    import(
      "../actions/traKetQuaVaDanhGiaHaiLong/TraKetQuaVaDanhGiaHaiLongModal"
    )
);
const TraKetQuaHoSoChungThucVaDanhGiaHaiLongModal = lazy(
  () =>
    import(
      "../actions/traKetQuaHoSoChungThucVaDanhGiaHaiLong/TraKetQuaHoSoChungThucVaDanhGiaHaiLongModal"
    )
);
const ThuHoiHoSoModal = lazy(
  () => import("../actions/thuHoiHoSo/ThuHoiHoSoModal")
);
const TraLaiBuocTruocModal = lazy(
  () => import("../actions/traLaiBuocTruoc/TraLaiBuocTruocModal")
);
const KetThucModal = lazy(() => import("../actions/ketThuc/KetThucModal"));
const TraBoSungModal = lazy(
  () => import("../actions/traBoSungHoSo/TraBoSungHoSoModal")
);
const HoanThanhBoSungModal = lazy(
  () => import("../actions/hoanThanhBoSung/HoanThanhBoSungModal")
);
const KhongTiepNhanHoSoBoSungQuaHanModal = lazy(
  () =>
    import(
      "../actions/khongTiepNhanHoSoBoSungQuaHan/KhongTiepNhanHoSoBoSungQuaHan"
    )
);
const XacNhanKetQuaModal = lazy(
  () => import("../actions/xacNhanKetQua/XacNhanKetQuaModal")
);
const AdminKetThucXuLyNhieuHoSoModal = lazy(
  () => import("../actions/KetThucXuLyHoSo/KetThucXuLyHoSoModal")
);
const LienThongHeThongLLTP = lazy(
  () => import("../actions/lienThongHeThongLLTP/LienThongHeThongLLTP")
);

const TiepNhanHoSoChungThucModal = lazy(
  () => import("../actions/tiepNhanChungThuc/TiepNhanHoSoChungThucModal")
);

const ThemMoiHoSoChungThuc = lazy(
  () => import("../actions/themMoiHoSoChungThuc/ThemMoiHoSoChungThuc")
);

const ThemMoiHoSoDienTu = lazy(
  () => import("../actions/themMoiHoSoDienTu/ThemMoiHoSoDienTu")
);
const KySoChungThucModal = lazy(
  () => import("../actions/kySoChungThuc/KySoChungThucModal")
);

const DongDauModal = lazy(() => import("./dongDauChungThucHoSo/DongDauModal"));
const DuThaoBoSungHoSoModal = lazy(
  () => import("../actions/duThaoBoSungHoSo/DuThaoBoSungHoSo")
);

const DuThaoTraLaiXinRutHoSoModal = lazy(
  () => import("../actions/duThaoTraLaiXinRutHoSo/DuThaoTraLaiXinRutHoSo")
);
const YeuCauThanhToanChungThuc = lazy(
  () => import("../actions/yeuCauThanhToanChungThuc/YeuCauThanhToanChungThuc")
);
const TraKetQuaChungThucModal = lazy(
  () => import("../actions/traKetQuaChungThuc/TraKetQuaChungThucModal")
);
const YeuCauThanhToanLLTP = lazy(
  () => import("../actions/yeuCauThanhToanLLTP/YeuCauThanhToanLLTPModal")
);
const DuThaoXinLoi = lazy(() => import("../actions/duThaoXinLoi/DuThaoXinLoi"));
const ChuyenBuocXuLyNhieuHoSo = lazy(() => import("../actions/chuyenBuocXuLyNhieuHoSo/ChuyenBuocXuLyNhieuHoSo"));
const LienThongBTPModal = lazy(() => import("../actions/lienThongBTP/LienThongBTP"));
const GuiLienThongLLTPModal = lazy(() => import('../actions/guiLienThongLLTP/GuiLienThongBoLLTP'));
const TraLaiXinRutKhongTrinhKyModal = lazy(() => import("../actions/traLaiXinRutKhongTrinhKy/TraLaiXinRutKhongTrinhKyModal"));
const ThemMoiHoSoPhiDiaGioiModal = lazy(() => import("../actions/themMoiHoSoPhiDiaGioi/ThemMoiHoSoPhiDiaGioi"));
const TraCuuBTPHoSoModal = lazy(() => import("../actions/traCuuBtp/TraCuuBTP"));
const FakeTuChoiBTPHoSoModal = lazy(() => import("../actions/fakeTuChoiBTP/FakeTuChoiBTP"));
const ThuHoiQuyetDinhLLTP = lazy(() => import("../actions/thuHoiQuyetDinhLLTP/ThuHoiQuyetDinhLLTP"));
const GuiPhiDiaGioi = lazy(
  () => import("../actions/guiPhiDiaGioi/GuiPhiDiaGioi")
);
const LienThongDangKyKetHon = lazy(() => import("../actions/lienThongDangKyKetHon/LienThongDangKyKetHon"))
export const LazyActions = ({
  children,
  setSearchParams,
}: {
  children: React.ReactNode;
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
}) => {
  const buttonActionContext = useButtonActionContext();
  return (
    <>
      {children}
      <Suspense
        fallback={<Spin spinning={true} rootClassName="suspense-spin"></Spin>}
      >
        {buttonActionContext.lienThongDangKyKetHonHoSoModalVisible ?
          <LienThongDangKyKetHon setSearchHoSoParams={setSearchParams} /> : null}
        {buttonActionContext.fakeTuChoiBTPHoSoModalVisible ? (
          <FakeTuChoiBTPHoSoModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.themMoiHoSoDienTuModalVisible ? (
          <ThemMoiHoSoDienTu setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.scanHoSoModalVisible ? (
          <AdminCapNhatHoSoModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.scanKetQuaModalVisible ? (
          <CapNhatKetQuaXuLyNhieuHoSoModal setSearchParams={setSearchParams} />
        ) : null}
        {buttonActionContext.traCuuBTPHoSoModalVisible ? (
          <TraCuuBTPHoSoModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.themMoiHoSoPhiDiaGioiModalVisible ? (
          <ThemMoiHoSoPhiDiaGioiModal setSearchParams={setSearchParams} />
        ) : null}
        {buttonActionContext.traLaiXinRutKhongTrinhKyHoSoModalVisible ? (
          <TraLaiXinRutKhongTrinhKyModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.lienThongHeThongLLTPHoSoModalVisible ? (
          <LienThongHeThongLLTP setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.chiTietHoSoModalVisible ? (
          <ChiTietHoSoModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.danhGiaHoSoModalVisible ? (
          <DanhGiaHoSoModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.themMoiTiepNhanHoSoModalVisible ? (
          <ThemMoiTiepNhanHoSoModal setSearchParams={setSearchParams} />
        ) : null}
        {buttonActionContext.chuyenBuocXuLyModalVisible ? (
          <ChuyenBuocXuLyModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.chuyenBuocXuLyChungThucModalVisible ? (
          <ChuyenBuocXuLyChungThucModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.suaHoSoModalVisible ? (
          <SuaHoSoModal setSearchParams={setSearchParams} />
        ) : null}
        {buttonActionContext.capNhatKetQuaXuLyHoSoModalVisible ? (
          <CapNhatKetQuaXuLyHoSoModal setSearchParams={setSearchParams} />
        ) : null}
        {buttonActionContext.capNhatKetQuaXuLyNhieuHoSoModalVisible ? (
          <CapNhatKetQuaXuLyNhieuHoSoModal setSearchParams={setSearchParams} />
        ) : null}
        {buttonActionContext.themNguoiTiepNhanHoSoModalVisible ? (
          <ThemNguoiTiepNhanHoSoModalModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.thayDoiTruongHopXuLyModalVisible ? (
          <ThayDoiTruongHopXuLyModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.yeuCauThanhToanModalVisible ? (
          <YeuCauThanhToanModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.xoaHoSoModalVisible ? (
          <XoaHoSoModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.chuyenNoiBoModalVisible ? (
          <ChuyenNoiBoModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.chuyenBuocNhanhHoSoModalVisible ? (
          <ChuyenBuocNhanhModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.inPhieuTiepNhanHoSoModalVisible ? (
          <PhieuTiepNhanHoSoModal />
        ) : null}
        {buttonActionContext.ghiChuViTriHoSoModalVisible ? (
          <GhiChuViTriHoSoModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.inTiepNhanNhieuHoSoModalVisible ? (
          <TiepNhanNhieuHoSoModal />
        ) : null}
        {buttonActionContext.banGiaoKetQuaModalVisible ? (
          <BanGiaoKetQuaModal />
        ) : null}
        {buttonActionContext.bienNhanKetQuaModalVisible ? (
          <PhieuBienNhanKetQuaModal />
        ) : null}
        {buttonActionContext.traKetQuaNhieuHoSoModalVisible ? (
          <TraKetQuaNhieuHoSoModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.traKetQuaHCCHuyenXaModalVisible ? (
          <TraKetQuaHccHuyenXaModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.traKetQuaHCCModalVisible ? (
          <TraKetQuaHCCModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.traKetQuaVaThuLaiBanGocModalVisible ? (
          <TraKetQuaVaThuLaiBanGocModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.inPhieuTiepNhanChungThucModalVisible ? (
          <PhieuTiepNhanHoSoChungThucModal />
        ) : null}
        {buttonActionContext.inPhieuKiemSoatModalVisible ? (
          <PhieuKiemSoatModal />
        ) : null}
        {buttonActionContext.inPhieuTuChoiModalVisible ? (
          <PhieuTuChoiModal />
        ) : null}
        {buttonActionContext.inPhieuHuongDanModalVisible ? (
          <PhieuHuongDanModal />
        ) : null}
        {buttonActionContext.capNhatBoSungHoSoModalVisible ? (
          <CapNhatBoSungHoSoModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.yeuCauMotCuaBoSungModalVisible ? (
          <YeuCauMotCuaBoSungModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.tiepNhanHoSoTrucTuyenHoSoModalVisible ? (
          <TiepNhanHoSoTrucTuyenModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.tuChoiTiepNhanHoSoTrucTuyenModalVisible ? (
          <TuChoiTiepNhanHoSoTrucTuyenModal
            setSearchHoSoParams={setSearchParams}
          />
        ) : null}
        {buttonActionContext.traKetQuaModalVisible ? (
          <TraKetQuaXuLyHoSoModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.traKetQuaVaDanhGiaHaiLongModalVisible ? (
          <TraKetQuaXuLyVaDanhGiaHaiLongModal
            donViId=""
            maHoSoNguoiDungNhap={""}
          />
        ) : null}
        {buttonActionContext.thuHoiHoSoDaTraKetQuaModalVisible ? (
          <ThuHoiHoSoDaTraKetQuaModal
            setSearchHoSoParams={setSearchParams}
          />
        ) : null}
        {buttonActionContext.traKetQuaChungThucVaDanhGiaHaiLongModalVisible ? (
          <TraKetQuaHoSoChungThucVaDanhGiaHaiLongModal
            donViId=""
            maHoSoNguoiDungNhap={""}
          />
        ) : null}
        {buttonActionContext.xacNhanKetQuaModalVisible ? (
          <XacNhanKetQuaModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.xacNhanTraLaiXinRutModalVisible ? (
          <XacNhanTraLaiXinRutModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.xacNhanBoSungModalVisible ? (
          <XacNhanBoSungModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.thuHoiHoSoModalVisible ? (
          <ThuHoiHoSoModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.traLaiBuocTruocModalVisible ? (
          <TraLaiBuocTruocModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.ketThucModalVisible ? (
          <KetThucModal setSearchParams={setSearchParams} />
        ) : null}
        {buttonActionContext.traBoSungModalVisible ? (
          <TraBoSungModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.hoanThanhBoSungModalVisible ? (
          <HoanThanhBoSungModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.khongTiepNhanHoSoBoSungQuaHanModalVisible ? (
          <KhongTiepNhanHoSoBoSungQuaHanModal
            setSearchHoSoParams={setSearchParams}
          />
        ) : null}
        {buttonActionContext.adminCapNhatHoSoModalVisible ? (
          <AdminCapNhatHoSoModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.adminCapNhatThanhPhanHoSoModalVisible ? (
          <AdminCapNhatThanhPhanHoSoModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.datLaiHanXuLyModalVisible ? (
          <DatLaiHanXuLyModal />
        ) : null}
        {buttonActionContext.chuyenTraKqHCCModalVisible ? (
          <ChuyenTraKqHCCModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.thuHoiChuyenTraKqModalVisible ? (
          <ThuHoiChuyenTraKqModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.chuyenPhiDiaGioiModalVisible ? (
          <ChuyenPhiDiaGioiModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.guiPhiDiaGioiModalVisible ? (
          <GuiPhiDiaGioi setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.tiepNhanHoSoChungThucModalVisible ? (
          <TiepNhanHoSoChungThucModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.themMoiHoSoChungThucModalVisible ? (
          <ThemMoiHoSoChungThuc setSearchParams={setSearchParams} />
        ) : null}
        {buttonActionContext.kySoChungThucModalVisible ? (
          <KySoChungThucModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.dongDauModalVisible ? (
          <DongDauModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.duThaoBoSungHoSoModalVisible ? (
          <DuThaoBoSungHoSoModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.ketThucHoSoTBKMModalVisible ? (
          <KetThucHoSoTBKMModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.datLaiNhieuHoSoQuaHanModalVisible ? (
          <DatLaiNhieuHoSoQuaHanModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.duThaoTraLaiXinRutHoSoModalVisible ? (
          <DuThaoTraLaiXinRutHoSoModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.yeuCauThanhToanChungThucModalVisible ? (
          <YeuCauThanhToanChungThuc setSearchHoSoParams={setSearchParams} />
        ) : null}
        {/* {buttonActionContext.datLaiQuyTrinhXuLyModalVisible ? (
          <DatLaiQuyTrinhXuLyModal />
        ) : null} */}
        {buttonActionContext.xacNhanVaYeuCauBCCILayKetQuaModalVisible ? (
          <XacNhanVaYeuCauBCCILayKetQuaModal
            setSearchHoSoParams={setSearchParams}
          />
        ) : null}
        {buttonActionContext.yeuCauBCCILayKetQuaModalVisible ? (
          <YeuCauBCCILayKetQuaModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.yeuCauBCCILayKetQuaWithoutItemCodeModalVisible ? (
          <YeuCauBCCILayKetQuaWithoutItemCodeModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.yeuCauBCCILayKetQuaNhieuHoSoModalVisible ? (
          <YeuCauBCCILayKetQuaNhieuHoSoItemCodeModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.thuHoiMaVanDonBuuDienModalVisible ? (
          <ThuHoiMaVanDonBuuDienModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.thuHoiDangKyNhanKqQuaBCCIModalVisible ? (
          <ThuHoiDangKyNhanKqQuaBCCIModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.dangKyNhanKetQuaBCCIModalVisible ? (
          <DangKyNhanKetQuaBCCIModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.yeuCauThanhToanVaXacNhanKqModalVisible ? (
          <YeuCauThanhToanVaXacNhanKqModal
            setSearchHoSoParams={setSearchParams}
          />
        ) : null}
        {buttonActionContext.traKetQuaChungThucModalVisible ? (
          <TraKetQuaChungThucModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.yeuCauThanhToanNhieuHoSosModalVisible ? (
          <YeuCauThanhToanNhieuHoSosModal
            setSearchHoSoParams={setSearchParams}
          />
        ) : null}
        {buttonActionContext.yeuCauThanhToanLLTPModalVisible ? (
          <YeuCauThanhToanLLTP setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.duThaoXinLoiHoSoModalVisible ? (
          <DuThaoXinLoi setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.chuyenBuocXuLyNhieuHoSoModalVisible ? (
          <ChuyenBuocXuLyNhieuHoSo setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.lienThongBTPHoSoModalVisible ? (
          <LienThongBTPModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.guiLienThongLLTPModalVisible ? (
          <GuiLienThongLLTPModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.xuatQuaTrinhXuLyHoSoModalVisible ? (
          <XuatQuaTrinhXuLyHoSoModal />
        ) : null}
        {buttonActionContext.thuHoiQuyetDinhLLTPModalVisible ? (
          <ThuHoiQuyetDinhLLTP setSearchParams={setSearchParams} />
        ) : null}
        {buttonActionContext.ketThucXuLyNhieuHoSoModalVisible ? (<AdminKetThucXuLyNhieuHoSoModal setSearchHoSoParams={setSearchParams} />) : null}
        {buttonActionContext.tiepNhanGuiVBDLISModalVisible ? (<TiepNhanGuiVBDLISModal setSearchHoSoParams={setSearchParams} />) : null}
        {buttonActionContext.boSungHoSoGuiVBDLISModalVisible ? (<BoSungHoSoGuiVBDLISModal setSearchHoSoParams={setSearchParams} />) : null}
        {buttonActionContext.thucHienNghiaVuTaiChinhVBDLISModalVisible ? (<ThucHienNghiaVuTaiChinhGuiVBDLISModal setSearchHoSoParams={setSearchParams} />) : null}
        {buttonActionContext.xuatExcelHoSoTheoDoiModal ? <ExcelXuatDanhSachHoSoTheoDoiModal /> : null}
      </Suspense>
    </>
  );
};
