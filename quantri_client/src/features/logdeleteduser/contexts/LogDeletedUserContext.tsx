import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const LogDeletedUserContext = createContext<ILogDeletedUserContext | null>(null)

export interface ILogDeletedUserContext {
    maLogDeletedUser: string | undefined;
    setMaLogDeletedUser: React.Dispatch<React.SetStateAction<string | undefined>>;
    LogDeletedUserModalVisible: boolean;
    setLogDeletedUserModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useLogDeletedUserContext = () => {
    const context = useContext(LogDeletedUserContext)
    if (!context)
        throw new Error("LogDeletedUserContext must be used inside LogDeletedUserContext.Provider")
    return context
}

export const LogDeletedUserProvider = ({ children }: IWithChildren) => {
    const [maLogDeletedUser, setMaLogDeletedUser] = useState<string>()
    const [LogDeletedUserModalVisible, setLogDeletedUserModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <LogDeletedUserContext.Provider value={{
        maLogDeletedUser, setMaLogDeletedUser, LogDeletedUserModalVisible, setLogDeletedUserModalVisible,
    }}>
        {children}
    </LogDeletedUserContext.Provider>
}