import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const LogTaiKhoanCSDLDanCuContext = createContext<ILogTaiKhoanCSDLDanCuContext | null>(null)

export interface ILogTaiKhoanCSDLDanCuContext {
    maLogTaiKhoanCSDLDanCu: string | undefined;
    setMaLogTaiKhoanCSDLDanCu: React.Dispatch<React.SetStateAction<string | undefined>>;
    LogTaiKhoanCSDLDanCuModalVisible: boolean;
    setLogTaiKhoanCSDLDanCuModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useLogTaiKhoanCSDLDanCuContext = () => {
    const context = useContext(LogTaiKhoanCSDLDanCuContext)
    if (!context)
        throw new Error("LogTaiKhoanCSDLDanCuContext must be used inside LogTaiKhoanCSDLDanCuContext.Provider")
    return context
}

export const LogTaiKhoanCSDLDanCuProvider = ({ children }: IWithChildren) => {
    const [maLogTaiKhoanCSDLDanCu, setMaLogTaiKhoanCSDLDanCu] = useState<string>()
    const [LogTaiKhoanCSDLDanCuModalVisible, setLogTaiKhoanCSDLDanCuModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <LogTaiKhoanCSDLDanCuContext.Provider value={{
        maLogTaiKhoanCSDLDanCu, setMaLogTaiKhoanCSDLDanCu, LogTaiKhoanCSDLDanCuModalVisible, setLogTaiKhoanCSDLDanCuModalVisible,
    }}>
        {children}
    </LogTaiKhoanCSDLDanCuContext.Provider>
}