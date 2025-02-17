import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
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
const ThuTucThietYeuLazy = lazy(
  () => import("../../../features/portaldvc_admin/thuTucThietyeu/components/ThuTucThietYeuTable")
);
const ThuTucCanBoMotCuaLazy = lazy(
  () =>
    import(
      "../../../features/thutuccanbomotcua/components/ThuTucCanBoMotCuaTable"
    )
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
  () =>
    import(
      "../../../features/thaydoimucdothutuc/components/ThayDoiMucDoThuTucTable"
    )
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
const QuanLyDanhMucNganhLazy = lazy(
  () => import("../../portaldvc_admin/QuanLyDanhMucNganh")
);
const DanhMucGiayToChungThucLazy = lazy(
  () =>
    import(
      "../../../features/danhmucgiaytochungthuc/components/DanhMucGiayToChungThucTable"
    )
);

const LogCSDLDANCUDoanNghiepLazy = lazy(
  () =>
    import(
      "../../../features/quanlylogcsdldancudoannghiep/components/LogCSDLDanCuDoanhNghiepTable"
    )
);

const ProcGroup_Mgr = lazy(
  () =>
    import(
      "../../../features/proGruop_Mgr/components/ProcGroup_MgrTable"
    )
);
const Assor_Proc_Mgr_Lazy = lazy(
  () => import("../../../features/portaldvc_admin/assoc_proc_mgr/components/Assor_Proc_Mgr_Table")
);

const Service_Logs_Mgr_Lazy = lazy(() => import("../../../features/service_logs_mgr/components/Service_Logs_Mgr_Table"));
const BieuMauKetQuaDienTuTTHCCLazy = lazy(
  () => import("../../../features/ketquathutuc/components/BieuMauKetQuaDienTuTTHC")
);
const GiayToDienTuTTHCLazy = lazy(
  () => import("../../../features/ketquathutuc/components/GiayToDienTuTTHCTable")
);
export const danhMucDVCRouters = (): RouteObject[] => {
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
      path: primaryRoutes.admin.danhMucDVC.thuTucThietYeu,
      element: <ThuTucThietYeuLazy />,
    },
    {
      path: primaryRoutes.admin.danhMucDVC.thutuccanbomotcua,
      element: <ThuTucCanBoMotCuaLazy />,
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
      element: <QuanLyDanhMucNganhLazy />,
    },
    {
      path: primaryRoutes.admin.danhMucDVC.thaydoimucdothutuc,
      element: <ThayDoiMucDoThuTucLazy />,
    },
    {
      path: primaryRoutes.admin.danhMucDVC.danhmucgiaytochungthuc,
      element: <DanhMucGiayToChungThucLazy />,
    },
    {
      path: primaryRoutes.admin.danhMucDVC.sochungthuc,
      element: <SoChungThucLazy />,
    },
    {
      path: primaryRoutes.admin.danhMucDVC.logcsdldancudoannghiep,
      element: <LogCSDLDANCUDoanNghiepLazy />,
    },
    {
      path: primaryRoutes.admin.danhMucDVC.procgroup_mgr,
      element: <ProcGroup_Mgr />,
    },
    {
      path: primaryRoutes.admin.danhMucDVC.assoc_proc_mgr,
      element: <Assor_Proc_Mgr_Lazy />,
    },
    {
      path: primaryRoutes.admin.danhMucDVC.service_logs_mgr,
      element: <Service_Logs_Mgr_Lazy />,
    },
    {
      path: primaryRoutes.admin.danhMucDVC.bieuMauKetQuaDienTuTTHC,
      element: <BieuMauKetQuaDienTuTTHCCLazy />,
    },
    {
      path: primaryRoutes.admin.danhMucDVC.giayToDienTuTTHC,
      element: <GiayToDienTuTTHCLazy />,
    },
  ];
};
