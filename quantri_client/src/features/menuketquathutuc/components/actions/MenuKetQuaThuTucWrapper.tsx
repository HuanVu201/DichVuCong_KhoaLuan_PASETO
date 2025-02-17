import { AntdTab, IAntdTabsProps } from "@/lib/antd/components";
import { MenuKetQuaThuTucProvider } from "../../contexts/MenuKetQuaThuTucContext";
import {MenuKetQuaThuTucActionTable} from "./MenuKetQuaThuTucActionTable";



const TABS: IAntdTabsProps["items"] = [
    {
      label: "Danh sách giấy tờ số hóa",
      key: "1",
      children: <MenuKetQuaThuTucActionTable extraSearchParams={{}}/>,
    },
    {
      label: "Thống kê chủ hồ sơ",
      key: "2",
      children: <MenuKetQuaThuTucActionTable extraSearchParams={{groupByUser: true}} hideXuatDanhSach={true} hideThemMoi={true}/>,
    },
    {
      label: "Thống kê kết quả",
      key: "3",
      children: <MenuKetQuaThuTucActionTable extraSearchParams={{}} hideDanhSach={true}  hideXuatDanhSach={true} hideThemMoi={true}/>,
    },
];

const MenuKetQuaThuTucWrapper = () => {
  return (
    <MenuKetQuaThuTucProvider>
        <AntdTab
            size="small"
            style={{ marginBottom: 32 }}
            type="card"
            items={TABS}
        />
    </MenuKetQuaThuTucProvider>
      
  );
}

export default MenuKetQuaThuTucWrapper;