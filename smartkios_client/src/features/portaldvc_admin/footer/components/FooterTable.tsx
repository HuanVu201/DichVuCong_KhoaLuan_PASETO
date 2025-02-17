import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchFooter } from "../models"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { SearchFooter } from "../redux/action"
import { FooterSearch } from "./FooterSearch"
import { FooterProvider } from "../contexts/FooterContext"
import { FooterDetail } from "./FooterDetail"

const FooterTable = () => {
    const dispatch = useAppDispatch()
    const { datas: footers, count } = useAppSelector(state => state.footer)
    const [searchParams, setSearchParams] = useState<ISearchFooter>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <FooterSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={footers}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchFooter(params))}
                />
            </AntdSpace>
            <FooterDetail/>
        </>
            
    )
}

export default FooterTable