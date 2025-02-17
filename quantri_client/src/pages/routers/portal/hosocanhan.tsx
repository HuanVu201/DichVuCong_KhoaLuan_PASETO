import { RouteObject } from "react-router-dom";
import { Service } from "@/services";
import React from "react";
import { lazy } from "@/utils/lazyLoading";

const ThongTinDinhDanhLazy = lazy(() => import("../../../features/portaldvc/HoSoCaNhan/components/ThongTinDinhDanhSwapper"))
const TaiLieuDienTuLazy = lazy(() => import("../../../features/portaldvc/HoSoCaNhan/components/TaiLieuDienTuComponent"))
const DichVuCongCuaToiLazy = lazy(() => import("../../../features/portaldvc/HoSoCaNhan/components/DichVuCongComponent"))
const ThanhToanPhiLePhi = lazy(() => import("../../../features/portaldvc/HoSoCaNhan/components/ThanhToanPhiLePhi/ThanhToanPhiLePhi"))
const HoSoLuuTru = lazy(() => import("../../../features/portaldvc/HoSoCaNhan/components/HoSoLuuTru/components/HoSoLuuTru"))
const KhoTaiLieuDienTuLazy = lazy(() => import("../../../features/portaldvc/HoSoCaNhan/components/KhoTaiLieuDienTu/components/KhoTaiLieuDienTuTable"))
const ChuKySoCaNhanLazy = lazy(() => import("../../../features/portaldvc/HoSoCaNhan/components/ChyKySoCaNhan/components/ChuKySoCaNhanTable"))
const KhoTaiLieuCaNhanLazy = lazy(() => import("../../../features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/components/KhoTaiLieuCongDanSwapper"))
const KhoTaiLieuCaNhanNamDinhLazy = lazy(() => import("../../../features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDanNamDinh/components/KhoTaiLieuCongDanNamDinhSwapper"))

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
    {
        path: primaryRoutes.portaldvc.hosocanhan.hoSoLuuTru,
        element: <HoSoLuuTru />
    },
    {
        path: primaryRoutes.portaldvc.hosocanhan.khoTaiLieuDienTu,
        element: <KhoTaiLieuDienTuLazy />
    },
    {
        path: primaryRoutes.portaldvc.hosocanhan.chuKyDienTu,
        element: <ChuKySoCaNhanLazy />
    },
    {
        path: primaryRoutes.portaldvc.hosocanhan.taiLieuCongDan,
        element: <KhoTaiLieuCaNhanLazy />
    },
    {
        path: primaryRoutes.portaldvc.hosocanhan.taiLieuCongDanNamDinh,
        element: <KhoTaiLieuCaNhanNamDinhLazy />
    },
]