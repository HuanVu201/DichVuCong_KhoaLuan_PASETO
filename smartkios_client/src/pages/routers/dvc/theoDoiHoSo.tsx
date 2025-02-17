import { Service } from "@/services";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const {apiEndpoints, primaryRoutes} = Service
const HoSoQuaHanTableLazy = lazy(() => import("../../dvc/theodoihoso/hosoquahan/components/HoSoQuaHanTable"))
const HoSoToiHanTableLazy = lazy(() => import("../../dvc/theodoihoso/hosotoihan/components/HoSoToiHanTable"))
const TheoDoiTatCaHoSoTableLazy = lazy(() => import("../../dvc/theodoihoso/theodoitatcahoso/components/TheoDoiTatCaHoSoTable"))

export const theoDoiHoSoRouters: RouteObject[] = [
    {
        path: primaryRoutes.dvc.theoDoiHoSo.hoSoQuaHan,
        element: <HoSoQuaHanTableLazy />
    },
    {
        path: primaryRoutes.dvc.theoDoiHoSo.hoSoToiHan,
        element: <HoSoToiHanTableLazy />
    },
    {
        path: primaryRoutes.dvc.theoDoiHoSo.theoDoiTatCaHoSo,
        element: <TheoDoiTatCaHoSoTableLazy />
    },
]