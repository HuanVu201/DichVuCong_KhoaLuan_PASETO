import { useEffect, useState } from "react";
import { useThongKePortalContext } from "../../context/ThongKePortalContext"
import { IThongKeChiTieuSoHoaResponse } from "../../models/ThongKe766Response";
import { useAppDispatch } from "@/lib/redux/Hooks";
import { SearchChiTieuSoHoaPortal } from "../../redux/action";

export const ThongKeChiTieuSoHoa = () => {
    const thongKePortalContext = useThongKePortalContext()
    const dispatch = useAppDispatch();
    const [dataThongKe, setDataThongKe] = useState<IThongKeChiTieuSoHoaResponse>({
        data: [],
    });
    let indexSo = 0
    let indexVPDK = 0
    let indexHuyen = 0
    let indexAnyType = 0

    const now = new Date();
    var ngayNow = String(now.getDate()).padStart(2, '0');
    var thangNow = String(now.getMonth() + 1).padStart(2, '0');
    var namNow = now.getFullYear();
    const tuNgay = `${now.getFullYear()}-01-01`;
    const denNgay = `${namNow}-${thangNow}-${ngayNow}`;

    useEffect(() => {
        (async () => {
            const res = await dispatch(SearchChiTieuSoHoaPortal({
                tuNgay: tuNgay,
                denNgay: denNgay,
                maDinhDanhCha: ''
            })).unwrap();
            if (res)
                setDataThongKe(res)
        })();
    }, []);



    return (
        <>
            <div className="titleThongKe">
                <center><strong>
                    THEO DÕI MỨC ĐỘ SỐ HÓA CÁC ĐƠN VỊ - THEO QUYẾT ĐỊNH SỐ 766/QĐ-TTg NGÀY 23/06/2022
                </strong></center>
            </div>
            <div id="ContainerSwapper" style={{ fontSize: "13px", fontFamily: "'Times New Roman', Times, serif" }}>
                <table
                    id="table" style={{ verticalAlign: "middle", borderCollapse: "collapse", width: "100%", textAlign: "center", fontFamily: "'Times New Roman', Times, serif", }}>
                    <thead id="headerTable">
                        <tr>
                            <td className='tdHeader' rowSpan={3} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>STT</strong>
                            </td>
                            <td className='tdHeader' rowSpan={3} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Đơn vị</strong>
                            </td>
                            <td className='tdHeader' rowSpan={3} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Tiếp nhận</strong>
                            </td>
                            <td className='tdHeader' colSpan={4} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Số hóa hồ sơ TTHC khi tiếp nhận</strong>
                            </td>
                            <td className='tdHeader' rowSpan={3} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Đã giải quyết</strong>
                            </td>
                            <td className='tdHeader' colSpan={2} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Số hóa kết quả giải quyết</strong>
                            </td>

                        </tr>
                        <tr>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Chưa số hóa TPHS</strong>
                            </td>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Có số hóa TPHS</strong>
                            </td>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Có tái sử dụng thành phần</strong>
                            </td>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Có tái sử dụng thành phần từ cổng DVC quốc gia</strong>
                            </td>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Chưa số hóa</strong>
                            </td>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Đã số hóa</strong>
                            </td>

                        </tr>
                    </thead>

                    <tbody>
                        {thongKePortalContext.catalogSearchPortal == '' ?
                            <>
                                {/* Sở ban ngành */}
                                <tr className="rowPhanCap">
                                    <td colSpan={1} style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5" }}>I</td>
                                    <td colSpan={9}
                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", textAlign: 'left' }}>
                                        Sở, ban, ngành
                                    </td>
                                </tr>
                                {dataThongKe.data.map((item) => {
                                    if (item.catalog == 'so-ban-nganh') {
                                        indexSo++
                                        return (<>
                                            <tr className={indexSo % 2 ? "rowChan" : "rowLe"}>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {indexSo}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", textAlign: 'left' }}>
                                                    {item.tenThongKe}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tiepNhan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.chuaSoHoaTPHS}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.coSoHoaTPHS}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.coTaiSuDungTPHS}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.coTaiSuDungTPHSTuDvcQg}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.daGiaiQuyet}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.daGiaiQuyetChuaSoHoa}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.daGiaiQuyetDaSoHoa}
                                                </td>
                                            </tr>
                                        </>)
                                    }
                                })}
                                {/* Văn Phòng đăng kí đất đai */}
                                <tr className="rowPhanCap">
                                    <td colSpan={1} style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5" }}>II</td>
                                    <td colSpan={9}
                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", textAlign: 'left' }}>
                                        Văn phòng đăng ký đất đai
                                    </td>
                                </tr>
                                {dataThongKe.data.map((item) => {
                                    if (item.catalog == 'cnvpdk') {
                                        indexVPDK++
                                        return (<>
                                            <tr className={indexVPDK % 2 ? "rowChan" : "rowLe"}>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {indexVPDK}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", textAlign: 'left' }}>
                                                    {item.tenThongKe}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tiepNhan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.chuaSoHoaTPHS}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.coSoHoaTPHS}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.coTaiSuDungTPHS}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.coTaiSuDungTPHSTuDvcQg}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.daGiaiQuyet}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.daGiaiQuyetChuaSoHoa}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.daGiaiQuyetDaSoHoa}
                                                </td>
                                            </tr>
                                        </>)
                                    }
                                })}
                                {/* Quận huyện */}
                                <tr className="rowPhanCap">
                                    <td colSpan={1} style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5" }}>III</td>
                                    <td colSpan={9}
                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", textAlign: 'left' }}>
                                        Cấp huyện
                                    </td>
                                </tr>
                                {dataThongKe.data.map((item) => {
                                    if (item.catalog == 'quan-huyen') {
                                        indexHuyen++
                                        return (<>
                                            <tr className={indexHuyen % 2 ? "rowChan" : "rowLe"}>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {indexHuyen + 1}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", textAlign: 'left' }}>
                                                    {item.tenThongKe}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tiepNhan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.chuaSoHoaTPHS}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.coSoHoaTPHS}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.coTaiSuDungTPHS}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.coTaiSuDungTPHSTuDvcQg}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.daGiaiQuyet}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.daGiaiQuyetChuaSoHoa}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.daGiaiQuyetDaSoHoa}
                                                </td>
                                            </tr>
                                        </>)
                                    }
                                })}

                            </>
                            :
                            // Bất kì
                            <>
                                {dataThongKe.data
                                    .filter(x => x.catalog == thongKePortalContext.catalogSearchPortal &&
                                        thongKePortalContext.catalogSearchPortal == 'xa-phuong' ?
                                        (thongKePortalContext.thongKeXaPhuong?.catalog == 'quan-huyen' ? x.maThongKeCha : x.maThongKe)
                                        == thongKePortalContext.thongKeXaPhuong?.groupCode : true
                                    ).map((item: any, index: number) => {
                                        if (item.catalog == thongKePortalContext.catalogSearchPortal) {
                                            indexAnyType++
                                            return (<>
                                                <tr className={index % 2 ? "rowChan" : "rowLe"}>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {indexAnyType}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", textAlign: 'left' }}>
                                                        {item.tenThongKe}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.tiepNhan}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.chuaSoHoaTPHS}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.coSoHoaTPHS}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.coTaiSuDungTPHS}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.coTaiSuDungTPHSTuDvcQg}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.daGiaiQuyet}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.daGiaiQuyetChuaSoHoa}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.daGiaiQuyetDaSoHoa}
                                                    </td>
                                                </tr>
                                            </>)
                                        }
                                    })}
                            </>

                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}