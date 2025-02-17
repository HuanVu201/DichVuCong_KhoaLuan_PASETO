import React from "react";
import { AntdLayout } from "../../lib/antd/components";

import { Outlet } from "react-router-dom";

import AntdBothLayout from "@/lib/antd/components/BothLayout/Layout";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchQuanLyLienKet } from "@/features/portaldvc_admin/QuanLyLienKet/redux/action";
import { ConfigProvider } from "antd";
import { PORTAL_PRIMARY_COLOR } from "@/data";

export const PortalMasterLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      dispatch(SearchQuanLyLienKet({}));
    })();
  }, []);
  return (
    <ConfigProvider theme={{
      token: {
      },
      components:{
        Button:{
          colorBgContainer:"#f0ad4e"
        }
      }
    }}>
      <AntdBothLayout>
        <Outlet />
      </AntdBothLayout>
    </ConfigProvider>

  );
};
