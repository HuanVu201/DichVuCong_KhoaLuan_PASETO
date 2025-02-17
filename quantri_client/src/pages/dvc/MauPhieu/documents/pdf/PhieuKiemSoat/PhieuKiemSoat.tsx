import { API_VERSION, CURRENTTIME, CURRENTTIME_ISOSTRING, DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, UPLOADFILE_ENDPOINT, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'
import { QRCodeByLink } from "../QRCodeByLink"
import QrCode from "qrcode"
import { useXuLyHoSoContext } from "@/features/hoso/contexts/XuLyHoSoContext"
import { generateDocxWithImages } from "@/utils/common"
import { IThanhPhanHoSo } from "@/features/thanhphanhoso/models"
import { fileApi } from "@/features/file/services"
import { EXPAND_OFFICE_NAME, MA_PHIEU_KIEM_SOAT_QUA_TRINH_GIAI_QUYET_HO_SO, TEN_BO_PHAN, TEN_BO_PHAN_LOWERCASE, TEN_PHIEU_KIEM_SOAT_QUA_TRINH_GIAI_QUYET_HO_SO, TEN_TRUNG_TAM, TEN_TRUNG_TAM_LOWERCASE } from ".."
import { giayToHoSoApi } from "@/features/giaytohoso/service"
import { getFile } from "@/utils"
import { IResult } from "@/models"
import axiosInstance from "@/lib/axios"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useDispatch } from "react-redux"
import JsBarcode from "jsbarcode"
import { toast } from "react-toastify"
import { barcodeToBase64 } from "../barcodeToBase64"
import { svgToPng } from "../svgToPng"
import { GetUrlPhoi } from "@/features/quanlymauphoi/redux/action"
import saveAs from "file-saver"

