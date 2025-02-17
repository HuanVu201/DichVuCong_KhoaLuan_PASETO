import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const DanhSachGiayToContext = createContext<IDanhSachGiayToContext | null>(null)

const DanhSachGiayToViewMode = {
    "view" : "view",
    "edit" : "edit",
    "add" : "add",
} as const 
export type DanhSachGiayToViewMode = keyof typeof DanhSachGiayToViewMode

export interface IDanhSachGiayToContext{
    giayToSoHoaId: string | undefined;
    setGiayToSoHoaId: React.Dispatch<React.SetStateAction<string | undefined>>;
    viewMode: DanhSachGiayToViewMode | undefined;
    setViewMode: React.Dispatch<React.SetStateAction<DanhSachGiayToViewMode | undefined>>;
    hideThemMoi: boolean;
}

export const useDanhSachGiayToContext = () => {
    const context = useContext(DanhSachGiayToContext)
    if(!context)
        throw new Error("DanhSachGiayToContext must be used inside DanhSachGiayToContext.Provider")
    return context
}

export const DanhSachGiayToProvider = ({children, hideThemMoi = false}: IWithChildren & {hideThemMoi?:boolean}) => {
    const [giayToSoHoaId, setGiayToSoHoaId] = useState<string>()
    const [viewMode, setViewMode] = useState<DanhSachGiayToViewMode>()
    // thêm các hàm search cho các tabs ở đây
    return <DanhSachGiayToContext.Provider value={{
            viewMode,
            setViewMode,
            giayToSoHoaId,
            setGiayToSoHoaId,
            hideThemMoi
        }}>
        {children}
    </DanhSachGiayToContext.Provider> 
}