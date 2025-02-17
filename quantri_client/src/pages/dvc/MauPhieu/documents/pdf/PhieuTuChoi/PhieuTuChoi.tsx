import { API_VERSION, CURRENTTIME_ISOSTRING, DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, UPLOADFILE_ENDPOINT, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useXuLyHoSoContext } from "@/features/hoso/contexts/XuLyHoSoContext"
import { useHuongDanNopHoSoContext } from "@/features/huongDanNopHoSo/contexts/HuongDanNopHoSoContext"
import { GetHuongDanNopHoSo } from "@/features/huongDanNopHoSo/redux/action"
import { generateDocxWithImages } from "@/utils/common"
import { fileApi } from "@/features/file/services"
import { giayToHoSoApi } from "@/features/giaytohoso/service"
import { getFile } from "@/utils"
import { EXPAND_OFFICE_NAME, MA_PHIEU_TU_CHOI, TEN_BO_PHAN, TEN_PHIEU_TU_CHOI, TEN_TRUNG_TAM } from ".."
import axiosInstance from "@/lib/axios"
import { IResult } from "@/models"
import { QRCodeByLink } from "../QRCodeByLink"
import QrCode from "qrcode"
import { toast } from "react-toastify"
import { GetUrlPhoi } from "@/features/quanlymauphoi/redux/action"
import { huongDanNopHoSoApi } from "@/features/huongDanNopHoSo/services"
import { IHuongDanNopHoSo } from "@/features/huongDanNopHoSo/models"
import saveAs from "file-saver"

