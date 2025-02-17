import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const ThongKeHoSoChungThucContext = createContext<IThongKeHoSoChungThucContext | null>(null)

export interface IThongKeHoSoChungThucContext {
    maThongKeHoSoChungThuc: string | undefined;
    setMaThongKeHoSoChungThuc: React.Dispatch<React.SetStateAction<string | undefined>>;
    laHoSoDienTu: boolean;
    setLaHoSoDienTu: React.Dispatch<React.SetStateAction<boolean>>;
    ThongKeHoSoChungThucModalVisible: boolean;
    setThongKeHoSoChungThucModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

}

export const useThongKeHoSoChungThucContext = () => {
    const context = useContext(ThongKeHoSoChungThucContext)
    if (!context)
        throw new Error("ThongKeHoSoChungThucContext must be used inside ThongKeHoSoChungThucContext.Provider")
    return context
}

export const ThongKeHoSoChungThucProvider = ({ children }: IWithChildren) => {
    const [maThongKeHoSoChungThuc, setMaThongKeHoSoChungThuc] = useState<string>()
    const [laHoSoDienTu, setLaHoSoDienTu] = useState<boolean>(false)
    const [ThongKeHoSoChungThucModalVisible, setThongKeHoSoChungThucModalVisible] = useState<boolean>(false)

    // thêm các hàm search cho các tabs ở đây
    return <ThongKeHoSoChungThucContext.Provider value={{
        maThongKeHoSoChungThuc, setMaThongKeHoSoChungThuc,
        laHoSoDienTu, setLaHoSoDienTu,
        ThongKeHoSoChungThucModalVisible, setThongKeHoSoChungThucModalVisible
    }}>
        {children}
    </ThongKeHoSoChungThucContext.Provider>
}