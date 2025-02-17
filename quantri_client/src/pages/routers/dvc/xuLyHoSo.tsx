import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const {apiEndpoints, primaryRoutes} = Service
const DangXuLyLazy = lazy(() => import("../../dvc/xulyhoso/dangxuly/components/DangXuLyTable"))
const DangXuLyLienThongLazy = lazy(() => import("../../dvc/xulyhoso/dangxulylienthong/components/DangXuLyLienThongTable"))
const VpubDangXuLyLazy = lazy(() => import("../../dvc/xulyhoso/dangxuly/components/VpubDangXuLyTable"))
const DaChuyenXuLyLazy = lazy(() => import("../../dvc/xulyhoso/dachuyenxuly/components/DaChuyenXuLyTable"))
const DaChuyenBoSungLazy = lazy(() => import("../../dvc/xulyhoso/dachuyenbosung/components/DaChuyenBoSungTable"))
const DaChuyenCoKetQuaLazy = lazy(() => import("../../dvc/xulyhoso/dachuyencoketqua/components/DaChuyenCoKetQuaTable"))
const DungXuLyLazy = lazy(() => import("../../dvc/xulyhoso/dungxuly/components/DungXuLyTable"))
const YeuCauThucHienNghiaVuTaiChinhLazy = lazy(() => import("../../dvc/xulyhoso/yeucauthuchiennghiavutaichinh/components/YeuCauThucHienNghiaVuTaiChinhTable"))

export const xuLyHoSoRouters: RouteObject[] = [
    {
        path: primaryRoutes.dvc.xuLyHoSo.dangXuLy,
        element: <DangXuLyLazy />
    },
    {
        path: primaryRoutes.dvc.xuLyHoSo.dangXuLyLienThong,
        element: <DangXuLyLienThongLazy />
    },
    {
        path: primaryRoutes.dvc.xuLyHoSo.vpubDangXuLy,
        element: <VpubDangXuLyLazy />
    },
    {
        path: primaryRoutes.dvc.xuLyHoSo.daChuyenXuLy,
        element: <DaChuyenXuLyLazy />
    },
    {
        path: primaryRoutes.dvc.xuLyHoSo.daChuyenBoSung,
        element: <DaChuyenBoSungLazy />
    },
    {
        path: primaryRoutes.dvc.xuLyHoSo.daChuyenCoKetQua,
        element: <DaChuyenCoKetQuaLazy />
    },
    {
        path: primaryRoutes.dvc.xuLyHoSo.dungXuLy,
        element: <DungXuLyLazy />
    },
    {
        path: primaryRoutes.dvc.xuLyHoSo.yeuCauThucHienNghiaVuTaiChinh,
        element: <YeuCauThucHienNghiaVuTaiChinhLazy />
    },
]