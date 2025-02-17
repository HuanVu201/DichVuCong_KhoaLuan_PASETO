import { DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'

export const PhieuGopY = () => {
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
                    <div style={{ display: 'flex', }}>
                        <div style={{ flex: 1, textAlign: 'center', }}>
                            <span>VĂN PHÒNG ỦY BAN NHÂN DÂN TỈNH THANH HÓA</span><br />
                            <strong>TRUNG TÂM PHỤC VỤ HÀNH CHÍNH CÔNG</strong><br />
                            <strong>*****</strong>
                        </div>


                    </div>
                </div>

                {/* <!-- Title --> */}
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', margin: '20px 0 10px 0', }}>
                    <strong>PHIẾU GÓP Ý CỦA TỔ CHỨC, CÁ NHÂN</strong>
                </div>
                {/* <!-- Content --> */}
                <div style={{ width: '90%', margin: 'auto', }}>
                    <div style={{ marginBottom: '8px', }}>
                        <strong>Ông (Bà) vui lòng cho ý kiến của mình về các nội dung sau:</strong>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Cán bộ cần góp ý: …
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Nội dung giải quyết TTHC: …
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Nhận xét về chất lượng giải quyết TTHC của Trung tâm:

                        <table
                            style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: '13px', }}>
                            <tr>
                                <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                    Stt
                                </td>
                                <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                    Nội dung nhận xét
                                </td>
                                <td colSpan={3} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                    Ý kiến đánh giá
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>
                                    1
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>
                                    Thời gian giải quyết TTHC
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>
                                    <div>
                                        <span>Đúng hạn:</span>
                                        <div style={{ border: '1px solid #333', width: '50px', height: '20px', margin: '3px auto 0', }}>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>
                                    <div>
                                        <span>Trước hạn:</span>
                                        <div style={{ border: '1px solid #333', width: '50px', height: '20px', margin: '3px auto 0', }}>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>
                                    <div>
                                        <span>Chậm:</span>
                                        <div style={{ border: '1px solid #333', width: '50px', height: '20px', margin: '3px auto 0', }}>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>
                                    2
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>
                                    Phong cách phục vụ
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>
                                    <div>
                                        <span>Tốt:</span>
                                        <div style={{ border: '1px solid #333', width: '50px', height: '20px', margin: '3px auto 0', }}>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>
                                    <div>
                                        <span>Bình thường:</span>
                                        <div style={{ border: '1px solid #333', width: '50px', height: '20px', margin: '3px auto 0', }}>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>
                                    <div>
                                        <span>Chưa tốt:</span>
                                        <div style={{ border: '1px solid #333', width: '50px', height: '20px', margin: '3px auto 0', }}>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Ý kiến đánh giá khác (nếu có):
                        <div style={{ width: '100%', minHeight: '60px', }}></div>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Họ tên người góp ý (không bắt buộc):…………………………………………….
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Số điện thoại:………………………………………………………………………
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'right' }}>
                            <div style={{ width: '250px', display: 'flex', flexDirection: 'column', }}>
                                <i>Thanh Hóa, <span >ngày {DATE} tháng {MONTH} năm {YEAR}</span></i>

                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', margin: '20px 0 10px 0', }}>
                    <strong>TRUNG TÂM HÀNH CHÍNH CÔNG TỈNH THANH HÓA</strong>
                    <strong>TRÂN TRỌNG CẢM ƠN!</strong>
                </div>

            </div>
        </div>
    </>
}