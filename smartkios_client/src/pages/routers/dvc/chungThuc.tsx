import { Service } from "@/services";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service;

const TiepNhanHoSoChungThucTrucTiep = lazy(() => import("../../dvc/chungthuc/tructiep/ChungThucHoSoTrucTiep"))
const ChoTiepNhanChungThucTrucTuyen = lazy(() => import("../../dvc/chungthuc/tructuyen/ChoTiepNhanChungThucTrucTuyen"))
const DangXuLyHoSoChungThuc = lazy(() => import("../../dvc/chungthuc/dangxuly/DangXuLyHoSoChungThuc"))
const ChoTraKetQuaChungThuc = lazy(() => import("../../dvc/chungthuc/chotraketqua/ChoTraKetQuaChungThuc"))

export const chungThucRouters: RouteObject[] = [
  {
    path: primaryRoutes.dvc.chungThuc.moiTiepNhan,
    element: <TiepNhanHoSoChungThucTrucTiep/>,
  },
  {
    path: primaryRoutes.dvc.chungThuc.choTiepNhanTrucTuyen,
    element: <ChoTiepNhanChungThucTrucTuyen/>,
  },
  {
    path: primaryRoutes.dvc.chungThuc.dangXuLy,
    element: <DangXuLyHoSoChungThuc />,
  },
  {
    path: primaryRoutes.dvc.chungThuc.choTraKetQua,
    element: <ChoTraKetQuaChungThuc />,
  },
];
