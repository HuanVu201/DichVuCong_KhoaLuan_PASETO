import { DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'

export const BaoCaoTiepNhanTheoDoi = () => {
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
                                BỘ PHẬN TIẾP NHẬN <br />
                                & TRẢ KẾT QUẢ<br />
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
                    <strong>...</strong>
                    <i>...</i>
                </div>
                {/* <!-- Content --> */}
                <div style={{ margin: 'auto', }}>
                    <div style={{ marginBottom: '8px', }}>
                        <div>I. Kết quả giải quyết thủ tục hành chính trong
                            <span>…</span>
                        </div>
                        <div style={{ paddingLeft: '15px', }}>
                            <div>Tổng số hồ sơ tiếp nhận:
                                <span>…</span>
                                hồ sơ. Hiện tại :
                            </div>
                            <div>
                                - Có <span>…</span> hồ sơ đã xử lý xong.
                            </div>
                            <div style={{ paddingLeft: '15px', }}>
                                <li>Có <span>…</span> hồ sơ xử lý đúng hạn.</li>
                                <li>Có <span>…</span> hồ sơ xử lý quá hạn.</li>
                            </div>
                            <div>- Có <span>…</span> hồ sơ đang xử lý.</div>
                            <div style={{ paddingLeft: '15px', }}>
                                <li>Có <span>…</span> hồ sơ trong hạn.</li>
                                <li>Có <span>…</span> hồ sơ tới hạn trả.</li>
                                <li>Có <span>…</span> hồ sơ quá hạn trả.</li>
                                <li>Có <span>…</span> hồ sơ đang chờ bổ sung.</li>
                            </div>
                            <div>- Có <span>…</span> hồ sơ bị trả lại.</div>
                        </div>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        II. Kiến nghị, đề xuất: (nếu có)
                        <div style={{ width: '100%', minHeight: '60px', }}></div>
                    </div>

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