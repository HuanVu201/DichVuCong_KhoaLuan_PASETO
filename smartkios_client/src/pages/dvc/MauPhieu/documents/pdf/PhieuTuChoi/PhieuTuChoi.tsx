import { DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'

export const PhieuTuChoi = () => {
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
                    <strong>PHIẾU TỪ CHỐI TIẾP NHẬN GIẢI QUYẾT HỒ SƠ</strong>
                    <span></span>
                </div>
                {/* <!-- Content --> */}
                <div style={{ width: '90%', margin: 'auto', }}>
                    <div style={{ marginBottom: '8px', }}>Trung tâm Phục vụ hành chính công tỉnh Thanh Hóa:</div>
                    <div style={{ marginBottom: '8px', }}>
                        Tiếp nhận hồ sơ của: {hoSo?.fullName || hoSo?.chuHoSo}
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Địa chỉ: {hoSo?.diaChiChuHoSo}
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        <span>Số điện thoại: {hoSo?.soDienThoaiChuHoSo} </span>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        <span>Email: {hoSo?.emailChuHoSo} </span>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Nội dung yêu cầu giải quyết: ...
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Qua xem xét, Bộ phận tiếp nhận hồ sơ của ... tại Trung tâm Phục vụ hành chính công tỉnh Thanh Hóa
                        thông báo không tiếp nhận, giải quyết hồ sơ này với lý do cụ thể như sau: <br/>
                        ...
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Xin thông báo cho Ông/Bà được biết và thực hiện.
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Trong quá trình hoàn thiện hồ sơ nếu có vướng mắc, Ông/Bà có thể tra cứu các quy định giải quyết thủ
                        tục
                        hành chính tại Website: https://hcc.thanhhoa.gov.vn (phần thủ tục hành chính) hoặc liên hệ với công
                        chức
                        …, số điện thoại 02373900900 (máy lẻ: …….) để được hướng dẫn./.
                    </div>


                </div>
            </div>

            <div id="pointBreakPage"></div>
            <div id="signature" style={{ width: '650px', height: '160px', margin: '0 auto', }}>
                <div style={{ display: 'flex', textAlign: 'center', marginTop: '20px', }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', }}>
                        <strong>NGƯỜI NỘP HỒ SƠ</strong>
                        <i>(Ký và ghi rõ họ tên)</i>
                        <div style={{ width: '100px', height: '60px', margin: '10px auto', }}></div>
                        <strong> {hoSo?.nguoiNopHoSo} </strong>

                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', }}>
                        <strong>NGƯỜI TIẾP NHẬN HỒ SƠ</strong>
                        <i>(Ký và ghi rõ họ tên)</i>
                        <div style={{ width: '100px', height: '60px', margin: '10px auto', }}></div>
                        <strong> {hoSo?.nguoiTiepNhan} </strong>
                    </div>
                </div>
            </div>
        </div>
    </>
}