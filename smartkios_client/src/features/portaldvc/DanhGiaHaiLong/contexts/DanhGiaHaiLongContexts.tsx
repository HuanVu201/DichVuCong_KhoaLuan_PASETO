import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const DanhGiaHaiLongContext = createContext<IDanhGiaHaiLongContext | null>(null)

export interface IDanhGiaHaiLongContext{
    maDanhGiaHaiLong: string | undefined;
    setMaDanhGiaHaiLong: React.Dispatch<React.SetStateAction<string | undefined>>;
    maDanhGiaHaiLongModalVisible: boolean;
    setMaDanhGiaHaiLongModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDanhGiaHaiLongContext = () => {
    const context = useContext(DanhGiaHaiLongContext)
    if(!context)
        throw new Error("DanhGiaHaiLongContext must be used inside DanhGiaHaiLongContext.Provider")
    return context
}

export const DanhGiaHaiLongProvider = ({children}: IWithChildren) => {
    const [maDanhGiaHaiLong, setMaDanhGiaHaiLong] = useState<string>()
    const [maDanhGiaHaiLongModalVisible, setMaDanhGiaHaiLongModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <DanhGiaHaiLongContext.Provider value={{maDanhGiaHaiLong, setMaDanhGiaHaiLong, maDanhGiaHaiLongModalVisible, setMaDanhGiaHaiLongModalVisible}}>
        {children}
    </DanhGiaHaiLongContext.Provider> 
}