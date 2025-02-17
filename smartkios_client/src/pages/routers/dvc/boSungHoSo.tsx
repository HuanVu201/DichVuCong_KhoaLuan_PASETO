import { Service } from "@/services";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service;
const ChoBoSungTableLazy = lazy(
  () => import("../../dvc/bosunghoso/chobosung/components/ChoBoSungTable")
);
const DaBoSungTableLazy = lazy(
  () => import("../../dvc/bosunghoso/dabosung/components/DaBoSungTable")
);
const DaHoanThanhBoSungTableLazy = lazy(
  () =>
    import(
      "../../dvc/bosunghoso/dahoanthanhbosung/components/DaHoanThanhBoSungTable"
    )
);
const YeuCauBoSungTableLazy = lazy(
  () => import("../../dvc/bosunghoso/yeucaubosung/components/YeuCauBoSungTable")
);

export const boSungHoSoRouters: RouteObject[] = [
  {
    path: primaryRoutes.dvc.boSungHoSo.choBoSung,
    element: <ChoBoSungTableLazy />,
  },
  {
    path: primaryRoutes.dvc.boSungHoSo.daBoSung,
    element: <DaBoSungTableLazy />,
  },
  {
    path: primaryRoutes.dvc.boSungHoSo.daHoanThanhBoSung,
    element: <DaHoanThanhBoSungTableLazy />,
  },
  {
    path: primaryRoutes.dvc.boSungHoSo.yeuCauBoSung,
    element: <YeuCauBoSungTableLazy />,
  },
];
