import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchDonVi } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { GetDonVi, SearchDonVi } from "../redux/action"
import { DonViSearch } from "./DonViSearch"
import { DonViProvider, useDonViContext } from "../contexts/DonViContext"
import { DonViDetail } from "./DonViDetail"
import { ThuTucProvider, useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"

const DonViTable = () => {
    const dispatch = useAppDispatch()
    const { datas: donVis, data: donVi, count } = useAppSelector(state => state.donvi)

    const donViContext = useDonViContext()
    const [searchParams, setSearchParams] = useState<ISearchDonVi>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <DonViSearch setSearchParams={setSearchParams} />
                <AntdTable
                    bordered
                    columns={columns}
                    dataSource={donVis}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDonVi(params))}
                />
            </AntdSpace>
            {donViContext.donViModalVisible ? <DonViDetail /> : null}
        </>
    )
}
const DonViTableWrapper = () => (
    <DonViProvider>
        <DonViTable />
    </DonViProvider>)
export default DonViTableWrapper