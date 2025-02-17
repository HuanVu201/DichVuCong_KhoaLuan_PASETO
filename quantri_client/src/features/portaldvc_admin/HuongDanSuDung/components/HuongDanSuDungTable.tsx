import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchHuongDanSuDung } from "../models"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { SearchHuongDanSuDung } from "../redux/action"
import { HuongDanSuDungSearch } from "./HuongDanSuDungSearch"
import { HuongDanSuDungProvider } from "../context/HuongDanSuDungContext"
import { HuongDanSuDungDetail } from "./HuongDanSuDungDetail"

const HuongDanSuDungTable = () => {
    const dispatch = useAppDispatch()
    const { datas: HuongDanSuDungs, count } = useAppSelector(state => state.huongdansudung)
    const [searchParams, setSearchParams] = useState<ISearchHuongDanSuDung>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <HuongDanSuDungSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={HuongDanSuDungs}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchHuongDanSuDung(params))}
                />
            </AntdSpace>
            <HuongDanSuDungDetail/>
        </>
            
    )
}

export default HuongDanSuDungTable