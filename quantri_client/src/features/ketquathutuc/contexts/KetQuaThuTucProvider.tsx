import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const KetQuaThuTucContext = createContext<IKetQuaThuTucContext | null>(null)

export interface IKetQuaThuTucContext {
    maKetQuaThuTuc: string | undefined;
    setMaKetQuaThuTuc: React.Dispatch<React.SetStateAction<string | undefined>>;
    ketQuaThuTucModalVisible: boolean;
    setKetQuaThuTucModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    eFormVisible: boolean;
    setEFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
    thuTucId: string | undefined;
    setThuTucId: React.Dispatch<React.SetStateAction<string | undefined>>;
    dinhKemMauPhoiModalVisible: boolean;
    setDinhKemMauPhoiModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    thongKeKetQuaTTHCModalVisible: boolean;
    setThongKeKetQuaTTHCModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    traCuuKetQuaTTHCModalVisible: boolean;
    seTraCuuKetQuaTTHCModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    maGiayTo: string | undefined;
    setMaGiayTo: React.Dispatch<React.SetStateAction<string | undefined>>;
    eFormKetQuaTTHCVisible: boolean;
    setEFormKetQuaTTHCVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useKetQuaThuTucContext = () => {
    const context = useContext(KetQuaThuTucContext)
    if (!context)
        throw new Error("KetQuaThuTucContext must be used inside KetQuaThuTucContext.Provider")
    return context
}

export const KetQuaThuTucProvider = ({ children }: IWithChildren) => {
    const [maKetQuaThuTuc, setMaKetQuaThuTuc] = useState<string>()
    const [maGiayTo, setMaGiayTo] = useState<string>()
    const [thuTucId, setThuTucId] = useState<string>()
    const [ketQuaThuTucModalVisible, setKetQuaThuTucModalVisible] = useState<boolean>(false)
    const [dinhKemMauPhoiModalVisible, setDinhKemMauPhoiModalVisible] = useState<boolean>(false)
    const [thongKeKetQuaTTHCModalVisible, setThongKeKetQuaTTHCModalVisible] = useState<boolean>(false)
    const [traCuuKetQuaTTHCModalVisible, seTraCuuKetQuaTTHCModalVisible] = useState<boolean>(false)
    const [eFormVisible, setEFormVisible] = useState<boolean>(false)
    const [eFormKetQuaTTHCVisible, setEFormKetQuaTTHCVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <KetQuaThuTucContext.Provider value={{
        maKetQuaThuTuc,
        setMaKetQuaThuTuc,
        ketQuaThuTucModalVisible,
        setKetQuaThuTucModalVisible,
        eFormVisible,
        setEFormVisible,
        thuTucId, setThuTucId,
        dinhKemMauPhoiModalVisible, setDinhKemMauPhoiModalVisible,
        thongKeKetQuaTTHCModalVisible, setThongKeKetQuaTTHCModalVisible,
        traCuuKetQuaTTHCModalVisible, seTraCuuKetQuaTTHCModalVisible,
        maGiayTo, setMaGiayTo,
        eFormKetQuaTTHCVisible, setEFormKetQuaTTHCVisible
    }}>
        {children}
    </KetQuaThuTucContext.Provider>
}