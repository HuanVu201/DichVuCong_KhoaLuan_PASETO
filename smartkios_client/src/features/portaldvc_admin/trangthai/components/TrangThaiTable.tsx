import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchTrangThai } from "../models"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { SearchTrangThai } from "../redux/action"
import { TrangThaiSearch } from "./TrangThaiSearch"
import { TrangThaiProvider } from "../contexts/TrangThaiContext"
import { TrangThaiDetail } from "./TrangThaiDetail"

const TrangThaiTable = () => {
    const dispatch = useAppDispatch()
    const { datas: trangThais, count } = useAppSelector(state => state.trangthai)
    const [searchParams, setSearchParams] = useState<ISearchTrangThai>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <TrangThaiSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={trangThais}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchTrangThai(params))}
                />
            </AntdSpace>
        
            <TrangThaiDetail/>
        </>
            
    )
}

export default TrangThaiTable