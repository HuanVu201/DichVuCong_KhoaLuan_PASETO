import { Breadcrumb, Layout } from "antd";
import HeaderLayout from "./HeaderLayout";
import NavbarLayout from "./Navbar";
import FooterLayout from "./FooterLayout";
import ExpandItem from "./ExpandItem";
import { useLocation } from "react-router-dom";
import { BreadcrumbComp } from "./BreadCrumb/BreadCrumbComp";
import { useEffect, useState } from "react";
import { LayoutContext } from "antd/es/layout/layout";
import { IMenuPortal } from "./Models/KenhTin";

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
    </div>

  );
};

export default AntdBothLayout;