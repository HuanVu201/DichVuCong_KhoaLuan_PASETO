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

const ThongKeThanhToanTrucTuyen = () => {
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
                    <h6>THỐNG KÊ THANH TOÁN TRỰC TUYẾN CÁC ĐƠN VỊ</h6>
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
                            <tr>
                                <td colSpan={9} style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px" }} >
                                    <strong>
                                        THỐNG KÊ THANH TOÁN TRỰC TUYẾN CÁC ĐƠN VỊ
                                    </strong>
                                </td>
                            </tr>

                            <tr>
                                <td colSpan={9}></td>
                            </tr>
                            <tr>
                                <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>STT</strong>
                                </td>
                                <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Tên đơn vị</strong>
                                </td>
                                <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Số hồ sơ thu phí</strong>
                                </td>
                                <td colSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Thanh toán</strong>
                                </td>
                                <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Tỷ lệ thanh toán trực tuyến</strong>
                                </td>
                                <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Phí</strong>
                                </td>
                                <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Lệ phí</strong>
                                </td>
                                <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Tổng số tiền</strong>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Trực tiếp</strong>
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Trực tuyến</strong>
                                </td>

                            </tr>

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

const ThongKeThanhToanTrucTuyenSwapper = () => {
    return ThongKeThanhToanTrucTuyen;
};
export default ThongKeThanhToanTrucTuyenSwapper();
