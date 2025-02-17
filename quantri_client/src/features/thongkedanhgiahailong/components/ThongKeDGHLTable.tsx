import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { ISearchPhieuKhaoSat } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/models"
import { ThongKeDanhGiaHaiLongSearch } from "./ThongKeDanhGiaHaiLongSearch"
import { SearchPhieuKhaoSat } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/redux/action"
import { resetDatas } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/redux/slice"
import { ThongKeDanhGiaHaiLongProvider } from "../contexts/ThongKeDanhGiaHaiLongContext"
import { ThongKeDanhGiaHaiLongDetail } from "./ThongKeDGHLDetail"

const ThongKeDanhGiaHaiLongTable = () => {
    const dispatch = useAppDispatch()
    const { datas: phieukhaosats, count, } = useAppSelector(state => state.phieukhaosat)
    const { data:  user } = useAppSelector(state => state.user)
    const [searchParams, setSearchParams] = useState<ISearchPhieuKhaoSat>({ pageNumber: 1, pageSize: 50 , donVi : user?.officeCode})
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    useEffect(() => {
        return () => {
            dispatch(resetDatas())
        }
    }, [])
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <ThongKeDanhGiaHaiLongSearch setSearchParams={setSearchParams} />
                <AntdTable
                    bordered
                    columns={columns as any}
                    dataSource={phieukhaosats as any}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchPhieuKhaoSat(params))}
                />
            </AntdSpace>
            <ThongKeDanhGiaHaiLongDetail />
        </>

    )
}
const ThongKeDanhGiaHaiLongTableWrapper = () => (<ThongKeDanhGiaHaiLongProvider>
    <ThongKeDanhGiaHaiLongTable />
</ThongKeDanhGiaHaiLongProvider>)
export default ThongKeDanhGiaHaiLongTableWrapper