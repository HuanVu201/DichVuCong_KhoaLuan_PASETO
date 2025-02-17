import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { LogThongKeDanhGiaHaiLongCongDanSearch } from "./LogThongKeDGHLCongDanSearch"
import { LogThongKeDGHLCongDanProvider } from "../contexts/useLogDGHLCongDan"
import { LogThongKeDanhGiaHaiLongCongDanDetail } from "./LogThongKeDGHLCongDanDetail"
import { ISearchLogThongKeDGHLCongDan } from "../models"
import { SearchLogThongKeDGHLCongDan } from "../redux/action"

const LogThongKeDanhGiaHaiLongCongDanTable = () => {
    const dispatch = useAppDispatch()
    const { datas, count } = useAppSelector(state => state.logthongkedghlcongdan)
    const { data:  user } = useAppSelector(state => state.user)
    const [searchParams, setSearchParams] = useState<ISearchLogThongKeDGHLCongDan>({ pageNumber: 1, pageSize: 20 , donVi : user?.officeCode})
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })

    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <LogThongKeDanhGiaHaiLongCongDanSearch setSearchParams={setSearchParams} />
                <AntdTable
                    bordered
                    pagination={{ total: count }}
                    rowKey={'maHoSo'}
                    columns={columns as any}
                    dataSource={datas as any} 
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchLogThongKeDGHLCongDan(params))}
                />
            </AntdSpace>
            <LogThongKeDanhGiaHaiLongCongDanDetail />
        </>

    )
}
const ThongKeDanhGiaHaiLongTableWrapper = () => (<LogThongKeDGHLCongDanProvider>
    <LogThongKeDanhGiaHaiLongCongDanTable />
</LogThongKeDGHLCongDanProvider>)
export default ThongKeDanhGiaHaiLongTableWrapper