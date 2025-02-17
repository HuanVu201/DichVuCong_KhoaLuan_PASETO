import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const TaiLieuDienTuContext = createContext<ITaiLieuDienTuContext | null>(null)

export interface ITaiLieuDienTuContext {
    maTaiLieuDienTu: string | undefined;
    setMaTaiLieuDienTu: React.Dispatch<React.SetStateAction<string | undefined>>;
    TaiLieuDienTuModalVisible: boolean;
    setTaiLieuDienTuModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useTaiLieuDienTuContext = () => {
    const context = useContext(TaiLieuDienTuContext)
    if (!context)
        throw new Error("TaiLieuDienTuContext must be used inside TaiLieuDienTuContext.Provider")
    return context
}

export const TaiLieuDienTuProvider = ({ children }: IWithChildren) => {
    const [maTaiLieuDienTu, setMaTaiLieuDienTu] = useState<string>()
    const [TaiLieuDienTuModalVisible, setTaiLieuDienTuModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <TaiLieuDienTuContext.Provider value={{
        maTaiLieuDienTu, setMaTaiLieuDienTu, TaiLieuDienTuModalVisible, setTaiLieuDienTuModalVisible,
    }}>
        {children}
    </TaiLieuDienTuContext.Provider>
}