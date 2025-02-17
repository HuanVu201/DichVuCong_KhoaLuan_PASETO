import { API_VERSION, CURRENTTIME_ISOSTRING, DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, UPLOADFILE_ENDPOINT, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'
import { EXPAND_OFFICE_NAME, MA_PHIEU_BAN_GIAO_KET_QUA, TEN_BO_PHAN, TEN_PHIEU_BAN_GIAO_KET_QUA, TEN_TRUNG_TAM } from ".."
import { IBanGiaoKetQua, IBanGiaoKetQuaElement, IBanGiaoKetQuaResponse } from "@/pages/dvc/traketqua/chotraketquatthcc/model"
import { useXuLyHoSoContext } from "@/features/hoso/contexts/XuLyHoSoContext"
import QrCode from "qrcode"
import { generateDocxWithImages } from "@/utils/common"
import { fileApi } from "@/features/file/services"
import { useAppSelector } from "@/lib/redux/Hooks"
import { toast } from "react-toastify"
import axiosInstance from "@/lib/axios"
import { IResult } from "@/models"
import { giayToHoSoApi } from "@/features/giaytohoso/service"
import saveAs from "file-saver"

export const PhieuBanGiaoKetQua = () => {
    const [banGiaoData, setBanGiaoData] = useState<IBanGiaoKetQua>()
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
            setBanGiaoData(undefined)
        }

    }, [xuLyHoSoContext.xuatWord, xuLyHoSoContext.reload])

    useEffect(() => {
        (async () => {
            if (buttonActionContext.selectedHoSos.length && !banGiaoData) {
                xuLyHoSoContext.setLoading(true)
                var sltHoSos = buttonActionContext.selectedHoSos.map((i) => i.toString());
                const res = await hoSoApi.BanGiaoKetQuaHoSo({
                    ids: sltHoSos,
                    tenGiayTo: "Giấy bàn giao kết quả quá trình giải quyết TTHC",
                    maLoaiPhieu: `${MA_PHIEU_BAN_GIAO_KET_QUA}`,
                    loaiPhoi: 'mau-phoi-phieu',
                    code: 'phieu-ban-giao-ket-qua'
                })

                if (res.status == 200) {
                   
                    setBanGiaoData(res.data.data)
                } else {
                    toast.error("Lỗi lấy thông tin xuất phiếu")
                    xuLyHoSoContext.setLoading(false)
                }

            }
        })()
    }, [banGiaoData])

    useEffect(() => {
        if (banGiaoData) {
            let maGiayTo: string = ''
            banGiaoData.hoSos.forEach((ele: IBanGiaoKetQuaElement) => {
                maGiayTo += `${ele.maHoSo ? ele.maHoSo : ele.id}_`
            });
            xuLyHoSoContext.setMaGiayToHoSo(`${maGiayTo}${MA_PHIEU_BAN_GIAO_KET_QUA}`)
        }

        if (banGiaoData) {
            setTenTinh(banGiaoData.tenTinh?.split(' ').slice(1).join(' ')) //Dạng Thanh Hóa, Ninh Thuận,...
            setMaTinh(banGiaoData.hoSos[0].maTinh) //Dạng Thanh Hóa => 38, Ninh Thuận => 58,...
            setLinkQrCodeThongTin(`${locationOrigin || location.origin}/apiqr/qr?id=${banGiaoData?.idQrCode || 'undefined'}`)
        }
    }, [banGiaoData])


    useEffect(() => {
        (async () => {
            const currentDate = new Date();
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            const getmonth = (currentDate.getMonth() + 1);
            const month = getmonth < 3 ? getmonth.toString().padStart(2, '0') : getmonth;
            const year = currentDate.getFullYear();
            const hoSos = banGiaoData?.hoSos?.map(
                (item: IBanGiaoKetQuaElement, index: number) => ({
                    ...item,
                    index: index + 1,
                    thuPhi: item.trangThaiPhiLePhi ? "X" : "",
                    nhanBCCI: item.dangKyNhanHoSoQuaBCCIData ? "X" : "",
                    loaiKetQua: item.loaiKetQua == 'Bổ sung' || item.loaiKetQua == 'Trả lại/Xin rút'
                        ? `Loại kết quả: ${item.loaiKetQua}.` : "",
                    trichYeuKetQua: item.trichYeuKetQua || '',
                    trichYeuHoSo: item.trichYeuHoSo || ''
                }))

            if (xuLyHoSoContext.qrThongTinPhieu && !xuLyHoSoContext.xuatWord) {
                const tieuDeTrai1Value = usingQrCode
                    ?
                    banGiaoData?.hoSos[0]?.catalog == 'so-ban-nganh' ? `${TEN_TRUNG_TAM}` : banGiaoData?.hoSos[0]?.groupName?.toLocaleUpperCase()
                    :
                    banGiaoData?.hoSos[0]?.catalog == 'so-ban-nganh' ? `UBND TỈNH ${tenTinh?.toLocaleUpperCase()}` : banGiaoData?.hoSos[0]?.groupName?.toLocaleUpperCase()

                const tieuDeTrai2Value = usingQrCode
                    ?
                    banGiaoData?.hoSos[0]?.catalog == 'so-ban-nganh' ? `TỈNH ${tenTinh?.toLocaleUpperCase()}` : `${TEN_BO_PHAN}`
                    :
                    banGiaoData?.hoSos[0]?.catalog == 'so-ban-nganh' ? `${TEN_TRUNG_TAM}` : `${TEN_BO_PHAN}`

                const filteredValue = (groupName: string) => {
                    let value: string = ''
                    EXPAND_OFFICE_NAME.map((item: string) => {
                        if (groupName.toLocaleLowerCase().includes(item.toLocaleLowerCase()))
                            value = groupName.substring(item.length)
                    })
                    return value
                }

                const tenDiaDanh = banGiaoData?.hoSos[0]?.catalog == 'so-ban-nganh'
                    ? tenTinh
                    : `${filteredValue(banGiaoData?.hoSos[0]?.groupName || '') || tenTinh}`

                const donViTiepNhan =
                    banGiaoData?.hoSos[0]?.catalog == 'so-ban-nganh' ?
                        `Trung tâm Phục vụ hành chính công tỉnh ${tenTinh}`
                        : `Bộ phận Tiếp nhận và Trả kết quả ${banGiaoData?.hoSos[0]?.groupName}`


                await generateDocxWithImages(banGiaoData?.urlPhoi || '', {
                    image: 'imageBase64',
                    hoSos,
                    tieuDeTrai1: tieuDeTrai1Value,
                    tieuDeTrai2: tieuDeTrai2Value,
                    tenDiaDanh: tenDiaDanh,
                    ngayThangNam: `ngày ${day} tháng ${month} năm ${year}`,
                    tenDonVi: donViTiepNhan,
                    thoiGianBanGiao: `${hours} giờ ${minutes} phút, ngày ${day} tháng ${month} năm ${year}`,
                    tenNguoiGiao: user?.fullName || '',
                    tenNguoiNhan: '',
                    qrThongTinPhieu: xuLyHoSoContext.qrThongTinPhieu,
                }, "phieuBanGiaoKetQua.phoi.docx", async (blob) => {
                    const res = await fileApi.UploadPdfBucketAsStream({
                        blob: blob,
                        fileName: `PhieuBanGiaoKetQuaHoSo.docx`,
                        folderName: `PhieuBanGiaoKetQua${maTinh}`,
                        loaiGiayTo: TEN_PHIEU_BAN_GIAO_KET_QUA,
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
    }, [xuLyHoSoContext.qrThongTinPhieu, xuLyHoSoContext.qrTraCuu, xuLyHoSoContext.barcodeThongTinPhieu])


    useEffect(() => {
        (async () => {
            const currentDate = new Date();
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            const getmonth = (currentDate.getMonth() + 1);
            const month = getmonth < 3 ? getmonth.toString().padStart(2, '0') : getmonth;
            const year = currentDate.getFullYear();
            const hoSos = banGiaoData?.hoSos?.map(
                (item: IBanGiaoKetQuaElement, index: number) => ({
                    ...item,
                    index: index + 1,
                    thuPhi: item.trangThaiPhiLePhi ? "X" : "",
                    nhanBCCI: item.dangKyNhanHoSoQuaBCCIData ? "X" : "",
                    loaiKetQua: item.loaiKetQua == 'Bổ sung' || item.loaiKetQua == 'Trả lại/Xin rút'
                        ? `Loại kết quả: ${item.loaiKetQua}.` : "",
                    trichYeuKetQua: item.trichYeuKetQua || '',
                    trichYeuHoSo: item.trichYeuHoSo || ''
                }))

            if (xuLyHoSoContext.qrThongTinPhieu && xuLyHoSoContext.xuatWord) {
                const tieuDeTrai1Value = usingQrCode
                    ?
                    banGiaoData?.hoSos[0]?.catalog == 'so-ban-nganh' ? `${TEN_TRUNG_TAM}` : banGiaoData?.hoSos[0]?.groupName?.toLocaleUpperCase()
                    :
                    banGiaoData?.hoSos[0]?.catalog == 'so-ban-nganh' ? `UBND TỈNH ${tenTinh?.toLocaleUpperCase()}` : banGiaoData?.hoSos[0]?.groupName?.toLocaleUpperCase()

                const tieuDeTrai2Value = usingQrCode
                    ?
                    banGiaoData?.hoSos[0]?.catalog == 'so-ban-nganh' ? `TỈNH ${tenTinh?.toLocaleUpperCase()}` : `${TEN_BO_PHAN}`
                    :
                    banGiaoData?.hoSos[0]?.catalog == 'so-ban-nganh' ? `${TEN_TRUNG_TAM}` : `${TEN_BO_PHAN}`

                const filteredValue = (groupName: string) => {
                    let value: string = ''
                    EXPAND_OFFICE_NAME.map((item: string) => {
                        if (groupName.toLocaleLowerCase().includes(item.toLocaleLowerCase()))
                            value = groupName.substring(item.length)
                    })
                    return value
                }

                const tenDiaDanh = banGiaoData?.hoSos[0]?.catalog == 'so-ban-nganh'
                    ? tenTinh
                    : `${filteredValue(banGiaoData?.hoSos[0]?.groupName || '') || tenTinh}`

                const donViTiepNhan =
                    banGiaoData?.hoSos[0]?.catalog == 'so-ban-nganh' ?
                        `Trung tâm Phục vụ hành chính công tỉnh ${tenTinh}`
                        : `Bộ phận Tiếp nhận và Trả kết quả ${banGiaoData?.hoSos[0]?.groupName}`




                await generateDocxWithImages(banGiaoData?.urlPhoi || '', {
                    image: 'imageBase64',
                    hoSos,
                    tieuDeTrai1: tieuDeTrai1Value,
                    tieuDeTrai2: tieuDeTrai2Value,
                    tenDiaDanh: tenDiaDanh,
                    ngayThangNam: `ngày ${day} tháng ${month} năm ${year}`,
                    tenDonVi: donViTiepNhan,
                    thoiGianBanGiao: `${hours} giờ ${minutes} phút, ngày ${day} tháng ${month} năm ${year}`,
                    tenNguoiGiao: user?.fullName || '',
                    tenNguoiNhan: '',
                    qrThongTinPhieu: xuLyHoSoContext.qrThongTinPhieu,
                }, "phieuBanGiaoKetQua.phoi.docx", async (blob) => {

                    saveAs(blob, 'Phiếu bàn giao kết quả xử lý hồ sơ.docx')
                    xuLyHoSoContext.setLoading(false)
                    xuLyHoSoContext.setXuatWord(false)

                }, false, usingQrCode ? [80, 80] : [250, 75], "blob")
            }

        })()
    }, [xuLyHoSoContext.qrThongTinPhieu, xuLyHoSoContext.qrTraCuu, xuLyHoSoContext.barcodeThongTinPhieu])


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