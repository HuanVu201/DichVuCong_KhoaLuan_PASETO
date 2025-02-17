import { SHOW_DEMO } from "@/data";
import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service;

const ChoSoHoa = lazy(() => import("../../dvc/chamSoHoa/choSoHoa/ChamChoSoHoa"))
const DaChamSoHoa = lazy(() => import("../../dvc/chamSoHoa/daSoHoa/DaChamSoHoa"))

export const chamSoHoaRouter: RouteObject[] = SHOW_DEMO ? [
  {
    path: primaryRoutes.dvc.chamSoHoa.choSoHoa,
    element: <ChoSoHoa/>,
  },
  {
    path: primaryRoutes.dvc.chamSoHoa.daSoHoa,
    element: <DaChamSoHoa/>,
  },
] : [];
