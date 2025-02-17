import { useState,useEffect } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchProcOfThisType_Mgr } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchProcOfThisType_Mgr } from "../redux/action"
import { ProcOfThisType_MgrSearch } from "./ProcOfThisType_MgrSearch"
import { ProcOfThisType_MgrProvider } from "../contexts/ProcOfThisType_MgrContext"
import { ProcOfThisType_MgrDetail } from "./ProcOfThisType_MgrDetail"
import { useProcGroup_MgrContext } from "@/features/proGruop_Mgr/contexts/ProcGroup_MgrContext"
import { useTypeOfProc_MgrContext } from "@/features/typeOfProc_Mgr/contexts/TypeOfProc_MgrContext"

const ProcOfThisType_MgrTable = () => {
    const dispatch = useAppDispatch()
    const { datas: procOfThisType_Mgrs, count } = useAppSelector(state => state.procofthistype_mgr)
    const typeOfProc_MgrContext = useTypeOfProc_MgrContext();

    const [searchParams, setSearchParams] = useState<ISearchProcOfThisType_Mgr>({ pageNumber: 1, pageSize: 50,loaithutucid : typeOfProc_MgrContext.typeOfProc_MgrId})
    
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })

 




    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <ProcOfThisType_MgrSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={procOfThisType_Mgrs}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchProcOfThisType_Mgr(params))}
                />
            </AntdSpace>
          <ProcOfThisType_MgrDetail/>
        </>
            
    )
}
const ProcOfThisType_MgrTableWrapper = () => (<ProcOfThisType_MgrProvider>
    <ProcOfThisType_MgrTable/>
</ProcOfThisType_MgrProvider>)
export default ProcOfThisType_MgrTableWrapper