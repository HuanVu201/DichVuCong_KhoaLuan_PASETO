import { lazy, Suspense } from "react";
import { Service } from "@/services";
import { RouteObject } from "react-router-dom";

const {primaryRoutes} = Service
const TiepNhanTrucTuyenMobileWrapper = lazy(
  () => import("../../mobile/TiepNhanHoSoTrucTuyen")
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
    path: primaryRoutes.mobile.chatBot,
    element: <Suspense fallback={<></>}>
      <ChatBotMobileWrapper/>
    </Suspense>
    },
];
  