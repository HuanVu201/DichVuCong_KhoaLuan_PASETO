
import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes, apiEndpoints } = Service

const TaiKhoanChuaDinhDanhLazy = lazy(
  () => import("../../../features/quanlydinhdanhcongdan/components/taiKhoanChuaDinhDanh/taiKhoanChuaDinhDanhTable")
);
const TaiKhoanDaDinhDanhLazy = lazy(
  () => import("../../../features/quanlydinhdanhcongdan/components/taiKhoanDaDinhDanh/taiKhoanDaDinhDanhTable")
);
const ThongKeTaiKhoanCongDanLazy = lazy(
  () => import("../../../features/quanlydinhdanhcongdan/components/thongKeTaiKhoanCongDan/thongKeTaiKhoanCongDanTable")
);


export const dinhDanhCongDanRouters = (): RouteObject[] => {
  return [
    {
      path: primaryRoutes.admin.dinhdanhcongdan.chuaDinhDanh,
      element: <TaiKhoanChuaDinhDanhLazy />
    },
    {
      path: primaryRoutes.admin.dinhdanhcongdan.daDinhDanh,
      element: <TaiKhoanDaDinhDanhLazy />
    },
    {
      path: primaryRoutes.admin.dinhdanhcongdan.thongKeTrenCongDVC,
      element: <ThongKeTaiKhoanCongDanLazy />
    },
  ]
}