import { HOST_PATH } from "@/data";
import { Service } from "@/services";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const { apiEndpoints, primaryRoutes } = Service;
const CSDLDanCuTableLazy = lazy(
  () => import("../../dvc/tracuu/CSDLdancu/components/CSDLDanCuTable")
);
const TatCaHoSoTableLazy = lazy(
  () => import("../../dvc/tracuu/TatCaHoSo/components/TheoDoiTatCaHoSoTable")
);
const HoSoTheoDonViTableLazy = lazy(
  () => import("../../dvc/tracuu/HoSoDonVi/components/HoSoTheoDonViTable")
);
const HoSoLienThongTableLazy = lazy(
  () => import("../../dvc/tracuu/HoSoLienThong/components/HoSoLienThongTable")
);
const AdminYeuCauThanhToanTableLazy = lazy(
  () =>
    import(
      "../../dvc/tracuu/AdminYeuCauThanhToan/components/AdminYeuCauThanhToanTable"
    )
);

export const traCuuRouters: RouteObject[] = [
  {
    path: primaryRoutes.dvc.traCuu.csdlDanCu,
    element: <CSDLDanCuTableLazy />,
  },
  {
    path: primaryRoutes.dvc.traCuu.tatCaHoSo,
    element: <TatCaHoSoTableLazy />,
  },
  {
    path: primaryRoutes.dvc.traCuu.adminYeuCauThanhToan,
    element: <AdminYeuCauThanhToanTableLazy />,
  },
  {
    path: primaryRoutes.dvc.traCuu.hoSoTheoDonVi,
    element: <HoSoTheoDonViTableLazy />,
  },
  {
    path: primaryRoutes.dvc.traCuu.hoSoLienThong,
    element: <HoSoLienThongTableLazy />,
  },
  
];
