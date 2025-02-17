import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { IPhiLePhi, ISearchPhiLePhi } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchPhiLePhi } from "../redux/action"
import { PhiLePhiSearch } from "./phiLePhiSearch"
import { PhiLePhiProvider, usePhiLePhiContext } from "../contexts/PhiLePhiContext"
import { PhiLePhiDetail } from "./phiLePhiDetail"
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"

const PhiLePhiTable = () => {
    const dispatch = useAppDispatch()
    const phiLePhiContext = usePhiLePhiContext()
    const thuTucContext = useThuTucContext()    
    const { datas: philephis, count } = useAppSelector(state => state.phiLePhi)
    const [searchParams, setSearchParams] = useState<ISearchPhiLePhi>({ pageNumber: 1, pageSize: 10, thuTucId: thuTucContext.thuTucId })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize},setSearchParams)
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <PhiLePhiSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={philephis}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchPhiLePhi(params))}
                />
            </AntdSpace>
            {phiLePhiContext.phiLePhiModalVisible ? <PhiLePhiDetail setSearchParams = {setSearchParams}/> : null}
        </>

    )
}
const LoaiPhiLePhiWrapper = () => (<PhiLePhiProvider>
    <PhiLePhiTable />
</PhiLePhiProvider>)
export default LoaiPhiLePhiWrapper