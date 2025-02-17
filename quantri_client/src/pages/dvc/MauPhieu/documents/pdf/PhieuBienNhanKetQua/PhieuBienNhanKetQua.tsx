import { FORMAT_DATE_WITHOUT_TIME, HOST_PATH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, PDF_TEN_TINH_LOWER_CASE, API_VERSION, UPLOADFILE_ENDPOINT, CURRENTTIME_ISOSTRING, FORMAT_TIME } from "@/data"
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
import { EXPAND_OFFICE_NAME, MA_PHIEU_BIEN_NHAN_KET_QUA, TEN_BO_PHAN, TEN_PHIEU_BIEN_NHAN_KET_QUA, TEN_TRUNG_TAM } from ".."
import { useXuLyHoSoContext } from "@/features/hoso/contexts/XuLyHoSoContext"
import { toast } from "react-toastify"
import { generateDocxToBlobPdf, generateDocxWithImages } from "@/utils/common"
import { fileApi } from "@/features/file/services"
import { getFile } from "@/utils"
import { IThanhPhanHoSo } from "@/features/thanhphanhoso/models"
import { IResult } from "@/models"
import axiosInstance from "@/lib/axios"
import { svgToPng } from "../svgToPng"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { barcodeToBase64 } from "../barcodeToBase64"
import { GetMauPhoi, GetUrlPhoi, SearchMauPhoi } from "@/features/quanlymauphoi/redux/action"
import { IMauPhoi } from "@/features/quanlymauphoi/models"
import saveAs from "file-saver"


