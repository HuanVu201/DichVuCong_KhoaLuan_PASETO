
import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes, apiEndpoints } = Service

const QuanLySuDungApiLazy = lazy(
    () => import("../../../features/quanLySuDungApi/components/QuanLySuDungAPITable")
);



export const suDungAPIRouters = (): RouteObject[] => {
    return [
        {
            path: primaryRoutes.admin.quanLySuDungAPI.root,
            element: <QuanLySuDungApiLazy />
        },
    ]
}