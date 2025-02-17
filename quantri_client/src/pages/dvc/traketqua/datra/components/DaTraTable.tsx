import { useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ButtonActionProvider, useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions"
import { ScreenType, screenType } from "@/features/hoso/data"
import { ISearchHoSo } from "@/features/hoso/models"
import { AntdButton, AntdSpace, AntdTable } from "@/lib/antd/components"
import { DaTraSearch } from "./DaTraSearch"
import { SearchHoSo } from "@/features/hoso/redux/action"
import { MenuProps, Spin } from "antd"
import { DaTraProvider, useDaTraContext } from "../contexts/DaTraContext"
import { HoSoTableActions, useHoSoColumn } from "@/features/hoso/hooks/useHoSoColumn"
import { LazyActions } from "@/features/hoso/components/actions/LazyActions"
import { EyeOutlined } from "@ant-design/icons"
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp"
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/ExportExcel/exportTableToExcel"

export const DaTraTable = ({maScreen, extraSearchParams}: {maScreen: ScreenType, extraSearchParams?: ISearchHoSo;}) => {
    const dispatch = useAppDispatch()
    const buttonActionContext = useButtonActionContext()
    const { data: user} = useAppSelector(state => state.user)
    const { datas: hoSos, count, loading } = useAppSelector(state => state.hoso)
    const {btnElememts} = useButtonActions({maScreen})
    const [searchParams, setSearchParams] = useState<ISearchHoSo>({ pageNumber: 1, pageSize: 10, reFetch: true, maTrangThai: "10", groupCode: user?.officeCode, ...extraSearchParams})
    const items: HoSoTableActions[] = useMemo(
        () => [
          {
            icon: <EyeOutlined title="Xem chi tiết" onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)}/>
          },
        ],
        []
    );
    const { columns } = useHoSoColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize }, items, maScreen)
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
                <SearchHoSoComp btnComfirmLoading={loading} setSearchParams={setSearchParams} defaultVisible={false} showAdvanceSearchBtn 
                extraButtons={maScreen === "da-tra-ho-so-phi-dia-gioi" ? <AntdButton
                    type="primary"
                    onClick={() => {
                    downloadPhieuExcel("Danh sách hồ sơ", "danhSachHoSoTable");
                    }}
                >
                    In danh sách
                </AntdButton> : undefined}/>
                {user?.officeCode ? <AntdTable
                    loading={loading}
                    columns={columns}
                    dataSource={hoSos}
                    pagination={{
                        total: count
                    }}
                    rowSelection={rowSelection}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchHoSo(params))}
                />: null}
            </AntdSpace>
        </LazyActions>
            
    )
}
const HoSoTableWrapper = () => (<DaTraProvider>
    <ButtonActionProvider>
        <DaTraTable maScreen={"da-tra-ho-so"}/>
    </ButtonActionProvider>
</DaTraProvider>)
export default HoSoTableWrapper