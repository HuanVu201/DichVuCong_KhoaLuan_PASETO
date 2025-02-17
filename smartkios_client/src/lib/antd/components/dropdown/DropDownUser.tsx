import React, { Suspense, lazy } from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { resetData } from "@/features/auth/redux/Slice";
import { logout, resetData as resetDataUser } from "@/features/user/redux/Slice";
import { Link, useNavigate } from "react-router-dom";
import { Service } from "@/services";
import { AntdModal, AntdSpace } from "..";
import { resetPublicModule } from "@/features/config/redux/slice";
import { useMainContext } from "../layout/context/MainContext";
import { resetModule } from "@/features/danhmucmenu/redux/slice";
import { userService } from "@/features/user/services";
const { apiEndpoints, primaryRoutes } = Service;

const items: MenuProps["items"] = [
  {
    label: "Thông tin người dùng",
    key: "thong-tin-nguoi-dung",
  },
  {
    label: "Đổi mật khẩu",
    key: "doi-mat-khau",
  },
  {
    label: "Thoát",
    key: "dang-xuat",
  },
];

const DoiMatKhauLazy = lazy(
  () => import("../../../../features/user/components/DoiMatKhau")
);
const ThongTinNguoiDungLazy = lazy(
  () => import("../../../../features/user/components/ThongTinNguoiDung")
);

export const DropDownUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: user } = useAppSelector((state) => state.user);
  const { data: auth } = useAppSelector((state) => state.auth);
  const mainContext = useMainContext();
  const handleDropdownItemClick = async (e: any) => {
    if (e.key == "dang-xuat") {
      dispatch(logout())
      navigate(Service.primaryRoutes.portaldvc.home)
      if(auth?.token) {
        await userService.LogoutSSO({access_token: auth.token})
      }
    }
    if (e.key == "doi-mat-khau") {
      // navigate(primaryRoutes.admin.quanTriNguoiDung.doimatkhau);
      // console.log(primaryRoutes.admin.quanTriNguoiDung.doimatkhau);
      mainContext.setChangePasswordModalVisible(true);
    }
    if (e.key == "thong-tin-nguoi-dung") {
      //   navigate(primaryRoutes.admin.quanTriNguoiDung.thongtintaikhoan);
      mainContext.setUserInfoModalVisible(true);
      // console.log(primaryRoutes.admin.quanTriNguoiDung.doimatkhau);
    }
  };
  return (
    <>
    <Dropdown
      menu={{ items: items, onClick: handleDropdownItemClick }}
      trigger={["click"]}
    >
      <AntdSpace
        style={{
          color: "white",
          cursor: "pointer",
          justifyContent: "end",
          whiteSpace: "nowrap",
        }}
        align="end"
      >
        <p style={{marginBottom:0}}>{user?.fullName || user?.userName || "User"}</p>
        <DownOutlined />
      </AntdSpace>
    </Dropdown>
    <Suspense fallback={<Spin spinning={true}/>}>
      {mainContext.userInfoModalVisible ? (
        <AntdModal
          title="Thông tin người dùng"
          visible={mainContext.userInfoModalVisible}
          handlerCancel={() => {
            mainContext.setUserInfoModalVisible(false);
          }}
          footer={null}
        >
          <ThongTinNguoiDungLazy />
        </AntdModal>
      ) : null}
      {mainContext.changePasswordModalVisible ? (
        <AntdModal
          title="Đổi mật khẩu"
          visible={mainContext.changePasswordModalVisible}
          handlerCancel={() => {
            mainContext.setChangePasswordModalVisible(false);
          }}
          footer={null}
        >
          <DoiMatKhauLazy />
        </AntdModal>
    ) : null}

    </Suspense>
    
    </>
    
    
  );
};
