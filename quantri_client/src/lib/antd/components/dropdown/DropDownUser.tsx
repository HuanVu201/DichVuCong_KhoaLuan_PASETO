import React, { Suspense, useEffect, useState } from "react";
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
import { lazy } from "@/utils/lazyLoading";
import { QuanLyTaiNguyenWrapper } from "@/features/quanlytainguyen/components/QuanLyTaiNguyen";
import { toast } from "react-toastify";
const { apiEndpoints, primaryRoutes } = Service;

const items: MenuProps["items"] = [
  {
    label: "Thông tin người dùng",
    key: "thong-tin-nguoi-dung",
  },
  {
    label: "Quản lý tài nguyên",
    key: "quan-ly-tai-nguyen",
  },
  {
    label: "Cá nhân hóa",
    key: "ca-nhan-hoa-nguoi-dung",
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
  const { publicModule: config } = useAppSelector(state => state.config)
  const [caNhanHoa, setCaNhanHoa] = useState<boolean>(false);
  useEffect(() => {
    config?.map((item: any) => {
      if (item.code == 'ca-nhan-hoa-nguoi-dung' && item.content == '1') {
        setCaNhanHoa(true)
      }
    })
  }, [config])
  const mainContext = useMainContext();
  const handleDropdownItemClick = async (e: any) => {
    if (e.key == "dang-xuat") {
      if (top?.window) {
        if(auth?.token){
          top.location = `/logout?accessToken=${auth.token}`;
        } else {
          dispatch(logout())
          navigate(Service.primaryRoutes.portaldvc.home)
        }
      }
      else {
        dispatch(logout())
        navigate(Service.primaryRoutes.portaldvc.home)
        if (auth?.token) {
          await userService.LogoutSSO({ access_token: auth.token })
        }

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
    if (e.key == "quan-ly-tai-nguyen") {
      //   navigate(primaryRoutes.admin.quanTriNguoiDung.thongtintaikhoan);
      mainContext.setQuanLyTaiNguyenModalVisible(true);
      // console.log(primaryRoutes.admin.quanTriNguoiDung.doimatkhau);
    }
    if (e.key == "ca-nhan-hoa-nguoi-dung") {
      navigate(primaryRoutes.admin.caNhanHoaNguoiDung.root);
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
            cursor: "pointer",
            justifyContent: "end",
            whiteSpace: "nowrap",
            alignItems: 'center',
            marginLeft: '10px'
          }}
          className="user-header"
          align="end"
        >
          <i className="fa-solid fa-circle-user" style={{ fontSize: '25px', display: 'block', color: '#b1b1b1' }}></i>
          <p style={{ marginBottom: 0, fontSize: '15px', color: '#2A3342' }}>{user?.fullName || user?.userName || "User"}</p>
          <i className="fa-solid fa-angle-down"></i>
        </AntdSpace>
      </Dropdown>
      <Suspense fallback={<Spin spinning={true} />}>
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
        {mainContext.quanLyTaiNguyenModalVisible ? (
          <AntdModal
            title="Danh sách tài nguyên"
            visible={mainContext.quanLyTaiNguyenModalVisible}
            handlerCancel={() => {
              mainContext.setQuanLyTaiNguyenModalVisible(false);
            }}
            width={1400}
            footer={null}
          >
            <QuanLyTaiNguyenWrapper isAdmin={false} />
          </AntdModal>
        ) : null}

      </Suspense>

    </>


  );
};
