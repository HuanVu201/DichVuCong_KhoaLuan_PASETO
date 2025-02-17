import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service;

const TiepNhanHoSoChungThucTrucTiep = lazy(() => import("../../dvc/chungthuc/tructiep/ChungThucHoSoTrucTiep"))
const ChoTiepNhanChungThucTrucTuyen = lazy(() => import("../../dvc/chungthuc/tructuyen/ChoTiepNhanChungThucTrucTuyen"))
const DangXuLyHoSoChungThuc = lazy(() => import("../../dvc/chungthuc/dangxuly/DangXuLyHoSoChungThuc"))
const ChoTraKetQuaChungThuc = lazy(() => import("../../dvc/chungthuc/chotraketqua/ChoTraKetQuaChungThuc"))
const SoChungThucLazy = lazy(() => import('../../../features/sochungthuc/components/SoChungThucTable'))
const DaTraKetQuaChungThuc = lazy(() => import('../../dvc/chungthuc/datraketqua/DaTraKetQuaChungThuc'))
const TheoDoiHoSoChungThucLazy = lazy(() => import('../../dvc/chungthuc/theodoihosochungthuc/TheoDoiHoSoChungThuc'))

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
  {
    path: primaryRoutes.dvc.chungThuc.daTraKetQua,
    element: <DaTraKetQuaChungThuc />,
  },
  {
    path: primaryRoutes.dvc.chungThuc.danhMucSoChungThuc,
    element: <SoChungThucLazy />,
  },
  {
    path: primaryRoutes.dvc.chungThuc.theoDoiHoSoChungThuc,
    element: <TheoDoiHoSoChungThucLazy />,
  },
  
];
