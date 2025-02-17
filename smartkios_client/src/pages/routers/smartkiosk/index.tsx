import { RouteObject } from "react-router-dom";
import { Service } from "@/services";
import React from "react";
import { useAdminRoutes } from "../../utils/useAdminRoutes";
import { useAppSelector } from "@/lib/redux/Hooks";
import { NOTADMIN_ROUTE_ACCESS_TEXT } from "@/data";


const SmartKioskLazy = React.lazy(() => import("../../../features/smartkiosk/index"))
const ThuThucHanhChinhSmartKioskLazy = React.lazy(() => import("../../../features/smartkiosk/components/thutuchanhchinh/index"))
const DangKiDVCSmartKioskLazy = React.lazy(() => import("../../../features/smartkiosk/components/dangkidvc/index"))
const TiepNhanTrucTuyenWrapperLazy = React.lazy(() => import("../../portal/TiepNhanTrucTuyen/TiepNhanTrucTuyen"))
const TraCuuHoSoKioskLazy = React.lazy(() => import("../../../features/smartkiosk/components/tracuu/index"))
const ThanhToanKioskLazy = React.lazy(() => import("../../../features/smartkiosk/components/thanhtoan/index"))
const DanhGiaHaiLongKioskLazy = React.lazy(() => import("../../../features/portaldvc/DanhGiaHaiLong/index"))



const { apiEndpoints, primaryRoutes } = Service;

export const smartKioskRoutes: RouteObject[] = [

    {
        path: primaryRoutes.smartkiosk.root,
        element: <SmartKioskLazy />,
    },
    {
        path: primaryRoutes.smartkiosk.tthc,
        element: <ThuThucHanhChinhSmartKioskLazy />,
    },
    {
        path: primaryRoutes.smartkiosk.dangkidvc,
        element: <DangKiDVCSmartKioskLazy />,
    },
    {
        path: primaryRoutes.smartkiosk.nopHoSoTrucTuyen,
        element: <TiepNhanTrucTuyenWrapperLazy />,
    },
    {
        path: primaryRoutes.smartkiosk.tracuuhoso,
        element: <TraCuuHoSoKioskLazy />,
    },
    {
        path: primaryRoutes.smartkiosk.thanhtoandvc,
        element: <ThanhToanKioskLazy />,
    },
    {
        path: primaryRoutes.smartkiosk.danhgiahailong,
        element: <DanhGiaHaiLongKioskLazy />,
    },
]
