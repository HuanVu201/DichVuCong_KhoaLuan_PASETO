import { IThanhPhanThuTucWithSoHoa } from "@/features/hoso/components/ReadOnlyTepDinhKem";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const HoSoLuuTruContext = createContext<IHoSoLuuTruContext | null>(null)

export interface IHoSoLuuTruContext {
    maHoSoLuuTru: string | undefined;
    setMaHoSoLuuTru: React.Dispatch<React.SetStateAction<string | undefined>>;
    maHoSoLuuTruModalVisible: boolean;
    setHoSoLuuTruModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    maTTHCHoSoLuuTru: string | undefined;
    setMaTTHCHoSoLuuTru: React.Dispatch<React.SetStateAction<string | undefined>>;
    donViId: string | undefined;
    setDonViId: React.Dispatch<React.SetStateAction<string | undefined>>;
    maTruongHop: string | undefined;
    setMaTruongHop: React.Dispatch<React.SetStateAction<string | undefined>>;
    

}

export const useHoSoLuuTruContext = () => {
    const context = useContext(HoSoLuuTruContext)
    if (!context)
        throw new Error("HoSoLuuTruContext must be used inside HoSoLuuTruContext.Provider")
    return context
}

export const HoSoLuuTruProvider = ({ children }: IWithChildren) => {
    const [maHoSoLuuTru, setMaHoSoLuuTru] = useState<string>()
    const [maTTHCHoSoLuuTru, setMaTTHCHoSoLuuTru] = useState<string>()
    const [maHoSoLuuTruModalVisible, setHoSoLuuTruModalVisible] = useState<boolean>(false)
    const [donViId, setDonViId] = useState<string>()
    const [maTruongHop, setMaTruongHop] = useState<string>()
    // thêm các hàm search cho các tabs ở đây
    return <HoSoLuuTruContext.Provider value={{
        maHoSoLuuTru, setMaHoSoLuuTru, maHoSoLuuTruModalVisible, setHoSoLuuTruModalVisible, maTTHCHoSoLuuTru, setMaTTHCHoSoLuuTru, donViId, setDonViId, maTruongHop, setMaTruongHop
    }}>
        {children}
    </HoSoLuuTruContext.Provider>
}