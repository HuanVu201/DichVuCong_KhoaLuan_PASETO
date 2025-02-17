import { Dropdown, MenuProps, Row, SelectProps, Space, Spin } from "antd";
import "../../ThongKe.scss";
import {
    DownOutlined,
    FileExcelOutlined,
    LoadingOutlined,
    PrinterOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { AntdSpace } from "@/lib/antd/components";
import { SearchThongKe } from "./SearchThongKe";
import { Value } from "sass";
import { useState } from "react";
import { ISearchThongKeParams } from "../models/ThongKeQD766Search";
import { SearchThanhToanTrucTuyenNew, SearchTienDoGiaiQuyetNew } from "../redux/action";
import { useAppDispatch } from "@/lib/redux/Hooks";
import { IThongKeTTTTResponse, IThongKeTienDoGiaiQuyetResponse } from "../models/ThongKe766Response";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel"

const TienDoGiaiQuyet2 = () => {
    const items: MenuProps["items"] = [
        {
            label: (
                <button
                    style={{ border: "none", background: "inherit" }}
                    onClick={() =>
                        downloadPhieuExcel(
                            "Bảng thống kê tiếp nhận hồ sơ trực tuyến trên địa bàn tỉnh"
                        )
                    }
                >
                    <FileExcelOutlined style={{ color: "green" }} /> In file excel
                </button>
            ),
            key: "excel",
        },
    ];

    const dispatch = useAppDispatch();
    const [dataThongKe, setDataThongKe] = useState<IThongKeTienDoGiaiQuyetResponse>({
        data: [],
    });
    const [searchParams, setSearchParams] = useState<ISearchThongKeParams>({});
    const [loading, setLoading] = useState<boolean>(false);
    const onFinish = async (value: ISearchThongKeParams) => {
        setLoading(true)
        var res: any = await dispatch(SearchTienDoGiaiQuyetNew(value)).unwrap();
        if (res) {
            setDataThongKe(res);
            setLoading(false)
        }
    };


    return (
        <div className="thongKeSwapper">
            <div className="headerThongKe">
                <div className="title">
                    <h6>THEO DÕI CHỈ TIÊU THANH TOÁN TRỰC TUYẾN CÁC ĐƠN VỊ</h6>
                </div>
                <div className="actionButtons">
                    <button className="btnThongKe" onClick={() => onFinish(searchParams)}>
                        <span className="icon">
                            <SearchOutlined />
                        </span>
                        <span>Thống kê</span>
                    </button>
                    <div className="btnXuatBaoCao">
                        <span className="icon">
                            <PrinterOutlined />
                        </span>
                        <Dropdown menu={{ items }} trigger={["click"]}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    In báo cáo
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <Spin spinning={loading}
                    indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}>
                    <SearchThongKe
                        setSearchParams={setSearchParams}
                        resetSearchParams={() => {
                            setSearchParams({});
                        }}
                        onFinish={onFinish}
                    />

                    <div id="ContainerSwapper" style={{ fontSize: "13px", fontFamily: "'Times New Roman', Times, serif" }}>
                        <table id="tableToExcel" style={{
                            verticalAlign: "middle", borderCollapse: "collapse", width: "100%", textAlign: "center",
                            margin: "10px 0", fontSize: "13px", fontFamily: "'Times New Roman', Times, serif"
                        }}
                        >
                            {/* <thead> */}
                            <tr>
                                <td colSpan={18} style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px" }} >
                                    <strong>
                                        THEO DÕI CHỈ TIÊU TIẾN ĐỘ GIẢI QUYẾT CÁC ĐƠN VỊ - THEO QUYẾT ĐỊNH SỐ 766/QĐ-TTG NGÀY 23/06/2022
                                    </strong>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    colSpan={18}
                                    style={{
                                        verticalAlign: "middle", textAlign: 'center',
                                        padding: "5px",
                                        fontFamily: "'Times New Roman', Times, serif",
                                        fontSize: "15px",
                                    }}
                                >
                                    <strong>
                                        (Thống kê hàng tháng, quý, 6 tháng, 9 tháng, năm, hàng năm)
                                    </strong>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={18}></td>
                            </tr>
                            <tr>
                                <td rowSpan={3} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>STT</strong>
                                </td>
                                <td rowSpan={3} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Đơn vị</strong>
                                </td>
                                <td colSpan={6} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Tiếp nhận</strong>
                                </td>
                                <td colSpan={4} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Đã xử lý<br />(Đã xử lý xong + Đã trả kết quả + Rút)</strong>
                                </td>
                                <td colSpan={3} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Đang xử lý</strong>
                                </td>
                                <td colSpan={3} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Tạm dừng xử lý <br />(Yêu cầu bổ sung, Yêu cầu thực hiện nghĩa vụ tài chính, Dừng xử lý)</strong>
                                </td>
                            </tr>
                            <tr>
                                <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Tổng số</strong>
                                </td>
                                <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Kỳ trước chuyển sang</strong>
                                </td>
                                <td colSpan={4} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Trong kỳ</strong>
                                </td>
                                <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Tổng số</strong>
                                </td>
                                <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Trước hạn</strong>
                                </td>
                                <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Trong hạn</strong>
                                </td>
                                <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Quá hạn</strong>
                                </td>
                                <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Tổng số</strong>
                                </td>
                                <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Trong hạn</strong>
                                </td>
                                <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Quá hạn</strong>
                                </td>
                                <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Tổng số</strong>
                                </td>
                                <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Trong hạn</strong>
                                </td>
                                <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Quá hạn</strong>
                                </td>

                            </tr>
                            <tr>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Tổng số</strong>
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Trực tuyến</strong>
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Trực tiếp</strong>
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>BCCI</strong>
                                </td>
                            </tr>

                            {/* </thead> */}
                            <tbody id="data">
                                {dataThongKe?.data.filter(x => x.catalog).map((item, index) => {
                                    return (
                                        <tr>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {index + 1}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'left', padding: "5px", border: "1px solid #333", }}>
                                                {item.tenThongKe}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.tongTiepNhan}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.tiepNhanKyTruoc}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.tongTiepNhan}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.tiepNhanQuaMang}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.tiepNhanTrucTiep}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.tiepNhanBCCI}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.tongDaXuLy}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.daXuLyTruocHan}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.daXuLyDungHan}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.daXuLyQuaHan}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.tongDangXuLy}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.dangXuLyTrongHan}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.dangXuLyQuaHan}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.tongTamDungXuLy}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.tamDungXuLyTrongHan}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.tamDungXuLyQuaHan}
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </Spin>
            </AntdSpace>
        </div>
    );
};

const TienDoGiaiQuyet2Swapper = () => {
    return TienDoGiaiQuyet2;
};
export default TienDoGiaiQuyet2Swapper();
