import { lazy } from "react";

import { Service } from "@/services";
import { RouteObject } from "react-router-dom";
const { primaryRoutes } = Service;

const ThongKeHoSoTrucTuyenCapTinhLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeHoSoTrucTuyen/components/ThongKeHoSoTrucTuyenCapTinh"
    )
);
const ThongKeHoSoTrucTuyenCacSoBanNganhLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeHoSoTrucTuyen/components/ThongKeHoSoTrucTuyenCacSoBanNganh"
    )
);
const ThongKeHoSoTrucTuyenCapHuyenLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeHoSoTrucTuyen/components/ThongKeHoSoTrucTuyenCapHuyen"
    )
);
const ThongKeHoSoTrucTuyenCapXaLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeHoSoTrucTuyen/components/ThongKeHoSoTrucTuyenCapXa"
    )
);
const TienDoGiaiQuyetLazy = lazy(
  () =>
    import("../../../features/thongKe/thongKeQD766/components/TienDoGiaiQuyet")
);
const TheoDoiChiTieuDVCTrucTuyenLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeQD766/components/TheoDoiChiTieuDVCTrucTuyen"
    )
);
const ThanhToanTrucTuyenLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeQD766/components/ThanhToanTrucTuyen"
    )
);
const ThongKeTongHopLazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeQD766/components/ThongKeTongHop"
    )
);
const ThanhToanTrucTuyen2Lazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeQD766/components/ThanhToanTrucTuyen2"
    )
);
const TheoDoiChiTieuDVCTrucTuyen2Lazy = lazy(
  () =>
    import(
      "../../../features/thongKe/thongKeQD766/components/TheoDoiChiTieuDVCTrucTuyen2"
    )
);
const TienDoGiaiQuyet2Lazy = lazy(
  () =>
    import("../../../features/thongKe/thongKeQD766/components/TienDoGiaiQuyet2")
);
const MucDoSoHoaLazy = lazy(
  () => import("../../../features/thongKe/thongKeQD766/components/ChiTieuSoHoa")
);
const HoSoQuaHanLazy = lazy(
  () => import("../../../features/thongKe/thongKeQD766/components/HoSoQuaHan")
);
const ThongKeThanhToanTrucTuyenLazy = lazy(
  () => import("../../../features/thongKe/thongKeQD766/components/ThongKeThanhToanTrucTuyen")
);
export const thongKeRouters: RouteObject[] = [
  {
    path: primaryRoutes.dvc.thongKe.tiepNhanHoSoTrucTuyen
      .tiepNhanHoSoTrucTuyenCapTinh,
    element: <ThongKeHoSoTrucTuyenCapTinhLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.tiepNhanHoSoTrucTuyen
      .tiepNhanHoSoTrucTuyenCacSoBanNganh,
    element: <ThongKeHoSoTrucTuyenCacSoBanNganhLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.tiepNhanHoSoTrucTuyen
      .tiepNhanHoSoTrucTuyenCapHuyen,
    element: <ThongKeHoSoTrucTuyenCapHuyenLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.tiepNhanHoSoTrucTuyen
      .tiepNhanHoSoTrucTuyenCapXa,
    element: <ThongKeHoSoTrucTuyenCapXaLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.tienDoGiaiQuyet,
    element: <TienDoGiaiQuyetLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.theoDoiChiTieuDVCTrucTuyen,
    element: <TheoDoiChiTieuDVCTrucTuyenLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.thanhToanTrucTuyen,
    element: <ThanhToanTrucTuyenLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.thongKeTongHop,
    element: <ThongKeTongHopLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.thanhToanTrucTuyen2,
    element: <ThanhToanTrucTuyen2Lazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.theoDoiChiTieuDVCTrucTuyen2,
    element: <TheoDoiChiTieuDVCTrucTuyen2Lazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.tienDoGiaiQuyet2,
    element: <TienDoGiaiQuyet2Lazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.chiTieuSoHoa,
    element: <MucDoSoHoaLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.hoSoQuaHan,
    element: <HoSoQuaHanLazy />,
  },
  {
    path: primaryRoutes.dvc.thongKe.quyetDinh766.thongKeThanhToanTrucTuyen,
    element: <ThongKeThanhToanTrucTuyenLazy />,
  },
];
