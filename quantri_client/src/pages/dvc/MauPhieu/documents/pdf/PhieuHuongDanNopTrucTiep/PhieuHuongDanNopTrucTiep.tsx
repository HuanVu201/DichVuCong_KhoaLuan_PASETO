import { FORMAT_DATE_WITHOUT_TIME, HOST_PATH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, PDF_TEN_TINH_LOWER_CASE, API_VERSION, UPLOADFILE_ENDPOINT, CURRENTTIME_ISOSTRING } from "@/data"
import { CURRENTTIME, DATE, MONTH, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import JsBarcode from 'jsbarcode'
import QrCode from 'qrcode'
import { QRCodeByLink } from "../QRCodeByLink"
import { giayToHoSoApi } from "@/features/giaytohoso/service"
import { EXPAND_OFFICE_NAME, MA_PHIEU_HUONG_DAN_HOAN_THIEN_HO_SO, TEN_BO_PHAN, TEN_PHIEU_HUONG_DAN_HOAN_THIEN_HO_SO, TEN_TRUNG_TAM } from ".."
import { useXuLyHoSoContext } from "@/features/hoso/contexts/XuLyHoSoContext"
import { toast } from "react-toastify"
import { generateDocxWithImages } from "@/utils/common"
import { fileApi } from "@/features/file/services"
import { getFile } from "@/utils"
import { IThanhPhanHoSo } from "@/features/thanhphanhoso/models"
import { IResult } from "@/models"
import axiosInstance from "@/lib/axios"
import dayjs from "dayjs"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { GetUrlPhoi } from "@/features/quanlymauphoi/redux/action"
import saveAs from "file-saver"
import { IThemHoSo } from "@/features/hoso/components/actions/themMoiHoSo/ThemMoiTiepNhanHoSoModal"
import { huongDanNopHoSoApi } from "@/features/huongDanNopHoSo/services"

export const PhieuHuongDanNopTrucTiep = ({ noiDungHuongDan, hoSo, xuatWord, setXuatWord }:
    {
        noiDungHuongDan: string | undefined, hoSo: IHoSo | undefined,
        xuatWord: boolean, setXuatWord: (onchange: boolean) => void
    }) => {

    const { data: user } = useAppSelector(state => state.user)
    const [data, setData] = useState<IHoSo>()
    const buttonActionContext = useButtonActionContext()
    const xuLyHoSoContext = useXuLyHoSoContext()
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
            setData(undefined)
            setMaTinh(undefined)
            setTenTinh(undefined)
        }
    }, [xuatWord])

    useEffect(() => {
        if (!buttonActionContext.inHuongDanNopTrucTiepModalVisible) {
            setData(undefined)
            setMaTinh(undefined)
            setTenTinh(undefined)
        }

    }, [buttonActionContext.inHuongDanNopTrucTiepModalVisible])

    useEffect(() => {
        (async () => {
            if (!data && hoSo && buttonActionContext.inHuongDanNopTrucTiepModalVisible) {
                xuLyHoSoContext.setLoading(true)
                const res = await hoSoApi.XuatPhieuHuongDanNopTrucTiep({
                    loaiPhoi: 'mau-phoi-phieu',
                    code: 'phieu-huong-dan-hoan-thien-ho-so',
                    tenGiayTo: 'Phiếu hướng dẫn hoàn thiện hồ sơ',
                    maLoaiPhieu: `${MA_PHIEU_HUONG_DAN_HOAN_THIEN_HO_SO}`,
                    maTTHC: hoSo.maTTHC,
                    maLinhVuc: hoSo.maLinhVuc
                })


                if (res.status == 200) {
                    setData(res.data.data)
                } else {
                    toast.error("Lỗi lấy thông tin xuất phiếu!")
                    xuLyHoSoContext.setLoading(false)
                }


            }
        })()
    }, [data, hoSo, noiDungHuongDan])

    useEffect(() => {


        if (data) {
            setTenTinh(data.tenTinh?.split(' ').slice(1).join(' ')) //Dạng Thanh Hóa, Ninh Thuận,...
            setMaTinh(data.maTinh) //Dạng Thanh Hóa => 38, Ninh Thuận => 58,...
        }
    }, [data])

    useEffect(() => {
        (async () => {
            const currentDate = new Date();
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            const getmonth = (currentDate.getMonth() + 1);
            const month = getmonth < 3 ? getmonth.toString().padStart(2, '0') : getmonth;
            const year = currentDate.getFullYear();
            const thanhPhanHoSos = hoSo?.thanhPhanHoSos?.map(
                (item: IThanhPhanHoSo, index: number) => ({
                    ...item,
                    index: index + 1,
                    soBanChinh: item.soBanChinh || "",
                    nhanBanGiay: item.nhanBanGiay || "",
                    soBanSao: item.soBanSao || "",
                    // 
                }))

            if (maTinh && tenTinh && noiDungHuongDan && !xuatWord) {

                const tieuDeTrai1Value = usingQrCode
                    ?
                    data?.catalog == 'so-ban-nganh' ? `${TEN_TRUNG_TAM}` : data?.groupName?.toLocaleUpperCase()
                    :
                    data?.catalog == 'so-ban-nganh' ? `UBND TỈNH ${tenTinh?.toLocaleUpperCase()}` : data?.groupName?.toLocaleUpperCase()

                const tieuDeTrai2Value = usingQrCode
                    ?
                    data?.catalog == 'so-ban-nganh' ? `TỈNH ${tenTinh?.toLocaleUpperCase()}` : `${TEN_BO_PHAN}`
                    :
                    data?.catalog == 'so-ban-nganh' ? `${TEN_TRUNG_TAM}` : `${TEN_BO_PHAN}`

                const filteredValue = (groupName: string) => {
                    let value: string = ''
                    EXPAND_OFFICE_NAME.map((item: string) => {
                        if (groupName.toLocaleLowerCase().includes(item.toLocaleLowerCase()))
                            value = groupName.substring(item.length)
                    })
                    return value
                }

                const tenDiaDanh = data?.catalog == 'so-ban-nganh'
                    ? tenTinh
                    : `${filteredValue(data?.groupName || '') || tenTinh}`

                const donViTiepNhan =
                    data?.catalog == 'so-ban-nganh' ?
                        `Trung tâm Phục vụ hành chính công tỉnh ${tenTinh}`
                        : `Bộ phận Tiếp nhận và Trả kết quả ${data?.groupName}`


                await generateDocxWithImages(data?.urlPhoi || '', {
                    image: 'imageBase64',
                    ...hoSo,
                    ...data,
                    hostPath: `${locationOrigin || location.origin}`,
                    tieuDeTrai1: tieuDeTrai1Value,
                    tieuDeTrai2: tieuDeTrai2Value,
                    tenDiaDanh: tenDiaDanh,
                    ngayThangNam: `ngày ${day} tháng ${month} năm ${year}`,
                    donViTiepNhan: donViTiepNhan,
                    thanhPhanHoSos,
                    nguoiHuongDan: user?.fullName ? user.fullName.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase()) : "",
                    lyDoBoSung: noiDungHuongDan,

                }, "PhieuHuongDanHoanThienHoSo.phoi.docx", async (blob) => {
                    const res = await fileApi.UploadPdfBucketAsStream({
                        blob: blob,
                        fileName: `PhieuHuongDanHoanThienHoSo.docx`,
                        folderName: `PhieuHuongDanHoanThienHoSo${maTinh}`,
                        loaiGiayTo: TEN_PHIEU_HUONG_DAN_HOAN_THIEN_HO_SO,
                        nguoiXuatPhieu: user?.fullName || '',
                        ngayXuatPhieu: CURRENTTIME_ISOSTRING,
                        maGiayTo: xuLyHoSoContext.maGiayToHoSo,
                    })
                    if (res.status == 200) {
                        toast.success("Xuất phiếu mới thành công!")
                        xuLyHoSoContext.setPdfBlob(res.data as any)
                    } else {
                        toast.error('Xuất phiếu thất bại!')
                    }
                    xuLyHoSoContext.setReload(false)
                }, false, usingQrCode ? [80, 80] : [250, 75], "blob")
            }

        })()
    }, [maTinh, tenTinh])


    useEffect(() => {
        (async () => {
            const currentDate = new Date();
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            const getmonth = (currentDate.getMonth() + 1);
            const month = getmonth < 3 ? getmonth.toString().padStart(2, '0') : getmonth;
            const year = currentDate.getFullYear();
            const thanhPhanHoSos = hoSo?.thanhPhanHoSos?.map(
                (item: IThanhPhanHoSo, index: number) => ({
                    ...item,
                    index: index + 1,
                    soBanChinh: item.soBanChinh || "",
                    nhanBanGiay: item.nhanBanGiay || "",
                    soBanSao: item.soBanSao || "",
                    // 
                }))

            if (maTinh && tenTinh && noiDungHuongDan && xuatWord) {
                const tieuDeTrai1Value = usingQrCode
                    ?
                    data?.catalog == 'so-ban-nganh' ? `${TEN_TRUNG_TAM}` : data?.groupName?.toLocaleUpperCase()
                    :
                    data?.catalog == 'so-ban-nganh' ? `UBND TỈNH ${tenTinh?.toLocaleUpperCase()}` : data?.groupName?.toLocaleUpperCase()

                const tieuDeTrai2Value = usingQrCode
                    ?
                    data?.catalog == 'so-ban-nganh' ? `TỈNH ${tenTinh?.toLocaleUpperCase()}` : `${TEN_BO_PHAN}`
                    :
                    data?.catalog == 'so-ban-nganh' ? `${TEN_TRUNG_TAM}` : `${TEN_BO_PHAN}`

                const filteredValue = (groupName: string) => {
                    let value: string = ''
                    EXPAND_OFFICE_NAME.map((item: string) => {
                        if (groupName.toLocaleLowerCase().includes(item.toLocaleLowerCase()))
                            value = groupName.substring(item.length)
                    })
                    return value
                }

                const tenDiaDanh = data?.catalog == 'so-ban-nganh'
                    ? tenTinh
                    : `${filteredValue(data?.groupName || '') || tenTinh}`

                const donViTiepNhan =
                    data?.catalog == 'so-ban-nganh' ?
                        `Trung tâm Phục vụ hành chính công tỉnh ${tenTinh}`
                        : `Bộ phận Tiếp nhận và Trả kết quả ${data?.groupName}`




                await generateDocxWithImages(data?.urlPhoi || '', {
                    image: 'imageBase64',
                    ...hoSo,
                    ...data,
                    hostPath: `${locationOrigin || location.origin}`,
                    tieuDeTrai1: tieuDeTrai1Value,
                    tieuDeTrai2: tieuDeTrai2Value,
                    tenDiaDanh: tenDiaDanh,
                    ngayThangNam: `ngày ${day} tháng ${month} năm ${year}`,
                    donViTiepNhan: donViTiepNhan,
                    thanhPhanHoSos,
                    nguoiHuongDan: user?.fullName ? user.fullName.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase()) : "",
                    lyDoBoSung: noiDungHuongDan,

                }, "PhieuHuongDanHoanThienHoSo.phoi.docx", async (blob) => {

                    saveAs(blob, 'Phiếu hướng dẫn hoàn thiện hồ sơ.docx')
                    xuLyHoSoContext.setLoading(false)
                    xuLyHoSoContext.setXuatWord(false)
                    setXuatWord(false)

                }, false, usingQrCode ? [80, 80] : [250, 75], "blob")
            }

        })()
    }, [maTinh, tenTinh])


    return <>
        <div style={{ height: '75vh' }} id="ContainerSwapper">
            {xuLyHoSoContext.pdfBlob ? <><iframe id="iframePdf" width="100%" height={"100%"} src={URL.createObjectURL(xuLyHoSoContext.pdfBlob as any)} /></> : null}

        </div>
    </>
}