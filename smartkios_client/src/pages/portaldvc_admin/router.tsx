import { Service } from "@/services";
import { lazy, useMemo } from "react";
import { RouteObject } from "react-router-dom";
import { useAdminRoutes } from "../utils/useAdminRoutes";
import { useAppSelector } from "@/lib/redux/Hooks";
import { NOTADMIN_ROUTE_ACCESS_TEXT } from "@/data";

const { apiEndpoints, primaryRoutes } = Service
const BannerLazy = lazy(() => import("../portaldvc_admin/banner"))
const FooterLazy = lazy(() => import("../portaldvc_admin/Footer"))
const KieuNoiDungLazy = lazy(() => import("../portaldvc_admin/KieuNoiDung"))
const KenhTinLazy = lazy(() => import("../portaldvc_admin/KenhTin"))
const TrangThaiLazy = lazy(() => import("../portaldvc_admin/TrangThai"))
const TinBaiLazy = lazy(() => import("../portaldvc_admin/TinBai"))
const QuanLyLienKetLazy = lazy(() => import("../portaldvc_admin/QuanLyLienKet"))
const HuongDanSuDungLazy = lazy(() => import("../portaldvc_admin/HuongDanSuDung"))
const CauHoiPhoBienLazy = lazy(() => import("../portaldvc_admin/CauHoiPhoBien"))
const DSTaiLieuHDSDLazy = lazy(() => import("../portaldvc_admin/DSTaiLieuHDSD"))
const HoiDapLazy = lazy(() => import("../portaldvc_admin/HoiDap"))
const QuanTriVanBanLazy = lazy(() => import("../portaldvc_admin/QuanTriVanBan"))
const QrCodeLazy = lazy(() => import("../../features/portaldvc_admin/QrCodeService/index"))
const PaknDaTraLoiLazy = lazy(() => import("../../features/portaldvc_admin/PhanAnhKienNghi/PaknDaTraLoi"))
const PaknChuaTraLoiLazy = lazy(() => import("../../features/portaldvc_admin/PhanAnhKienNghi/PaknChuaTraLoi"))


export const bannerRoutes = (): RouteObject[] => {
    // const {data: user} = useAppSelector(state => state.user)
    // return useAdminRoutes({routes:  [
    //         {
    //             path: primaryRoutes.portaldvc_admin.banner,
    //             element: <BannerLazy />
    //         },
    //         {
    //             path: primaryRoutes.portaldvc_admin.footer,
    //             element: <FooterLazy />
    //         },
    //         {
    //             path: primaryRoutes.portaldvc_admin.kieunoidung,
    //             element: <KieuNoiDungLazy />
    //         },
    //         {
    //             path: primaryRoutes.portaldvc_admin.kenhtin,
    //             element: <KenhTinLazy />
    //         },
    //         {
    //             path: primaryRoutes.portaldvc_admin.trangthai,
    //             element: <TrangThaiLazy />
    //         },
    //         {
    //             path: primaryRoutes.portaldvc_admin.tinbai,
    //             element: <TinBaiLazy />
    //         },
    //         {
    //             path: primaryRoutes.portaldvc_admin.quanlylienket,
    //             element: <QuanLyLienKetLazy />
    //         },
           
    //     ], condition: user?.typeUser != "Admin", replaceComponentWith: <>{NOTADMIN_ROUTE_ACCESS_TEXT}</>}) 
    return [
        {
            path: primaryRoutes.portaldvc_admin.banner,
            element: <BannerLazy />
        },
        {
            path: primaryRoutes.portaldvc_admin.footer,
            element: <FooterLazy />
        },
        {
            path: primaryRoutes.portaldvc_admin.kieunoidung,
            element: <KieuNoiDungLazy />
        },
        {
            path: primaryRoutes.portaldvc_admin.kenhtin,
            element: <KenhTinLazy />
        },
        {
            path: primaryRoutes.portaldvc_admin.trangthai,
            element: <TrangThaiLazy />
        },
        {
            path: primaryRoutes.portaldvc_admin.tinbai,
            element: <TinBaiLazy />
        },
        {
            path: primaryRoutes.portaldvc_admin.quanlylienket,
            element: <QuanLyLienKetLazy />
        },
        {
            path: primaryRoutes.portaldvc_admin.huongdansudung,
            element: <HuongDanSuDungLazy />
        },
        {
            path: primaryRoutes.portaldvc_admin.cauhoiphobien,
            element: <CauHoiPhoBienLazy />
        },
        {
            path: primaryRoutes.portaldvc_admin.dstailieuhdsd,
            element: <DSTaiLieuHDSDLazy />
        },
        {
            path: primaryRoutes.portaldvc_admin.hoidap,
            element: <HoiDapLazy />
        },
        {
            path: primaryRoutes.portaldvc_admin.quantrivanban,
            element: <QuanTriVanBanLazy />
        },
        {
            path: primaryRoutes.portaldvc_admin.taoqrcode,
            element: <QrCodeLazy />
        },
        {
            path: primaryRoutes.portaldvc_admin.paknDaTraLoi,
            element: <PaknDaTraLoiLazy />
        },
        {
            path: primaryRoutes.portaldvc_admin.paknChuaTraLoi,
            element: <PaknChuaTraLoiLazy />
        },
       
    ]
}