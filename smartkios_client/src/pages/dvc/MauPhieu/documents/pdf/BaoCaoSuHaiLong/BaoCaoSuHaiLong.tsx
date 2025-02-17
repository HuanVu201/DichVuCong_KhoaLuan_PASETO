import { DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'

export const BaoCaoSuHaiLong = () => {
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
                    <strong>BÁO CÁO KẾT QUẢ ĐÁNH GIÁ SỰ HÀI LÒNG </strong>
                    <i>(Từ ngày … đến ngày … )</i>
                </div>
                {/* <!-- Content --> */}
                <div style={{ margin: 'auto', }}>
                    <div style={{ marginBottom: '8px', paddingLeft: '30px', }}>
                        Nội dung đánh giá: Ông/Bà đánh giá như thế nào về thái độ công chức khi tiếp nhận và hướng dẫn giải
                        quyết hồ sơ? <br />
                        Kết quả đánh giá của tổ chức, cá nhân như sau:
                    </div>
                    <table
                        style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: '13px', }}>
                        <tr>
                            <td rowSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Đơn vị
                            </td>
                            <td rowSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Công chức tiếp nhận

                            </td>
                            <td rowSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Tổng số phiếu
                            </td>
                            <td colSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Rất hài lòng
                            </td>
                            <td colSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Hài lòng
                            </td>
                            <td colSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Không hài lòng
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Số phiếu
                            </td>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Tỷ lệ
                            </td>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Số phiếu
                            </td>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Tỷ lệ
                            </td>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Số phiếu
                            </td>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Tỷ lệ
                            </td>
                        </tr>
                        <tr>
                            <td id="DonVi" style={{ border: '1px solid #333', padding: '5px', }}>
                                1
                            </td>
                            <td id="TenNguoiDung" style={{ border: '1px solid #333', padding: '5px', }}>
                                2
                            </td>
                            <td id="TongDanhGia" style={{ border: '1px solid #333', padding: '5px', }}>
                                3
                            </td>
                            <td id="RHL" style={{ border: '1px solid #333', padding: '5px', }}>
                                4
                            </td>
                            <td id="TiLeRHL" style={{ border: '1px solid #333', padding: '5px', }}>
                                5
                            </td>
                            <td id="HL" style={{ border: '1px solid #333', padding: '5px', }}>
                                6
                            </td>
                            <td id="TiLeHL" style={{ border: '1px solid #333', padding: '5px', }}>
                                7
                            </td>
                            <td id="KHL" style={{ border: '1px solid #333', padding: '5px', }}>
                                8
                            </td>
                            <td id="TiLeKHL" style={{ border: '1px solid #333', padding: '5px', }}>
                                9
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </>
}