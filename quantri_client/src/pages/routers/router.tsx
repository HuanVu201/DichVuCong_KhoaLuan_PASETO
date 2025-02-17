import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import { Login, RequiredAuth } from "../../features/auth/components";
import React, { Suspense } from "react";
import { MasterLayout, PortalMasterLayout } from "../../components/layout";
import { Service } from "@/services";
import {
  danhMucDVCRouters,
  quanTriNguoiDungRouters,
  danhMucDungChungRouters,
  quanTriDonViRouters,
} from "./admin";
import {
  CanBoBCCIRouters,
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
import { theoDoiHoSoTNRouters } from "./dvc/theoDoiHoSoTN";
import { RedirectUser } from "./RedirectUser";
import { portalRoutes } from "./portal";
import { DynamicImportFailBoundary } from "./DynamicImportFailBoundary";
import { smartKioskRoutes } from "./smartkiosk";
import SmartKioskWrapper from "@/features/smartkiosk";
const { apiEndpoints, primaryRoutes } = Service;
export const adminRouters: RouteObject[] = [
  {
    path: primaryRoutes.redirectUser,
    element: <RedirectUser />,
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<div>loading...</div>}>
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
          ...tiepNhanHoSoRouters,
          ...xuLyHoSoRouters,
          ...traKetQuaRouters,
          ...boSungHoSoRouters,
          ...theoDoiHoSoRouters,
          ...theoDoiHoSoTNRouters,
          ...thuPhiLePhiRouters,
          ...traCuuRouters,
          ...thongKeRouters,
          ...CanBoBCCIRouters,
        ],
      },
      {
        path: primaryRoutes.admin.root,

        children: [
          ...quanTriNguoiDungRouters(),
          ...danhMucDungChungRouters(),
          ...danhMucDVCRouters(),
          ...cauHinhHeThongRouters(),
        ],
      },
      {
        path: primaryRoutes.portaldvc_admin.root,
        children: [...bannerRoutes()],
      },
      // {
      //   path: primaryRoutes.admin.quanTriDonVi.root,
      //   children: [...quanTriDonViRouters()],
      // },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/smartkiosk",
    element: <SmartKioskWrapper />,
  },

  // {
  //   path: primaryRoutes.smartkiosk.root,
  //   element: (
  //     <Suspense fallback={<div>loading...</div>}>
  //       <SmartKioskWrapper></SmartKioskWrapper>
  //     </Suspense>
  //   ),
  // },

  {
    path: primaryRoutes.portaldvc.root,
    element: (
      <Suspense fallback={<div>loading...</div>}>
        <PortalMasterLayout />
      </Suspense>
    ),

    children: [
      {
        index: true,
        element: <Navigate to={primaryRoutes.portaldvc.home} />,
      },
      ...portalRoutes,
    ],
  },
];

export const router = createBrowserRouter(adminRouters);
