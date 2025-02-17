import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service;

const ChoTraPhiDiaGioiView = lazy(() => import("../../dvc/hosophidiagioi/chotra/ChoTraPhiDiaGioiView"))
const DangXuLyPhiDiaGioiView = lazy(() => import("../../dvc/hosophidiagioi/dangxuly/DangXuLyPhiDiaGioiView"))
const DaTraPhiDiaGioiView = lazy(() => import("../../dvc/hosophidiagioi/datra/DaTraPhiDiaGioiView"))
const TiepNhanPhiDiaGioi = lazy(() => import("../../dvc/hosophidiagioi/tiepnhan/TiepNhanPhiDiaGioi"))
const TuChoiPhiDiaGioi = lazy(() => import("../../dvc/hosophidiagioi/tuchoi/TuChoiPhiDiaGioi"))
const ChoTiepNhan = lazy(() => import("../../dvc/hosophidiagioi/chotiepnhan/ChoTiepNhanPhiDiaGioi"))
const BoSungPhiDiaGioi = lazy(() => import("../../dvc/hosophidiagioi/bosung/BoSungPhiDiaGioi"))
const ChoKyDuyetPhiDiaGioi = lazy(() => import("../../dvc/hosophidiagioi/choKyDuyet/ChoKyDuyetPhiDiaGioi"))
const TraCuuPhiDiaGioi = lazy(() => import("../../dvc/hosophidiagioi/tracuu/TraCuuPhiDiaGioi"))

const ThongKeHoSoPhiDiaGioiLazy = lazy(() => import("../../dvc/hosophidiagioi/thongke/components/ThongKeHoSoPhiDiaGioi"))
const DaChuyenPhiDiaGioi = lazy(() => import("../../dvc/hosophidiagioi/daChuyen/DaChuyenPhiDiaGioi"))
const DanhSachDaTiepNhan = lazy(() => import("../../dvc/hosophidiagioi/danhSachDaTiepNhan/DanhSachDaTiepNhan"))

export const hoSoPhiDiaGioiRouters: RouteObject[] = [
  {
    path: primaryRoutes.dvc.hoSoPhiDiaGioi.tiepNhan,
    element: <TiepNhanPhiDiaGioi />,
  },
  {
    path: primaryRoutes.dvc.hoSoPhiDiaGioi.choTra,
    element: <ChoTraPhiDiaGioiView />,
  },
  {
    path: primaryRoutes.dvc.hoSoPhiDiaGioi.tuChoi,
    element: <TuChoiPhiDiaGioi />,
  },
  {
    path: primaryRoutes.dvc.hoSoPhiDiaGioi.daTra,
    element: <DaTraPhiDiaGioiView />,
  },
  {
    path: primaryRoutes.dvc.hoSoPhiDiaGioi.dangXuLy,
    element: <DangXuLyPhiDiaGioiView />,
  },
  {
    path: primaryRoutes.dvc.hoSoPhiDiaGioi.traCuu,
    element: <TraCuuPhiDiaGioi/>,
  },
  {
    path: primaryRoutes.dvc.hoSoPhiDiaGioi.thongKe,
    element: <ThongKeHoSoPhiDiaGioiLazy></ThongKeHoSoPhiDiaGioiLazy>,
  },
  {
    path: primaryRoutes.dvc.hoSoPhiDiaGioi.boSung,
    element: <BoSungPhiDiaGioi />,
  },
  {
    path: primaryRoutes.dvc.hoSoPhiDiaGioi.choTiepNhan,
    element: <ChoTiepNhan />,
  },
  {
    path: primaryRoutes.dvc.hoSoPhiDiaGioi.daTiepNhan,
    element: <DanhSachDaTiepNhan/>
  },
  {
    path: primaryRoutes.dvc.hoSoPhiDiaGioi.daChuyen,
    element: <DaChuyenPhiDiaGioi/>
  }
];
