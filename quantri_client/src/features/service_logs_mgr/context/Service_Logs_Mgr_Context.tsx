import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const Service_Logs_MgrContext = createContext<IService_Logs_MgrContext | null>(null)

export interface IService_Logs_MgrContext {
    Service_Logs_MgrId: string | undefined;
    setService_Logs_MgrId: React.Dispatch<React.SetStateAction<string | undefined>>;
    Service_Logs_MgrModalVisible: boolean;
    setService_Logs_MgrModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useService_Logs_Mgr_Context = () => {
    const context = useContext(Service_Logs_MgrContext)
    if (!context)
        throw new Error("Service_Logs_MgrContext must be used inside Service_Logs_MgrContext.Provider")
    return context
}

export const Service_Logs_Mgr_Provider = ({ children }: IWithChildren) => {
    const [Service_Logs_MgrId, setService_Logs_MgrId] = useState<string>()
    const [Service_Logs_MgrModalVisible, setService_Logs_MgrModalVisible] = useState<boolean>(false)
    return <Service_Logs_MgrContext.Provider value={{
        Service_Logs_MgrId, setService_Logs_MgrId,
        Service_Logs_MgrModalVisible, setService_Logs_MgrModalVisible
    }}>
        {children}
    </Service_Logs_MgrContext.Provider>
}