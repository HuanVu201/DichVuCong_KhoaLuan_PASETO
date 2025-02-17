import { FORMAT_DATE_WITHOUT_TIME, HOST_PATH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, PDF_TEN_TINH_LOWER_CASE, API_VERSION, UPLOADFILE_ENDPOINT, CURRENTTIME_ISOSTRING } from "@/data"
import { CURRENTTIME, DATE, MONTH, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import JsBarcode from 'jsbarcode'
import QrCode from 'qrcode'
import dayjs from 'dayjs'
import { QRCodeByLink } from "../QRCodeByLink"
import { giayToHoSoApi } from "@/features/giaytohoso/service"
import { EXPAND_OFFICE_NAME, MA_PHIEU_TU_CHOI_TIEP_NHAN_TRUC_TUYEN, TEN_BO_PHAN, TEN_PHIEU_TU_CHOI_TIEP_NHAN_TRUC_TUYEN, TEN_TRUNG_TAM } from ".."
import { useXuLyHoSoContext } from "@/features/hoso/contexts/XuLyHoSoContext"
import { toast } from "react-toastify"
import { generateDocxWithImages } from "@/utils/common"
import { fileApi } from "@/features/file/services"
import { getFile } from "@/utils"
import { IThanhPhanHoSo } from "@/features/thanhphanhoso/models"
import { IResult } from "@/models"
import axiosInstance from "@/lib/axios"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { GetUrlPhoi } from "@/features/quanlymauphoi/redux/action"
import saveAs from "file-saver"

export const PhieuTuChoiTiepNhanTrucTuyen = ({ lyDoTuChoi, setUrlPhieu, maGiayToHoSo, setMaGiayToHoSo, pdfBlob, setPdfBlob, xuatWord, setXuatWord, onChangeLyDo, loadingPhieu, setLoadingPhieu }:
    {
        lyDoTuChoi: string | undefined, setUrlPhieu: (url: string) => void,
        maGiayToHoSo: string | undefined, setMaGiayToHoSo: (maGiayToHoSo: string | undefined) => void,
        pdfBlob: Blob | undefined, setPdfBlob: (pdfBlob: Blob | undefined) => void,

        onChangeLyDo: boolean,
        loadingPhieu: boolean, setLoadingPhieu: (onchange: boolean) => void,
        xuatWord: boolean, setXuatWord: (onchange: boolean) => void
    }) => {

    const { data: user } = useAppSelector(state => state.user)
    const [hoSo, setHoSo] = useState<IHoSo>()
    // const [existedGiayToHoSo, setExistedGiayToHoSo] = useState<boolean>(true)
    const buttonActionContext = useButtonActionContext()
    const dispatch = useAppDispatch()
    const [maTinh, setMaTinh] = useState<string>()
    const [tenTinh, setTenTinh] = useState<string>()
    const { publicModule: config } = useAppSelector(state => state.config)
    const [locationOrigin, setLocationOrigin] = useState<string>();
    const [usingQrCode, setUsingQrCode] = useState<boolean>(false);

    useEffect(() => {
        config?.map((item: any) => {
            if (item.code == 'ten-mien-dvc') {
                setLocationOrigin(item.content)
            }
            if (item.code == 'use-qr-code' && item.content == 1) {
                setUsingQrCode(true)
            }
        })
    }, [config])

    useEffect(() => {
        if (xuatWord) {
            setHoSo(undefined)
        }
    }, [xuatWord])

    useEffect(() => {
        (async () => {
            if (buttonActionContext.selectedHoSos.length && !hoSo) {
                setLoadingPhieu(true)
                const res = await hoSoApi.XuatPhieuAction({
                    id: buttonActionContext.selectedHoSos[0] as string,
                    loaiPhoi: 'mau-phoi-phieu',
                    code: 'phieu-tu-choi-tiep-nhan-truc-tuyen',
                    tenGiayTo: 'Phiếu từ chối hồ sơ nộp trực tuyến',
                    maLoaiPhieu: `${MA_PHIEU_TU_CHOI_TIEP_NHAN_TRUC_TUYEN}`,
                    phoneNumberCurUser: true
                })
                const hoSo = res.data.data
                setHoSo(hoSo)
                setMaGiayToHoSo(undefined)
                // setExistedGiayToHoSo(true)
            }
        })()
    }, [hoSo])


    useEffect(() => {
        if (hoSo) {
            setMaGiayToHoSo(`${hoSo.maHoSo ? hoSo.maHoSo : hoSo.id}_${MA_PHIEU_TU_CHOI_TIEP_NHAN_TRUC_TUYEN}`)
            setTenTinh(hoSo.tenTinh?.split(' ').slice(1).join(' ')) //Dạng Thanh Hóa, Ninh Thuận,...
            setMaTinh(hoSo.maTinh) //Dạng Thanh Hóa => 38, Ninh Thuận => 58,...
        }
    }, [hoSo])


    useEffect(() => {
        (async () => {
            const currentDate = new Date();
            const day = currentDate.getDate().toString().padStart(2, '0');
            const getmonth = (currentDate.getMonth() + 1);
            const month = getmonth < 3 ? getmonth.toString().padStart(2, '0') : getmonth;
            const year = currentDate.getFullYear();
            if (maGiayToHoSo && lyDoTuChoi && !xuatWord) {
                const tieuDeTrai1Value = usingQrCode
                    ?
                    hoSo?.catalog == 'so-ban-nganh' ? `${TEN_TRUNG_TAM}` : hoSo?.groupName?.toLocaleUpperCase()
                    :
                    hoSo?.catalog == 'so-ban-nganh' ? `UBND TỈNH ${tenTinh?.toLocaleUpperCase()}` : hoSo?.groupName?.toLocaleUpperCase()

                const tieuDeTrai2Value = usingQrCode
                    ?
                    hoSo?.catalog == 'so-ban-nganh' ? `TỈNH ${tenTinh?.toLocaleUpperCase()}` : `${TEN_BO_PHAN}`
                    :
                    hoSo?.catalog == 'so-ban-nganh' ? `${TEN_TRUNG_TAM}` : `${TEN_BO_PHAN}`

                const filteredValue = (groupName: string) => {
                    let value: string = ''
                    EXPAND_OFFICE_NAME.map((item: string) => {
                        if (groupName.toLocaleLowerCase().includes(item.toLocaleLowerCase()))
                            value = groupName.substring(item.length)
                    })
                    return value
                }

                const tenDiaDanh = hoSo?.catalog == 'so-ban-nganh'
                    ? tenTinh
                    : `${filteredValue(hoSo?.groupName || '')|| tenTinh}`

                await generateDocxWithImages(hoSo?.urlPhoi || '', {
                    image: 'imageBase64',
                    ...hoSo,
                    hostPath: `${locationOrigin || location.origin}`,
                    tieuDeTrai1: tieuDeTrai1Value,
                    tieuDeTrai2: tieuDeTrai2Value,
                    tenDiaDanh: tenDiaDanh,
                    ngayThangNam: `ngày ${day} tháng ${month} năm ${year}`,
                    thoiGianNop: hoSo?.ngayNopHoSo ? dayjs(hoSo.ngayNopHoSo).format("HH") + " giờ " + dayjs(hoSo.ngayNopHoSo).format("mm") + " phút, ngày " + dayjs(hoSo.ngayNopHoSo).format(FORMAT_DATE_WITHOUT_TIME) : "",
                    lyDoTuChoi: lyDoTuChoi,
                    nguoiTuChoi: user?.fullName || '',
                    donViTiepNhan:
                        hoSo?.catalog == 'so-ban-nganh' ?
                            `Trung tâm Phục vụ hành chính công tỉnh ${tenTinh}` :
                            `Bộ phận Tiếp nhận và Trả kết quả ${hoSo?.groupName}`,
                    nguoiNopHoSo: hoSo?.nguoiNopHoSo ? hoSo.nguoiNopHoSo.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase()) : "",
                }, "phieuTuChoiTiepNhanTrucTuyen.phoi.docx", async (blob) => {
                    const res = await fileApi.UploadPdfBucketAsStream({
                        blob: blob,
                        fileName: `PhieuTuChoiTiepNhanTrucTuyen.docx`,
                        folderName: `PhieuTuChoiTiepNhanTrucTuyen${maTinh}`,
                        maHoSo: hoSo?.maHoSo,
                        loaiGiayTo: TEN_PHIEU_TU_CHOI_TIEP_NHAN_TRUC_TUYEN,
                        nguoiXuatPhieu: user?.fullName || '',
                        ngayXuatPhieu: CURRENTTIME_ISOSTRING,
                        maGiayTo: maGiayToHoSo,
                    })
                    if (res.status == 200) {
                        toast.success("Xuất phiếu mới thành công!")
                        setPdfBlob(res.data as any)
                    } else {
                        toast.error('Xuất phiếu thất bại!')
                    }
                    setLoadingPhieu(false)
                }, false, usingQrCode ? [80, 80] : [250, 75], "blob")
            }
        })()
    }, [maGiayToHoSo, lyDoTuChoi])


    useEffect(() => {
        (async () => {
            const currentDate = new Date();
            const day = currentDate.getDate().toString().padStart(2, '0');
            const getmonth = (currentDate.getMonth() + 1);
            const month = getmonth < 3 ? getmonth.toString().padStart(2, '0') : getmonth;
            const year = currentDate.getFullYear();
            if (maGiayToHoSo && lyDoTuChoi && xuatWord) {
                const tieuDeTrai1Value = usingQrCode
                    ?
                    hoSo?.catalog == 'so-ban-nganh' ? `${TEN_TRUNG_TAM}` : hoSo?.groupName?.toLocaleUpperCase()
                    :
                    hoSo?.catalog == 'so-ban-nganh' ? `UBND TỈNH ${tenTinh?.toLocaleUpperCase()}` : hoSo?.groupName?.toLocaleUpperCase()

                const tieuDeTrai2Value = usingQrCode
                    ?
                    hoSo?.catalog == 'so-ban-nganh' ? `TỈNH ${tenTinh?.toLocaleUpperCase()}` : `${TEN_BO_PHAN}`
                    :
                    hoSo?.catalog == 'so-ban-nganh' ? `${TEN_TRUNG_TAM}` : `${TEN_BO_PHAN}`

                const filteredValue = (groupName: string) => {
                    let value: string = ''
                    EXPAND_OFFICE_NAME.map((item: string) => {
                        if (groupName.toLocaleLowerCase().includes(item.toLocaleLowerCase()))
                            value = groupName.substring(item.length)
                    })
                    return value
                }

                const tenDiaDanh = hoSo?.catalog == 'so-ban-nganh'
                    ? tenTinh
                    : `${filteredValue(hoSo?.groupName || '')|| tenTinh}`


                await generateDocxWithImages(hoSo?.urlPhoi || '', {
                    image: 'imageBase64',
                    ...hoSo,
                    hostPath: `${locationOrigin || location.origin}`,
                    tieuDeTrai1: tieuDeTrai1Value,
                    tieuDeTrai2: tieuDeTrai2Value,
                    tenDiaDanh: tenDiaDanh,
                    ngayThangNam: `ngày ${day} tháng ${month} năm ${year}`,
                    thoiGianNop: hoSo?.ngayNopHoSo ? dayjs(hoSo.ngayNopHoSo).format("HH") + " giờ " + dayjs(hoSo.ngayNopHoSo).format("mm") + " phút, ngày " + dayjs(hoSo.ngayNopHoSo).format(FORMAT_DATE_WITHOUT_TIME) : "",
                    lyDoTuChoi: lyDoTuChoi,
                    nguoiTuChoi: user?.fullName || '',
                    donViTiepNhan:
                        hoSo?.catalog == 'so-ban-nganh' ?
                            `Trung tâm Phục vụ hành chính công tỉnh ${tenTinh}` :
                            `Bộ phận Tiếp nhận và Trả kết quả ${hoSo?.groupName}`,
                    nguoiNopHoSo: hoSo?.nguoiNopHoSo ? hoSo.nguoiNopHoSo.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase()) : "",
                }, "phieuTuChoiTiepNhanTrucTuyen.phoi.docx", async (blob) => {
                    saveAs(blob, 'Phiếu yêu cầu bổ sung hồ sơ.docx')
                    setLoadingPhieu(false)
                    setXuatWord(false)
                }, false, usingQrCode ? [80, 80] : [250, 75], "blob")

            }
        })()
    }, [maGiayToHoSo])

    return <>
        <div style={{ height: '75vh' }}>
            {pdfBlob ? <><iframe id="iframePdf" width="100%" height={"100%"} src={URL.createObjectURL(pdfBlob as any)} /></> : null}

        </div>
    </>

}