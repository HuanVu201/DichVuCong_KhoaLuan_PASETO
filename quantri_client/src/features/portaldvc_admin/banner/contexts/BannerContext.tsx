import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const BannerContext = createContext<IBannerContext | null>(null)

export interface IBannerContext{
    maBanner: string | undefined;
    setMaBanner: React.Dispatch<React.SetStateAction<string | undefined>>;
    maBannerModalVisible: boolean;
    setMaBannerModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useBannerContext = () => {
    const context = useContext(BannerContext)
    if(!context)
        throw new Error("BannerContext must be used inside BannerContext.Provider")
    return context
}

export const BannerProvider = ({children}: IWithChildren) => {
    const [maBanner, setMaBanner] = useState<string>()
    const [maBannerModalVisible, setMaBannerModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <BannerContext.Provider value={{maBanner, setMaBanner, maBannerModalVisible, setMaBannerModalVisible}}>
        {children}
    </BannerContext.Provider> 
}