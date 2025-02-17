import { useAppSelector } from "@/lib/redux/Hooks";
import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service;
const CoCauToChucLazy = lazy(
  () => import("../../../features/cocautochuc/components/CoCauToChucWrapper")
);
const VaiTroLazy = lazy(
  () => import("../../../features/vaitro/components/VaiTroWrapper")
);
const DanhSachNguoiDungLazy = lazy(
  () => import("../../../features/danhsachnguoidung/UserWrapper")
);
const LogTakKhoanCSDLDanCuLazy = lazy(
  () => import("../../../features/taikhoancsdldancu/components/LogTaiKhoanCSDLDanCuTable")
);
const ChuyenDuLieuTaiKhoanLazy = lazy(
  () => import("../../../features/chuyendulieutaikhoan/components/index")
);
const DoiMatKhauLazy = lazy(
  () => import("../../../features/user/components/DoiMatKhau")
);
const ThongTinNguoiDungLazy = lazy(
  () => import("../../../features/user/components/ThongTinNguoiDung")
);

const ListUserByPermision = lazy ( () => import("../../../features/danhsachnguoidung/UserByPermissionWrapper"))

export const quanTriNguoiDungRouters = (): RouteObject[] => {
  const { data: user } = useAppSelector(state => state.user)
  // return useAdminRoutes({routes: [
  //         {
  //             path: primaryRoutes.admin.quanTriNguoiDung.coCauToChuc,
  //             element: <CoCauToChucLazy />
  //         },
  //         {
  //             path: primaryRoutes.admin.quanTriNguoiDung.vaiTro,
  //             element: <VaiTroLazy />
  //         },
  //         {
  //             path: primaryRoutes.admin.quanTriNguoiDung.doimatkhau,
  //             element: <DoiMatKhauLazy />
  //         },
  //         {
  //             path: primaryRoutes.admin.quanTriNguoiDung.thongtintaikhoan,
  //             element: <ThongTinNguoiDungLazy />
  //         },
  //     ], condition: user?.typeUser != "Admin", replaceComponentWith: <>{NOTADMIN_ROUTE_ACCESS_TEXT}</>})
  return [
    {
      path: primaryRoutes.admin.quanTriNguoiDung.coCauToChuc,
      element: <CoCauToChucLazy role='root.admin' />
    },
    {
      path: primaryRoutes.admin.quanTriNguoiDung.vaiTro,
      element: <VaiTroLazy />
    },
    {
      path: primaryRoutes.admin.quanTriNguoiDung.danhsachnguoidung,
      element: <DanhSachNguoiDungLazy />
    },
    {
      path: primaryRoutes.admin.quanTriNguoiDung.taiKhoanTuCSDLDanCu,
      element: <LogTakKhoanCSDLDanCuLazy />
    },
    {
      path: primaryRoutes.admin.quanTriNguoiDung.chuyendulieutaikhoan,
      element: <ChuyenDuLieuTaiKhoanLazy />
    },
    {
      path: primaryRoutes.admin.quanTriNguoiDung.listuserbypermission,
      element: <ListUserByPermision />
    },
    // {
    //     path: primaryRoutes.admin.quanTriNguoiDung.doimatkhau,
    //     element: <DoiMatKhauLazy />
    // },
    // {
    //     path: primaryRoutes.admin.quanTriNguoiDung.thongtintaikhoan,
    //     element: <ThongTinNguoiDungLazy />
    // },
  ]
}
