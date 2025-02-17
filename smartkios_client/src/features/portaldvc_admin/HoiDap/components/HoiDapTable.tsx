import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { IHoiDap, ISearchHoiDap } from "../../../portaldvc/HoiDap/models"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { SearchHoiDap } from '../../../portaldvc/HoiDap/redux/action'
import { HoiDapProvider } from "../contexts/HoiDapContext"
import { HoiDapDetail } from "./HoiDapDetail"
import { HoiDapSearch } from "./HoiDapSearch"


const HoiDapTable = () => {
    const dispatch = useAppDispatch()
    const { datas: HoiDaps, count } = useAppSelector(state => state.hoidap)
    const [searchParams, setSearchParams] = useState<ISearchHoiDap>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <HoiDapSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={HoiDaps}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchHoiDap(params))}
                />
            </AntdSpace>
            <HoiDapDetail/>
        </>
            
    )
}

export default HoiDapTable