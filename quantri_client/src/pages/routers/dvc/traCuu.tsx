import { HOST_PATH } from "@/data";
import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";
import HoSoTheoTrangThai10Table from "../../dvc/HoSoTheoTrangThai10/HoSoTheoTrangThai10Table";

const { apiEndpoints, primaryRoutes } = Service;
const CSDLDanCuTableLazy = lazy(
  () => import("../../dvc/tracuu/CSDLdancu/components/CSDLDanCuTable")
);
const TatCaHoSoTableLazy = lazy(
  () => import("../../dvc/tracuu/TatCaHoSo/components/TheoDoiTatCaHoSoTable")
);
const HoSoChoCanBoTraKQTableLazy = lazy(
  () => import("../../dvc/tracuu/HoSoChoCanBoTraKQ/components/HoSoChoCanBoTraKQTable")
);
const HoSoTraLaiXinRutTableLazy = lazy(
  () => import("../../dvc/tracuu/HoSoTraLaiXinRut/components/HoSoTraLaiXinRutTable")
);
const ScanHoSoTableLazy = lazy(
  () => import("../../dvc/ScanHoSoDienTu/ScanHoSoDienTu/ScanHoSoDienTuTable")
);

const KySoHoSoDienTuTableLazy = lazy(
  () => import("../../dvc/HoSoTheoTrangThai10/HoSoTheoTrangThai10Table")
);

const DaKySoHoSoDienTuTableLazy = lazy(
  () => import("../../dvc/HoSoTheoTrangThai10/HoSoTheoTrangThai10DaKySoTable")
);

const ChuaKySoHoSoDienTuTableLazy = lazy(
  () => import("../../dvc/HoSoTheoTrangThai10/HoSoTheoTrangThai10ChuaKySoTable")
);


const ScanHoSoChuaDinhKemKetQuaTableLazy = lazy(
  () => import("../../dvc/ScanHoSoDienTu/ScanHoSoDienTuChuaDinhkemKetQua/ScanHoSoDienTuChuaDinhKemKetQuaTable")
);

const ScanHoSoDaDinhKemKetQuaTableLazy = lazy(
  () => import("../../dvc/ScanHoSoDienTu/ScanHoSoDienTuDaDinhKemKetQua/ScanHoSoDienTuDaDinhKemKetQuaTable")
);

const HoSoBoSungTableLazy = lazy(
  () => import("../../dvc/tracuu/HoSoChoBoSung/components/HoSoChoBoSungTable")
);
const HoSoThuocDoiTuongMienPhiTableLazy = lazy(
  () => import("../../dvc/tracuu/HoSoThuocDoiTuongMienPhi/components/HoSoThuocDoiTuongMienPhiTable")
);

const HoSoTheoDonViTableLazy = lazy(
  () => import("../../dvc/tracuu/HoSoDonVi/components/HoSoTheoDonViTable")
);
const HoSoLienThongTableLazy = lazy(
  () => import("../../dvc/tracuu/HoSoLienThong/components/HoSoLienThongTable")
);
const AdminYeuCauThanhToanTableLazy = lazy(
  () =>
    import(
      "../../dvc/tracuu/AdminYeuCauThanhToan/components/AdminYeuCauThanhToanTable"
    )
);

const ThongTinDoanhNghiepTableLazy = lazy(
  () => import("../../../../src/features/TraCuuThongTinDoanhNghiep/components/TraCuuThongTinDoanhNghiepTable")
);


const HoKinhDoanhTableLazy = lazy(
  () => import("../../../../src/features/TraCuuHoKinhDoanh/components/TraCuuHoKinhDoanhTable")
);


const ThonTinTabLazy = lazy(
  () => import("../../../features/TraCuuThongTinTab/components/TraCuuThongTinTab")
);
const HoSoChuaSoHoaLazy = lazy(
  () => import("../../dvc/TraCuuHoSoSoHoa/components/HoSoChuaSoHoaTable")
);
const HoSoDaSoHoaLazy = lazy(
  () => import("../../dvc/TraCuuHoSoSoHoa/components/HoSoDaSoHoaTable")
);
export const traCuuRouters: RouteObject[] = [
  {
    path: primaryRoutes.dvc.traCuu.csdlDanCu,
    element: <CSDLDanCuTableLazy />,
  },
  {
    path: primaryRoutes.dvc.traCuu.tatCaHoSo,
    element: <TatCaHoSoTableLazy />,
  },
  {
    path: primaryRoutes.dvc.traCuu.hoSoDienTu,
    element: <TatCaHoSoTableLazy />,
  },
  {
    path: primaryRoutes.dvc.traCuu.scanHoSoDienTu,
    element: <ScanHoSoTableLazy />,
  },
  {
    path: primaryRoutes.dvc.traCuu.kySoHoSoDienTu,
    element: <KySoHoSoDienTuTableLazy  />,
  },
  {
    path: primaryRoutes.dvc.traCuu.daKySoHoSoDienTu,
    element: <DaKySoHoSoDienTuTableLazy />,
  },
  {
    path: primaryRoutes.dvc.traCuu.chuaKySoHoSoDienTu,
    element: <ChuaKySoHoSoDienTuTableLazy  />,
  },
  {
    path: primaryRoutes.dvc.traCuu.scanHoSoDienTuChuaScanKetQua,
    element: <ScanHoSoChuaDinhKemKetQuaTableLazy  />,
  },
  {
    path: primaryRoutes.dvc.traCuu.scanHoSoDienTuDaScanKetQua,
    element: <ScanHoSoDaDinhKemKetQuaTableLazy  />,
  },
  {
    path: primaryRoutes.dvc.traCuu.hoSoTraLaiXinRut,
    element: <HoSoTraLaiXinRutTableLazy />,
  },
  {
    path: primaryRoutes.dvc.traCuu.hoSoChoBoSung,
    element: <HoSoBoSungTableLazy />,
  },
  {
    path: primaryRoutes.dvc.traCuu.hoSoThuocDoiTuongMienPhi,
    element: <HoSoThuocDoiTuongMienPhiTableLazy />,
  },
  {
    path: primaryRoutes.dvc.traCuu.adminYeuCauThanhToan,
    element: <AdminYeuCauThanhToanTableLazy />,
  },
  {
    path: primaryRoutes.dvc.traCuu.hoSoTheoDonVi,
    element: <HoSoTheoDonViTableLazy />,
  },
  {
    path: primaryRoutes.dvc.traCuu.hoSoLienThong,
    element: <HoSoLienThongTableLazy />,
  },
  {
    path: primaryRoutes.dvc.traCuu.hoSoChoCanBoTraKQ,
    element: <HoSoChoCanBoTraKQTableLazy />,
  },
  {
    path: primaryRoutes.dvc.traCuu.thongTinDoanhNghiep,
    element: <ThongTinDoanhNghiepTableLazy />,
  },
  {
    path: primaryRoutes.dvc.traCuu.hoKinhDoanh,
    element: <HoKinhDoanhTableLazy />,
  },
  {
    path: primaryRoutes.dvc.hoSoSoHoa.chuaSoHoa,
    element: <HoSoChuaSoHoaLazy />,
  },
  {
    path: primaryRoutes.dvc.hoSoSoHoa.daSoHoa,
    element: <HoSoDaSoHoaLazy />,
  },
];
