import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchBanner } from "../models"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { SearchBanner } from "../redux/action"
import { BannerSearch } from "./BannerSearch"
import { BannerProvider } from "../contexts/BannerContext"
import { BannerDetail } from "./BannerDetail"

const BannerTable = () => {
    const dispatch = useAppDispatch()
    const { datas: banners, count } = useAppSelector(state => state.banner)
    console.log(banners)
    const [searchParams, setSearchParams] = useState<ISearchBanner>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <BannerSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={banners}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchBanner(params))}
                />
            </AntdSpace>
            <BannerDetail/>
        </>
            
    )
}

export default BannerTable