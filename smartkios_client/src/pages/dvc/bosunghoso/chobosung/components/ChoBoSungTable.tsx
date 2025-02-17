import { Suspense, lazy, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ButtonActionProvider, useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions"
import { screenType } from "@/features/hoso/data"
import { ISearchHoSo } from "@/features/hoso/models"
import { AntdSpace, AntdTable } from "@/lib/antd/components"
import { ChoBoSungSearch } from "./ChoBoSungSearch"
import { SearchHoSo } from "@/features/hoso/redux/action"
import { MenuProps, Spin } from "antd"
import { ChoBoSungProvider, useChoBoSungContext } from "../contexts/ChoBoSungContext"
import { HoSoTableActions, useHoSoColumn } from "@/features/hoso/hooks/useHoSoColumn"
import { LazyActions } from "@/features/hoso/components/actions/LazyActions"
import { EyeOutlined } from "@ant-design/icons"
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp"

const ChoBoSungTable = () => {
    const dispatch = useAppDispatch()
    const buttonActionContext = useButtonActionContext()
    const { data: user} = useAppSelector(state => state.user)
    const { datas: hoSos, count } = useAppSelector(state => state.hoso)
    const {btnElememts} = useButtonActions({maScreen: screenType["cho-bo-sung-ho-so"]})
    const [searchParams, setSearchParams] = useState<ISearchHoSo>({ pageNumber: 1, pageSize: 10, reFetch: true, maTrangThai: "5", groupCode: user?.officeCode, trangThaiBoSung: "Yêu cầu công dân bổ sung"})
    const items: HoSoTableActions[] = useMemo(
        () => [
          {
            icon: <EyeOutlined title="Xem chi tiết" onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)}/>
          },
        ],
        []
      );
    const { columns } = useHoSoColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize }, items)
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[]) => {
            buttonActionContext.setSelectedHoSos(selectedRowKeys)
        },
        selectedRowKeys: buttonActionContext.selectedHoSos
    }
    return (
        <LazyActions setSearchParams={setSearchParams}>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                {btnElememts}
                <SearchHoSoComp setSearchParams={setSearchParams}/>
                <AntdTable
                    columns={columns}
                    dataSource={hoSos}
                    pagination={{
                        total: count
                    }}
                    rowSelection={rowSelection}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchHoSo(params))}
                />
            </AntdSpace>
        </LazyActions>
            
    )
}
const HoSoTableWrapper = () => (<ChoBoSungProvider>
    <ButtonActionProvider>
        <ChoBoSungTable/>
    </ButtonActionProvider>
</ChoBoSungProvider>)
export default HoSoTableWrapper