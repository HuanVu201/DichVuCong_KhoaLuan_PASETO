import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { IPhanAnhKienNghi, ISearchPhanAnhKienNghi } from "../../../portaldvc/PhanAnhKienNghi/models"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { SearchPhanAnhKienNghi } from '../../../portaldvc/PhanAnhKienNghi/redux/action'
import { PhanAnhKienNghiProvider } from "../contexts/PhanAnhKienNghiContext"
import { PhanAnhKienNghiDetail } from "./PaknDetail"
import { PhanAnhKienNghiSearch } from "./PaknSearch"


const PhanAnhKienNghiDaTraLoiTable = () => {
    const dispatch = useAppDispatch()
    const { datas: PhanAnhKienNghis, count } = useAppSelector(state => state.phanAnhKienNghi)
    const [searchParams, setSearchParams] = useState<ISearchPhanAnhKienNghi>({ pageNumber: 1, pageSize: 10, trangThai: '1' })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <PhanAnhKienNghiSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={PhanAnhKienNghis}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchPhanAnhKienNghi(params))}
                />
            </AntdSpace>
            <PhanAnhKienNghiDetail params={searchParams}/>
        </>
            
    )
}

export default PhanAnhKienNghiDaTraLoiTable