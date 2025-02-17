import { NOTADMIN_ROUTE_ACCESS_TEXT } from "@/data";
import { useAppSelector } from "@/lib/redux/Hooks";
import { useAdminRoutes } from "@/pages/utils/useAdminRoutes";
import { Service } from "@/services";
import { lazy, useMemo } from "react";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service
const ThongKeDanhGiaHaiLongLazy = lazy(() => import('../../../features/thongkedanhgiahailong/components/ThongKeDGHLTable'))



export const thongKeQuanTriRouters = (): RouteObject[] => {

    return  [
        {
            path: primaryRoutes.admin.thongke.danhGiaHaiLong,
            element: <ThongKeDanhGiaHaiLongLazy></ThongKeDanhGiaHaiLongLazy>
        },
    ]
   
}