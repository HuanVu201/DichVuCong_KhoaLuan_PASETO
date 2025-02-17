import { CURRENTTIME, DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'
import { QRCodeByLink } from "../QRCodeByLink"
import QrCode from "qrcode"

export const PhieuKiemSoat = () => {
    const [hoSo, setHoSo] = useState<IHoSo>()
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

    useEffect(() => {
        const generateQRCode = async () => {
            try {
                if (thongTin) {
                    const url = await QRCodeByLink(`PhieuKiemSoatThanhHoa_${hoSo?.maHoSo}`, thongTin)
                    setLinkQrCodeThongTin(url)
                }
            } catch (error) {
                console.error('Error when generating QR code:', error);
            }
        }
        generateQRCode()
    }, [thongTin])
    console.log(hoSo)

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
                Tên giấy tờ: Phiếu bàn giao hồ sơ<br/>
                Mã định danh chủ hồ sơ: ${hoSo?.soGiayToChuHoSo}<br/>
                Mã hồ sơ: ${hoSo?.maHoSo}<br/>
                Mã định danh cơ quan thực hiện: ${hoSo?.maDinhDanh}<br/>
                Mã thủ tục: ${hoSo?.maTTHC}<br/>
                Thủ tục: ${hoSo?.trichYeuHoSo}<br/>
                Thời gian: ${CURRENTTIME}
                `)
        }
    }, [hoSo?.maHoSo, linkQrCodeThongTin]);

    return <>
        {/* <div id="ContainerSwapperForLayout" style={{ display: 'block', fontSize: '13px', fontFamily: "'Times New Roman', Times, serif" }}>
            <div id="Content" style={{ width: '650px', margin: '0 auto', }}>
                
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
                            <td style={{ textAlign: 'center' }} ></td>
                        </tr>
                    </table>

                </div>

                
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', margin: '0', fontSize: '14px', }}>
                    <strong>GIẤY BÀN GIAO HỒ SƠ</strong>
                    <strong style={{ fontSize: 12 }}>Mã hồ sơ: {hoSo?.maHoSo}</strong>
                </div>
                
                <div style={{ width: '90%', margin: 'auto', }}>
                    <div style={{ marginBottom: '8px', }}>
                        Nội dung hồ sơ: {hoSo?.trichYeuHoSo}
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Người nộp: <b>{hoSo?.chuHoSo}</b>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Địa chỉ người nộp: {hoSo?.diaChiChuHoSo ? hoSo.diaChiChuHoSo : "..."}
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Số điện thoại người nộp: {hoSo?.soDienThoaiChuHoSo ? hoSo.soDienThoaiChuHoSo : "..."}
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Email: {hoSo?.emailChuHoSo ? hoSo.emailChuHoSo : ""}
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Chủ hồ sơ: {hoSo?.chuHoSo}.
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Địa chỉ chủ hồ sơ: {hoSo?.diaChiChuHoSo}.
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Mã hồ sơ: {hoSo?.maHoSo}.
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Ngày nhận:
                        <span > {hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format("HH") + " giờ " + dayjs(hoSo.ngayTiepNhan).format("mm") + " phút, ngày " : ""}</span>
                        <span >{hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        <span>Thời gian giải quyết hồ sơ theo quy định là:
                            {
                                hoSo?.thoiGianThucHien
                                    ? hoSo?.thoiGianThucHien / 8
                                    : <>{hoSo?.loaiThoiGianThucHien ? hoSo?.loaiThoiGianThucHien.toLowerCase() : ""}</>
                            }
                        </span>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Thời gian hẹn trả kết quả cho tổ chức, cá nhân: Bắt đầu …, ............. Đề nghị đơn vị giải quyết
                        TTHC và trả kết quả về Trung tâm Phục vụ hành chính công tỉnh chậm nhất …, ….
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        <strong>* Thành phần hồ sơ:</strong>
                        <table
                            style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', }}>
                            <tr>
                                <td rowSpan={2} style={{ border: '1px solid #333', fontWeight: 600, width: '8%', }}>
                                    <strong>TT</strong>
                                </td>
                                <td rowSpan={2} style={{ border: '1px solid #333', fontWeight: 600, }}><strong>Thành phần hồ
                                    sơ</strong></td>
                                <td colSpan={3} style={{ border: '1px solid #333', fontWeight: 600, width: '30%', padding: '8px 0', }}>
                                    <strong>Số lượng</strong>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #333', fontWeight: 600, width: '10%', }}><strong>Bản
                                    chính</strong></td>
                                <td style={{ border: '1px solid #333', fontWeight: 600, width: '10%', }}><strong>Bản chứng
                                    thực</strong></td>
                                <td style={{ border: '1px solid #333', fontWeight: 600, width: '10%', }}><strong>Bản
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
                                        {tphs.soBanChinh || 0}
                                    </td>
                                    <td style={{ border: '1px solid #333', padding: '5px' }}>
                                        {tphs.nhanBanGiay || ""}
                                    </td>
                                    <td style={{ border: '1px solid #333', padding: '5px' }}>
                                        {tphs.soBanSao || 0}
                                    </td>
                                </tr>
                            })}
                        </table>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        <strong>Số lượng hồ sơ: ...</strong>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        <strong>I.GIAO HỒ SƠ</strong>
                        <table
                            style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: '13px', }}>
                            <tr>
                                <td style={{ border: '1px solid #333', padding: '5px', width: '25%', }}>
                                    <strong>TÊN CƠ QUAN</strong>
                                </td>
                                <td colSpan={2} style={{ border: '1px solid #333', padding: '5px', width: '50%' }}>
                                    <strong>THỜI GIAN GIAO, NHẬN</strong>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', width: '25%', }}>
                                    <strong>XÁC NHẬN CỦA TRUNG TÂM</strong>
                                </td>
                            </tr>
                            <tr>
                                <td rowSpan={2} style={{ border: '1px solid #333', padding: '5px', textAlign: 'left', }}>
                                    <div style={{ minHeight: '40px', }}>
                                        <strong>1. Giao:</strong><br />
                                        <span>Trung tâm phục vụ hành chính công tỉnh</span>
                                    </div>
                                    <div style={{ marginTop: '10px', minHeight: '40px', }}>
                                        <strong>2.Nhận: </strong>

                                    </div>
                                </td>
                                <td colSpan={2} style={{ border: '1px solid #333', padding: '5px', }}>…giờ…phút, …</td>
                                <td rowSpan={2}>
                                    <div>
                                        <strong>
                                            KT.GIÁM ĐỐC<br />
                                            PHÓ GIÁM ĐỐC
                                        </strong>
                                        <div style={{ display: 'block', height: '60px', width: '100px', }}></div>
                                        {hoSo?.catalog == 'so-ban-nganh' ? <strong>Nguyễn Văn Tuyên</strong> : <></>}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>
                                    <div style={{ display: 'block', minHeight: '60px', }}>
                                        <strong>Người giao</strong>
                                    </div>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>
                                    <div style={{ display: 'block', minHeight: '60px', }}>
                                        <strong>Người nhận</strong>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        <strong>II. NHẬN KẾT QUẢ</strong>
                        <table
                            style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: '13px', }}>
                            <tr>
                                <td style={{ border: '1px solid #333', padding: '5px', width: ' 25%', }}>
                                    <strong>TÊN CƠ QUAN</strong>
                                </td>
                                <td colSpan={2} style={{ border: '1px solid #333', padding: '5px', width: '50%', }}>
                                    <strong>THỜI GIAN GIAO, NHẬN</strong>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', width: '12.5%', }}>
                                    <strong>KẾT QUẢ XỬ LÝ</strong>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', width: '12.5%', }}>
                                    <strong>GHI CHÚ</strong>
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
                                        <span>Trung tâm phục vụ hành chính công tỉnh</span>
                                    </div>
                                </td>
                                <td colSpan={2} style={{ border: '1px solid #333', padding: '5px', }}>
                                    …giờ…phút, ngày … tháng … năm....
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>
                                    1
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>2</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>
                                    <div style={{ display: 'block', minHeight: '60px', }}>
                                        <strong>Người giao</strong>
                                    </div>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>
                                    <div style={{ display: 'block', minHeight: '60px', }}>
                                        <strong>Người nhận</strong>
                                    </div>
                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>3</td>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>4</td>
                            </tr>
                        </table>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        Giấy bàn giao hồ sơ này được lập thành 02 bản, mỗi bên giữ 01 bản có giá trị như nhau để làm cơ sở
                        thực hiện./.
                    </div>
                </div >
            </div >
        </div > */}


        <div id="ContainerSwapper" style={{ display: 'block', fontSize: '13px', fontFamily: "'Times New Roman', Times, serif" }}>
            {hoSo?.catalog == 'so-ban-nganh'
                ?
                <div id="Content" style={{ width: '650px', margin: '0 auto', }}>
                    {/* <!-- Header --> */}
                    <div className="headerPhieu">
                        <table style={{ width: '100%', fontSize: 13.5 }}>
                            <tr>
                                <td style={{ width: '50%', textAlign: 'center', verticalAlign: 'text-top' }}>
                                    <strong>TRUNG TÂM PHỤC VỤ HÀNH CHÍNH CÔNG</strong><br />
                                    <strong><u>TỈNH THANH HÓA</u></strong>
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
                                <td style={{ textAlign: 'center' }} ></td>
                            </tr>
                        </table>
                    </div>

                    {/* <!-- Title --> */}
                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', margin: '0', fontSize: '17px', marginTop: '15px' }}>
                        <strong>GIẤY BÀN GIAO HỒ SƠ</strong><br />
                        <strong style={{ fontSize: 14 }}>Mã hồ sơ: {hoSo?.maHoSo}</strong>
                    </div>
                    {/* <!-- Content --> */}
                    <div style={{ width: '90%', margin: 'auto', }}>
                        <div style={{ marginBottom: '8px', }}>
                            Nội dung hồ sơ: {hoSo?.trichYeuHoSo}
                        </div>
                        <div style={{ marginBottom: '8px', }}>
                            Người nộp: {hoSo?.chuHoSo}.
                        </div>
                        <div style={{ marginBottom: '8px', }}>
                            Địa chỉ người nộp: {hoSo?.diaChiChuHoSo ? hoSo.diaChiChuHoSo : "..."}
                        </div>
                        <div style={{ marginBottom: '8px', }}>
                            Số điện thoại người nộp: {hoSo?.soDienThoaiChuHoSo ? hoSo.soDienThoaiChuHoSo : "..."}
                        </div>
                        <div style={{ marginBottom: '8px', }}>
                            Email: {hoSo?.emailChuHoSo ? hoSo.emailChuHoSo : ""}
                        </div>
                        <div style={{ marginBottom: '8px', }}>
                            Chủ hồ sơ: {hoSo?.chuHoSo}.
                        </div>
                        <div style={{ marginBottom: '8px', }}>
                            Địa chỉ chủ hồ sơ: {hoSo?.diaChiChuHoSo}.
                        </div>
                        <div style={{ marginBottom: '8px', }}>
                            Mã hồ sơ: {hoSo?.maHoSo}.
                        </div>
                        <div style={{ marginBottom: '8px', }}>
                            Ngày nhận:
                            <span > {hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format("HH") + " giờ " + dayjs(hoSo.ngayTiepNhan).format("mm") + " phút, ngày " : ""}</span>
                            <span >{hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span>
                        </div>
                        <div style={{ marginBottom: '8px', }}>
                            <span>Thời gian giải quyết hồ sơ theo quy định là: {hoSo?.thoiGianThucHien} {hoSo?.loaiThoiGianThucHien ? hoSo?.loaiThoiGianThucHien.toLowerCase() : ""}</span>
                        </div>
                        <div style={{ marginBottom: '8px', }}>
                            Thời gian hẹn trả kết quả cho tổ chức, cá nhân: Bắt đầu …, ............. Đề nghị đơn vị giải quyết
                            TTHC và trả kết quả về Trung tâm Phục vụ hành chính công tỉnh chậm nhất …, ….
                        </div>
                        <div style={{ marginBottom: '8px', }}>
                            <strong>* Thành phần hồ sơ:</strong>
                            <table
                                style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', }}>
                                <tr>
                                    <td rowSpan={2} style={{ border: '1px solid #333', fontWeight: 600, width: '8%', }}>
                                        <strong>TT</strong>
                                    </td>
                                    <td rowSpan={2} style={{ border: '1px solid #333', fontWeight: 600, }}><strong>Thành phần hồ
                                        sơ</strong></td>
                                    <td colSpan={3} style={{ border: '1px solid #333', fontWeight: 600, width: '30%', padding: '8px 0', }}>
                                        <strong>Số lượng</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid #333', fontWeight: 600, width: '10%', }}><strong>Bản
                                        chính</strong></td>
                                    <td style={{ border: '1px solid #333', fontWeight: 600, width: '10%', }}><strong>Bản chứng
                                        thực</strong></td>
                                    <td style={{ border: '1px solid #333', fontWeight: 600, width: '10%', }}><strong>Bản
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
                                            {tphs.soBanChinh || 0}
                                        </td>
                                        <td style={{ border: '1px solid #333', padding: '5px' }}>
                                            {tphs.nhanBanGiay || ""}
                                        </td>
                                        <td style={{ border: '1px solid #333', padding: '5px' }}>
                                            {tphs.soBanSao || 0}
                                        </td>
                                    </tr>
                                })}
                            </table>
                        </div>
                        <div style={{ marginBottom: '8px', }}>
                            <strong>Số lượng hồ sơ: ...</strong>
                        </div>
                        <div style={{ marginBottom: '8px', }}>
                            <strong>I.GIAO HỒ SƠ</strong>
                            <table
                                style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: '13px', }}>
                                <tr>
                                    <td style={{ border: '1px solid #333', padding: '5px', width: '25%', }}>
                                        <strong>TÊN CƠ QUAN</strong>
                                    </td>
                                    <td colSpan={2} style={{ border: '1px solid #333', padding: '5px', width: '50%' }}>
                                        <strong>THỜI GIAN GIAO, NHẬN</strong>
                                    </td>
                                    <td style={{ border: '1px solid #333', padding: '5px', width: '25%', }}>
                                        <strong>XÁC NHẬN CỦA TRUNG TÂM</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td rowSpan={2} style={{ border: '1px solid #333', padding: '5px', textAlign: 'left', }}>
                                        <div style={{ minHeight: '40px', }}>
                                            <strong>1. Giao:</strong><br />
                                            <span>Trung tâm phục vụ hành chính công tỉnh</span>
                                        </div>
                                        <div style={{ marginTop: '10px', minHeight: '40px', }}>
                                            <strong>2.Nhận: </strong>

                                        </div>
                                    </td>
                                    <td colSpan={2} style={{ border: '1px solid #333', padding: '5px', }}>…giờ…phút, …</td>
                                    <td rowSpan={2}>
                                        <div>
                                            <strong>
                                                KT.GIÁM ĐỐC<br />
                                                PHÓ GIÁM ĐỐC
                                            </strong>
                                            <div style={{ display: 'block', height: '60px', width: '100px', }}></div>
                                            <strong>Nguyễn Văn Tuyên</strong>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid #333', padding: '5px', }}>
                                        <div style={{ display: 'block', minHeight: '60px', }}>
                                            <strong>Người giao</strong>
                                        </div>
                                    </td>
                                    <td style={{ border: '1px solid #333', padding: '5px', }}>
                                        <div style={{ display: 'block', minHeight: '60px', }}>
                                            <strong>Người nhận</strong>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div style={{ marginBottom: '8px', }}>
                            <strong>II. NHẬN KẾT QUẢ</strong>
                            <table
                                style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: '13px', }}>
                                <tr>
                                    <td style={{ border: '1px solid #333', padding: '5px', width: ' 25%', }}>
                                        <strong>TÊN CƠ QUAN</strong>
                                    </td>
                                    <td colSpan={2} style={{ border: '1px solid #333', padding: '5px', width: '50%', }}>
                                        <strong>THỜI GIAN GIAO, NHẬN</strong>
                                    </td>
                                    <td style={{ border: '1px solid #333', padding: '5px', width: '12.5%', }}>
                                        <strong>KẾT QUẢ XỬ LÝ</strong>
                                    </td>
                                    <td style={{ border: '1px solid #333', padding: '5px', width: '12.5%', }}>
                                        <strong>GHI CHÚ</strong>
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
                                            <span>Trung tâm phục vụ hành chính công tỉnh</span>
                                        </div>
                                    </td>
                                    <td colSpan={2} style={{ border: '1px solid #333', padding: '5px', }}>
                                        …giờ…phút, ngày … tháng … năm....
                                    </td>
                                    <td style={{ border: '1px solid #333', padding: '5px', }}>
                                        1
                                    </td>
                                    <td style={{ border: '1px solid #333', padding: '5px', }}>2</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid #333', padding: '5px', }}>
                                        <div style={{ display: 'block', minHeight: '60px', }}>
                                            <strong>Người giao</strong>
                                        </div>
                                    </td>
                                    <td style={{ border: '1px solid #333', padding: '5px', }}>
                                        <div style={{ display: 'block', minHeight: '60px', }}>
                                            <strong>Người nhận</strong>
                                        </div>
                                    </td>
                                    <td style={{ border: '1px solid #333', padding: '5px', }}>3</td>
                                    <td style={{ border: '1px solid #333', padding: '5px', }}>4</td>
                                </tr>
                            </table>
                        </div>
                        <div style={{ marginBottom: '8px', }}>
                            Giấy bàn giao hồ sơ này được lập thành 02 bản, mỗi bên giữ 01 bản có giá trị như nhau để làm cơ sở
                            thực hiện./.
                        </div>
                    </div >
                </div >
                :
                <div id="Content" style={{ width: '650px', margin: '0 auto', }}>
                    {/* <!-- Header --> */}
                    <div className="headerPhieu">
                        <table style={{ width: '100%', fontSize: 13.5 }}>
                            <tr>
                                <td style={{ width: '50%', textAlign: 'center', verticalAlign: 'text-top' }}>
                                    <strong>{hoSo?.groupName?.toLocaleUpperCase()}</strong><br />
                                    <strong><u>BỘ PHẬN TN & TKQ</u></strong>
                                </td>
                                <td style={{ width: '50%', textAlign: 'center', verticalAlign: 'text-top' }}>
                                    <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br />
                                    <strong><u>Độc lập - Tự do - Hạnh phúc</u></strong>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'left' }}>
                                    {/* <div style={{ display: 'none' }}>
                                        <canvas id="qrcodeCanvasThongTin"></canvas>
                                    </div>
                                    {srcQrCodeThongTin && <img src={srcQrCodeThongTin} alt="QRcode" />} */}
                                    <p style={{ textAlign: 'center' }}>Số:........../BPTNTKQ</p>
                                </td>
                                <td style={{ textAlign: 'center' }} ></td>
                            </tr>
                        </table>
                    </div>

                    {/* <!-- Title --> */}
                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', margin: '0', fontSize: '17px', marginTop: '15px' }}>
                        <strong>GIẤY BÀN GIAO HỒ SƠ</strong><br />
                    </div>
                    {/* <!-- Content --> */}
                    <div style={{ width: '90%', margin: 'auto', }}>
                        <div style={{ marginBottom: '8px', }}>
                            Mã hồ sơ: {hoSo?.maHoSo}
                        </div>
                        <div style={{ marginBottom: '8px', }}>
                            Cơ quan giải quyết hồ sơ: {hoSo?.groupName}
                        </div>
                        <div style={{ marginBottom: '8px', }}>
                            Cơ quan phối hợp giải quyết hồ sơ: ..................................................................................................
                        </div>


                        <div style={{ marginBottom: '8px', }}>
                            <table
                                style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: '13px', }}>
                                <tr>
                                    <td style={{ border: '1px solid #333', padding: '5px', width: '25%', }}>
                                        <strong>TÊN CƠ QUAN</strong>
                                    </td>
                                    <td colSpan={2} style={{ border: '1px solid #333', padding: '5px', width: '50%' }}>
                                        <strong>THỜI GIAN GIAO, NHẬN HỒ SƠ</strong>
                                    </td>
                                    <td style={{ border: '1px solid #333', padding: '5px', width: '25%', }}>
                                        <strong>KẾT QUẢ GIẢI QUYẾT HỒ SƠ<br />(Trước hạn/đúng hạn/quá hạn)</strong>
                                    </td>
                                    <td style={{ border: '1px solid #333', padding: '5px', width: '25%', }}>
                                        <strong>GHI CHÚ</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td rowSpan={2} style={{ border: '1px solid #333', padding: '5px', textAlign: 'left', }}>
                                        <div style={{ minHeight: '40px', }}>
                                            <strong>1. Giao:</strong><br />
                                            <span>{hoSo?.groupName}</span>
                                        </div>
                                        <div style={{ marginTop: '10px', minHeight: '40px', }}>
                                            <strong>2.Nhận: ..........</strong>

                                        </div>
                                    </td>
                                    <td colSpan={2} style={{ border: '1px solid #333', padding: '5px', }}>.....giờ.....phút, ngày.....tháng.....năm.....</td>
                                    <td rowSpan={2} style={{ border: '1px solid #333', padding: '5px', }}>

                                    </td>
                                    <td rowSpan={2} style={{ border: '1px solid #333', padding: '5px', }}>

                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid #333', padding: '5px', }}>
                                        <div style={{ display: 'block', minHeight: '60px', }}>
                                            <strong>Người giao</strong><br />
                                            <i>(Ký và ghi rõ họ tên)</i><br /><br /><br /><br />
                                            <b>{hoSo?.nguoiTiepNhan ? hoSo.nguoiTiepNhan.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase()) : ""}</b>
                                        </div>
                                    </td>
                                    <td style={{ border: '1px solid #333', padding: '5px', }}>
                                        <div style={{ display: 'block', minHeight: '60px', }}>
                                            <strong>Người nhận</strong><br />
                                            <i>(Ký và ghi rõ họ tên)</i><br /><br /><br /><br /><br />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td rowSpan={2} style={{ border: '1px solid #333', padding: '5px', textAlign: 'left', }}>
                                        <div style={{ minHeight: '40px', }}>
                                            <strong>1. Giao:</strong><br />
                                            <span>{hoSo?.groupName}</span>
                                        </div>
                                        <div style={{ marginTop: '10px', minHeight: '40px', }}>
                                            <strong>2.Nhận: ..........</strong>

                                        </div>
                                    </td>
                                    <td colSpan={2} style={{ border: '1px solid #333', padding: '5px', }}>.....giờ.....phút, ngày.....tháng.....năm.....</td>
                                    <td rowSpan={2} style={{ border: '1px solid #333', padding: '5px', }}>

                                    </td>
                                    <td rowSpan={2} style={{ border: '1px solid #333', padding: '5px', }}>

                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid #333', padding: '5px', }}>
                                        <div style={{ display: 'block', minHeight: '60px', }}>
                                            <strong>Người giao</strong><br />
                                            <i>(Ký và ghi rõ họ tên)</i><br /><br /><br /><br /><br />
                                        </div>
                                    </td>
                                    <td style={{ border: '1px solid #333', padding: '5px', }}>
                                        <div style={{ display: 'block', minHeight: '60px', }}>
                                            <strong>Người nhận</strong><br />
                                            <i>(Ký và ghi rõ họ tên)</i><br /><br /><br /><br /><br />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td rowSpan={2} style={{ border: '1px solid #333', padding: '5px', textAlign: 'left', }}>
                                        <div style={{ minHeight: '40px', }}>
                                            <strong>1. Giao: ..........</strong>
                                        </div>
                                        <div style={{ marginTop: '10px', minHeight: '40px', }}>
                                            <strong>2.Nhận: </strong><br />
                                            <span>{hoSo?.groupName}</span>

                                        </div>
                                    </td>
                                    <td colSpan={2} style={{ border: '1px solid #333', padding: '5px', }}>.....giờ.....phút, ngày.....tháng.....năm.....</td>
                                    <td rowSpan={2} style={{ border: '1px solid #333', padding: '5px', }}>

                                    </td>
                                    <td rowSpan={2} style={{ border: '1px solid #333', padding: '5px', }}>

                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid #333', padding: '5px', }}>
                                        <div style={{ display: 'block', minHeight: '60px', }}>
                                            <strong>Người giao</strong><br />
                                            <i>(Ký và ghi rõ họ tên)</i><br /><br /><br /><br /><br />
                                        </div>
                                    </td>
                                    <td style={{ border: '1px solid #333', padding: '5px', }}>
                                        <div style={{ display: 'block', minHeight: '60px', }}>
                                            <strong>Người nhận</strong><br />
                                            <i>(Ký và ghi rõ họ tên)</i><br /><br /><br /><br /><br />
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div style={{ marginBottom: '8px', }}>
                            <b>Ghi chú:</b><br />
                            <p>Trường hợp hồ sơ được chuyển qua địch vụ bưu chính công ích theo Quyết định số 45/2016/QĐ-TTg thì thời gian giao, nhận hồ sơ và việc ký nhận thể hiện trong hóa đơn của cơ quan Bưu chính;</p>
                            <p>Kết quả giải quyết hồ sơ do bên nhập thông tin/ ghi khi nhận bàn giao hồ sơ.</p>
                            <p>
                                Trường hợp Hệ thống thông tin một cửa điện tử chưa vận hành, người giao và người nhận phải ký và ghi rõ họ tên. Khi Hệ thống thông tin một cửa điện tử đã vận hành, việc lưu vết được thực hiện tự động và thể hiện trên mẫu phiếu điện tử.
                            </p>
                        </div>
                    </div >
                </div >
            }

        </div >
    </>
}