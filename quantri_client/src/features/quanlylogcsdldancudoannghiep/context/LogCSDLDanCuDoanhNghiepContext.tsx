import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const LogCSDLDanCuDoanhNghiepContext = createContext<ILogCSDLDanCuDoanhNghiepContext | null>(null)

export interface ILogCSDLDanCuDoanhNghiepContext {
    LogCSDLDanCuDoanhNghiepId: string | undefined;
    setLogCSDLDanCuDoanhNghiepId: React.Dispatch<React.SetStateAction<string | undefined>>;
    LogCSDLDanCuDoanhNghiepModalVisible: boolean;
    setLogCSDLDanCuDoanhNghiepModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useLogCSDLDanCuDoanhNghiepContext = () => {
    const context = useContext(LogCSDLDanCuDoanhNghiepContext)
    if (!context)
        throw new Error("LogCSDLDanCuDoanhNghiepContext must be used inside LogCSDLDanCuDoanhNghiepContext.Provider")
    return context
}

export const LogCSDLDanCuDoanhNghiepProvider = ({ children }: IWithChildren) => {
    const [LogCSDLDanCuDoanhNghiepId, setLogCSDLDanCuDoanhNghiepId] = useState<string>()
    const [LogCSDLDanCuDoanhNghiepModalVisible, setLogCSDLDanCuDoanhNghiepModalVisible] = useState<boolean>(false)
    return <LogCSDLDanCuDoanhNghiepContext.Provider value={{
        LogCSDLDanCuDoanhNghiepId, setLogCSDLDanCuDoanhNghiepId,
        LogCSDLDanCuDoanhNghiepModalVisible, setLogCSDLDanCuDoanhNghiepModalVisible
    }}>
        {children}
    </LogCSDLDanCuDoanhNghiepContext.Provider>
}