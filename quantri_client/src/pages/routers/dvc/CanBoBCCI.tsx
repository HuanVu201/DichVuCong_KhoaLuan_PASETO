import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";
const { primaryRoutes } = Service;
const DangKyNhanKqQuaBCCILazy = lazy(
  () => import("../../dvc/CanBoBCCI/DangKy/components/DangKyNhanKqQuaBCCITable")
);
const DaDangKyNhanKqQuaBCCILazy = lazy(
  () =>
    import("../../dvc/CanBoBCCI/DaDangKy/components/DaDangKyNhanKqQuaBCCITable")
);
const CongDanDaDangKyNhanKqQuaBCCILazy = lazy(
  () =>
    import("../../dvc/CanBoBCCI/CongDanDangKy/components/CongDanDangKyNhanKqQuaBCCITable")
);
const DaTraKqQuaBCCILazy = lazy(
  () => import("../../dvc/CanBoBCCI/DaTraKetQua/components/DaTraKqQuaBCCITable")
);
const ThongKeTiepNhanHoSoVaTraKQLazy = lazy(
  () => import("../../../features/thongKe/ThongKeTheoDonVi/components/ThongKeHoSoTiepNhanBuuChinh")
);
const ThongKeDangKyNhanKqQuaBCCILazy = lazy(
  () => import("../../dvc/CanBoBCCI/ThongKeDangKy/components/ThongKeDangKyNhanKqQuaBCCITable")
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
  {
    path: primaryRoutes.dvc.canBoBCCI.thongketiepnhanhosovatrakq,
    element: <ThongKeTiepNhanHoSoVaTraKQLazy />,
  },
  {
    path: primaryRoutes.dvc.canBoBCCI.congDanDaDangKy,
    element: <CongDanDaDangKyNhanKqQuaBCCILazy />,
  },
  {
    path: primaryRoutes.dvc.canBoBCCI.thongKeHoSoDangKyNhanKqQuaBCCI,
    element: <ThongKeDangKyNhanKqQuaBCCILazy />,
  },
];
