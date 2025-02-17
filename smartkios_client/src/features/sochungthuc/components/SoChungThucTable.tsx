import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchSoChungThuc } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchSoChungThuc } from "../redux/action"
import { SoChungThucSearch } from "./SoChungThucSearch"
import { SoChungThucProvider, useSoChungThucContext } from "../contexts/SoChungThucContext"
import { SoChungThucDetail } from "./SoChungThucDetail"
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"

const SoChungThucTable = () => {
    const dispatch = useAppDispatch()
    const { datas: SoChungThucs, count, loading } = useAppSelector(state => state.sochungthuc)
    const { data: user } = useAppSelector(state => state.user)
    
    const SoChungThucContext = useSoChungThucContext()
    const [searchParams, setSearchParams] = useState<ISearchSoChungThuc>({ pageNumber: 1, pageSize: 10, reFetch: true })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    useEffect(() => {
        dispatch(SearchCoCauToChuc({ pageSize: 2000 }))
    }, [])
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <SoChungThucSearch setSearchParams={setSearchParams} />
                <AntdTable
                    bordered
                    columns={columns}
                    loading={loading}
                    dataSource={SoChungThucs}
                    pagination={{
                        total: count,
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchSoChungThuc(params))}
                />
            </AntdSpace>
            {SoChungThucContext.SoChungThucModalVisible ? <SoChungThucDetail setSearchParams={setSearchParams}/> : null}
        </>
    )
}
const SoChungThucTableWrapper = () => (<SoChungThucProvider>
    <SoChungThucTable />
</SoChungThucProvider>)
export default SoChungThucTableWrapper