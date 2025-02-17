import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";
import { ISearchAssor_Proc_Mgr } from "../model";

const Assor_Proc_Mgr_Context = createContext<IAssor_Proc_Mgr_Context | null>(null)

export interface IAssor_Proc_Mgr_Context {
    assor_Proc_MgrId: string | undefined;
    setAssor_Proc_Mgr_Id: React.Dispatch<React.SetStateAction<string | undefined>>;
    assor_Proc_MgrModalVisible: boolean;
    setAssor_Proc_Mgr_ModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    searchParams: ISearchAssor_Proc_Mgr;
    setSearchParams: React.Dispatch<React.SetStateAction<ISearchAssor_Proc_Mgr>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useAssor_Proc_Mgr_Context = () => {
    const context = useContext(Assor_Proc_Mgr_Context)
    if (!context)
        throw new Error("Assor_Proc_MgrContext must be used inside Assor_Proc_MgrContext.Provider")
    return context
}

export const Assor_Proc_MgrProvider = ({ children }: IWithChildren) => {
    const [assor_Proc_MgrId, setAssor_Proc_Mgr_Id] = useState<string>()
    const [assor_Proc_MgrModalVisible, setAssor_Proc_Mgr_ModalVisible] = useState<boolean>(false)
    const [searchParams, setSearchParams] = useState<ISearchAssor_Proc_Mgr>({ pageNumber: 1, pageSize: 200 })
    const [loading, setLoading] = useState<boolean>(false)
    return <Assor_Proc_Mgr_Context.Provider value={{
        assor_Proc_MgrId, setAssor_Proc_Mgr_Id,
        assor_Proc_MgrModalVisible, setAssor_Proc_Mgr_ModalVisible,
        loading, setLoading,
        searchParams, setSearchParams
    }}>
        {children}
    </Assor_Proc_Mgr_Context.Provider>
}