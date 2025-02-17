import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const LoaiPhiLePhiContext = createContext<ILoaiPhiLePhiContext | null>(null)

export interface ILoaiPhiLePhiContext{
    maPhiLePhi: string | undefined;
    setMaPhiLePhiaPhiLePhi: React.Dispatch<React.SetStateAction<string | undefined>>;
    maPhiLePhiModalVisible: boolean;
    setMaPhiLePhiModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useLoaiPhiLePhiContext = () => {
    const context = useContext(LoaiPhiLePhiContext)
    if(!context)
        throw new Error("LoaiPhiLePhiContext must be used inside LoaiPhiLePhiContext.Provider")
    return context
}

export const LoaiPhiLePhiProvider = ({children}: IWithChildren) => {
    const [maPhiLePhi, setMaPhiLePhiaPhiLePhi] = useState<string>()
    const [maPhiLePhiModalVisible, setMaPhiLePhiModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <LoaiPhiLePhiContext.Provider value={{maPhiLePhi, setMaPhiLePhiaPhiLePhi, maPhiLePhiModalVisible, setMaPhiLePhiModalVisible}}>
        {children}
    </LoaiPhiLePhiContext.Provider> 
}