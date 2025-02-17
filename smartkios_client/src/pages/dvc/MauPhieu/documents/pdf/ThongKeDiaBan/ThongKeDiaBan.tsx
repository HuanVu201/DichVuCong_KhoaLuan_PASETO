import { DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'

export const ThongKeDiaBan = () => {
    const [hoSo, setHoSo] = useState<IHoSo>()
    const buttonActionContext = useButtonActionContext()

    useEffect(() => {
        (async () => {
            if (buttonActionContext.selectedHoSos.length) {
                const res = await hoSoApi.GetPrintData(buttonActionContext.selectedHoSos[0] as string)
                const hoSo = res.data.data
                setHoSo(hoSo)
            }
        })()
    }, [buttonActionContext])


    return <>
        <div id="ContainerSwapper" style={{ fontSize: '13px', fontFamily: "'Times New Roman', Times, serif" }} >
            <div id="Content" style={{ width: '650px', margin: '0 auto', }}>
                {/* <!-- Title --> */}
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', margin: '20px 0 10px 0', }}>
                    <strong>DANH SÁCH HỒ SƠ THỦ TỤC HÀNH CHÍNH THEO ĐỊA BÀN</strong>
                    <i>(Từ ngày … đến ngày … )</i>
                    <strong>Khu vực: … - …</strong>

                </div>
                {/* <!-- Content --> */}
                <div style={{ width: '90%', margin: 'auto', }}>
                    <table
                        style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: '13px', }}>
                        <tr>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                TT
                            </td>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Mã hồ sơ
                            </td>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Họ tên chủ hồ sơ
                            </td>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Nội dung hồ sơ
                            </td>
                        </tr>
                        <tr>
                            <td id="STT" style={{ border: '1px solid #333', padding: '5px', }}>
                                STT
                            </td>
                            <td id="MaHoSo" style={{ border: '1px solid #333', padding: '5px', }}>
                                MaHoSo
                            </td>
                            <td id="NguoiNop" style={{ border: '1px solid #333', padding: '5px', }}>
                                NguoiNop
                            </td>
                            <td  style={{ border: '1px solid #333', padding: '5px', textAlign: 'left',}}>
                                (Nội dung)
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </>
}