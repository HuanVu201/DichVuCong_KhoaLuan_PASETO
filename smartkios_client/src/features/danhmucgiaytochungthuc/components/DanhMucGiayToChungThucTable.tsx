import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchDanhMucGiayToChungThuc } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchDanhMucGiayToChungThuc } from "../redux/action"
import { DanhMucGiayToChungThucSearch } from "./DanhMucGiayToChungThucSearch"
import { DanhMucGiayToChungThucProvider, useDanhMucGiayToChungThucContext } from "../contexts/DanhMucGiayToChungThucContext"
import { DanhMucGiayToChungThucDetail } from "./DanhMucGiayToChungThucDetail"
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"

const DanhMucGiayToChungThucTable = () => {
    const dispatch = useAppDispatch()
    const { datas: DanhMucGiayToChungThucs, count, loading } = useAppSelector(state => state.danhmucgiaytochungthuc)
    const DanhMucGiayToChungThucContext = useDanhMucGiayToChungThucContext()
    const [searchParams, setSearchParams] = useState<ISearchDanhMucGiayToChungThuc>({ pageNumber: 1, pageSize: 20, reFetch: true })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    useEffect(() => {
        dispatch(SearchCoCauToChuc({ pageSize: 2000 }))
    }, [])
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <DanhMucGiayToChungThucSearch setSearchParams={setSearchParams} />
                <AntdTable
                    bordered
                    columns={columns}
                    loading={loading}
                    dataSource={DanhMucGiayToChungThucs}
                    pagination={{
                        total: count,
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDanhMucGiayToChungThuc(params))}
                />
            </AntdSpace>
            {DanhMucGiayToChungThucContext.danhMucGiayToChungThucModalVisible ? <DanhMucGiayToChungThucDetail /> : null}
        </>
    )
}
const DanhMucGiayToChungThucTableWrapper = () => (<DanhMucGiayToChungThucProvider>
    <DanhMucGiayToChungThucTable />
</DanhMucGiayToChungThucProvider>)
export default DanhMucGiayToChungThucTableWrapper