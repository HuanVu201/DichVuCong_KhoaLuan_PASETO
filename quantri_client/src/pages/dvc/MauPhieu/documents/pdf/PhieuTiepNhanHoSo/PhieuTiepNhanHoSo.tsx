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
import { EXPAND_OFFICE_NAME, MA_PHIEU_TIEP_NHAN_VA_HEN_TRA_KET_QUA, TEN_BO_PHAN, TEN_PHIEU_TIEP_NHAN_VA_HEN_TRA_KET_QUA, TEN_TRUNG_TAM } from ".."
import { useXuLyHoSoContext } from "@/features/hoso/contexts/XuLyHoSoContext"
import { toast } from "react-toastify"
import { generateDocxToBlobPdf, generateDocxWithImagesPhieuHoSo } from "@/utils/common"
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
export const PhieuTiepNhanHoSo = ({ loaiPhoi }: { loaiPhoi: string }) => {
    const [hoSo, setHoSo] = useState<IHoSo>()
    const barcodeRef = useRef<SVGSVGElement>(null)
    const buttonActionContext = useButtonActionContext()
    const xuLyHoSoContext = useXuLyHoSoContext()
    const [maTinh, setMaTinh] = useState<string>()
    const [tenTinh, setTenTinh] = useState<string>()
    const [linkQrCodeThongTin, setLinkQrCodeThongTin] = useState<string>();
    const [linkTraCuu, setLinkTraCuu] = useState<string>();
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
                    tenGiayTo: 'Phiếu tiếp nhận hồ sơ và hẹn trả kết quả',
                    loaiPhoi: 'mau-phoi-phieu',
                    code: loaiPhoi,
                    maLoaiPhieu: `${MA_PHIEU_TIEP_NHAN_VA_HEN_TRA_KET_QUA}`
                })
                const hoSo = res.data.data
                setHoSo(hoSo)
                xuLyHoSoContext.setMaGiayToHoSo(undefined)
                xuLyHoSoContext.setHoSo(hoSo)
                setLinkQrCodeThongTin(undefined)
                setLinkTraCuu(undefined)
                xuLyHoSoContext.setBarcodeThongTinPhieu(undefined)
                setValueSvg(undefined)
                xuLyHoSoContext.setReload(false)
            }
        })()
    }, [hoSo])


    useEffect(() => {
        if (hoSo) {
            xuLyHoSoContext.setMaGiayToHoSo(`${hoSo.maHoSo ? hoSo.maHoSo : hoSo.id}_${MA_PHIEU_TIEP_NHAN_VA_HEN_TRA_KET_QUA}`)
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
                setLinkTraCuu(`${locationOrigin || location.origin}/portaldvc/tra-cuu?SGT=${hoSo?.soGiayToChuHoSo}&MHS=${hoSo?.maHoSo}`)
            }
        }

        if (hoSo && xuLyHoSoContext.xuatWord && !tenTinh && !maTinh && !linkQrCodeThongTin && !linkTraCuu) {
            xuLyHoSoContext.setLoading(true)
            setTenTinh(hoSo.tenTinh?.split(' ').slice(1).join(' ')) //Dạng Thanh Hóa, Ninh Thuận,...
            setMaTinh(hoSo.maTinh) //Dạng Thanh Hóa => 38, Ninh Thuận => 58,...
            setLinkQrCodeThongTin(`${locationOrigin || location.origin}/apiqr/qr?id=${hoSo?.idQrCode || 'undefined'}`)
            setLinkTraCuu(`${locationOrigin || location.origin}/portaldvc/tra-cuu?SGT=${hoSo?.soGiayToChuHoSo}&MHS=${hoSo?.maHoSo}`)
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
                    : `${filteredValue(hoSo?.groupName || '') || tenTinh}`


                const tenNguoiNop = hoSo?.uyQuyen ? hoSo.nguoiUyQuyen : hoSo?.chuHoSo
                const diaChiNguoiNop = hoSo?.uyQuyen ? hoSo.diaChiNguoiUyQuyen : hoSo?.diaChiChuHoSo
                const soDienThoaiNguoiNop = hoSo?.uyQuyen ? hoSo.soDienThoaiNguoiUyQuyen : hoSo?.soDienThoaiChuHoSo
                const emailNguoiNop = hoSo?.uyQuyen ? hoSo.emailNguoiUyQuyen : hoSo?.emailChuHoSo
                const soGiayToNguoiNop = hoSo?.uyQuyen ? hoSo.soGiayToNguoiUyQuyen : hoSo?.soGiayToChuHoSo

                const kenhThucHien = hoSo?.kenhThucHien == '1' ? 'Trực tiếp'
                    : hoSo?.kenhThucHien == '2' ? "Trực tuyến" : "BCCI"

                const donViTiepNhan =
                    hoSo?.catalog == 'so-ban-nganh' ?
                        `Trung tâm Phục vụ hành chính công tỉnh ${tenTinh}`
                        : `Bộ phận Tiếp nhận và Trả kết quả ${hoSo?.groupName}`

                const nhanKetQuaTai =
                    hoSo?.dangKyNhanHoSoQuaBCCIData !== "" ?
                        "Qua dịch vụ Bưu chính công ích" :
                        hoSo?.catalog == 'so-ban-nganh' ?
                            "Trung tâm Phục vụ hành chính công tỉnh" :
                            `Bộ phận Tiếp nhận và Trả kết quả ${hoSo?.groupName}`


                const traKetQuaKcnNghiSon =
                    hoSo?.dangKyNhanHoSoQuaBCCIData !== "" ?
                        "Qua dịch vụ Bưu chính công ích" :
                        `Bộ phận Tiếp nhận và Trả kết quả ${hoSo?.groupName}`



                const chuThichNhanKetQua = `Khi đến nhận kết quả: Người nộp mang theo Giấy này (trường hợp pháp luật có quy định Chủ hồ sơ phải trực tiếp đến nhận kết quả nhưng không đến được thì phải có giấy ủy quyền cho người khác đi nhận thay theo quy định).`
                const ngayTiepNhan = hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format("HH") + " giờ " + dayjs(hoSo.ngayTiepNhan).format("mm") + " phút, ngày " + dayjs(hoSo.ngayTiepNhan).format(FORMAT_DATE_WITHOUT_TIME) : ""
                const ngayHenTra = hoSo?.ngayHenTra ? dayjs(hoSo.ngayHenTra).format("HH") + " giờ " + dayjs(hoSo.ngayHenTra).format("mm") + " phút, ngày " + dayjs(hoSo.ngayHenTra).format(FORMAT_DATE_WITHOUT_TIME) : "Không có ngày hẹn trả cụ thể theo quy định"
                const thoiHanXuLyHoSo = hoSo?.thoiGianThucHien && hoSo.loaiThoiGianThucHien
                    ? `${hoSo.thoiGianThucHien / 8} ${hoSo.loaiThoiGianThucHien.toLocaleLowerCase()}` : "Không quy định"

                // const nguoiNopHoSo = hoSo?.nguoiNopHoSo ? `${hoSo.nguoiNopHoSo.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase())}` : ''
                const nguoiNopHoSo = hoSo?.uyQuyen
                    ? `${(hoSo?.nguoiUyQuyen || ' ').toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase())}`
                    : `${(hoSo?.chuHoSo || ' ').toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase())}`
                const nguoiTiepNhan = hoSo?.nguoiTiepNhan ? `${hoSo.nguoiTiepNhan.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase())}` : ''

                await generateDocxWithImagesPhieuHoSo(hoSo?.urlPhoi || '', {
                    image: 'imageBase64',
                    ...hoSo,
                    hostPath: `${locationOrigin || window.location.host}`,
                    tieuDeTrai1: tieuDeTrai1Value,
                    tieuDeTrai2: tieuDeTrai2Value,
                    tenDiaDanh: tenDiaDanh,
                    ngayThangNam: `ngày ${day} tháng ${month} năm ${year}`,
                    tenNguoiNop: tenNguoiNop || '...',
                    diaChiNguoiNop: diaChiNguoiNop || '...',
                    soDienThoaiNguoiNop: soDienThoaiNguoiNop || '...',
                    emailNguoiNop: emailNguoiNop || '...',
                    soGiayToNguoiNop: soGiayToNguoiNop || '...',
                    kenhThucHien: kenhThucHien || '...',
                    thoiHanXuLyHoSo: thoiHanXuLyHoSo || '...',
                    linkTraCuu: linkTraCuu || '...',
                    donViTiepNhan: donViTiepNhan || '...',
                    nhanKetQuaTai: nhanKetQuaTai || '...',
                    traKetQuaKcnNghiSon: traKetQuaKcnNghiSon || '...',
                    chuThichNhanKetQua: chuThichNhanKetQua || '',
                    ngayTiepNhan: ngayTiepNhan || '...',
                    ngayHenTra: ngayHenTra || '...',
                    nguoiNopHoSo: nguoiNopHoSo || '...',
                    nguoiTiepNhan: nguoiTiepNhan || '...',
                    thanhPhanHoSos,
                    qrTraCuu: xuLyHoSoContext.qrTraCuu,
                    qrThongTinPhieu: xuLyHoSoContext.qrThongTinPhieu,
                    barcodeThongTinPhieu: xuLyHoSoContext.barcodeThongTinPhieu,
                    chuKyDienTu: xuLyHoSoContext.base64ChuKyDienTu,
                    noteNgayLamViec: hoSo?.noteNgayLamViec ? ` ${hoSo?.noteNgayLamViec}` : '',
                    noteTraKetQua: hoSo?.noteTraKetQua ? ` ${hoSo?.noteTraKetQua}` : '',

                }, "phieuTiepNhan.phoi.docx", async (blob) => {
                    const res = await fileApi.UploadPdfBucketAsStream({
                        blob: blob,
                        fileName: `PhieuTiepNhanHoHoVaHenTraKetQua.docx`,
                        folderName: `PhieuTiepNhanHoSo${maTinh}`,
                        addGTHS: '1',
                        maHoSo: hoSo?.maHoSo,
                        loaiGiayTo: TEN_PHIEU_TIEP_NHAN_VA_HEN_TRA_KET_QUA,
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
    }, [xuLyHoSoContext.qrThongTinPhieu, xuLyHoSoContext.qrTraCuu, xuLyHoSoContext.barcodeThongTinPhieu])


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
                    : `${filteredValue(hoSo?.groupName || '') || tenTinh}`


                const tenNguoiNop = hoSo?.uyQuyen ? hoSo.nguoiUyQuyen : hoSo?.chuHoSo
                const diaChiNguoiNop = hoSo?.uyQuyen ? hoSo.diaChiNguoiUyQuyen : hoSo?.diaChiChuHoSo
                const soDienThoaiNguoiNop = hoSo?.uyQuyen ? hoSo.soDienThoaiNguoiUyQuyen : hoSo?.soDienThoaiChuHoSo
                const emailNguoiNop = hoSo?.uyQuyen ? hoSo.emailNguoiUyQuyen : hoSo?.emailChuHoSo
                const soGiayToNguoiNop = hoSo?.uyQuyen ? hoSo.soGiayToNguoiUyQuyen : hoSo?.soGiayToChuHoSo

                const kenhThucHien = hoSo?.kenhThucHien == '1' ? 'Trực tiếp'
                    : hoSo?.kenhThucHien == '2' ? "Trực tuyến" : "BCCI"

                const donViTiepNhan =
                    hoSo?.catalog == 'so-ban-nganh' ?
                        `Trung tâm Phục vụ hành chính công tỉnh ${tenTinh}`
                        : `Bộ phận Tiếp nhận và Trả kết quả ${hoSo?.groupName}`

                const nhanKetQuaTai =
                    hoSo?.dangKyNhanHoSoQuaBCCIData !== "" ?
                        "Qua dịch vụ Bưu chính công ích" :
                        hoSo?.catalog == 'so-ban-nganh' ?
                            "Trung tâm Phục vụ hành chính công tỉnh" :
                            `Bộ phận Tiếp nhận và Trả kết quả ${hoSo?.groupName}`


                const traKetQuaKcnNghiSon =
                    hoSo?.dangKyNhanHoSoQuaBCCIData !== "" ?
                        "Qua dịch vụ Bưu chính công ích" :
                        `Bộ phận Tiếp nhận và Trả kết quả ${hoSo?.groupName}`



                const chuThichNhanKetQua = `Khi đến nhận kết quả: Người nộp mang theo Giấy này (trường hợp pháp luật có quy định Chủ hồ sơ phải trực tiếp đến nhận kết quả nhưng không đến được thì phải có giấy ủy quyền cho người khác đi nhận thay theo quy định).`
                const ngayTiepNhan = hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format("HH") + " giờ " + dayjs(hoSo.ngayTiepNhan).format("mm") + " phút, ngày " + dayjs(hoSo.ngayTiepNhan).format(FORMAT_DATE_WITHOUT_TIME) : ""
                const ngayHenTra = hoSo?.ngayHenTra ? dayjs(hoSo.ngayHenTra).format("HH") + " giờ " + dayjs(hoSo.ngayHenTra).format("mm") + " phút, ngày " + dayjs(hoSo.ngayHenTra).format(FORMAT_DATE_WITHOUT_TIME) : "Không có ngày hẹn trả cụ thể theo quy định"
                const thoiHanXuLyHoSo = hoSo?.thoiGianThucHien && hoSo.loaiThoiGianThucHien
                    ? `${hoSo.thoiGianThucHien / 8} ${hoSo.loaiThoiGianThucHien.toLocaleLowerCase()}` : "Không quy định"

                // const nguoiNopHoSo = hoSo?.nguoiNopHoSo ? `${hoSo.nguoiNopHoSo.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase())}` : ''
                const nguoiNopHoSo = hoSo?.uyQuyen
                    ? `${(hoSo?.nguoiUyQuyen || ' ').toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase())}`
                    : `${(hoSo?.chuHoSo || ' ').toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase())}`
                const nguoiTiepNhan = hoSo?.nguoiTiepNhan ? `${hoSo.nguoiTiepNhan.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase())}` : ''



                await generateDocxWithImagesPhieuHoSo(hoSo?.urlPhoi || '', {
                    image: 'imageBase64',
                    ...hoSo,
                    hostPath: `${locationOrigin || window.location.host}`,
                    tieuDeTrai1: tieuDeTrai1Value,
                    tieuDeTrai2: tieuDeTrai2Value,
                    tenDiaDanh: tenDiaDanh,
                    ngayThangNam: `ngày ${day} tháng ${month} năm ${year}`,
                    tenNguoiNop: tenNguoiNop || '...',
                    diaChiNguoiNop: diaChiNguoiNop || '...',
                    soDienThoaiNguoiNop: soDienThoaiNguoiNop || '...',
                    emailNguoiNop: emailNguoiNop || '...',
                    soGiayToNguoiNop: soGiayToNguoiNop || '...',
                    kenhThucHien: kenhThucHien || '...',
                    thoiHanXuLyHoSo: thoiHanXuLyHoSo || '...',
                    linkTraCuu: linkTraCuu || '...',
                    donViTiepNhan: donViTiepNhan || '...',
                    nhanKetQuaTai: nhanKetQuaTai || '...',
                    traKetQuaKcnNghiSon: traKetQuaKcnNghiSon || '...',
                    chuThichNhanKetQua: chuThichNhanKetQua || '',
                    ngayTiepNhan: ngayTiepNhan || '...',
                    ngayHenTra: ngayHenTra || '...',
                    nguoiNopHoSo: nguoiNopHoSo || '...',
                    nguoiTiepNhan: nguoiTiepNhan || '...',
                    thanhPhanHoSos,
                    qrTraCuu: xuLyHoSoContext.qrTraCuu,
                    qrThongTinPhieu: xuLyHoSoContext.qrThongTinPhieu,
                    barcodeThongTinPhieu: xuLyHoSoContext.barcodeThongTinPhieu,
                    chuKyDienTu: xuLyHoSoContext.base64ChuKyDienTu,
                    noteNgayLamViec: hoSo?.noteNgayLamViec ? ` ${hoSo?.noteNgayLamViec}` : '',
                    noteTraKetQua: hoSo?.noteTraKetQua ? ` ${hoSo?.noteTraKetQua}` : '',
                }, "phieuTiepNhan.phoi.docx", async (blob) => {
                    console.log(blob)
                    saveAs(blob, 'Phiếu tiếp nhận hồ sơ và hẹn trả kết quả.docx')
                    xuLyHoSoContext.setLoading(false)
                    xuLyHoSoContext.setXuatWord(false)
                }, false, usingQrCode ? [80, 80] : [250, 75], "blob")
            }

        })()
    }, [xuLyHoSoContext.qrThongTinPhieu, xuLyHoSoContext.qrTraCuu, xuLyHoSoContext.barcodeThongTinPhieu])

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
                QrCode.toCanvas(canvas, linkTraCuu, {
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