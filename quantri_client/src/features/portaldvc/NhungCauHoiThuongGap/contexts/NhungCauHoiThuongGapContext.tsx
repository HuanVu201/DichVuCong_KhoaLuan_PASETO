import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const NhungCauHoiThuongGapContext = createContext<INhungCauHoiThuongGapContext | null>(null)

export interface INhungCauHoiThuongGapContext{
    NhungCauHoiThuongGapType: string | undefined;
    setNhungCauHoiThuongGapType: React.Dispatch<React.SetStateAction<string | undefined>>;

}

export const useNhungCauHoiThuongGapContext = () => {
    const context = useContext(NhungCauHoiThuongGapContext)
    if(!context)
        throw new Error("NhungCauHoiThuongGapContext must be used inside NhungCauHoiThuongGapContext.Provider")
    return context
}

export const NhungCauHoiThuongGapProvider = ({children}: IWithChildren) => {
    const [NhungCauHoiThuongGapType, setNhungCauHoiThuongGapType] = useState<string>()
    // thêm các hàm search cho các tabs ở đây
    return <NhungCauHoiThuongGapContext.Provider value={{NhungCauHoiThuongGapType, setNhungCauHoiThuongGapType}}>
        {children}
    </NhungCauHoiThuongGapContext.Provider> 
}