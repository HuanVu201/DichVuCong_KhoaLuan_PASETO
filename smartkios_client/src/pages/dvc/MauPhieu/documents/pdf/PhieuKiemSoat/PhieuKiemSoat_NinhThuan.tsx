import { DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'

export const PhieuKiemSoat_NinhThuan = () => {
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


    return <div style={{ width: '700px', margin: '0 auto', }}>
        <div id="ContainerSwapperForLayout" style={{ display: 'block', fontSize: '14px', fontFamily: "'Times New Roman', Times, serif" }}>
            <div id="Content" style={{ width: '650px', margin: '0 auto', }}>
                {/* <!-- Header --> */}
                <div className="headerPhieu">
                    <div style={{ display: 'flex', fontWeight: 600, }}>
                        <div style={{ flex: 1, textAlign: 'center', }}>
                            {
                                hoSo?.groupName?.includes('VPĐKĐĐ')
                                    ?
                                    <>
                                        <span>{hoSo?.groupName?.toLocaleUpperCase()}</span><br />
                                        <strong>BỘ PHẬN TN & TKQ</strong>
                                    </>
                                    :
                                    hoSo?.catalog == 'so-ban-nganh'
                                        ?
                                        <>
                                            <strong>UBND TỈNH NINH THUẬN</strong><br />
                                            <strong>TRUNG TÂM PHỤC VỤ HÀNH CHÍNH CÔNG</strong>
                                        </>
                                        :
                                        <>
                                            <span>{hoSo?.groupName?.toLocaleUpperCase()}</span><br />
                                            <strong>BỘ PHẬN TN & TKQ</strong>
                                        </>
                            }
                            <hr
                                style={{ height: '1px', width: '140px', margin: '0 auto', color: 'black', backgroundColor: 'black', border: 'none', opacity: 0.8 }} />
                        </div>

                        <div style={{ flex: 1, textAlign: 'center', }}>
                            <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br />
                            <strong>Độc lập - Tự do - Hạnh phúc</strong>
                            <hr
                                style={{ height: '1px', width: '175px', margin: '0 auto', color: 'black', backgroundColor: 'black', border: 'none', opacity: 0.8 }} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', marginTop: '6px' }}>
                        <div style={{ flex: "1", textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                        </div>
                        <div style={{ flex: "1", textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                            <i>Ninh Thuận, <span >ngày {DATE || ""} tháng {MONTH || ""} năm {YEAR || ""}</span></i>
                        </div>
                    </div>
                </div>

                {/* <!-- Title --> */}
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', margin: '0', fontSize: '14px', }}>
                    <strong>PHIẾU KIỂM SOÁT QUÁ TRÌNH GIẢI QUYẾT HỒ SƠ</strong>
                </div>
                {/* <!-- Content --> */}
                <div style={{ width: '90%', margin: 'auto', }}>
                    <div style={{ marginBottom: '8px', }}>
                        Kèm theo hồ sơ của: <strong>{hoSo?.chuHoSo ? hoSo?.chuHoSo : ""}</strong>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Mã hồ sơ: {hoSo?.maHoSo ? hoSo?.maHoSo + "." : ""}
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Ngày nhận: <span>{hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format("HH") + " giờ " + dayjs(hoSo.ngayTiepNhan).format("mm") + " phút, ngày " : ""}</span>
                        <span>{hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Ngày, giờ hẹn trả kết quả: <span>{hoSo?.ngayHenTra ? dayjs(hoSo.ngayHenTra).format("HH") + " giờ " + dayjs(hoSo.ngayHenTra).format("mm") + " phút, ngày " : ""}</span>
                        <span>{hoSo?.ngayHenTra ? dayjs(hoSo.ngayHenTra).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span><br />
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Cơ quan (bộ phận) giải quyết hồ sơ: {hoSo?.tenDonVi}
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Cơ quan phối hợp giải quyết hồ sơ:
                    </div>


                    <div style={{ marginBottom: '8px', }}>
                        <table
                            style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: '13px', }}>
                            <tr>
                                <td style={{ border: '1px solid #333', padding: '5px', width: ' 25%', }}>
                                    <strong>TÊN CƠ QUAN</strong>
                                </td>
                                <td colSpan={2} style={{ border: '1px solid #333', padding: '5px', width: '50%', }}>
                                    <strong>THỜI GIAN GIAO, NHẬN HỒ SƠ</strong>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', width: '12.5%', }}>
                                    <strong>KẾT QUẢ GIẢI QUYẾT HỒ SƠ (Trước hạn/đúng hạn/quá hạn)</strong>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', width: '12.5%', }}>
                                    <strong>GHI CHÚ</strong>
                                </td>
                            </tr>




                            <tr>
                                <td rowSpan={2} style={{ border: '1px solid #333', padding: '5px', textAlign: 'left', }}>
                                    <div style={{ minHeight: '40px', }}>
                                        <strong>1. Giao:</strong><br />
                                        <span>Bộ phận TN & TKQ</span>
                                    </div>
                                    <div style={{ marginTop: '10px', minHeight: '40px', }}>
                                        <strong>2.Nhận: </strong>
                                        <br />
                                        <span>...</span>
                                    </div>
                                </td>
                                <td colSpan={2} style={{ border: '1px solid #333', padding: '5px', }}>
                                    …giờ…phút, ngày … tháng … năm....
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>

                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>

                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>
                                    <div style={{ display: 'block', minHeight: '60px', }}>
                                        <strong>Người giao</strong><br />
                                        <i>(Ký)</i>
                                        <div style={{ minHeight: '60px' }}></div>
                                    </div>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>
                                    <div style={{ display: 'block', minHeight: '60px', }}>
                                        <strong>Người nhận</strong><br />
                                        <i>(Ký)</i>
                                        <div style={{ minHeight: '60px' }}></div>

                                    </div>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>

                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>

                                </td>
                            </tr>





                            <tr>
                                <td rowSpan={2} style={{ border: '1px solid #333', padding: '5px', textAlign: 'left', }}>
                                    <div style={{ minHeight: '40px', }}>
                                        <strong>1. Giao:</strong><br />
                                        <span>...</span>
                                    </div>
                                    <div style={{ marginTop: '10px', minHeight: '40px', }}>
                                        <strong>2.Nhận: </strong>
                                        <br />
                                        <span>...</span>
                                    </div>
                                </td>
                                <td colSpan={2} style={{ border: '1px solid #333', padding: '5px', }}>
                                    …giờ…phút, ngày … tháng … năm....
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>

                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>

                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>
                                    <div style={{ display: 'block', minHeight: '60px', }}>
                                        <strong>Người giao</strong><br />
                                        <i>(Ký)</i>
                                        <div style={{ minHeight: '60px' }}></div>
                                    </div>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>
                                    <div style={{ display: 'block', minHeight: '60px', }}>
                                        <strong>Người nhận</strong><br />
                                        <i>(Ký)</i>
                                        <div style={{ minHeight: '60px' }}></div>

                                    </div>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>

                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>

                                </td>
                            </tr>




                            <tr>
                                <td rowSpan={2} style={{ border: '1px solid #333', padding: '5px', textAlign: 'left', }}>
                                    <div style={{ minHeight: '40px', }}>
                                        <strong>1. Giao:</strong><br />
                                        <span>...</span>
                                    </div>
                                    <div style={{ marginTop: '10px', minHeight: '40px', }}>
                                        <strong>2.Nhận: </strong>
                                        <br />
                                        <span>...</span>
                                    </div>
                                </td>
                                <td colSpan={2} style={{ border: '1px solid #333', padding: '5px', }}>
                                    …giờ…phút, ngày … tháng … năm....
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>

                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>

                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>
                                    <div style={{ display: 'block', minHeight: '60px', }}>
                                        <strong>Người giao</strong><br />
                                        <i>(Ký)</i>
                                        <div style={{ minHeight: '60px' }}></div>
                                    </div>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>
                                    <div style={{ display: 'block', minHeight: '60px', }}>
                                        <strong>Người nhận</strong><br />
                                        <i>(Ký)</i>
                                        <div style={{ minHeight: '60px' }}></div>

                                    </div>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>

                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>

                                </td>
                            </tr>




                            <tr>
                                <td rowSpan={2} style={{ border: '1px solid #333', padding: '5px', textAlign: 'left', }}>
                                    <div style={{ minHeight: '40px', }}>
                                        <strong>1. Giao:</strong><br />
                                        <span>Bộ phận TN & TKQ</span>
                                    </div>
                                    <div style={{ marginTop: '10px', minHeight: '40px', }}>
                                        <strong>2.Nhận: </strong>
                                        <br />
                                        <span>...</span>
                                    </div>
                                </td>
                                <td colSpan={2} style={{ border: '1px solid #333', padding: '5px', }}>
                                    …giờ…phút, ngày … tháng … năm....
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>

                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>

                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>
                                    <div style={{ display: 'block', minHeight: '60px', }}>
                                        <strong>Người giao</strong><br />
                                        <i>(Ký)</i>
                                        <div style={{ minHeight: '60px' }}></div>
                                    </div>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>
                                    <div style={{ display: 'block', minHeight: '60px', }}>
                                        <strong>Người nhận</strong><br />
                                        <i>(Ký)</i>
                                        <div style={{ minHeight: '60px' }}></div>

                                    </div>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>

                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>

                                </td>
                            </tr>
                        </table>
                    </div>

                </div >
            </div >
        </div >

        {/* ////////////////////////////////////////////////////////////////////////// */}
        <div id="ContainerSwapper" style={{ display: 'none', fontSize: '14px', fontFamily: "'Times New Roman', Times, serif" }}>
            <div id="Content" style={{ width: '650px', margin: '0 auto', }}>
                {/* <!-- Header --> */}
                <div className="headerPhieu">
                    <table style={{ width: '100%', fontSize: '14.5px' }}>
                        <tr>
                            <td style={{ width: '50%', textAlign: 'center', verticalAlign: 'text-top' }}>
                                {
                                    hoSo?.groupName?.includes('VPĐKĐĐ')
                                        ?
                                        <>
                                            <strong>{hoSo?.groupName?.toLocaleUpperCase()}</strong><br />
                                            <strong><u>BỘ PHẬN TN & TKQ</u></strong>

                                        </>
                                        :
                                        hoSo?.catalog == 'so-ban-nganh'
                                            ?
                                            <>
                                                <strong>UBND TỈNH NINH THUẬN</strong><br />
                                                <strong><u>TRUNG TÂM PHỤC VỤ HÀNH CHÍNH CÔNG</u></strong>
                                            </>
                                            :
                                            <>
                                                <strong>{hoSo?.groupName?.toLocaleUpperCase()}</strong><br />
                                                <strong><u>BỘ PHẬN TN & TKQ</u></strong>

                                            </>
                                }

                            </td>
                            <td style={{ width: '50%', textAlign: 'center', verticalAlign: 'text-top' }}>
                                <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br />
                                <strong><u>Độc lập - Tự do - Hạnh phúc</u></strong>

                            </td>
                        </tr>
                        <tr>
                            <td style={{ width: '50%', textAlign: 'center', verticalAlign: 'text-top' }}>
                                <div style={{ width: '270px', height: '40px', margin: '0px auto', position: 'relative', top: '-4px' }}>
                                    {/* <svg ref={barcodeRef || ""} ></svg> */}
                                </div>
                            </td>
                            <td style={{ width: '50%', textAlign: 'center' }}>
                                <i>Ninh Thuận, <span >ngày {DATE || ""} tháng {MONTH || ""} năm {YEAR || ""}</span></i><br />
                                <strong>Quyển số: ..., Số thứ tự: ...</strong>
                            </td>
                        </tr>
                    </table>

                </div>

                {/* <!-- Title --> */}
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', margin: '0', fontSize: '14px', }}>
                    <strong>PHIẾU KIỂM SOÁT QUÁ TRÌNH GIẢI QUYẾT HỒ SƠ</strong>
                </div>
                {/* <!-- Content --> */}
                <div style={{ width: '90%', margin: 'auto', }}>
                    <div style={{ marginBottom: '8px', }}>
                        Kèm theo hồ sơ của: <strong>{hoSo?.chuHoSo ? hoSo?.chuHoSo : ""}</strong>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Mã hồ sơ: {hoSo?.maHoSo ? hoSo?.maHoSo + "." : ""}
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Ngày nhận: <span>{hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format("HH") + " giờ " + dayjs(hoSo.ngayTiepNhan).format("mm") + " phút, ngày " : ""}</span>
                        <span>{hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Ngày, giờ hẹn trả kết quả: <span>{hoSo?.ngayHenTra ? dayjs(hoSo.ngayHenTra).format("HH") + " giờ " + dayjs(hoSo.ngayHenTra).format("mm") + " phút, ngày " : ""}</span>
                        <span>{hoSo?.ngayHenTra ? dayjs(hoSo.ngayHenTra).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span><br />
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Cơ quan (bộ phận) giải quyết hồ sơ: {hoSo?.tenDonVi}
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Cơ quan phối hợp giải quyết hồ sơ:
                    </div>


                    <div style={{ marginBottom: '8px', }}>
                        <table
                            style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: '13px', }}>
                            <tr>
                                <td style={{ border: '1px solid #333', padding: '5px', width: ' 25%' }}>
                                    <strong>TÊN CƠ QUAN</strong>
                                </td>
                                <td colSpan={2} style={{ border: '1px solid #333', padding: '5px', width: '50%', }}>
                                    <strong>THỜI GIAN GIAO, NHẬN HỒ SƠ</strong>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', width: '12.5%', }}>
                                    <strong>KẾT QUẢ GIẢI QUYẾT HỒ SƠ (Trước hạn/đúng hạn/quá hạn)</strong>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', width: '12.5%', }}>
                                    <strong>GHI CHÚ</strong>
                                </td>
                            </tr>




                            <tr>
                                <td rowSpan={2} style={{ border: '1px solid #333', padding: '5px', textAlign: 'left', verticalAlign: 'text-top' }}>
                                    <div style={{ minHeight: '40px', }}>
                                        <strong>1. Giao:</strong><br />
                                        <span>Bộ phận TN & TKQ</span>
                                    </div>
                                    <div style={{ marginTop: '10px', minHeight: '40px', }}>
                                        <strong>2.Nhận: </strong>
                                        <br />
                                        <span>...</span>
                                    </div>
                                </td>
                                <td colSpan={2} style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>
                                    …giờ…phút, ngày … tháng … năm....
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>

                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>

                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>
                                    <div style={{ display: 'block', minHeight: '60px', }}>
                                        <strong>Người giao</strong><br />
                                        <i>(Ký)</i>
                                        <div style={{ minHeight: '60px' }}></div>
                                    </div>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>
                                    <div style={{ display: 'block', minHeight: '60px', }}>
                                        <strong>Người nhận</strong><br />
                                        <i>(Ký)</i>
                                        <div style={{ minHeight: '60px' }}></div>

                                    </div>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>

                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>

                                </td>
                            </tr>





                            <tr>
                                <td rowSpan={2} style={{ border: '1px solid #333', padding: '5px', textAlign: 'left', verticalAlign: 'text-top' }}>
                                    <div style={{ minHeight: '40px', }}>
                                        <strong>1. Giao:</strong><br />
                                        <span>...</span>
                                    </div>
                                    <div style={{ marginTop: '10px', minHeight: '40px', }}>
                                        <strong>2.Nhận: </strong>
                                        <br />
                                        <span>...</span>
                                    </div>
                                </td>
                                <td colSpan={2} style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>
                                    …giờ…phút, ngày … tháng … năm....
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>

                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>

                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>
                                    <div style={{ display: 'block', minHeight: '60px', }}>
                                        <strong>Người giao</strong><br />
                                        <i>(Ký)</i>
                                        <div style={{ minHeight: '60px' }}></div>
                                    </div>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>
                                    <div style={{ display: 'block', minHeight: '60px', }}>
                                        <strong>Người nhận</strong><br />
                                        <i>(Ký)</i>
                                        <div style={{ minHeight: '60px' }}></div>

                                    </div>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>

                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>

                                </td>
                            </tr>




                            <tr>
                                <td rowSpan={2} style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top', textAlign: 'left', }}>
                                    <div style={{ minHeight: '40px', }}>
                                        <strong>1. Giao:</strong><br />
                                        <span>...</span>
                                    </div>
                                    <div style={{ marginTop: '10px', minHeight: '40px', }}>
                                        <strong>2.Nhận: </strong>
                                        <br />
                                        <span>...</span>
                                    </div>
                                </td>
                                <td colSpan={2} style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>
                                    …giờ…phút, ngày … tháng … năm....
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>

                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>

                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>
                                    <div style={{ display: 'block', minHeight: '60px', }}>
                                        <strong>Người giao</strong><br />
                                        <i>(Ký)</i>
                                        <div style={{ minHeight: '60px' }}></div>
                                    </div>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>
                                    <div style={{ display: 'block', minHeight: '60px', }}>
                                        <strong>Người nhận</strong><br />
                                        <i>(Ký)</i>
                                        <div style={{ minHeight: '60px' }}></div>

                                    </div>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>

                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>

                                </td>
                            </tr>




                            <tr>
                                <td rowSpan={2} style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top', textAlign: 'left', }}>
                                    <div style={{ minHeight: '40px', }}>
                                        <strong>1. Giao:</strong><br />
                                        <span>Bộ phận TN & TKQ</span>
                                    </div>
                                    <div style={{ marginTop: '10px', minHeight: '40px', }}>
                                        <strong>2.Nhận: </strong>
                                        <br />
                                        <span>...</span>
                                    </div>
                                </td>
                                <td colSpan={2} style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>
                                    …giờ…phút, ngày … tháng … năm....
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>

                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>

                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>
                                    <div style={{ display: 'block', minHeight: '60px', }}>
                                        <strong>Người giao</strong><br />
                                        <i>(Ký)</i>
                                        <div style={{ minHeight: '60px' }}></div>
                                    </div>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>
                                    <div style={{ display: 'block', minHeight: '60px', }}>
                                        <strong>Người nhận</strong><br />
                                        <i>(Ký)</i>
                                        <div style={{ minHeight: '60px' }}></div>

                                    </div>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>

                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', verticalAlign: 'text-top' }}>

                                </td>
                            </tr>
                        </table>
                    </div>

                </div >
            </div >
        </div >
    </div>
}