export const PhieuTuChoi = () => {
    const [huongDanNopHoSo, setHuongDanNopHoSo] = useState<IHuongDanNopHoSo>()
    const barCodeRef = useRef<SVGSVGElement>(null)
    const barcodeRef = useRef<SVGSVGElement>(null)
    const xuLyHoSoContext = useXuLyHoSoContext()
    const [maTinh, setMaTinh] = useState<string>()
    const [tenTinh, setTenTinh] = useState<string>()
    const [linkQrCodeThongTin, setLinkQrCodeThongTin] = useState<string>();
    const [valueSvg, setValueSvg] = useState<any>('')
    const huongDanNopHoSoContext = useHuongDanNopHoSoContext();
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
        if (xuLyHoSoContext.xuatWord || xuLyHoSoContext.reload) {
            setHuongDanNopHoSo(undefined)
        }

    }, [xuLyHoSoContext.xuatWord, xuLyHoSoContext.reload])

    useEffect(() => {
        (async () => {
            if (huongDanNopHoSoContext.selectedHuongDanNopHoSoId && !huongDanNopHoSo) {
                xuLyHoSoContext.setLoading(true)
                const res = await huongDanNopHoSoApi.XuatPhieuAction({
                    id: huongDanNopHoSoContext.selectedHuongDanNopHoSoId,
                    tenGiayTo: 'Phiếu từ chối',
                    loaiPhoi: 'mau-phoi-phieu',
                    code: 'phieu-tu-choi',
                    maLoaiPhieu: `${MA_PHIEU_TU_CHOI}`
                })
                const hoSo = res.data.data
                setHuongDanNopHoSo(hoSo)
                xuLyHoSoContext.setMaGiayToHoSo(undefined)
                xuLyHoSoContext.setHoSo(hoSo)
                setLinkQrCodeThongTin(undefined)
                xuLyHoSoContext.setQrThongTinPhieu(undefined)
            }
            xuLyHoSoContext.setMaGiayToHoSo(undefined)
        })()
    }, [huongDanNopHoSo]);

    useEffect(() => {
        if (huongDanNopHoSo) {
            xuLyHoSoContext.setMaGiayToHoSo(`${huongDanNopHoSo?.maHoSo ? huongDanNopHoSo.maHoSo : huongDanNopHoSo?.id}_${MA_PHIEU_TU_CHOI}`)
        }

        if (huongDanNopHoSo?.urlPhieu && !xuLyHoSoContext.xuatWord) {
            xuLyHoSoContext.setExistedGiayToHoSo(true)
            xuLyHoSoContext.setUrlPdfPhieu(huongDanNopHoSo.urlPhieu)
            const valueGetPdf = fileApi.GetFileByte({ path: huongDanNopHoSo.urlPhieu })
            valueGetPdf.then(function (result) {
                xuLyHoSoContext.setPdfBlob(result.data)

            }).catch(function (error) {
                console.log(error);
            });

            toast.success("Lấy thông tin phiếu thành công!")
        } else {

            if (huongDanNopHoSo) {
                setLinkQrCodeThongTin(`${locationOrigin || location.origin}/apiqr/qr?id=${huongDanNopHoSo?.idQrCode || 'undefined'}`)
                setTenTinh(huongDanNopHoSo.tenTinh?.split(' ').slice(1).join(' ')) //Dạng Thanh Hóa, Ninh Thuận,...
                setMaTinh(huongDanNopHoSo.maTinh) //Dạng Thanh Hóa => 38, Ninh Thuận => 58,...
            }
        }

        if (huongDanNopHoSo && xuLyHoSoContext.xuatWord && !tenTinh && !maTinh && !linkQrCodeThongTin) {
            xuLyHoSoContext.setLoading(true)
            setTenTinh(huongDanNopHoSo.tenTinh?.split(' ').slice(1).join(' ')) //Dạng Thanh Hóa, Ninh Thuận,...
            setMaTinh(huongDanNopHoSo.maTinh) //Dạng Thanh Hóa => 38, Ninh Thuận => 58,...
            setLinkQrCodeThongTin(`${locationOrigin || location.origin}/apiqr/qr?id=${huongDanNopHoSo?.idQrCode || 'undefined'}`)
        }

    }, [huongDanNopHoSo])

    useEffect(() => {
        (async () => {
            const currentDate = new Date();
            const day = currentDate.getDate().toString().padStart(2, '0');
            const getmonth = (currentDate.getMonth() + 1);
            const month = getmonth < 3 ? getmonth.toString().padStart(2, '0') : getmonth;
            const year = currentDate.getFullYear();
            const thanhPhanHoSos = huongDanNopHoSo?.thanhPhanHuongDanNopHoSos?.map(
                (item: any, index: number) => ({
                    ...item,
                    index: index + 1,
                    soBanChinh: item.soBanChinh || "",
                    nhanBanGiay: item.nhanBanGiay || "",
                    soBanSao: item.soBanSao || "",
                }))

            if (xuLyHoSoContext.qrThongTinPhieu && !xuLyHoSoContext.xuatWord) {
                const tieuDeTrai1Value = usingQrCode
                    ?
                    huongDanNopHoSo?.catalog == 'so-ban-nganh' ? `${TEN_TRUNG_TAM}` : huongDanNopHoSo?.groupName?.toLocaleUpperCase()
                    :
                    huongDanNopHoSo?.catalog == 'so-ban-nganh' ? `UBND TỈNH ${tenTinh?.toLocaleUpperCase()}` : huongDanNopHoSo?.groupName?.toLocaleUpperCase()

                const tieuDeTrai2Value = usingQrCode
                    ?
                    huongDanNopHoSo?.catalog == 'so-ban-nganh' ? `TỈNH ${tenTinh?.toLocaleUpperCase()}` : `${TEN_BO_PHAN}`
                    :
                    huongDanNopHoSo?.catalog == 'so-ban-nganh' ? `${TEN_TRUNG_TAM}` : `${TEN_BO_PHAN}`

                const filteredValue = (groupName: string) => {
                    let value: string = ''
                    EXPAND_OFFICE_NAME.map((item: string) => {
                        if (groupName.toLocaleLowerCase().includes(item.toLocaleLowerCase()))
                            value = groupName.substring(item.length)
                    })
                    return value
                }

                const tenDiaDanh = huongDanNopHoSo?.catalog == 'so-ban-nganh'
                    ? tenTinh
                    : `${filteredValue(huongDanNopHoSo?.groupName || '') || tenTinh}`


                await generateDocxWithImages(huongDanNopHoSo?.urlPhoi || '', {
                    image: 'imageBase64',
                    ...huongDanNopHoSo,
                    hostPath: `${locationOrigin || location.origin}`,
                    tieuDeTrai1: tieuDeTrai1Value,
                    tieuDeTrai2: tieuDeTrai2Value,
                    tenDiaDanh: tenDiaDanh,
                    tenTinhThanh: tenTinh,
                    ngayThangNam: `ngày ${day} tháng ${month} năm ${year}`,
                    donViTiepNhan:
                        huongDanNopHoSo?.catalog == 'so-ban-nganh' ?
                            `Trung tâm Phục vụ hành chính công tỉnh ${tenTinh}` :
                            `Bộ phận Tiếp nhận và Trả kết quả ${huongDanNopHoSo?.groupName}`,
                    thanhPhanHoSos,
                    nguoiNopHoSo: huongDanNopHoSo?.chuHoSo ? huongDanNopHoSo.chuHoSo.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase()) : "",
                    nguoiTuChoi: huongDanNopHoSo?.nguoiTiepNhan ? huongDanNopHoSo.nguoiTiepNhan.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase()) : "",
                    qrThongTinPhieu: xuLyHoSoContext.qrThongTinPhieu,
                    chuKyDienTu: xuLyHoSoContext.base64ChuKyDienTu

                }, "phieuTuChoi.phoi.docx", async (blob) => {
                    const res = await fileApi.UploadPdfBucketAsStream({
                        blob: blob,
                        fileName: `PhieuTuChoiGiaiQuyetHoSo.docx`,
                        folderName: `PhieuTuChoi${maTinh}`,
                        loaiGiayTo: TEN_PHIEU_TU_CHOI,
                        nguoiXuatPhieu: huongDanNopHoSo?.nguoiTiepNhan,
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
    }, [xuLyHoSoContext.qrThongTinPhieu])



    useEffect(() => {
        (async () => {
            const currentDate = new Date();
            const day = currentDate.getDate().toString().padStart(2, '0');
            const getmonth = (currentDate.getMonth() + 1);
            const month = getmonth < 3 ? getmonth.toString().padStart(2, '0') : getmonth;
            const year = currentDate.getFullYear();
            const thanhPhanHoSos = huongDanNopHoSo?.thanhPhanHuongDanNopHoSos?.map(
                (item: any, index: number) => ({
                    ...item,
                    index: index + 1,
                    soBanChinh: item.soBanChinh || "",
                    nhanBanGiay: item.nhanBanGiay || "",
                    soBanSao: item.soBanSao || "",
                }))

            if (xuLyHoSoContext.qrThongTinPhieu && xuLyHoSoContext.xuatWord) {
                const tieuDeTrai1Value = usingQrCode
                    ?
                    huongDanNopHoSo?.catalog == 'so-ban-nganh' ? `${TEN_TRUNG_TAM}` : huongDanNopHoSo?.groupName?.toLocaleUpperCase()
                    :
                    huongDanNopHoSo?.catalog == 'so-ban-nganh' ? `UBND TỈNH ${tenTinh?.toLocaleUpperCase()}` : huongDanNopHoSo?.groupName?.toLocaleUpperCase()

                const tieuDeTrai2Value = usingQrCode
                    ?
                    huongDanNopHoSo?.catalog == 'so-ban-nganh' ? `TỈNH ${tenTinh?.toLocaleUpperCase()}` : `${TEN_BO_PHAN}`
                    :
                    huongDanNopHoSo?.catalog == 'so-ban-nganh' ? `${TEN_TRUNG_TAM}` : `${TEN_BO_PHAN}`

                const filteredValue = (groupName: string) => {
                    let value: string = ''
                    EXPAND_OFFICE_NAME.map((item: string) => {
                        if (groupName.toLocaleLowerCase().includes(item.toLocaleLowerCase()))
                            value = groupName.substring(item.length)
                    })
                    return value
                }

                const tenDiaDanh = huongDanNopHoSo?.catalog == 'so-ban-nganh'
                    ? tenTinh
                    : `${filteredValue(huongDanNopHoSo?.groupName || '') || tenTinh}`


                await generateDocxWithImages(huongDanNopHoSo?.urlPhoi || '', {
                    image: 'imageBase64',
                    ...huongDanNopHoSo,
                    hostPath: `${locationOrigin || location.origin}`,
                    tieuDeTrai1: tieuDeTrai1Value,
                    tieuDeTrai2: tieuDeTrai2Value,
                    tenDiaDanh: tenDiaDanh,
                    tenTinhThanh: tenTinh,
                    ngayThangNam: `ngày ${day} tháng ${month} năm ${year}`,
                    donViTiepNhan:
                        huongDanNopHoSo?.catalog == 'so-ban-nganh' ?
                            `Trung tâm Phục vụ hành chính công tỉnh ${tenTinh}` :
                            `Bộ phận Tiếp nhận và Trả kết quả ${huongDanNopHoSo?.groupName}`,
                    thanhPhanHoSos,
                    nguoiNopHoSo: huongDanNopHoSo?.chuHoSo ? huongDanNopHoSo.chuHoSo.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase()) : "",
                    nguoiTuChoi: huongDanNopHoSo?.nguoiTiepNhan ? huongDanNopHoSo.nguoiTiepNhan.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase()) : "",
                    qrThongTinPhieu: xuLyHoSoContext.qrThongTinPhieu,
                    chuKyDienTu: xuLyHoSoContext.base64ChuKyDienTu

                }, "phieuTuChoi.phoi.docx", async (blob) => {
                    saveAs(blob, 'Phiếu từ chối tiếp nhận giải quyết hồ sơ.docx')
                    xuLyHoSoContext.setLoading(false)
                    xuLyHoSoContext.setXuatWord(false)

                }, false, usingQrCode ? [80, 80] : [250, 75], "blob")
            }
        })()
    }, [xuLyHoSoContext.qrThongTinPhieu])


    useEffect(() => {
        if (linkQrCodeThongTin) {
            const canvas2 = document.getElementById('qrcodeCanvasThongTin') as HTMLCanvasElement;
            if (canvas2) {
                const ctx = canvas2.getContext('2d');

                if (ctx) {
                    ctx.imageSmoothingQuality = 'high';
                    QrCode.toCanvas(canvas2, linkQrCodeThongTin, {
                        width: 64,
                    });

                    const imageDataURL = canvas2.toDataURL('image/png');

                    xuLyHoSoContext.setQrThongTinPhieu(imageDataURL)

                }
            }
        }
    }, [barcodeRef.current, linkQrCodeThongTin]);



    return <>
        <div style={{ height: '75vh' }}>

            <div style={{ display: 'none' }}>
                <canvas id="qrcodeCanvasThongTin"></canvas>
            </div>

            {xuLyHoSoContext.pdfBlob ? <><iframe id="iframePdf" width="100%" height={"100%"} src={URL.createObjectURL(xuLyHoSoContext.pdfBlob as any)} /></> : null}
        </div>
    </>

}