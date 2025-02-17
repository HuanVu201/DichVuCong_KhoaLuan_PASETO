import { DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'

export const BaoCaoCacDonVi = () => {
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
                            <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br />
                            <strong>Độc lập - Tự do - Hạnh phúc</strong>
                            <hr
                                style={{ height: '1px', width: '160px', margin: '0 auto', color: 'black', backgroundColor: 'black', border: 'none', }} />
                        </div>
                    </div>
                </div>

                {/* <!-- Title --> */}
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', margin: '20px 0 10px 0', }}>
                    <strong>BẢNG THỐNG KÊ CHI TIẾT VIỆC TIẾP NHẬN VÀ TRẢ KẾT QUẢ</strong>
                    <span>(Kỳ thống kê: Từ ngày … đến ngày … )</span>
                </div>
                {/* <!-- Content --> */}
                <div style={{ margin: 'auto', }}>
                    <div style={{ marginBottom: '8px', paddingLeft: '50px', }}>
                        <div style={{ marginBottom: '8px', }}>Loại tiếp nhận</div>
                        <div style={{ marginBottom: '8px', }}>Đối tượng tiếp nhận</div >

                    </div >
                    <table
                        style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: '10px', }} >
                        <tr>
                            <td rowSpan={2} style={{ border: '1px solid #333', fontWeight: 600 }}>
                                STT
                            </td>
                            <td rowSpan={2} style={{ border: '1px solid #333', fontWeight: 600 }} >
                                Đơn vị
                            </td >
                            <td colSpan={3} style={{ border: '1px solid #333', fontWeight: 600 }} >
                                Tiếp nhận
                            </td >
                            <td colSpan={4} style={{ border: '1px solid #333', fontWeight: 600 }} >
                                Hồ sơ đã xử lý
                            </td >
                            <td colSpan={2} style={{ border: '1px solid #333', fontWeight: 600 }} >
                                Hồ sơ đang xử lý
                            </td >
                            <td rowSpan={2} style={{ border: '1px solid #333', fontWeight: 600 }} >
                                Hồ sơ chờ bổ sung
                            </td >
                            <td rowSpan={2} style={{ border: '1px solid #333', fontWeight: 600 }} >
                                Hồ sơ trả lại / Xin rút
                            </td >
                            <td rowSpan={2} style={{ border: '1px solid #333', fontWeight: 600 }} >
                                Hồ sơ khác
                            </td >
                        </tr >

                        <tr>
                            <td style={{ border: '1px solid #333', fontWeight: 600 }}>
                                Tổng số
                            </td>
                            <td style={{ border: '1px solid #333', fontWeight: 600 }} >
                                Kỳ trước < br />
                                <span style={{ fontWeight: 500 }} >
                                    (HS đang xử lý của kỳ trước)
                                </span >
                            </td >
                            <td style={{ border: '1px solid #333', fontWeight: 600 }} >
                                Trong kỳ < br />
                                <span style={{ fontWeight: 500 }} >
                                    (Tiếp nhận mới trong kỳ)
                                </span >
                            </td >
                            <td style={{ border: '1px solid #333', fontWeight: 600 }} >
                                Trước hạn
                            </td >
                            <td style={{ border: '1px solid #333', fontWeight: 600 }} >
                                Đúng hạn
                            </td >
                            <td style={{ border: '1px solid #333', fontWeight: 600 }} >
                                Quá hạn
                            </td >
                            <td style={{ border: '1px solid #333', fontWeight: 600 }} >
                                Tỷ lệ trước hạn và đúng hạn
                            </td >
                            <td style={{ border: '1px solid #333', fontWeight: 600 }} >
                                Trong hạn
                            </td >
                            <td style={{ border: '1px solid #333', fontWeight: 600 }} >
                                Quá hạn
                            </td >

                        </tr >
                        <tr>

                        </tr>
                        <tr>
                            <td id="STT" style={{ border: '1px solid #333' }}>
                                1
                            </td>
                            <td id="DonVi" style={{ border: '1px solid #333', textAlign: 'left' }} >
                                2
                            </td >
                            <td id="TongTiepNhan" style={{ border: '1px solid #333' }}>
                                3
                            </td >
                            <td id="TiepNhanKyTruoc" style={{ border: '1px solid #333' }}>
                                4
                            </td >
                            <td id="TiepNhanTrongKy" style={{ border: '1px solid #333' }}>
                                5
                            </td >
                            <td id="DaXLTruocHan" style={{ border: '1px solid #333' }}>
                                6
                            </td >
                            <td id="DaXLDungHan" style={{ border: '1px solid #333' }}>
                                7
                            </td >
                            <td id="DaXLQuaHan" style={{ border: '1px solid #333' }}>
                                8
                            </td >
                            <td id="TiLe" style={{ border: '1px solid #333' }}>
                                9
                            </td >
                            <td id="DangXLTrongHan" style={{ border: '1px solid #333' }}>
                                10
                            </td >
                            <td id="DangXLQuaHan" style={{ border: '1px solid #333' }}>
                                11
                            </td >
                            <td id="BoSung" style={{ border: '1px solid #333' }}>
                                12
                            </td >
                            <td id="TraLai" style={{ border: '1px solid #333' }}>
                                13
                            </td >
                            <td id="HSKhac" style={{ border: '1px solid #333' }}>
                                14
                            </td >

                        </tr >
                    </table >

                </div >
            </div >

            <div id="pointBreakPage"></div>
            <div id="signature" style={{ width: '650px', height: '160px', margin: '0 auto', }} >
                <div style={{ display: 'flex', }} >
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'left', }} >
                    </div >
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'center', }} >
                        <i>Thanh Hóa, <span >ngày {DATE} tháng {MONTH} năm {YEAR}</span></i>
                        <strong>Người báo cáo</strong>
                        <div style={{ width: '100px', height: '60px', margin: '10px auto', }} ></div >
                        <span>Tên</span>

                    </div >
                </div >
            </div >
        </div >
    </>
}