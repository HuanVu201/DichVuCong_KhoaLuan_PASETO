import { useState } from "react"
import { AntdSpace, AntdTable } from "../../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchTinBai } from "../models"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { SearchTinBai } from "../redux/action"
import { TinBaiSearch } from "./TinBaiSearch"
import { useTinBaiContext } from "../contexts/TinBaiContext"
import { TinBaiDetail } from "./TinBaiDetail"

const TinBaiTable = ({ kenhTinId }: { kenhTinId: string }) => {
    const dispatch = useAppDispatch()
    const tinbaiContext = useTinBaiContext()
    const { datas: tinBais, count } = useAppSelector(state => state.tinbai)
    const [searchParams, setSearchParams] = useState<ISearchTinBai>({ pageNumber: 1, pageSize: 10, kenhTinId, reFetch: true })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <TinBaiSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={tinBais}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchTinBai(params))}
                />
            </AntdSpace>

            {tinbaiContext.maTinBaiModalVisible ? <TinBaiDetail></TinBaiDetail> : <></>}
        </>

    )
}
export default TinBaiTable