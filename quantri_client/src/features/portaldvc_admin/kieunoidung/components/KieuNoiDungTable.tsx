import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchKieuNoiDung } from "../models"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { SearchKieuNoiDung } from "../redux/action"
import { KieuNoiDungSearch } from "./KieuNoiDungSearch"
import { KieuNoiDungProvider } from "../contexts/KieuNoiDungContext"
import { KieuNoiDungDetail } from "./KieuNoiDungDetail"

const KieuNoiDungTable = () => {
    const dispatch = useAppDispatch()
    const { datas: kieuNoiDungs, count } = useAppSelector(state => state.kieunoidung)
    const [searchParams, setSearchParams] = useState<ISearchKieuNoiDung>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <KieuNoiDungSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={kieuNoiDungs}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchKieuNoiDung(params))}
                />
            </AntdSpace>
            <KieuNoiDungDetail/>
        </>
            
    )
}

export default KieuNoiDungTable