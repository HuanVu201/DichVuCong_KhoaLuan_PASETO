import { useState, useRef, useEffect, useMemo, lazy } from "react";
import { Layout, theme, Button, Spin } from "antd";
import { SIDER_MENU_WIDTH } from "../../../../data";
import { useLocation } from "react-router-dom";
import { BellOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { MenuProps } from "antd/es/menu";
import { Service } from "@/services";
import { DropDownUser } from "../dropdown/DropDownUser";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import React from "react";
import { AntdModal, AntdSpace } from "..";
import { SearchPublicConfig } from "@/features/config/redux/action";
import { useNhacViec } from "./hooks/useNhacViec";
import { AntdNestedMenu } from "../menu/NestedMenu";
import { SearchMenu } from "@/features/danhmucmenu/redux/action";
import { AntdMenu } from "..";
import { MainContextProvider, useMainContext } from "./context/MainContext";
import Changepassword from "@/features/user/components/DoiMatKhau";
import useScript from "@/hooks/useChatBot";
import { useWindowSizeChange } from "@/hooks/useWindowSizeChange";

const { primaryRoutes } = Service;
const { Header, Content, Footer, Sider } = Layout;

interface IAntdLayoutProps {
  children: React.ReactElement;
  headerFixed?: boolean;
  siderFixed?: boolean;
  siderWrapperWidth?: string;
  menuTheme?: MenuProps["theme"];
}

// const SIDER_MENU = {
//   [primaryRoutes.admin.root.replace(/\//g, "")]: SIDER_MENU_ADMIN,
//   [primaryRoutes.dvc.root.replace(/\//g, "")]: SIDER_MENU_DVC,
//   [primaryRoutes.portaldvc_admin.root.replace(/\//g, "")]: SIDER_MENU_PORTALDVC_Admin,

// }

const AntdLayoutContainer = ({
  children,
  headerFixed = true,
  siderFixed = true,
  siderWrapperWidth = SIDER_MENU_WIDTH,
  menuTheme = "dark",
}: IAntdLayoutProps) => {
  const dispatch = useAppDispatch()
  const [collapsed, setCollapsed] = useState(false)
  const siderRef = useRef<HTMLDivElement>(null)
  const siderMobileRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const [siderWidth, setSiderWidth] = useState<string | undefined>(siderWrapperWidth)
  const { publicModule } = useAppSelector(state => state.config)
  const { sideBarMenu, navigationMenu, loading: menuLoading, activeModule} = useAppSelector(state => state.menu)
  const {_internalRenderMenuItem, BadgeBell} = useNhacViec({})
  const {isMobile} = useWindowSizeChange()
  useEffect(() => {
    dispatch(SearchPublicConfig());
  }, []);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  //https://stackoverflow.com/questions/71971631/how-to-wait-for-dom-commit-in-react
  useEffect(() => {
    setTimeout(() => {
      setSiderWidth(
        collapsed ? siderRef.current?.style.width : siderWrapperWidth
      );
    }, 0);
  }, [collapsed]);

  useEffect(() => {
    //listsegment chứa ['/','dvc'] || ['/','admin']
    const listSegment = location.pathname.split("/");
    // không cho gọi lại api lấy menu khi vẫn ở segment cùng với module ở searchParam lần gọi api cuối
    if (listSegment.length > 0 && listSegment[1] != activeModule) {
      dispatch(
        SearchMenu({
          active: true,
          pageNumber: 1,
          pageSize: 120,
          filterByUserRole: true,
          module: listSegment[1] as any,
        })
      );
    }
  }, [location.pathname, activeModule])

  const [openMenu] = useMemo(() => {
    const listSegment = location.pathname.split("/")
    const openMenu = listSegment.length > 1 ? [location.pathname.slice(0, location.pathname.lastIndexOf("/"))] : undefined
    return [openMenu]
  }, [location.pathname, activeModule]);

  const [logoQuanTri] = useMemo(() => {
    return [publicModule?.find((x) => x.code == "logo-quan-tri")];
  }, [publicModule]);



  return (
    <Layout className="main-layout">
    {isMobile ? null : <Sider
        ref={siderRef}
        width={siderWidth}
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        collapsedWidth={50}
        className={siderFixed ? `layout-sider-fixed` : ""}
      >
        <div className="demo-logo">
          <img
            src={logoQuanTri?.content}
            alt="Hành chính công"
            className="img-fluid"
          />
        </div>
        <div style={{overflow: "overlay", height: '100%'}}>
          <Spin spinning={menuLoading} >
            <AntdNestedMenu 
            mode="inline"
            theme={menuTheme}
            defaultOpenKeys={openMenu}
            selectedKeys={[location.pathname + location.search]}
            style={{ borderRight: 0, paddingBottom: 200 }}
            generateMenu={{model: sideBarMenu, iconName: "iconName", label: "tenMenu", parentKey: "parentId", path: "fullPath", value: "id"}}
            _internalRenderMenuItem={_internalRenderMenuItem}
            />
          </Spin>
        </div>
        
       
      </Sider>}
      <Layout
        style={isMobile ? undefined :{ marginLeft: collapsed ? siderWidth : siderWrapperWidth }}
        className="layout-collapse-marginleft-animate"
      >
        <Header className={headerFixed ? `layout-header-sticky` : ""}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              color: "white",
            }}
          />
          
          <AntdMenu
            theme={menuTheme}
            style={{ width: "100%" }}
            mode="horizontal"
            selectedKeys={[location.pathname + location.search]}
            generateMenu={{
              model: navigationMenu,
              label: "tenMenu",
              value: "fullPath",
              useValueAsLink: true,
            }}
          />
          <AntdSpace size="large">
            {BadgeBell}
            <DropDownUser />
          </AntdSpace>
        </Header>
        <Layout>
          {/* <AntdBreadCrumb /> */}
          {isMobile ? <>
          <div style={{height:"auto"}}>
          <div className={`side-menu-mobile ${collapsed ? 'active' : ""}`} ref={siderMobileRef}>
            <AntdNestedMenu 
                mode="inline"
                theme={menuTheme}
                defaultOpenKeys={openMenu}
                selectedKeys={[location.pathname + location.search]}
                style={{ borderRight: 0, paddingBottom: 200, zIndex:999, position: "relative"}}
                generateMenu={{model: sideBarMenu, iconName: "iconName", label: "tenMenu", parentKey: "parentId", path: "fullPath", value: "id"}}
                _internalRenderMenuItem={_internalRenderMenuItem}
                />
          </div>
          </div>
          {collapsed ? <div className="side-menu-mobile__backdrop" onClick={() => setCollapsed(false)}></div> : null}
          </> : null}
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export const AntdLayout = ({
  children,
  headerFixed = true,
  siderFixed = true,
  siderWrapperWidth = SIDER_MENU_WIDTH,
  menuTheme = "dark",
}: IAntdLayoutProps) => {
  return (
    <MainContextProvider>
      <AntdLayoutContainer
        headerFixed={headerFixed}
        siderFixed={siderFixed}
        siderWrapperWidth={siderWrapperWidth}
        menuTheme={menuTheme}
      >
        {children}
      </AntdLayoutContainer>
    </MainContextProvider>
  );
};