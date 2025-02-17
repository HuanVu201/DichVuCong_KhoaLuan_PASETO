import { useCallback, useEffect, useMemo, useState } from "react"
import { AntdTable, AntdSpace, IAntdTableProps } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { MenuKetQuaThuTucSearch } from "./MenuKetQuaThuTucSearch"
import { MenuKetQuaThuTucDetail } from "./MenuKetQuaThuTucDetail"
import { MenuKetQuaThuTucProvider, useMenuKetQuaThuTucContext } from "../contexts/MenuKetQuaThuTucContext"
import { ISearchMenuKetQuaThuTuc } from "../models"
import { SearchMenuKetQuaThuTuc } from "../redux/action"
import { useSearchParams } from "react-router-dom"
// import { AddMenuKetQuaThuTuc } from "./modals/AddMenuKetQuaThuTuc"

const MenuKetQuaThuTucTable = () => {
    const dispatch = useAppDispatch()
    const menuKetQuaThuTucContext = useMenuKetQuaThuTucContext()
    const { datas: menuKetQuaThuTucs, count, loading } = useAppSelector(state => state.menuketquathutuc)
    const [searchParams, setSearchParams] = useState<ISearchMenuKetQuaThuTuc>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })

    
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <MenuKetQuaThuTucSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    loading={loading}
                    dataSource={menuKetQuaThuTucs}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchMenuKetQuaThuTuc(params))}
                />
            </AntdSpace>
            {menuKetQuaThuTucContext.menuKetQuaThuTucModalVisible ? <MenuKetQuaThuTucDetail/> : null}
            {/* {menuKetQuaThuTucContext.addMenuKetQuaThuTucModalVisible ? <AddMenuKetQuaThuTuc/> : null} */}
            
        </>
            
    )
}
const MenuKetQuaThuTucTableWrapper = () => (<MenuKetQuaThuTucProvider>
    <MenuKetQuaThuTucTable/>
</MenuKetQuaThuTucProvider>)
export default MenuKetQuaThuTucTableWrapper