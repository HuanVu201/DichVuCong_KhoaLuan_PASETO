import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const HoSoThuocDoiTuongMienPhiContext = createContext<IHoSoThuocDoiTuongMienPhiContext | null>(null)

export interface IHoSoThuocDoiTuongMienPhiContext {
    
}

export const useHoSoThuocDoiTuongMienPhiContext = () => {
    const context = useContext(HoSoThuocDoiTuongMienPhiContext)
    if (!context)
        throw new Error("HoSoThuocDoiTuongMienPhiContext must be used inside HoSoThuocDoiTuongMienPhiContext.Provider")
    return context
}

export const HoSoThuocDoiTuongMienPhiProvider = ({ children }: IWithChildren) => {
  
    return <HoSoThuocDoiTuongMienPhiContext.Provider value={{
        
    }}>
        {children}
    </HoSoThuocDoiTuongMienPhiContext.Provider>
}