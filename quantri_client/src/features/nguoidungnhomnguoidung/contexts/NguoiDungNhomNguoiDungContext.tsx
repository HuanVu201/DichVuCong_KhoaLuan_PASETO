import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const NguoiDungNhomNguoiDungContext = createContext<INguoiDungNhomNguoiDungContext | null>(null)

export interface INguoiDungNhomNguoiDungContext{
    nguoiDungNhomNguoiDungId: string | undefined;
    setNguoiDungNhomNguoiDungId: React.Dispatch<React.SetStateAction<string | undefined>>;

    danhSachNguoiDungModalVisible: boolean;
    setDanhSachNguoiDungModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    themNguoiDungModalVisible: boolean;
    setThemNguoiDungModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    phanQuyenNguoiDungModalVisible : boolean;
    setPhanQuyenNguoiDungModalVisible : React.Dispatch<React.SetStateAction<boolean>>;
}

export const useNguoiDungNhomNguoiDungContext = () => {
    const context = useContext(NguoiDungNhomNguoiDungContext)
    if(!context)
        throw new Error("NguoiDungNhomNguoiDungContext must be used inside NguoiDungNhomNguoiDungContext.Provider")
    return context
}

export const NguoiDungNhomNguoiDungProvider = ({children}: IWithChildren) => {
    const [nguoiDungNhomNguoiDungId, setNguoiDungNhomNguoiDungId] = useState<string>()
    const [danhSachNguoiDungModalVisible, setDanhSachNguoiDungModalVisible] = useState<boolean>(false)
    const [phanQuyenNguoiDungModalVisible, setPhanQuyenNguoiDungModalVisible] = useState<boolean>(false)
    const [themNguoiDungModalVisible, setThemNguoiDungModalVisible] = useState<boolean>(false)
    return <NguoiDungNhomNguoiDungContext.Provider value={{
        phanQuyenNguoiDungModalVisible,
        setPhanQuyenNguoiDungModalVisible,
        nguoiDungNhomNguoiDungId, 
        setNguoiDungNhomNguoiDungId, 
        danhSachNguoiDungModalVisible, 
        setDanhSachNguoiDungModalVisible,
        themNguoiDungModalVisible,
        setThemNguoiDungModalVisible}}>
        {children}
    </NguoiDungNhomNguoiDungContext.Provider> 
}