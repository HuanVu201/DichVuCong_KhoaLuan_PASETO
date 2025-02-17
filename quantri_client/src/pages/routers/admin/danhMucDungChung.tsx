import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service
const NgayNghiLazy = lazy(() => import('../../../features/danhmucngaynghi/components/NgayNghiTable'))
const DanhMucChungLazy = lazy(() => import('../../../features/danhmucdungchung/components/DanhMucChungTable'))
const DanhMucDiaBanLazy = lazy(() => import('../../../features/danhmucdiaban/components/DiaBanTable'))
const LoaiGiayToKhoLuuTruLazy = lazy(() => import('../../../features/danhMucLoaiGiayToKhoLuuTru/components/LoaiGiayToKhoLuuTruTable'))
const DanhMucApiLazy = lazy(() => import('../../../features/danhMucApi/components/DanhMucApiTable'))

export const danhMucDungChungRouters = (): RouteObject[] => {
    return [
        {
            path: primaryRoutes.admin.danhMucDungChung.danhMucNgayNghi,
            element: <NgayNghiLazy />
        },
        {
            path: primaryRoutes.admin.danhMucDungChung.danhMuc,
            element: <DanhMucChungLazy />,
        },
        {
            path: primaryRoutes.admin.danhMucDungChung.danhMucDiaBan,
            element: <DanhMucDiaBanLazy />,
        },
        {
            path: primaryRoutes.admin.danhMucDungChung.loaiGiayToKhoLuuTru,
            element: <LoaiGiayToKhoLuuTruLazy />,
        },
        {
            path: primaryRoutes.admin.danhMucDungChung.loaiGiayToKhoLuuTru,
            element: <LoaiGiayToKhoLuuTruLazy />,
        },
        {
            path: primaryRoutes.admin.quanTriAPI.danhMuc,
            element: <DanhMucApiLazy />,
        },
    ]
}