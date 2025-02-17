import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchDanhMucDiaBan } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchDanhMucDiaBan } from "../redux/action"
import { DiaBanSearch } from "./DiaBanSearch"
import { DiaBanProvider, useDiaBanContext } from "../contexts/DiaBanContext"
import { DiaBanDetail } from "./DiaBanDetail"
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"

const DiaBanTable = () => {
    const dispatch = useAppDispatch()
    const { datas: diaBans, count } = useAppSelector(state => state.danhmucdiaban)
    const diaBanContext = useDiaBanContext()
    const [searchParams, setSearchParams] = useState<ISearchDanhMucDiaBan>({ pageNumber: 1, pageSize: 10, reFetch: true })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <DiaBanSearch setSearchParams={setSearchParams} />
                <AntdTable
                    bordered
                    columns={columns}
                    dataSource={diaBans}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDanhMucDiaBan(params))}
                />
            </AntdSpace>
            {diaBanContext.DiaBanModalVisible ? <DiaBanDetail /> : null}
        </>
    )
}
const DonViTableWrapper = () => (<DiaBanProvider>
    <DiaBanTable />
</DiaBanProvider>)
export default DonViTableWrapper