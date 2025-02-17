import { NOTADMIN_ROUTE_ACCESS_TEXT } from "@/data";
import { useAppSelector } from "@/lib/redux/Hooks";
import { useAdminRoutes } from "@/pages/utils/useAdminRoutes";
import { Service } from "@/services";
import { lazy, useMemo } from "react";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service
const CoCauToChucLazy = lazy(() => import('../../../features/cocautochuc/components/CoCauToChucWrapper'))
const ThuTucLazy = lazy(() => import('../../../features/danhmucthutuc/components/NguoiTiepNhanThuTucTable'))
const UserLazy = lazy(() => import('../../../features/danhsachnguoidung/UserWrapper'))
const SoChungThucLazy = lazy(() => import('../../../features/sochungthuc/components/SoChungThucTable'))


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
    return  [
        {
            path: primaryRoutes.admin.quanTriDonVi.danhMucCoCauToChuc,
            element: <CoCauToChucLazy></CoCauToChucLazy>
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
    ]
}