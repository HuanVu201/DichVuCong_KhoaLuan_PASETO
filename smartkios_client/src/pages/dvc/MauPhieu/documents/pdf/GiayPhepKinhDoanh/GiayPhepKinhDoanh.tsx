import { DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'

export const GiayPhepKinhDoanh = () => {
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
                            <strong>PHÒNG TÀI CHÍNH<br />KẾ HOẠCH
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

                        </div>
                        <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', }}>
                            <i>Thanh Hóa, <span >ngày {DATE} tháng {MONTH} năm {YEAR}</span></i>

                        </div>
                    </div>
                </div>

                {/* <!-- Title --> */}
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', margin: '20px 0 10px 0', }}>
                    <strong>GIẤY CHỨNG NHẬN ĐĂNG KÝ HỘ KINH DOANH</strong>
                    <strong>Mã hồ sơ: … </strong>
                    <i>Đăng ký lần đầu … </i>
                </div>
                {/* <!-- Content --> */}
                <div style={{ width: '90%', margin: 'auto', }}>
                    <div style={{ marginBottom: '8px', }}>
                        1. Tên hộ kinh doanh:
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        <div>2. Địa điểm kinh doanh:</div>
                        <div style={{ display: 'flex', }}>
                            <div style={{ flex: 1, }}>
                                Điện thoại: …
                            </div>
                            <div style={{ flex: 1, }}>
                                Fax: …
                            </div>
                        </div>
                        <div style={{ display: 'flex', }}>
                            <div style={{ flex: 1, }}>
                                Email: …
                            </div>
                            <div style={{ flex: 1, }}>
                                Website: …
                            </div>
                        </div>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        3. Ngành nghề kinh doanh:
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        4. Vốn kinh doanh:
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        <div>5. Họ và tên cá nhân, hoặc tên đại diện hộ gia đình:</div>
                        <div style={{ display: 'flex', }}>
                            <div style={{ flex: 2 }}>
                                Họ tên
                            </div>
                            <div style={{ flex: 1 }}>
                                Giới tính:
                            </div>
                        </div>
                        <div style={{ display: 'flex', }}>
                            <div style={{ flex: 1 }}>
                                Sinh ngày:
                            </div>
                            <div style={{ flex: 1 }}>
                                Dân tộc:
                            </div>
                            <div style={{ flex: 1 }}>
                                Quốc tịch:
                            </div>
                        </div>
                        <div>CMND số: </div>
                        <div style={{ display: 'flex', }}>
                            <div style={{ flex: 1 }}>
                                Ngày cấp:
                            </div>
                            <div style={{ flex: 2 }}>
                                Cơ quan cấp:
                            </div>
                        </div>
                    </div>
                    <div style={{ marginBottom: '8px', }}>
                        <div>6. Nơi đăng ký hộ khẩu thường trú:</div>
                        <div>Nơi đăng kí thường trú</div>
                        <div>Chỗ ở hiện tại: </div>
                        <div>Chỗ ở hiện tại</div>
                        <div>Mã số thuế cá nhân: … </div>
                        <div>Chữ ký của cá nhân hoặc đại diện hộ gia đình: ………………………………..</div>
                    </div>

                </div>
            </div>


            <div id="pointBreakPage"></div>
            <div id="signature" style={{ width: '650px', height: '160px', margin: '0 auto', padding: '0 30px' }}>
                <div style={{ display: 'flex', textAlign: 'center', marginTop: '20px', }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'left', }}>
                        <strong style={{ width: '200px', }}><u>Ghi chú:</u> Hộ chỉ được phép kinh doanh khi có đủ điều kiện kinh
                            doanh</strong>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', }}>
                        <strong>TRƯỞNG PHÒNG</strong>
                        <div style={{ width: '100px', height: '60px', margin: '10px auto', }}></div>

                    </div>
                </div>
            </div>
        </div>

    </>
}