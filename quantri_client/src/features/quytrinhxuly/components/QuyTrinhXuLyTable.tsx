import { useCallback, useMemo, useState } from "react"
import { AntdTable, AntdSpace, IAntdTableProps } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchQuyTrinhXuLy, IQuyTrinhXuLy } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchQuyTrinhXuLy } from "../redux/action"
import { QuyTrinhXuLySearch } from "./QuyTrinhXuLySearch"
import { QuyTrinhXuLyProvider } from "../contexts/QuyTrinhXuLyContext"
import { QuyTrinhXuLyDetail } from "./QuyTrinhXuLyDetail"
import { Table } from "antd"

const QuyTrinhXuLyTable = () => {
    const dispatch = useAppDispatch()
    const { datas: quyTrinhXuLys, count, loading } = useAppSelector(state => state.quytrinhxuly)
    const [searchParams, setSearchParams] = useState<ISearchQuyTrinhXuLy>({ pageNumber: 1, pageSize: 10 })
    const { columns, expandedColumns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    const [expandedRowKeys, setExpandedRowKeys] = useState<readonly React.Key[]>()

    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <QuyTrinhXuLySearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    loading={loading}
                    dataSource={quyTrinhXuLys}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchQuyTrinhXuLy(params))}
                />
            </AntdSpace>
            <QuyTrinhXuLyDetail/>
        </>
            
    )
}
const QuyTrinhXuLyTableWrapper = () => (<QuyTrinhXuLyProvider>
    <QuyTrinhXuLyTable/>
</QuyTrinhXuLyProvider>)
export default QuyTrinhXuLyTableWrapper