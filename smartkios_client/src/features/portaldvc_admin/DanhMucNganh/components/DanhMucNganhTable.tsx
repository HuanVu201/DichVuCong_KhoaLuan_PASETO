import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchDanhMucNganh } from "../models"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { SearchDanhMucNganh } from "../redux/action"
import { DanhMucNganhSearch } from "./DanhMucNganhSearch"
import { DanhMucNganhProvider } from "../contexts/DanhMucNganhContext"
import { DanhMucNganhDetail } from "./DanhMucNganhDetail"

const DanhMucNganhTable = () => {
    const dispatch = useAppDispatch()
    const { datas: DanhMucNganhs, count } = useAppSelector(state => state.danhmucnganh)
    const [searchParams, setSearchParams] = useState<ISearchDanhMucNganh>({ pageNumber: 1, pageSize: 10,type : 'danh-muc-nganh' })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize }) 
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <DanhMucNganhSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={DanhMucNganhs}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDanhMucNganh(params))}
                />
            </AntdSpace>
            <DanhMucNganhDetail/>
        </>
            
    )
}

export default DanhMucNganhTable