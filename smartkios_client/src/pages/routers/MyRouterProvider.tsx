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
} from "./admin";
import {
  CanBoBCCIRouters,
  chungThucRouters,
  duThaoXuLyHoSoRouters,
  thongKeRouters,
  tiepNhanHoSoRouters,
  xuLyHoSoRouters,
} from "./dvc";
import { cauHinhHeThongRouters } from "./admin/cauHinhHeThong";
import { bannerRoutes } from "../portaldvc_admin";
import { lazy, useMemo } from "react";

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
import { theoDoiHoSoTNRouters } from "./dvc/theoDoiHoSoTN";
import { mobileRoutes } from "./mobile";
import { ProcedureLayOut } from "@/lib/antd/components/layout/ProcedureLayout";
import { HoSoCaNhanLayout } from "@/features/portaldvc/HoSoCaNhan/components/HoSoCaNhanLayout";
import { hoSoCaNhanRoutes } from "./portal/hosocanhan";
import { SmartKioskLayout } from "@/components/layout/SmartKioskLayout";
import { smartKioskRoutes } from "./smartkiosk";

const MenuKetQuaThuTucTableLazy = lazy(
  () =>
    import(
      "../../features/menuketquathutuc/components/actions/MenuKetQuaThuTucActionTable"
    )
);
const { apiEndpoints, primaryRoutes } = Service;

export const MyRouterProvider = () => {
  const routes: RouteObject[] = [
    // {
    //   path: primaryRoutes.redirectUser,
    //   element: <RedirectUser />,
    // },
    // ...mobileRoutes,
    // {
    //   path: "/",
    //   element: (
    //     <Suspense fallback={<></>}>
    //       <RequiredAuth>
    //         <MasterLayout />
    //       </RequiredAuth>
    //     </Suspense>
    //   ),
    //   errorElement: <DynamicImportFailBoundary />,
    //   children: [
    //     {
    //       index: true,
    //       element: <Navigate to={primaryRoutes.redirectUser} />,
    //     },
    //     {
    //       path: primaryRoutes.dvc.root,
    //       children: [
    //         {
    //           index: true,
    //           element: (
    //             <Navigate
    //               to={primaryRoutes.dvc.xuLyHoSo.dangXuLy}
    //               replace={true}
    //             />
    //           ),
    //         },
    //         ...tiepNhanHoSoRouters,
    //         ...xuLyHoSoRouters,
    //         ...traKetQuaRouters,
    //         ...boSungHoSoRouters,
    //         ...theoDoiHoSoRouters,
    //         ...theoDoiHoSoTNRouters,
    //         ...thuPhiLePhiRouters,
    //         ...traCuuRouters,
    //         ...thongKeRouters,
    //         ...chungThucRouters,
    //         ...duThaoXuLyHoSoRouters,
    //         ...CanBoBCCIRouters,
    //       ],
    //     },
    //     {
    //       path: primaryRoutes.admin.root,
    //       children: [
    //         ...quanTriNguoiDungRouters(),
    //         ...danhMucDungChungRouters(),
    //         ...danhMucDVCRouters(),
    //         ...cauHinhHeThongRouters(),
    //         ...quanTriDonViRouters(),
    //         ...thongKeQuanTriRouters(),
    //         ...danhGiaHaiLongRouters(),
    //       ],
    //     },
    //     {
    //       path: primaryRoutes.portaldvc_admin.root,
    //       children: [...bannerRoutes()],
    //     },
    //   ],
    // },
    // {
    //   path: primaryRoutes.admin_tthc.root,
    //   element: (
    //     <Suspense fallback={<></>}>
    //       <RequiredAuth>
    //         <ProcedureLayOut>
    //           <MenuKetQuaThuTucTableLazy />
    //         </ProcedureLayOut>
    //       </RequiredAuth>
    //     </Suspense>
    //   ),
    // },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <Suspense fallback={<div>loading...</div>}>
          <SmartKioskLayout />
        </Suspense>
      ),
      errorElement: <DynamicImportFailBoundary />,
      children: [
        {
          index: true,
          element: <Navigate to={primaryRoutes.smartkiosk.root} />,
        },
        ...smartKioskRoutes,

      ],
    },


    // {
    //   path: primaryRoutes.portaldvc.root,
    //   element: (
    //     <Suspense fallback={<div>loading...</div>}>
    //       <PortalMasterLayout />
    //     </Suspense>
    //   ),
    //   errorElement: <DynamicImportFailBoundary />,
    //   children: [
    //     {
    //       index: true,
    //       element: <Navigate to={primaryRoutes.portaldvc.home} />,
    //     },
    //     ...portalRoutes,
    //     {
    //       path: primaryRoutes.portaldvc.hosocanhan.root,
    //       element: <HoSoCaNhanLayout />,
    //       children: [...hoSoCaNhanRoutes],
    //     },
    //   ],
    // },
  ];
  return (
    <RouterProvider
      router={createBrowserRouter(routes)}
      future={{ v7_startTransition: true }}
    />
  );
};
