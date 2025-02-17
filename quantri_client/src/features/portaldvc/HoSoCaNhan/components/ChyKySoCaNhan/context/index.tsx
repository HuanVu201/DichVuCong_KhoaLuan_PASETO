import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";
import { IChuKySoCaNhan } from "../model";

const ChuKySoCaNhanContext = createContext<IChuKySoCaNhanContext | null>(null)

export interface IChuKySoCaNhanContext {
    chuKySoCaNhanId: string | undefined;
    setChuKySoCaNhanId: React.Dispatch<React.SetStateAction<string | undefined>>;

    chuKySoCaNhanItem: IChuKySoCaNhan | undefined
    setChuKySoCaNhanItem: React.Dispatch<React.SetStateAction<IChuKySoCaNhan | undefined>>;

    addChuKyCaNhanModalVisible: boolean;
    setAddChuKyCaNhanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    chuKySoCaNhanDetailModalVisible: boolean;
    setChuKySoCaNhanDetailModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    reload: boolean
    setReload: React.Dispatch<React.SetStateAction<boolean>>
}

export const useChuKySoCaNhanContext = () => {
    const context = useContext(ChuKySoCaNhanContext)
    if (!context)
        throw new Error("ChuKySoCaNhanContext must be used inside ChuKySoCaNhanContext.Provider")
    return context
}

export const ChuKySoCaNhanProvider = ({ children }: IWithChildren) => {
    const [chuKySoCaNhanId, setChuKySoCaNhanId] = useState<string>()
    const [addChuKyCaNhanModalVisible, setAddChuKyCaNhanModalVisible] = useState<boolean>(false)
    const [chuKySoCaNhanDetailModalVisible, setChuKySoCaNhanDetailModalVisible] = useState<boolean>(false)
    const [reload, setReload] = useState<boolean>(false)
    const [chuKySoCaNhanItem, setChuKySoCaNhanItem] = useState<IChuKySoCaNhan>()

    return <ChuKySoCaNhanContext.Provider value={{
        chuKySoCaNhanId, setChuKySoCaNhanId,
        chuKySoCaNhanItem, setChuKySoCaNhanItem,
        addChuKyCaNhanModalVisible, setAddChuKyCaNhanModalVisible,
        chuKySoCaNhanDetailModalVisible, setChuKySoCaNhanDetailModalVisible,
        reload, setReload
    }}>
        {children}
    </ChuKySoCaNhanContext.Provider>
}