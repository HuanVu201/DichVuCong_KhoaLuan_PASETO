import { DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'

export const PhieuHuongDan = () => {
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
                            <span>Số: <span id="MaHoSo"></span>/HDHS</span>
                        </div>
                        <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', }}>
                            <i>Thanh Hóa, <span >ngày {DATE} tháng {MONTH} năm {YEAR}</span></i>
                        </div>
                    </div>
                </div>

                {/* <!-- Title --> */}
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', margin: '20px 0 10px 0', }}>
                    <strong style={{ fontSize: '14px', }}>PHIẾU YÊU CẦU BỔ SUNG, HOÀN THIỆN HỒ SƠ</strong>
                    <i>(Theo Mẫu số 02, ban hành kèm theo Thông tư số 01/2018/TT-VPCP, ngày 23/11/2018 của Văn phòng Chính
                        phủ)</i>
                </div>

                {/* <!-- Content --> */}
                <div style={{ width: '90%', margin: 'auto', }}>
                    <div style={{ marginBottom: '8px', }}>
                        Trung tâm Phục vụ hành chính công tỉnh Thanh Hóa:
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Tiếp nhận hồ sơ/yêu cầu của Ông/Bà: {hoSo?.chuHoSo}.
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Nội dung yêu cầu giải quyết: ....
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Địa chỉ: {hoSo?.diaChiChuHoSo}.
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Số điện thoại: {hoSo?.soDienThoaiChuHoSo}. Email: {hoSo?.emailChuHoSo}.
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        <span>Yêu cầu Ông/Bà hoàn thiện hồ sơ gồm những nội dung như sau:</span>
                        <table
                            style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', }}>
                            <tr>
                                <td rowSpan={2} style={{ border: '1px solid #333', fontWeight: 600, width: '8%', }}>
                                    <strong>TT</strong>
                                </td>
                                <td rowSpan={2} style={{ border: '1px solid #333', fontWeight: 600, }}>
                                    <strong>Thành phần hồ sơ</strong>
                                </td>
                                <td colSpan={3} style={{ border: '1px solid #333', fontWeight: 600, width: '30%', padding: '8px 0', }}>
                                    <strong>Số lượng</strong>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #333', fontWeight: 600, width: '10%', }}><strong>Bản
                                    chính</strong></td>
                                <td style={{ border: '1px solid #333', fontWeight: 600, width: '10%', }}><strong>Bản chứng
                                    thực</strong></td>
                                <td style={{ border: '1px solid #333', fontWeight: 600, width: '10%', }}><strong>Bản
                                    photo</strong></td>
                            </tr>

                            <tr>
                                <td id="STT" style={{ border: '1px solid #333', padding: '5px', }}>
                                    1
                                </td>
                                <td id="TenThanhPhan" style={{ border: '1px solid #333', padding: '5px', textAlign: 'left', }}>
                                    Giấy phép lái xe, giấy chứng minh nhân dân hoặc thẻ căn cước công dân hoặc hộ chiếu còn
                                    thời hạn
                                </td>
                                <td id="SoBanChinh" style={{ border: '1px solid #333', padding: '5px', }}>
                                    0
                                </td>
                                <td id="SoBanSao" style={{ border: '1px solid #333', padding: '5px', }}>
                                    1
                                </td>
                                <td id="SoBanPhoto" style={{ border: '1px solid #333', padding: '5px', }}>
                                    2
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div style={{ marginBottom: '8px', }}>
                        Lý do: …
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Trong quá trình hoàn thiện hồ sơ nếu có vướng mắc, Ông/Bà có thể tra cứu các quy định giải quyết thủ
                        tục hành chính tại Website: hcc.thanhhoa.gov.vn (phần thủ tục hành chính hoặc danh mục) hoặc liên hệ
                        với công chức …, số điện thoại 02373900900 (máy lẻ: …) để được hướng dẫn./.
                    </div>

                </div >
            </div >

            <div id="pointBreakPage"></div>
            <div id="signature" style={{ width: '650px', height: '160px', margin: '0 auto', }}>
                <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'right' }}>
                    <div style={{ width: '200px', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                        <strong>NGƯỜI HƯỚNG DẪN</strong>
                        <i>(Ký và ghi rõ họ tên)</i>
                        <div style={{ minHeight: '100px', }}>

                        </div>
                        <strong>Tên</strong>
                    </div>
                </div>
            </div>
        </div >

    </>
}