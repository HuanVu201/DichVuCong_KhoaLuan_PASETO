import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchBuocXuLy } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchBuocXuLy } from "../redux/action"
import { BuocXuLySearch } from "./BuocXuLySearch"
import { BuocXuLyProvider } from "../contexts/BuocXuLyContext"
import { BuocXuLyDetail } from "./BuocXuLyDetail"

const BuocXuLiTable = () => {
    const dispatch = useAppDispatch()
    const { datas: buocXuLys, count } = useAppSelector(state => state.buocxuly)
    const [searchParams, setSearchParams] = useState<ISearchBuocXuLy>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <BuocXuLySearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={buocXuLys}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchBuocXuLy(params))}
                />
            </AntdSpace>
            <BuocXuLyDetail/>
        </>
            
    )
}
const BuocXuLiWrapper = () => (<BuocXuLyProvider>
    <BuocXuLiTable/>
</BuocXuLyProvider>)
export default BuocXuLiWrapper