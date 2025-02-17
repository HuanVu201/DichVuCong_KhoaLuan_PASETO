import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service;
const HuongDanNopHoSoTableLazy = lazy(
  () => import("@/features/huongDanNopHoSo/components/HuongDanNopHoSoTable")
);
export const huongDanNopHoSoRouters: RouteObject[] = [
  {
    path: primaryRoutes.dvc.huongDanNopHoSo.danhSachHuongDanNopHoSo,
    element: <HuongDanNopHoSoTableLazy />,
  },
];
