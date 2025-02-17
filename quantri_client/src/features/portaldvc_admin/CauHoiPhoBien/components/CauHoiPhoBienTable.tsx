import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchCauHoiPhoBien } from "../models"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { SearchCauHoiPhoBien } from "../redux/action"
import { CauHoiPhoBienSearch } from "./CauHoiPhoBienSearch"
import { CauHoiPhoBienProvider } from "../context/CauHoiPhoBienContext"
import { CauHoiPhoBienDetail } from "./CauHoiPhoBienDetail"

const CauHoiPhoBienTable = () => {
    const dispatch = useAppDispatch()
    const { datas: CauHoiPhoBiens, count } = useAppSelector(state => state.cauhoiphobien)
    const [searchParams, setSearchParams] = useState<ISearchCauHoiPhoBien>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <CauHoiPhoBienSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={CauHoiPhoBiens}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchCauHoiPhoBien(params))}
                />
            </AntdSpace>
            <CauHoiPhoBienDetail/>
        </>
            
    )
}

export default CauHoiPhoBienTable