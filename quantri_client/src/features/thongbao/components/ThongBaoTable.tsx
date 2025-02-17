import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchThongBao } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchThongBao } from "../redux/action"
import { ThongBaoSearch } from "./ThongBaoSearch"
import { ThongBaoProvider } from "../contexts/ThongBaoContext"
import { ThongBaoDetail } from "./ThongBaoDetail"

const ThongBaoTable = () => {
    const dispatch = useAppDispatch()
    const { datas: thongBaos, count } = useAppSelector(state => state.thongbao)
    const [searchParams, setSearchParams] = useState<ISearchThongBao>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <ThongBaoSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={thongBaos}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchThongBao(params))}
                />
            </AntdSpace>
            <ThongBaoDetail/>
        </>
            
    )
}
const ThongBaoTableWrapper = () => (<ThongBaoProvider>
    <ThongBaoTable/>
</ThongBaoProvider>)
export default ThongBaoTableWrapper