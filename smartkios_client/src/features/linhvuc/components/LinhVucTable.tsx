import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchLinhVuc } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchLinhVuc } from "../redux/action"
import { LinhVucSearch } from "./LinhVucSearch"
import { LinhVucProvider } from "../contexts/LinhVucContext"
import { LinhVucDetail } from "./LinhVucDetail"

const LinhVucTable = () => {
    const dispatch = useAppDispatch()
    const { datas: linhVucs, count } = useAppSelector(state => state.linhvuc)
    const [searchParams, setSearchParams] = useState<ISearchLinhVuc>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <LinhVucSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={linhVucs}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchLinhVuc(params))}
                />
            </AntdSpace>
            <LinhVucDetail/>
        </>
            
    )
}
const LinhVucTableWrapper = () => (<LinhVucProvider>
    <LinhVucTable/>
</LinhVucProvider>)
export default LinhVucTableWrapper