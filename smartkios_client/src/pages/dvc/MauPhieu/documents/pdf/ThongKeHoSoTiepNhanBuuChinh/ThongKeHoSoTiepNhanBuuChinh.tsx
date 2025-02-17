import { DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'

export const ThongKeHoSoTiepNhanBuuChinh = () => {
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
                    <div style={{ flex: 1,  textAlign: 'center', }}>
                        <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br />
                        <strong>Độc lập - Tự do - Hạnh phúc</strong>
                        <hr
                            style={{ height:'1px', width: '160px', margin: '0 auto', color:'black', backgroundColor:'black', border: 'none', }} />
                    </div>
                </div>
            </div>

            {/* <!-- Title --> */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', margin: '20px 0 10px 0', }}>
                <strong>THỐNG KÊ TIẾP NHẬN HỒ SƠ VÀ TRẢ KẾT QUẢ QUA DỊCH VỤ BƯU CHÍNH</strong>
                <i>(Từ ngày … đến ngày … )</i>
            </div>
            {/* <!-- Content --> */}
            <div style={{ width: '90%', margin: 'auto', }}>
                <table
                    style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: '12px', }}>
                    <tr>
                        <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>TT</td>
                        <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, width: '30%', }}>Đơn vị</td>
                        <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                            Hồ sơ tiếp nhận qua dịch vụ bưu chính
                        </td>
                        <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                            Hồ sơ bưu điện đã nhận kết quả chuyển trả công dân
                        </td>
                        <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                            Hồ sơ công dân đăng ký trả kết quả qua bưu điện
                        </td>
                    </tr>
                    <tr>
                        <td id="STT" style={{ border: '1px solid #333', padding: '5px', }}>
                            1
                        </td>
                        <td id="DonViText" style={{ border: '1px solid #333', padding: '5px', }}>
                            DonViText
                        </td>
                        <td id="SoLuong" style={{ border: '1px solid #333', padding: '5px', }}>
                            SoLuong
                        </td>
                        <td id="SoLuongBuuDien" style={{ border: '1px solid #333', padding: '5px', }}>
                            SoLuongBuuDien
                        </td>
                        <td id="SoLuongDangKyBuuDien" style={{ border: '1px solid #333', padding: '5px', }}>
                            SoLuongDangKyBuuDien
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    </>
}