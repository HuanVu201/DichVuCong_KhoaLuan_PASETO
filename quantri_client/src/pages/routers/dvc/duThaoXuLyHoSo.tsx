import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service;

const BoSungChoXuLyWrapper = lazy(() => import("../../dvc/duthaoxulyhoso/boSungchoXuLy/BoSungChoXuLyTable"))
const TraLaiXinRutChoXuLyTable = lazy(() => import("../../dvc/duthaoxulyhoso/traLaiXinRutChoXuLy/TraLaiXinRutChoXuLyTable"))
const BoSungDaXuLyTable = lazy(() => import("../../dvc/duthaoxulyhoso/boSungDaXuLy/BoSungDaXuLyTable"))
const TraLaiXinRutDaXuLyTable = lazy(() => import("../../dvc/duthaoxulyhoso/traLaiXinRutDaXuLy/TraLaiXinRutDaXuLyTable"))
const BoSungChoDuyetThongQua = lazy(() => import("../../dvc/duthaoxulyhoso/boSungChoKyDuyet/BoSungChoDuyetThongQua"))
const TraLaiXinRutChoDuyetThongQuaTable = lazy(() => import("../../dvc/duthaoxulyhoso/traLaiXinRutChoKyDuyet/TraLaiXinRutChoDuyetThongQuaTable"))
const XinLoiChoDuyetThongQuaTable = lazy(() => import("../../dvc/duthaoxulyhoso/xinLoiChoXuLy/XinLoiChoDuyetThongQua"))
const XinLoiDaXuLyTable = lazy(() => import("../../dvc/duthaoxulyhoso/xinLoiDaXuLy/XinLoiDaXuLyTable"))

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
    path: primaryRoutes.dvc.duThaoXuLyHoSo.boSungChoDuyetThongQua,
    element: <BoSungChoDuyetThongQua />,
  },
  {
    path: primaryRoutes.dvc.duThaoXuLyHoSo.traLaiXinRutChoDuyetThongQua,
    element: <TraLaiXinRutChoDuyetThongQuaTable />,
  },
  {
    path: primaryRoutes.dvc.duThaoXuLyHoSo.xinLoiChoDuyetThongQua,
    element: <XinLoiChoDuyetThongQuaTable />,
  },
  {
    path: primaryRoutes.dvc.duThaoXuLyHoSo.xinLoiDaXuLy,
    element: <XinLoiDaXuLyTable />,
  },
];
