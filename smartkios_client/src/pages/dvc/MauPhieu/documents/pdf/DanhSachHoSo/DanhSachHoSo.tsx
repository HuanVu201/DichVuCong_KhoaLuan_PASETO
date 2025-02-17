import { DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'

export const DanhSachHoSo = () => {
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
                    <strong>DANH SÁCH BÀN GIAO HỒ SƠ</strong>
                    <span>...</span>
                </div>
                {/* <!-- Content --> */}
                <div style={{ margin: 'auto', }}>
                    <div style={{ marginBottom: '8px', }}>
                        Cơ quan chủ trì giải quyết: …
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Thời gian bàn giao: …
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Tổng số hồ sơ bàn giao: <span>…</span> hồ sơ.
                    </div>
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
                                Số lượng (bộ)
                            </td>
                            <td rowSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Họ tên chủ hồ sơ
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
                            <td colSpan={3} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Trả kết quả
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
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Ngày nhận kết quả
                            </td>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Bên giao <br /><i style={{ fontSize: '10px', fontWeight: 500, }}>(Ký tên)</i>
                            </td>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Bên nhận <br /><i style={{ fontSize: '10px', fontWeight: 500, }}>(Ký tên)</i>
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
                            <td id="NgayTraKetQua" style={{ border: '1px solid #333', padding: '5px', }}>
                                11
                            </td>
                            <td id="NgayTraKetQua" style={{ border: '1px solid #333', padding: '5px', }}>
                                12
                            </td>
                            <td id="NgayTraKetQua" style={{ border: '1px solid #333', padding: '5px', }}>
                                13
                            </td>

                        </tr>
                    </table>
                    <div style={{ marginBottom: '8px', textAlign: 'center', }}>
                        <i>(Thành phần chi tiết của mỗi hồ sơ được bàn giao đầy đủ theo quy định)</i>
                    </div>

                </div>
            </div>


            <div id="pointBreakPage"></div>
            <div id="signature" style={{ width: '650px', height: '160px', margin: '0 auto', }}>
                <div style={{ display: 'flex', textAlign: 'center', marginTop: '20px', }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', }}>
                        <strong>BÊN GIAO</strong>

                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', }}>
                        <strong>BÊN NHẬN</strong>

                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', }}>
                        <strong>XÁC NHẬN CỦA TRUNG TÂM</strong>
                        <strong>KT. GIÁM ĐỐC</strong>
                        <strong>PHÓ GIÁM ĐỐC</strong>
                    </div>
                </div>
                <div style={{ display: 'flex', textAlign: 'center', marginTop: '20px', }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', }}>
                        <div style={{ width: '100px', height: '60px', margin: '10px auto', }}></div>
                        <span>Nguyễn Văn Tuyên</span>

                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', }}>
                        <div style={{ width: '100px', height: '60px', margin: '10px auto', }}></div>
                        <span>Nguyễn Văn Tuyên</span>

                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', }}>
                        <div style={{ width: '100px', height: '60px', margin: '10px auto', }}></div>
                        <span>Nguyễn Văn Tuyên</span>
                    </div>
                </div>
            </div>
        </div>
    </>
}