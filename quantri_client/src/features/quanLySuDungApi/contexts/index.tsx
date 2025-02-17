import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const QuanLySuDungAPIContext = createContext<IQuanLySuDungAPIContext | null>(null)

export interface IQuanLySuDungAPIContext {
    apiId: string | undefined;
    setApiId: React.Dispatch<React.SetStateAction<string | undefined>>;
    apiDetailModalVisible: boolean;
    setApiDetailModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    lichSuApiModalVisible: boolean;
    setLichSuApiModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    filterLichSuModalVisible: boolean;
    setFilterLichSuModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    reload: boolean;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useQuanLySuDungAPIContext = () => {
    const context = useContext(QuanLySuDungAPIContext)
    if (!context)
        throw new Error("QuanLySuDungAPIContext must be used inside QuanLySuDungAPIContext.Provider")
    return context
}

export const QuanLySuDungAPIProvider = ({ children }: IWithChildren) => {
    const [apiId, setApiId] = useState<string>()
    const [apiDetailModalVisible, setApiDetailModalVisible] = useState<boolean>(false)
    const [lichSuApiModalVisible, setLichSuApiModalVisible] = useState<boolean>(false)
    const [filterLichSuModalVisible, setFilterLichSuModalVisible] = useState<boolean>(false)
    const [reload, setReload] = useState<boolean>(false)
    return <QuanLySuDungAPIContext.Provider value={{
        apiId, setApiId,
        apiDetailModalVisible, setApiDetailModalVisible,
        lichSuApiModalVisible, setLichSuApiModalVisible,
        filterLichSuModalVisible, setFilterLichSuModalVisible,
        reload, setReload
    }}>
        {children}
    </QuanLySuDungAPIContext.Provider>
}