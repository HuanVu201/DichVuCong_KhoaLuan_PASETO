import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const TramSoHoaContext = createContext<ITramSoHoaContext | null>(null)

export interface ITramSoHoaContext {
    soHoaData: Partial<IGiayToSoHoa> & {onOk: () => void; thanhPhanHoSoId: string} | undefined; // dùng cho khi ấn vào nút số hóa
    setSoHoaData: React.Dispatch<React.SetStateAction<Partial<IGiayToSoHoa> & {onOk: () => void; thanhPhanHoSoId: string; loaiSoHoa?: string} | undefined>>;
    khoSoHoaData: {onOk: (dinhKem:string, maGiayToKhoQuocGia: string) => void} | undefined;
    setKhoSoHoaData: React.Dispatch<React.SetStateAction<{onOk: (dinhKem:string, maGiayToKhoQuocGia: string) => void} | undefined>>;
    giayToSoHoaVisible: boolean;
    setGiayToSoHoaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    danhSachGiayToSoHoaModalVisible : boolean;
    setDanhSachGiayToSoHoaModalVisible : React.Dispatch<React.SetStateAction<boolean>>;
}

export const useTramSoHoaContext = () => {
    const context = useContext(TramSoHoaContext)
    if (!context)
        throw new Error("TiepNhanHoSoContext must be used inside TiepNhanHoSoContext.Provider")
    return context
}

export const TramSoHoaProvider = ({ children }: IWithChildren) => {

    const [danhSachGiayToSoHoaModalVisible, setDanhSachGiayToSoHoaModalVisible] = useState<boolean>(false)
    const [giayToSoHoaVisible, setGiayToSoHoaModalVisible] = useState<boolean>(false)
    const [soHoaData, setSoHoaData] = useState<ITramSoHoaContext["soHoaData"]>()
    const [khoSoHoaData, setKhoSoHoaData] = useState<{onOk: (dinhKem:string, maGiayToKhoQuocGia: string) => void}>()
    // thêm các hàm search cho các tabs ở đây
    return <TramSoHoaContext.Provider value={{
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
    </TramSoHoaContext.Provider>
}