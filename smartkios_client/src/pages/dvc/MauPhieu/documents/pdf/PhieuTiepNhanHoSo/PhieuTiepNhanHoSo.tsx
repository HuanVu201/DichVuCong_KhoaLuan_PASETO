import { FORMAT_DATE_WITHOUT_TIME, HOST_PATH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, PDF_TEN_TINH_LOWER_CASE } from "@/data"
import { CURRENTTIME, DATE, MONTH, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import JsBarcode from 'jsbarcode'
import QrCode from 'qrcode'
import dayjs from 'dayjs'
import { QRCodeByLink } from "../QRCodeByLink"
import { useDispatch } from "react-redux"
import { Service } from "@/services"



export const PhieuTiepNhanHoSo = () => {
    const dispatch = useDispatch()
    const [hoSo, setHoSo] = useState<IHoSo>()
    const barCodeRef = useRef<SVGSVGElement>(null)
    const barcodeRef = useRef<SVGSVGElement>(null)
    const buttonActionContext = useButtonActionContext()
    const [valueSvg, setValueSvg] = useState<any>('')
    const [srcQrCode, setSrcQrCode] = useState<any>('')
    const [srcQrCodeThongTin, setSrcQrCodeThongTin] = useState<any>('')
    const [thongTin, setThongTin] = useState<string>('')
    const [linkQrCodeThongTin, setLinkQrCodeThongTin] = useState('');
    useEffect(() => {
        (async () => {
            if (buttonActionContext.selectedHoSos.length) {
                const res = await hoSoApi.GetPrintData(buttonActionContext.selectedHoSos[0] as string)
                const hoSo = res.data.data
                setHoSo(hoSo)

            }
        })()
    }, [buttonActionContext])
    // console.log(hoSo)

    useEffect(() => {
        const generateQRCode = async () => {
            try {
                if (thongTin) {
                    const url = await QRCodeByLink(`PhieuTiepNhanThanhHoa_${hoSo?.maHoSo}`, thongTin)
                    setLinkQrCodeThongTin(url)
                }
            } catch (error) {
                console.error('Error when generating QR code:', error);
            }
        }
        generateQRCode()
    }, [thongTin])

    useEffect(() => {

        setValueSvg(document.querySelector('#svgImage')?.innerHTML)

        const canvas = document.getElementById('qrcodeCanvas') as HTMLCanvasElement;
        if (canvas) {
            const ctx = canvas.getContext('2d');

            if (ctx) {
                ctx.imageSmoothingQuality = 'high';
                QrCode.toCanvas(canvas, `${HOST_PATH}${hoSo?.maHoSo}`, {
                    width: 64,
                });

                const imageDataURL = canvas.toDataURL('image/png');
                setSrcQrCode(imageDataURL);
            }
        }


        const canvas2 = document.getElementById('qrcodeCanvasThongTin') as HTMLCanvasElement;
        if (canvas2) {
            const ctx = canvas2.getContext('2d');

            if (ctx) {
                ctx.imageSmoothingQuality = 'high';
                QrCode.toCanvas(canvas2, linkQrCodeThongTin, {
                    width: 64,
                });

                const imageDataURL = canvas2.toDataURL('image/png');
                setSrcQrCodeThongTin(imageDataURL);
            }
        }
        if (hoSo?.soGiayToChuHoSo && hoSo.maHoSo && hoSo.maDinhDanh && hoSo.maTTHC && hoSo.trichYeuHoSo) {
            setThongTin(`<b>HỆ THỐNG THÔNG TIN GIẢI QUYẾT THỦ TỤC HÀNH CHÍNH TỈNH THANH HÓA</b><br/>
                Tên giấy tờ: Phiếu tiếp nhận hồ sơ và hẹn trả kết quả<br/>
                Mã định danh chủ hồ sơ: ${hoSo?.soGiayToChuHoSo}<br/>
                Mã hồ sơ: ${hoSo?.maHoSo}<br/>
                Mã định danh cơ quan thực hiện: ${hoSo?.maDinhDanh}<br/>
                Mã thủ tục: ${hoSo?.maTTHC}<br/>
                Thủ tục: ${hoSo?.trichYeuHoSo}<br/>
                Thời gian: ${CURRENTTIME}
                `)
        }

    }, [hoSo?.maHoSo, barcodeRef.current, linkQrCodeThongTin]);

    return <div style={{ width: '620px', margin: '0 auto' }}>
        {/* <div id="ContainerSwapperForLayout" style={{ display: 'block', margin: '0 auto', fontSize: '14px', fontFamily: "'Times New Roman', Times, serif", }}>
            <div id="Content" style={{ margin: '0 auto' }}>
                <div className="headerPhieu">
                    <div style={{ display: 'flex', fontWeight: 600 }}>
                        <div style={{ flex: 1, textAlign: 'center' }}>
                            <strong>{PDF_TEN_TRUNG_TAM || ""}</strong><br />
                            <strong>{PDF_TEN_TINH || ""}</strong>
                            <hr
                                style={{ height: 1.5, width: 55, margin: '0 auto', color: 'black', backgroundColor: 'black', border: "none" }} />
                        </div>

                        <div style={{ flex: "1", textAlign: 'center' }}>
                            <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br />
                            <strong>Độc lập - Tự do - Hạnh phúc</strong>
                            <hr
                                style={{ height: 1.5, width: '175px', margin: '0 auto', color: 'black', backgroundColor: 'black', border: "none" }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', marginTop: '6px' }}>
                        <div style={{ flex: "1", textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                            <span>Mã hồ sơ: {hoSo?.maHoSo || "Không có mã hồ sơ!"}</span>
                            <div style={{ width: '270px', height: '40px', margin: '5px auto' }}>
                                <svg ref={barCodeRef || ""}></svg>
                            </div>
                        </div>
                        <div style={{ flex: "1", textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                            <i>Thanh Hóa, <span >ngày {DATE || ""} tháng {MONTH || ""} năm {YEAR || ""}</span></i>
                            <div style={{ display: 'flex', width: '250px', margin: '0px auto', position: 'relative', right: '10px' }}>
                                <div style={{ margin: 'auto', width: '180px' }}>
                                    <span style={{ fontSize: '13px' }}>Mã QR dùng để tra cứu tiến độ giải quyết hồ sơ qua
                                        Zalo</span>
                                </div>
                                <div style={{ display: 'none' }}>
                                    <canvas id="qrcodeCanvas"></canvas>
                                </div>
                                {srcQrCode && <img src={srcQrCode} alt="QRcode" />}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ textAlign: 'center', fontWeight: 600, fontSize: 16 }}>
                    <strong>GIẤY TIẾP NHẬN HỒ SƠ VÀ HẸN TRẢ KẾT QUẢ</strong>
                </div>
                <div style={{ width: '90%', margin: '0 auto', pageBreakAfter: 'auto' }}>
                    <div style={{ width: '90%', margin: '0 auto', }}>
                        <div>
                            <p style={{ margin: '5px 0' }}>Trung tâm Phục vụ hành chính công {PDF_TEN_TINH_LOWER_CASE}:</p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>Tiếp nhận hồ sơ của Ông (Bà):
                                <strong> {hoSo?.chuHoSo || ""}</strong>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>Địa chỉ: <span>{hoSo?.diaChiChuHoSo || ""}</span></p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>
                                Số điện thoại: <span>{hoSo?.soDienThoaiChuHoSo || ""}</span>.
                                Email: <span>{hoSo?.emailChuHoSo || ""}</span>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>Số CMND/Thẻ căn cước/Hộ chiếu: <span>{hoSo?.soGiayToChuHoSo || ""}</span>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>Nội dung yêu cầu giải quyết:
                                <span> {hoSo?.trichYeuHoSo || ""}</span>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>Chủ hồ sơ:
                                <span> {hoSo?.chuHoSo || ""}</span>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>Địa chỉ chủ hồ sơ:
                                <span > {hoSo?.diaChiChuHoSo || ""}</span>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>Hình thức thu phí, lệ phí:
                                <span > {hoSo?.hinhThucThu || ""}</span>
                            </p>
                        </div>
                        <div style={{ width: '100%' }}>
                            <p style={{ margin: '5px 0' }}>Thành phần hồ sơ, số lượng mỗi loại giấy tờ:</p>
                            <table
                                style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0' }}>
                                <tbody>
                                    <tr>
                                        <td rowSpan={2} style={{ border: '1px solid #333', fontWeight: 600, width: '8%' }}>
                                            <strong>TT</strong>
                                        </td>
                                        <td rowSpan={2} style={{ border: '1px solid #333', fontWeight: 600 }}>
                                            <strong>Thành phần hồ sơ</strong>
                                        </td>
                                        <td colSpan={3} style={{ border: '1px solid #333', fontWeight: 600, width: '30%', padding: '8px 0' }}>
                                            <strong>Số lượng</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #333', fontWeight: 600, width: '10%' }}><strong>Bản
                                            chính</strong></td>
                                        <td style={{ border: '1px solid #333', fontWeight: 600, width: '10%' }}><strong>Bản chứng
                                            thực</strong></td>
                                        <td style={{ border: '1px solid #333', fontWeight: 600, width: '10%' }}><strong>Bản
                                            photo</strong></td>
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
                                                {tphs.nhanBanGiay || ""}
                                            </td>
                                            <td style={{ border: '1px solid #333', padding: '5px' }}>
                                                {tphs.soBanSao || ""}
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>



                        </div>

                        <div>
                            <p style={{ margin: '5px 0' }}>2. Số lượng hồ sơ:
                                <span > {hoSo?.soBoHoSo || ""}</span>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>3. Thời gian giải quyết hồ sơ theo quy định là:
                                <span > {hoSo?.thoiGianThucHien ? hoSo?.thoiGianThucHien /8 : ""} </span>
                                <span >{hoSo?.loaiThoiGianThucHien ? hoSo?.loaiThoiGianThucHien.toLocaleLowerCase() : ""}</span>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>4. Thời gian nhận hồ sơ:
                                <span > {hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format("HH") + " giờ " + dayjs(hoSo.ngayTiepNhan).format("mm") + " phút, ngày " : ""}</span>
                                <span >{hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>5. Thời gian trả kết quả giải quyết hồ sơ: Sau
                                <span > {hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayHenTra).format("HH") + " giờ " + dayjs(hoSo.ngayHenTra).format("mm") + " phút, ngày " : ""}</span>
                                <span >{hoSo?.ngayHenTra ? dayjs(hoSo.ngayHenTra).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span><br />
                                <i>(Hồ sơ có thể giải quyết xong trước thời gian quy định, Trung tâm sẽ gửi thông báo qua
                                    tin nhắn điện thoại và thư điện tử (nếu có) đến người nộp/chủ hồ sơ. Ngoài ra người nộp/chủ
                                    hồ sơ tra cứu tình hình giải quyết TTHC, biên lai điện tử thu phí, lệ phí tại Website:
                                    https://hcc.thanhhoa.gov.vn hoặc liên hệ số điện thoại:02373.900.900 để biết thông tin)</i>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>6. Đăng ký nhận kết quả tại:
                                <span > Trung tâm Phục vụ hành chính công tỉnh</span>.
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}><span style={{ fontWeight: 600 }}>Khi đến nhận kết quả:</span> Người nộp
                                mang theo Giấy này (trường hợp pháp luật có
                                quy định Chủ hồ sơ phải trực tiếp đến nhận kết quả nhưng không đến được thì phải
                                có giấy ủy quyền cho người khác đi nhận thay theo quy định).</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="pointBreakPage" ></div>
            <div id="signature" style={{ height: '160px', margin: '0 auto', }}>
                <div id="lastCheckBreak" style={{ display: 'flex', textAlign: 'center', fontWeight: 600 }}>
                    <div style={{ flex: "1" }}>
                        <strong>NGƯỜI NỘP HỒ SƠ</strong>
                        <div style={{ width: '120px', height: '90px', margin: '10px auto' }}>
                        </div>
                        <strong >{hoSo?.nguoiNopHoSo || ""}</strong>
                    </div>
                    <div style={{ flex: "1" }}>
                        <strong>NGƯỜI TIẾP NHẬN HỒ SƠ</strong>
                        <div style={{ width: '120px', height: '90px', margin: '10px auto' }}>

                        </div>
                        <strong>{hoSo?.nguoiTiepNhan || ""}</strong>
                    </div>
                </div>
            </div>

        </div> */}
        <div id="ContainerSwapper" style={{ display: 'block', margin: '0 auto', fontSize: '14px', fontFamily: "'Times New Roman', Times, serif", }}>
            <div id="Content" style={{ margin: '0 auto' }}>
                <div className="headerPhieu">
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
                                                <strong>TRUNG TÂM PHỤC VỤ HÀNH CHÍNH CÔNG</strong><br />
                                                <strong><u>TỈNH THANH HÓA</u></strong>
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
                            <td style={{ textAlign: 'left' }}>
                                <div style={{ display: 'none' }}>
                                    <canvas id="qrcodeCanvasThongTin"></canvas>
                                </div>
                                {srcQrCodeThongTin && <img src={srcQrCodeThongTin} alt="QRcode" />}
                            </td>
                            <td style={{ textAlign: 'center' }} >
                                <i>Thanh Hóa, ngày {DATE || ""} tháng {MONTH || ""} năm {YEAR || ""}</i>
                                <div style={{ width: '250px', margin: '0px auto' }}>
                                    <table>
                                        <tr>
                                            <td style={{ width: '50px' }}></td>
                                            <td style={{ textAlign: 'center' }}>
                                                <div style={{ margin: 'auto', width: '160px' }}>
                                                    <span style={{ fontSize: '13px' }}>Mã QR dùng để tra cứu tiến độ giải quyết hồ sơ qua
                                                        Zalo</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ display: 'none' }}>
                                                    <canvas id="qrcodeCanvas"></canvas>
                                                </div>
                                                {srcQrCode && <img src={srcQrCode} alt="QRcode" />}
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div style={{ textAlign: 'center', fontWeight: 600, fontSize: 16 }}>
                    <strong>GIẤY TIẾP NHẬN HỒ SƠ VÀ HẸN TRẢ KẾT QUẢ</strong><br />
                    <span style={{ fontSize: 14 }}>Mã hồ sơ: {hoSo?.maHoSo}</span>
                </div>
                <div style={{ width: '100%', margin: '0 auto', fontSize: 14 }}>
                    <div style={{ width: '100%', margin: '0 auto', }}>
                        {hoSo?.catalog == 'so-ban-nganh'
                            ?
                            <p style={{ margin: '5px 0' }}>Trung tâm Phục vụ hành chính công {PDF_TEN_TINH_LOWER_CASE}:</p>
                            :
                            <>
                                <p style={{ margin: '5px 0' }}>Bộ phận tiếp nhận và trả kết quả {hoSo?.groupName}:</p>
                            </>
                        }
                        <div>
                            <p style={{ margin: '5px 0' }}>Tiếp nhận hồ sơ của Ông (Bà):
                                <strong> {hoSo?.chuHoSo || ""}</strong>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>Địa chỉ: <span>{hoSo?.diaChiChuHoSo || ""}</span></p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>
                                Số điện thoại: <span>{hoSo?.soDienThoaiChuHoSo || ""}</span>.
                                Email: <span>{hoSo?.emailChuHoSo || ""}</span>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>Số CMND/Thẻ căn cước/Hộ chiếu: <span>{hoSo?.soGiayToChuHoSo || ""}</span>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>Nội dung yêu cầu giải quyết:
                                <span> {hoSo?.trichYeuHoSo || ""}</span>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>Chủ hồ sơ:
                                <span> {hoSo?.chuHoSo || ""}</span>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>Địa chỉ chủ hồ sơ:
                                <span > {hoSo?.diaChiChuHoSo || ""}</span>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>Hình thức thu phí, lệ phí:
                                <span > {hoSo?.hinhThucThu || ""}</span>
                            </p>
                        </div>
                        <div style={{ width: '100%' }}>
                            <p style={{ margin: '5px 0' }}>Thành phần hồ sơ, số lượng mỗi loại giấy tờ:</p>
                            <table
                                style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: 14 }}>
                                <tbody>
                                    <tr>
                                        <td rowSpan={2} style={{ border: '1px solid #333', fontWeight: 600, width: '8%' }}>
                                            <strong>TT</strong>
                                        </td>
                                        <td rowSpan={2} style={{ border: '1px solid #333', fontWeight: 600 }}>
                                            <strong>Thành phần hồ sơ</strong>
                                        </td>
                                        <td colSpan={3} style={{ border: '1px solid #333', fontWeight: 600, width: '30%', padding: '8px 0' }}>
                                            <strong>Số lượng</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #333', fontWeight: 600, width: '10%' }}><strong>Bản
                                            chính</strong></td>
                                        <td style={{ border: '1px solid #333', fontWeight: 600, width: '10%' }}><strong>Bản chứng
                                            thực</strong></td>
                                        <td style={{ border: '1px solid #333', fontWeight: 600, width: '10%' }}><strong>Bản
                                            photo</strong></td>
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
                                                {tphs.nhanBanGiay || ""}
                                            </td>
                                            <td style={{ border: '1px solid #333', padding: '5px' }}>
                                                {tphs.soBanSao || ""}
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <p style={{ margin: '5px 0' }}>2. Số lượng hồ sơ:
                                <span > {hoSo?.soBoHoSo || ""}</span>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>3. Thời gian giải quyết hồ sơ theo quy định là:
                                <span > {hoSo?.thoiGianThucHien ? hoSo?.thoiGianThucHien / 8 : ""} </span>
                                <span >{hoSo?.loaiThoiGianThucHien ? hoSo?.loaiThoiGianThucHien.toLocaleLowerCase() : ""}</span>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>4. Thời gian nhận hồ sơ:
                                <span > {hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format("HH") + " giờ " + dayjs(hoSo.ngayTiepNhan).format("mm") + " phút, ngày " : ""}</span>
                                <span >{hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span>
                            </p>
                        </div>
                        <div>
                            <p style={{ margin: '5px 0' }}>5. Thời gian trả kết quả giải quyết hồ sơ: Sau
                                <span > {hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayHenTra).format("HH") + " giờ " + dayjs(hoSo.ngayHenTra).format("mm") + " phút, ngày " : ""}</span>
                                <span >{hoSo?.ngayHenTra ? dayjs(hoSo.ngayHenTra).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span><br />
                                <i>(Hồ sơ có thể giải quyết xong trước thời gian quy định, hồ sơ sẽ được gửi thông báo qua tin nhắn điện thoại và thư điện tử (nếu có) đến người nộp/chủ hồ sơ. Ngoài ra người nộp/chủ hồ sơ tra cứu tình hình giải quyết TTHC, biên lai điện tử thu phí, lệ phí tại Website: https://dichvucong.thanhhoa.gov.vn hoặc liên hệ số điện thoại:02373.900.900 để biết thông tin)</i>
                            </p>
                        </div>
                        {hoSo?.dangKyNhanHoSoQuaBCCIData !== ""
                            ?
                            <div>
                                <p style={{ margin: '5px 0' }}>6. Đăng ký nhận kết quả:
                                    <span > Qua dịch vụ Bưu chính công ích.</span>
                                </p>
                            </div>
                            : <>
                                {hoSo?.catalog == 'so-ban-nganh'
                                    ?
                                    <div>
                                        <p style={{ margin: '5px 0' }}>6. Đăng ký nhận kết quả tại:
                                            <span > Trung tâm Phục vụ hành chính công tỉnh</span>.
                                        </p>
                                    </div>
                                    :
                                    <div>
                                        <p style={{ margin: '5px 0' }}>6. Đăng ký nhận kết quả tại:
                                            <span > Bộ phận Tiếp nhận và Trả kết quả {hoSo?.groupName}</span>.
                                        </p>
                                    </div>
                                }
                                <div>
                                    <p style={{ margin: '5px 0' }}><span style={{ fontWeight: 600 }}>Khi đến nhận kết quả:</span> Người nộp
                                        mang theo Giấy này (trường hợp pháp luật có
                                        quy định Chủ hồ sơ phải trực tiếp đến nhận kết quả nhưng không đến được thì phải
                                        có giấy ủy quyền cho người khác đi nhận thay theo quy định).</p>
                                </div>


                            </>

                        }
                    </div>
                </div>
            </div>

            <div id="pointBreakPage" ></div>
            <div id="signature" style={{ height: '160px', margin: '0 auto', }}>
                <table style={{ width: '100%', fontSize: 14 }}>
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
                            <strong>{hoSo?.nguoiTiepNhan ? hoSo.nguoiTiepNhan.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase()) : ""}</strong>
                        </td>
                    </tr>
                </table>
            </div>

        </div>
    </div>
}