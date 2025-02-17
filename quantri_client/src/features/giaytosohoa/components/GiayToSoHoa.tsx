import { AntdSpace, AntdTable } from "@/lib/antd/components"
import { ComponentProps, useEffect, useMemo, useState } from "react"
import { GiayToSoHoaProvider, useGiayToSoHoaContext } from "../contexts/GiayToSoHoaProvider"
import {  useGiayToSoHoaColumns } from "../hooks/useColumn"
import { GiayToSoHoaSearch } from "./GiayToSoHoaSearch"
import { ISearchGiayToSoHoa } from "../models"
import { GiayToSoHoaDetail } from "./GiayToSoHoaDetail"

const GiayToSoHoa = ({extraSearchParams}: { extraSearchParams?: ISearchGiayToSoHoa}) => {
    const [searchParams, setSearchParams] = useState<ISearchGiayToSoHoa>({pageNumber: 1, pageSize: 50, byCurrentUser: true, hienThiGiayToKetQua: true})
    const GiayToSoHoaContext = useGiayToSoHoaContext()
    const {columns} = useGiayToSoHoaColumns(searchParams, setSearchParams)

    useEffect(() => {
        setSearchParams((curr) => ({...curr, ...extraSearchParams}))
    }, [extraSearchParams])
    const hasExtraSearchParams = useMemo(() => {
        if(!extraSearchParams){
            return false
        }
        return Object.keys(extraSearchParams).every(x => Object.keys(searchParams).includes(x))
    },[searchParams, extraSearchParams])

    return <>
        <GiayToSoHoaSearch resetSearch={() => setSearchParams({pageNumber: 1, pageSize: 50, byCurrentUser: true, hienThiGiayToKetQua: true, ...extraSearchParams})} setSearchParams={setSearchParams}/>
        {hasExtraSearchParams ? <AntdTable
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            onSearch={(values) => GiayToSoHoaContext.onSearch(values)}
            columns={columns}
            pagination={{
                total: GiayToSoHoaContext.count
            }}
            dataSource={GiayToSoHoaContext.giayToSoHoas}
        />: null}
        {GiayToSoHoaContext.viewMode ? <GiayToSoHoaDetail setSearchParams={setSearchParams} searchParams={searchParams}/> : null}
    </>
}

const GiayToSoHoaWrapper = (props: ComponentProps<typeof GiayToSoHoa>) => {
    return <GiayToSoHoaProvider>
        <GiayToSoHoa {...props}/>
    </GiayToSoHoaProvider>
}

export default GiayToSoHoaWrapper