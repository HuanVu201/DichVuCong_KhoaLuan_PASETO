import React from "react";
import { AntdLayout } from "../../lib/antd/components";

import { Outlet } from "react-router-dom";

// import AntdBothLayout from '@/lib/antd/components/BothLayout/Layout'

export const SmartKioskLayout = () => {
  return (
    <AntdLayout>
      <Outlet />
    </AntdLayout>
  );
};
