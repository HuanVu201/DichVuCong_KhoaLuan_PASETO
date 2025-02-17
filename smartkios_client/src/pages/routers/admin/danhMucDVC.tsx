import { NOTADMIN_ROUTE_ACCESS_TEXT } from "@/data";
import { useAppSelector } from "@/lib/redux/Hooks";
import { useAdminRoutes } from "@/pages/utils/useAdminRoutes";
import { Service } from "@/services";
import { lazy, useMemo } from "react";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service;
const LinhVucLazy = lazy(
  () => import("../../../features/linhvuc/components/LinhVucTable")
);
const MauPhoiLazy = lazy(
  () => import("../../../features/quanlymauphoi/components/MauPhoiTable")
);
const ThuTucLazy = lazy(
  () => import("../../../features/thutuc/components/ThuTucTable")
);
const PhiLePhiLazy = lazy(
  () => import("../../../features/loaiphilephi/components/LoaiPhiLePhiTable")
);
const TrangThaiHoSoLazy = lazy(
  () => import("../../admin/danhmucdvc/trangthaihoso/TrangThaiHoSo")
);
const NhomNguoiDungLazy = lazy(
  () => import("../../../features/nhomnguoidung/components/NhomNguoiDungTable")
);
const BuocXuLiLazy = lazy(
  () => import("../../../features/buocxuly/components/BuocXuLyTable")
);
const DonViLazy = lazy(
  () => import("../../../features/donvi/components/DonViTable")
);
const ThongBaoLazy = lazy(
  () => import("../../../features/thongbao/components/ThongBaoTable")
);

const ThayDoiMucDoThuTucLazy = lazy(
  () => import("../../../features/thaydoimucdothutuc/components/ThayDoiMucDoThuTucTable")
);

const SoChungThucLazy = lazy(
  () => import("../../../features/sochungthuc/components/SoChungThucTable")
);

const TaiKhoanThuHuongLazy = lazy(
  () =>
    import(
      "../../../features/taikhoanthuhuong/components/TaiKhoanThuHuongTable"
    )
);
const DanhMucDonViThuTucLazy = lazy(
  () =>
    import("../../../features/danhmucthutucdonvi/components/DonViThuTucTable")
);
const QuanLyDanhMucNganhLazy = lazy(() => import("../../portaldvc_admin/QuanLyDanhMucNganh"))
const DanhMucGiayToChungThucLazy = lazy(() => import("../../../features/danhmucgiaytochungthuc/components/DanhMucGiayToChungThucTable"))

export const danhMucDVCRouters = (): RouteObject[] => {
  // const { data: user } = useAppSelector((state) => state.user);
  // return useAdminRoutes({
  //   routes: [
  //     {
  //       path: primaryRoutes.admin.danhMucDVC.linhvuc,
  //       element: <LinhVucLazy />,
  //     },
  //     {
  //       path: primaryRoutes.admin.danhMucDVC.mauphoi,
  //       element: <MauPhoiLazy />,
  //     },
  //     {
  //       path: primaryRoutes.admin.danhMucDVC.thutuc,
  //       element: <ThuTucLazy />,
  //     },
  //     {
  //       path: primaryRoutes.admin.danhMucDVC.philephi,
  //       element: <PhiLePhiLazy />,
  //     },
  //     {
  //       path: primaryRoutes.admin.danhMucDVC.trangthai,
  //       element: <TrangThaiHoSoLazy />,
  //     },
  //     {
  //       path: primaryRoutes.admin.danhMucDVC.nhomnguoidung,
  //       element: <NhomNguoiDungLazy />,
  //     },
  //     {
  //       path: primaryRoutes.admin.danhMucDVC.buocxuly,
  //       element: <BuocXuLiLazy />,
  //     },
  //     {
  //       path: primaryRoutes.admin.danhMucDVC.donvi,
  //       element: <DonViLazy />,
  //     },
  //     {
  //       path: primaryRoutes.admin.danhMucDVC.thongbao,
  //       element: <ThongBaoLazy />,
  //     },
  //     {
  //       path: primaryRoutes.admin.danhMucDVC.taikhoanthuhuong,
  //       element: <TaiKhoanThuHuongLazy />,
  //     },
  //     {
  //       path: primaryRoutes.admin.danhMucDVC.thuTucDonVis,
  //       element: <DanhMucDonViThuTucLazy />,
  //     },
  //     {
  //       path: primaryRoutes.admin.danhMucDVC.quanlydanhmucnganh,
  //       element: <QuanLyDanhMucNganhLazy />
  //   },
  //   ],
  //   condition: user?.typeUser != "Admin",
  //   replaceComponentWith: <>{NOTADMIN_ROUTE_ACCESS_TEXT}</>,
  // });
  return [
    {
      path: primaryRoutes.admin.danhMucDVC.linhvuc,
      element: <LinhVucLazy />,
    },
    {
      path: primaryRoutes.admin.danhMucDVC.mauphoi,
      element: <MauPhoiLazy />,
    },
    {
      path: primaryRoutes.admin.danhMucDVC.thutuc,
      element: <ThuTucLazy />,
    },
    {
      path: primaryRoutes.admin.danhMucDVC.philephi,
      element: <PhiLePhiLazy />,
    },
    {
      path: primaryRoutes.admin.danhMucDVC.trangthai,
      element: <TrangThaiHoSoLazy />,
    },
    {
      path: primaryRoutes.admin.danhMucDVC.nhomnguoidung,
      element: <NhomNguoiDungLazy />,
    },
    {
      path: primaryRoutes.admin.danhMucDVC.buocxuly,
      element: <BuocXuLiLazy />,
    },
    {
      path: primaryRoutes.admin.danhMucDVC.donvi,
      element: <DonViLazy />,
    },
    {
      path: primaryRoutes.admin.danhMucDVC.thongbao,
      element: <ThongBaoLazy />,
    },
    {
      path: primaryRoutes.admin.danhMucDVC.taikhoanthuhuong,
      element: <TaiKhoanThuHuongLazy />,
    },
    {
      path: primaryRoutes.admin.danhMucDVC.thuTucDonVis,
      element: <DanhMucDonViThuTucLazy />,
    },
    {
      path: primaryRoutes.admin.danhMucDVC.quanlydanhmucnganh,
      element: <QuanLyDanhMucNganhLazy />
    },
    {
      path: primaryRoutes.admin.danhMucDVC.thaydoimucdothutuc,
      element: <ThayDoiMucDoThuTucLazy />
    },
    {
      path: primaryRoutes.admin.danhMucDVC.danhmucgiaytochungthuc,
      element: <DanhMucGiayToChungThucLazy />
    }
    ,{
      path: primaryRoutes.admin.danhMucDVC.sochungthuc,
      element: <SoChungThucLazy />
    },
  ]
};
