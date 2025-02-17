import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const QuaTrinhTraoDoiCongDanContext = createContext<IQuaTrinhTraoDoiCongDanContext | null>(null)

export interface IQuaTrinhTraoDoiCongDanContext {
    maQuaTrinhTraoDoiCongDan: string | undefined;
    setMaQuaTrinhTraoDoiCongDan: React.Dispatch<React.SetStateAction<string | undefined>>;
    quaTrinhTraoDoiCongDanModalVisible: boolean;
    setQuaTrinhTraoDoiCongDanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    eFormVisible: boolean;
    setEFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useQuaTrinhTraoDoiCongDanContext = () => {
    const context = useContext(QuaTrinhTraoDoiCongDanContext)
    if (!context)
        throw new Error("QuaTrinhTraoDoiCongDanContext must be used inside QuaTrinhTraoDoiCongDanContext.Provider")
    return context
}

export const QuaTrinhTraoDoiCongDanProvider = ({ children }: IWithChildren) => {
    const [maQuaTrinhTraoDoiCongDan, setMaQuaTrinhTraoDoiCongDan] = useState<string>()
    const [quaTrinhTraoDoiCongDanModalVisible, setQuaTrinhTraoDoiCongDanModalVisible] = useState<boolean>(false)
    const [eFormVisible, setEFormVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <QuaTrinhTraoDoiCongDanContext.Provider value={{
        maQuaTrinhTraoDoiCongDan,
        setMaQuaTrinhTraoDoiCongDan,
        quaTrinhTraoDoiCongDanModalVisible,
        setQuaTrinhTraoDoiCongDanModalVisible,
        eFormVisible,
        setEFormVisible
    }}>
        {children}
    </QuaTrinhTraoDoiCongDanContext.Provider>
}