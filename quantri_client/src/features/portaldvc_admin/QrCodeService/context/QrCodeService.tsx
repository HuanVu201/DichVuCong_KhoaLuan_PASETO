import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const QrCodeServiceContext = createContext<IQrCodeServiceContext | null>(null)

export interface IQrCodeServiceContext {

    localStorageName: string | 'CreatedQr';
    setLocalStorageName: React.Dispatch<React.SetStateAction<string | 'CreatedQr'>>;
    urlQrView: string | undefined;
    setUrlQrView: React.Dispatch<React.SetStateAction<string | undefined>>;
    creatQrCodeService: boolean;
    setCreatQrCodeService: React.Dispatch<React.SetStateAction<boolean>>;
    viewQrCodeService: boolean;
    setViewQrCodeService: React.Dispatch<React.SetStateAction<boolean>>;
    detailQrCodeServiceModalVisible: boolean;
    setdetailQrCodeServiceModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    reloadTable: boolean;
    setReloadTable: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useQrCodeServiceContext = () => {
    const context = useContext(QrCodeServiceContext)
    if (!context)
        throw new Error("QrCodeServiceContext must be used inside QrCodeServiceContext.Provider")
    return context
}

export const QrCodeServiceProvider = ({ children }: IWithChildren) => {
    const [creatQrCodeService, setCreatQrCodeService] = useState<boolean>(false)
    const [viewQrCodeService, setViewQrCodeService] = useState<boolean>(false)
    const [detailQrCodeServiceModalVisible, setdetailQrCodeServiceModalVisible] = useState<boolean>(false)
    const [urlQrView, setUrlQrView] = useState<string>()
    const [localStorageName, setLocalStorageName] = useState<string>('CreatedQr')
    const [reloadTable, setReloadTable] = useState<boolean>(false)
    return <QrCodeServiceContext.Provider value={{ creatQrCodeService, setCreatQrCodeService, viewQrCodeService, setViewQrCodeService, detailQrCodeServiceModalVisible, setdetailQrCodeServiceModalVisible, urlQrView, setUrlQrView, localStorageName, setLocalStorageName, reloadTable, setReloadTable }}>
        {children}
    </QrCodeServiceContext.Provider>
}