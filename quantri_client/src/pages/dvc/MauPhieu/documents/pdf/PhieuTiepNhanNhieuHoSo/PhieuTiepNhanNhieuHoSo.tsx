import { API_VERSION, CURRENTTIME_ISOSTRING, DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, UPLOADFILE_ENDPOINT, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'
import { EXPAND_OFFICE_NAME, MA_PHIEU_BAN_GIAO_KET_QUA, MA_PHIEU_TIEP_NHAN_VA_HEN_TRA_KET_QUA, TEN_BO_PHAN, TEN_PHIEU_BAN_GIAO_KET_QUA, TEN_PHIEU_TIEP_NHAN_VA_HEN_TRA_KET_QUA, TEN_TRUNG_TAM } from ".."
// import { ITiepNhanNhieuHoSo, ITiepNhanNhieuHoSoElement, ITiepNhanNhieuHoSoResponse } from "@/pages/dvc/traketqua/chotraketquatthcc/model"
import { useXuLyHoSoContext } from "@/features/hoso/contexts/XuLyHoSoContext"
import QrCode from "qrcode"
import { generateDocxWithImages } from "@/utils/common"
import { fileApi } from "@/features/file/services"
import { useAppSelector } from "@/lib/redux/Hooks"
import { toast } from "react-toastify"
import axiosInstance from "@/lib/axios"
import { IResult } from "@/models"
import { giayToHoSoApi } from "@/features/giaytohoso/service"
import { ITiepNhanNhieuHoSo, ITiepNhanNhieuHoSoElement } from "@/pages/dvc/tiepnhanhoso/tiepNhanNhieuHoSo/model"
import saveAs from "file-saver"

export const PhieuTiepNhanNhieuHoSo = () => {
    const [hoSoData, setHoSoData] = useState<ITiepNhanNhieuHoSo>()
    const buttonActionContext = useButtonActionContext()
    const xuLyHoSoContext = useXuLyHoSoContext()
    const [maTinh, setMaTinh] = useState<string>()
    const [tenTinh, setTenTinh] = useState<string>()
    const [linkQrCodeThongTin, setLinkQrCodeThongTin] = useState<string>();
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
            setHoSoData(undefined)
        }

    }, [xuLyHoSoContext.xuatWord, xuLyHoSoContext.reload])

    useEffect(() => {
        (async () => {
            if (buttonActionContext.selectedHoSos.length && !hoSoData) {
                xuLyHoSoContext.setLoading(true)
                var sltHoSos = buttonActionContext.selectedHoSos.map((i) => i.toString());
                const res = await hoSoApi.XuatPhieuTiepNhanNhieuHoSo({
                    ids: sltHoSos,
                    tenGiayTo: "Phiếu tiếp nhận hồ sơ và hẹn trả kết quả",
                    maLoaiPhieu: `${MA_PHIEU_TIEP_NHAN_VA_HEN_TRA_KET_QUA}`,
                    loaiPhoi: 'mau-phoi-phieu',
                    code: 'phieu-tiep-nhan-nhieu-ho-so'
                })
                if (res.data) {
                    setHoSoData(res.data.data)
                }

            }
        })()
    }, [hoSoData])

    useEffect(() => {
        if (hoSoData) {
            let maGiayTo: string = ''
            hoSoData.hoSos.forEach((ele: ITiepNhanNhieuHoSoElement) => {
                maGiayTo += `${ele.maHoSo ? ele.maHoSo : ele.id}_`
            });
            xuLyHoSoContext.setMaGiayToHoSo(`${maGiayTo}${MA_PHIEU_BAN_GIAO_KET_QUA}`)
        }

        if (hoSoData) {
            setTenTinh(hoSoData.tenTinh?.split(' ').slice(1).join(' ')) //Dạng Thanh Hóa, Ninh Thuận,...
            setMaTinh(hoSoData.hoSos[0].maTinh) //Dạng Thanh Hóa => 38, Ninh Thuận => 58,...
            setLinkQrCodeThongTin(`${locationOrigin || location.origin}/apiqr/qr?id=${hoSoData?.idQrCode || 'undefined'}`)
        }
    }, [hoSoData])


    useEffect(() => {
        (async () => {
            const currentDate = new Date();
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            const getmonth = (currentDate.getMonth() + 1);
            const month = getmonth < 3 ? getmonth.toString().padStart(2, '0') : getmonth;
            const year = currentDate.getFullYear();
            const hoSos = hoSoData?.hoSos?.map(
                (item: ITiepNhanNhieuHoSoElement, index: number) => ({
                    ...item,
                    index: index + 1,
                    trichYeuHoSo: item.trichYeuHoSo || '',
                    chuHoSo: item.nguoiNopHoSo.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase()) || '',
                    tenDonVi: item.groupName || '',
                    ngayTiepNhan: item.ngayTiepNhan ? dayjs(item.ngayTiepNhan).format("HH") + " giờ " + dayjs(item.ngayTiepNhan).format("mm") + " phút, ngày " + dayjs(item.ngayTiepNhan).format(FORMAT_DATE_WITHOUT_TIME) : "",
                    ngayHenTra: item.ngayHenTra ? dayjs(item.ngayHenTra).format("HH") + " giờ " + dayjs(item.ngayHenTra).format("mm") + " phút, ngày " + dayjs(item.ngayHenTra).format(FORMAT_DATE_WITHOUT_TIME) : "",
                    thoiHanXuLyHoSo: item.thoiGianThucHien && item.loaiThoiGianThucHien
                        ? `${item.thoiGianThucHien / 8} ngày` : ""
                }))

            if (xuLyHoSoContext.qrThongTinPhieu && !xuLyHoSoContext.xuatWord) {
                const tieuDeTrai1Value = usingQrCode
                    ?
                    hoSoData?.hoSos[0]?.catalog == 'so-ban-nganh' ? `${TEN_TRUNG_TAM}` : hoSoData?.hoSos[0]?.groupName?.toLocaleUpperCase()
                    :
                    hoSoData?.hoSos[0].catalog == 'so-ban-nganh' ? `UBND TỈNH ${tenTinh?.toLocaleUpperCase()}` : hoSoData?.hoSos[0].groupName?.toLocaleUpperCase()

                const tieuDeTrai2Value = usingQrCode
                    ?
                    hoSoData?.hoSos[0].catalog == 'so-ban-nganh' ? `TỈNH ${tenTinh?.toLocaleUpperCase()}` : `${TEN_BO_PHAN}`
                    :
                    hoSoData?.hoSos[0].catalog == 'so-ban-nganh' ? `${TEN_TRUNG_TAM}` : `${TEN_BO_PHAN}`

                const filteredValue = (groupName: string) => {
                    let value: string = ''
                    EXPAND_OFFICE_NAME.map((item: string) => {
                        if (groupName.toLocaleLowerCase().includes(item.toLocaleLowerCase()))
                            value = groupName.substring(item.length)
                    })
                    return value
                }

                const tenDiaDanh = hoSoData?.hoSos[0].catalog == 'so-ban-nganh'
                    ? tenTinh
                    : `${filteredValue(hoSoData?.hoSos[0].groupName || '') || tenTinh}`


                const tenNguoiNop = hoSoData?.hoSos[0].uyQuyen ? hoSoData?.hoSos[0].nguoiUyQuyen : hoSoData?.hoSos[0].chuHoSo
                const diaChiNguoiNop = hoSoData?.hoSos[0].uyQuyen ? hoSoData?.hoSos[0].diaChiNguoiUyQuyen : hoSoData?.hoSos[0].diaChiChuHoSo
                const soDienThoaiNguoiNop = hoSoData?.hoSos[0].uyQuyen ? hoSoData?.hoSos[0].soDienThoaiNguoiUyQuyen : hoSoData?.hoSos[0].soDienThoaiChuHoSo
                const emailNguoiNop = hoSoData?.hoSos[0].uyQuyen ? hoSoData?.hoSos[0].emailNguoiUyQuyen : hoSoData?.hoSos[0].emailChuHoSo
                const soGiayToNguoiNop = hoSoData?.hoSos[0].uyQuyen ? hoSoData?.hoSos[0].soGiayToNguoiUyQuyen : hoSoData?.hoSos[0].soGiayToChuHoSo

                const kenhThucHien = hoSoData?.hoSos[0].kenhThucHien == '1' ? 'Trực tiếp'
                    : hoSoData?.hoSos[0].kenhThucHien == '2' ? "Trực tuyến" : "BCCI"

                const donViTiepNhan =
                    hoSoData?.hoSos[0].catalog == 'so-ban-nganh' ?
                        `Trung tâm Phục vụ hành chính công tỉnh ${tenTinh}`
                        : `Bộ phận Tiếp nhận và Trả kết quả ${hoSoData?.hoSos[0].groupName}`

                const nhanKetQuaTai =
                    hoSoData?.hoSos[0].dangKyNhanHoSoQuaBCCIData !== "" ?
                        "Qua dịch vụ Bưu chính công ích" :
                        hoSoData?.hoSos[0].catalog == 'so-ban-nganh' ?
                            "Trung tâm Phục vụ hành chính công tỉnh" :
                            `Bộ phận Tiếp nhận và Trả kết quả ${hoSoData?.hoSos[0].groupName}`

                const traKetQuaKcnNghiSon =
                    hoSoData?.hoSos[0]?.dangKyNhanHoSoQuaBCCIData !== "" ?
                        "Qua dịch vụ Bưu chính công ích" :
                        `Bộ phận Tiếp nhận và Trả kết quả ${hoSoData?.hoSos[0]?.groupName}`

                const chuThichNhanKetQua = `Khi đến nhận kết quả: Người nộp mang theo Giấy này (trường hợp pháp luật có quy định Chủ hồ sơ phải trực tiếp đến nhận kết quả nhưng không đến được thì phải có giấy ủy quyền cho người khác đi nhận thay theo quy định).`
                const ngayTiepNhan = hoSoData?.hoSos[0].ngayTiepNhan ? dayjs(hoSoData?.hoSos[0].ngayTiepNhan).format("HH") + " giờ " + dayjs(hoSoData?.hoSos[0].ngayTiepNhan).format("mm") + " phút, ngày " + dayjs(hoSoData?.hoSos[0].ngayTiepNhan).format(FORMAT_DATE_WITHOUT_TIME) : ""
                const ngayHenTra = hoSoData?.hoSos[0].ngayHenTra ? dayjs(hoSoData?.hoSos[0].ngayHenTra).format("HH") + " giờ " + dayjs(hoSoData?.hoSos[0].ngayHenTra).format("mm") + " phút, ngày " + dayjs(hoSoData?.hoSos[0].ngayHenTra).format(FORMAT_DATE_WITHOUT_TIME) : ""
                const thoiHanXuLyHoSo = hoSoData?.hoSos[0].thoiGianThucHien && hoSoData?.hoSos[0].loaiThoiGianThucHien
                    ? `${hoSoData?.hoSos[0].thoiGianThucHien / 8} ${hoSoData?.hoSos[0].loaiThoiGianThucHien.toLocaleLowerCase()}` : ""
                const linkTraCuu = `${locationOrigin || location.origin}/portaldvc/tra-cuu?MaHoSo=${hoSoData?.hoSos[0].maHoSo}&SoDinhDanh=${hoSoData?.hoSos[0].soGiayToChuHoSo}`

                const nguoiNopHoSo = hoSoData?.hoSos[0].nguoiNopHoSo ? `${hoSoData?.hoSos[0].nguoiNopHoSo.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase())}` : ''
                const nguoiTiepNhan = hoSoData?.hoSos[0].nguoiTiepNhan ? `${hoSoData?.hoSos[0].nguoiTiepNhan.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase())}` : ''
                const noiDungYeuCauGiaiQuyet = hoSoData?.hoSos[0].trichYeuHoSo || ''

                await generateDocxWithImages(hoSoData?.urlPhoi || '', {
                    image: 'imageBase64',
                    ...hoSoData?.hoSos[0],
                    hoSos,
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
                    soLuongHoSo: buttonActionContext.selectedHoSos.length,
                    noiDungYeuCauGiaiQuyet: noiDungYeuCauGiaiQuyet,
                    thoiHanXuLyHoSo: thoiHanXuLyHoSo,
                    linkTraCuu: linkTraCuu,
                    donViTiepNhan: donViTiepNhan,
                    nhanKetQuaTai: nhanKetQuaTai,
                    traKetQuaKcnNghiSon: traKetQuaKcnNghiSon,
                    chuThichNhanKetQua: chuThichNhanKetQua,
                    ngayTiepNhan: ngayTiepNhan,
                    ngayHenTra: ngayHenTra,
                    nguoiNopHoSo: nguoiNopHoSo,
                    nguoiTiepNhan: nguoiTiepNhan,
                    qrTraCuu: xuLyHoSoContext.qrTraCuu,
                    qrThongTinPhieu: xuLyHoSoContext.qrThongTinPhieu,
                    barcodeThongTinPhieu: xuLyHoSoContext.barcodeThongTinPhieu,
                    chuKyDienTu: xuLyHoSoContext.base64ChuKyDienTu


                }, "phieuTiepNhan.phoi.docx", async (blob) => {
                    const res = await fileApi.UploadPdfBucketAsStream({
                        blob: blob,
                        fileName: `PhieuTiepNhanHoHoVaHenTraKetQua.docx`,
                        folderName: `PhieuTiepNhanHoSo${maTinh}`,
                        loaiGiayTo: TEN_PHIEU_TIEP_NHAN_VA_HEN_TRA_KET_QUA,
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
    }, [xuLyHoSoContext.qrThongTinPhieu])



    useEffect(() => {
        (async () => {
            const currentDate = new Date();
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            const getmonth = (currentDate.getMonth() + 1);
            const month = getmonth < 3 ? getmonth.toString().padStart(2, '0') : getmonth;
            const year = currentDate.getFullYear();
            const hoSos = hoSoData?.hoSos?.map(
                (item: ITiepNhanNhieuHoSoElement, index: number) => ({
                    ...item,
                    index: index + 1,
                    trichYeuHoSo: item.trichYeuHoSo || '',
                    chuHoSo: item.nguoiNopHoSo.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase()) || '',
                    tenDonVi: item.groupName || '',
                    ngayTiepNhan: item.ngayTiepNhan ? dayjs(item.ngayTiepNhan).format("HH") + " giờ " + dayjs(item.ngayTiepNhan).format("mm") + " phút, ngày " + dayjs(item.ngayTiepNhan).format(FORMAT_DATE_WITHOUT_TIME) : "",
                    ngayHenTra: item.ngayHenTra ? dayjs(item.ngayHenTra).format("HH") + " giờ " + dayjs(item.ngayHenTra).format("mm") + " phút, ngày " + dayjs(item.ngayHenTra).format(FORMAT_DATE_WITHOUT_TIME) : "",
                    thoiHanXuLyHoSo: item.thoiGianThucHien && item.loaiThoiGianThucHien
                        ? `${item.thoiGianThucHien / 8} ngày` : ""
                }))

            if (xuLyHoSoContext.qrThongTinPhieu && xuLyHoSoContext.xuatWord) {
                const tieuDeTrai1Value = usingQrCode
                    ?
                    hoSoData?.hoSos[0]?.catalog == 'so-ban-nganh' ? `${TEN_TRUNG_TAM}` : hoSoData?.hoSos[0]?.groupName?.toLocaleUpperCase()
                    :
                    hoSoData?.hoSos[0].catalog == 'so-ban-nganh' ? `UBND TỈNH ${tenTinh?.toLocaleUpperCase()}` : hoSoData?.hoSos[0].groupName?.toLocaleUpperCase()

                const tieuDeTrai2Value = usingQrCode
                    ?
                    hoSoData?.hoSos[0].catalog == 'so-ban-nganh' ? `TỈNH ${tenTinh?.toLocaleUpperCase()}` : `${TEN_BO_PHAN}`
                    :
                    hoSoData?.hoSos[0].catalog == 'so-ban-nganh' ? `${TEN_TRUNG_TAM}` : `${TEN_BO_PHAN}`

                const filteredValue = (groupName: string) => {
                    let value: string = ''
                    EXPAND_OFFICE_NAME.map((item: string) => {
                        if (groupName.toLocaleLowerCase().includes(item.toLocaleLowerCase()))
                            value = groupName.substring(item.length)
                    })
                    return value
                }

                const tenDiaDanh = hoSoData?.hoSos[0].catalog == 'so-ban-nganh'
                    ? tenTinh
                    : `${filteredValue(hoSoData?.hoSos[0].groupName || '') || tenTinh}`


                const tenNguoiNop = hoSoData?.hoSos[0].uyQuyen ? hoSoData?.hoSos[0].nguoiUyQuyen : hoSoData?.hoSos[0].chuHoSo
                const diaChiNguoiNop = hoSoData?.hoSos[0].uyQuyen ? hoSoData?.hoSos[0].diaChiNguoiUyQuyen : hoSoData?.hoSos[0].diaChiChuHoSo
                const soDienThoaiNguoiNop = hoSoData?.hoSos[0].uyQuyen ? hoSoData?.hoSos[0].soDienThoaiNguoiUyQuyen : hoSoData?.hoSos[0].soDienThoaiChuHoSo
                const emailNguoiNop = hoSoData?.hoSos[0].uyQuyen ? hoSoData?.hoSos[0].emailNguoiUyQuyen : hoSoData?.hoSos[0].emailChuHoSo
                const soGiayToNguoiNop = hoSoData?.hoSos[0].uyQuyen ? hoSoData?.hoSos[0].soGiayToNguoiUyQuyen : hoSoData?.hoSos[0].soGiayToChuHoSo

                const kenhThucHien = hoSoData?.hoSos[0].kenhThucHien == '1' ? 'Trực tiếp'
                    : hoSoData?.hoSos[0].kenhThucHien == '2' ? "Trực tuyến" : "BCCI"

                const donViTiepNhan =
                    hoSoData?.hoSos[0].catalog == 'so-ban-nganh' ?
                        `Trung tâm Phục vụ hành chính công tỉnh ${tenTinh}`
                        : `Bộ phận Tiếp nhận và Trả kết quả ${hoSoData?.hoSos[0].groupName}`

                const nhanKetQuaTai =
                    hoSoData?.hoSos[0].dangKyNhanHoSoQuaBCCIData !== "" ?
                        "Qua dịch vụ Bưu chính công ích" :
                        hoSoData?.hoSos[0].catalog == 'so-ban-nganh' ?
                            "Trung tâm Phục vụ hành chính công tỉnh" :
                            `Bộ phận Tiếp nhận và Trả kết quả ${hoSoData?.hoSos[0].groupName}`

                const traKetQuaKcnNghiSon =
                    hoSoData?.hoSos[0]?.dangKyNhanHoSoQuaBCCIData !== "" ?
                        "Qua dịch vụ Bưu chính công ích" :
                        `Bộ phận Tiếp nhận và Trả kết quả ${hoSoData?.hoSos[0]?.groupName}`

                const chuThichNhanKetQua = `Khi đến nhận kết quả: Người nộp mang theo Giấy này (trường hợp pháp luật có quy định Chủ hồ sơ phải trực tiếp đến nhận kết quả nhưng không đến được thì phải có giấy ủy quyền cho người khác đi nhận thay theo quy định).`
                const ngayTiepNhan = hoSoData?.hoSos[0].ngayTiepNhan ? dayjs(hoSoData?.hoSos[0].ngayTiepNhan).format("HH") + " giờ " + dayjs(hoSoData?.hoSos[0].ngayTiepNhan).format("mm") + " phút, ngày " + dayjs(hoSoData?.hoSos[0].ngayTiepNhan).format(FORMAT_DATE_WITHOUT_TIME) : ""
                const ngayHenTra = hoSoData?.hoSos[0].ngayHenTra ? dayjs(hoSoData?.hoSos[0].ngayHenTra).format("HH") + " giờ " + dayjs(hoSoData?.hoSos[0].ngayHenTra).format("mm") + " phút, ngày " + dayjs(hoSoData?.hoSos[0].ngayHenTra).format(FORMAT_DATE_WITHOUT_TIME) : ""
                const thoiHanXuLyHoSo = hoSoData?.hoSos[0].thoiGianThucHien && hoSoData?.hoSos[0].loaiThoiGianThucHien
                    ? `${hoSoData?.hoSos[0].thoiGianThucHien / 8} ${hoSoData?.hoSos[0].loaiThoiGianThucHien.toLocaleLowerCase()}` : ""
                const linkTraCuu = `${locationOrigin || location.origin}/portaldvc/tra-cuu?MaHoSo=${hoSoData?.hoSos[0].maHoSo}&SoDinhDanh=${hoSoData?.hoSos[0].soGiayToChuHoSo}`

                const nguoiNopHoSo = hoSoData?.hoSos[0].nguoiNopHoSo ? `${hoSoData?.hoSos[0].nguoiNopHoSo.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase())}` : ''
                const nguoiTiepNhan = hoSoData?.hoSos[0].nguoiTiepNhan ? `${hoSoData?.hoSos[0].nguoiTiepNhan.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase())}` : ''
                const noiDungYeuCauGiaiQuyet = hoSoData?.hoSos[0].trichYeuHoSo || ''


                await generateDocxWithImages(hoSoData?.urlPhoi || '', {
                    image: 'imageBase64',
                    ...hoSoData?.hoSos[0],
                    hoSos,
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
                    soLuongHoSo: buttonActionContext.selectedHoSos.length,
                    noiDungYeuCauGiaiQuyet: noiDungYeuCauGiaiQuyet,
                    thoiHanXuLyHoSo: thoiHanXuLyHoSo,
                    linkTraCuu: linkTraCuu,
                    donViTiepNhan: donViTiepNhan,
                    nhanKetQuaTai: nhanKetQuaTai,
                    traKetQuaKcnNghiSon: traKetQuaKcnNghiSon,
                    chuThichNhanKetQua: chuThichNhanKetQua,
                    ngayTiepNhan: ngayTiepNhan,
                    ngayHenTra: ngayHenTra,
                    nguoiNopHoSo: nguoiNopHoSo,
                    nguoiTiepNhan: nguoiTiepNhan,
                    qrTraCuu: xuLyHoSoContext.qrTraCuu,
                    qrThongTinPhieu: xuLyHoSoContext.qrThongTinPhieu,
                    barcodeThongTinPhieu: xuLyHoSoContext.barcodeThongTinPhieu,
                    chuKyDienTu: xuLyHoSoContext.base64ChuKyDienTu

                }, "phieuTiepNhan.phoi.docx", async (blob) => {

                    saveAs(blob, 'Phiếu tiếp nhận hồ sơ và hẹn trả kết quả.docx')
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