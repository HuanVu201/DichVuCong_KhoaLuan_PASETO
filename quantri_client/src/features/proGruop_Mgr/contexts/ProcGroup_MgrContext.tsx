import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const ProcGroup_MgrContext = createContext<IProcGroup_MgrContext | null>(null)

export interface IProcGroup_MgrContext{
    procGroup_MgrId: string | undefined;
    setProcGroup_MgrId: React.Dispatch<React.SetStateAction<string | undefined>>;
    procGroup_MgrModalVisible: boolean;
    setProcGroup_MgrModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    List_TypeOfProc_MgrModalVisible: boolean;
    setList_TypeOfProc_MgrModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useProcGroup_MgrContext = () => {
    const context = useContext(ProcGroup_MgrContext)
    if(!context)
        throw new Error("ProcGroup_MgrContext must be used inside ProcGroup_MgrContext.Provider")
    return context
}

export const ProcGroup_MgrProvider = ({children}: IWithChildren) => {
    const [procGroup_MgrId, setProcGroup_MgrId] = useState<string>()
    const [procGroup_MgrModalVisible, setProcGroup_MgrModalVisible] = useState<boolean>(false)
    const [List_TypeOfProc_MgrModalVisible, setList_TypeOfProc_MgrModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <ProcGroup_MgrContext.Provider value={{procGroup_MgrId, setProcGroup_MgrId, procGroup_MgrModalVisible, setProcGroup_MgrModalVisible,List_TypeOfProc_MgrModalVisible,setList_TypeOfProc_MgrModalVisible}}>
        {children}
    </ProcGroup_MgrContext.Provider> 
}