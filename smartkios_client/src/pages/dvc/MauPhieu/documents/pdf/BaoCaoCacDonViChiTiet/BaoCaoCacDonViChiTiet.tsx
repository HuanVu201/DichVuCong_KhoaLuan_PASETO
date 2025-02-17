import { DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'

export const BaoCaoCacDonViChiTiet = () => {
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
                    <strong>TÌNH HÌNH TIẾP NHẬN VÀ GIẢI QUYẾT THỦ TỤC HÀNH CHÍNH</strong>
                    <span>(Kỳ thống kê: Từ ngày … đến ngày … )</span>
                </div>
                {/* <!-- Content --> */}
                <div style={{ margin: 'auto', }}>
                    <div style={{ marginBottom: '8px', paddingLeft: '50px', }}>
                        <strong>Đơn vị chủ trì giải quyết: …</strong>
                    </div>
                    <table
                        style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: '13px', }}>
                        <tr>
                            <td rowSpan={3} style={{ border: '1px solid #333', fontWeight: 600, }}>
                                TT
                            </td>
                            <td rowSpan={3} style={{ border: '1px solid #333', fontWeight: 600, }}>
                                Đơn vị
                            </td>
                            <td colSpan={3} style={{ border: '1px solid #333', fontWeight: 600, }}>
                                Tiếp nhận
                            </td>
                            <td colSpan={7} style={{ border: '1px solid #333', fontWeight: 600, }}>
                                Hồ sơ đã xử lý
                            </td>
                            <td colSpan={4} style={{ border: '1px solid #333', fontWeight: 600, }}>
                                Hồ sơ đang xử lý
                            </td>
                            <td rowSpan={2} colSpan={2} style={{ border: '1px solid #333', fontWeight: 600, }}>
                                Hồ sơ chờ bổ sung
                            </td>
                            <td rowSpan={2} colSpan={2} style={{ border: '1px solid #333', fontWeight: 600, }}>
                                Hồ sơ trả lại/Xin rút
                            </td>
                        </tr>
                        <tr>
                            <td rowSpan={2} style={{ border: '1px solid #333', fontWeight: 600, }}>
                                Tổng số
                            </td>
                            <td rowSpan={2} style={{ border: '1px solid #333', }}>
                                Kỳ trước
                            </td>
                            <td rowSpan={2} style={{ border: '1px solid #333', }}>
                                Trong kỳ
                            </td>
                            <td colSpan={2} style={{ border: '1px solid #333', fontWeight: 600, }}>
                                Trước hạn
                            </td>
                            <td colSpan={2} style={{ border: '1px solid #333', fontWeight: 600, }}>
                                Đúng hạn
                            </td>
                            <td colSpan={2} style={{ border: '1px solid #333', fontWeight: 600, }}>
                                Quá hạn
                            </td>
                            <td rowSpan={2} style={{ border: '1px solid #333', fontWeight: 600, }}>
                                Tỷ lệ trước hạn, đúng hạn

                            </td>
                            <td colSpan={2} style={{ border: '1px solid #333', fontWeight: 600, }}>
                                Trong hạn
                            </td>
                            <td colSpan={2} style={{ border: '1px solid #333', fontWeight: 600, }}>
                                Quá hạn
                            </td>

                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #333' }}>
                                Kỳ trước
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                Trong kỳ
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                Kỳ trước
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                Trong kỳ
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                Kỳ trước
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                Trong kỳ
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                Kỳ trước
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                Trong kỳ
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                Kỳ trước
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                Trong kỳ
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                Kỳ trước
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                Trong kỳ
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                Kỳ trước
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                Trong kỳ
                            </td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #333' }}>
                                1
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                2
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                3
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                4
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                5
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                6
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                7
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                8
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                9
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                10
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                11
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                12
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                13
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                14
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                15
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                16
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                17
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                18
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                19
                            </td>
                            <td style={{ border: '1px solid #333' }}>
                                20
                            </td>
                        </tr>
                    </table>

                </div>
            </div>

            <div id="pointBreakPage"></div>
            <div id="signature" style={{ width: '650px', height: '160px', margin: '0 auto', }}>
                <div style={{ display: 'flex', }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'left', }}>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'center', }}>
                        <i>Thanh Hóa, <span >ngày {DATE} tháng {MONTH} năm {YEAR}</span></i>
                        <strong>Người làm báo cáo</strong>
                        <div style={{ width: '100px', height: '60px', margin: '10px auto', }}></div>
                        <span>Tên</span>

                    </div>
                </div>
            </div>
        </div>
    </>
}