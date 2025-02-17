import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { SoChungThucProvider, useSoChungThucContext } from "@/features/sochungthuc/contexts/SoChungThucContext"
import { ISearchSoChungThuc } from "@/features/sochungthuc/models"
import { SoChungThucDonViSearch } from "./SoChungThucDonViSearch"
import { SearchSoChungThuc } from "@/features/sochungthuc/redux/action"
import { SoChungThucDonViDetail } from "./SoChungThucDonViDetail"

const SoChungThucDonViTable = () => {
    const dispatch = useAppDispatch()
    const { datas: SoChungThucs, count, loading } = useAppSelector(state => state.sochungthuc)
    const { data: user } = useAppSelector(state => state.user)
    
    const SoChungThucContext = useSoChungThucContext()
    const [searchParams, setSearchParams] = useState<ISearchSoChungThuc>({ pageNumber: 1, pageSize: 10, reFetch: true, donVi: user?.officeCode })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    useEffect(() => {
        dispatch(SearchCoCauToChuc({ pageSize: 2000 }))
    }, [])
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <SoChungThucDonViSearch setSearchParams={setSearchParams} />
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
            {SoChungThucContext.SoChungThucModalVisible ? <SoChungThucDonViDetail /> : null}
        </>
    )
}
const SoChungThucTableWrapper = () => (<SoChungThucProvider>
    <SoChungThucDonViTable />
</SoChungThucProvider>)
export default SoChungThucTableWrapper