export const PhieuKiemSoat = () => {

    const [hoSo, setHoSo] = useState<IHoSo>()
    const barCodeRef = useRef<SVGSVGElement>(null)
    const barcodeRef = useRef<SVGSVGElement>(null)
    const buttonActionContext = useButtonActionContext()
    const xuLyHoSoContext = useXuLyHoSoContext()
    const [maTinh, setMaTinh] = useState<string>()
    const [tenTinh, setTenTinh] = useState<string>()
    const [linkQrCodeThongTin, setLinkQrCodeThongTin] = useState<string>();
    const [valueSvg, setValueSvg] = useState<any>('')

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
                const res = await hoSoApi.XuatPhieuAction({
                    id: buttonActionContext.selectedHoSos[0] as string,
                    tenGiayTo: 'Phiếu kiểm soát quá trình giải quyết hồ sơ',
                    loaiPhoi: 'mau-phoi-phieu',
                    code: 'phieu-kiem-soat-qua-trinh-giai-quyet-ho-so',
                    maLoaiPhieu: `${MA_PHIEU_KIEM_SOAT_QUA_TRINH_GIAI_QUYET_HO_SO}`
                })
                const hoSo = res.data.data
                setHoSo(hoSo)
                xuLyHoSoContext.setMaGiayToHoSo(undefined)
                xuLyHoSoContext.setHoSo(hoSo)
                setLinkQrCodeThongTin(undefined)
                xuLyHoSoContext.setBarcodeThongTinPhieu(undefined)
                setValueSvg(undefined)
            }
        })()
    }, [hoSo])


    useEffect(() => {
        if (hoSo) {
            xuLyHoSoContext.setMaGiayToHoSo(`${hoSo.maHoSo ? hoSo.maHoSo : hoSo.id}_${MA_PHIEU_KIEM_SOAT_QUA_TRINH_GIAI_QUYET_HO_SO}`)
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
                }))

            if ((xuLyHoSoContext.qrThongTinPhieu && xuLyHoSoContext.qrTraCuu) && xuLyHoSoContext.barcodeThongTinPhieu && !xuLyHoSoContext.xuatWord) {

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


                const tenNguoiNop = hoSo?.uyQuyen ? hoSo.nguoiUyQuyen : hoSo?.chuHoSo
                const diaChiNguoiNop = hoSo?.uyQuyen ? hoSo.diaChiNguoiUyQuyen : hoSo?.diaChiChuHoSo
                const soDienThoaiNguoiNop = hoSo?.uyQuyen ? hoSo.soDienThoaiNguoiUyQuyen : hoSo?.soDienThoaiChuHoSo
                const emailNguoiNop = hoSo?.uyQuyen ? hoSo.emailNguoiUyQuyen : hoSo?.emailChuHoSo
                const soGiayToNguoiNop = hoSo?.uyQuyen ? hoSo.soGiayToNguoiUyQuyen : hoSo?.soGiayToChuHoSo

                const tenDonVi = hoSo?.catalog == 'so-ban-nganh'
                    ? `${TEN_TRUNG_TAM_LOWERCASE} ${tenTinh}`
                    : `${TEN_BO_PHAN_LOWERCASE} ${hoSo?.groupName}`

                const thoiGianThucHien = hoSo?.thoiGianThucHien && hoSo.loaiThoiGianThucHien
                    ? `${hoSo.thoiGianThucHien / 8} ${hoSo.loaiThoiGianThucHien.toLocaleLowerCase()}`
                    : ""

                const ngayTiepNhan = hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format("HH") + " giờ " + dayjs(hoSo.ngayTiepNhan).format("mm") + " phút, ngày " + dayjs(hoSo.ngayTiepNhan).format(FORMAT_DATE_WITHOUT_TIME) : ""
                const ngayHenTra = hoSo?.ngayHenTra ? dayjs(hoSo.ngayHenTra).format("HH") + " giờ " + dayjs(hoSo.ngayHenTra).format("mm") + " phút, ngày " + dayjs(hoSo.ngayHenTra).format(FORMAT_DATE_WITHOUT_TIME) : ""
                const xacNhanTrungTam = hoSo?.catalog == 'so-ban-nganh' && maTinh == '38'
                    ? `KT.GIÁM ĐỐC
PHÓ GIÁM ĐỐC
            
            
            
            
Nguyễn Văn Tuyên`
                    : ''


                await generateDocxWithImages(hoSo?.urlPhoi || '', {
                    image: 'imageBase64',
                    ...hoSo,
                    hostPath: `${locationOrigin || location.origin}`,
                    tieuDeTrai1: tieuDeTrai1Value,
                    tieuDeTrai2: tieuDeTrai2Value,
                    tenDiaDanh: tenDiaDanh,
                    ngayThangNam: `ngày ${day} tháng ${month} năm ${year}`,
                    tenNguoiNop: tenNguoiNop,
                    diaChiNguoiNop: diaChiNguoiNop,
                    soDienThoaiNguoiNop: soDienThoaiNguoiNop,
                    emailNguoiNop: emailNguoiNop,
                    soGiayToNguoiNop: soGiayToNguoiNop,
                    tenDonVi: tenDonVi,
                    thoiHanXuLyHoSo: thoiGianThucHien,
                    currentTime: `${hours} giờ ${minutes} phút, ngày ${day}/${month}/${year}`,
                    ngayTiepNhan: ngayTiepNhan,
                    ngayHenTra: ngayHenTra,
                    // thoiGianThucHien: `${hoSo?.thoiGianThucHien} ${hoSo?.loaiThoiGianThucHien ? hoSo?.loaiThoiGianThucHien.toLowerCase() : ""}`,
                    thanhPhanHoSos,
                    qrThongTinPhieu: xuLyHoSoContext.qrThongTinPhieu,
                    barcodeThongTinPhieu: xuLyHoSoContext.barcodeThongTinPhieu,
                    xacNhanTrungTam: xacNhanTrungTam

                }, "phieukiemsoat.phoi.docx", async (blob) => {
                    const res = await fileApi.UploadPdfBucketAsStream({
                        blob: blob,
                        fileName: `PhieuKiemSoatQuaTrinhGiaiQuyetHoSo.docx`,
                        folderName: `PhieuKiemSoat${maTinh}`,
                        maHoSo: hoSo?.maHoSo,
                        loaiGiayTo: TEN_PHIEU_KIEM_SOAT_QUA_TRINH_GIAI_QUYET_HO_SO,
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
    }, [xuLyHoSoContext.qrThongTinPhieu, xuLyHoSoContext.barcodeThongTinPhieu])



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
                }))

            if ((xuLyHoSoContext.qrThongTinPhieu && xuLyHoSoContext.qrTraCuu) && xuLyHoSoContext.barcodeThongTinPhieu && xuLyHoSoContext.xuatWord) {

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


                const tenNguoiNop = hoSo?.uyQuyen ? hoSo.nguoiUyQuyen : hoSo?.chuHoSo
                const diaChiNguoiNop = hoSo?.uyQuyen ? hoSo.diaChiNguoiUyQuyen : hoSo?.diaChiChuHoSo
                const soDienThoaiNguoiNop = hoSo?.uyQuyen ? hoSo.soDienThoaiNguoiUyQuyen : hoSo?.soDienThoaiChuHoSo
                const emailNguoiNop = hoSo?.uyQuyen ? hoSo.emailNguoiUyQuyen : hoSo?.emailChuHoSo
                const soGiayToNguoiNop = hoSo?.uyQuyen ? hoSo.soGiayToNguoiUyQuyen : hoSo?.soGiayToChuHoSo

                const tenDonVi = hoSo?.catalog == 'so-ban-nganh'
                    ? `${TEN_TRUNG_TAM_LOWERCASE} ${tenTinh}`
                    : `${TEN_BO_PHAN_LOWERCASE} ${hoSo?.groupName}`

                const thoiGianThucHien = hoSo?.thoiGianThucHien && hoSo.loaiThoiGianThucHien
                    ? `${hoSo.thoiGianThucHien / 8} ${hoSo.loaiThoiGianThucHien.toLocaleLowerCase()}`
                    : ""

                const ngayTiepNhan = hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format("HH") + " giờ " + dayjs(hoSo.ngayTiepNhan).format("mm") + " phút, ngày " + dayjs(hoSo.ngayTiepNhan).format(FORMAT_DATE_WITHOUT_TIME) : ""
                const ngayHenTra = hoSo?.ngayHenTra ? dayjs(hoSo.ngayHenTra).format("HH") + " giờ " + dayjs(hoSo.ngayHenTra).format("mm") + " phút, ngày " + dayjs(hoSo.ngayHenTra).format(FORMAT_DATE_WITHOUT_TIME) : ""
                const xacNhanTrungTam = hoSo?.catalog == 'so-ban-nganh' && maTinh == '38'
                    ? `KT.GIÁM ĐỐC
PHÓ GIÁM ĐỐC
            
            
            
            
Nguyễn Văn Tuyên`
                    : ''


                await generateDocxWithImages(hoSo?.urlPhoi || '', {
                    image: 'imageBase64',
                    ...hoSo,
                    hostPath: `${locationOrigin || location.origin}`,
                    tieuDeTrai1: tieuDeTrai1Value,
                    tieuDeTrai2: tieuDeTrai2Value,
                    tenDiaDanh: tenDiaDanh,
                    ngayThangNam: `ngày ${day} tháng ${month} năm ${year}`,
                    tenNguoiNop: tenNguoiNop,
                    diaChiNguoiNop: diaChiNguoiNop,
                    soDienThoaiNguoiNop: soDienThoaiNguoiNop,
                    emailNguoiNop: emailNguoiNop,
                    soGiayToNguoiNop: soGiayToNguoiNop,
                    tenDonVi: tenDonVi,
                    thoiHanXuLyHoSo: thoiGianThucHien,
                    currentTime: `${hours} giờ ${minutes} phút, ngày ${day}/${month}/${year}`,
                    ngayTiepNhan: ngayTiepNhan,
                    ngayHenTra: ngayHenTra,
                    // thoiGianThucHien: `${hoSo?.thoiGianThucHien} ${hoSo?.loaiThoiGianThucHien ? hoSo?.loaiThoiGianThucHien.toLowerCase() : ""}`,
                    thanhPhanHoSos,
                    qrThongTinPhieu: xuLyHoSoContext.qrThongTinPhieu,
                    barcodeThongTinPhieu: xuLyHoSoContext.barcodeThongTinPhieu,
                    xacNhanTrungTam: xacNhanTrungTam
                }, "phieukiemsoat.phoi.docx", async (blob) => {
                    saveAs(blob, 'Phiếu kiểm soát quá trình giải quyết hồ sơ.docx')
                    xuLyHoSoContext.setLoading(false)
                    xuLyHoSoContext.setXuatWord(false)


                }, false, usingQrCode ? [80, 80] : [250, 75], "blob")

            }

        })()
    }, [xuLyHoSoContext.qrThongTinPhieu, xuLyHoSoContext.barcodeThongTinPhieu])

    useEffect(() => {

        if (hoSo?.maHoSo && barcodeRef.current) {
            JsBarcode(barcodeRef.current, hoSo.maHoSo, {
                height: 28,
                width: 0.86,
                text: hoSo?.maHoSo,
                fontSize: 10,
                // font: "Times New Roman",
                format: 'CODE128',
            });
        }

        if (document.querySelector('#svgImage')?.innerHTML != '<svg></svg>') {
            setValueSvg(document.querySelector('#svgImage')?.innerHTML)
        }



        const canvas = document.getElementById('qrcodeCanvas') as HTMLCanvasElement;
        if (canvas) {
            const ctx = canvas.getContext('2d');

            if (ctx) {
                ctx.imageSmoothingQuality = 'high';
                QrCode.toCanvas(canvas, `${HOST_PATH}/portaldvc/tra-cuu?SoDinhDanh=${hoSo?.soDinhDanh}&MaHoSo=${hoSo?.maHoSo}`, {
                    width: 64,
                });

                const imageDataURL = canvas.toDataURL('image/png');
                if (linkQrCodeThongTin) {
                    xuLyHoSoContext.setQrTraCuu(imageDataURL)
                }
            }
        }


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
    }, [barcodeRef.current, linkQrCodeThongTin]);


    useEffect(() => {
        if (valueSvg) {
            const doWork = () => {
                const base64Value = barcodeToBase64();
                svgToPng(base64Value, 250, 66).then((valuePng: any) => {
                    if (linkQrCodeThongTin) {
                        xuLyHoSoContext.setBarcodeThongTinPhieu(valuePng);
                    }
                });
            };
            setTimeout(doWork, usingQrCode ? 500 : 2000);
        }
    }, [valueSvg, xuLyHoSoContext.reload])

    return <>
        <div style={{ height: '75vh' }} id="ContainerSwapper">
            <div style={{ display: 'none' }}>
                <canvas id="qrcodeCanvas"></canvas>
            </div>
            <div style={{ display: 'none' }}>
                <canvas id="qrcodeCanvasThongTin"></canvas>
            </div>
            <div id="svgImage" style={{ display: 'none' }} >
                <svg ref={barcodeRef || ""} ></svg>
            </div>
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                <img style={{ width: '300px', height: '66px' }} src={`data:image/svg+xml;utf8,${encodeURIComponent(valueSvg)}`} alt="Barcode" />
            </div>

            {xuLyHoSoContext.pdfBlob ? <><iframe id="iframePdf" width="100%" height={"100%"} src={URL.createObjectURL(xuLyHoSoContext.pdfBlob as any)} /></> : null}

        </div>
    </>
}