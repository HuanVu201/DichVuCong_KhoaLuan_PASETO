import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const PhiLePhiContext = createContext<IPhiLePhiContext | null>(null)

export interface IPhiLePhiContext {
    maPhiLePhi: string | undefined;
    setMaPhiLePhi: React.Dispatch<React.SetStateAction<string | undefined>>;
    phiLePhiModalVisible: boolean;
    setPhiLePhiModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const usePhiLePhiContext = () => {
    const context = useContext(PhiLePhiContext)
    if (!context)
        throw new Error("PhiLePhiContext must be used inside PhiLePhiContext.Provider")
    return context
}

export const PhiLePhiProvider = ({ children }: IWithChildren) => {
    const [maPhiLePhi, setMaPhiLePhi] = useState<string>()
    const [phiLePhiModalVisible, setPhiLePhiModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <PhiLePhiContext.Provider value={{
        maPhiLePhi, setMaPhiLePhi, phiLePhiModalVisible, setPhiLePhiModalVisible,
    }}>
        {children}
    </PhiLePhiContext.Provider>
}