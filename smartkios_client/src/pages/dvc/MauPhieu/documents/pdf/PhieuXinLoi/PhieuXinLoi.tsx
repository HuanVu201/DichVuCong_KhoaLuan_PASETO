import { DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'

export const PhieuXinLoi = () => {
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
                            <strong>VĂN PHÒNG UBND TỈNH THANH HÓA </strong><br />
                            <strong>TRUNG TÂM PHỤC VỤ HÀNH CHÍNH CÔNG</strong>
                            <hr
                                style={{ height: '1px', width: '110px', margin: '0 auto', color: 'black', backgroundColor: 'black', border: 'none', }} />
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
                            <span>Số: <span id="MaHoSo"></span>/HCC-HCTH</span>
                            <span style={{ width: '250px', margin: 'auto', }}>Về việc xin lỗi đối với hồ sơ giải quyết quá hạn và
                                hẹn lại thời gian trả kết quả</span>
                        </div>
                        <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', }}>
                            <i>Thanh Hóa, <span >ngày {DATE} tháng {MONTH} năm {YEAR}</span></i>

                        </div>
                    </div>
                </div>

                {/* <!-- Title --> */}
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', margin: '20px 0 10px 0', }}>

                    <span>Kính gửi: Ông/Bà {hoSo?.fullName || hoSo?.chuHoSo} </span>
                </div>
                {/* <!-- Content --> */}
                <div style={{ width: '90%', margin: 'auto', }}>
                    <div>
                        <span style={{ display: 'block', marginBottom: '8px', }}>Trung tâm Phục vụ hành chính công tỉnh Thanh Hóa
                            (Trung tâm) đã tiếp nhận hồ sơ của Ông/Bà vào
                            <span > {hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format("HH:mm:ss") + " ngày " : ""}</span>
                            <span >{hoSo?.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span>, 
                            về việc đề nghị giải quyết …, mã hồ sơ: {hoSo?.maHoSo}. Thời gian hẹn trả kết quả là 
                            <span > {hoSo?.ngayHenTra ? dayjs(hoSo.ngayHenTra).format("HH:mm:ss") + " ngày " : ""}</span>
                            <span >{hoSo?.ngayHenTra ? dayjs(hoSo.ngayHenTra).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span>.
                        </span>
                        <span style={{ display: 'block', marginBottom: '8px', }}>
                            Tuy nhiên, do đơn vị chủ trì giải quyết hồ sơ là … chưa có kết quả chuyển cho Trung tâm đúng
                            thời gian quy định. Trung tâm chân thành xin lỗi vì sự quá hạn nói trên. Rất mong nhận được sự
                            thông cảm của Ông/Bà.
                        </span>
                        <span style={{ display: 'block', marginBottom: '8px', }}>
                            Hồ sơ của Ông/Bà được trả kết quả vào …, … tại Trung tâm Phục vụ hành chính công tỉnh Thanh Hóa.
                        </span>
                        <span style={{ display: 'block', marginBottom: '8px', }}>Trân trọng./.</span>
                    </div>

                </div>
            </div>

            <div id="pointBreakPage"></div>
            <div id="signature" style={{ width: '650px', height: '160px', margin: '0 auto', padding: '0 35px' }}>
                <div style={{ display: 'flex', marginTop: '10px', }}>
                    <div style={{ fontSize: '10px', flex: 1, display: 'flex', flexDirection: 'column', }}>
                        <strong><i>Nơi nhận:</i></strong>
                        <span>- Như trên</span>
                        <span>- VP UBND tỉnh (để b/c),</span>
                        <span>- Lưu: VT, HCTH.</span>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center', }}>
                        <strong style={{ fontSize: '12px', }}>GIÁM ĐỐC</strong>
                        <div style={{ width: '100px', height: '60px', margin: '10px auto', }} ></div>
                        {/* <img id="chuKy" style={{ width: 100%, object-fit: cover, margin: auto,}}> */}
                        <strong id="NguoiTiepNhan" >Nguyễn Đức Trung</strong>
                    </div>
                </div>
            </div>
        </div>
        {/* </div > */}
    </>
}