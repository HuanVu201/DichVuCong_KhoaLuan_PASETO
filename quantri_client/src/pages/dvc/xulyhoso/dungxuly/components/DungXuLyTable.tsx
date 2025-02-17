import { useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ButtonActionProvider, useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions"
import { screenType } from "@/features/hoso/data"
import { ISearchHoSo } from "@/features/hoso/models"
import { AntdSpace, AntdTable } from "@/lib/antd/components"
import { DungXuLySearch } from "./DungXuLySearch"
import { SearchHoSo, SearchNguoiDangXuLy } from "@/features/hoso/redux/action"
import { MenuProps, Spin } from "antd"
import { DungXuLyProvider, useDungXuLyContext } from "../contexts/DungXuLyContext"
import { HoSoTableActions, useHoSoColumn } from "@/features/hoso/hooks/useHoSoColumn"
import { LazyActions } from "@/features/hoso/components/actions/LazyActions"
import { EyeOutlined } from "@ant-design/icons"
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp"
import { useHoSoDungXuLyColumn } from "@/features/hoso/hooks/useHoSoDungXuLyColumn"

const DungXuLyTable = () => {
    const dispatch = useAppDispatch()
    const buttonActionContext = useButtonActionContext()
    const { datas: hoSos, count, loading } = useAppSelector(state => state.hoso)
    const {btnElememts} = useButtonActions({maScreen: screenType["dung-xu-ly"]})
    const [searchParams, setSearchParams] = useState<ISearchHoSo>({ pageNumber: 1, pageSize: 50, reFetch: true, byCurrentUser: true, maTrangThai: "8", hienThiTrangThaiThanhToan : true})
    const items: HoSoTableActions[] = useMemo(
        () => [
          {
            icon: <EyeOutlined title="Xem chi tiết" onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)}/>
          },
        ],
        []
    );
    const { columns } = useHoSoDungXuLyColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize }, items)
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
                    onSearch={(params) => dispatch(SearchNguoiDangXuLy(params))}
                />
            </AntdSpace>
        </LazyActions>
            
    )
}
const HoSoTableWrapper = () => (<DungXuLyProvider>
    <ButtonActionProvider>
        <DungXuLyTable/>
    </ButtonActionProvider>
</DungXuLyProvider>)
export default HoSoTableWrapper