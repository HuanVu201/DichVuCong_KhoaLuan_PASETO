import { RouteObject } from "react-router-dom";
import { Service } from "@/services";
import React from "react";
import { RequiredAuth } from "@/features/auth/components";

const ThongTinDinhDanhLazy = React.lazy(() => import("../../../features/portaldvc/HoSoCaNhan/components/ThongTinDinhDanhComponent"))
const TaiLieuDienTuLazy = React.lazy(() => import("../../../features/portaldvc/HoSoCaNhan/components/TaiLieuDienTuComponent"))
const DichVuCongCuaToiLazy = React.lazy(() => import("../../../features/portaldvc/HoSoCaNhan/components/DichVuCongComponent"))
const ThanhToanPhiLePhi = React.lazy(() => import("../../../features/portaldvc/HoSoCaNhan/components/ThanhToanPhiLePhi/ThanhToanPhiLePhi"))

const { apiEndpoints, primaryRoutes } = Service;
export const hoSoCaNhanRoutes: RouteObject[] = [
    {
        path: primaryRoutes.portaldvc.hosocanhan.thongTinDinhDanh,
        element: <ThongTinDinhDanhLazy />,
    },
    {
        path: primaryRoutes.portaldvc.hosocanhan.taiLieuDienTu,
        element: <TaiLieuDienTuLazy />,
    },
    {
        path: primaryRoutes.portaldvc.hosocanhan.dichVuCongCuaToi,
        element: <DichVuCongCuaToiLazy />,
    },
    {
        path: primaryRoutes.portaldvc.hosocanhan.thanhToanPhiLePhi,
        element: <ThanhToanPhiLePhi />
    },
]