import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "@/features/quanlymauphoi/hooks/useColumn"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { MauPhoiProvider } from "../context/MauPhoiContext"
import { ISearchMauPhoi } from "../models"
import { SearchMauPhoi } from "../redux/action"
import { MauPhoiSearch } from "./MauPhoiSearch"
import { MauPhoiDetail } from "./MauPhoiDetail"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { SearchThuTuc } from "@/features/thutuc/redux/action"

const MauPhoiTable = () => {
    const dispatch = useAppDispatch()
    const { datas: mauphois, count } = useAppSelector(state => state.mauphoi)
    const [searchParams, setSearchParams] = useState<ISearchMauPhoi>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })

    useEffect(() => {
        dispatch(SearchCoCauToChuc({ pageNumber: 1, pageSize: 1000 }))
        dispatch(SearchLinhVuc({ pageNumber: 1, pageSize: 1000 }))
        dispatch(SearchThuTuc({ pageNumber: 1, pageSize: 5000 }))
    }, [])
    
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <MauPhoiSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={mauphois}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchMauPhoi(params))}
                />
            </AntdSpace>
            <MauPhoiDetail />

        </>

    )
}
const MauPhoiTableWrapper = () => (<MauPhoiProvider>
    <MauPhoiTable />
</MauPhoiProvider>)
export default MauPhoiTableWrapper