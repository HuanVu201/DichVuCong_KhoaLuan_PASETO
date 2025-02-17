
import { NOTADMIN_ROUTE_ACCESS_TEXT } from "@/data";
import { useAppSelector } from "@/lib/redux/Hooks";
import { useAdminRoutes } from "@/pages/utils/useAdminRoutes";
import { Service } from "@/services";
import { lazy, useMemo } from "react";
import { RouteObject } from "react-router-dom";

const { primaryRoutes, apiEndpoints } = Service
const ScreenActionLazy = lazy(() => import('../../../features/screenaction/components/ScreenActionWrapper'))
const ActionLazy = lazy(() => import('../../../features/action/components/ActionTable'))
const ConfigLazy = lazy(() => import('../../../features/config/components/ConfigTable'))
const MenuLazy = lazy(() => import('../../../features/danhmucmenu/components/MenuWrapper'))
const MenuKetQuaThuTucLazy = lazy(() => import("../../../features/menuketquathutuc/components/MenuKetQuaThuTucTable"))

const CauHinhHeThongLazy = lazy(
    () => import("../../../features/CauHinhHeThong/components/CauHinhHeThongTable")
  );
  
export const cauHinhHeThongRouters = (): RouteObject[] => {
    // const {data: user} = useAppSelector(state => state.user)
    // return useAdminRoutes({routes: [
    //         {
    //             path: primaryRoutes.admin.quanTri.action,
    //             element: <ActionLazy />
    //         },
    //         {
    //             path: primaryRoutes.admin.quanTri.screen,
    //             element: <ScreenActionLazy />
    //         },
    //         {
    //             path: primaryRoutes.admin.quanTri.config,
    //             element: <ConfigLazy />
    //         },
    //         {
    //             path: primaryRoutes.admin.quanTri.danhSachMenu,
    //             element: <MenuLazy />
    //         },
    //         {
    //             path: primaryRoutes.admin.root + apiEndpoints.cauhinhhethongs,
    //             element: <CauHinhHeThongLazy />,
    //         },
         
    //     ], condition: user?.typeUser != "Admin", replaceComponentWith: <>{NOTADMIN_ROUTE_ACCESS_TEXT}</>}) 
    return [
        {
            path: primaryRoutes.admin.quanTri.manager,
            element: <MenuKetQuaThuTucLazy />
        },
        {
            path: primaryRoutes.admin.quanTri.action,
            element: <ActionLazy />
        },
        {
            path: primaryRoutes.admin.quanTri.screen,
            element: <ScreenActionLazy />
        },
        {
            path: primaryRoutes.admin.quanTri.config,
            element: <ConfigLazy />
        },
        {
            path: primaryRoutes.admin.quanTri.danhSachMenu,
            element: <MenuLazy />
        },
        {
            path: primaryRoutes.admin.root + apiEndpoints.cauhinhhethongs,
            element: <CauHinhHeThongLazy />,
        },
     
    ]
}