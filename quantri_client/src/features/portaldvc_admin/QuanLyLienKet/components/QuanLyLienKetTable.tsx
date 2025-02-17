import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchQuanLyLienKet } from "../models"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { SearchQuanLyLienKet } from "../redux/action"
import { QuanLyLienKetSearch } from "./QuanLyLienKetSearch"
import { QuanLyLienKetProvider } from "../contexts/QuanLyLienKetContext"
import { QuanLyLienKetDetail } from "./QuanLyLienKetDetail"

const QuanLyLienKetTable = () => {
    const dispatch = useAppDispatch()
    const { datas: QuanLyLienKets, count } = useAppSelector(state => state.quanlylienket)
    const [searchParams, setSearchParams] = useState<ISearchQuanLyLienKet>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <QuanLyLienKetSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={QuanLyLienKets}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchQuanLyLienKet(params))}
                />
            </AntdSpace>
            <QuanLyLienKetDetail/>
        </>
            
    )
}

export default QuanLyLienKetTable