export const PhieuBienNhanKetQua = () => {
    const [hoSo, setHoSo] = useState<IHoSo>()
    const barcodeRef = useRef<SVGSVGElement>(null)
    const buttonActionContext = useButtonActionContext()
    const xuLyHoSoContext = useXuLyHoSoContext()
    const [maTinh, setMaTinh] = useState<string>()
    const [tenTinh, setTenTinh] = useState<string>()
    const [linkQrCodeThongTin, setLinkQrCodeThongTin] = useState<string>();
    const [valueSvg, setValueSvg] = useState<any>('')
    const { data: user } = useAppSelector(state => state.user)
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
            setHoSo(undefined)
        }

    }, [xuLyHoSoContext.xuatWord, xuLyHoSoContext.reload])

    useEffect(() => {
        (async () => {
            xuLyHoSoContext.setLoading(true)
            if (buttonActionContext.selectedHoSos.length && !hoSo) {
                const res = await hoSoApi.XuatPhieuBienNhanKetQuaAction({
                    id: buttonActionContext.selectedHoSos[0] as string,
                    tenGiayTo: 'Phiếu biên nhận kết quả',
                    loaiPhoi: 'mau-phoi-phieu',
                    code: 'phieu-bien-nhan-ket-qua',
                    maLoaiPhieu: `${MA_PHIEU_BIEN_NHAN_KET_QUA}`
                })
                const hoSo = res.data.data
                setHoSo(hoSo)
                xuLyHoSoContext.setMaGiayToHoSo(undefined)
                xuLyHoSoContext.setHoSo(hoSo)
                setLinkQrCodeThongTin(undefined)
                xuLyHoSoContext.setBarcodeThongTinPhieu(undefined)
                setValueSvg(undefined)
                xuLyHoSoContext.setReload(false)
            }
        })()
    }, [hoSo])


    useEffect(() => {
        if (hoSo) {
            xuLyHoSoContext.setMaGiayToHoSo(`${hoSo.maHoSo ? hoSo.maHoSo : hoSo.id}_${MA_PHIEU_BIEN_NHAN_KET_QUA}`)
        }

        if (hoSo?.urlPhieu && !xuLyHoSoContext.xuatWord) {
            xuLyHoSoContext.setExistedGiayToHoSo(true)
            xuLyHoSoContext.setUrlPdfPhieu(hoSo.urlPhieu)
            const valueGetPdf = fileApi.GetFileByte({ path: hoSo.urlPhieu })
            valueGetPdf.then(function (result) {
                xuLyHoSoContext.setPdfBlob(result.data)

            }).catch(function (error) {
                console.log(error);
            });

            toast.success("Lấy thông tin phiếu thành công!")
        } else {

            if (hoSo) {
                setTenTinh(hoSo.tenTinh?.split(' ').slice(1).join(' ')) //Dạng Thanh Hóa, Ninh Thuận,...
                setMaTinh(hoSo.maTinh) //Dạng Thanh Hóa => 38, Ninh Thuận => 58,...
                setLinkQrCodeThongTin(`${locationOrigin || location.origin}/apiqr/qr?id=${hoSo?.idQrCode || 'undefined'}`)
            }
        }

        if (hoSo && xuLyHoSoContext.xuatWord && !tenTinh && !maTinh && !linkQrCodeThongTin) {
            xuLyHoSoContext.setLoading(true)
            setTenTinh(hoSo.tenTinh?.split(' ').slice(1).join(' ')) //Dạng Thanh Hóa, Ninh Thuận,...
            setMaTinh(hoSo.maTinh) //Dạng Thanh Hóa => 38, Ninh Thuận => 58,...
            setLinkQrCodeThongTin(`${locationOrigin || location.origin}/apiqr/qr?id=${hoSo?.idQrCode || 'undefined'}`)
        }
    }, [hoSo])



    useEffect(() => {
        (async () => {
            const currentDate = new Date();
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
                    kyDienTu: item.kyDienTu || "",
                }))




            if (xuLyHoSoContext.qrThongTinPhieu && !xuLyHoSoContext.xuatWord) {
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


                const nguoiTraKetQua = user?.fullName.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase()) || ''
                const nguoiNhanKetQua = hoSo?.hoTenNguoiNhanKetQua

                const dienThoaiNguoiTra = hoSo?.soDienThoaiDonVi || ''
                const dienThoaiNguoiNhan = hoSo?.soDienThoaiNguoiNhanKetQua
                const ngayTraKetQua = dayjs().format('HH [giờ] mm [phút], [ngày] DD/MM/YYYY')

                await generateDocxWithImages(hoSo?.urlPhoi || '', {
                    image: 'imageBase64',
                    ...hoSo,
                    hostPath: `${locationOrigin || window.location.host}`,
                    tieuDeTrai1: tieuDeTrai1Value,
                    tieuDeTrai2: tieuDeTrai2Value,
                    tenDiaDanh: tenDiaDanh,
                    ngayThangNam: `ngày ${day} tháng ${month} năm ${year}`,
                    nguoiTraKetQua,
                    nguoiNhanKetQua,
                    dienThoaiNguoiTra,
                    dienThoaiNguoiNhan,
                    ngayTraKetQua,
                    qrThongTinPhieu: xuLyHoSoContext.qrThongTinPhieu,
                    barcodeThongTinPhieu: xuLyHoSoContext.barcodeThongTinPhieu,
                    chuKyDienTu: xuLyHoSoContext.base64ChuKyDienTu
                }, "phieuBienNhanKetQua.phoi.docx", async (blob) => {
                    const res = await fileApi.UploadPdfBucketAsStream({
                        blob: blob,
                        fileName: `PhieuBienNhanKetQua.docx`,
                        folderName: `PhieuBienNhanKetQua${maTinh}`,
                        addGTHS: '1',
                        maHoSo: hoSo?.maHoSo,
                        loaiGiayTo: TEN_PHIEU_BIEN_NHAN_KET_QUA,
                        nguoiXuatPhieu: hoSo?.nguoiTiepNhan,
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
            const thanhPhanHoSos = hoSo?.thanhPhanHoSos?.map(
                (item: IThanhPhanHoSo, index: number) => ({
                    ...item,
                    index: index + 1,
                    soBanChinh: item.soBanChinh || "",
                    nhanBanGiay: item.nhanBanGiay || "",
                    soBanSao: item.soBanSao || "",
                    kyDienTu: item.kyDienTu || "",
                }))

                if (xuLyHoSoContext.qrThongTinPhieu && xuLyHoSoContext.xuatWord) {
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


                const nguoiTraKetQua = user?.fullName.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase()) || ''
                const nguoiNhanKetQua = hoSo?.uyQuyen
                    ? `${(hoSo?.nguoiUyQuyen || ' ').toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase())}`
                    : `${(hoSo?.chuHoSo || ' ').toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase())}`

                const dienThoaiNguoiTra = hoSo?.soDienThoaiDonVi || ''
                const dienThoaiNguoiNhan = hoSo?.uyQuyen ? hoSo.soDienThoaiNguoiUyQuyen : hoSo?.soDienThoaiChuHoSo
                const ngayTraKetQua = dayjs().format('HH [giờ] mm [phút], [ngày] DD/MM/YYYY')

                await generateDocxWithImages(hoSo?.urlPhoi || '', {
                    image: 'imageBase64',
                    ...hoSo,
                    hostPath: `${locationOrigin || window.location.host}`,
                    tieuDeTrai1: tieuDeTrai1Value,
                    tieuDeTrai2: tieuDeTrai2Value,
                    tenDiaDanh: tenDiaDanh,
                    ngayThangNam: `ngày ${day} tháng ${month} năm ${year}`,
                    nguoiTraKetQua,
                    nguoiNhanKetQua,
                    dienThoaiNguoiTra,
                    dienThoaiNguoiNhan,
                    ngayTraKetQua,
                    qrThongTinPhieu: xuLyHoSoContext.qrThongTinPhieu,
                    barcodeThongTinPhieu: xuLyHoSoContext.barcodeThongTinPhieu,
                    chuKyDienTu: xuLyHoSoContext.base64ChuKyDienTu
                }, "phieuBienNhanKetQua.phoi.docx", async (blob) => {
                    console.log(blob)
                    saveAs(blob, 'Phiếu biên nhận kết quả.docx')
                    xuLyHoSoContext.setLoading(false)
                    xuLyHoSoContext.setXuatWord(false)
                }, false, usingQrCode ? [80, 80] : [250, 75], "blob")
            }

        })()
    }, [xuLyHoSoContext.qrThongTinPhieu])

    useEffect(() => {
        const canvas2 = document.getElementById('qrcodeCanvasThongTin') as HTMLCanvasElement;
        if (canvas2) {
            const ctx = canvas2.getContext('2d');

            if (ctx) {
                ctx.imageSmoothingQuality = 'high';
                QrCode.toCanvas(canvas2, linkQrCodeThongTin, {
                    width: 64,
                });

                const imageDataURL = canvas2.toDataURL('image/png');
                if (linkQrCodeThongTin) {
                    xuLyHoSoContext.setQrThongTinPhieu(imageDataURL)
                }
            }
        }
    }, [linkQrCodeThongTin]);

    return <>
        <div style={{ height: '75vh' }} id="ContainerSwapper">
            <div style={{ display: 'none' }}>
                <canvas id="qrcodeCanvasThongTin"></canvas>
            </div>
            {xuLyHoSoContext.pdfBlob ? <><iframe id="iframePdf" width="100%" height={"100%"} src={URL.createObjectURL(xuLyHoSoContext.pdfBlob as any)} /></> : null}

        </div>
    </>

}