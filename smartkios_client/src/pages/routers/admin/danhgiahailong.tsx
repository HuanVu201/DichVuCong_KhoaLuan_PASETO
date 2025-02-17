
import { NOTADMIN_ROUTE_ACCESS_TEXT } from "@/data";
import { useAppSelector } from "@/lib/redux/Hooks";
import { useAdminRoutes } from "@/pages/utils/useAdminRoutes";
import { Service } from "@/services";
import { lazy, useMemo } from "react";
import { RouteObject } from "react-router-dom";

const { primaryRoutes, apiEndpoints } = Service
const ScreenActionLazy = lazy(() => import('../../../features/screenaction/components/ScreenActionWrapper'))
const ActionLazy = lazy(() => import('../../../features/action/components/ActionTable'))
const ConfigLazy = lazy(() => import('../../../features/config/components/ConfigTable'))
const MenuLazy = lazy(() => import('../../../features/danhmucmenu/components/MenuWrapper'))
const MenuKetQuaThuTucLazy = lazy(() => import("../../../features/menuketquathutuc/components/MenuKetQuaThuTucTable"))

const DanhGiaCoQuanLazy = lazy(
  () => import("../../../features/danhgiacoquan/components/DanhGiaCoQuanTable")
);

const BaoCao01Lazy = lazy(
  () => import("../../../features/baocaoDGHLmau01/components/BaoCaoMau01Table")
);
const BaoCao02Lazy = lazy(
  () => import("../../../features/baocaoDGHLmau02/components/BaoCao2Table")
);
const BaoCao03Lazy = lazy(
  () => import("../../../features/baocaoDGHLmau03/components/BaoCao3Table")
);

export const danhGiaHaiLongRouters = (): RouteObject[] => {
  return [
    {
      path: primaryRoutes.admin.danhgiahailong.danhGiaCoQuan,
      element: <DanhGiaCoQuanLazy />
    },
    {
      path: primaryRoutes.admin.danhgiahailong.baoCao01,
      element: <BaoCao01Lazy />
    },
    {
      path: primaryRoutes.admin.danhgiahailong.baoCao02,
      element: <BaoCao02Lazy />
    },
    {
      path: primaryRoutes.admin.danhgiahailong.baoCao03,
      element: <BaoCao03Lazy />
    },


  ]
}