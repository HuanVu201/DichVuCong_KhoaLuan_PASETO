import { IBienLaiThanhToanPortal } from "../model";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { generateDocxWithImages } from "@/utils/common"
import { fileApi } from "@/features/file/services"
import { getFile } from "@/utils"
import { GetUrlPhoi } from "@/features/quanlymauphoi/redux/action"
import { getCurrency, numberToCurrencyText } from "@/utils";
import { useTraCuuBienLaiDienTuContext } from "../context/TraCuuBienLaiDienTuProvider";

export const BienLaiDetailPortal = () => {
    const traCuuContext = useTraCuuBienLaiDienTuContext()
    const dispatch = useAppDispatch()
    const [urlPhoi, setUrlPhoi] = useState<string>()
    const { publicModule: config } = useAppSelector(state => state.config)
    const [pdfBlob, setPdfBlob] = useState<Blob>()

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
    }, [traCuuContext.bienLaiDetail])


    useEffect(() => {
        if (urlPhoi) {
            (async () => {
                const currentDate = new Date();
                const day = currentDate.getDate().toString().padStart(2, '0');
                const getmonth = (currentDate.getMonth() + 1);
                const month = getmonth < 3 ? getmonth.toString().padStart(2, '0') : getmonth;
                const year = currentDate.getFullYear();
                const soTien: number | any =
                traCuuContext.getBienLaiParams?.loaiPhi == 'phiLephi'
                    ?
                    traCuuContext?.bienLaiDetail?.soTien || null
                    :
                    traCuuContext.getBienLaiParams?.loaiPhi == 'phi' ? traCuuContext?.bienLaiDetail?.phi : traCuuContext?.bienLaiDetail?.lePhi

                // const soTien: number | undefined = traCuuContext.getBienLaiParams?.loaiPhi == 'phi' ? traCuuContext.bienLaiDetail?.phi : traCuuContext.bienLaiDetail?.lePhi
                function fomatNumber(number: number) {
                    return number.toLocaleString()
                }

                let soTienBangChu: string = ''
                if (soTien && soTien > 0) {
                    soTienBangChu = numberToCurrencyText(soTien);
                } else {
                    soTienBangChu = `Không nghìn đồng`
                }

                const hinhThucThanhToan =
                    traCuuContext.bienLaiDetail?.hinhThucThanhToan == 'truc-tuyen' ? 'Trực tuyến' :
                        traCuuContext.bienLaiDetail?.hinhThucThanhToan == 'tien-mat' ? 'Tiền mặt' :
                            traCuuContext.bienLaiDetail?.hinhThucThanhToan == 'chuyen-khoan' ? 'Chuyển khoản' : null

                const chuHoSo: any = traCuuContext.bienLaiDetail?.nguoiNopTienBienLai
                    ? traCuuContext.bienLaiDetail.nguoiNopTienBienLai : traCuuContext.bienLaiDetail?.chuHoSo
                let diaChiChuHoSo: any=traCuuContext.bienLaiDetail?.nguoiNopTienBienLai
                ? traCuuContext.bienLaiDetail.diaChiBienLai : traCuuContext.bienLaiDetail?.chuHoSo

                await generateDocxWithImages(urlPhoi, {
                    image: 'imageBase64',
                    ...traCuuContext.bienLaiDetail,
                    chuHoSo: chuHoSo,
                    diaChiChuHoSo: diaChiChuHoSo,
                    tenTinhThanh: tenTinh,
                    ngayThangNam: `ngày ${day} tháng ${month} năm ${year}`,
                    soTien: fomatNumber(soTien || 0),
                    soTienBangChu: soTienBangChu || null,
                    phi: fomatNumber(traCuuContext.bienLaiDetail?.phi || 0),
                    lePhi: fomatNumber(traCuuContext.bienLaiDetail?.lePhi || 0),
                    tenTTHC: traCuuContext.bienLaiDetail?.tenTTHC,
                    hinhThucThanhToan: hinhThucThanhToan,

                }, "BienLaiPhiLePhi.phoi.docx", async (blob) => {
                    const res = await fileApi.ConvertDocxToPdf({ data: blob, fileUrl: "BienLaiPhiLePhi.docx" } as any)
                    setPdfBlob(res.data)
                }, false, [0, 0], "base64")

            })()
        }
    }, [urlPhoi])

    useEffect(() => {
        if (pdfBlob) {
            traCuuContext.setLoading(false)
            toast.success('Xuất biên lai thành công!')
        }
    }, [pdfBlob])

    return (<>
        <div style={{ height: '75vh' }}>
            {pdfBlob ? <><iframe id="iframePdf" width="100%" height={"100%"} src={URL.createObjectURL(pdfBlob as any)} /></> : null}

        </div>
    </>)
}