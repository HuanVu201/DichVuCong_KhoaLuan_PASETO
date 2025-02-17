import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const TraCuuHopTacXaContext = createContext<ITraCuuHopTacXaContext | null>(null)

export interface ITraCuuHopTacXaContext{
    traCuuHopTacXaId: string | undefined;
    setTraCuuHopTacXaId: React.Dispatch<React.SetStateAction<string | undefined>>;
    traCuuHopTacXaModalVisible: boolean;
    setTraCuuHopTacXaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    List_TypeOfProc_MgrModalVisible: boolean;
    setList_TypeOfProc_MgrModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useTraCuuHopTacXaContext = () => {
    const context = useContext(TraCuuHopTacXaContext)
    if(!context)
        throw new Error("TraCuuHopTacXaContext must be used inside TraCuuHopTacXaContext.Provider")
    return context
}

export const TraCuuHopTacXaProvider = ({children}: IWithChildren) => {
    const [traCuuHopTacXaId, setTraCuuHopTacXaId] = useState<string>()
    const [traCuuHopTacXaModalVisible, setTraCuuHopTacXaModalVisible] = useState<boolean>(false)
    const [List_TypeOfProc_MgrModalVisible, setList_TypeOfProc_MgrModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <TraCuuHopTacXaContext.Provider value={{traCuuHopTacXaId, setTraCuuHopTacXaId, traCuuHopTacXaModalVisible, setTraCuuHopTacXaModalVisible,List_TypeOfProc_MgrModalVisible,setList_TypeOfProc_MgrModalVisible}}>
        {children}
    </TraCuuHopTacXaContext.Provider> 
}