import { useAppSelector } from "@/lib/redux/Hooks";
import {
  Navigate,
  RouteObject,
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { Login, RequiredAuth } from "../../features/auth/components";
import React, { Suspense } from "react";
import { MasterLayout, PortalMasterLayout } from "../../components/layout";
import { Service } from "@/services";
import {
  danhMucDVCRouters,
  quanTriNguoiDungRouters,
  danhMucDungChungRouters,
  quanTriDonViRouters,
  thongKeQuanTriRouters,
  danhGiaHaiLongRouters,
  dinhDanhCongDanRouters,
  quanLyTruyCapDvcRouters,
  lienThongQLVBRouters,
  suDungAPIRouters,
  CaNhanHoaNguoiDungRouters,
  QuanLySuDungKhoTaiLieuRouters,
} from "./admin";
import {
  CanBoBCCIRouters,
  chungThucRouters,
  duThaoXuLyHoSoRouters,
  hoSoPhiDiaGioiRouters,
  soHoaHoSoRoutes,
  thongKeRouters,
  tiepNhanHoSoRouters,
  xuLyHoSoRouters,
} from "./dvc";
import { cauHinhHeThongRouters } from "./admin/cauHinhHeThong";
import { bannerRoutes } from "../portaldvc_admin";

import { traKetQuaRouters } from "./dvc/traKetQua";
import { boSungHoSoRouters } from "./dvc/boSungHoSo";
import { theoDoiHoSoRouters } from "./dvc/theoDoiHoSo";
import { thuPhiLePhiRouters } from "./dvc/thuPhiLePhi";
import { traCuuRouters } from "./dvc/traCuu";
import { RedirectUser } from "./RedirectUser";
import { portalRoutes } from "./portal";
import { DynamicImportFailBoundary } from "./DynamicImportFailBoundary";
import SmartKioskWrapper from "@/features/smartkiosk";
import ReadQrCode from "../dvc/MauPhieu/ReadQrCode/readQrCode";
import ChiSoTienDoGiaiQuyetLazy from "../../features/portaldvc/PageThongKePortal/ChiSoTienDoGiaiQuyet/index";
import ThongKeTongHopDonViTelevisionLazy from "../../features/portaldvc/PageThongKePortal/ThongKeTongHopDonViTelevision/index";
import ThongKeThangHCCTelevisionLazy from "../../features/portaldvc/PageThongKePortal/ThongKeThangHCCTelevision";
import TraCuuHccSwapperLazy from "../../features/portaldvc/PageThongKePortal/TraCuuHcc/index";
import DanhGiaHaiLongHccSwapperLazy from "../../features/portaldvc/PageThongKePortal/DanhGiaHaiLongHcc/index";
import { theoDoiHoSoTNRouters } from "./dvc/theoDoiHoSoTN";
import { mobileRoutes } from "./mobile";
import { ProcedureLayOut } from "@/lib/antd/components/layout/ProcedureLayout";
import { HoSoCaNhanLayout } from "@/features/portaldvc/HoSoCaNhan/components/HoSoCaNhanLayout";
import { hoSoCaNhanRoutes } from "./portal/hosocanhan";
import { lazy } from "@/utils/lazyLoading";
import { huongDanNopHoSoRouters } from "./dvc/huongDanNopHoSo";
import { danhSachTaiLieuHDSDChoCanBoRouters } from "./dvc/danhSachTaiLieuHDSD";
import { FileGetterComponent } from "../file/FileGetterComponent";
import Filepublic from "@/features/filepublic";
import { dongBoKhoDienTuCongDan } from "./admin/dongBoKhoDienTuCongDan";
import { chamSoHoaRouter } from "./dvc/chamSoHoa";

const MenuKetQuaThuTucTableLazy = lazy(
  () =>
    import(
      "../../features/menuketquathutuc/components/actions/MenuKetQuaThuTucWrapper"
    )
);
const { apiEndpoints, primaryRoutes } = Service;

export const MyRouterProvider = () => {
  const routes: RouteObject[] = [
    {
      path: primaryRoutes.redirectUser,
      element: <RedirectUser />,
    },
    ...mobileRoutes,
    {
      path: "/",
      element: (
        <Suspense fallback={<></>}>
          <RequiredAuth>
            <MasterLayout />
          </RequiredAuth>
        </Suspense>
      ),
      errorElement: <DynamicImportFailBoundary />,
      children: [
        {
          index: true,
          element: <Navigate to={primaryRoutes.redirectUser} />,
        },
        {
          path: primaryRoutes.dvc.root,
          children: [
            {
              index: true,
              element: (
                <Navigate
                  to={primaryRoutes.dvc.xuLyHoSo.dangXuLy}
                  replace={true}
                />
              ),
            },
            ...tiepNhanHoSoRouters,
            ...xuLyHoSoRouters,
            ...traKetQuaRouters,
            ...boSungHoSoRouters,
            ...theoDoiHoSoRouters,
            ...theoDoiHoSoTNRouters,
            ...thuPhiLePhiRouters,
            ...traCuuRouters,
            ...thongKeRouters,
            ...chungThucRouters,
            ...duThaoXuLyHoSoRouters,
            ...CanBoBCCIRouters,
            ...huongDanNopHoSoRouters,
            ...danhSachTaiLieuHDSDChoCanBoRouters,
            ...hoSoPhiDiaGioiRouters,
            ...soHoaHoSoRoutes,
            ...chamSoHoaRouter,
            ...danhGiaHaiLongRouters(),

          ],
        },
        {
          path: primaryRoutes.admin.root,
          children: [
            ...quanTriNguoiDungRouters(),
            ...danhMucDungChungRouters(),
            ...danhMucDVCRouters(),
            ...cauHinhHeThongRouters(),
            ...quanTriDonViRouters(),
            ...thongKeQuanTriRouters(),
            ...dinhDanhCongDanRouters(),
            ...quanLyTruyCapDvcRouters(),
            ...lienThongQLVBRouters(),
            ...suDungAPIRouters(),
            ...CaNhanHoaNguoiDungRouters(),
            ...QuanLySuDungKhoTaiLieuRouters(),
            ...dongBoKhoDienTuCongDan,
          ],
        },
        {
          path: primaryRoutes.portaldvc_admin.root,
          children: [...bannerRoutes()],
        },
      ],
    },
    {
      path: primaryRoutes.admin_tthc.root,
      element: (
        <Suspense fallback={<></>}>
          <RequiredAuth>
            <ProcedureLayOut>
              <MenuKetQuaThuTucTableLazy />
            </ProcedureLayOut>
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/smartkiosk",
      element: <SmartKioskWrapper />,
    },
    {
      path: primaryRoutes.filepublic.root,
      element: <Filepublic />,
    },
    {
      path: "/apiqr/qr",
      element: <ReadQrCode />,
    },
    {
      path: '/portaldvc/chi-so-tien-do-giai-quyet',
      element: <ChiSoTienDoGiaiQuyetLazy />,
    },
    // {
    //   path: '/portaldvc/guest/thong-ke-hcc',
    //   element: <ThongKeTongHopDonViTelevisionLazy />,
    // },
    // {
    //   path: '/portaldvc/guest/thong-ke-thang-hcc',
    //   element: <ThongKeThangHCCTelevisionLazy />,
    // },
    {
      path: '/portaldvc/guest/tra-cuu-hcc',
      element: <TraCuuHccSwapperLazy />,
    },
    {
      path: '/portaldvc/guest/danh-gia-hai-long-hcc',
      element: <DanhGiaHaiLongHccSwapperLazy />,
    },

    {
      path: primaryRoutes.portaldvc.root,
      element: (
        <Suspense fallback={<div>loading...</div>}>
          <PortalMasterLayout />
        </Suspense>
      ),
      errorElement: <DynamicImportFailBoundary />,
      children: [
        {
          index: true,
          element: <Navigate to={primaryRoutes.portaldvc.home} />,
        },
        ...portalRoutes,
        {
          path: primaryRoutes.portaldvc.hosocanhan.root,
          element: <HoSoCaNhanLayout />,
          children: [...hoSoCaNhanRoutes],
        },
      ],
    },
    {
      path: primaryRoutes.file.root,
      element: <RequiredAuth>
        <FileGetterComponent></FileGetterComponent>
      </RequiredAuth>
    }
  ];
  return (
    <RouterProvider
      router={createBrowserRouter(routes)}
      future={{ v7_startTransition: true }}
    />
  );
};
