import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const FooterContext = createContext<IFooterContext | null>(null)

export interface IFooterContext{
    maFooter: string | undefined;
    setMaFooter: React.Dispatch<React.SetStateAction<string | undefined>>;
    maFooterModalVisible: boolean;
    setMaFooterModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useFooterContext = () => {
    const context = useContext(FooterContext)
    if(!context)
        throw new Error("FooterContext must be used inside FooterContext.Provider")
    return context
}

export const FooterProvider = ({children}: IWithChildren) => {
    const [maFooter, setMaFooter] = useState<string>()
    const [maFooterModalVisible, setMaFooterModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <FooterContext.Provider value={{maFooter, setMaFooter, maFooterModalVisible, setMaFooterModalVisible}}>
        {children}
    </FooterContext.Provider> 
}