
import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes, apiEndpoints } = Service
const ScreenActionLazy = lazy(() => import('../../../features/screenaction/components/ScreenActionWrapper'))
const ActionLazy = lazy(() => import('../../../features/action/components/ActionTable'))
const ConfigLazy = lazy(() => import('../../../features/config/components/ConfigTable'))
const MenuLazy = lazy(() => import('../../../features/danhmucmenu/components/MenuWrapper'))
const MenuKetQuaThuTucLazy = lazy(() => import("../../../features/menuketquathutuc/components/MenuKetQuaThuTucTable"))
const ThongKeDanhGiaHaiLongLazy = lazy(() => import('../../../features/thongkedanhgiahailong/components/ThongKeDGHLTable'))


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
      path: primaryRoutes.dvc.danhgiahailong.danhGiaCoQuan,
      element: <DanhGiaCoQuanLazy />
    },
    {
      path: primaryRoutes.dvc.danhgiahailong.baoCao01,
      element: <BaoCao01Lazy />
    },
    {
      path: primaryRoutes.dvc.danhgiahailong.baoCao02,
      element: <BaoCao02Lazy />
    },
    {
      path: primaryRoutes.dvc.danhgiahailong.baoCao03,
      element: <BaoCao03Lazy />
    },
    {
      path: primaryRoutes.dvc.danhgiahailong.thongkedghl,
      element: <ThongKeDanhGiaHaiLongLazy />
    },


  ]
}