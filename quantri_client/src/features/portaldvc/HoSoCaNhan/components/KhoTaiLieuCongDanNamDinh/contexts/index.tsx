import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";
import { ILoaiNhomGiayToCaNhan } from "../models";

const KhoTaiLieuCongDanNamDinhContext = createContext<IKhoTaiLieuCongDanNamDinhContext | null>(null)

export interface IKhoTaiLieuCongDanNamDinhContext {
    taiLieuId: string | undefined;
    setTaiLieuId: React.Dispatch<React.SetStateAction<string | undefined>>;

    typeLoaiNhom: string | undefined;
    setTypeLoaiNhom: React.Dispatch<React.SetStateAction<string | undefined>>;

    loaiGiayTos: ILoaiNhomGiayToCaNhan[] | undefined;
    setLoaiGiayTos: React.Dispatch<React.SetStateAction<ILoaiNhomGiayToCaNhan[] | undefined>>;

    nhomGiayTos: ILoaiNhomGiayToCaNhan[] | undefined;
    setNhomGiayTos: React.Dispatch<React.SetStateAction<ILoaiNhomGiayToCaNhan[] | undefined>>;

    loaiNhomId: string | undefined;
    setLoaiNhomId: React.Dispatch<React.SetStateAction<string | undefined>>;

    detailLoaiNhomGiayToModalVisible: boolean;
    setDetailLoaiNhomModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    reload: boolean;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;

    addGiayToModalVisible: boolean;
    setAddGiayToModalVisible: React.Dispatch<React.SetStateAction<boolean>>;


}

export const useKhoTaiLieuCongDanNamDinhContext = () => {
    const context = useContext(KhoTaiLieuCongDanNamDinhContext)
    if (!context)
        throw new Error("KhoTaiLieuCongDanNamDinhContext must be used inside KhoTaiLieuCongDanNamDinhContext.Provider")
    return context
}

export const KhoTaiLieuCongDanNamDinhProvider = ({ children }: IWithChildren) => {
    const [taiLieuId, setTaiLieuId] = useState<string>()
    const [typeLoaiNhom, setTypeLoaiNhom] = useState<string>()
    const [loaiGiayTos, setLoaiGiayTos] = useState<ILoaiNhomGiayToCaNhan[]>()
    const [nhomGiayTos, setNhomGiayTos] = useState<ILoaiNhomGiayToCaNhan[]>()
    const [loaiNhomId, setLoaiNhomId] = useState<string>()
    const [reload, setReload] = useState<boolean>(false)
    const [detailLoaiNhomGiayToModalVisible, setDetailLoaiNhomModalVisible] = useState<boolean>(false)
    const [addGiayToModalVisible, setAddGiayToModalVisible] = useState<boolean>(false)
    return <KhoTaiLieuCongDanNamDinhContext.Provider value={{
        taiLieuId, setTaiLieuId,
        typeLoaiNhom, setTypeLoaiNhom,
        loaiNhomId, setLoaiNhomId,
        loaiGiayTos, setLoaiGiayTos,
        nhomGiayTos, setNhomGiayTos,
        reload, setReload,
        detailLoaiNhomGiayToModalVisible, setDetailLoaiNhomModalVisible,
        addGiayToModalVisible, setAddGiayToModalVisible,
    }}>
        {children}
    </KhoTaiLieuCongDanNamDinhContext.Provider>
}