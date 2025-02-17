import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";
const { primaryRoutes } = Service;

const ThongKeHoSoTrucTuyenTheoThuTucLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeHoSoTrucTuyen/components/ThongKeHoSoTrucTuyenTheoThuTuc"
    )
);
const ThongKeHoSoTrucTuyenCapTinhLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeHoSoTrucTuyen/components/ThongKeHoSoTrucTuyenCapTinh"
    )
);
const ThongKeHoSoTrucTuyenCacSoBanNganhLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeHoSoTrucTuyen/components/ThongKeHoSoTrucTuyenCacSoBanNganh"
    )
);
const ThongKeHoSoTrucTuyenCapHuyenLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeHoSoTrucTuyen/components/ThongKeHoSoTrucTuyenCapHuyen"
    )
);
const ThongKeHoSoTrucTuyenLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeHoSoTrucTuyen/components/ThongKeHoSoTrucTuyen"
    )
);
const ThongKeHoSoTrucTuyenTheoMucDo34Lazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeHoSoTrucTuyen/components/ThongKeHoSoTrucTuyenTheoMucDo34"
    )
);
const ThongKeHoSoTrucTuyenCapXaLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeHoSoTrucTuyen/components/ThongKeHoSoTrucTuyenCapXa"
    )
);
const TienDoGiaiQuyetLazy = lazy(
  () =>
    import("../../../features/thongKe/thongKeQD766/components/TienDoGiaiQuyet")
);
const TheoDoiChiTieuDVCTrucTuyenLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeQD766/components/TheoDoiChiTieuDVCTrucTuyen"
    )
);
const ThanhToanTrucTuyenLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeQD766/components/ThanhToanTrucTuyen"
    )
);
const ThongKeTongHopLazy = lazy(
  () =>
    import("../../../features/thongKe/thongKeQD766/components/ThongKeTongHop")
);
const BaoCaoTongHopThuTucLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/ThongKeTheoDonVi/components/BaoCaoTongHopThuTuc"
    )
);
const BaoCaoTongHopLinhVucLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/ThongKeTheoDonVi/components/BaoCaoTongHopLinhVuc"
    )
);
const BaoCaoTongHopLinhVuc2Lazy = lazy(
  () =>
    import(
      "../../../features/thongKe/ThongKeTheoDonVi/components/BaoCaoTongHopLinhVuc2"
    )
);
const BaoCaoDonViLinhVucLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/ThongKeTheoDonVi/components/BaoCaoDonViLinhVuc"
    )
);
const BaoCaoTongHopDonViLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/ThongKeTheoDonVi/components/BaoCaoTongHopDonVi"
    )
);
const BaoCaoTongHopDonVi2Lazy = lazy(
  () =>
    import(
      "../../../features/thongKe/ThongKeTheoDonVi/components/BaoCaoTongHopDonVi2"
    )
);
const BaoCaoTongHopTheoTruongHopLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/ThongKeTheoDonVi/components/BaoCaoTheoTruongHop/BaoCaoTheoTruongHop"
    )
);
const BaoCaoTongHop06aLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/ThongKeTheoDonVi/components/BaoCaoTongHop06a"
    )
);
const BaoCaoTongHop06aCacCapLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/ThongKeTheoDonVi/components/BaoCaoTongHop06CacCap"
    )
);
const BaoCaoTongHop07aLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/ThongKeTheoDonVi/components/BaoCaoTongHop07a"
    )
);
const BaoCaoTongHop07bLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/ThongKeTheoDonVi/components/BaoCaoTongHop07b/BaoCaoTongHop07b"
    )
);
const BaoCaoSoTheoHoSoLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/ThongKeTheoDonVi/components/SoTheoDoiHoSo"
    )
);
const BaoCaoTongHopTraCuuCSDLDanCuLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/ThongKeTheoDonVi/components/BaoCaoTraCuuCSDLDanCu"
    )
);
const ThanhToanTrucTuyen2Lazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeQD766/components/ThanhToanTrucTuyen2"
    )
);
const TheoDoiChiTieuDVCTrucTuyen2Lazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeQD766/components/TheoDoiChiTieuDVCTrucTuyen2"
    )
);
const TienDoGiaiQuyet2Lazy = lazy(
  () =>
    import("../../../features/thongKe/thongKeQD766/components/TienDoGiaiQuyet2")
);
const MucDoSoHoaLazy = lazy(
  () => import("../../../features/thongKe/thongKeQD766/components/ChiTieuSoHoa")
);
const HoSoQuaHanLazy = lazy(
  () => import("../../../features/thongKe/thongKeQD766/components/HoSoQuaHan")
);
const ThongKeThanhToanTrucTuyenLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeQD766/components/ThongKeThanhToanTrucTuyen"
    )
);
const ThongKeBaoCaoThuTucLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeQD766/components/ThongKeTongHopThuTuc"
    )
);
const ThongKeBaoCaoThuTucTheoDonViLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/ThongKeTheoDonVi/components/BaoCaoTongHopThuTuc/BaoCaoTongHopThuTucTheoDonVi"
    )
);
const BaoCaoNguoiNopHoSoLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/ThongKeTheoDonVi/components/BaoCaoNguoiNopHoSo"
    )
);
const DonDocThanhToanTrucTuyenLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeQD766/components/DonDocThanhToanTrucTuyen"
    )
);
const ThongKeThanhToanTheoHinhThucThanhToanLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeQD766/components/ThongKeThanhToanTheoHinhThucThanhToan"
    )
);
const ThongKeHoSoChungThucLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/hosochungthuc/components/ThongKeHoSoChungThucTable"
    )
);

const HoSoTiepNhanQuaHanLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/ThongKeTheoDonVi/components/ThongKeHoSoTiepNhanQuaHan/ThongKeHoSoTiepNhanQuaHanTable"
    )
);
const ThongKeThanhToanTheoDonViLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/ThongKeTheoDonVi/components/TongHopThanhToan/TongHopThanhToanTheoDonViTable"
    )
);
const ThongKeDanhSachThuTucLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/DanhSachThuTuc/components/DanhSachThuTucTable"
    )
);
const ThongKeTiepNhanHoSoTheoDonViLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/ThongKeTheoDonVi/components/TiepNhanHoSoTheoDonVi"
    )
);
// thongKeSoLuongThuTucTheoDonVi
const ThongKeDanhSachHoSoLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/ThongKeDanhSachHoSo/components/ThongKeDanhSachHoSoTable"
    )
);
const BaoCaoHoSoNopTuDvcLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/ThongKeTheoDonVi/components/BaoCaoHoSoNopTuCongDVC"
    )
);
const ThongKeThuTucPhatSinhHoSoLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeQD766/components/ThuTucPhatSinhHoSo/ThuTucPhatSinhHoSoTable"
    )
);
const ThongKeHoSoLienThongLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeHoSoLienThong/components/ThongKeHoSoLienThongTable"
    )
);
const ThongKeHoSoTrongNgayLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/ThongKeHoSoTrongNgay/components/ThongKeHoSoTrongNgayTable"
    )
);
const TongHopHoSoTheoTrangThaiLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/ThongKeTheoDonVi/components/TongHopHoSoTheoTrangThai"
    )
);
export const thongKeRouters: RouteObject[] = [
  {
    path: primaryRoutes.dvc.thongKe.tiepNhanHoSoTrucTuyen
      .tiepNhanHoSoTrucTuyenCapTinh,
    element: <ThongKeHoSoTrucTuyenCapTinhLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.tiepNhanHoSoTrucTuyen
      .tiepNhanHoSoTrucTuyenCacSoBanNganh,
    element: <ThongKeHoSoTrucTuyenCacSoBanNganhLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.hoSoChungThuc.root,
    element: <ThongKeHoSoChungThucLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.tiepNhanHoSoTrucTuyen
      .tiepNhanHoSoTrucTuyenCapHuyen,
    element: <ThongKeHoSoTrucTuyenCapHuyenLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.tiepNhanHoSoTrucTuyen
      .tiepNhanHoSoTrucTuyen,
    element: <ThongKeHoSoTrucTuyenLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.tiepNhanHoSoTrucTuyen
      .tiepNhanHoSoTrucTuyenCapXa,
    element: <ThongKeHoSoTrucTuyenCapXaLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.tienDoGiaiQuyet,
    element: <TienDoGiaiQuyetLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.theoDoiChiTieuDVCTrucTuyen,
    element: <TheoDoiChiTieuDVCTrucTuyenLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.thanhToanTrucTuyen,
    element: <ThanhToanTrucTuyenLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.thongKeTongHop,
    element: <ThongKeTongHopLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.thongKeTongHopThuTuc,
    element: <ThongKeBaoCaoThuTucLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.BaoCaoTongHopThuTucTheoDonVi,
    element: <ThongKeBaoCaoThuTucTheoDonViLazy />,
  },

  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.baoCaoTheoThuTuc,
    element: <BaoCaoTongHopThuTucLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.baoCaoTheoLinhVuc,
    element: <BaoCaoTongHopLinhVucLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.baoCaoTheoLinhVuc2,
    element: <BaoCaoTongHopLinhVuc2Lazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.baoCaoDonViLinhVuc,
    element: <BaoCaoDonViLinhVucLazy />,
  },

  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.baoCaoTheoDonVi,
    element: <BaoCaoTongHopDonViLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.baoCaoTheoDonVi2,
    element: <BaoCaoTongHopDonVi2Lazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.baoCaoTheoTruongHop,
    element: <BaoCaoTongHopTheoTruongHopLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.baoCaoHoSoNopTuCongDVC,
    element: <BaoCaoHoSoNopTuDvcLazy />,
  },

  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.traCuuCSDLDanCu,
    element: <BaoCaoTongHopTraCuuCSDLDanCuLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.thongKeNguoiNopHoSo,
    element: <BaoCaoNguoiNopHoSoLazy />,
  },

  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.baoCao06a,
    element: <BaoCaoTongHop06aLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.baoCao06CacCap,
    element: <BaoCaoTongHop06aCacCapLazy />,
  },

  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.baoCao07a,
    element: <BaoCaoTongHop07aLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.thanhToanTrucTuyen2,
    element: <ThanhToanTrucTuyen2Lazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.theoDoiChiTieuDVCTrucTuyen2,
    element: <TheoDoiChiTieuDVCTrucTuyen2Lazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.tienDoGiaiQuyet2,
    element: <TienDoGiaiQuyet2Lazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.chiTieuSoHoa,
    element: <MucDoSoHoaLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.hoSoQuaHan,
    element: <HoSoQuaHanLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.soTheoDoiHoSo,
    element: <BaoCaoSoTheoHoSoLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.thongKeThanhToanTrucTuyen,
    element: <ThongKeThanhToanTrucTuyenLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.donDocThanhToanTrucTuyen,
    element: <DonDocThanhToanTrucTuyenLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.donDocThanhToanTrucTuyenDonVi,
    element: <DonDocThanhToanTrucTuyenLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.tiepNhanHoSoTrucTuyen.hoSoTiepNhanQuaHan,
    element: <HoSoTiepNhanQuaHanLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.tongHopThanhToanTheoDonVi,
    element: <ThongKeThanhToanTheoDonViLazy />,
  },

  {
    path: primaryRoutes.dvc.thongKe.tongHop.thongKeDanhSachThuTuc,
    element: <ThongKeDanhSachThuTucLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.tongHop.thongKeDanhSachHoSo,
    element: <ThongKeDanhSachHoSoLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.thuPhiLePhi.theoHinhThucThanhToan,
    element: <ThongKeThanhToanTheoHinhThucThanhToanLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.thuPhiLePhi.theoHinhThucThanhToanDonVi,
    element: <ThongKeThanhToanTheoHinhThucThanhToanLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.thongKeThuTucPhatSinhHoSo,
    element: <ThongKeThuTucPhatSinhHoSoLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.hoSoLienThong,
    element: <ThongKeHoSoLienThongLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.hoSoTrongNgay,
    element: <ThongKeHoSoTrongNgayLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.tiepNhanHoSoTheoDonVi,
    element: <ThongKeTiepNhanHoSoTheoDonViLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.tiepNhanHoSoTrucTuyen.thongKeHoSoTrucTuyenTheoThuTuc,
    element: <ThongKeHoSoTrucTuyenTheoThuTucLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.baoCao07b,
    element: <BaoCaoTongHop07bLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.tiepNhanHoSoTrucTuyen.theoMucDo34,
    element: <ThongKeHoSoTrucTuyenTheoMucDo34Lazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.tongHop.thongKeTheoTrangThaiHoSo,
    element: <TongHopHoSoTheoTrangThaiLazy />,
  },
];
