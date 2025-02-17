import { lazy } from "react";

import { Service } from "@/services";
import { RouteObject } from "react-router-dom";
const { primaryRoutes } = Service;
const DangKyNhanKqQuaBCCILazy = lazy(
  () => import("../../dvc/CanBoBCCI/DangKy/components/DangKyNhanKqQuaBCCITable")
);
const DaDangKyNhanKqQuaBCCILazy = lazy(
  () =>
    import("../../dvc/CanBoBCCI/DaDangKy/components/DaDangKyNhanKqQuaBCCITable")
);
const DaTraKqQuaBCCILazy = lazy(
  () => import("../../dvc/CanBoBCCI/DaTraKetQua/components/DaTraKqQuaBCCITable")
);
export const CanBoBCCIRouters: RouteObject[] = [
  {
    path: primaryRoutes.dvc.canBoBCCI.dangKy,
    element: <DangKyNhanKqQuaBCCILazy />,
  },
  {
    path: primaryRoutes.dvc.canBoBCCI.daDangKy,
    element: <DaDangKyNhanKqQuaBCCILazy />,
  },
  {
    path: primaryRoutes.dvc.canBoBCCI.daTraKetQua,
    element: <DaTraKqQuaBCCILazy />,
  },
];
