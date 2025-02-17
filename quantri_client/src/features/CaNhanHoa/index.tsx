import { useEffect, useState } from "react"
import { AntdTable, AntdSpace, IAntdTabsProps, AntdTab } from "@/lib/antd/components"
import { useColumn } from "@/features/quanlymauphoi/hooks/useColumn"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { SearchDanhMucChung } from "@/features/danhmucdungchung/redux/action"
import { CaNhanHoaProvider } from "./contexts"
import { CaretDownOutlined } from "@ant-design/icons"
import MauPhoiCNHTableWrapper from "./components/MauPhoi/MauPhoiCNHTable"

const CaNhanHoa = () => {
    const { data: user } = useAppSelector(state => state.user)
    const DVCTab: IAntdTabsProps["items"] = [

        {
          label: "Mẫu phôi",
          key: "mau-phoi",
          children: <MauPhoiCNHTableWrapper/>,
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
const CaNhanHoaWrapper = () => (<CaNhanHoaProvider>
    <CaNhanHoa />
</CaNhanHoaProvider>)
export default CaNhanHoaWrapper