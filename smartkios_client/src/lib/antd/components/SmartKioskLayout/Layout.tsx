import { Breadcrumb, Layout } from "antd";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { LayoutContext } from "antd/es/layout/layout";
import { HeaderSmartKiost } from "@/features/smartkiosk/components/HeaderSmartKiosk";
import ExpandItem from "../BothLayout/ExpandItem";

interface IAntdLayoutProps {
    children: React.ReactElement;
}

const AntdSmartKioskLayout = ({ children }: IAntdLayoutProps) => {
    useEffect(() => {
        // Kiểm tra xem có giá trị selectedMenuItem đã được lưu trong local storage không
        const storedValue = localStorage.getItem('selectedMenuItem');
        if (storedValue) {
            const parsedValue = JSON.parse(storedValue);
        }
    }, []);

    return (
        <div className="main-layout" >

            <HeaderSmartKiost></HeaderSmartKiost>


            <div className="container-fluid" style={{ paddingInline: 0 }}>
                {children}
            </div>
            <ExpandItem />
        </div>

    );
};

export default AntdSmartKioskLayout;