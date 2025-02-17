import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const QuanLyLienKetContext = createContext<IQuanLyLienKetContext | null>(null)

export interface IQuanLyLienKetContext{
    maQuanLyLienKet: string | undefined;
    setMaQuanLyLienKet: React.Dispatch<React.SetStateAction<string | undefined>>;
    maQuanLyLienKetModalVisible: boolean;
    setMaQuanLyLienKetModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useQuanLyLienKetContext = () => {
    const context = useContext(QuanLyLienKetContext)
    if(!context)
        throw new Error("QuanLyLienKetContext must be used inside QuanLyLienKetContext.Provider")
    return context
}

export const QuanLyLienKetProvider = ({children}: IWithChildren) => {
    const [maQuanLyLienKet, setMaQuanLyLienKet] = useState<string>()
    const [maQuanLyLienKetModalVisible, setMaQuanLyLienKetModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <QuanLyLienKetContext.Provider value={{maQuanLyLienKet, setMaQuanLyLienKet, maQuanLyLienKetModalVisible, setMaQuanLyLienKetModalVisible}}>
        {children}
    </QuanLyLienKetContext.Provider> 
}