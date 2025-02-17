import React from "react";
import { AntdLayout } from "../../lib/antd/components";

import { Outlet } from "react-router-dom";
import AntdSmartKioskLayout from "@/lib/antd/components/SmartKioskLayout/Layout";

// import AntdBothLayout from '@/lib/antd/components/BothLayout/Layout'

export const SmartKioskLayout = () => {
  return (
    <AntdSmartKioskLayout>
      <Outlet />
    </AntdSmartKioskLayout>
  );
};
