import { AntdTab } from "@/lib/antd/components";
import { Tabs, TabsProps } from "antd";
import '../scss/WrapperList.scss'
import { useState } from "react";
import { ListNhungCauHoiThuongGap } from "./ListNhungCauHoiThuongGap";

export const WrapperListNhungCauHoiThuongGap = () => {
    const [type, setType] = useState('')
    const handleChangeTab = (key: string) => {
        setType(key)
    }

    return (
        <div className="wrap-tab">
            <AntdTab type="card" onChange={handleChangeTab} defaultActiveKey="cong-dan">
                <AntdTab.TabPane tab='Công dân' key='cong-dan'>
                    <ListNhungCauHoiThuongGap type={type}></ListNhungCauHoiThuongGap>
                </AntdTab.TabPane>
                <AntdTab.TabPane tab='Doanh nghiệp' key='doanh-nghiep'>
                    <ListNhungCauHoiThuongGap type={type}></ListNhungCauHoiThuongGap>
                </AntdTab.TabPane>

            </AntdTab>
        </div>
    )
}