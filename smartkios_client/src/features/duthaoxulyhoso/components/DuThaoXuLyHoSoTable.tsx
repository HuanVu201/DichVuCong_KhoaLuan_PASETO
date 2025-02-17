import { useEffect, useMemo, useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { IDuThaoXuLyHoSo, ISearchDuThaoXuLyHoSo } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchDuThaoXuLyHoSo } from "../redux/action"
import { DuThaoXuLyHoSoSearch } from "./DuThaoXuLyHoSoSearch"
import { DuThaoXuLyHoSoProvider, useDuThaoXuLyHoSoContext } from "../contexts/DuThaoXuLyHoSoContext"
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import { HoSoTableActions } from "@/features/hoso/hooks/useHoSoColumn"
import { EyeOutlined } from "@ant-design/icons"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { ScreenType } from "@/features/hoso/data"
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions"
import { TableRowSelection } from "antd/es/table/interface"
import { LazyActions } from "@/features/hoso/components/actions/LazyActions"

export const DuThaoXuLyHoSoTable = ({maScreen, extraSearchParams}: {maScreen: ScreenType; extraSearchParams: ISearchDuThaoXuLyHoSo}) => {
    const dispatch = useAppDispatch()
    const { duThaoXuLyHoSos, count, loading } = useAppSelector(state => state.duthaoxulyhoso)
    const buttonActionContext = useButtonActionContext();
    const {btnElememts} = useButtonActions({maScreen})
    const [searchParams, setSearchParams] = useState<ISearchDuThaoXuLyHoSo>({
        reFetch: true,
        ...extraSearchParams
    })
    const items: HoSoTableActions[] = useMemo(
        () => [
          {
            icon: <EyeOutlined title="Xem chi tiết" onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)}/>
          },
        ],
        []
      );
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize }, items)
    const rowSelection: TableRowSelection<IDuThaoXuLyHoSo> = {
        onChange: (selectedRowKeys: React.Key[]) => {
          buttonActionContext.setSelectedHoSos(selectedRowKeys);
        },
        selectedRowKeys: buttonActionContext.selectedHoSos,
      };
    return (
        <LazyActions setSearchParams={setSearchParams}>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                {btnElememts}
                <DuThaoXuLyHoSoSearch 
                    setSearchParams={setSearchParams} 
                    resetSearchParams={() =>
                        setSearchParams({
                          reFetch: true,
                          ...extraSearchParams
                        })
                    }/>
                <AntdTable
                    bordered
                    columns={columns as any}
                    loading={loading}
                    dataSource={duThaoXuLyHoSos as any}
                    rowSelection={rowSelection}
                    pagination={{
                        total: count,
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDuThaoXuLyHoSo(params))}
                />
            </AntdSpace>
        </LazyActions>
    )
}