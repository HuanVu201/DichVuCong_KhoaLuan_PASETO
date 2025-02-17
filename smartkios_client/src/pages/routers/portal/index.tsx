import { RouteObject } from "react-router-dom";
import { Service } from "@/services";
import React from "react";
import { RequiredAuth } from "@/features/auth/components";

const HomeLazy = React.lazy(() => import("../../../features/portaldvc/home"))
const TinTucPageLazy = React.lazy(() => import("../../../features/portaldvc/TinTuc/TinTucWrapper"))
const TinBaiPortalWrapperLazy = React.lazy(() => import("../../../features/portaldvc/TinTuc/TinBaiPortalWrapper"))
const HoiDapPageLazy = React.lazy(() => import("../../../features/portaldvc/HoiDap"))
const DanhGiaHaiLongLazy = React.lazy(() => import("../../../features/portaldvc/DanhGiaHaiLong"))
const DanhMucThuTucPortalWrapperLazy = React.lazy(() => import("../../../features/portaldvc/DanhMucThuTuc"))
const TrangWikiWrapperLazy = React.lazy(() => import("../../../features/portaldvc/TinTuc/TrangWikiWrapper"))
const HoiDapChiTietLazy = React.lazy(() => import("../../../features/portaldvc/HoiDap/components/HoiDapChitiet"))
const TraCuuHoSoPortalWrapperLazy = React.lazy(() => import("../../../features/portaldvc/TraCuu"))
const ThanhToanPortalWrapperLazy = React.lazy(() => import("../../../features/portaldvc/ThanhToan"))

const DichVuCongTrucTuyenWrapperLazy = React.lazy(() => import("../../../features/portaldvc/DvcTrucTuyen/DvcTrucTuyen"))
const TiepNhanTrucTuyenWrapperLazy = React.lazy(() => import("../../portal/TiepNhanTrucTuyen/TiepNhanTrucTuyen"))
const XacNhanThanhToanPortalLazy = React.lazy(() => import("../../../features/portaldvc/ThanhToan/XacNhanThanhToan"))
const ThongKePageLazy = React.lazy(() => import("../../../features/portaldvc/ThongKe"))
const ThongKeMapLazy = React.lazy(() => import("../../../features/portaldvc/ThongKeMap"))
const HuongDanSuDungPageLazy = React.lazy(() => import("../../../features/portaldvc/HuongDanSuDungPortal"))
const NhungCauHoiThuongGapPageLazy = React.lazy(() => import("../../../features/portaldvc/NhungCauHoiThuongGap"))
const NhungCauHoiThuongGapChiTietLazy = React.lazy(() => import("../../../features/portaldvc/NhungCauHoiThuongGap/components/DetailNhungCauHoiThuongGap"))
const DSTaiLieuHDSDLazy = React.lazy(() => import("../../../features/portaldvc/DanhSachTaiLieuHDSD"))
const GuiPaknLazy = React.lazy(() => import("../../../features/portaldvc/PhanAnhKienNghi/guiPaknDvcTinh"))
const DanhSachPaknLazy = React.lazy(() => import("../../../features/portaldvc/PhanAnhKienNghi/listPaknDvcTinh"))
const QuanLyVanBanLazy = React.lazy(() => import("../../../features/portaldvc/QuanLyVanBan"))

const { apiEndpoints, primaryRoutes } = Service;
export const portalRoutes: RouteObject[] = [
  {
    path: primaryRoutes.portaldvc.home,
    element: <HomeLazy />,
  },
  {
    path: primaryRoutes.portaldvc.tinTuc,
    element: <TinTucPageLazy />,
  },
  {
    path: primaryRoutes.portaldvc.danhgiahailong,
    element: <DanhGiaHaiLongLazy />,
  },
  {
    path: primaryRoutes.portaldvc.trangWiki,
    element: <TrangWikiWrapperLazy />,
  },
  {
    path: primaryRoutes.portaldvc.tinbai,
    element: <TinBaiPortalWrapperLazy />,
  },
  {
    path: primaryRoutes.portaldvc.hoidap,
    element: <HoiDapPageLazy />,
  },
  {
    path: primaryRoutes.portaldvc.hoidapchitiet,
    element: <HoiDapChiTietLazy />,
  },
  {
    path: primaryRoutes.portaldvc.danhmucTTHC,
    element: <DanhMucThuTucPortalWrapperLazy />,
  },
  {
    path: primaryRoutes.portaldvc.danhSachPAKN,
    element: <DanhSachPaknLazy />,
  },
  {
    path: primaryRoutes.portaldvc.traCuu,
    element: <TraCuuHoSoPortalWrapperLazy />,
  },
  {
    path: primaryRoutes.portaldvc.dvcTrucTuyen,
    element: <DichVuCongTrucTuyenWrapperLazy />,
  },
  
  {
    path: primaryRoutes.portaldvc.thanhToan,
    element: <ThanhToanPortalWrapperLazy />,
  },
  {
    path: primaryRoutes.portaldvc.huongdansudungportal,
    element: <HuongDanSuDungPageLazy />,
  },
  {
    path: primaryRoutes.portaldvc.guiPAKN,
    element: <GuiPaknLazy />,
  },
  // {
  //   path: primaryRoutes.portaldvc.danhSachPAKN,
  //   element: <DanhSachPaknLazy />,
  // },
  {
    path: primaryRoutes.portaldvc.nopHoSoTrucTuyen,
    element: <TiepNhanTrucTuyenWrapperLazy />,
  },
  {
    path: primaryRoutes.portaldvc.thongke,
    element: <ThongKePageLazy />,

  },
  {
    path: primaryRoutes.portaldvc.thongkeMap,
    element: <ThongKeMapLazy />,

  },
  {
    path: primaryRoutes.portaldvc.xacNhanThanhToan,
    element: <XacNhanThanhToanPortalLazy />
  },
  {
    path: primaryRoutes.portaldvc.nhungcauhoithuonggap,
    element: <NhungCauHoiThuongGapPageLazy />
  },
  {
    path: primaryRoutes.portaldvc.nhungcauhoithuonggapchitiet,
    element: <NhungCauHoiThuongGapChiTietLazy />
  },
  {
    path: primaryRoutes.portaldvc.dstailieuhuongdansudung,
    element: <DSTaiLieuHDSDLazy />
  },
  {
    path: primaryRoutes.portaldvc.quanlyvanban,
    element: <QuanLyVanBanLazy />
  },

  


  
]