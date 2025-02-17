import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service
const CoCauToChucLazy = lazy(() => import('../../../features/cocautochuc/components/CoCauToChucDonViWrapper'))
const NhomNguoiDungLazy = lazy(() => import('../../../features/nhomnguoidung/quantridonvi/NhomNguoiDungDonViTable'))
const ThuTucLazy = lazy(() => import('../../../features/danhmucthutuc/components/NguoiTiepNhanThuTucTable'))
const UserLazy = lazy(() => import('../../../features/danhsachnguoidung/UserQuanTriDonViWrapper'))
const SoChungThucLazy = lazy(() => import('../../../features/sochungthuc/components/SoChungThucTable'))
const HoSoTheoDonViLazy = lazy(() => import('../../../pages/dvc/tracuu/HoSoDonVi/components/AdminHoSoTheoDonViTable'))
const ThongKeDGHLCongDanLazy = lazy(() => import('../../../../src/features/logthongkedghlcongdan/components/LogThongKeDGHLCongDanTable'))
const ThongKeDGHLCanBoLazy = lazy(() => import('../../../../src/features/thongkedanhgiahailong/components/ThongKeDGHLTable'))

const GiaoDichThanhToanLazy = lazy(() => import('../../../features/giaodichthanhtoan/components/GiaoDichThanhToanTable'))
export const quanTriDonViRouters = (): RouteObject[] => {
    // const { data: user } = useAppSelector(state => state.user)
    // return useAdminRoutes({
    //     routes: [
    //         {
    //             path: primaryRoutes.admin.quanTriDonVi.danhMucNguoiDung,
    //             element: <CoCauToChucLazy></CoCauToChucLazy>
    //         },
    //         {
    //             path: primaryRoutes.admin.quanTriDonVi.thuTuc,
    //             element: <ThuTucLazy></ThuTucLazy>
    //         },

    //     ], condition: user?.typeUser != "Admin", replaceComponentWith: <>{NOTADMIN_ROUTE_ACCESS_TEXT}</>
    // })
    return [
        {
            path: primaryRoutes.admin.quanTriDonVi.danhMucCoCauToChuc,
            element: <CoCauToChucLazy role='don-vi' />
        },
        {
            path: primaryRoutes.admin.quanTriDonVi.nhomnguoidung,
            element: <NhomNguoiDungLazy></NhomNguoiDungLazy>
        },
        {
            path: primaryRoutes.admin.quanTriDonVi.thuTuc,
            element: <ThuTucLazy></ThuTucLazy>
        },
        {
            path: primaryRoutes.admin.quanTriDonVi.danhMucNguoiDung,
            element: <UserLazy></UserLazy>
        },
        {
            path: primaryRoutes.admin.quanTriDonVi.sochungthuc,
            element: <SoChungThucLazy></SoChungThucLazy>
        },
        {
            path: primaryRoutes.admin.quanTriDonVi.giaodichthanhtoan,
            element: <GiaoDichThanhToanLazy></GiaoDichThanhToanLazy>
        },
        {
            path: primaryRoutes.admin.quanTri.giaodichthanhtoan,
            element: <GiaoDichThanhToanLazy></GiaoDichThanhToanLazy>
        },
        {
            path: primaryRoutes.admin.quanTriDonVi.nhomnguoidung,
            element: <GiaoDichThanhToanLazy></GiaoDichThanhToanLazy>
        },
        {
            path: primaryRoutes.admin.quanTriDonVi.hoSoTheoDonVi,
            element: <HoSoTheoDonViLazy></HoSoTheoDonViLazy>
        },
        {
            path: primaryRoutes.admin.quanTriDonVi.thongkedghlcongdan,
            element: <ThongKeDGHLCongDanLazy></ThongKeDGHLCongDanLazy>
        },
        {
            path: primaryRoutes.admin.quanTriDonVi.thongkedghlcanbo,
            element: <ThongKeDGHLCanBoLazy></ThongKeDGHLCanBoLazy>
        },
    ]
}