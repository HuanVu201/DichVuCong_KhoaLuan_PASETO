
import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes, apiEndpoints } = Service

const HoSoLienThongQLVBLazy = lazy(
    () => import("../../../features/lienThongQLVB/components/DuLieuHoSo/HoSoTable")
);
const VanBanLienThongQLVBLazy = lazy(
    () => import("../../../features/lienThongQLVB/components/DuLieuVanBan/VanBanTable")
);


export const lienThongQLVBRouters = (): RouteObject[] => {
    return [
        {
            path: primaryRoutes.admin.quanLyLienThongQLVB.quanLyHoSo,
            element: <HoSoLienThongQLVBLazy />
        },
        {
            path: primaryRoutes.admin.quanLyLienThongQLVB.quanLyVanBan,
            element: <VanBanLienThongQLVBLazy />
        },

    ]
}