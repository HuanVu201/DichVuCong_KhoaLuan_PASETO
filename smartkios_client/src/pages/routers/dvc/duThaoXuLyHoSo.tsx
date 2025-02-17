import { Service } from "@/services";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service;

const BoSungChoXuLyWrapper = lazy(() => import("../../dvc/duthaoxulyhoso/boSungchoXuLy/BoSungChoXuLyTable"))
const TraLaiXinRutChoXuLyTable = lazy(() => import("../../dvc/duthaoxulyhoso/traLaiXinRutChoXuLy/TraLaiXinRutChoXuLyTable"))
const BoSungDaXuLyTable = lazy(() => import("../../dvc/duthaoxulyhoso/boSungDaXuLy/BoSungDaXuLyTable"))
const TraLaiXinRutDaXuLyTable = lazy(() => import("../../dvc/duthaoxulyhoso/traLaiXinRutDaXuLy/TraLaiXinRutDaXuLyTable"))
const BoSungChoKyDuyet = lazy(() => import("../../dvc/duthaoxulyhoso/boSungChoKyDuyet/BoSungChoKyDuyet"))
const TraLaiXinRutChoKyDuyetTable = lazy(() => import("../../dvc/duthaoxulyhoso/traLaiXinRutChoKyDuyet/TraLaiXinRutChoKyDuyetTable"))

export const duThaoXuLyHoSoRouters: RouteObject[] = [
  {
    path: primaryRoutes.dvc.duThaoXuLyHoSo.boSungChoXuLy,
    element: <BoSungChoXuLyWrapper/>,
  },
  {
    path: primaryRoutes.dvc.duThaoXuLyHoSo.traLaiXinRutChoXuLy,
    element: <TraLaiXinRutChoXuLyTable/>,
  },
  {
    path: primaryRoutes.dvc.duThaoXuLyHoSo.boSungDaXuLy,
    element: <BoSungDaXuLyTable />,
  },
  {
    path: primaryRoutes.dvc.duThaoXuLyHoSo.traLaiXinRutDaXuLy,
    element: <TraLaiXinRutDaXuLyTable />,
  },
  {
    path: primaryRoutes.dvc.duThaoXuLyHoSo.boSungChoKyDuyet,
    element: <BoSungChoKyDuyet />,
  },
  {
    path: primaryRoutes.dvc.duThaoXuLyHoSo.traLaiXinRutChoKyDuyet,
    element: <TraLaiXinRutChoKyDuyetTable />,
  },
];
