import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const KieuNoiDungContext = createContext<IKieuNoiDungContext | null>(null)

export interface IKieuNoiDungContext{
    maKieuNoiDung: string | undefined;
    setMaKieuNoiDung: React.Dispatch<React.SetStateAction<string | undefined>>;
    maKieuNoiDungModalVisible: boolean;
    setMaKieuNoiDungModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useKieuNoiDungContext = () => {
    const context = useContext(KieuNoiDungContext)
    if(!context)
        throw new Error("KieuNoiDungContext must be used inside KieuNoiDungContext.Provider")
    return context
}

export const KieuNoiDungProvider = ({children}: IWithChildren) => {
    const [maKieuNoiDung, setMaKieuNoiDung] = useState<string>()
    const [maKieuNoiDungModalVisible, setMaKieuNoiDungModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <KieuNoiDungContext.Provider value={{maKieuNoiDung, setMaKieuNoiDung, maKieuNoiDungModalVisible, setMaKieuNoiDungModalVisible}}>
        {children}
    </KieuNoiDungContext.Provider> 
}