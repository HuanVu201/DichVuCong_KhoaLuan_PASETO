import { Suspense, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ButtonActionProvider, useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions"
import { screenType } from "@/features/hoso/data"
import { ISearchHoSo } from "@/features/hoso/models"
import { AntdSpace, AntdTable } from "@/lib/antd/components"
import { DaHoanThanhBoSungSearch } from "./DaHoanThanhBoSungSearch"
import { SearchHoSo, SearchNguoiDaXuLy } from "@/features/hoso/redux/action"
import { MenuProps, Spin } from "antd"
import { DaHoanThanhBoSungProvider, useDaHoanThanhBoSungContext } from "../contexts/DaHoanThanhBoSungContext"
import { HoSoTableActions, useHoSoColumn } from "@/features/hoso/hooks/useHoSoColumn"
import { LazyActions } from "@/features/hoso/components/actions/LazyActions"
import { EyeOutlined } from "@ant-design/icons"
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp"
import { useBoSungHoSoColumn } from "../../hooks/useBoSungHoSoColumn"

const DaHoanThanhBoSungTable = () => {
    const dispatch = useAppDispatch()
    const buttonActionContext = useButtonActionContext()
    const { data: user} = useAppSelector(state => state.user)
    const { datas: hoSos, count, loading } = useAppSelector(state => state.hoso)
    const {btnElememts} = useButtonActions({maScreen: screenType["da-hoan-thanh-bo-sung"]})
    const [searchParams, setSearchParams] = useState<ISearchHoSo>({ pageNumber: 1, pageSize: 50, reFetch: true, trangThaiBoSung:"Hoàn thành bổ sung",})
    const items: HoSoTableActions[] = useMemo(
        () => [
          {
            icon: <EyeOutlined title="Xem chi tiết" onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)}/>
          },
        ],
        []
      );
    const { columns } = useBoSungHoSoColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize }, items)
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
                <SearchHoSoComp btnComfirmLoading={loading} setSearchParams={setSearchParams} defaultVisible={false} showAdvanceSearchBtn/>
                 <AntdTable
                    loading={loading}
                    columns={columns}
                    dataSource={hoSos}
                    pagination={{
                        total: count
                    }}
                    rowSelection={rowSelection}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchNguoiDaXuLy(params))}
                />
            </AntdSpace>
        </LazyActions>
            
    )
}
const HoSoTableWrapper = () => (<DaHoanThanhBoSungProvider>
    <ButtonActionProvider>
        <DaHoanThanhBoSungTable/>
    </ButtonActionProvider>
</DaHoanThanhBoSungProvider>)
export default HoSoTableWrapper