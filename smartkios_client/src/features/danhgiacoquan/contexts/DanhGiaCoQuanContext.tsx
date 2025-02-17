import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const DanhGiaCoQuanContext = createContext<IDanhGiaCoQuanContext | null>(null)

export interface IDanhGiaCoQuanContext {
    DanhGiaCoQuanId: string | undefined;
    setDanhGiaCoQuanId: React.Dispatch<React.SetStateAction<string | undefined>>;
    DanhGiaCoQuanModalVisible: boolean;
    setDanhGiaCoQuanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    ChamThamDinhModalVisible: boolean;
    setChamThamDinhModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDanhGiaCoQuanContext = () => {
    const context = useContext(DanhGiaCoQuanContext)
    if (!context)
        throw new Error("DanhGiaCoQuanContext must be used inside DanhGiaCoQuanContext.Provider")
    return context
}

export const DanhGiaCoQuanProvider = ({ children }: IWithChildren) => {
    const [DanhGiaCoQuanId, setDanhGiaCoQuanId] = useState<string>()
    const [DanhGiaCoQuanModalVisible, setDanhGiaCoQuanModalVisible] = useState<boolean>(false)
    const [ChamThamDinhModalVisible, setChamThamDinhModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <DanhGiaCoQuanContext.Provider value={{ DanhGiaCoQuanId, setDanhGiaCoQuanId, DanhGiaCoQuanModalVisible, setDanhGiaCoQuanModalVisible, ChamThamDinhModalVisible, setChamThamDinhModalVisible }}>
        {children}
    </DanhGiaCoQuanContext.Provider>
}