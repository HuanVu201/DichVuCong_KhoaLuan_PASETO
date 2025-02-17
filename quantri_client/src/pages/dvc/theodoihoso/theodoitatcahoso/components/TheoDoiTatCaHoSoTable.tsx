import { Suspense, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ButtonActionProvider, useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions"
import { screenType } from "@/features/hoso/data"
import { ISearchHoSo } from "@/features/hoso/models"
import { AntdSelect, AntdSpace, AntdTable } from "@/lib/antd/components"
import { TheoDoiTatCaHoSoSearch } from "./TheoDoiTatCaHoSoSearch"
import { SearchHoSo } from "@/features/hoso/redux/action"
import { Col, Form, MenuProps, Spin } from "antd"
import { TheoDoiTatCaHoSoProvider, useTheoDoiTatCaHoSoContext } from "../contexts/TheoDoiTatCaHoSoContext"
import { HoSoTableActions, useHoSoColumn } from "@/features/hoso/hooks/useHoSoColumn"
import { LazyActions } from "@/features/hoso/components/actions/LazyActions"
import { EyeOutlined } from "@ant-design/icons"
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp";
import { filterOptions } from "@/utils"

const TheoDoiTatCaHoSoTable = () => {
    const dispatch = useAppDispatch()
    const buttonActionContext = useButtonActionContext()
    const { data: user } = useAppSelector(state => state.user)
    const { datas: hoSos, count, loading } = useAppSelector(state => state.hoso)
    const { btnElememts } = useButtonActions({ maScreen: screenType["theo-doi-tat-ca-ho-so"] })
    const [searchParams, setSearchParams] = useState<ISearchHoSo>({ pageNumber: 1, pageSize: 50, reFetch: true, groupCode: user?.officeCode })
    const items: HoSoTableActions[] = useMemo(
        () => [
            {
                icon: <EyeOutlined title="Xem chi tiết" onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)} />
            },
        ],
        []
    );
    const { columns } = useHoSoColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize }, items, 'theo-doi-tat-ca-ho-so')
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[]) => {
            buttonActionContext.setSelectedHoSos(selectedRowKeys)
        },
        selectedRowKeys: buttonActionContext.selectedHoSos
    }
    return (
        <LazyActions setSearchParams={setSearchParams}>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                {btnElememts}
                <SearchHoSoComp btnComfirmLoading={loading} setSearchParams={setSearchParams} defaultVisible={false} showAdvanceSearchBtn />
                {searchParams.groupCode ? <AntdTable
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
                /> : null}
            </AntdSpace>
        </LazyActions>

    )
}
const HoSoTableWrapper = () => (<TheoDoiTatCaHoSoProvider>
    <ButtonActionProvider>
        <TheoDoiTatCaHoSoTable />
    </ButtonActionProvider>
</TheoDoiTatCaHoSoProvider>)
export default HoSoTableWrapper