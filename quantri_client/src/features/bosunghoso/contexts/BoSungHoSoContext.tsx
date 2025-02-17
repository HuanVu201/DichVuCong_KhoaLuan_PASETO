import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const BoSungHoSoContext = createContext<IBoSungHoSoContext | null>(null)

export interface IBoSungHoSoContext{
    BoSungHoSoId: string | undefined;
    setBoSungHoSoId: React.Dispatch<React.SetStateAction<string | undefined>>;
    detailBoSungHoSoModalVisible: boolean;
    setDetailBoSungHoSoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useBoSungHoSoContext = () => {
    const context = useContext(BoSungHoSoContext)
    if(!context)
        throw new Error("BoSungHoSoContext must be used inside BoSungHoSoContext.Provider")
    return context
}

export const BoSungHoSoProvider = ({children}: IWithChildren) => {
    const [BoSungHoSoId, setBoSungHoSoId] = useState<string>()
    const [detailBoSungHoSoModalVisible, setDetailBoSungHoSoModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <BoSungHoSoContext.Provider value={{BoSungHoSoId, setBoSungHoSoId, detailBoSungHoSoModalVisible, setDetailBoSungHoSoModalVisible}}>
        {children}
    </BoSungHoSoContext.Provider> 
}