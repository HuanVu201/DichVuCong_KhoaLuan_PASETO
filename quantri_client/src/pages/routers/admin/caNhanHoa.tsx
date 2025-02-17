
import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes, apiEndpoints } = Service

const CaNhanHoaLazy = lazy(
    () => import("../../../features/CaNhanHoa/index")
);



export const CaNhanHoaNguoiDungRouters = (): RouteObject[] => {
    return [
        {
            path: primaryRoutes.admin.caNhanHoaNguoiDung.root,
            element: <CaNhanHoaLazy />
        },
    ]
}