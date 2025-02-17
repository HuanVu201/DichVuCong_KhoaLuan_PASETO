import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchDSTaiLieuHDSD } from "../models"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { SearchDSTaiLieuHDSD } from "../redux/action"
import { DSTaiLieuHDSDSearch } from "./DSTaiLieuHDSDSearch"
import { DSTaiLieuHDSDDetail } from "./DSTaiLieuHDSDDetail"

const DSTaiLieuHDSDTable = () => {
    const dispatch = useAppDispatch()
    const { datas: DSTaiLieuHDSDs, count } = useAppSelector(state => state.dstailieuhdsd)
    const [searchParams, setSearchParams] = useState<ISearchDSTaiLieuHDSD>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <DSTaiLieuHDSDSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={DSTaiLieuHDSDs}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDSTaiLieuHDSD(params))}
                />
            </AntdSpace>
            <DSTaiLieuHDSDDetail/>
        </>
            
    )
}

export default DSTaiLieuHDSDTable