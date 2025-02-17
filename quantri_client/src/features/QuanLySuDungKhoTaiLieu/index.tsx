import { useEffect, useState } from "react"
import { AntdTable, AntdSpace, IAntdTabsProps, AntdTab } from "@/lib/antd/components"
import { useColumn } from "@/features/quanlymauphoi/hooks/useColumn"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { SearchDanhMucChung } from "@/features/danhmucdungchung/redux/action"
import { CaretDownOutlined } from "@ant-design/icons"
import ThongKeSuDungKhoTaiLieuSwapper from "./components/ThongKeSuDung/ThongKeSuDungSwapper"
import ThongKeDungLuongSuDungSwapper from "./components/ThongKeDungLuong/ThongKeDungLuongSwapper"
import DanhSachNguoiSuDungTable from "./components/DanhSachSuDung/DanhSachNguoiSuDungTable"

const ThongKeKhoTaiLieuCongDanSwapper = () => {
    const { data: user } = useAppSelector(state => state.user)
    const DVCTab: IAntdTabsProps["items"] = [

        {
          label: "Thống kê tỷ lệ sử dụng/tái sử dụng",
          key: "1",
          children: <ThongKeSuDungKhoTaiLieuSwapper/>,
        }, 
        {
          label: "Thống kê dung lượng sử dụng",
          key: "2",
          children: <ThongKeDungLuongSuDungSwapper/>,
        }, 
        {
          label: "Danh sách người dùng sử dụng",
          key: "3",
          children: <DanhSachNguoiSuDungTable/>,
        }, 
      ];
      
      
      return (
          <AntdTab
            size="small"
            style={{ margin: '10px auto' }}
            type="card"
            items={DVCTab}
            moreIcon={<CaretDownOutlined />}
          />
      );
}
export default ThongKeKhoTaiLieuCongDanSwapper