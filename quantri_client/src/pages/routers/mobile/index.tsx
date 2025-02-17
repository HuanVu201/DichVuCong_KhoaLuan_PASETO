import { Suspense } from "react";
import { Service } from "@/services";
import { RouteObject } from "react-router-dom";
import { lazy } from "@/utils/lazyLoading";

const {primaryRoutes} = Service
const TiepNhanTrucTuyenMobileWrapper = lazy(
  () => import("../../mobile/TiepNhanHoSoTrucTuyen")
);
const HoSoNhapMobileWrapper = lazy(
  () => import("../../mobile/HoSoNhap")
);
const ChatBotMobileWrapper = lazy(
    () => import("../../mobile/ChatBot")
);

export const mobileRoutes: RouteObject[] = [
    {
        path: primaryRoutes.mobile.nopHoSoTrucTuyen,
        element: <Suspense fallback={<></>}>
          <TiepNhanTrucTuyenMobileWrapper/>
        </Suspense>
    },
    {
      path: primaryRoutes.mobile.hoSoNhap,
      element: <Suspense fallback={<></>}>
        <HoSoNhapMobileWrapper/>
      </Suspense>
  },
    {
    path: primaryRoutes.mobile.chatBot,
    element: <Suspense fallback={<></>}>
      <ChatBotMobileWrapper/>
    </Suspense>
    },
];
  