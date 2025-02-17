import { useEffect, useState } from "react";
import { useThongKePortalContext } from "../../context/ThongKePortalContext"
import { IThongKeChiTieuDVCResponse } from "../../models/ThongKe766Response";
import { useAppDispatch } from "@/lib/redux/Hooks";
import { SearchChiTieuDVCTrucTuyenPortal } from "../../redux/action";

export const ThongKeChiTieuDVC = () => {
    const thongKePortalContext = useThongKePortalContext();
    const dispatch = useAppDispatch();
    const [dataThongKe, setDataThongKe] = useState<IThongKeChiTieuDVCResponse>({
        data: [],
    });
    let indexSo = 0
    let indexVPDK = 0
    let indexHuyen = 0
    let indexAnyType=0

    const now = new Date();
    var ngayNow = String(now.getDate()).padStart(2, '0');
    var thangNow = String(now.getMonth() + 1).padStart(2, '0');
    var namNow = now.getFullYear();
    const tuNgay = `${now.getFullYear()}-01-01`;
    const denNgay = `${namNow}-${thangNow}-${ngayNow}`;

    useEffect(() => {
        (async () => {
            const res = await dispatch(SearchChiTieuDVCTrucTuyenPortal({
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
                    THEO DÕI CHỈ TIÊU DVC TRỰC TUYẾN CÁC ĐƠN VỊ - THEO QUYẾT ĐỊNH SỐ 766/QĐ-TTG NGÀY 23/06/2022
                </strong></center>
            </div>
            <div id="ContainerSwapper" style={{ fontSize: "13px", fontFamily: "'Times New Roman', Times, serif" }}>
                <table id="table" style={{ verticalAlign: 'middle', borderCollapse: 'collapse', width: '100%', textAlign: 'center', fontSize: '13px', fontFamily: "'Times New Roman', Times, serif" }}>
                    <thead id="headerTable">
                        <tr>
                            <td className='tdHeader' rowSpan={3} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>STT</strong>
                            </td>
                            <td className='tdHeader' rowSpan={3} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Đơn vị</strong>
                            </td>
                            <td className='tdHeader' rowSpan={1} colSpan={4} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Cung cấp DVC trực tuyến</strong>
                            </td>
                            <td className='tdHeader' rowSpan={1} colSpan={14} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Phát sinh hồ sơ</strong>
                            </td>
                        </tr>
                        <tr>
                            <td className='tdHeader' rowSpan={2} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Tổng số thủ tục</strong>
                            </td>
                            <td className='tdHeader' colSpan={3} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>DVC trực tuyến</strong>
                            </td>
                            <td className='tdHeader' colSpan={5} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Tổng</strong>
                            </td>
                            <td className='tdHeader' colSpan={3} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Toàn trình</strong>
                            </td>
                            <td className='tdHeader' colSpan={3} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Một phần</strong>
                            </td>
                            <td className='tdHeader' colSpan={3} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Dịch vụ công</strong>
                            </td>
                        </tr>
                        <tr>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Tổng số</strong>
                            </td>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Toàn trình</strong>
                            </td>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Một phần</strong>
                            </td>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Số thủ tục phát sinh hồ sơ</strong>
                            </td>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Số hồ sơ phát sinh cả trực tuyến và trực tiếp</strong>
                            </td>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Số thủ tục trực tuyến phát sinh hồ sơ</strong>
                            </td>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Số hồ sơ phát sinh cả trực tuyến và trực tiếp trong các thủ tục trực tuyến</strong>
                            </td>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Số hồ sơ phát sinh trực tuyến</strong>
                            </td>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Số thủ tục</strong>
                            </td>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Số hồ sơ phát sinh cả trực tuyến và trực tiếp</strong>
                            </td>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Số hồ sơ phát sinh trực tuyến</strong>
                            </td>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Số thủ tục</strong>
                            </td>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Số hồ sơ phát sinh cả trực tuyến và trực tiếp</strong>
                            </td>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Số hồ sơ phát sinh trực tuyến</strong>
                            </td>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Số thủ tục</strong>
                            </td>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Số thủ tục phát sinh hồ sơ</strong>
                            </td>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Số hồ sơ phát sinh</strong>
                            </td>
                        </tr>
                    </thead>

                    <tbody>
                        {thongKePortalContext.catalogSearchPortal == '' ?
                            <>
                                {/* Sở ban ngành */}
                                <tr className="rowPhanCap">
                                    <td colSpan={1} style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5" }}>I</td>
                                    <td colSpan={19}
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
                                                    {item.tongSoThuTuc}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucDvcTrucTuyen}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucDvcTrucTuyenToanTrinh}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucDvcTrucTuyenMotPhan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucPhatSinhHoSo}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tongHoSoPhatSinh}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucTrucTuyenPhatSinhHoSo}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.hoSoPhatSinhTrongThuTucTrucTuyen}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.hoSoPhatSinhTrucTuyenTrongThuTucTrucTuyen}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucToanTrinh}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.hoSoPhatSinhTrongThuTucToanTrinh}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.hoSoPhatSinhTrucTuyenTrongThuTucToanTrinh}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucMotPhan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.hoSoPhatSinhTrongThuTucMotPhan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.hoSoPhatSinhTrucTuyenTrongThuTucMotPhan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucDvc}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucDvcPhatSinhHoSo}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.hoSoPhatSinhTrongThuTucDvc}
                                                </td>
                                            </tr>
                                        </>)
                                    }
                                })}
                                {/* Văn Phòng đăng kí đất đai */}
                                <tr className="rowPhanCap">
                                    <td colSpan={1} style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5" }}>II</td>
                                    <td colSpan={19}
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
                                                    {item.tongSoThuTuc}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucDvcTrucTuyen}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucDvcTrucTuyenToanTrinh}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucDvcTrucTuyenMotPhan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucPhatSinhHoSo}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tongHoSoPhatSinh}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucTrucTuyenPhatSinhHoSo}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.hoSoPhatSinhTrongThuTucTrucTuyen}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.hoSoPhatSinhTrucTuyenTrongThuTucTrucTuyen}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucToanTrinh}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.hoSoPhatSinhTrongThuTucToanTrinh}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.hoSoPhatSinhTrucTuyenTrongThuTucToanTrinh}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucMotPhan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.hoSoPhatSinhTrongThuTucMotPhan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.hoSoPhatSinhTrucTuyenTrongThuTucMotPhan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucDvc}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucDvcPhatSinhHoSo}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.hoSoPhatSinhTrongThuTucDvc}
                                                </td>
                                            </tr>
                                        </>)
                                    }
                                })}
                                {/* Quận huyện */}
                                <tr className="rowPhanCap">
                                    <td colSpan={1} style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5" }}>III</td>
                                    <td colSpan={19}
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
                                                    {indexHuyen}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", textAlign: 'left' }}>
                                                    {item.tenThongKe}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tongSoThuTuc}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucDvcTrucTuyen}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucDvcTrucTuyenToanTrinh}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucDvcTrucTuyenMotPhan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucPhatSinhHoSo}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tongHoSoPhatSinh}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucTrucTuyenPhatSinhHoSo}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.hoSoPhatSinhTrongThuTucTrucTuyen}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.hoSoPhatSinhTrucTuyenTrongThuTucTrucTuyen}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucToanTrinh}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.hoSoPhatSinhTrongThuTucToanTrinh}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.hoSoPhatSinhTrucTuyenTrongThuTucToanTrinh}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucMotPhan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.hoSoPhatSinhTrongThuTucMotPhan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.hoSoPhatSinhTrucTuyenTrongThuTucMotPhan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucDvc}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.thuTucDvcPhatSinhHoSo}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.hoSoPhatSinhTrongThuTucDvc}
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
                                                        {item.tongSoThuTuc}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.thuTucDvcTrucTuyen}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.thuTucDvcTrucTuyenToanTrinh}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.thuTucDvcTrucTuyenMotPhan}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.thuTucPhatSinhHoSo}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.tongHoSoPhatSinh}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.thuTucTrucTuyenPhatSinhHoSo}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.hoSoPhatSinhTrongThuTucTrucTuyen}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.hoSoPhatSinhTrucTuyenTrongThuTucTrucTuyen}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.thuTucToanTrinh}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.hoSoPhatSinhTrongThuTucToanTrinh}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.hoSoPhatSinhTrucTuyenTrongThuTucToanTrinh}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.thuTucMotPhan}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.hoSoPhatSinhTrongThuTucMotPhan}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.hoSoPhatSinhTrucTuyenTrongThuTucMotPhan}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.thuTucDvc}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.thuTucDvcPhatSinhHoSo}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.hoSoPhatSinhTrongThuTucDvc}
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