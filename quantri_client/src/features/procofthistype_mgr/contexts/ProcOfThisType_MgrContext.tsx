import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const ProcOfThisType_MgrContext = createContext<IProcOfThisType_MgrContext | null>(null)

export interface IProcOfThisType_MgrContext{
    procOfThisType_MgrId: string | undefined;
    setProcOfThisType_MgrId: React.Dispatch<React.SetStateAction<string | undefined>>;
    procOfThisType_MgrModalVisible: boolean;
    setProcOfThisType_MgrModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    List_ProcOfThisType_MgrModalVisible: boolean;
    setList_ProcOfThisType_MgrModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useProcOfThisType_MgrContext = () => {
    const context = useContext(ProcOfThisType_MgrContext)
    if(!context)
        throw new Error("ProcOfThisType_MgrContext must be used inside ProcOfThisType_MgrContext.Provider")
    return context
}

export const ProcOfThisType_MgrProvider = ({children}: IWithChildren) => {
    const [procOfThisType_MgrId, setProcOfThisType_MgrId] = useState<string>()
    const [procOfThisType_MgrModalVisible, setProcOfThisType_MgrModalVisible] = useState<boolean>(false)
    const [List_ProcOfThisType_MgrModalVisible, setList_ProcOfThisType_MgrModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <ProcOfThisType_MgrContext.Provider value={{procOfThisType_MgrId, setProcOfThisType_MgrId, procOfThisType_MgrModalVisible, setProcOfThisType_MgrModalVisible,List_ProcOfThisType_MgrModalVisible,setList_ProcOfThisType_MgrModalVisible}}>
        {children}
    </ProcOfThisType_MgrContext.Provider> 
}