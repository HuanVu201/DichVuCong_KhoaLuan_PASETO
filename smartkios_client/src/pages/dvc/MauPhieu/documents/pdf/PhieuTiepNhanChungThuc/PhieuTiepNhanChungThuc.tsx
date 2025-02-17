import { DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'
import JsBarcode from 'jsbarcode'

export const PhieuTiepNhanChungThuc = () => {
    const [hoSo, setHoSo] = useState<IHoSo>()
    const barCodeRef = useRef<SVGSVGElement>(null)
    const buttonActionContext = useButtonActionContext()


    useEffect(() => {
        (async () => {
            if (buttonActionContext.selectedHoSos.length) {
                const res = await hoSoApi.GetPrintData(buttonActionContext.selectedHoSos[0] as string)
                const hoSo = res.data.data
                setHoSo(hoSo)
                JsBarcode(barCodeRef.current, hoSo.maHoSo, {

                    height: 28,
                    width: 0.86,
                    text: hoSo.maHoSo,
                    fontSize: 12,
                    font: "Times New Roman"
                })
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
                            <strong>{PDF_TEN_TRUNG_TAM}</strong><br />
                            <strong>BỘ PHẬN TIẾP NHẬN
                                & TRẢ KẾT QUẢ
                                HỒ SƠ HÀNH CHÍNH
                            </strong>
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
                            <div style={{ width: '270px', height: '40px', margin: '0px auto 10px', }}>
                                <svg ref={barCodeRef}></svg>
                            </div>
                        </div>
                        <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', }}>
                            <i>Thanh Hóa, <span >ngày {DATE} tháng {MONTH} năm {YEAR}</span></i>
                        </div>
                    </div>
                </div>

                {/* <!-- Title --> */}
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', margin: '20px 0 10px 0', }}>
                    <strong>GIẤY TIẾP NHẬN HỒ SƠ VÀ HẸN TRẢ KẾT QUẢ</strong>
                    <strong>Mã hồ sơ: {hoSo?.maHoSo} </strong>
                </div>
                {/* <!-- Content --> */}
                <div style={{ width: '90%', margin: 'auto', }}>

                    <div style={{ marginBottom: '8px', }}>
                        Bộ phận tiếp nhận và trả kết quả …
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Tiếp nhận hồ sơ của : {hoSo?.fullName || hoSo?.chuHoSo}
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Địa chỉ: {hoSo?.diaChiChuHoSo}
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        <span>Số điện thoại: {hoSo?.soDienThoaiChuHoSo}. Email: {hoSo?.emailChuHoSo} </span>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Nội dung yêu cầu giải quyết: …
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Thành phần hồ sơ :
                        <table
                            style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: '13px', }}>
                            <tr>
                                <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                    STT
                                </td>
                                <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, minWidth: '30%', }}>
                                    Tên thành phần
                                </td>
                                <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                    Số trang
                                </td>
                                <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                    Số bản
                                </td>
                                <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                    Lệ phí
                                </td>
                            </tr>
                            <tr>
                                <td id="STT" style={{ border: '1px solid #333', padding: '5px', }}>
                                    STT
                                </td>
                                <td id="TenThanhPhan" style={{ border: '1px solid #333', padding: '5px', textAlign: 'left', }}>
                                    TenThanhPhan
                                </td>
                                <td id="SoTrang" style={{ border: '1px solid #333', padding: '5px', }}>
                                    SoTrang
                                </td>
                                <td id="SoBanChungThuc" style={{ border: '1px solid #333', padding: '5px', }}>
                                    SoBanChungThuc
                                </td>
                                <td id="LePhiChungThuc" style={{ border: '1px solid #333', padding: '5px', }}>
                                    LePhiChungThuc
                                </td>
                            </tr>

                        </table>
                    </div>
                    <div>
                        <p style={{ textAlign: 'right' }}>Tổng lệ phí: ... </p>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Thời gian nhận hồ sơ:
                        <span > {hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format("HH:mm:ss") + " ngày " : ""}</span>
                        <span >{hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Thời gian trả kết quả giải quyết hồ sơ:

                        <span > {hoSo?.ngayHenTra ? dayjs(hoSo.ngayHenTra).format("HH:mm:ss") + " ngày " : ""}</span>
                        <span >{hoSo?.ngayHenTra ? dayjs(hoSo.ngayHenTra).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span>
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