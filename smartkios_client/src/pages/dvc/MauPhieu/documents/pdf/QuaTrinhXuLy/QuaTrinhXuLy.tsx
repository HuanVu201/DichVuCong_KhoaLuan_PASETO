import { DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'

export const QuaTrinhXuLy = () => {
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


                {/* <!-- Title --> */}
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', margin: '20px 0 10px 0', }}>
                    <strong>
                        QUÁ TRÌNH XỬ LÝ HỒ SƠ GIẢI QUYẾT THỦ TỤC HÀNH CHÍNH
                    </strong>
                    <i>Mã hồ sơ: {hoSo?.maHoSo} </i>
                </div>

                <div style={{ width: '90%', margin: 'auto', }}>
                    <div>
                        <strong>1. Thông tin hồ sơ</strong>
                        <div style={{ paddingLeft: '10px', display: 'flex', flexDirection: 'column', }}>
                            <span>Họ tên chủ hồ sơ: {hoSo?.chuHoSo} </span>
                            <span>Thủ tục: ...</span>
                            <span>Nội dung: ...</span>
                            <span>Ngày tiếp nhận: 
                                <span style={{marginLeft: '5px'}}>{hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format("HH:mm:ss") + ", " : ""}</span>
                                <span>{hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span>
                            </span>
                            <span>Ngày hẹn trả:
                                <span style={{marginLeft: '5px'}}> {hoSo?.ngayHenTra ? dayjs(hoSo.ngayHenTra).format("HH:mm:ss") + ", " : ""}</span>
                                <span>{hoSo?.ngayHenTra ? dayjs(hoSo.ngayHenTra).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span><br />
                            </span>
                        </div>
                    </div>
                    <div style={{ marginTop: '10px', }}>
                        <strong>2. Thông tin quá trình xử lí</strong>
                        <table
                            style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: '13px', }}>
                            <tr>
                                <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                    STT
                                </td>
                                <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                    Ngày gửi
                                </td>
                                <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                    Người gửi
                                </td>
                                <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                    Thao tác
                                </td>
                                <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                    Người nhận
                                </td>
                                <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                    Thời hạn người gửi
                                </td>
                            </tr>
                            <tr>
                                <td id="STT" style={{ border: '1px solid #333', padding: '5px', }}>
                                    STT
                                </td>
                                <td id="NgayGui" style={{ border: '1px solid #333', padding: '5px', }}>
                                    NgayGui
                                </td>
                                <td id="NguoiGui" style={{ border: '1px solid #333', padding: '5px', }}>
                                    NguoiGui
                                </td>
                                <td id="ThaoTac" style={{ border: '1px solid #333', padding: '5px', }}>
                                    ThaoTac
                                </td>
                                <td id="NguoiNhan " style={{ border: '1px solid #333', padding: '5px', }}>
                                    NguoiNhan
                                </td>
                                <td id="XetHan" style={{ border: '1px solid #333', padding: '5px', }}>
                                    XetHan
                                </td>
                            </tr>
                        </table>
                    </div>


                </div>
            </div>
        </div>
    </>
}