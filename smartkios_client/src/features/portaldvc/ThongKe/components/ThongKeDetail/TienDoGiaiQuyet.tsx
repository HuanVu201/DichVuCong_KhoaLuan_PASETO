import { useEffect, useState } from "react";
import { useThongKePortalContext } from "../../context/ThongKePortalContext"
import { IThongKeTienDoGiaiQuyetResponse } from "../../models/ThongKe766Response";
import { AntdSpace } from "@/lib/antd/components";
import { useAppDispatch } from "@/lib/redux/Hooks";
import { SearchTienDoGiaiQuyetPortal } from "../../redux/action";
import { constrainedMemory } from "process";
// import MapThongKe from "../ThongKeMap/MapThongKe";

export const ThongKeTienDoGiaiQuyet = () => {
    const thongKePortalContext = useThongKePortalContext()
    const dispatch = useAppDispatch();
    const [dataThongKe, setDataThongKe] = useState<IThongKeTienDoGiaiQuyetResponse>({
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
            const res = await dispatch(SearchTienDoGiaiQuyetPortal({
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
            {/* <MapThongKe/> */}
            <div className="titleThongKe">
                <center><strong>
                    THEO DÕI CHỈ TIÊU TIẾN ĐỘ GIẢI QUYẾT CÁC ĐƠN VỊ - THEO QUYẾT ĐỊNH SỐ 766/QĐ-TTG NGÀY 23/06/2022
                </strong></center>
            </div>
            <div id="ContainerSwapper" style={{ fontSize: "13px", fontFamily: "'Times New Roman', Times, serif", cursor: 'default' }}>
                <table id="table" style={{
                    verticalAlign: "middle", borderCollapse: "collapse", width: "100%", textAlign: "center", fontSize: "13px", fontFamily: "'Times New Roman', Times, serif"
                }}
                >
                    <thead id="headerTable">
                        <tr>
                            <td className='tdHeader' rowSpan={3} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>STT</strong>
                            </td>
                            <td className='tdHeader' rowSpan={3} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Đơn vị</strong>
                            </td>
                            <td className='tdHeader' colSpan={6} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Tiếp nhận</strong>
                            </td>
                            <td className='tdHeader' colSpan={4} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Đã xử lý<br />(Đã xử lý xong + Đã trả kết quả + Rút)</strong>
                            </td>
                            <td className='tdHeader' colSpan={3} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Đang xử lý</strong>
                            </td>
                            <td className='tdHeader' colSpan={3} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Tạm dừng xử lý <br />(Yêu cầu bổ sung, Yêu cầu thực hiện nghĩa vụ tài chính, Dừng xử lý)</strong>
                            </td>
                        </tr>
                        <tr>
                            <td className='tdHeader' rowSpan={2} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Tổng số</strong>
                            </td>
                            <td className='tdHeader' rowSpan={2} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Kỳ trước chuyển sang</strong>
                            </td>
                            <td className='tdHeader' colSpan={4} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Trong kỳ</strong>
                            </td>
                            <td className='tdHeader' rowSpan={2} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Tổng số</strong>
                            </td>
                            <td className='tdHeader' rowSpan={2} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Trước hạn</strong>
                            </td>
                            <td className='tdHeader' rowSpan={2} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Trong hạn</strong>
                            </td>
                            <td className='tdHeader' rowSpan={2} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Quá hạn</strong>
                            </td>
                            <td className='tdHeader' rowSpan={2} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Tổng số</strong>
                            </td>
                            <td className='tdHeader' rowSpan={2} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Trong hạn</strong>
                            </td>
                            <td className='tdHeader' rowSpan={2} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Quá hạn</strong>
                            </td>
                            <td className='tdHeader' rowSpan={2} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Tổng số</strong>
                            </td>
                            <td className='tdHeader' rowSpan={2} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Trong hạn</strong>
                            </td>
                            <td className='tdHeader' rowSpan={2} style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Quá hạn</strong>
                            </td>

                        </tr>
                        <tr>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Tổng số</strong>
                            </td>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Trực tuyến</strong>
                            </td>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>Trực tiếp</strong>
                            </td>
                            <td className='tdHeader' style={{ verticalAlign: 'middle', padding: '5px', border: '1px solid #dfb6a5' }}>
                                <strong>BCCI</strong>
                            </td>
                        </tr>
                    </thead>

                    {/* //////////////////////////////////////////////////////////////////////////////////// */}
                    <tbody id="data">
                        {thongKePortalContext.catalogSearchPortal == '' ?
                            <>
                                {/* Sở ban ngành */}
                                <tr className="rowPhanCap" key='so-ban-nganh'>
                                    <td colSpan={1} style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5" }}>I</td>
                                    <td colSpan={17}
                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", textAlign: 'left' }}>
                                        Sở, ban, ngành
                                    </td>
                                </tr>
                                {dataThongKe.data.filter(x => x.catalog).map((item) => {
                                    if (item.catalog == 'so-ban-nganh') {
                                        indexSo++
                                        return (<>
                                            <tr className={indexSo % 2 ? "rowChan" : "rowLe"} key={indexSo}>
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
                                                    {item.tongTiepNhan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tiepNhanKyTruoc}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tongTiepNhan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tiepNhanQuaMang}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tiepNhanTrucTiep}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tiepNhanBCCI}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tongDaXuLy}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.daXuLyTruocHan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.daXuLyDungHan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.daXuLyQuaHan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tongDangXuLy}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.dangXuLyTrongHan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.dangXuLyQuaHan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tongTamDungXuLy}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tamDungXuLyTrongHan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tamDungXuLyQuaHan}
                                                </td>
                                            </tr>
                                        </>)
                                    }
                                })}
                                {/* Văn Phòng đăng kí đất đai */}
                                <tr className="rowPhanCap" key='vnvpdk'>
                                    <td colSpan={1} style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5" }}>II</td>
                                    <td colSpan={17}
                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", textAlign: 'left' }}>
                                        Văn phòng đăng ký đất đai
                                    </td>
                                </tr>
                                {dataThongKe.data.map((item) => {
                                    if (item.catalog == 'cnvpdk') {
                                        indexVPDK++
                                        return (<>
                                            <tr className={indexVPDK % 2 ? "rowChan" : "rowLe"} key={indexVPDK}>
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
                                                    {item.tongTiepNhan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tiepNhanKyTruoc}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tongTiepNhan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tiepNhanQuaMang}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tiepNhanTrucTiep}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tiepNhanBCCI}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tongDaXuLy}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.daXuLyTruocHan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.daXuLyDungHan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.daXuLyQuaHan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tongDangXuLy}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.dangXuLyTrongHan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.dangXuLyQuaHan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tongTamDungXuLy}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tamDungXuLyTrongHan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tamDungXuLyQuaHan}
                                                </td>
                                            </tr>
                                        </>)
                                    }
                                })}
                                {/* Quận huyện */}
                                <tr className="rowPhanCap" key='quan-huyen'>
                                    <td colSpan={1} style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5" }}>III</td>
                                    <td colSpan={17}
                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", textAlign: 'left' }}>
                                        Cấp huyện
                                    </td>
                                </tr>
                                {dataThongKe.data.map((item) => {
                                    if (item.catalog == 'quan-huyen') {
                                        indexHuyen++
                                        return (<>
                                            <tr className={indexHuyen % 2 ? "rowChan" : "rowLe"} key={indexHuyen}>
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
                                                    {item.tongTiepNhan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tiepNhanKyTruoc}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tongTiepNhan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tiepNhanQuaMang}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tiepNhanTrucTiep}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tiepNhanBCCI}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tongDaXuLy}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.daXuLyTruocHan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.daXuLyDungHan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.daXuLyQuaHan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tongDangXuLy}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.dangXuLyTrongHan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.dangXuLyQuaHan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tongTamDungXuLy}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tamDungXuLyTrongHan}
                                                </td>
                                                <td
                                                    style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                    {item.tamDungXuLyQuaHan}
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
                                                <tr className={index % 2 ? "rowChan" : "rowLe"} key={index}>
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
                                                        {item.tongTiepNhan}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.tiepNhanKyTruoc}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.tongTiepNhan}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.tiepNhanQuaMang}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.tiepNhanTrucTiep}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.tiepNhanBCCI}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.tongDaXuLy}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.daXuLyTruocHan}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.daXuLyDungHan}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.daXuLyQuaHan}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.tongDangXuLy}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.dangXuLyTrongHan}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.dangXuLyQuaHan}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.tongTamDungXuLy}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.tamDungXuLyTrongHan}
                                                    </td>
                                                    <td
                                                        style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                                        {item.tamDungXuLyQuaHan}
                                                    </td>
                                                </tr>
                                            </>)
                                        }
                                    })}

                            </>
                        }


                    </tbody >
                </table>
            </div>
        </>
    )
}