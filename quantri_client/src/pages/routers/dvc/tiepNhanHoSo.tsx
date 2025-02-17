import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const {apiEndpoints, primaryRoutes} = Service
const TiepNhanHoSoLazy = lazy(() => import("../../dvc/tiepnhanhoso/tructiep/components/TiepNhanHoSoTable"))
const TiepNhanHoSoTrucTuyenTableLazy = lazy(() => import("../../dvc/tiepnhanhoso/tructuyen/components/TiepNhanHoSoTrucTuyenTable"))
const TuChoiTiepNhanHoSoTrucTuyenTableLazy = lazy(() => import("../../dvc/tiepnhanhoso/tuchoitiepnhan/components/TuChoiTiepNhanHoSoTrucTuyenTable"))
const DaChuyenXuLyLazy = lazy(() => import("../../dvc/xulyhoso/dachuyenxuly/components/DaChuyenXuLyTable"))

export const tiepNhanHoSoRouters: RouteObject[] = [
    {
        path: primaryRoutes.dvc.tiepNhanHoSo.moiTiepNhan,
        element: <TiepNhanHoSoLazy />
    },
    {
        path: primaryRoutes.dvc.tiepNhanHoSo.choTiepNhanTrucTuyen,
        element: <TiepNhanHoSoTrucTuyenTableLazy />
    },
    {
        path: primaryRoutes.dvc.tiepNhanHoSo.tuChoiTiepNhan,
        element: <TuChoiTiepNhanHoSoTrucTuyenTableLazy />
    },
    {
        path: primaryRoutes.dvc.tiepNhanHoSo.daChuyenXuLy,
        element: <DaChuyenXuLyLazy />
    },
]
