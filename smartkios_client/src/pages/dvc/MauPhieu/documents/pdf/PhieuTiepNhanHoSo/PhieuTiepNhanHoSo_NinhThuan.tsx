import { DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR, PDF_TEN_TINH_LOWER_CASE } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useMemo, useRef, useState } from "react"
import JsBarcode from 'jsbarcode'
import dayjs from 'dayjs'


export const PhieuTiepNhanHoSo_NinhThuan = () => {
    const [hoSo, setHoSo] = useState<IHoSo>()
    const [qrRef, setQrRef] = useState("")
    const barCodeRef = useRef<SVGSVGElement>(null)
    const barcodeRef = useRef(null) //Không được xóa
    const buttonActionContext = useButtonActionContext()
    const [valueSvg, setValueSvg] = useState<any>('')


    useEffect(() => {
        (async () => {
            if (buttonActionContext.selectedHoSos.length) {
                const res = await hoSoApi.GetPrintData(buttonActionContext.selectedHoSos[0] as string)
                const hoSo = res.data.data
                setHoSo(hoSo)

            }
        })()
    }, [buttonActionContext])

    useEffect(() => {

        if (hoSo?.maHoSo && barCodeRef.current) {
            JsBarcode(barCodeRef.current, hoSo.maHoSo, {
                height: 28,
                width: 0.86,
                text: hoSo?.maHoSo,
                fontSize: 12,
                font: "Times New Roman"
            });
        }

        if (hoSo?.maHoSo && barcodeRef.current) { //Không được xóa
            JsBarcode(barcodeRef.current, hoSo.maHoSo, {
                height: 28,
                width: 0.86,
                text: hoSo?.maHoSo,
                fontSize: 10,
                font: "Times New Roman",
                format: 'CODE128',
            });
        }

        setValueSvg(document.querySelector('#svgImage')?.innerHTML)

    }, [hoSo?.maHoSo, barcodeRef.current]);

    return <div style={{ width: '700px', margin: '0 auto', }}>
        {/* <div id="ContainerSwapperForLayout" style={{ display: 'none', margin: '0 auto', fontSize: '14px', fontFamily: "'Times New Roman', Times, serif", }}>
            <div id="Content" style={{ margin: '0 auto' }}>
                <div className="header">
                    <div style={{ display: 'flex', fontWeight: 600 }}>
                        <div style={{ flex: 1, textAlign: 'center' }}>
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
                                style={{ height: 1, width: 140, margin: '0 auto', color: 'black', backgroundColor: 'black', border: "none", opacity: '0.8' }} />
                        </div>

                        <div style={{ flex: "1", textAlign: 'center' }}>
                            <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br />
                            <strong>Độc lập - Tự do - Hạnh phúc</strong>
                            <hr
                                style={{ height: 1, width: '175px', margin: '0 auto', color: 'black', backgroundColor: 'black', border: "none", opacity: '0.8' }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', marginTop: '6px' }}>
                        <div style={{ flex: "1", textAlign: 'center', display: 'flex', flexDirection: 'column' }} key={'bar1'}>
                            <div style={{ width: '270px', height: '40px', margin: '0px auto', position: 'relative', top: '-5px' }}>
                                <svg ref={barCodeRef || ""} ></svg>
                            </div>
                        </div>
                        <div style={{ flex: "1", textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                            <i>Ninh Thuận, <span >ngày {DATE || ""} tháng {MONTH || ""} năm {YEAR || ""}</span></i>
                            <strong>Quyển số: ..., Số thứ tự: ...</strong>
                            <div style={{ display: 'flex', width: '250px', margin: '10px auto', position: 'relative', right: '10px' }}>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ textAlign: 'center', fontWeight: 600, fontSize: 16 }}>
                    <strong>GIẤY TIẾP NHẬN HỒ SƠ VÀ HẸN TRẢ KẾT QUẢ</strong><br />
                    <i style={{ fontWeight: '500' }}>(Liên: Lưu/Giao khách hàng)</i>
                </div>
                <div style={{ width: '90%', margin: '0 auto', pageBreakAfter: 'auto' }}>
                    <div style={{ width: '90%', margin: '0 auto', }}>
                        <div>
                            <p style={{ margin: '5px 0' }}>Bộ phận tiếp nhận và trả kết quả: {hoSo?.groupName}</p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>Tiếp nhận hồ sơ của:
                                <strong> {hoSo?.chuHoSo ? hoSo?.chuHoSo + "." : ""}</strong>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>Người nộp:
                                <strong> {hoSo?.nguoiNopHoSo ? hoSo?.nguoiNopHoSo + "." : ""}</strong>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>Địa chỉ: <span>{hoSo?.diaChiChuHoSo ? hoSo?.diaChiChuHoSo + "." : ""}</span></p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>
                                Số điện thoại: <span>{hoSo?.soDienThoaiChuHoSo || ""}. </span>
                                Email (Nếu có): <span>{hoSo?.emailChuHoSo ? hoSo?.emailChuHoSo + "." : ""}</span>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>Số CMND/Thẻ căn cước/Hộ chiếu: <span>{hoSo?.soGiayToChuHoSo ? hoSo?.soGiayToChuHoSo + "." : ""}</span>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>Nội dung yêu cầu giải quyết: {hoSo?.trichYeuHoSo + "." || ""}</p>
                        </div>

                        <div>
                            <p style={{ margin: '5px 0' }}>1. Thành phần hồ sơ, yêu cầu và số lượng mỗi loại giấy tờ gồm:</p>
                        </div>
                        <table className="test"
                            style={{ border: '1px solid #333', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0' }}>
                            <tbody>
                                <tr>
                                    <td rowSpan={1} style={{ border: '1px solid #333', fontWeight: 600, width: '8%' }}>
                                        <strong>STT</strong>
                                    </td>
                                    <td rowSpan={1} style={{ border: '1px solid #333', fontWeight: 600 }}>
                                        <strong>Tên giấy tờ, tài liệu</strong>
                                    </td>
                                    <td rowSpan={1} style={{ border: '1px solid #333', fontWeight: 600, width: '10%' }}>
                                        <strong>Số bản chính</strong>
                                    </td>
                                    <td rowSpan={1} style={{ border: '1px solid #333', fontWeight: 600, width: '10%' }}>
                                        <strong>Số bản sao</strong>
                                    </td>
                                </tr>

                                {hoSo?.thanhPhanHoSos?.map((tphs, index) => {
                                    return <tr key={index}>
                                        <td style={{ border: '1px solid #333', padding: '5px' }}>
                                            {index + 1}
                                        </td>
                                        <td style={{ border: '1px solid #333', padding: '5px', textAlign: 'left' }}>
                                            {tphs.ten || ""}
                                        </td>
                                        <td style={{ border: '1px solid #333', padding: '5px' }}>
                                            {tphs.soBanChinh || ""}
                                        </td>
                                        <td style={{ border: '1px solid #333', padding: '5px' }}>
                                            {tphs.soBanSao || ""}
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>




                        <div>
                            <p style={{ margin: '5px 0' }}>2. Số lượng hồ sơ:
                                <span > {hoSo?.soBoHoSo ? hoSo?.soBoHoSo + "." : ""}</span>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>3. Thời gian giải quyết hồ sơ theo quy định là:
                                <span > {hoSo?.thoiGianThucHien ? hoSo?.thoiGianThucHien /8 : ""} </span>
                                <span >{hoSo?.loaiThoiGianThucHien ? hoSo?.loaiThoiGianThucHien + "." : ""}</span>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>4. Thời gian nhận hồ sơ:
                                <span > {hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format("HH") + " giờ " + dayjs(hoSo.ngayTiepNhan).format("mm") + " phút, ngày " : ""}</span>
                                <span >{hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format(FORMAT_DATE_WITHOUT_TIME) : ""}.</span>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>5. Thời gian trả kết quả giải quyết hồ sơ: Sau
                                <span > {hoSo?.ngayHenTra ? dayjs(hoSo.ngayHenTra).format("HH") + " giờ " + dayjs(hoSo.ngayHenTra).format("mm") + " phút, ngày " : ""}</span>
                                <span >{hoSo?.ngayHenTra ? dayjs(hoSo.ngayHenTra).format(FORMAT_DATE_WITHOUT_TIME) : ""}.</span><br />

                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>6. Thời gian nhận hồ sơ (giai đoạn 2 nếu có):
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>7. Thời gian trả kết quả giải quyết hồ sơ (giai đoạn 2 nếu có):</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="signature" style={{ margin: '0 auto', }}>
                <div id="lastCheckBreak" style={{ display: 'flex', textAlign: 'center', fontWeight: 600 }}>
                    <div style={{ flex: "1" }}>
                        <strong>NGƯỜI NỘP HỒ SƠ</strong><br />
                        <i>(Ký)</i>
                        <div style={{ width: '120px', height: '90px', margin: '10px auto' }}>
                        </div>
                        <strong >{hoSo?.nguoiNopHoSo || ""}</strong>
                    </div>
                    <div style={{ flex: "1" }}>
                        <strong>NGƯỜI TIẾP NHẬN HỒ SƠ</strong><br />
                        <i>(Ký)</i>
                        <div style={{ width: '120px', height: '90px', margin: '10px auto' }}>

                        </div>
                        <strong>{hoSo?.nguoiTiepNhan || ""}</strong><br />
                        <strong>Số điện thoại: ...</strong>
                    </div>
                </div>
            </div>
        </div> */}

        {/* ///////////////////////////////////////////////////////////////////////////////// */}
        <div style={{ display: 'block' }}>
            <div id="ContainerSwapper" style={{ margin: '0 auto', fontSize: '15px', fontFamily: "'Times New Roman', Times, serif", }}>
                <div id="Content" style={{ margin: '0 auto' }}>
                    <div className="header">
                        <table style={{ width: '100%', fontSize: 13.5 }}>
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
                                    <div style={{ height: '40px', margin: '0px auto', position: 'relative', top: '-4px' }}>
                                        <div id="svgImage" style={{ display: 'none' }}>
                                            <svg ref={barcodeRef || ""} ></svg>
                                        </div>
                                        <img style={{ width: '300px', height: '66px' }} src={`data:image/svg+xml;utf8,${encodeURIComponent(valueSvg)}`} alt="Barcode" />
                                    </div>
                                </td>
                                <td style={{ width: '50%', textAlign: 'center', verticalAlign: 'text-top' }} >
                                    <i>Ninh Thuận, <span >ngày {DATE || ""} tháng {MONTH || ""} năm {YEAR || ""}</span></i><br />
                                    <strong>Quyển số: ..., Số thứ tự: ...</strong>
                                </td>
                            </tr>
                        </table>

                    </div>


                    <div style={{ textAlign: 'center', fontWeight: 600, fontSize: 16, marginTop: '15px' }}>
                        <strong>GIẤY TIẾP NHẬN HỒ SƠ VÀ HẸN TRẢ KẾT QUẢ</strong><br />
                        <i style={{ fontWeight: '500', fontSize: '13.5px' }}>(Liên: Lưu/Giao khách hàng)</i>
                    </div>
                    <div style={{ width: '90%', margin: '0 auto', fontSize: '13.5px' }}>
                        <div style={{ width: '90%', margin: '0 auto', }}>
                            <div>
                                <p style={{ margin: '5px 0' }}>Bộ phận tiếp nhận và trả kết quả: {hoSo?.groupName}</p>
                            </div>
                            <div>
                                <p style={{ margin: '5px 0' }}>Tiếp nhận hồ sơ của:
                                    <strong> {hoSo?.chuHoSo ? hoSo?.chuHoSo + "." : ""}</strong>
                                </p>
                            </div>
                            <div>
                                <p style={{ margin: '5px 0' }}>Người nộp:
                                    <strong> {hoSo?.nguoiNopHoSo ? hoSo?.nguoiNopHoSo + "." : ""}</strong>
                                </p>
                            </div>
                            <div>
                                <p style={{ margin: '5px 0' }}>Địa chỉ: <span>{hoSo?.diaChiChuHoSo ? hoSo?.diaChiChuHoSo + "." : ""}</span></p>
                            </div>
                            <div>
                                <p style={{ margin: '5px 0' }}>
                                    Số điện thoại: <span>{hoSo?.soDienThoaiChuHoSo || ""}. </span>
                                    Email (Nếu có): <span>{hoSo?.emailChuHoSo ? hoSo?.emailChuHoSo + "." : ""}</span>
                                </p>
                            </div>
                            <div>
                                <p style={{ margin: '5px 0' }}>Số CMND/Thẻ căn cước/Hộ chiếu: <span>{hoSo?.soGiayToChuHoSo ? hoSo?.soGiayToChuHoSo + "." : ""}</span>
                                </p>
                            </div>
                            <div>
                                <p style={{ margin: '5px 0' }}>Nội dung yêu cầu giải quyết: {hoSo?.trichYeuHoSo + "." || ""}</p>
                            </div>

                            <div>
                                <p style={{ margin: '5px 0' }}>1. Thành phần hồ sơ, yêu cầu và số lượng mỗi loại giấy tờ gồm:</p>
                            </div>
                            <table
                                style={{ border: '1px solid #333', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: '13.5px' }}>
                                <tbody>
                                    <tr>
                                        <td rowSpan={1} style={{ border: '1px solid #333', fontWeight: 600, width: '8%' }}>
                                            <strong>STT</strong>
                                        </td>
                                        <td rowSpan={1} style={{ border: '1px solid #333', fontWeight: 600 }}>
                                            <strong>Tên giấy tờ, tài liệu</strong>
                                        </td>
                                        <td rowSpan={1} style={{ border: '1px solid #333', fontWeight: 600, width: '10%' }}>
                                            <strong>Số bản chính</strong>
                                        </td>
                                        <td rowSpan={1} style={{ border: '1px solid #333', fontWeight: 600, width: '10%' }}>
                                            <strong>Số bản sao</strong>
                                        </td>
                                    </tr>

                                    {hoSo?.thanhPhanHoSos?.map((tphs, index) => {
                                        return <tr key={index}>
                                            <td style={{ border: '1px solid #333', padding: '5px' }}>
                                                {index + 1}
                                            </td>
                                            <td style={{ border: '1px solid #333', padding: '5px', textAlign: 'left' }}>
                                                {tphs.ten || ""}
                                            </td>
                                            <td style={{ border: '1px solid #333', padding: '5px' }}>
                                                {tphs.soBanChinh || ""}
                                            </td>
                                            <td style={{ border: '1px solid #333', padding: '5px' }}>
                                                {tphs.soBanSao || ""}
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>



                            {/* </div> */}

                            <div>
                                <p style={{ margin: '5px 0' }}>2. Số lượng hồ sơ:
                                    <span > {hoSo?.soBoHoSo ? hoSo?.soBoHoSo + "." : ""}</span>
                                </p>
                            </div>
                            <div>
                                <p style={{ margin: '5px 0' }}>3. Thời gian giải quyết hồ sơ theo quy định là:
                                    <span > {hoSo?.thoiGianThucHien ? hoSo?.thoiGianThucHien / 8 : ""} </span>
                                    <span >{hoSo?.loaiThoiGianThucHien ? hoSo?.loaiThoiGianThucHien.toLocaleLowerCase() + "." : ""}</span>
                                </p>
                            </div>
                            <div>
                                <p style={{ margin: '5px 0' }}>4. Thời gian nhận hồ sơ:
                                    <span > {hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format("HH") + " giờ " + dayjs(hoSo.ngayTiepNhan).format("mm") + " phút, ngày " : ""}</span>
                                    <span >{hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format(FORMAT_DATE_WITHOUT_TIME) : ""}.</span>
                                </p>
                            </div>
                            <div>
                                <p style={{ margin: '5px 0' }}>5. Thời gian trả kết quả giải quyết hồ sơ: Sau
                                    <span > {hoSo?.ngayHenTra ? dayjs(hoSo.ngayHenTra).format("HH") + " giờ " + dayjs(hoSo.ngayHenTra).format("mm") + " phút, ngày " : ""}</span>
                                    <span >{hoSo?.ngayHenTra ? dayjs(hoSo.ngayHenTra).format(FORMAT_DATE_WITHOUT_TIME) : ""}.</span><br />

                                </p>
                            </div>
                            <div>
                                <p style={{ margin: '5px 0' }}>6. Thời gian nhận hồ sơ (giai đoạn 2 nếu có):
                                </p>
                            </div>
                            <div>
                                <p style={{ margin: '5px 0' }}>7. Thời gian trả kết quả giải quyết hồ sơ (giai đoạn 2 nếu có):</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="signature" style={{ margin: '0 auto', }}>
                    <table style={{ width: '100%', fontSize: '13.5px' }}>
                        <tr style={{ width: '100%' }}>
                            <td style={{ width: '50%', textAlign: 'center', verticalAlign: 'text-top' }}>
                                <strong>NGƯỜI NỘP HỒ SƠ</strong><br />
                                <i>(Ký)</i>
                                <br /><br /><br /><br /><br /><br /><br /><br />
                                <strong >{hoSo?.nguoiNopHoSo ? hoSo.nguoiNopHoSo.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase()) : ""}</strong>
                            </td>
                            <td style={{ width: '50%', textAlign: 'center', verticalAlign: 'text-top' }}>
                                <strong>NGƯỜI TIẾP NHẬN HỒ SƠ</strong><br />
                                <i>(Ký)</i>
                                <br /><br /><br /><br /><br /><br /><br /><br />
                                <strong>{hoSo?.nguoiTiepNhan ? hoSo.nguoiTiepNhan.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase()) : ""}</strong><br />
                                <strong>Số điện thoại: ...</strong>
                            </td>
                        </tr>
                    </table>

                </div>

            </div>
        </div>
    </div >
}