import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const GiaoDichThanhToanContext = createContext<IGiaoDichThanhToanContext | null>(null)

export interface IGiaoDichThanhToanContext {
    giaoDichThanhToanId: React.Key[];
    setGiaoDichThanhToanId: React.Dispatch<React.SetStateAction<React.Key[]>>;
    giaoDichThanhToanModalVisible: boolean;
    setGiaoDichThanhToanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    checkGiaoDichThanhToanModalVisible: boolean;
    setCheckGiaoDichThanhToanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    xoaGiaoDichThanhToanModalVisible: boolean;
    setXoaGiaoDichThanhToanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

}

export const useGiaoDichThanhToanContext = () => {
    const context = useContext(GiaoDichThanhToanContext)
    if (!context)
        throw new Error("GiaoDichThanhToanContext must be used inside GiaoDichThanhToanContext.Provider")
    return context
}

export const GiaoDichThanhToanProvider = ({ children }: IWithChildren) => {
    const [giaoDichThanhToanId, setGiaoDichThanhToanId] = useState<React.Key[]>([])
    const [giaoDichThanhToanModalVisible, setGiaoDichThanhToanModalVisible] = useState<boolean>(false)
    const [checkGiaoDichThanhToanModalVisible, setCheckGiaoDichThanhToanModalVisible] = useState<boolean>(false)
    const [xoaGiaoDichThanhToanModalVisible, setXoaGiaoDichThanhToanModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <GiaoDichThanhToanContext.Provider value={{
        giaoDichThanhToanId, setGiaoDichThanhToanId
        , giaoDichThanhToanModalVisible, setGiaoDichThanhToanModalVisible,
        checkGiaoDichThanhToanModalVisible, setCheckGiaoDichThanhToanModalVisible,
        xoaGiaoDichThanhToanModalVisible, setXoaGiaoDichThanhToanModalVisible
    }}>
        {children}
    </GiaoDichThanhToanContext.Provider>
}