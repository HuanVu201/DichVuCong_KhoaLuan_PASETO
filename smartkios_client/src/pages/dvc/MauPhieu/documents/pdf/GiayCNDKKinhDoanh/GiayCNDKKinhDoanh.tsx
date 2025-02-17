import { DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'

export const GiayCNDKKinhDoanh = () => {
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
                    <div style={{ display: 'flex', }}>
                        <div style={{ flex: 1, textAlign: 'center', }}>
                            <span>UBND...</span><br />
                            <strong>PHÒNG TÀI CHÍNH – KẾ HOẠCH</strong>
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
                </div>

                {/* <!-- Title --> */}
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', margin: '20px 0 10px 0', }}>
                    <strong>GIẤY CHỨNG NHẬN ĐĂNG KÝ<br />HỘ KINH DOANH</strong>
                    <strong>Số: ... </strong>
                    <i>Đăng ký lần đầu ...</i>
                </div>
                {/* <!-- Content --> */}
                <div style={{ margin: 'auto', }}>
                    <div style={{ marginBottom: '8px', }}>
                        1. Tên hộ kinh doanh (ghi bằng chữ in hoa): ...
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        <div>
                            2. Địa điểm kinh doanh: <span>...</span>, <span>...</span>, thành phố <span>...</span>
                        </div>
                        <div style={{ display: 'flex', }}>
                            <div style={{ flex: 1 }}>
                                Điện thoại: ...
                            </div>
                            <div style={{ flex: 1 }}>
                                Fax: ...
                            </div >

                        </div >
                        <div style={{ display: 'flex', }} >
                            <div style={{ flex: 1 }} >
                                Email: ...
                            </div >
                            <div style={{ flex: 1 }} >
                                Website: ...
                            </div >

                        </div >
                    </div >
                    <div style={{ marginBottom: '8px', }} >
                        3. Ngành, nghề kinh doanh: ...
                    </div >
                    <div style={{ marginBottom: '8px', }} >
                        <div>4. Vốn kinh doanh: <span>...</span> (<span>...</span>) </div>
                    </div >
                    <div style={{ marginBottom: '8px', }} >
                        <div>5. Họ và tên đại diện hộ gia đình (ghi bằng chữ in hoa): <span>...</span></div>
                        <div style={{ display: 'flex', }} >
                            <div style={{ flex: 1, }} >
                                Giới tính: ...
                            </div >
                            <div style={{ flex: 1, }} >
                                Sinh ngày: ...
                            </div >
                        </div >
                        <div style={{ display: 'flex', }} >
                            <div style={{ flex: 1, }} >
                                Dân tộc: ...
                            </div >
                            <div style={{ flex: 1, }} >
                                Quốc tịch: Việt Nam
                            </div >
                        </div >
                        <div>Loại giấy tờ chứng thực cá nhân: Chứng minh nhân dân</div>
                        <div>Số giấy chứng thực cá nhân: ... </div>
                        <div style={{ display: 'flex', }} >
                            <div style={{ flex: 1, }} >
                                Ngày cấp: <span>...</span>
                            </div >
                            <div style={{ flex: 1, }} >
                                Nơi cấp: <span>...</span>
                            </div >
                        </div >
                        <div>Nơi đăng ký hộ khẩu thường trú: ... </div>
                        <div>Chỗ ở hiện tại: ... </div>
                    </div >
                    <div style={{ marginBottom: '8px', }} >
                        <div>6. Danh sách cá nhân góp vốn thành lập hộ kinh doanh (nếu có)</div>
                        <table
                            style={{ border: '1px solid #000', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: '13px', }} >
                            <tr>
                                <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }}>
                                    STT
                                </td>
                                <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }} >
                                    Tên thành viên
                                </td >
                                <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }} >
                                    Nơi đăng ký hộ khẩu thường trú
                                </td >
                                <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }} >
                                    Giá trị phần vốn góp(VNĐ)
                                </td >
                                <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }} >
                                    Tỷ lệ(%)
                                </td >
                                <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }} >
                                    Số giấy Chứng minh nhân dân(hoặc chứng thực cá nhân hợp pháp khác)
                                </td >
                                <td style={{ padding: '5px', border: '1px solid #333', fontWeight: 600, }} >
                                    Ghi chú
                                </td >
                            </tr >
                            <tr>
                                <td style={{ border: '1px solid #333', padding: '5px', }}>

                                </td>
                                <td style={{ border: '1px solid #333', padding: '5px', }} >

                                </td >
                                <td style={{ border: '1px solid #333', padding: '5px', }} >

                                </td >
                                <td style={{ border: '1px solid #333', padding: '5px', }} >

                                </td >
                                <td style={{ border: '1px solid #333', padding: '5px', }} >

                                </td >
                                <td style={{ border: '1px solid #333', padding: '5px', }} >

                                </td >
                                <td style={{ border: '1px solid #333', padding: '5px', }} >

                                </td >
                            </tr >
                        </table >

                    </div >

                </div >
            </div >

            <div id="pointBreakPage"></div>
            <div id="signature" style={{width: '650px', height: '160px', margin: '0 auto',}} >
            <div style={{display: 'flex', textAlign: 'center', marginTop: '20px',}} >
            <div style={{flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'left',}} >
        </div >
        <div style={{flex: 1, display: 'flex', flexDirection: 'column',}} >
        <strong>TRƯỞNG PHÒNG</strong>
        <div style={{width: '100px', height: '60px', margin: '10px auto',}} ></div >

                </div >
            </div >
        </div >
    </div >
    </>
}