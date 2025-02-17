import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service;
const DanhSachTaiLieuHDSDChoCanBoTableLazy = lazy(
  () => import("@/features/portaldvc_admin/DSTaiLieuHDSD/CanBo/components/DSTLCanBoTable")
);
export const danhSachTaiLieuHDSDChoCanBoRouters: RouteObject[] = [
  {
    path: primaryRoutes.dvc.dstailieuhdsdchocanbo.root,
    element: <DanhSachTaiLieuHDSDChoCanBoTableLazy />,
  },
];
