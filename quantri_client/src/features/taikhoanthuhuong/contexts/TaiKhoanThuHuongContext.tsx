import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const TaiKhoanThuHuongContext = createContext<ITaiKhoanThuHuongContext | null>(null)

export interface ITaiKhoanThuHuongContext {
    maTaiKhoanThuHuong: string | undefined;
    setMaTaiKhoanThuHuong: React.Dispatch<React.SetStateAction<string | undefined>>;
    TaiKhoanThuHuongModalVisible: boolean;
    setTaiKhoanThuHuongModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useTaiKhoanThuHuongContext = () => {
    const context = useContext(TaiKhoanThuHuongContext)
    if (!context)
        throw new Error("TaiKhoanThuHuongContext must be used inside TaiKhoanThuHuongContext.Provider")
    return context
}

export const TaiKhoanThuHuongProvider = ({ children }: IWithChildren) => {
    const [maTaiKhoanThuHuong, setMaTaiKhoanThuHuong] = useState<string>()
    const [TaiKhoanThuHuongModalVisible, setTaiKhoanThuHuongModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <TaiKhoanThuHuongContext.Provider value={{
        maTaiKhoanThuHuong, setMaTaiKhoanThuHuong, TaiKhoanThuHuongModalVisible, setTaiKhoanThuHuongModalVisible,
    }}>
        {children}
    </TaiKhoanThuHuongContext.Provider>
}