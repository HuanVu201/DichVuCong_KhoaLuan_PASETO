import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";
import { ISearchQuanLyTaiKhoanDinhDanhParams } from "../models/QuanLyTaiKhoanModel";

const QuanLyDinhDanhCongDanContext = createContext<IQuanLyDinhDanhCongDanContext | null>(null)

export interface IQuanLyDinhDanhCongDanContext {
    userId: string | undefined;
    setUserId: React.Dispatch<React.SetStateAction<string | undefined>>;

    userName: string | undefined;
    setUserName: React.Dispatch<React.SetStateAction<string | undefined>>;
    
    reload: boolean;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;

    detailUserModalVisible: boolean;
    setDetailUserModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    detailThongKeModalVisible: boolean;
    setDetailThongKeModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    filterThongKeModalVisible: boolean;
    setFilterThongKeModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    filterTaiKhoanParams: ISearchQuanLyTaiKhoanDinhDanhParams;
    setFilterTaiKhoanParams: React.Dispatch<React.SetStateAction<ISearchQuanLyTaiKhoanDinhDanhParams>>

    soDinhDanh: string | undefined;
    setSoDinhDanh: React.Dispatch<React.SetStateAction<string | undefined>>;

    khoTaiLieuDienTuModalVisible: boolean;
    setKhoTaiLieuDienTuModalVisible: React.Dispatch<React.SetStateAction<boolean>>;


}

export const useQuanLyDinhDanhContext = () => {
    const context = useContext(QuanLyDinhDanhCongDanContext)
    if (!context)
        throw new Error("QuanLyDinhDanhCongDanContext must be used inside QuanLyDinhDanhCongDanContext.Provider")
    return context
}

export const QuanLyDinhDanhCongDanProvider = ({ children }: IWithChildren) => {
    const [userId, setUserId] = useState<string>()
    const [userName, setUserName] = useState<string>()
    const [reload, setReload] = useState<boolean>(false)
    const [detailUserModalVisible, setDetailUserModalVisible] = useState<boolean>(false)
    const [detailThongKeModalVisible, setDetailThongKeModalVisible] = useState<boolean>(false)
    const [filterThongKeModalVisible, setFilterThongKeModalVisible] = useState<boolean>(false)
    const [soDinhDanh, setSoDinhDanh] = useState<string>()
    const [khoTaiLieuDienTuModalVisible, setKhoTaiLieuDienTuModalVisible] = useState<boolean>(false)


    const [filterTaiKhoanParams, setFilterTaiKhoanParams] = useState<ISearchQuanLyTaiKhoanDinhDanhParams>({
        pageNumber: 1, pageSize: 10
    })


    return <QuanLyDinhDanhCongDanContext.Provider value={{
        userId, setUserId,
        reload, setReload,
        userName, setUserName,
        detailUserModalVisible, setDetailUserModalVisible,
        detailThongKeModalVisible, setDetailThongKeModalVisible,
        filterTaiKhoanParams, setFilterTaiKhoanParams,
        filterThongKeModalVisible, setFilterThongKeModalVisible,
        soDinhDanh, setSoDinhDanh,
        khoTaiLieuDienTuModalVisible, setKhoTaiLieuDienTuModalVisible
    }}>
        {children}
    </QuanLyDinhDanhCongDanContext.Provider>
}