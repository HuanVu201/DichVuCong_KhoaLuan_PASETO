import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const TinBaiContext = createContext<ITinBaiContext | null>(null)

export interface ITinBaiContext{
    maTinBai: string | undefined;
    setMaTinBai: React.Dispatch<React.SetStateAction<string | undefined>>;
    maTinBaiModalVisible: boolean;
    setMaTinBaiModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useTinBaiContext = () => {
    const context = useContext(TinBaiContext)
    if(!context)
        throw new Error("TinBaiContext must be used inside TinBaiContext.Provider")
    return context
}

export const TinBaiProvider = ({children}: IWithChildren) => {
    const [maTinBai, setMaTinBai] = useState<string>()
    const [maTinBaiModalVisible, setMaTinBaiModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <TinBaiContext.Provider value={{maTinBai, setMaTinBai, maTinBaiModalVisible, setMaTinBaiModalVisible}}>
        {children}
    </TinBaiContext.Provider> 
}