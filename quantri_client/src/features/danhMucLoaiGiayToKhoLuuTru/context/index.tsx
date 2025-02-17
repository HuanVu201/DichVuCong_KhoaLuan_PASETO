import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const LoaiGiayToKhoLuuTruContext = createContext<ILoaiGiayToKhoLuuTruContext | null>(null)

export interface ILoaiGiayToKhoLuuTruContext {
    loaiGiayToKhoLuuTruId: string | undefined;
    setLoaiGiayToKhoLuuTruId: React.Dispatch<React.SetStateAction<string | undefined>>;
    loaiGiayToKhoLuuTruModalVisible: boolean;
    setLoaiGiayToKhoLuuTruModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    editEFormModalVisible: boolean;
    setEditEFormModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useLoaiGiayToKhoLuuTruContext = () => {
    const context = useContext(LoaiGiayToKhoLuuTruContext)
    if (!context)
        throw new Error("LoaiGiayToKhoLuuTruContext must be used inside LoaiGiayToKhoLuuTruContext.Provider")
    return context
}

export const LoaiGiayToKhoLuuTruProvider = ({ children }: IWithChildren) => {
    const [loaiGiayToKhoLuuTruId, setLoaiGiayToKhoLuuTruId] = useState<string>()
    const [loaiGiayToKhoLuuTruModalVisible, setLoaiGiayToKhoLuuTruModalVisible] = useState<boolean>(false)
    const [editEFormModalVisible, setEditEFormModalVisible] = useState<boolean>(false)
    return <LoaiGiayToKhoLuuTruContext.Provider value={{
        loaiGiayToKhoLuuTruId, setLoaiGiayToKhoLuuTruId,
        loaiGiayToKhoLuuTruModalVisible, setLoaiGiayToKhoLuuTruModalVisible,
        editEFormModalVisible, setEditEFormModalVisible,
    }}>
        {children}
    </LoaiGiayToKhoLuuTruContext.Provider>
}