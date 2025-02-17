import { Breadcrumb, Layout, Spin } from "antd";
import HeaderLayout from "./HeaderLayout";
import NavbarLayout from "./Navbar";
import FooterLayout from "./FooterLayout";
import ExpandItem from "./ExpandItem";
import { useLocation } from "react-router-dom";
import { BreadcrumbComp } from "./BreadCrumb/BreadCrumbComp";
import { useEffect, useState } from "react";
import { IMenuPortal } from "./Models/KenhTin";
import { useAppSelector } from "@/lib/redux/Hooks";

interface IAntdLayoutProps {
  children: React.ReactElement;
}

const AntdBothLayout = ({ children }: IAntdLayoutProps) => {
  const location = useLocation()
  const [selectedMenuItem, setSelectedMenuItem] = useState<IMenuPortal | null>(null);
  useEffect(() => {
    // Kiểm tra xem có giá trị selectedMenuItem đã được lưu trong local storage không
    const storedValue = localStorage.getItem('selectedMenuItem');
    if (storedValue) {
      const parsedValue = JSON.parse(storedValue);
      setSelectedMenuItem(parsedValue);
    }
  }, []);
  const {loading} = useAppSelector(state => state.global)

  return (
    <div className="main-layout" style={{ backgroundColor: '#fff' }}>

      <HeaderLayout />
      <NavbarLayout setSelectedMenuItem={setSelectedMenuItem} />
      {/* {location.pathname === "/portaldvc/home" ? <></> :
        <BreadcrumbComp selectedItem={selectedMenuItem}></BreadcrumbComp>
      } */}

      <div className="container-fluid" style={{ paddingInline: 0 }}>
        {children}
      </div>
      <FooterLayout />
      <ExpandItem />
      <Spin spinning={loading} fullscreen></Spin>
    </div>

  );
};

export default AntdBothLayout;