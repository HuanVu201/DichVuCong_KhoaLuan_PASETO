import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchNgayNghi } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchNgayNghi } from "../redux/action"
import { NgayNghiSearch } from "./NgayNghiSearch"
import { NgayNghiProvider } from "../context/NgayNghiContext"
import { NgayNghiDetail } from "./NgayNghiDetail"
import { useSearchParams } from "react-router-dom"

const NgayNghiTable = () => {
    const dispatch = useAppDispatch()
    const { datas: ngayNghis, count } = useAppSelector(state => state.ngayNghi)
    const [searchParams, setSearchParams] = useState<ISearchNgayNghi>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <NgayNghiSearch setSearchParams={setSearchParams} />
                <AntdTable
                    bordered
                    columns={columns}
                    dataSource={ngayNghis}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchNgayNghi(params))}
                />
            </AntdSpace>
            <NgayNghiDetail />
        </>

    )
}
const DichVuTableWrapper = () => (<NgayNghiProvider>
    <NgayNghiTable />
</NgayNghiProvider>)
export default DichVuTableWrapper