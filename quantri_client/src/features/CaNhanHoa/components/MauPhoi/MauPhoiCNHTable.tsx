import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { SearchDanhMucChung } from "@/features/danhmucdungchung/redux/action"
import { SearchMauPhoi } from "@/features/quanlymauphoi/redux/action"
import { MauPhoiCNHProvider } from "../../contexts/MauPhoiCNHContext"
import { useMauPhoiCNHColumn } from "../../hooks/useMauPhoiCNHColumn"
import { ISearchMauPhoi } from "@/features/quanlymauphoi/models"
import { MauPhoiCNHSearch } from "./MauPhoiCNHSearch"
import { MauPhoiCNHDetail } from "./MauPhoiCNHDetail"

const MauPhoiCNHTable = () => {
    const dispatch = useAppDispatch()
    const { data: user } = useAppSelector(state => state.user)
    const { datas: mauphois, count } = useAppSelector(state => state.mauphoi)
    const [searchParams, setSearchParams] = useState<ISearchMauPhoi>({ pageNumber: 1, pageSize: 10, customerId: user?.id })
    const { columns } = useMauPhoiCNHColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize }, searchParams)
    useEffect(() => {
        dispatch(SearchCoCauToChuc({ pageNumber: 1, pageSize: 3000 }))
        dispatch(SearchLinhVuc({ pageNumber: 1, pageSize: 1000 }))
        dispatch(SearchThuTuc({ pageNumber: 1, pageSize: 5000 }))
        dispatch(SearchDanhMucChung({ type: 'mau-phoi', pageNumber: 1, pageSize: 200 }))
    }, [])

    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                {user?.id
                    ?
                    <>
                        <MauPhoiCNHSearch setSearchParams={setSearchParams} />
                        <AntdTable
                            columns={columns}
                            dataSource={mauphois}
                            pagination={{
                                total: count
                            }}
                            searchParams={searchParams}
                            setSearchParams={setSearchParams}

                            onSearch={(params) => {
                                if (searchParams.customerId)
                                    dispatch(SearchMauPhoi({
                                        ...params,
                                    }))
                            }}
                        />
                        <MauPhoiCNHDetail searchParams={searchParams} setSearchParams={setSearchParams} />
                    </>
                    : null}

            </AntdSpace>

        </>

    )
}
const MauPhoiCNHTableWrapper = () => (<MauPhoiCNHProvider>
    <MauPhoiCNHTable />
</MauPhoiCNHProvider>)
export default MauPhoiCNHTableWrapper