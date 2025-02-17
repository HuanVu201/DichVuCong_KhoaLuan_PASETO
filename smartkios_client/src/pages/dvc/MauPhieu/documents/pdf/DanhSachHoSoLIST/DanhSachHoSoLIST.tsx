import { DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'

export const DanhSachHoSoLIST = () => {
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
                    <div style={{ display: 'flex', marginTop: '6px', }}>
                        <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', }}>

                        </div>
                        <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', }}>
                            <i>Thanh Hóa, <span >ngày {DATE} tháng {MONTH} năm {YEAR}</span></i>

                        </div>
                    </div>
                </div>

                {/* <!-- Title --> */}
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', margin: '20px 0 10px 0', }}>
                    <strong>...</strong>
                    <i>...</i>
                </div>
                {/* <!-- Content --> */}
                <div style={{ margin: 'auto', }}>
                    <table
                        style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: '13px', }}>
                        <tr>
                            <td rowSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                TT
                            </td>
                            <td rowSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Mã hồ sơ
                            </td>
                            <td rowSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Nội dung hồ sơ
                            </td>
                            <td rowSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Số lượng hồ sơ (bộ)
                            </td>
                            <td rowSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Tên chủ hồ sơ
                            </td>
                            <td rowSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Địa chỉ chủ hồ sơ
                            </td>
                            <td rowSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Số điện thoại
                            </td>
                            <td colSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Ngày, tháng, năm
                            </td>
                            <td rowSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Ghi chú
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Nhận hồ sơ
                            </td>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Hẹn trả kết quả
                            </td>
                        </tr>

                        <tr>
                            <td id="STT" style={{ border: '1px solid #333', padding: '5px', }}>
                                1
                            </td>
                            <td id="MaHoSo" style={{ border: '1px solid #333', padding: '5px', }}>
                                2
                            </td>
                            <td id="TenHoSo" style={{ border: '1px solid #333', padding: '5px', }}>
                                3
                            </td>
                            <td id="SoLuong" style={{ border: '1px solid #333', padding: '5px', }}>
                                4
                            </td>
                            <td id="NguoiNop" style={{ border: '1px solid #333', padding: '5px', }}>
                                5
                            </td>
                            <td id="DiaChi" style={{ border: '1px solid #333', padding: '5px', }}>
                                6
                            </td>
                            <td id="SoDienThoai" style={{ border: '1px solid #333', padding: '5px', }}>
                                7
                            </td>
                            <td id="NgayNhan" style={{ border: '1px solid #333', padding: '5px', }}>
                                8
                            </td>
                            <td id="HenTra" style={{ border: '1px solid #333', padding: '5px', }}>
                                9
                            </td>
                            <td id="NgayTraKetQua" style={{ border: '1px solid #333', padding: '5px', }}>
                                10
                            </td>

                        </tr>
                    </table>

                </div>
            </div>

            <div id="pointBreakPage"></div>
            <div id="signature" style={{ width: '650px', height: '160px', margin: '0 auto', }}>
                <div style={{ display: 'flex', textAlign: 'center', marginTop: '20px', }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'left', }}>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', }}>
                        <strong>NGƯỜI BÁO CÁO</strong>
                        <div style={{ width: '100px', height: '60px', margin: '10px auto', }}></div>
                        <span>Tên</span>

                    </div>
                </div>
            </div>
        </div>
    </>
}