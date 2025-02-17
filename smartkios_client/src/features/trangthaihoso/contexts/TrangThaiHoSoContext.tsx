import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const TrangThaiHoSoContext = createContext<ITrangThaiHoSoContext | null>(null)

export interface ITrangThaiHoSoContext{
    trangThaiHoSoId: string | undefined;
    setTrangThaiHoSoId: React.Dispatch<React.SetStateAction<string | undefined>>;
    trangThaiHoSoModalVisible: boolean;
    setTrangThaiHoSoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useTrangThaiHoSoContext = () => {
    const context = useContext(TrangThaiHoSoContext)
    if(!context)
        throw new Error("TrangThaiHoSoContext must be used inside TrangThaiHoSoContext.Provider")
    return context
}

export const TrangThaiHoSoProvider = ({children}: IWithChildren) => {
    const [trangThaiHoSoId, setTrangThaiHoSoId] = useState<string>()
    const [trangThaiHoSoModalVisible, setTrangThaiHoSoModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <TrangThaiHoSoContext.Provider value={{trangThaiHoSoId, setTrangThaiHoSoId, trangThaiHoSoModalVisible, setTrangThaiHoSoModalVisible}}>
        {children}
    </TrangThaiHoSoContext.Provider> 
}