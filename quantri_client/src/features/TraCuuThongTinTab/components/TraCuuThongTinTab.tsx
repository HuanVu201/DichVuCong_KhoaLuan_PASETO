import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext"
import TraCuuThongTinDoanhNghiepTableWrapper from "@/features/TraCuuThongTinDoanhNghiep/components/TraCuuThongTinDoanhNghiepTable";
import TraCuuHoKinhDoanhTableWrapper from "@/features/TraCuuHoKinhDoanh/components/TraCuuHoKinhDoanhTable";
import TraCuuHopTacXaTableWrapper from "@/features/TraCuuHopTacXa/components/TraCuuHopTacXaTable";
import { AntdTab } from "@/lib/antd/components";
import { TabsProps } from "antd";
import { ThongTinCSDLDanCu } from "@/features/user/components/ThongTinCSDLDanCu";

const items : TabsProps["items"] = [
    {
        key: "tra-cuu-thong-tin-doanh-nghiep",
        label: "Tra cứu thông tin doanh nghiệp",
        children: <TraCuuThongTinDoanhNghiepTableWrapper/>
    },
    {
        key: "tra-cuu-ho-kinh-doanh",
        label: "Tra cứu hộ kinh doanh",
        children: <TraCuuHoKinhDoanhTableWrapper/>
    },
    {
        key: "xac-minh-cong-dan",
        label: "Tra cứ thông tin hợp tác xã",
        children: <TraCuuHopTacXaTableWrapper/>
    },
]

const TraCuuThongTinTab = () => {
    return (
        <AntdTab
        defaultActiveKey="1"
        type="card"
        items={items}
      />
    )
}
const TraCuuThongTinTabWrapper = () => (
    <ButtonActionProvider>
        <TraCuuThongTinTab/>
    </ButtonActionProvider>)
export default TraCuuThongTinTabWrapper