import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useState } from "react"

import { useSearchParams } from "react-router-dom"
import { ISearchDSTaiLieuHDSD } from "../../models"
import { useColumnCanBo } from "../hooks/useColumnCanBo"
import { AntdSpace, AntdTable } from "@/lib/antd/components"
import { SearchDSTaiLieuHDSD } from "../../redux/action"

const DSTaiLieuHDSDCanBoTable = () => {
    const dispatch = useAppDispatch()
    const { datas: DSTaiLieuHDSDs, count } = useAppSelector(state => state.dstailieuhdsd)

    const [searchParams, setSearchParams] = useState<ISearchDSTaiLieuHDSD>({ pageNumber: 1, pageSize: 10, taiLieuDanhCho: "CanBo" })
    const { columns } = useColumnCanBo({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })

    return (
        <>
            <strong>Tài liệu dành cho cán bộ</strong>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <AntdTable
                    bordered
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
        </>

    )
}

export default DSTaiLieuHDSDCanBoTable