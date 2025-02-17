import { DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'

export const ThongKeThuTucPhatSinhHoSoBCCI = () => {
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
        <div id="ContainerSwapper" style={{ fontSize: '13px', fontFamily: "'Times New Roman', Times, serif" }}>
            <div id="Content" style={{ width: '650px', margin: '0 auto', }}>
                {/* <!-- Header --> */}
                <div className="header">
                    <div style={{ display: 'flex', fontWeight: 600, }}>
                        <div style={{ flex: 1, textAlign: 'center', }}>
                            <strong>TRUNG TÂM PHỤC VỤ HÀNH CHÍNH CÔNG</strong><br />
                            <strong>TỈNH THANH HÓA</strong>
                            <hr
                                style={{ height: '1px', width: '55px', margin: '0 auto', color: 'black', backgroundColor: 'black', border: 'none', }} />
                        </div>

                        <div style={{ flex: 1, textAlign: 'center', }}>
                            <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br />
                            <strong>Độc lập - Tự do - Hạnh phúc</strong>
                            <hr
                                style={{ height: '1px', width: '160px', margin: '0 auto', color: 'black', backgroundColor: 'black', border: 'none', }} />
                        </div>
                    </div>


                </div>
                {/* <!-- Title --> */}
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', margin: '20px 0 10px 0', }}>
                    <strong>TỔNG HỢP THỦ TỤC PHÁT SINH HỒ SƠ TRẢ QUA BCCI</strong>
                    <i>(Từ ngày … đến ngày … )</i>
                </div>
                {/* <!-- Content --> */}
                <div style={{ width: '90%', margin: 'auto', }}>
                    <table
                        style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: '12px', }}>
                        <tr>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>Mã thủ tục</td>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>Mức độ</td>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, width: '40%', }}>Tên thủ tục hành chính</td>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>Trả kết quả qua BCCI</td>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>Tiếp nhận qua BCCI</td>
                        </tr>
                        <tr>
                            <td id="LinhVuc" style={{ border: '1px solid #333', padding: '5px', }}>
                                1.010708.000.00.00.H56
                            </td>
                            <td id="MucDo" style={{ border: '1px solid #333', padding: '5px', }}>
                                Mức độ
                            </td>
                            <td id="TenThuTuc" style={{ border: '1px solid #333', padding: '5px', }}>
                                Tên thủ tục
                            </td>
                            <td id="TraKetQuaBCCI" style={{ border: '1px solid #333', padding: '5px', }}>
                                Trả kết quả BCCI
                            </td>
                            <td id="TiepNhanQuaBCCI" style={{ border: '1px solid #333', padding: '5px', }}>
                                Tiếp nhận qua BCCI
                            </td>
                        </tr>
                        <tr>
                            <td id="LinhVuc" style={{ border: '1px solid #333', padding: '5px', }}>
                                1.010708.000.00.00.H56
                            </td>
                            <td id="MucDo" style={{ border: '1px solid #333', padding: '5px', }}>
                                Mức độ
                            </td>
                            <td id="TenThuTuc" style={{ border: '1px solid #333', padding: '5px', }}>
                                Tên thủ tục
                            </td>
                            <td id="TraKetQuaBCCI" style={{ border: '1px solid #333', padding: '5px', }}>
                                Trả kết quả BCCI
                            </td>
                            <td id="TiepNhanQuaBCCI" style={{ border: '1px solid #333', padding: '5px', }}>
                                Tiếp nhận qua BCCI
                            </td>
                        </tr>
                    </table>

                </div>
            </div>

            <div id="pointBreakPage"></div>
            <div id="signature" style={{ width: '650px', height: '160px', margin: ' 0 auto', }}>
                <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'right', textAlign: 'center' }}>
                    <div style={{ width: '300px', display: 'flex', flexDirection: 'column', }}>
                        <i>Thanh Hóa, <span >ngày {DATE} tháng {MONTH} năm {YEAR}</span></i>
                        <strong>Người báo cáo</strong>
                        <div style={{ width: '120px', height: '90px', margin: '10px auto' }}>

                        </div>
                        <strong></strong>
                    </div>
                </div>
            </div>
        </div>
    </>
}