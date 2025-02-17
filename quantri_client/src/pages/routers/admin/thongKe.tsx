import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service
const ThongKeDanhGiaHaiLongLazy = lazy(() => import('../../../features/logthongkedghlcongdan/components/LogThongKeDGHLCongDanTable'))
const DashboardPublicLazy = lazy(() => import('../../../features/dashboardpublic'))
const DeletedUserLazy = lazy(() => import('../../../features/logdeleteduser/components/LogDeletedUserTable'))

export const thongKeQuanTriRouters = (): RouteObject[] => {

    return  [
        {
            path: primaryRoutes.admin.thongke.danhGiaHaiLong,
            element: <ThongKeDanhGiaHaiLongLazy></ThongKeDanhGiaHaiLongLazy>
        },
        {
            path: primaryRoutes.admin.thongke.dashboardlienthongdvc,
            element: <DashboardPublicLazy></DashboardPublicLazy>
        },
        {
            path: primaryRoutes.admin.thongke.logdeleteduser,
            element: <DeletedUserLazy></DeletedUserLazy>
        },
    ]
   
}