
import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes, apiEndpoints } = Service

const ThongKeSuDungKhoTaiLieuLazy = lazy(
    () => import("../../../features/QuanLySuDungKhoTaiLieu/components/ThongKeSuDung/ThongKeSuDungSwapper")
)
const ThongKeDungLuongSuDungLazy = lazy(
    () => import("../../../features/QuanLySuDungKhoTaiLieu/components/ThongKeDungLuong/ThongKeDungLuongSwapper")
);
const ThongKeKhoTaiLieuCongDanSwapperLazy = lazy(
    () => import("../../../features/QuanLySuDungKhoTaiLieu/index")
);



export const QuanLySuDungKhoTaiLieuRouters = (): RouteObject[] => {
    return [
        {
            path: primaryRoutes.admin.quanLySuDungKhoTaiLieuCaNhan.thongKeSuDung,
            element: <ThongKeKhoTaiLieuCongDanSwapperLazy />
        },
        // {
        //     path: primaryRoutes.admin.quanLySuDungKhoTaiLieuCaNhan.thongKeDungLuong,
        //     element: <ThongKeDungLuongSuDungLazy />
        // },
    ]
}