import { useEffect, useState } from "react";
import { useThongKePortalContext } from "../../context/ThongKePortalContext"
import { IThongKeTTTTResponse } from "../../models/ThongKe766Response";
import { useAppDispatch } from "@/lib/redux/Hooks";
import { SearchThanhToanTrucTuyenPortal } from "../../redux/action";
import { TinhDiemDVC } from "@/features/thongKe/thongKeQD766/constant/DiemToiDaDVCTT";

export const ThongKeThanhToanTrucTuyen = () => {
    const thongKePortalContext = useThongKePortalContext()
    const dispatch = useAppDispatch();
    const [dataThongKe, setDataThongKe] = useState<IThongKeTTTTResponse>({
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
            const res = await dispatch(SearchThanhToanTrucTuyenPortal({
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
                    THEO DÕI CHỈ TIÊU THANH TOÁN TRỰC TUYẾN CÁC ĐƠN VỊ - THEO QUYẾT ĐỊNH SỐ 766/QĐ-TTG NGÀY 23/06/2022
                </strong></center>
            </div>
            <div id="ContainerSwapper" style={{ fontSize: "13px", fontFamily: "'Times New Roman', Times, serif" }}>
                <table id="table" style={{
                    verticalAlign: "middle", borderCollapse: "collapse", width: "100%", textAlign: "center", fontSize: "13px", fontFamily: "'Times New Roman', Times, serif"
                }}
                >
                    <thead id="headerTable">
                        <tr>
                            <td className='tdHeader' style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                <strong>STT</strong>
                            </td>

                            <td className='tdHeader'
                                style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                <strong>Đơn vị</strong>
                            </td>
                            <td className='tdHeader'
                                style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                <strong>Số lượng thủ tục có phí, lệ phí</strong>
                            </td>
                            <td className='tdHeader'
                                style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                <strong>Số lượng thủ tục có phí, lệ phí phát sinh hồ sơ</strong>
                            </td>
                            <td className='tdHeader'
                                style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                <strong>Số lượng thủ tục có phát sinh thanh toán</strong>
                            </td>
                            <td className='tdHeader'
                                style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                <strong>
                                    Số lượng thủ tục có phát sinh thanh toán trực tuyến
                                </strong>
                            </td>
                            <td className='tdHeader'
                                style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                <strong>Tổng số hồ sơ thuộc các thủ tục có phí, lệ phí</strong>
                            </td>
                            <td className='tdHeader'
                                style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5", }}>
                                <strong>
                                    Số hồ sơ được thanh toán trực tuyến thuộc các thủ tục có phí, lệ phí
                                </strong>
                            </td>
                        </tr>
                    </thead>

                    {/* </thead> */}
                    <tbody id="data">
                        {thongKePortalContext.catalogSearchPortal == '' ?
                            <>
                                {/* Sở ban ngành */}
                                <tr className="rowPhanCap">
                                    <td colSpan={1} style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5" }}>I</td>
                                    <td colSpan={7}
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
                                                    style={{
                                                        verticalAlign: "middle",
                                                        padding: "5px",
                                                        border: "1px solid #dfb6a5",
                                                    }}
                                                >
                                                    {indexSo}
                                                </td>

                                                <td
                                                    style={{
                                                        verticalAlign: "middle",
                                                        padding: "5px",
                                                        border: "1px solid #dfb6a5",
                                                        textAlign: 'left'
                                                    }}
                                                >
                                                    {item.tenThongKe}
                                                </td>
                                                <td
                                                    style={{
                                                        verticalAlign: "middle",
                                                        padding: "5px",
                                                        border: "1px solid #dfb6a5",
                                                    }}
                                                >
                                                    <span>Số lượng: {item.thuTucCoPhi}</span>
                                                </td>
                                                <td
                                                    style={{
                                                        verticalAlign: "middle",
                                                        padding: "5px",
                                                        border: "1px solid #dfb6a5",
                                                    }}
                                                >
                                                    <p>Số lượng: {item.thuTucCoPhiPhatSinhHoSo}</p>
                                                    <p>
                                                        Tỷ lệ:{" "}
                                                        {item.thuTucCoPhiPhatSinhHoSo / item.thuTucCoPhi > 0
                                                            ? Math.round(
                                                                (item.thuTucCoPhiPhatSinhHoSo /
                                                                    item.thuTucCoPhi) *
                                                                100 *
                                                                100
                                                            ) /
                                                            100 +
                                                            "%"
                                                            : "0"}
                                                    </p>
                                                </td>
                                                <td
                                                    style={{
                                                        verticalAlign: "middle",
                                                        padding: "5px",
                                                        border: "1px solid #dfb6a5",
                                                    }}
                                                >
                                                    <p>Số lượng: {item.thuTucPhatSinhThanhToan}</p>
                                                    <p>
                                                        Tỷ lệ:{" "}
                                                        {item.thuTucPhatSinhThanhToan / item.thuTucCoPhi > 0
                                                            ? Math.round(
                                                                (item.thuTucPhatSinhThanhToan /
                                                                    item.thuTucCoPhi) *
                                                                100 *
                                                                100
                                                            ) /
                                                            100 +
                                                            "%"
                                                            : "0"}
                                                    </p>
                                                    <strong>
                                                        Điểm số:{" "}
                                                        {TinhDiemDVC(
                                                            item.thuTucPhatSinhThanhToan / item.thuTucCoPhi,
                                                            "THU_TUC_PHAT_SINH_THANH_TOAN"
                                                        )}
                                                    </strong>
                                                </td>
                                                <td
                                                    style={{
                                                        verticalAlign: "middle",
                                                        padding: "5px",
                                                        border: "1px solid #dfb6a5",
                                                    }}
                                                >
                                                    <p>Số lượng: {item.thuTucPhatSinhTTTT}</p>
                                                    <p>
                                                        Tỷ lệ:{" "}
                                                        {item.thuTucPhatSinhTTTT / item.thuTucCoPhi > 0
                                                            ? Math.round(
                                                                (item.thuTucPhatSinhTTTT / item.thuTucCoPhi) *
                                                                100 *
                                                                100
                                                            ) /
                                                            100 +
                                                            "%"
                                                            : "0"}
                                                    </p>
                                                    <strong>
                                                        Điểm số:{" "}
                                                        {TinhDiemDVC(
                                                            item.thuTucPhatSinhTTTT / item.thuTucCoPhi,
                                                            "THU_TUC_PHAT_SINH_TTTT"
                                                        )}
                                                    </strong>
                                                </td>
                                                <td
                                                    style={{
                                                        verticalAlign: "middle",
                                                        padding: "5px",
                                                        border: "1px solid #dfb6a5",
                                                    }}
                                                >
                                                    <p>Số lượng: {item.hoSoThuocThuTucCoPhi}</p>
                                                </td>
                                                <td
                                                    style={{
                                                        verticalAlign: "middle",
                                                        padding: "5px",
                                                        border: "1px solid #dfb6a5",
                                                    }}
                                                >
                                                    <p>Số lượng: {item.hoSoThuocThuTucCoPhiDaTTTT}</p>
                                                    <p>
                                                        Tỷ lệ:{" "}
                                                        {item.hoSoThuocThuTucCoPhiDaTTTT / item.thuTucCoPhi > 0
                                                            ? Math.round(
                                                                (item.hoSoThuocThuTucCoPhiDaTTTT /
                                                                    item.thuTucCoPhi) *
                                                                100 *
                                                                100
                                                            ) /
                                                            100 +
                                                            "%"
                                                            : "0"}
                                                    </p>
                                                    <strong>
                                                        Điểm số:{" "}
                                                        {TinhDiemDVC(
                                                            item.hoSoThuocThuTucCoPhiDaTTTT / item.thuTucCoPhi,
                                                            "HO_SO_THUOC_THU_TUC_CO_PHI_DA_TTTT"
                                                        )}
                                                    </strong>
                                                </td>
                                            </tr>
                                        </>)
                                    }
                                })}
                                {/* Văn Phòng đăng kí đất đai */}
                                <tr className="rowPhanCap">
                                    <td colSpan={1} style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5" }}>II</td>
                                    <td colSpan={7}
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
                                                    style={{
                                                        verticalAlign: "middle",
                                                        padding: "5px",
                                                        border: "1px solid #dfb6a5",
                                                    }}
                                                >
                                                    {indexVPDK}
                                                </td>

                                                <td
                                                    style={{
                                                        verticalAlign: "middle",
                                                        padding: "5px",
                                                        border: "1px solid #dfb6a5",
                                                        textAlign: 'left'
                                                    }}
                                                >
                                                    {item.tenThongKe}
                                                </td>
                                                <td
                                                    style={{
                                                        verticalAlign: "middle",
                                                        padding: "5px",
                                                        border: "1px solid #dfb6a5",
                                                    }}
                                                >
                                                    <span>Số lượng: {item.thuTucCoPhi}</span>
                                                </td>
                                                <td
                                                    style={{
                                                        verticalAlign: "middle",
                                                        padding: "5px",
                                                        border: "1px solid #dfb6a5",
                                                    }}
                                                >
                                                    <p>Số lượng: {item.thuTucCoPhiPhatSinhHoSo}</p>
                                                    <p>
                                                        Tỷ lệ:{" "}
                                                        {item.thuTucCoPhiPhatSinhHoSo / item.thuTucCoPhi > 0
                                                            ? Math.round(
                                                                (item.thuTucCoPhiPhatSinhHoSo /
                                                                    item.thuTucCoPhi) *
                                                                100 *
                                                                100
                                                            ) /
                                                            100 +
                                                            "%"
                                                            : "0"}
                                                    </p>
                                                </td>
                                                <td
                                                    style={{
                                                        verticalAlign: "middle",
                                                        padding: "5px",
                                                        border: "1px solid #dfb6a5",
                                                    }}
                                                >
                                                    <p>Số lượng: {item.thuTucPhatSinhThanhToan}</p>
                                                    <p>
                                                        Tỷ lệ:{" "}
                                                        {item.thuTucPhatSinhThanhToan / item.thuTucCoPhi > 0
                                                            ? Math.round(
                                                                (item.thuTucPhatSinhThanhToan /
                                                                    item.thuTucCoPhi) *
                                                                100 *
                                                                100
                                                            ) /
                                                            100 +
                                                            "%"
                                                            : "0"}
                                                    </p>
                                                    <strong>
                                                        Điểm số:{" "}
                                                        {TinhDiemDVC(
                                                            item.thuTucPhatSinhThanhToan / item.thuTucCoPhi,
                                                            "THU_TUC_PHAT_SINH_THANH_TOAN"
                                                        )}
                                                    </strong>
                                                </td>
                                                <td
                                                    style={{
                                                        verticalAlign: "middle",
                                                        padding: "5px",
                                                        border: "1px solid #dfb6a5",
                                                    }}
                                                >
                                                    <p>Số lượng: {item.thuTucPhatSinhTTTT}</p>
                                                    <p>
                                                        Tỷ lệ:{" "}
                                                        {item.thuTucPhatSinhTTTT / item.thuTucCoPhi > 0
                                                            ? Math.round(
                                                                (item.thuTucPhatSinhTTTT / item.thuTucCoPhi) *
                                                                100 *
                                                                100
                                                            ) /
                                                            100 +
                                                            "%"
                                                            : "0"}
                                                    </p>
                                                    <strong>
                                                        Điểm số:{" "}
                                                        {TinhDiemDVC(
                                                            item.thuTucPhatSinhTTTT / item.thuTucCoPhi,
                                                            "THU_TUC_PHAT_SINH_TTTT"
                                                        )}
                                                    </strong>
                                                </td>
                                                <td
                                                    style={{
                                                        verticalAlign: "middle",
                                                        padding: "5px",
                                                        border: "1px solid #dfb6a5",
                                                    }}
                                                >
                                                    <p>Số lượng: {item.hoSoThuocThuTucCoPhi}</p>
                                                </td>
                                                <td
                                                    style={{
                                                        verticalAlign: "middle",
                                                        padding: "5px",
                                                        border: "1px solid #dfb6a5",
                                                    }}
                                                >
                                                    <p>Số lượng: {item.hoSoThuocThuTucCoPhiDaTTTT}</p>
                                                    <p>
                                                        Tỷ lệ:{" "}
                                                        {item.hoSoThuocThuTucCoPhiDaTTTT / item.thuTucCoPhi > 0
                                                            ? Math.round(
                                                                (item.hoSoThuocThuTucCoPhiDaTTTT /
                                                                    item.thuTucCoPhi) *
                                                                100 *
                                                                100
                                                            ) /
                                                            100 +
                                                            "%"
                                                            : "0"}
                                                    </p>
                                                    <strong>
                                                        Điểm số:{" "}
                                                        {TinhDiemDVC(
                                                            item.hoSoThuocThuTucCoPhiDaTTTT / item.thuTucCoPhi,
                                                            "HO_SO_THUOC_THU_TUC_CO_PHI_DA_TTTT"
                                                        )}
                                                    </strong>
                                                </td>
                                            </tr>
                                        </>)
                                    }
                                })}
                                {/* Quận huyện */}
                                <tr className="rowPhanCap">
                                    <td colSpan={1} style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #dfb6a5" }}>III</td>
                                    <td colSpan={7}
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
                                                    style={{
                                                        verticalAlign: "middle",
                                                        padding: "5px",
                                                        border: "1px solid #dfb6a5",
                                                    }}
                                                >
                                                    {indexHuyen}
                                                </td>

                                                <td
                                                    style={{
                                                        verticalAlign: "middle",
                                                        padding: "5px",
                                                        border: "1px solid #dfb6a5",
                                                        textAlign: 'left'
                                                    }}
                                                >
                                                    {item.tenThongKe}
                                                </td>
                                                <td
                                                    style={{
                                                        verticalAlign: "middle",
                                                        padding: "5px",
                                                        border: "1px solid #dfb6a5",
                                                    }}
                                                >
                                                    <span>Số lượng: {item.thuTucCoPhi}</span>
                                                </td>
                                                <td
                                                    style={{
                                                        verticalAlign: "middle",
                                                        padding: "5px",
                                                        border: "1px solid #dfb6a5",
                                                    }}
                                                >
                                                    <p>Số lượng: {item.thuTucCoPhiPhatSinhHoSo}</p>
                                                    <p>
                                                        Tỷ lệ:{" "}
                                                        {item.thuTucCoPhiPhatSinhHoSo / item.thuTucCoPhi > 0
                                                            ? Math.round(
                                                                (item.thuTucCoPhiPhatSinhHoSo /
                                                                    item.thuTucCoPhi) *
                                                                100 *
                                                                100
                                                            ) /
                                                            100 +
                                                            "%"
                                                            : "0"}
                                                    </p>
                                                </td>
                                                <td
                                                    style={{
                                                        verticalAlign: "middle",
                                                        padding: "5px",
                                                        border: "1px solid #dfb6a5",
                                                    }}
                                                >
                                                    <p>Số lượng: {item.thuTucPhatSinhThanhToan}</p>
                                                    <p>
                                                        Tỷ lệ:{" "}
                                                        {item.thuTucPhatSinhThanhToan / item.thuTucCoPhi > 0
                                                            ? Math.round(
                                                                (item.thuTucPhatSinhThanhToan /
                                                                    item.thuTucCoPhi) *
                                                                100 *
                                                                100
                                                            ) /
                                                            100 +
                                                            "%"
                                                            : "0"}
                                                    </p>
                                                    <strong>
                                                        Điểm số:{" "}
                                                        {TinhDiemDVC(
                                                            item.thuTucPhatSinhThanhToan / item.thuTucCoPhi,
                                                            "THU_TUC_PHAT_SINH_THANH_TOAN"
                                                        )}
                                                    </strong>
                                                </td>
                                                <td
                                                    style={{
                                                        verticalAlign: "middle",
                                                        padding: "5px",
                                                        border: "1px solid #dfb6a5",
                                                    }}
                                                >
                                                    <p>Số lượng: {item.thuTucPhatSinhTTTT}</p>
                                                    <p>
                                                        Tỷ lệ:{" "}
                                                        {item.thuTucPhatSinhTTTT / item.thuTucCoPhi > 0
                                                            ? Math.round(
                                                                (item.thuTucPhatSinhTTTT / item.thuTucCoPhi) *
                                                                100 *
                                                                100
                                                            ) /
                                                            100 +
                                                            "%"
                                                            : "0"}
                                                    </p>
                                                    <strong>
                                                        Điểm số:{" "}
                                                        {TinhDiemDVC(
                                                            item.thuTucPhatSinhTTTT / item.thuTucCoPhi,
                                                            "THU_TUC_PHAT_SINH_TTTT"
                                                        )}
                                                    </strong>
                                                </td>
                                                <td
                                                    style={{
                                                        verticalAlign: "middle",
                                                        padding: "5px",
                                                        border: "1px solid #dfb6a5",
                                                    }}
                                                >
                                                    <p>Số lượng: {item.hoSoThuocThuTucCoPhi}</p>
                                                </td>
                                                <td
                                                    style={{
                                                        verticalAlign: "middle",
                                                        padding: "5px",
                                                        border: "1px solid #dfb6a5",
                                                    }}
                                                >
                                                    <p>Số lượng: {item.hoSoThuocThuTucCoPhiDaTTTT}</p>
                                                    <p>
                                                        Tỷ lệ:{" "}
                                                        {item.hoSoThuocThuTucCoPhiDaTTTT / item.thuTucCoPhi > 0
                                                            ? Math.round(
                                                                (item.hoSoThuocThuTucCoPhiDaTTTT /
                                                                    item.thuTucCoPhi) *
                                                                100 *
                                                                100
                                                            ) /
                                                            100 +
                                                            "%"
                                                            : "0"}
                                                    </p>
                                                    <strong>
                                                        Điểm số:{" "}
                                                        {TinhDiemDVC(
                                                            item.hoSoThuocThuTucCoPhiDaTTTT / item.thuTucCoPhi,
                                                            "HO_SO_THUOC_THU_TUC_CO_PHI_DA_TTTT"
                                                        )}
                                                    </strong>
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
                                                        style={{
                                                            verticalAlign: "middle",
                                                            padding: "5px",
                                                            border: "1px solid #dfb6a5",
                                                        }}
                                                    >
                                                        {indexAnyType}
                                                    </td>

                                                    <td
                                                        style={{
                                                            verticalAlign: "middle",
                                                            padding: "5px",
                                                            border: "1px solid #dfb6a5",
                                                            textAlign: 'left'
                                                        }}
                                                    >
                                                        {item.tenThongKe}
                                                    </td>
                                                    <td
                                                        style={{
                                                            verticalAlign: "middle",
                                                            padding: "5px",
                                                            border: "1px solid #dfb6a5",
                                                        }}
                                                    >
                                                        <span>Số lượng: {item.thuTucCoPhi}</span>
                                                    </td>
                                                    <td
                                                        style={{
                                                            verticalAlign: "middle",
                                                            padding: "5px",
                                                            border: "1px solid #dfb6a5",
                                                        }}
                                                    >
                                                        <p>Số lượng: {item.thuTucCoPhiPhatSinhHoSo}</p>
                                                        <p>
                                                            Tỷ lệ:{" "}
                                                            {item.thuTucCoPhiPhatSinhHoSo / item.thuTucCoPhi > 0
                                                                ? Math.round(
                                                                    (item.thuTucCoPhiPhatSinhHoSo /
                                                                        item.thuTucCoPhi) *
                                                                    100 *
                                                                    100
                                                                ) /
                                                                100 +
                                                                "%"
                                                                : "0"}
                                                        </p>
                                                    </td>
                                                    <td
                                                        style={{
                                                            verticalAlign: "middle",
                                                            padding: "5px",
                                                            border: "1px solid #dfb6a5",
                                                        }}
                                                    >
                                                        <p>Số lượng: {item.thuTucPhatSinhThanhToan}</p>
                                                        <p>
                                                            Tỷ lệ:{" "}
                                                            {item.thuTucPhatSinhThanhToan / item.thuTucCoPhi > 0
                                                                ? Math.round(
                                                                    (item.thuTucPhatSinhThanhToan /
                                                                        item.thuTucCoPhi) *
                                                                    100 *
                                                                    100
                                                                ) /
                                                                100 +
                                                                "%"
                                                                : "0"}
                                                        </p>
                                                        <strong>
                                                            Điểm số:{" "}
                                                            {TinhDiemDVC(
                                                                item.thuTucPhatSinhThanhToan / item.thuTucCoPhi,
                                                                "THU_TUC_PHAT_SINH_THANH_TOAN"
                                                            )}
                                                        </strong>
                                                    </td>
                                                    <td
                                                        style={{
                                                            verticalAlign: "middle",
                                                            padding: "5px",
                                                            border: "1px solid #dfb6a5",
                                                        }}
                                                    >
                                                        <p>Số lượng: {item.thuTucPhatSinhTTTT}</p>
                                                        <p>
                                                            Tỷ lệ:{" "}
                                                            {item.thuTucPhatSinhTTTT / item.thuTucCoPhi > 0
                                                                ? Math.round(
                                                                    (item.thuTucPhatSinhTTTT / item.thuTucCoPhi) *
                                                                    100 *
                                                                    100
                                                                ) /
                                                                100 +
                                                                "%"
                                                                : "0"}
                                                        </p>
                                                        <strong>
                                                            Điểm số:{" "}
                                                            {TinhDiemDVC(
                                                                item.thuTucPhatSinhTTTT / item.thuTucCoPhi,
                                                                "THU_TUC_PHAT_SINH_TTTT"
                                                            )}
                                                        </strong>
                                                    </td>
                                                    <td
                                                        style={{
                                                            verticalAlign: "middle",
                                                            padding: "5px",
                                                            border: "1px solid #dfb6a5",
                                                        }}
                                                    >
                                                        <p>Số lượng: {item.hoSoThuocThuTucCoPhi}</p>
                                                    </td>
                                                    <td
                                                        style={{
                                                            verticalAlign: "middle",
                                                            padding: "5px",
                                                            border: "1px solid #dfb6a5",
                                                        }}
                                                    >
                                                        <p>Số lượng: {item.hoSoThuocThuTucCoPhiDaTTTT}</p>
                                                        <p>
                                                            Tỷ lệ:{" "}
                                                            {item.hoSoThuocThuTucCoPhiDaTTTT / item.thuTucCoPhi > 0
                                                                ? Math.round(
                                                                    (item.hoSoThuocThuTucCoPhiDaTTTT /
                                                                        item.thuTucCoPhi) *
                                                                    100 *
                                                                    100
                                                                ) /
                                                                100 +
                                                                "%"
                                                                : "0"}
                                                        </p>
                                                        <strong>
                                                            Điểm số:{" "}
                                                            {TinhDiemDVC(
                                                                item.hoSoThuocThuTucCoPhiDaTTTT / item.thuTucCoPhi,
                                                                "HO_SO_THUOC_THU_TUC_CO_PHI_DA_TTTT"
                                                            )}
                                                        </strong>
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