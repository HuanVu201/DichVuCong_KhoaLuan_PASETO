import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const YeuCauThucHienNghiaVuTaiChinhContext = createContext<IYeuCauThucHienNghiaVuTaiChinhContext | null>(null)

export interface IYeuCauThucHienNghiaVuTaiChinhContext {
    
}

export const useYeuCauThucHienNghiaVuTaiChinhContext = () => {
    const context = useContext(YeuCauThucHienNghiaVuTaiChinhContext)
    if (!context)
        throw new Error("YeuCauThucHienNghiaVuTaiChinhContext must be used inside YeuCauThucHienNghiaVuTaiChinhContext.Provider")
    return context
}

export const YeuCauThucHienNghiaVuTaiChinhProvider = ({ children }: IWithChildren) => {
  
    return <YeuCauThucHienNghiaVuTaiChinhContext.Provider value={{
        
    }}>
        {children}
    </YeuCauThucHienNghiaVuTaiChinhContext.Provider>
}