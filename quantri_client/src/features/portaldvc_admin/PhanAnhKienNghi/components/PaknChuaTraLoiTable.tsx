import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { IPhanAnhKienNghi, ISearchPhanAnhKienNghi } from "../../../portaldvc/PhanAnhKienNghi/models"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { DeletePhanAnhKienNghi, SearchPhanAnhKienNghi } from '../../../portaldvc/PhanAnhKienNghi/redux/action'
import { PhanAnhKienNghiProvider, usePhanAnhKienNghiContext } from "../contexts/PhanAnhKienNghiContext"
import { PhanAnhKienNghiDetail } from "./PaknDetail"
import { PhanAnhKienNghiSearch } from "./PaknSearch"
import { toast } from "react-toastify"


const PhanAnhKienNghiChuaTraLoiTable = () => {
    const dispatch = useAppDispatch()
    const phanAnhKienNghiContext = usePhanAnhKienNghiContext()
    const { datas: PhanAnhKienNghis, count } = useAppSelector(state => state.phanAnhKienNghi)
    const [searchParams, setSearchParams] = useState<ISearchPhanAnhKienNghi>({ pageNumber: 1, pageSize: 10, trangThai: '0' })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })

    useEffect(() => {
        if (phanAnhKienNghiContext.xoaPAKNId) {
            (async () => {
                const res = await dispatch(DeletePhanAnhKienNghi({ id: phanAnhKienNghiContext.xoaPAKNId, forceDelete: false }))
                if (res.payload.succeeded) {
                    dispatch(SearchPhanAnhKienNghi(searchParams))
                    phanAnhKienNghiContext.setXoaPAKNId(undefined)
                }
            })()
        }

    }, [phanAnhKienNghiContext.xoaPAKNId])

    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
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
            <PhanAnhKienNghiDetail params={searchParams} />
        </>

    )
}

export default PhanAnhKienNghiChuaTraLoiTable