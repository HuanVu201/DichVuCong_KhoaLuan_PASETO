import { DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'

export const BaoCaoQuy = () => {
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
                        <div style={{ flex: 1, textAlign: 'left', fontSize: '11px', }}>
                            <strong>Biểu số II.06a/VPCP/KSTT</strong>
                        </div>
                        <div style={{ flex: 3, textAlign: 'center', padding: '0 20px' }}>
                            <strong>TÌNH HÌNH, KẾT QUẢ GIẢI QUYẾT THỦ TỤC HÀNH CHÍNH TẠI TRUNG TÂM PHỤC VỤ HÀNH CHÍNH CÔNG</strong>
                        </div>
                        <div style={{ flex: 1, textAlign: 'left', fontSize: '11px', }}>
                            <div><strong>- Đơn vị báo cáo:</strong></div>
                            <div>...</div>
                            <div><strong>- Đơn vị nhận báo cáo:</strong></div>
                            <div>...</div>
                        </div>


                    </div>
                </div>

                {/* <!-- Title --> */}
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', margin: '20px 0 10px 0', }}>
                    <strong>Kỳ báo cáo:………</strong>
                    <strong>(Từ ngày … đến ngày …)</strong>
                </div>
                {/* <!-- Content --> */}
                <div style={{ margin: 'auto', }}>
                    <div style={{ marginBottom: '8px', textAlign: 'right', padding: '0 30px', }}>
                        <i>Đơn vị tính: Số hồ sơ TTHC.</i>
                    </div>
                    <table
                        style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: '13px', }}>
                        <tr>
                            <td rowSpan={3} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                TT
                            </td>
                            <td rowSpan={3} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Đơn vị
                            </td>
                            <td colSpan={4} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Tiếp nhận
                            </td>
                            <td colSpan={4} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Số lượng hồ sơ đã giải quyết
                            </td>
                            <td colSpan={3} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Hồ sơ đang xử lý
                            </td>
                        </tr>
                        <tr>
                            <td rowSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Tổng số
                            </td>
                            <td colSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Trong kỳ
                            </td>
                            <td rowSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Kỳ trước
                            </td>
                            <td rowSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Tổng số
                            </td>
                            <td rowSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Trước hạn
                            </td>
                            <td rowSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Đúng hạn<br />
                                <span style={{ fontWeight: 500, fontSize: '10px', }}>
                                    (Bao gồm cả hồ sơ chờ Bổ sung và Trả lại/Xin rút)
                                </span>
                            </td>
                            <td rowSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Quá hạn
                            </td>
                            <td rowSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Tổng số
                            </td>
                            <td rowSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Đúng hạn
                            </td>
                            <td rowSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Quá hạn
                            </td>

                        </tr>
                        <tr>
                            <td style={{ padding: '5px', border: '1px solid #333', }}>
                                Trực tuyến
                            </td>
                            <td style={{ padding: '5px', border: '1px solid #333', }}>
                                Trực tiếp, dịch vụ bưu chính
                            </td>
                        </tr>
                        <tr>
                            <td id="STT" style={{ border: '1px solid #333', padding: '5px', }}>
                                1
                            </td>
                            <td id="DonVi" style={{ border: '1px solid #333', padding: '5px', textAlign: 'left', }}>
                                2
                            </td>
                            <td id="TongTiepNhan" style={{ border: '1px solid #333', padding: '5px', }}>
                                3
                            </td>
                            <td id="TNTrongKyTrucTuyen" style={{ border: '1px solid #333', padding: '5px', }}>
                                4
                            </td>
                            <td id="TNTrongKyTrucTiep" style={{ border: '1px solid #333', padding: '5px', }}>
                                5
                            </td>
                            <td id="TiepNhanKyTruoc" style={{ border: '1px solid #333', padding: '5px', }}>
                                6
                            </td>
                            <td id="TongDaXL" style={{ border: '1px solid #333', padding: '5px', }}>
                                7
                            </td>
                            <td id="DaXLTruocHan" style={{ border: '1px solid #333', padding: '5px', }}>
                                8
                            </td>
                            <td id="DaXLDungHan" style={{ border: '1px solid #333', padding: '5px', }}>
                                9
                            </td>
                            <td id="DaXLQuaHan" style={{ border: '1px solid #333', padding: '5px', }}>
                                10
                            </td>
                            <td id="TongDangXL" style={{ border: '1px solid #333', padding: '5px', }}>
                                11
                            </td>
                            <td id="DangXLTrongHan" style={{ border: '1px solid #333', padding: '5px', }}>
                                12
                            </td>
                            <td id="DangXLQuaHan" style={{ border: '1px solid #333', padding: '5px', }}>
                                13
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