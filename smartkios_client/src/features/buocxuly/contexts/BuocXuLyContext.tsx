import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const BuocXuLyContext = createContext<IBuocXuLyContext | null>(null)

export interface IBuocXuLyContext{
    buocXuLiId: string | undefined;
    setBuocXuLiId: React.Dispatch<React.SetStateAction<string | undefined>>;
    buocXuLiModalVisible: boolean;
    setBuocXuLiModalVisibleModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useBuocXuLyContext = () => {
    const context = useContext(BuocXuLyContext)
    if(!context)
        throw new Error("BuocXuLyContext must be used inside BuocXuLyContext.Provider")
    return context
}

export const BuocXuLyProvider = ({children}: IWithChildren) => {
    const [buocXuLiId, setBuocXuLiId] = useState<string>()
    const [buocXuLiModalVisible, setBuocXuLiModalVisibleModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <BuocXuLyContext.Provider value={{buocXuLiId, setBuocXuLiId, buocXuLiModalVisible, setBuocXuLiModalVisibleModalVisible}}>
        {children}
    </BuocXuLyContext.Provider> 
}