import { AntdTab, IAntdTabsProps } from "@/lib/antd/components";
import { NguoiTiepNhanRightSide } from "./NguoiTiepNhanRightSide";
import { ZoomComponent } from "@/components/common";
// import { AddUser, SetRoles } from "../button";
import { Space } from "antd";
import { AddUser, SetRoles } from "@/features/cocautochuc/components/button";
const TINBAI_TABS: IAntdTabsProps["items"] = [
  {
    label: "Người dùng",
    key: "nguoi-dung",
    children: <NguoiTiepNhanRightSide />,
  },
  // {
  //   label: "Phân quyền",
  //   key: "phan-quyen",
  //   children: <></>,
  // },

];

const TabTitle = () => {
  return (
    <Space size="small">
      {/* <AddUser />
      <SetRoles /> */}
    </Space>
  );
};

export const DanhSachTabNguoiTiepNhan = () => {
  return (
    <ZoomComponent onRefresh={() => {}} title={<TabTitle />}>
      <AntdTab
        size="small"
        style={{ marginBottom: 32 }}
        type="card"
        items={TINBAI_TABS}
      />
    </ZoomComponent>
  );
};
