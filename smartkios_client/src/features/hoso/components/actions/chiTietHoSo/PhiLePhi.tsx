import { ISearchHoSoBoSung } from "@/features/bosunghoso/models"
import { useYeuCauThanhToanColumn } from "@/features/hoso/hooks/useYeuCauThanhToanColumn"
import { ISearchPhiLePhi } from "@/features/philephi/models"
import { ISearchYeuCauThanhToan } from "@/features/yeucauthanhtoan/models"
import { SearchYeuCauThanhToan } from "@/features/yeucauthanhtoan/redux/action"
import { AntdTable } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useState } from "react"


export const PhiLePhi = () => {
    const [searchParams, setSearchParams] = useState<ISearchYeuCauThanhToan>({ pageNumber: 1, pageSize: 10, reFetch: true })
    const dispatch = useAppDispatch()
    const { data: hoSo } = useAppSelector(state => state.hoso)
    const { datas: yeuCauThanhToans } = useAppSelector(state => state.yeucauthanhtoan)
    const columns = useYeuCauThanhToanColumn({pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize})
    useEffect(() => {
        if (hoSo != undefined) {
            setSearchParams((curr) => ({ ...curr, maHoSo: hoSo.maHoSo }))
        }
    }, [hoSo])
    return <>
        {searchParams.maHoSo ? <AntdTable
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            onSearch={(params) => dispatch(SearchYeuCauThanhToan(params))}
            columns={columns}
            dataSource={yeuCauThanhToans} /> : null}
    </>
}