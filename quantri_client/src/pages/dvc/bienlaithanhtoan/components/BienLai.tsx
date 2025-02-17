import { IBienLaiThanhToan } from "../models/IBienLaiThanhToan";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { generateDocxWithImages } from "@/utils/common"
import { fileApi } from "@/features/file/services"
import { getFile } from "@/utils"
import { GetUrlPhoi } from "@/features/quanlymauphoi/redux/action"
import { getCurrency, numberToCurrencyText } from "@/utils";

export const BienLaiDetailView = ({ loaiPhi, bienLaiData, pdfBlob, setPdfBlob, docxBlob, setDocxBlob, loading, setLoading }:
    {
        loaiPhi: string,
        bienLaiData: IBienLaiThanhToan,
        pdfBlob: Blob | undefined, setPdfBlob: (pdfBlob: Blob | undefined) => void,
        docxBlob: Blob | undefined, setDocxBlob: (pdfBlob: Blob | undefined) => void,
        loading: boolean, setLoading: (value: boolean) => void
    }) => {
    const dispatch = useAppDispatch()
    const [urlPhoi, setUrlPhoi] = useState<string>()
    const { publicModule: config } = useAppSelector(state => state.config)

    let tenDonVi: string //Dạng TỈNH THANH HÓA / TỈNH NINH THUẬN...
    let tenTinh: string //Dạng Thanh Hóa / Ninh Thuận...
    config?.map((item: any) => {
        if (item.code == "ten-don-vi") {
            tenDonVi = item.content
            tenTinh = tenDonVi.split(' ').slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
        }

    })

    useEffect(() => {
        (async () => {
            const res: any = await dispatch(GetUrlPhoi({
                loaiPhoi: 'mau-phoi-phieu',
                code: 'bien-lai-thu-phi-le-phi',
            }))
            if (res.payload) {
                setUrlPhoi(res.payload)
            }
        })()
    }, [bienLaiData])


    useEffect(() => {
        if (urlPhoi) {
            (async () => {
                const currentDate = new Date();
                const day = currentDate.getDate().toString().padStart(2, '0');
                const getmonth = (currentDate.getMonth() + 1);
                const month = getmonth < 3 ? getmonth.toString().padStart(2, '0') : getmonth;
                const year = currentDate.getFullYear();
                const soTien: number | any =
                    loaiPhi == 'phiLephi'
                        ?
                        bienLaiData.soTien || null
                        :
                        loaiPhi == 'phi' ? bienLaiData.phi : bienLaiData.lePhi
                function fomatNumber(number: number) {
                    return number.toLocaleString()
                }

                let soTienBangChu: string = ''
                if (soTien && soTien > 0) {
                    soTienBangChu = numberToCurrencyText(soTien);
                } else {
                    soTienBangChu = `Không nghìn đồng`
                }
                const chuHoSo: any = bienLaiData?.nguoiNopTienBienLai
                    ? bienLaiData.nguoiNopTienBienLai : bienLaiData?.chuHoSo
                let diaChiChuHoSo: any = bienLaiData?.nguoiNopTienBienLai
                    ? bienLaiData.diaChiBienLai : bienLaiData?.chuHoSo
                const hinhThucThanhToan =
                    bienLaiData.hinhThucThanhToan == 'truc-tuyen' ? 'Trực tuyến' :
                        bienLaiData.hinhThucThanhToan == 'tien-mat' ? 'Tiền mặt' :
                            bienLaiData.hinhThucThanhToan == 'chuyen-khoan' ? 'Chuyển khoản' : null

                await generateDocxWithImages(urlPhoi, {
                    image: 'imageBase64',
                    ...bienLaiData,
                    chuHoSo: chuHoSo,
                    diaChiChuHoSo: diaChiChuHoSo,
                    tenTinhThanh: tenTinh,
                    ngayThangNam: `ngày ${day} tháng ${month} năm ${year}`,
                    soTien: fomatNumber(soTien || 0),
                    soTienBangChu: soTienBangChu || null,
                    phi: fomatNumber(bienLaiData.phi || 0),
                    lePhi: fomatNumber(bienLaiData.lePhi || 0),
                    tenTTHC: bienLaiData.tenTTHC,
                    hinhThucThanhToan: hinhThucThanhToan,

                }, "BienLaiPhiLePhi.phoi.docx", async (blob) => {
                    const res = await fileApi.ConvertDocxToPdf({ data: blob, fileUrl: "BienLaiPhiLePhi.docx" } as any)
                    setPdfBlob(res.data)
                }, false, [0, 0], "base64")


                await generateDocxWithImages(urlPhoi, {
                    image: 'imageBase64',
                    ...bienLaiData,
                    tenTinhThanh: tenTinh,
                    ngayThangNam: `ngày ${day} tháng ${month} năm ${year}`,
                    soTien: fomatNumber(soTien || 0),
                    soTienBangChu: soTienBangChu || null,
                    tenTTHC: bienLaiData.tenTTHC,
                    hinhThucThanhToan: hinhThucThanhToan,

                }, "BienLaiPhiLePhi.phoi.docx", async (blob) => {
                    setDocxBlob(blob)
                }, false, [0, 0], "blob")
            })()
        }
    }, [urlPhoi])

    useEffect(() => {
        if (pdfBlob) {
            setLoading(false)
            toast.success('Xuất biên lai thành công!')
        }
    }, [pdfBlob])

    return (<>
        <div style={{ height: '75vh' }}>
            {pdfBlob ? <><iframe id="iframePdf" width="100%" height={"100%"} src={URL.createObjectURL(pdfBlob as any)} /></> : null}

        </div>
    </>)
}