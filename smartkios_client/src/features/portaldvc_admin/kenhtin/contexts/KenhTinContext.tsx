import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const KenhTinContext = createContext<IKenhTinContext | null>(null)

export interface IKenhTinContext{
    maKenhTin: string | undefined;
    setMaKenhTin: React.Dispatch<React.SetStateAction<string | undefined>>;
    maKenhTinModalVisible: boolean;
    setMaKenhTinModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useKenhTinContext = () => {
    const context = useContext(KenhTinContext)
    if(!context)
        throw new Error("KenhTinContext must be used inside KenhTinContext.Provider")
    return context
}

export const KenhTinProvider = ({children}: IWithChildren) => {
    const [maKenhTin, setMaKenhTin] = useState<string>()
    const [maKenhTinModalVisible, setMaKenhTinModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <KenhTinContext.Provider value={{maKenhTin, setMaKenhTin, maKenhTinModalVisible, setMaKenhTinModalVisible}}>
        {children}
    </KenhTinContext.Provider> 
}