import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchTypeOfProc_Mgr } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchTypeOfProc_Mgr } from "../redux/action"
import { TypeOfProc_MgrSearch } from "./TypeOfProc_MgrSearch"
import { TypeOfProc_MgrProvider, useTypeOfProc_MgrContext } from "../contexts/TypeOfProc_MgrContext"
import { TypeOfProc_MgrDetail } from "./TypeOfProc_MgrDetail"
import { useProcGroup_MgrContext } from "@/features/proGruop_Mgr/contexts/ProcGroup_MgrContext"
import { ProcOfThisType_MgrModal } from "../modals/procofthistype/ProcOfThisType_MgrModal"
const TypeOfProc_MgrTable = () => {
    const dispatch = useAppDispatch()
    const { datas: typeOfProc_Mgrs, count } = useAppSelector(state => state.typeofproc_mgr)
    const procgroup_mgrContext = useProcGroup_MgrContext();
    const typeOfProc_MgrContext = useTypeOfProc_MgrContext();
    const [searchParams, setSearchParams] = useState<ISearchTypeOfProc_Mgr>({ pageNumber: 1, pageSize: 50 ,nhomthutucid :procgroup_mgrContext.procGroup_MgrId })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <TypeOfProc_MgrSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={typeOfProc_Mgrs}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchTypeOfProc_Mgr(params))}
                />
            </AntdSpace>
            <TypeOfProc_MgrDetail/>
            {typeOfProc_MgrContext.List_ProcOfThisTyPeModalVisible ? <ProcOfThisType_MgrModal/> : null} 
        </>
            
    )
}
const TypeOfProc_MgrTableWrapper = () => (<TypeOfProc_MgrProvider>
    <TypeOfProc_MgrTable/>
</TypeOfProc_MgrProvider>)
export default TypeOfProc_MgrTableWrapper