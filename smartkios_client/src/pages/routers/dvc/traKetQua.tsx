import { Service } from "@/services";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const { apiEndpoints, primaryRoutes } = Service;
const ChoTraBCCITableLazy = lazy(
  () => import("../../dvc/traketqua/chotrabcci/components/ChoTraBCCITable")
);
const ChoTraTrucTiepTableLazy = lazy(
  () =>
    import("../../dvc/traketqua/chotratructiep/components/ChoTraTrucTiepTable")
);
const ChoTraTrucTuyenTableLazy = lazy(
  () =>
    import(
      "../../dvc/traketqua/chotratructuyen/components/ChoTraTrucTuyenTable"
    )
);
const DaTraTableLazy = lazy(
  () => import("../../dvc/traketqua/datra/components/DaTraTable")
);
const XinRutTableLazy = lazy(
  () => import("../../dvc/traketqua/xinrut/components/XinRutTable")
);
const ChoXacNhanTraKqLazy = lazy(
  () =>
    import("../../dvc/traketqua/choxacnhantra/components/ChoXacNhanTraKqTable")
);
const DaCoKetQuaLazy = lazy(
  () => import("../../dvc/traketqua/dacoketqua/components/DaCoKetQuaTable")
);
const TheoDoiDaChuyenTraKqLazy = lazy(
  () =>
    import(
      "../../dvc/traketqua/theodoidachuyentrakq/components/TheoDoiDaChuyenTraKqTable"
    )
);
const ChoXacNhanTraKqChuaThuPhiLazy = lazy(
  () =>
    import(
      "../../dvc/traketqua/choxacnhantrachuathuphi/components/ChoXacNhanTraKqChuaThuPhiTable"
    )
);
export const traKetQuaRouters: RouteObject[] = [
  {
    path: primaryRoutes.dvc.traKetQua.choTraBCCI,
    element: <ChoTraBCCITableLazy />,
  },
  {
    path: primaryRoutes.dvc.traKetQua.choTraTrucTiep,
    element: <ChoTraTrucTiepTableLazy />,
  },
  {
    path: primaryRoutes.dvc.traKetQua.choTraTrucTuyen,
    element: <ChoTraTrucTuyenTableLazy />,
  },
  {
    path: primaryRoutes.dvc.traKetQua.daTra,
    element: <DaTraTableLazy />,
  },
  {
    path: primaryRoutes.dvc.traKetQua.xinRut,
    element: <XinRutTableLazy />,
  },
  {
    path: primaryRoutes.dvc.traKetQua.choXacNhanTraKq,
    element: <ChoXacNhanTraKqLazy />,
  },
  {
    path: primaryRoutes.dvc.traKetQua.choXacNhanTraKqChuaThuPhi,
    element: <ChoXacNhanTraKqChuaThuPhiLazy />,
  },
  // {
  //   path: primaryRoutes.dvc.traKetQua.daCoKetQua,
  //   element: <DaCoKetQuaLazy />,
  // },
  {
    path: primaryRoutes.dvc.traKetQua.theoDoiChuyenTraKq,
    element: <TheoDoiDaChuyenTraKqLazy />,
  },
];
