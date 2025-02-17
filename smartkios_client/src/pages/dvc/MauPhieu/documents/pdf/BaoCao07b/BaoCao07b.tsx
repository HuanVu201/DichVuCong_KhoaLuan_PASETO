import { DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'

export const BaoCao07b = () => {
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
            <div id="Content" style={{ width: '650px', margin: '0 auto' }}>
                {/* <!-- Header --> */}
                <div className="header">
                    <div style={{ display: 'flex', fontWeight: 600 }}>
                        <div style={{ flex: 1, textAlign: 'left', fontSize: '11px' }}>
                            <strong>Biểu số II.07b/VPCP/KSTT</strong>
                        </div>
                        <div style={{ flex: 3, textAlign: 'center' }} >
                            <strong>TÌNH HÌNH, KẾT QUẢ GIẢI QUYẾT THỦ TỤC HÀNH</strong><br />
                            <strong>CHÍNH TẠI TRUNG TÂM PHỤC VỤ HÀNH CHÍNH CÔNG</strong>
                        </div>
                        <div style={{ flex: 1, textAlign: 'left', fontSize: '11px' }}>
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
                    <i>(Từ ngày … đến ngày …)</i>
                </div>
                {/* <!-- Content --> */}
                <div style={{ margin: 'auto' }} >
                    <div style={{ marginBottom: '8px', textAlign: 'right', padding: '0 30px', }}>
                        <i>Đơn vị tính: Số hồ sơ TTHC.</i>
                    </div>
                    <table
                        style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: '13px', }}>
                        <tr>
                            <td rowSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                TT
                            </td>
                            <td rowSpan={2} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Đơn vị
                            </td >
                            <td colSpan={4} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }} >
                                Tổng số TTHC thuộc thẩm quyền giải quyết của địa phương
                            </td >
                            <td colSpan={4} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }} >
                                TTHC được thực hiện theo CCMC, MCLT
                            </td >
                            <td colSpan={4} style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }} >
                                Quy trình nội bộ giải quyết TTHC theo CCMC, MCLT được ban hành
                            </td >
                        </tr >

                        <tr>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Tổng số TTHC
                            </td>
                            <td style={{ padding: '5px', border: '1px solid #333' }} >
                                Cấp tỉnh
                            </td >
                            <td style={{ padding: '5px', border: '1px solid #333' }} >
                                Cấp huyện
                            </td >
                            <td style={{ padding: '5px', border: '1px solid #333' }} >
                                Cấp xã
                            </td >
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }} >
                                Tổng số TTHC
                            </td >
                            <td style={{ padding: '5px', border: '1px solid #333' }} >
                                Tại BPMC cấp tỉnh
                            </td >
                            <td style={{ padding: '5px', border: '1px solid #333' }} >
                                Tại BPMC cấp huyện
                            </td >
                            <td style={{ padding: '5px', border: '1px solid #333' }} >
                                Tại BPMC cấp xã
                            </td >
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }} >
                                Tổng số quy trình
                            </td >
                            <td style={{ padding: '5px', border: '1px solid #333' }} >
                                Cấp tỉnh
                            </td >
                            <td style={{ padding: '5px', border: '1px solid #333' }} >
                                Cấp huyện
                            </td >
                            <td style={{ padding: '5px', border: '1px solid #333' }} >
                                Cấp Xã
                            </td >
                        </tr >
                        <tr>
                            <td style={{ border: '1px solid #333', padding: '5px', }}>
                                1
                            </td>
                            <td style={{ border: '1px solid #333', padding: '5px', textAlign: 'left' }} >
                                2
                            </td >
                            <td style={{ border: '1px solid #333', padding: '5px', }} >
                                3
                            </td >
                            <td style={{ border: '1px solid #333', padding: '5px', }} >
                                4
                            </td >
                            <td style={{ border: '1px solid #333', padding: '5px', }} >
                                5
                            </td >
                            <td style={{ border: '1px solid #333', padding: '5px', }} >
                                6
                            </td >
                            <td style={{ border: '1px solid #333', padding: '5px', }} >
                                7
                            </td >
                            <td style={{ border: '1px solid #333', padding: '5px', }} >
                                8
                            </td >
                            <td style={{ border: '1px solid #333', padding: '5px', }} >
                                9
                            </td >
                            <td style={{ border: '1px solid #333', padding: '5px', }} >
                                10
                            </td >
                            <td style={{ border: '1px solid #333', padding: '5px', }} >
                                11
                            </td >
                            <td style={{ border: '1px solid #333', padding: '5px', }} >
                                12
                            </td >
                            <td style={{ border: '1px solid #333', padding: '5px', }} >
                                13
                            </td >
                            <td style={{ border: '1px solid #333', padding: '5px', }} >
                                14
                            </td >
                        </tr >
                        <tr>
                            <td id="STT" style={{ border: '1px solid #333', padding: '5px', }} >
                                1
                            </td>
                            <td id="DonVi" style={{ border: '1px solid #333', padding: '5px', textAlign: 'left', }}  >
                                2
                            </td >
                            <td style={{ border: '1px solid #333', padding: '5px', }} >
                                3
                            </td >
                            <td style={{ border: '1px solid #333', padding: '5px', }} >
                                4
                            </td >
                            <td style={{ border: '1px solid #333', padding: '5px', }} >
                                5
                            </td >
                            <td style={{ border: '1px solid #333', padding: '5px', }} >
                                6
                            </td >
                            <td id="SoThuTuc" style={{ border: '1px solid #333', padding: '5px', }} >
                                7
                            </td >
                            <td id="SoThuTuc2" style={{ border: '1px solid #333', padding: '5px', }} >
                                8
                            </td >
                            <td style={{ border: '1px solid #333', padding: '5px', }} >
                                9
                            </td >
                            <td style={{ border: '1px solid #333', padding: '5px', }} >
                                10
                            </td >
                            <td id="SoQuyTrinh" style={{ border: '1px solid #333', padding: '5px', }} >
                                11
                            </td >
                            <td id="SoQuyTrinh" style={{ border: '1px solid #333', padding: '5px', }} >
                                12
                            </td >
                            <td style={{ border: '1px solid #333', padding: '5px', }} >
                                13
                            </td >
                            <td style={{ border: '1px solid #333', padding: '5px', }} >
                                14
                            </td >
                        </tr >

                    </table >
                </div >
            </div >
            <div id="pointBreakPage"></div>
            <div id="signature" style={{ width: '650px', height: '160px', margin: '0 auto', }} >
                <div style={{ display: 'flex' }} >
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'left', }} >
                    </div >
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'center', }}>
                        <i>Thanh Hóa, <span >ngày {DATE} tháng {MONTH} năm {YEAR}</span></i>
                        <strong>Người làm báo cáo</strong>
                        <div style={{ width: '100px', height: '60px', margin: '10px auto', }} ></div >
                        <span>Tên</span>

                    </div >
                </div >
            </div >
        </div >
    </>
}