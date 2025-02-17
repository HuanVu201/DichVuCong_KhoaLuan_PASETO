import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const {apiEndpoints, primaryRoutes} = Service
const ChoDuyetSoHoaHoSo = lazy(() => import("../../dvc/sohoahoso/choDuyet/ChoDuyetSoHoaHoSo"))
const DaDuyetSoHoaHoSo = lazy(() => import("../../dvc/sohoahoso/daDuyet/DaDuyetSoHoaHoSo"))
const KhongDuyetSoHoaHoSo = lazy(() => import("../../dvc/sohoahoso/khongDuyet/KhongDuyetSoHoaHoSo"))
const ToanBoSoHoaHoSo = lazy(() => import("../../dvc/sohoahoso/toanBo/ToanBoSoHoaHoSo"))

export const soHoaHoSoRoutes: RouteObject[] = [
    {
        path: primaryRoutes.dvc.soHoaHoSo.choDuyet,
        element: <ChoDuyetSoHoaHoSo />
    },
    {
        path: primaryRoutes.dvc.soHoaHoSo.daDuyet,
        element: <DaDuyetSoHoaHoSo />
    },
    {
        path: primaryRoutes.dvc.soHoaHoSo.khongDuyet,
        element: <KhongDuyetSoHoaHoSo />
    },
    {
        path: primaryRoutes.dvc.soHoaHoSo.toanBo,
        element: <ToanBoSoHoaHoSo />
    },
]