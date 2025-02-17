import { DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, MONTH, PDF_TEN_TINH, PDF_TEN_TRUNG_TAM, YEAR } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { hoSoApi } from "@/features/hoso/services"
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'

export const PhieuThuLePhi = () => {
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
                <div id="page1">
                    <div >
                        <div style={{ display: 'flex', }}>
                            <div style={{ flex: 1, textAlign: 'left', }}>
                                <strong>Đơn vị thu:</strong><br />
                                <strong>Mã số thuế:</strong>
                            </div>

                            <div style={{ flex: 3, textAlign: 'center', fontWeight: 600, }}>
                                <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br />
                                <strong>Độc lập - Tự do - Hạnh phúc</strong>
                                <hr
                                    style={{ height: '1px', width: '160px', margin: '0 auto', color: 'black', backgroundColor: 'black', border: 'none', }} />
                            </div>

                            <div style={{ flex: 1, textAlign: 'left', }}>
                                <span>Mẫu số: 01BLP2-001</span><br />
                                <span>Ký hiệu: 28AA-17T</span><br />
                                <span>Số: </span>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Title --> */}
                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', margin: '', }}>
                        <strong>BIÊN LAI THU TIỀN PHÍ, LỆ PHÍ</strong>
                        <span>Tên loại Phí, lệ phí: </span>
                        <span>(Liên 1: Lưu tại cơ quan thu)</span>
                    </div>
                    {/* <!-- Content --> */}
                    <div style={{ width: '90%', margin: 'auto', }}>
                        <div style={{ marginBottom: '8px', }}>
                            Tên đơn vị hoặc người nộp tiền: ...
                        </div>
                        <div style={{ marginBottom: '8px', }}>
                            Địa chỉ: ...
                        </div>
                        <div style={{ marginBottom: '8px', }}>
                            Số tiền: ...
                        </div>
                        <div style={{ marginBottom: '8px', }}>
                            (Viết bằng chữ): ...
                        </div>
                        <div style={{ marginBottom: '8px', }}>
                            Hình thức thanh toán: ...
                        </div>
                        <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'right' }}>
                            <div style={{ width: '300px', display: 'flex', flexDirection: 'column', textAlign: 'center', }}>
                                <i>Thanh Hóa, <span >ngày {DATE} tháng {MONTH} năm {YEAR}</span></i>
                                <strong>Người thu tiền</strong>
                                <span>(Ký rõ họ tên)</span>
                                <div style={{ width: '100px', height: '60px', margin: '10px auto', }}></div>
                                <strong>Tên</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <hr style={{ height: '1.5px', width: '100%', margin: '0 auto', color: 'black', backgroundColor: 'black', border: 'none', marginBottom: '40px', marginTop: '40px' }} />

                <div id="page2" >
                    {/* <!-- Header --> */}
                    <div >
                        <div style={{ display: 'flex', }}>
                            <div style={{ flex: 1, textAlign: 'left', }}>
                                <strong>Đơn vị thu:</strong><br />
                                <strong>Mã số thuế:</strong>
                            </div>

                            <div style={{ flex: 3, textAlign: 'center', fontWeight: 600, }}>
                                <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br />
                                <strong>Độc lập - Tự do - Hạnh phúc</strong>
                                <hr
                                    style={{ height: '1px', width: '160px', margin: '0 auto', color: 'black', backgroundColor: 'black', border: 'none', }} />
                            </div>

                            <div style={{ flex: 1, textAlign: 'left', }}>
                                <span>Mẫu số: 01BLP2-001</span><br />
                                <span>Ký hiệu: 28AA-17T</span><br />
                                <span>Số: </span>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Title --> */}
                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', margin: '', }}>
                        <strong>BIÊN LAI THU TIỀN PHÍ, LỆ PHÍ</strong>
                        <span>Tên loại Phí, lệ phí: </span>
                        <span>(Liên 2: giao cho người nộp phí, lệ phí)</span>
                    </div>
                    {/* <!-- Content --> */}
                    <div style={{ width: '90%', margin: 'auto', }}>
                        <div style={{ marginBottom: '8px', }}>
                            Tên đơn vị hoặc người nộp tiền: ...
                        </div>
                        <div style={{ marginBottom: '8px', }}>
                            Địa chỉ: ...
                        </div>
                        <div style={{ marginBottom: '8px', }}>
                            Số tiền: ...
                        </div>
                        <div style={{ marginBottom: '8px', }}>
                            (Viết bằng chữ): ...
                        </div>
                        <div style={{ marginBottom: '8px', }}>
                            Hình thức thanh toán: ...
                        </div>
                        <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'right' }}>
                            <div style={{ width: '300px', display: 'flex', flexDirection: 'column', textAlign: 'center', }}>
                                <i>Thanh Hóa, <span >ngày {DATE} tháng {MONTH} năm {YEAR}</span></i>
                                <strong>Người thu tiền</strong>
                                <span>(Ký rõ họ tên)</span>
                                <div style={{ width: '100px', height: '60px', margin: '10px auto', }}></div>
                                <strong>Tên</strong>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </>
}