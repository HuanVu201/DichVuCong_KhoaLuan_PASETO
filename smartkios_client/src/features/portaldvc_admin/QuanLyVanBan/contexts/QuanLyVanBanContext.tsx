import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const QuanLyVanBanContext = createContext<IQuanLyVanBanContext | null>(null)

export interface IQuanLyVanBanContext{
    maQuanLyVanBan: string | undefined;
    setMaQuanLyVanBan: React.Dispatch<React.SetStateAction<string | undefined>>;
    maQuanLyVanBanModalVisible: boolean;
    setMaQuanLyVanBanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useQuanLyVanBanContext = () => {
    const context = useContext(QuanLyVanBanContext)
    if(!context)
        throw new Error("QuanLyVanBanContext must be used inside QuanLyVanBanContext.Provider")
    return context
}

export const QuanLyVanBanProvider = ({children}: IWithChildren) => {
    const [maQuanLyVanBan, setMaQuanLyVanBan] = useState<string>()
    const [maQuanLyVanBanModalVisible, setMaQuanLyVanBanModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <QuanLyVanBanContext.Provider value={{maQuanLyVanBan, setMaQuanLyVanBan, maQuanLyVanBanModalVisible, setMaQuanLyVanBanModalVisible}}>
        {children}
    </QuanLyVanBanContext.Provider> 
}