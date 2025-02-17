import { Service } from "@/services";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const { apiEndpoints, primaryRoutes } = Service;
const ChoThuPhiTable = lazy(
  () => import("../../dvc/thuphilephi/chothuphi/components/ChoThuPhiTable")
);
const DaHoanPhiTable = lazy(
  () => import("../../dvc/thuphilephi/dahoanphi/components/DaHoanPhiTable")
);
const DaThuPhiTable = lazy(
  () => import("../../dvc/thuphilephi/dathuphi/components/DaThuPhiTable")
);
const HoSoDaThuPhiTrucTuyenTable = lazy(
  () =>
    import(
      "../../dvc/thuphilephi/hosodathuphitructuyen/components/HoSoDaThuPhiTrucTuyenTable"
    )
);
const ThongKeThuPhiLePhiTable = lazy(
  () =>
    import(
      "../../dvc/thuphilephi/thongkethuphilephi/components/ThongKeThuPhiLePhiTable"
    )
);
const TinhHinhSuDungBienLaiTable = lazy(
  () =>
    import(
      "../../dvc/thuphilephi/tinhhinhsudungbienlai/components/TinhHinhSuDungBienLaiTable"
    )
);
const TheoDoiChoThuPhiTable = lazy(
  () =>
    import("../../dvc/thuphilephi/chothuphi/components/TheoDoiChoThuPhiTable")
);
const TheoDoiDaThuPhiTable = lazy(
  () => import("../../dvc/thuphilephi/dathuphi/components/TheoDoiDaThuPhiTable")
);
const TheoDoiDaHoanPhiTable = lazy(
  () =>
    import("../../dvc/thuphilephi/dahoanphi/components/TheoDoiDaHoanPhiTable")
);
const TheoDoiDaHuyThuPhiTable = lazy(
  () =>
    import("../../dvc/thuphilephi/huythuphi/components/TheoDoiHuyThuPhiTable")
);
const HuyThuPhiTable = lazy(
  () => import("../../dvc/thuphilephi/huythuphi/components/HuyThuPhiTable")
);
export const thuPhiLePhiRouters: RouteObject[] = [
  {
    path: primaryRoutes.dvc.thuPhiLePhi.choThuPhi,
    element: <ChoThuPhiTable />,
  },
  {
    path: primaryRoutes.dvc.thuPhiLePhi.daHoanPhi,
    element: <DaHoanPhiTable />,
  },
  {
    path: primaryRoutes.dvc.thuPhiLePhi.daThuPhi,
    element: <DaThuPhiTable />,
  },
  {
    path: primaryRoutes.dvc.thuPhiLePhi.huyThuPhi,
    element: <HuyThuPhiTable />,
  },
  {
    path: primaryRoutes.dvc.thuPhiLePhi.theoDoiChoThuPhi,
    element: <TheoDoiChoThuPhiTable />,
  },
  {
    path: primaryRoutes.dvc.thuPhiLePhi.theoDoiHuyThuPhi,
    element: <TheoDoiDaHuyThuPhiTable />,
  },
  {
    path: primaryRoutes.dvc.thuPhiLePhi.theoDoiDaHoanPhi,
    element: <TheoDoiDaHoanPhiTable />,
  },
  {
    path: primaryRoutes.dvc.thuPhiLePhi.theoDoiDaThuPhi,
    element: <TheoDoiDaThuPhiTable />,
  },
  {
    path: primaryRoutes.dvc.thuPhiLePhi.hoSoDaThuPhiTrucTruyen,
    element: <HoSoDaThuPhiTrucTuyenTable />,
  },
  {
    path: primaryRoutes.dvc.thuPhiLePhi.thongKeThuPhiLePhi,
    element: <ThongKeThuPhiLePhiTable />,
  },
  {
    path: primaryRoutes.dvc.thuPhiLePhi.tinhHinhSuDungBienLaiThuPhiLePhi,
    element: <TinhHinhSuDungBienLaiTable />,
  },
];
