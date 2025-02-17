import { ISearchGiayToSoHoa } from "@/features/giaytosohoa/models"
import { SearchGiayToSoHoa } from "@/features/giaytosohoa/redux/action"
import { ISearchHoSo } from "@/features/hoso/models"
import { SearchHoSo } from "@/features/hoso/redux/action"
import { AntdSpace, AntdTable } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useGiayToSoHoaColumns } from "../../hooks/useGiayToSoHoaColumns"
import { MenuKetQuaThuTucProvider, useMenuKetQuaThuTucContext } from "../../contexts/MenuKetQuaThuTucContext"
import { GiayToSoHoaDetail } from "../modals/GiayToSoHoaDetail"
import { MenuKetQuaThuTucActionSearch } from "./MenuKetQuaThuTucActionSearch"
import { Typography } from "antd"
import { TotalRecord } from "./TotalRecord"


const MenuKetQuaThuTucActionTable = () => {
    const dispatch = useAppDispatch()
    const {datas: giayToSoHoas, count} = useAppSelector(state => state.giaytosohoa)
    const [urlSearchParams] = useSearchParams()
    const [searchParams, setSearchParams] = useState<ISearchGiayToSoHoa>({pageNumber: 1, pageSize: 10})
    const {columns} = useGiayToSoHoaColumns({pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize})
    const menuKetQuaThuTucContext = useMenuKetQuaThuTucContext()
    useEffect(() => {
        const maKetQuaTTHC = urlSearchParams.get("MaKetQuaTTHC")
        if(maKetQuaTTHC) {
            setSearchParams((curr) => {
                return ({...curr, maKetQuaTTHC})
            })
        }
        
    }, [urlSearchParams])
    
    const resetSearchParams = useCallback(() => {
        const maKetQuaTTHC = urlSearchParams.get("MaKetQuaTTHC")
        if(maKetQuaTTHC) {
            setSearchParams({pageNumber: 1, pageSize: 10, maKetQuaTTHC})
        }
    }, [urlSearchParams])

    return (
        <>
        <AntdSpace direction="vertical" style={{width:"100%"}}>
        <MenuKetQuaThuTucActionSearch setSearchParams={setSearchParams} resetSearch={resetSearchParams}/>
        {searchParams.maKetQuaTTHC ? 
        <>
        <span><TotalRecord count={count} pageNumber={searchParams.pageNumber} pageSize={searchParams.pageSize} style={{justifyContent:"start"}}/></span>
        <AntdTable 
            footer={() => <TotalRecord count={count} pageNumber={searchParams.pageNumber} pageSize={searchParams.pageSize}/>}
            onSearch={(values) => dispatch(SearchGiayToSoHoa(values))}
            columns={columns}
            dataSource={giayToSoHoas}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            pagination={{
                total: count
            }}
        >
        </AntdTable>
        </>
         : null}
        {menuKetQuaThuTucContext.giayToSoHoaModalVisible ? <GiayToSoHoaDetail/> : null}
        </AntdSpace>
        </>
        
    )
}

const MenuKetQuaThuTucActionTableWrapper = () => <MenuKetQuaThuTucProvider>
    <MenuKetQuaThuTucActionTable/>
</MenuKetQuaThuTucProvider>

export default MenuKetQuaThuTucActionTableWrapper