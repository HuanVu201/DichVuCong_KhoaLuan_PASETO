import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchQuanLyVanBan } from "../models"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { SearchQuanLyVanBan } from "../redux/action"
import { QuanLyVanBanSearch } from "./QuanLyVanBanSearch"
import { QuanLyVanBanProvider } from "../contexts/QuanLyVanBanContext"
import { QuanLyVanBanDetail } from "./QuanLyVanBanDetail"

const QuanLyVanBanTable = () => {
    const dispatch = useAppDispatch()
    const { datas: QuanLyVanBans, count } = useAppSelector(state => state.quanlyvanban)
    const [searchParams, setSearchParams] = useState<ISearchQuanLyVanBan>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <QuanLyVanBanSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={QuanLyVanBans}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchQuanLyVanBan(params))}
                />
            </AntdSpace>
            <QuanLyVanBanDetail/>
        </>
            
    )
}

export default QuanLyVanBanTable