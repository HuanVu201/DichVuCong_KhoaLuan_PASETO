import { Spin } from "antd";
import React, { Suspense, lazy } from "react";
import { useButtonActionContext } from "../../contexts/ButtonActionsContext";
import { ISearchHoSo } from "../../models";
import { DatLaiHanXuLyModal } from "./datLaiHanXuLy/DatLaiHanXuLyModal";
import { DatLaiQuyTrinhXuLyModal } from "./datLaiQuyTrinhXuLy/DatLaiQuyTrinhXuLyModal";
import AdminCapNhatHoSoModal from "./adminCapNhatHoSo/AdminCapNhatHoSoModal";
import ChuyenTraKqHCCModal from "./ChuyenTraKqHCC/ChuyenTraKqHCC";
import ThuHoiChuyenTraKqModal from "./thuHoiChuyenTraKq/ThuHoiChuyenTraKq";
import ChuyenPhiDiaGioiModal from "./chuyenPhiDiaGioi/ChuyenPhiDiaGioiModal";
import { YeuCauBCCILayKetQua } from "../../redux/action";
import YeuCauBCCILayKetQuaModal from "./yeuCauBCCILayKetQua/YeuCauBCCILayKetQuaModal";
import XacNhanVaYeuCauBCCILayKetQuaModal from "./xacNhanVaYeuCauBBCILayKetQua/XacNhanVaYeuCauBCCILayKetQuaModal";
import DangKyNhanKetQuaBCCIModal from "./dangKyNhanKetQuaBCCI/DangKyNhanKetQuaBCCI";
import YeuCauThanhToanVaXacNhanKqModal from "@/pages/dvc/traketqua/choxacnhantrachuathuphi/components/ThanhToanVaXacNhanKqModal";

const ChiTietHoSoModal = lazy(
  () => import("../actions/chiTietHoSo/ChiTietHoSoModal")
);
// const DanhGiaHoSoModal = lazy(
//   () => import("../actions/traKetQua/DanhGiaHoSoModal")
// );
const ChuyenBuocXuLyModal = lazy(
  () => import("../actions/chuyenBuocXuLy/ChuyenBuocXuLyModal")
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
const ThayDoiTruongHopXuLyModal = lazy(
  () => import("../actions/thayDoiTruongHopXuLy/ThayDoiTruongHopXuLy")
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
const PhieuTiepNhanHoSoModal = lazy(
  () => import("../documentActions/PhieuTiepNhanHoSoModal")
);
const PhieuKiemSoatModal = lazy(
  () => import("../documentActions/PhieuKiemSoatModel")
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
const LienThongHeThongLLTP = lazy(
  () => import("../actions/lienThongHeThongLLTP/LienThongHeThongLLTP")
);

const TiepNhanHoSoChungThucModal = lazy(
  () => import("../actions/tiepNhanChungThuc/TiepNhanHoSoChungThucModal")
);

const ThemMoiHoSoChungThuc = lazy(
  () => import("../actions/themMoiHoSoChungThuc/ThemMoiHoSoChungThuc")
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
        {buttonActionContext.lienThongHeThongLLTPHoSoModalVisible ? (
          <LienThongHeThongLLTP setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.chiTietHoSoModalVisible ? (
          <ChiTietHoSoModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {/* {buttonActionContext.danhGiaHoSoModalVisible ? (
          <DanhGiaHoSoModal setSearchHoSoParams={setSearchParams} />
        ) : null} */}
        {buttonActionContext.themMoiTiepNhanHoSoModalVisible ? (
          <ThemMoiTiepNhanHoSoModal setSearchParams={setSearchParams} />
        ) : null}
        {buttonActionContext.chuyenBuocXuLyModalVisible ? (
          <ChuyenBuocXuLyModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.suaHoSoModalVisible ? (
          <SuaHoSoModal setSearchParams={setSearchParams} />
        ) : null}
        {buttonActionContext.capNhatKetQuaXuLyHoSoModalVisible ? (
          <CapNhatKetQuaXuLyHoSoModal setSearchParams={setSearchParams} />
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
        {buttonActionContext.inPhieuKiemSoatModalVisible ? (
          <PhieuKiemSoatModal />
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
        {buttonActionContext.xacNhanKetQuaModalVisible ? (
          <XacNhanKetQuaModal setSearchHoSoParams={setSearchParams} />
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
        {buttonActionContext.dangKyNhanKetQuaBCCIModalVisible ? (
          <DangKyNhanKetQuaBCCIModal setSearchHoSoParams={setSearchParams} />
        ) : null}
        {buttonActionContext.yeuCauThanhToanVaXacNhanKqModalVisible ? (
          <YeuCauThanhToanVaXacNhanKqModal
            setSearchHoSoParams={setSearchParams}
          />
        ) : null}
      </Suspense>
    </>
  );
};
