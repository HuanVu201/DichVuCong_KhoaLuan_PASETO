import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchTrangThaiHoSo } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchTrangThaiHoSo } from "../redux/action"
import { TrangThaiHoSoSearch } from "./TrangThaiHoSoSearch"
import { TrangThaiHoSoProvider } from "../contexts/TrangThaiHoSoContext"
import { TrangThaiHoSoDetail } from "./TrangThaiHoSoDetail"
import { resetDatas } from "../redux/slice"

export const TrangThaiHoSoTable = () => {
    const dispatch = useAppDispatch()
    const { datas: TrangThaiHoSos, count } = useAppSelector(state => state.trangthaihoso)
    const [searchParams, setSearchParams] = useState<ISearchTrangThaiHoSo>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    useEffect(() => {
        return() => {
            dispatch(resetDatas())
        }
    }, [])
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <TrangThaiHoSoSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={TrangThaiHoSos}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchTrangThaiHoSo(params))}
                />
            </AntdSpace>
            <TrangThaiHoSoDetail/>
        </>
            
    )
}
