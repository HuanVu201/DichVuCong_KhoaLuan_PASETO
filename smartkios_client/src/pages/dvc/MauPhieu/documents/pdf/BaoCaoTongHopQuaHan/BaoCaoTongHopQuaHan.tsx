import { DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'

export const BaoCaoTongHopQuaHan = () => {
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
                            <strong>...</strong><br />
                            <strong>
                                BỘ PHẬN TIẾP NHẬN VÀ TRẢ KẾT QUẢ <br />
                                HỒ SƠ HÀNH CHÍNH
                            </strong>
                            <hr
                                style={{ height: '1px', width: '140px', margin: '0 auto', color: 'black', backgroundColor: 'black', border: 'none', }} />
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
                    <strong>BÁO CÁO HỒ SƠ XỬ LÝ QUÁ HẠN </strong>
                </div>
                {/* <!-- Content --> */}
                <div style={{ margin: 'auto', }}>
                    <div style={{ marginBottom: '8px', }}>
                        Từ ngày … đến ngày …, đơn vị đã xử lý quá hạn … hồ sơ.
                    </div>

                    <table
                        style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', margin: '10px 0', textAlign: 'center', fontSize: '13px', }}>
                        <tr style={{ fontWeight: 600, }}>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                STT
                            </td>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Tên thủ tục
                            </td>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Người nộp hồ sơ
                            </td>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Ngày nhận
                            </td>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Ngày hẹn trả
                            </td>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Tình trạng hồ sơ
                            </td>
                            <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                Ghi chú
                            </td>
                        </tr>


                        <tr>
                            <td id="STT" style={{ border: '1px solid #333', padding: '5px', }}>
                                STT
                            </td>
                            <td id="TenThuTuc" style={{ border: '1px solid #333', padding: '5px', }}>
                                TenThuTuc
                            </td>
                            <td id="NguoiNop" style={{ border: '1px solid #333', padding: '5px', }}>
                                NguoiNop
                            </td>
                            <td id="NgayNhan" style={{ border: '1px solid #333', padding: '5px', }}>
                                NgayNhan
                            </td>
                            <td id="HenTra" style={{ border: '1px solid #333', padding: '5px', }}>
                                HenTra
                            </td>
                            <td id="TrangThai" style={{ border: '1px solid #333', padding: '5px', }}>
                                TrangThai
                            </td>
                            <td id="GhiChu" style={{ border: '1px solid #333', padding: '5px', }}>
                                GhiChu
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
                        <strong>CÁN BỘ BÁO CÁO</strong>
                        <div style={{ width: '100px', height: '60px', margin: '10px auto', }}></div>
                        <span>Tên</span>

                    </div>
                </div>
            </div>
        </div>
    </>
}