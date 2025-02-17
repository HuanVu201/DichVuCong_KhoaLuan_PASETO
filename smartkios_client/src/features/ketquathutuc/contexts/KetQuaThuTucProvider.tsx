import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const KetQuaThuTucContext = createContext<IKetQuaThuTucContext | null>(null)

export interface IKetQuaThuTucContext {
    maKetQuaThuTuc: string | undefined;
    setMaKetQuaThuTuc: React.Dispatch<React.SetStateAction<string | undefined>>;
    ketQuaThuTucModalVisible: boolean;
    setKetQuaThuTucModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    eFormVisible: boolean;
    setEFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useKetQuaThuTucContext = () => {
    const context = useContext(KetQuaThuTucContext)
    if (!context)
        throw new Error("KetQuaThuTucContext must be used inside KetQuaThuTucContext.Provider")
    return context
}

export const KetQuaThuTucProvider = ({ children }: IWithChildren) => {
    const [maKetQuaThuTuc, setMaKetQuaThuTuc] = useState<string>()
    const [ketQuaThuTucModalVisible, setKetQuaThuTucModalVisible] = useState<boolean>(false)
    const [eFormVisible, setEFormVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <KetQuaThuTucContext.Provider value={{
        maKetQuaThuTuc,
        setMaKetQuaThuTuc,
        ketQuaThuTucModalVisible,
        setKetQuaThuTucModalVisible,
        eFormVisible,
        setEFormVisible
    }}>
        {children}
    </KetQuaThuTucContext.Provider>
}