
import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes, apiEndpoints } = Service

const QuanLyTruyCapDvcLazy = lazy(
  () => import("../../../features/quanLyTruyCapDvc/components/QuanLyTruyCapDvcTable")
);


export const quanLyTruyCapDvcRouters = (): RouteObject[] => {
  return [
    {
      path: primaryRoutes.admin.quanLyTruyCapDvc.quanLyTruyCapDvc,
      element: <QuanLyTruyCapDvcLazy />
    },
    
  ]
}