import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext"
import { CSDLDanCuProvider } from "../contexts/CSDLDanCuContext"
import { AntdTab } from "@/lib/antd/components";
import { TabsProps } from "antd";
import { ThongTinCSDLDanCu } from "@/features/user/components/ThongTinCSDLDanCu";

const items : TabsProps["items"] = [
    {
        key: "thong-tin-cong-dan",
        label: "Thông tin công dân",
        children: <ThongTinCSDLDanCu/>
    },
    {
        key: "xac-nhan-ho-khau",
        label: "Xác nhận hộ khẩu",
        children: <ThongTinCSDLDanCu/>
    },
    {
        key: "xac-minh-cong-dan",
        label: "Xác nhận công dân",
        children: <ThongTinCSDLDanCu/>
    },
]

const CSDLDanCuTable = () => {
    return (
        <AntdTab
        defaultActiveKey="1"
        type="card"
        items={items}
      />
    )
}
const HoSoTableWrapper = () => (<CSDLDanCuProvider>
    <ButtonActionProvider>
        <CSDLDanCuTable/>
    </ButtonActionProvider>
</CSDLDanCuProvider>)
export default HoSoTableWrapper