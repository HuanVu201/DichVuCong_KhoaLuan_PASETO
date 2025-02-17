import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";
import { ILoaiNhomGiayToCaNhan } from "../../KhoTaiLieuCongDanNamDinh/models";

const KhoTaiLieuCongDanContext = createContext<IKhoTaiLieuCongDanContext | null>(null)

export interface IKhoTaiLieuCongDanContext {
    taiLieuId: string | undefined;
    setTaiLieuId: React.Dispatch<React.SetStateAction<string | undefined>>;
    taiLieuDuocChiaSeId: string | undefined;
    setTaiLieuDuoChiaSeId: React.Dispatch<React.SetStateAction<string | undefined>>;
    chiaSeTaiLieuCongDanModalVisible: boolean;
    setChiaSeTaiLieuCongDanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    detailTaiLieuCongDanModalVisible: boolean;
    setDetailTaiLieuCongDanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    reload: boolean;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
    typeLoaiNhom: string | undefined;
    setTypeLoaiNhom: React.Dispatch<React.SetStateAction<string | undefined>>;

    loaiNhomId: string | undefined;
    setLoaiNhomId: React.Dispatch<React.SetStateAction<string | undefined>>;

    detailLoaiNhomGiayToModalVisible: boolean;
    setDetailLoaiNhomGiayToModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    loaiGiayTos: ILoaiNhomGiayToCaNhan[] | undefined;
    setLoaiGiayTos: React.Dispatch<React.SetStateAction<ILoaiNhomGiayToCaNhan[] | undefined>>;

    nhomGiayTos: ILoaiNhomGiayToCaNhan[] | undefined;
    setNhomGiayTos: React.Dispatch<React.SetStateAction<ILoaiNhomGiayToCaNhan[] | undefined>>;

}

export const useKhoTaiLieuCongDanContext = () => {
    const context = useContext(KhoTaiLieuCongDanContext)
    if (!context)
        throw new Error("KhoTaiLieuCongDanContext must be used inside KhoTaiLieuCongDanContext.Provider")
    return context
}

export const KhoTaiLieuCongDanProvider = ({ children }: IWithChildren) => {
    const [taiLieuId, setTaiLieuId] = useState<string>()
    const [loaiNhomId, setLoaiNhomId] = useState<string>()
    const [taiLieuDuocChiaSeId, setTaiLieuDuoChiaSeId] = useState<string>()
    const [detailTaiLieuCongDanModalVisible, setDetailTaiLieuCongDanModalVisible] = useState<boolean>(false)
    const [typeLoaiNhom, setTypeLoaiNhom] = useState<string>()
    const [chiaSeTaiLieuCongDanModalVisible, setChiaSeTaiLieuCongDanModalVisible] = useState<boolean>(false)
    const [reload, setReload] = useState<boolean>(false)
    const [detailLoaiNhomGiayToModalVisible, setDetailLoaiNhomGiayToModalVisible] = useState<boolean>(false)
    const [loaiGiayTos, setLoaiGiayTos] = useState<ILoaiNhomGiayToCaNhan[]>()
    const [nhomGiayTos, setNhomGiayTos] = useState<ILoaiNhomGiayToCaNhan[]>()
    return <KhoTaiLieuCongDanContext.Provider value={{
        taiLieuId, setTaiLieuId,
        loaiNhomId, setLoaiNhomId,
        typeLoaiNhom, setTypeLoaiNhom,
        taiLieuDuocChiaSeId, setTaiLieuDuoChiaSeId,
        chiaSeTaiLieuCongDanModalVisible, setChiaSeTaiLieuCongDanModalVisible,
        detailTaiLieuCongDanModalVisible, setDetailTaiLieuCongDanModalVisible,
        reload, setReload,
        detailLoaiNhomGiayToModalVisible, setDetailLoaiNhomGiayToModalVisible,
        loaiGiayTos, setLoaiGiayTos,
        nhomGiayTos, setNhomGiayTos,
    }}>
        {children}
    </KhoTaiLieuCongDanContext.Provider>
}