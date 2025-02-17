import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const QuyTrinhXuLyContext = createContext<IQuyTrinhXuLyContext | null>(null)

export interface IQuyTrinhXuLyContext{
    quyTrinhXuLyId: string | undefined;
    setQuyTrinhXuLyId: React.Dispatch<React.SetStateAction<string | undefined>>;
    quyTrinhXuLyModalVisible: boolean;
    setQuyTrinhXuLyModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useQuyTrinhXuLyContext = () => {
    const context = useContext(QuyTrinhXuLyContext)
    if(!context)
        throw new Error("QuyTrinhXuLyContext must be used inside QuyTrinhXuLyContext.Provider")
    return context
}

export const QuyTrinhXuLyProvider = ({children}: IWithChildren) => {
    const [quyTrinhXuLyId, setQuyTrinhXuLyId] = useState<string>()
    const [quyTrinhXuLyModalVisible, setQuyTrinhXuLyModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <QuyTrinhXuLyContext.Provider value={{quyTrinhXuLyId, setQuyTrinhXuLyId, quyTrinhXuLyModalVisible, setQuyTrinhXuLyModalVisible}}>
        {children}
    </QuyTrinhXuLyContext.Provider> 
}