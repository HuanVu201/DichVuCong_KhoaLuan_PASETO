import { NOTADMIN_ROUTE_ACCESS_TEXT } from "@/data";
import { useAppSelector } from "@/lib/redux/Hooks";
import { useAdminRoutes } from "@/pages/utils/useAdminRoutes";
import { Service } from "@/services";
import { lazy, useMemo } from "react";
import { RouteObject } from "react-router-dom";

const { primaryRoutes} = Service
const NgayNghiLazy = lazy(() => import('../../../features/danhmucngaynghi/components/NgayNghiTable'))
const DanhMucChungLazy = lazy(() => import('../../../features/danhmucdungchung/components/DanhMucChungTable')) 
const DanhMucDiaBanLazy = lazy(() => import('../../../features/danhmucdiaban/components/DiaBanTable')) 

export const danhMucDungChungRouters = (): RouteObject[] => {
    // const {data: user} = useAppSelector(state => state.user)
    // return useAdminRoutes({routes: [
    //         {
    //             path: primaryRoutes.admin.danhMucDungChung.danhMucNgayNghi,
    //             element: <NgayNghiLazy />
    //         },
    //         {
    //             path: primaryRoutes.admin.danhMucDungChung.danhMuc,
    //             element: <DanhMucChungLazy />,
    //         },
    //         {
    //             path: primaryRoutes.admin.danhMucDungChung.danhMucDiaBan,
    //             element: <DanhMucDiaBanLazy />,
    //         },
    //     ], condition: user?.typeUser != "Admin", replaceComponentWith: <>{NOTADMIN_ROUTE_ACCESS_TEXT}</>}) 
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
        ]
}