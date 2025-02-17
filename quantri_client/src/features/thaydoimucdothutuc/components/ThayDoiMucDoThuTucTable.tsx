import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { IThayDoiMucDoThuTuc, ISearchThayDoiMucDoThuTuc } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchThayDoiMucDoThuTuc } from "../redux/action"
import { ThayDoiMucDoThuTucSearch } from "./ThayDoiMucDoThuTucSearch"
import { ThayDoiMucDoThuTucProvider, useThayDoiMucDoThuTucContext } from "../contexts/ThayDoiMucDoThuTucContext"

const ThayDoiMucDoThuTucTable = () => {
    const dispatch = useAppDispatch()
    const ThayDoiMucDoThuTucContext = useThayDoiMucDoThuTucContext()
    const { datas: ThayDoiMucDoThuTucs, count } = useAppSelector(state => state.thaydoimucdothutuc)
    const [searchParams, setSearchParams] = useState<ISearchThayDoiMucDoThuTuc>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <ThayDoiMucDoThuTucSearch setSearchParams={setSearchParams} />
                <AntdTable
                    bordered
                    columns={columns}
                    dataSource={ThayDoiMucDoThuTucs}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchThayDoiMucDoThuTuc(params))}
                />
            </AntdSpace>
        </>

    )
}
const LoaiThayDoiMucDoThuTucWrapper = () => (<ThayDoiMucDoThuTucProvider>
    <ThayDoiMucDoThuTucTable />
</ThayDoiMucDoThuTucProvider>)
export default LoaiThayDoiMucDoThuTucWrapper