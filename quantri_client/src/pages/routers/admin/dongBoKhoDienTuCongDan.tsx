
import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes, apiEndpoints } = Service

const DanhSachGiayToDVCQG = lazy(
  () => import("../../../pages/admin/dongBoKhoDienTuCongDan/DVCQG")
);
const DanhSachGiayToCaNhan = lazy(
    () => import("../../../pages/admin/dongBoKhoDienTuCongDan/CaNhan")
);
const ThongKeHeThong = lazy(
() => import("../../../pages/admin/dongBoKhoDienTuCongDan/ThongKeHeThong")
);
const ThongKeCaNhan = lazy(
    () => import("../../../pages/admin/dongBoKhoDienTuCongDan/ThongKeCaNhan")
);
const DvcTinh = lazy(
    () => import("../../../pages/admin/dongBoKhoDienTuCongDan/DvcTinh")
);

export const dongBoKhoDienTuCongDan : RouteObject[] =
[
    {
        path: primaryRoutes.admin.dongBoKhoDienTuCongDan.dvcqg,
        element: <DanhSachGiayToDVCQG />
    },
    {
        path: primaryRoutes.admin.dongBoKhoDienTuCongDan.caNhan,
        element: <DanhSachGiayToCaNhan />
    },
    {
        path: primaryRoutes.admin.dongBoKhoDienTuCongDan.thongKeHeThong,
        element: <ThongKeHeThong />
    },
    {
        path: primaryRoutes.admin.dongBoKhoDienTuCongDan.thongKeCaNhan,
        element: <ThongKeCaNhan />
    },
    {
        path: primaryRoutes.admin.dongBoKhoDienTuCongDan.dvctinh,
        element: <DvcTinh />
    }
]