import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchDanhGiaCoQuan } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchDanhGiaCoQuan } from "../redux/action"
import { DanhGiaCoQuanSearch } from "./DanhGiaCoQuanSearch"
import { DanhGiaCoQuanProvider, useDanhGiaCoQuanContext } from "../contexts/DanhGiaCoQuanContext"
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import { DanhGiaCoQuanDetail } from "./DanhGiaCoQuanDetail"
import { ChamThamDinhModal } from "./ChamThamDinhModal"

const DanhGiaCoQuanTable = () => {
    const currentQuarter = Math.floor((new Date().getMonth() + 3) / 3).toString()
    const currentYear = new Date().getFullYear().toString()
    const dispatch = useAppDispatch()
    const { datas: DanhGiaCoQuans, count, loading } = useAppSelector(state => state.danhgiacoquan)
    const { data: user, } = useAppSelector(state => state.user)

    const danhGiaCoQuanContext = useDanhGiaCoQuanContext()
    const [searchParams, setSearchParams] = useState<ISearchDanhGiaCoQuan>({ pageNumber: 1, pageSize: 50, reFetch: true, quy: currentQuarter, nam: currentYear, maDinhDanhCha: user?.maDinhDanh })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <DanhGiaCoQuanSearch setSearchParams={setSearchParams} />
                <AntdTable
                    bordered
                    columns={columns}
                    rowKey={'id'}
                    loading={loading}
                    dataSource={DanhGiaCoQuans}
                    pagination={{
                        total: count,
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDanhGiaCoQuan(params))}
                />
            </AntdSpace>
            {danhGiaCoQuanContext.DanhGiaCoQuanModalVisible ? <DanhGiaCoQuanDetail /> : null}
            {danhGiaCoQuanContext.ChamThamDinhModalVisible ? <ChamThamDinhModal /> : null}

        </>
    )
}
const DanhGiaCoQuanTableWrapper = () => (<DanhGiaCoQuanProvider>
    <DanhGiaCoQuanTable />
</DanhGiaCoQuanProvider>)
export default DanhGiaCoQuanTableWrapper