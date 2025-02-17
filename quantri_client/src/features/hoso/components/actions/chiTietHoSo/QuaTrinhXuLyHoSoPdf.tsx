import { FORMAT_DATE_WITHOUT_TIME, HOST_PATH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, PDF_TEN_TINH_LOWER_CASE, API_VERSION, UPLOADFILE_ENDPOINT, CURRENTTIME_ISOSTRING, FORMAT_TIME } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import JsBarcode from 'jsbarcode'
import QrCode from 'qrcode'
import dayjs from 'dayjs'
import { giayToHoSoApi } from "@/features/giaytohoso/service"
import { useXuLyHoSoContext } from "@/features/hoso/contexts/XuLyHoSoContext"
import { toast } from "react-toastify"
import { generateDocxWithImages } from "@/utils/common"
import { fileApi } from "@/features/file/services"
import { getFile } from "@/utils"
import { IThanhPhanHoSo } from "@/features/thanhphanhoso/models"
import { IResult } from "@/models"
import axiosInstance from "@/lib/axios"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { GetMauPhoi, GetUrlPhoi, SearchMauPhoi } from "@/features/quanlymauphoi/redux/action"
import { IMauPhoi } from "@/features/quanlymauphoi/models"
import { IQuaTrinhXuLyHoSo } from "@/features/quatrinhxulyhoso/models"
export const QuaTrinhXuLyHoSoPdf = () => {
    const xuLyHoSoContext = useXuLyHoSoContext()
    const { data: hoSo } = useAppSelector(state => state.hoso)
    const { datas: quaTrinhXuLyHoSos } = useAppSelector(state => state.quatrinhxulyhoso)
    const dispatch = useAppDispatch()
    const buttonActionContext = useButtonActionContext()
    const [urlPhoi, setUrlPhoi] = useState<string>()


    useEffect(() => {
        (async () => {
            if (buttonActionContext.xuatQuaTrinhXuLyHoSoModalVisible && !urlPhoi) {
                xuLyHoSoContext.setLoading(true)
                const res = await dispatch(GetUrlPhoi({
                    loaiPhoi: 'mau-phoi-phieu',
                    code: 'qua-trinh-xu-ly-ho-so'
                }))
                if (res.payload) {
                    setUrlPhoi(res.payload as string)
                } else {
                    toast.error("Không tìm thấy phôi!")
                    xuLyHoSoContext.setLoading(false)
                }
            }
        })()

    }, [buttonActionContext.xuatQuaTrinhXuLyHoSoModalVisible])

    useEffect(() => {
        (async () => {
            if (urlPhoi) {

                const currentDate = new Date();
                const day = currentDate.getDate().toString().padStart(2, '0');
                const getmonth = (currentDate.getMonth() + 1);
                const month = getmonth < 3 ? getmonth.toString().padStart(2, '0') : getmonth;
                const year = currentDate.getFullYear();
                const quaTrinhs = quaTrinhXuLyHoSos?.map(
                    (item: IQuaTrinhXuLyHoSo, index: number) => ({
                        ...item,
                        index: index + 1,
                        ngayGui: item.thoiGian ? dayjs(item.thoiGian).format(FORMAT_TIME) : "",
                        nguoiXuLy: item.tenNguoiGui || "",
                        nguoiNhan: item.tenNguoiNhan || "",
                        thaoTac: item.thaoTac ? item.thaoTac : '',
                        thoiHanNguoiGui: item.ngayHetHanBuocXuLy ? dayjs(item.ngayHetHanBuocXuLy).format(FORMAT_TIME) : ""

                    }))
                if (quaTrinhs && hoSo) {
                    await generateDocxWithImages(urlPhoi || '', {
                        image: 'imageBase64',
                        ...hoSo,
                        quaTrinhs,
                        ngayTiepNhan: hoSo.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format(FORMAT_TIME) : '',
                        ngayHenTra: hoSo.ngayHenTra ? dayjs(hoSo.ngayHenTra).format(FORMAT_TIME) : ''
                    }, "QuaTrinhXuLyHoSo.phoi.docx", async (blob) => {
                        const res = await fileApi.UploadPdfBucketAsStream({
                            blob: blob,
                            fileName: `QuaTrinhXuLyHoSo.docx`,
                            folderName: `QuaTrinhXuLyHoSo`,
                            addGTHS: '0',
                        })
                        if (res.status == 200) {
                            toast.success("Xuất phiếu mới thành công!")
                            xuLyHoSoContext.setPdfBlob(res.data as any)
                        } else {
                            toast.error('Xuất phiếu thất bại!')
                        }
                        xuLyHoSoContext.setLoading(false)
                    }, false, undefined, "blob")
                }

            }
        })()
    }, [hoSo, quaTrinhXuLyHoSos, urlPhoi])


    return (
        <>
            <div style={{ height: '75vh' }} id="ContainerSwapper">
                {xuLyHoSoContext.pdfBlob ? <><iframe id="iframePdf" width="100%" height={"100%"} src={URL.createObjectURL(xuLyHoSoContext.pdfBlob as any)} /></> : null}

            </div>
        </>
    )

}