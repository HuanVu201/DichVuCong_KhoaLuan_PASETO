import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchProcGroup_Mgr } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchProcGroup_Mgr } from "../redux/action"
import { ProcGroup_MgrSearch } from "./ProcGroup_MgrSearch"
import { ProcGroup_MgrProvider } from "../contexts/ProcGroup_MgrContext"
import { ProcGroup_MgrDetail } from "./ProcGroup_MgrDetail"
import { useProcGroup_MgrContext } from "../contexts/ProcGroup_MgrContext"
import { TypeOfProc_MgrModal } from "../modals/typeofprocModals/TypeOfProcModal"
const ProcGroup_MgrTable = () => {
    const dispatch = useAppDispatch()
    const { datas: procGroup_Mgrs, count } = useAppSelector(state => state.procgroup_mgr)
    const [searchParams, setSearchParams] = useState<ISearchProcGroup_Mgr>({ pageNumber: 1, pageSize: 50 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    const procGroup_mgrcontext = useProcGroup_MgrContext();
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <ProcGroup_MgrSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={procGroup_Mgrs}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchProcGroup_Mgr(params))}
                />
            </AntdSpace>
            <ProcGroup_MgrDetail/>
             {procGroup_mgrcontext.List_TypeOfProc_MgrModalVisible ? <TypeOfProc_MgrModal/> : null} 
        </>
    )
}
const ProcGroup_MgrTableWrapper = () => (<ProcGroup_MgrProvider>
    <ProcGroup_MgrTable/>
</ProcGroup_MgrProvider>)
export default ProcGroup_MgrTableWrapper