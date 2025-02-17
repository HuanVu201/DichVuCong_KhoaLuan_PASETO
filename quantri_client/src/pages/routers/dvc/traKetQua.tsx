import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { apiEndpoints, primaryRoutes } = Service;
const ChoTraBCCITableLazy = lazy(
  () => import("../../dvc/traketqua/chotrabcci/components/ChoTraBCCITable")
);
const ChoTraBCCITTHCCTableLazy = lazy(
  () =>
    import(
      "../../dvc/traketqua/chotrabccitthcc/components/ChoTraBCCITTHCCTable"
    )
);
const ChoTraKetQuaTableLazy = lazy(
  () => import("../../dvc/traketqua/chotraketqua/components/ChoTraKetQuaTable")
);
const ChoTraKetQuaTTHCCTableLazy = lazy(
  () =>
    import(
      "../../dvc/traketqua/chotraketquatthcc/components/ChoTraKetQuaTTHCCTable"
    )
);
const ChoTraKetQuaTheoNguoiTiepNhanTableLazy = lazy(
  () =>
    import(
      "../../dvc/traketqua/chotratheonguoitiepnhan/components/ChoTraKetQuaTheoNguoiTiepNhanTable"
    )
);
const ChoTraKetQuaBCCITheoNguoiTiepNhanTableLazy = lazy(
  () =>
    import(
      "../../dvc/traketqua/chotrabccitheonguoitiepnhan/components/ChoTraBCCITheoNguoiTiepNhanTable"
    )
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
const DaTraTTHCCTableLazy = lazy(
  () => import("../../dvc/traketqua/datratthcc/components/DaTraTTHCCTable")
);
const DaTraTheoNguoiTiepNhanTableLazy = lazy(
  () =>
    import(
      "../../dvc/traketqua/datratheonguoitiepnhan/components/DaTraTheoNguoiTiepNhanTable"
    )
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
    path: primaryRoutes.dvc.traKetQua.choTraBCCITTHCC,
    element: <ChoTraBCCITTHCCTableLazy />,
  },
  {
    path: primaryRoutes.dvc.traKetQua.choTraBCCITheoNguoiTiepNhan,
    element: <ChoTraKetQuaBCCITheoNguoiTiepNhanTableLazy />,
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
    path: primaryRoutes.dvc.traKetQua.daTraTTHCC,
    element: <DaTraTTHCCTableLazy />,
  },
  {
    path: primaryRoutes.dvc.traKetQua.daTraKetQuaTheoNguoiTiepNhan,
    element: <DaTraTheoNguoiTiepNhanTableLazy />,
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
  {
    path: primaryRoutes.dvc.traKetQua.choTraKetQua,
    element: <ChoTraKetQuaTableLazy />,
  },
  {
    path: primaryRoutes.dvc.traKetQua.choTraKetQuaTTHCC,
    element: <ChoTraKetQuaTTHCCTableLazy />,
  },
  {
    path: primaryRoutes.dvc.traKetQua.choTraKetQuaTheoNguoiTiepNhan,
    element: <ChoTraKetQuaTheoNguoiTiepNhanTableLazy />,
  },
];
