import { IWithChildren } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { hoSoApi } from "../services";
import { giayToHoSoApi } from "@/features/giaytohoso/service";
import { toast } from "react-toastify";
import { IHoSo } from "../models";
import { MA_PHIEU_TIEP_NHAN_VA_HEN_TRA_KET_QUA, TEN_PHIEU_TIEP_NHAN_VA_HEN_TRA_KET_QUA } from "@/pages/dvc/MauPhieu/documents/pdf";
import axiosInstance from "@/lib/axios";
import { IResult } from "@/models";
import { API_VERSION, CURRENTTIME_ISOSTRING, ID_SEPARATE, UPLOADFILE_ENDPOINT } from "@/data";
import { btnSignClick, getAutoPositionSigned } from "@/utils/common";
import axios from "axios";
import { fileApi } from "@/features/file/services";
import { useAppSelector } from "@/lib/redux/Hooks";

const XuLyHoSoContext = createContext<IXuLyHoSoContext | null>(null);

export interface IXuLyHoSoContext {

    hoSo: IHoSo | null,
    setHoSo: React.Dispatch<React.SetStateAction<IHoSo | null>>;
    urlPdfPhieu: string | undefined,
    setUrlPdfPhieu: React.Dispatch<React.SetStateAction<string | undefined>>;
    maGiayToHoSo: string | undefined,
    setMaGiayToHoSo: React.Dispatch<React.SetStateAction<string | undefined>>;
    qrTraCuu: string | undefined,
    setQrTraCuu: React.Dispatch<React.SetStateAction<string | undefined>>;
    qrThongTinPhieu: string | undefined,
    setQrThongTinPhieu: React.Dispatch<React.SetStateAction<string | undefined>>;
    barcodeThongTinPhieu: string | undefined,
    setBarcodeThongTinPhieu: React.Dispatch<React.SetStateAction<string | undefined>>;
    docxBlob: Blob | undefined,
    setDocxBlob: React.Dispatch<React.SetStateAction<Blob | undefined>>;
    pdfBlob: Blob | undefined,
    setPdfBlob: React.Dispatch<React.SetStateAction<Blob | undefined>>;
    reload: boolean
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
    existedGiayToHoSo: boolean
    setExistedGiayToHoSo: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    kyDienTuModalVisible: boolean
    setKyDienTuModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    xuatWord: boolean
    setXuatWord: React.Dispatch<React.SetStateAction<boolean>>;
    
    urlChuKyDienTu: string | undefined,
    setUrlChuKyDienTu: React.Dispatch<React.SetStateAction<string | undefined>>;
    base64transparent: string,
    base64ChuKyDienTu: string,
    setBase64ChuKyDienTu: React.Dispatch<React.SetStateAction<string>>;
    urlChuKyCongDan: string,
    setUrlChuKyCongDan: React.Dispatch<React.SetStateAction<string>>;

    handlerXuatLaiPhieu: () => void;
    handlerKySo: (signPos: string) => void;
    handlerGuiCongDan: () => void;

}


export const useXuLyHoSoContext = () => {
    const context = useContext(XuLyHoSoContext);
    if (!context)
        throw new Error(
            "XuLyHoSoContext must be used inside XuLyHoSoContext.Provider"
        );
    return context;
};


