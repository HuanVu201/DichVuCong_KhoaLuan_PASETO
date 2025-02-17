import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import { DanhGiaCoQuanProvider, useDanhGiaCoQuanContext } from "@/features/danhgiacoquan/contexts/DanhGiaCoQuanContext"
import { ISearchDanhGiaCoQuan } from "@/features/danhgiacoquan/models"
import { DanhGiaCoQuanSearch } from "@/features/danhgiacoquan/components/DanhGiaCoQuanSearch"
import { SearchDanhGiaCoQuan } from "@/features/danhgiacoquan/redux/action"
import { BaoCao3Detail } from "./BaoCao3Detail"
import { BaoCao3Search } from "./BaoCao3Search"

const BaoCao3Table = () => {
    const dispatch = useAppDispatch()
    const { datas: DanhGiaCoQuans, count, loading } = useAppSelector(state => state.danhgiacoquan)
    const danhGiaCoQuanContext = useDanhGiaCoQuanContext()
    const [searchParams, setSearchParams] = useState<ISearchDanhGiaCoQuan>({ pageNumber: 1, pageSize: 50, reFetch: true })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <BaoCao3Search setSearchParams={setSearchParams} />
                <AntdTable
                    bordered
                    columns={columns}
                    loading={loading}
                    dataSource={DanhGiaCoQuans}
                    pagination={{
                        total: count,
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDanhGiaCoQuan(params))}
                    scroll={{ x: 1500 }}
                />
            </AntdSpace>
            {danhGiaCoQuanContext.DanhGiaCoQuanModalVisible ? <BaoCao3Detail /> : null}

        </>
    )
}
const DanhGiaCoQuanTableWrapper = () => (<DanhGiaCoQuanProvider>
    <BaoCao3Table />
</DanhGiaCoQuanProvider>)
export default DanhGiaCoQuanTableWrapper