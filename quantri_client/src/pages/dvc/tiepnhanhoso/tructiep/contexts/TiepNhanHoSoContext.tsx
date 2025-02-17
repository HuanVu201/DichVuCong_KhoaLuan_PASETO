import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const TiepNhanHoSoContext = createContext<ITiepNhanHoSoContext | null>(null)

export interface ITiepNhanHoSoContext {
    soHoaData: Partial<IGiayToSoHoa> & {onOk: (maGiayToSoHoa: string) => void;} | undefined; // dùng cho khi ấn vào nút số hóa
    setSoHoaData: React.Dispatch<React.SetStateAction<Partial<IGiayToSoHoa> & {onOk: (maGiayToSoHoa: string) => void; loaiSoHoa?: string} | undefined>>;
    khoSoHoaData: {onOk: (dinhKem:string, maGiayToKhoQuocGia: string) => void} | undefined;
    setKhoSoHoaData: React.Dispatch<React.SetStateAction<{onOk: (dinhKem:string, maGiayToKhoQuocGia: string) => void} | undefined>>;
    giayToSoHoaVisible: boolean;
    setGiayToSoHoaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    danhSachGiayToSoHoaModalVisible : boolean;
    setDanhSachGiayToSoHoaModalVisible : React.Dispatch<React.SetStateAction<boolean>>;
}

export const useTiepNhanHoSoContext = () => {
    const context = useContext(TiepNhanHoSoContext)
    if (!context)
        throw new Error("TiepNhanHoSoContext must be used inside TiepNhanHoSoContext.Provider")
    return context
}

export const TiepNhanHoSoProvider = ({ children }: IWithChildren) => {

    const [danhSachGiayToSoHoaModalVisible, setDanhSachGiayToSoHoaModalVisible] = useState<boolean>(false)
    const [giayToSoHoaVisible, setGiayToSoHoaModalVisible] = useState<boolean>(false)
    const [soHoaData, setSoHoaData] = useState<ITiepNhanHoSoContext["soHoaData"]>()
    const [khoSoHoaData, setKhoSoHoaData] = useState<ITiepNhanHoSoContext["khoSoHoaData"]>()
    // thêm các hàm search cho các tabs ở đây
    return <TiepNhanHoSoContext.Provider value={{
        danhSachGiayToSoHoaModalVisible,
        setDanhSachGiayToSoHoaModalVisible,
        giayToSoHoaVisible,
        setGiayToSoHoaModalVisible,
        soHoaData,
        setSoHoaData,
        khoSoHoaData,
        setKhoSoHoaData,
    }}>
        {children}
    </TiepNhanHoSoContext.Provider>
}