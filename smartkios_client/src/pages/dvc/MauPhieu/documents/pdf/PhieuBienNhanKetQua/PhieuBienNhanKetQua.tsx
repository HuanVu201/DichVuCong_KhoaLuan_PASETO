import { DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'

export const PhieuBienNhanKetQua = () => {
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
                        </div>

                        <div style={{ flex: 1, textAlign: 'center', }}>
                            <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br />
                            <strong>Độc lập - Tự do - Hạnh phúc</strong>
                        </div>
                    </div>

                    <div style={{ display: 'flex', marginTop: '6px', }}>
                        <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', }}>
                            <span>Mã hồ sơ: <span id="MaHoSo"></span></span>

                        </div>
                        <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', }}>
                            <i>Thanh Hóa, <span >ngày {DATE} tháng {MONTH} năm {YEAR}</span></i>
                        </div>
                    </div>
                </div>

                {/* <!-- Title --> */}
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', margin: '20px 0 10px 0', }}>
                    <strong>GIẤY BIÊN NHẬN TRẢ KẾT QUẢ</strong>
                </div>
                {/* <!-- Content --> */}
                <div style={{ width: '90%', margin: 'auto', }}>
                    <div style={{ marginBottom: '8px', }}>
                        <strong>1. Tên thủ tục hành chính: …</strong><br />
                        <span>- Chủ hồ sơ: …</span>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        <strong>2. Người trả kết quả:</strong><br />
                        <span>- Họ tên: ...</span>
                        <div style={{ display: 'flex', }}>
                            <div style={{ flex: 1, }}>- Điện thoại: ...</div>
                            <div style={{ flex: 1, }}>- Email: ...</div>
                        </div>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        <strong>3. Người nhận kết quả:</strong><br />
                        <span>- Họ tên: ...</span>
                        <div style={{ display: 'flex', }}>
                            <div style={{ flex: 1, }}>- Điện thoại: ...</div>
                            <div style={{ flex: 1, }}>- Email: ...</div>
                        </div>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        <strong>4. Thành phần trả gồm: </strong><br />
                        <span>- Loại kết quả: …</span><br />
                        <span>- Số: …</span><br />
                        <span>- Trích yếu: …</span>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        <strong>5. Ngày trả kết quả: …</strong>
                    </div>

                </div>
            </div>


            <div id="pointBreakPage"></div>
            <div id="signature" style={{ width: '650px', height: '160px', margin: '0 auto', }}>
                <div style={{ display: 'flex', textAlign: 'center', marginTop: '20px', }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', }}>
                        <strong>Người nhận kết quả</strong>
                        <i>(Ký và ghi rõ họ tên)</i>
                        <div style={{ width: '100px', height: '60px', margin: '10px auto', }}></div>

                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', }}>
                        <strong>Người trả kết quả</strong>
                        <i>(Ký và ghi rõ họ tên)</i>
                        <div style={{ width: '100px', height: '60px', margin: '10px auto', }}></div>

                    </div>
                </div>
            </div>
        </div>
    </>
}