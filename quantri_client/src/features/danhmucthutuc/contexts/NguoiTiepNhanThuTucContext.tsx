import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const NguoiTiepNhanThuTucContext = createContext<INguoiTiepNhanThuTucContext | null>(null)

export interface INguoiTiepNhanThuTucContext {
    NguoiTiepNhanThuTucId: string | undefined;
    setNguoiTiepNhanThuTucId: React.Dispatch<React.SetStateAction<string | undefined>>;
    NguoiTiepNhanThuTucModalVisible: boolean;
    setNguoiTiepNhanThuTucModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    AddCanBoTiepNhanModalVisible: boolean;
    setAddCanBoTiepNhanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    boSungCanBoTiepNhanModalVisible: boolean;
    setBoSungCanBoTiepNhanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

}

export const useNguoiTiepNhanThuTucContext = () => {
    const context = useContext(NguoiTiepNhanThuTucContext)
    if (!context)
        throw new Error("NguoiTiepNhanThuTucContext must be used inside NguoiTiepNhanThuTucContext.Provider")
    return context
}

export const NguoiTiepNhanThuTucProvider = ({ children }: IWithChildren) => {
    const [NguoiTiepNhanThuTucId, setNguoiTiepNhanThuTucId] = useState<string>()
    const [NguoiTiepNhanThuTucModalVisible, setNguoiTiepNhanThuTucModalVisible] = useState<boolean>(false)
    const [AddCanBoTiepNhanModalVisible, setAddCanBoTiepNhanModalVisible] = useState<boolean>(false)
    const [boSungCanBoTiepNhanModalVisible, setBoSungCanBoTiepNhanModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <NguoiTiepNhanThuTucContext.Provider value={{
        NguoiTiepNhanThuTucId, setNguoiTiepNhanThuTucId,
        NguoiTiepNhanThuTucModalVisible, setNguoiTiepNhanThuTucModalVisible,
        setAddCanBoTiepNhanModalVisible, AddCanBoTiepNhanModalVisible,
        boSungCanBoTiepNhanModalVisible, setBoSungCanBoTiepNhanModalVisible
    }}
    >
        {children}
    </NguoiTiepNhanThuTucContext.Provider>
}