export const XuLyHoSoProvider = ({ children }: IWithChildren) => {
    const { data: user } = useAppSelector(state => state.user)
    const handlerXuatLaiPhieu = async () => {
        //Cập nhật suDung=false cho phiếu cũ trước khi tạo phiếu mới
        setLoading(true)
        setUrlPdfPhieu(undefined)
        const resUpdate = await giayToHoSoApi.UpdateGTHSWithMaGiayTo({
            maGiayTo: maGiayToHoSo,
            suDung: false
        })

        setReload(true)
        setExistedGiayToHoSo(false)
        //Tại nơi xử lý phiếu sẽ không tìm được thông tin phiếu suDung=true => tự động tạo phiếu mới và render lại
    }

    const handlerKySo = async (signPos: string) => {

        let urlPdfPhieuRequest: string = ''
        let idGiayToHoSo: string = ''
        let signedDigital: boolean = false
        if (urlPdfPhieu) {
            try {
                const { data: {
                    data: {
                        hasDigitalSinature
                    }
                } } = await fileApi.VerifyDigitalSignature(urlPdfPhieu.split(ID_SEPARATE))
                if (hasDigitalSinature) {
                    signedDigital = true
                    toast.warning("Phiếu đã được ký số!")
                }

            } catch {
                toast.warn('Có lỗi khi kiểm tra ký số!')
            }
        }

        if (pdfBlob && !signedDigital) {

            await btnSignClick(
                URL.createObjectURL(pdfBlob as Blob),
                'XuatPhieu',
                (urlFileSigned, oldFile) => {
                    urlPdfPhieuRequest = urlFileSigned

                }, async (fileName: string) => {
                    const res = await axios.get(fileName, { responseType: "blob" })
                    return res.data
                }, [{
                    name: 'Chữ ký',
                    isDefault: true,
                    appearance: {
                    },
                    autoPosition: {
                        ...getAutoPositionSigned(user?.fullName ?? "", signPos),
                    }
                }], true
            )
        }
        if (urlPdfPhieuRequest && !signedDigital) {
            // setKySo(true)
            const resUpdate = await giayToHoSoApi.UpdateGTHSWithMaGiayTo({
                maGiayTo: maGiayToHoSo,
                pdfPhieu: urlPdfPhieuRequest
            })
            setUrlPdfPhieu(urlPdfPhieuRequest)
            const valueGetPdf = fileApi.GetFileByte({ path: urlPdfPhieuRequest })
            valueGetPdf.then(function (result) {
                setPdfBlob(result.data)

            }).catch(function (error) {
                console.log(error);
            });
            // setReload(true)
        }
    }




    const handlerGuiCongDan = async () => {
        setLoading(true)
        let signedDigital: boolean = true
        if (urlPdfPhieu) {
            try {
                const { data: {
                    data: {
                        hasDigitalSinature
                    }
                } } = await fileApi.VerifyDigitalSignature(urlPdfPhieu.split(ID_SEPARATE))
                if (!hasDigitalSinature) {
                    signedDigital = false
                    toast.warning("Ký số trước khi gửi công dân!")
                }
            } catch {
                toast.warn('Có lỗi khi kiểm tra ký số!')
            }
        }

        if (signedDigital && hoSo) {
            try {
                const res = await hoSoApi.GuiPhieuTiepNhanHoSo({
                    hoSoId: hoSo?.id,
                    maGiayToHoSo: maGiayToHoSo
                })
                if (res.status == 201) {
                    toast.success("Đã gửi công dân!")
                    const resUpdate = await giayToHoSoApi.UpdateGTHSWithMaGiayTo({
                        maGiayTo: maGiayToHoSo,
                        ngayGuiCongDan: CURRENTTIME_ISOSTRING,
                        trangThaiGuiCongDan: 'Đã gửi',
                        nguoiGuiCongDan: user?.fullName || user?.userName,

                    })
                }
                else {
                    toast.error("Gửi công dân thất bại!")
                }
            } catch {
                toast.warn('Có lỗi thực hiện gửi!')
            }
        }
        setLoading(false)

    }
    const base64transparent = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=`
    const [docxBlob, setDocxBlob] = useState<Blob>()
    const [pdfBlob, setPdfBlob] = useState<Blob>()
    const [hoSo, setHoSo] = useState<IHoSo | null>(null)
    const [urlPdfPhieu, setUrlPdfPhieu] = useState<string>()
    const [maGiayToHoSo, setMaGiayToHoSo] = useState<string>()
    const [qrTraCuu, setQrTraCuu] = useState<string>()
    const [qrThongTinPhieu, setQrThongTinPhieu] = useState<string>()
    const [barcodeThongTinPhieu, setBarcodeThongTinPhieu] = useState<string>()
    const [reload, setReload] = useState<boolean>(false)
    const [existedGiayToHoSo, setExistedGiayToHoSo] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [xuatWord, setXuatWord] = useState<boolean>(false)
    const [urlChuKyDienTu, setUrlChuKyDienTu] = useState<string>()
    const [base64ChuKyDienTu, setBase64ChuKyDienTu] = useState<string>(base64transparent)
    const [urlChuKyCongDan, setUrlChuKyCongDan] = useState<string>(base64transparent)
    const [kyDienTuModalVisible, setKyDienTuModalVisible] = useState<boolean>(false)

    useEffect(() => {
        if (pdfBlob)
            setLoading(false)
    }, [pdfBlob])

    return (
        <XuLyHoSoContext.Provider
            value={{
                docxBlob,
                setDocxBlob,
                pdfBlob, setPdfBlob,
                qrTraCuu,
                setQrTraCuu,
                qrThongTinPhieu, setQrThongTinPhieu,
                barcodeThongTinPhieu, setBarcodeThongTinPhieu,
                handlerXuatLaiPhieu,
                handlerKySo,
                handlerGuiCongDan,
                hoSo, setHoSo,
                maGiayToHoSo, setMaGiayToHoSo,
                reload, setReload,
                existedGiayToHoSo, setExistedGiayToHoSo,
                urlPdfPhieu, setUrlPdfPhieu,
                loading, setLoading,
                urlChuKyDienTu, setUrlChuKyDienTu,
                base64transparent,
                base64ChuKyDienTu, setBase64ChuKyDienTu,
                kyDienTuModalVisible, setKyDienTuModalVisible,
                xuatWord, setXuatWord,
                urlChuKyCongDan, setUrlChuKyCongDan
            }}
        >
            {children}
        </XuLyHoSoContext.Provider>
    );
};
