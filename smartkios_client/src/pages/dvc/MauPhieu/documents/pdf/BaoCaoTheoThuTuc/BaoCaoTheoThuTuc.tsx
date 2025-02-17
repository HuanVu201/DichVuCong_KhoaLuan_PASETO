import { DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'

export const BaoCaoTheoThuTuc = () => {
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
                            <strong>BỘ PHẬN TIẾP NHẬN & TRẢ KẾT QUẢ</strong><br />
                            <strong>...</strong>
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
                </div >

                {/* <!-- Title --> */}
                < div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', margin: '20px 0 10px 0', }} >
                    <strong>TÌNH HÌNH TIẾP NHẬN VÀ GIẢI QUYẾT THỦ TỤC HÀNH CHÍNH</strong>
                    <span>(Kỳ thống kê: Từ ngày … đến ngày … )</span>
                </ div>
                {/* <!-- Content --> */}
                < div style={{ margin: 'auto', }} >
                    <div style={{ marginBottom: '8px', paddingLeft: '50px', }} >
                        <strong>Đơn vị chủ trì giải quyết: …</strong>

                    </div >
                    <table
                        style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: '10px', }} >
                        <tr>
                            <td rowSpan={4} style={{ border: '1px solid #333', fontWeight: 600, }}>
                                STT
                            </td>
                            <td rowSpan={4} style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Thủ tục
                            </td >
                            <td colSpan={6} style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Số hồ sơ tiếp nhận
                            </td >
                            <td colSpan={10} style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Kết quả giải quyết
                            </td >
                            <td colSpan={2} rowSpan={3} style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Hồ sơ chờ bổ sung
                            </td >
                            <td colSpan={2} rowSpan={3} style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Hồ sơ trả lại / Xin rút
                            </td >
                        </tr >
                        <tr>
                            <td rowSpan={3} style={{ border: '1px solid #333', fontWeight: 600, }}>
                                Tổng số
                            </td>
                            <td colSpan={5} style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Trong đó
                            </td >
                            <td colSpan={5} style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Số hồ sơ đã giải quyết
                            </td >
                            <td colSpan={5} style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Số hồ sơ đang giải quyết
                            </td >
                        </tr >
                        <tr>
                            <td colSpan={2} style={{ border: '1px solid #333', fontWeight: 600, }}>
                                Số mới tiếp nhận trực tuyến
                            </td>
                            <td rowSpan={2} style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Số ký trước chuyển qua
                            </td >
                            <td colSpan={2} style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Số mới tiếp nhận
                            </td >
                            <td rowSpan={2} style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Tổng số
                            </td >
                            <td colSpan={2} style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Trả đúng thời hạn
                            </td >
                            <td colSpan={2} style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Trả quá hạn
                            </td >
                            <td rowSpan={2} style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Tổng số
                            </td >
                            <td colSpan={2} style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Chưa đến hạn
                            </td >
                            <td colSpan={2} style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Quá hạn
                            </td >
                            {/* < !-- < td style={{border: '1px solid #333', fontWeight: 600,}} >

                            </td > --> */}
                        </tr >
                        <tr>
                            <td style={{ border: '1px solid #333', fontWeight: 600, }}>
                                Mức 3
                            </td>
                            <td style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Mức 4
                            </td >
                            <td style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Trực tiếp
                            </td >
                            <td style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Qua BCCI
                            </td >
                            <td style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Hồ sơ trực tuyến
                            </td >
                            <td style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Hồ sơ trực tiếp
                            </td >
                            <td style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Hồ sơ trực tuyến
                            </td >
                            <td style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Hồ sơ trực tiếp
                            </td >
                            <td style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Hồ sơ trực tuyến
                            </td >
                            <td style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Hồ sơ trực tiếp
                            </td >
                            <td style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Hồ sơ trực tuyến
                            </td >
                            <td style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Hồ sơ trực tiếp
                            </td >
                            <td style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Hồ sơ trực tuyến
                            </td >
                            <td style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Hồ sơ trực tiếp
                            </td >
                            <td style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Hồ sơ trực tuyến
                            </td >
                            <td style={{ border: '1px solid #333', fontWeight: 600, }} >
                                Hồ sơ trực tiếp
                            </td >
                        </tr >
                        <tr>

                        </tr>
                        <tr>
                            <td id="STT" style={{ border: '1px solid #333', }}>
                                1
                            </td>
                            <td id="TenThuTuc" style={{ border: '1px solid #333', textAlign: 'left', }} >
                                2
                            </td >
                            <td id="TongTiepNhan" style={{ border: '1px solid #333', }}>
                                3
                            </td >
                            <td id="TiepNhanQuaMang3" style={{ border: '1px solid #333', }}>
                                4
                            </td >
                            <td id="TiepNhanQuaMang4" style={{ border: '1px solid #333', }}>
                                5
                            </td >
                            <td id="TiepNhanKyTruoc" style={{ border: '1px solid #333', }}>
                                6
                            </td >
                            <td id="TiepNhanTrongKyTrucTiep" style={{ border: '1px solid #333', }}>
                                7
                            </td >
                            <td id="TiepNhanTrongKyBC" style={{ border: '1px solid #333', }}>
                                8
                            </td >
                            <td id="TongDaXuLy" style={{ border: '1px solid #333', }}>
                                9
                            </td >
                            <td id="DaXLDungHanQM" style={{ border: '1px solid #333', }}>
                                10
                            </td >
                            <td id="DaXLDungHanTT" style={{ border: '1px solid #333', }}>
                                11
                            </td >
                            <td id="DaXLQuaHanQM" style={{ border: '1px solid #333', }}>
                                12
                            </td >
                            <td id="DaXLQuaHanTT" style={{ border: '1px solid #333', }}>
                                13
                            </td >
                            <td id="TongDangXL" style={{ border: '1px solid #333', }}>
                                14
                            </td >
                            <td id="DangXLTrongHanQM" style={{ border: '1px solid #333', }}>
                                15
                            </td >
                            <td id="DangXLTrongHanTT" style={{ border: '1px solid #333', }}>
                                16
                            </td >
                            <td id="DangXLQuaHanQM" style={{ border: '1px solid #333', }}>
                                17
                            </td >
                            <td id="DangXLQuaHanTT" style={{ border: '1px solid #333', }}>
                                18
                            </td >
                            <td id="BoSungQM" style={{ border: '1px solid #333', }}>
                                19
                            </td >
                            <td id="BoSungTT" style={{ border: '1px solid #333', }}>
                                20
                            </td >
                            <td id="TraLaiQM" style={{ border: '1px solid #333', }}>
                                21
                            </td >
                            <td id="TraLaiTT" style={{ border: '1px solid #333', }}>
                                22
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
                        <div style={{ width: '100px', height: '60px', margin: ' 10px auto', }} ></div >
                        <span>Tên</span>

                    </div >
                </div >
            </div >
        </div >
    </>
}