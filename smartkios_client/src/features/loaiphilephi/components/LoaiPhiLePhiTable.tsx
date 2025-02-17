import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchLoaiPhiLePhi } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchLoaiPhiLePhi } from "../redux/action"
import { LoaiPhiLePhiSearch } from "./LoaiPhiLePhiSearch"
import { LoaiPhiLePhiProvider } from "../contexts/LoaiPhiLePhiContext"
import { LoaiPhiLePhiDetail } from "./LoaiPhiLePhiDetail"

const LoaiPhiLePhiTable = () => {
    const dispatch = useAppDispatch()
    const { datas: loaiPhiLePhis, count } = useAppSelector(state => state.loaiphilephi)
    const [searchParams, setSearchParams] = useState<ISearchLoaiPhiLePhi>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <LoaiPhiLePhiSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={loaiPhiLePhis}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchLoaiPhiLePhi(params))}
                />
            </AntdSpace>
            <LoaiPhiLePhiDetail/>
        </>
            
    )
}
const LoaiPhiLePhiWrapper = () => (<LoaiPhiLePhiProvider>
    <LoaiPhiLePhiTable/>
</LoaiPhiLePhiProvider>)
export default LoaiPhiLePhiWrapper