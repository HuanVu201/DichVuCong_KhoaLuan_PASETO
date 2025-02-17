import { Service } from "@/services";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const { apiEndpoints, primaryRoutes } = Service;
const HoSoQuaHanTableLazy = lazy(
  () => import("../../dvc/theodoihosoTN/hosoquahan/components/HoSoQuaHanTable")
);
const HoSoToiHanTableLazy = lazy(
  () => import("../../dvc/theodoihosoTN/hosotoihan/components/HoSoToiHanTable")
);
const TheoDoiTatCaHoSoTableLazy = lazy(
  () =>
    import(
      "../../dvc/theodoihosoTN/theodoitatcahoso/components/TheoDoiTatCaHoSoTable"
    )
);

export const theoDoiHoSoTNRouters: RouteObject[] = [
  {
    path: primaryRoutes.dvc.theoDoiHoSoTN.hoSoQuaHan,
    element: <HoSoQuaHanTableLazy />,
  },
  {
    path: primaryRoutes.dvc.theoDoiHoSoTN.hoSoToiHan,
    element: <HoSoToiHanTableLazy />,
  },
  {
    path: primaryRoutes.dvc.theoDoiHoSoTN.theoDoiTatCaHoSo,
    element: <TheoDoiTatCaHoSoTableLazy />,
  },
];
