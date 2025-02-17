import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const KhoTaiLieuDienTuContext = createContext<IKhoTaiLieuDienTuContext | null>(null)

export interface IKhoTaiLieuDienTuContext {
    khoTaiLieuDienTuId: string | undefined;
    setKhoTaiLieuDienTuId: React.Dispatch<React.SetStateAction<string | undefined>>;
    giayToSoHoaItem: IGiayToSoHoa | undefined;
    setGiayToSoHoaItem: React.Dispatch<React.SetStateAction<IGiayToSoHoa | undefined>>;
    giayToId: string | undefined;
    setGiayToId: React.Dispatch<React.SetStateAction<string | undefined>>;
    giayToVaoKhoId: string | undefined;
    setGiayToVaoKhoId: React.Dispatch<React.SetStateAction<string | undefined>>;
    giayToXoaKhoiKhoId: string | undefined;
    setGiayToXoaKhoiKhoId: React.Dispatch<React.SetStateAction<string | undefined>>;
    giayToXoaKhoiKhoDuocChiaSeId: string | undefined;
    setGiayToXoaKhoiKhoDuocChiaSeId: React.Dispatch<React.SetStateAction<string | undefined>>;
    typeDanhSachTaiLieu: string | undefined;
    setTypeDanhSachTaiLieu: React.Dispatch<React.SetStateAction<string | undefined>>;
    danhSachGiayToTrongKhoModalVisible: boolean;
    setDanhSachGiayToTrongKhoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    themGiayToVaoKhoModalVisible: boolean;
    setThemGiayToVaoKhoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    detailKhoTaiLieuModalVisible: boolean;
    setDetailKhoTaiLieuModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    detailVersionModalVisible: boolean;
    setDetailVersionModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    reload: boolean;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
    taiLieuDetailModalVisible: boolean;
    setTaiLieuDetailModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    chiaSeTaiLieuModalVisible: boolean;
    setChiaSeTaiLieuModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    taiLieuDuocChiaSeModalVisible: boolean;
    setTaiLieuDuocChiaSeModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    gtshThuHoiChiaSeId: string | undefined;
    setGtshThuHoiChiaSeId: React.Dispatch<React.SetStateAction<string | undefined>>;

    taiLieuDaChiaSeModalVisible: boolean;
    setTaiLieuDaChiaSeModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

}

export const useKhoTaiLieuDienTuContext = () => {
    const context = useContext(KhoTaiLieuDienTuContext)
    if (!context)
        throw new Error("KhoTaiLieuDienTuContext must be used inside KhoTaiLieuDienTuContext.Provider")
    return context
}

export const KhoTaiLieuDienTuProvider = ({ children }: IWithChildren) => {
    const [khoTaiLieuDienTuId, setKhoTaiLieuDienTuId] = useState<string>()
    const [giayToSoHoaItem, setGiayToSoHoaItem] = useState<IGiayToSoHoa>()
    const [giayToId, setGiayToId] = useState<string>()
    const [giayToVaoKhoId, setGiayToVaoKhoId] = useState<string>()
    const [giayToXoaKhoiKhoId, setGiayToXoaKhoiKhoId] = useState<string>()
    const [danhSachGiayToTrongKhoModalVisible, setDanhSachGiayToTrongKhoModalVisible] = useState<boolean>(false)
    const [themGiayToVaoKhoModalVisible, setThemGiayToVaoKhoModalVisible] = useState<boolean>(false)
    const [detailVersionModalVisible, setDetailVersionModalVisible] = useState<boolean>(false)
    const [detailKhoTaiLieuModalVisible, setDetailKhoTaiLieuModalVisible] = useState<boolean>(false)
    const [chiaSeTaiLieuModalVisible, setChiaSeTaiLieuModalVisible] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [reload, setReload] = useState<boolean>(false)
    const [typeDanhSachTaiLieu, setTypeDanhSachTaiLieu] = useState<string>()
    const [taiLieuDetailModalVisible, setTaiLieuDetailModalVisible] = useState<boolean>(false)
    const [taiLieuDuocChiaSeModalVisible, setTaiLieuDuocChiaSeModalVisible] = useState<boolean>(false)
    const [gtshThuHoiChiaSeId, setGtshThuHoiChiaSeId] = useState<string>()
    const [taiLieuDaChiaSeModalVisible, setTaiLieuDaChiaSeModalVisible] = useState<boolean>(false)
    const [giayToXoaKhoiKhoDuocChiaSeId, setGiayToXoaKhoiKhoDuocChiaSeId] = useState<string>()
    return <KhoTaiLieuDienTuContext.Provider value={{
        khoTaiLieuDienTuId, setKhoTaiLieuDienTuId,
        giayToSoHoaItem, setGiayToSoHoaItem,
        giayToId, setGiayToId,
        giayToVaoKhoId, setGiayToVaoKhoId,
        giayToXoaKhoiKhoId, setGiayToXoaKhoiKhoId,
        danhSachGiayToTrongKhoModalVisible, setDanhSachGiayToTrongKhoModalVisible,
        themGiayToVaoKhoModalVisible, setThemGiayToVaoKhoModalVisible,
        detailKhoTaiLieuModalVisible, setDetailKhoTaiLieuModalVisible,
        detailVersionModalVisible, setDetailVersionModalVisible,
        loading, setLoading,
        reload, setReload,
        typeDanhSachTaiLieu, setTypeDanhSachTaiLieu,
        chiaSeTaiLieuModalVisible, setChiaSeTaiLieuModalVisible,
        taiLieuDetailModalVisible, setTaiLieuDetailModalVisible,
        taiLieuDuocChiaSeModalVisible, setTaiLieuDuocChiaSeModalVisible,
        gtshThuHoiChiaSeId, setGtshThuHoiChiaSeId,
        taiLieuDaChiaSeModalVisible, setTaiLieuDaChiaSeModalVisible,
        giayToXoaKhoiKhoDuocChiaSeId, setGiayToXoaKhoiKhoDuocChiaSeId
    }}>
        {children}
    </KhoTaiLieuDienTuContext.Provider>
}