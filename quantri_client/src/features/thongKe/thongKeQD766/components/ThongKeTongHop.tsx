import React from 'react'
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

const ThongKeTongHop = () => {
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
                    <h6>THỐNG KÊ THỦ TỤC HÀNH CHÍNH</h6>
                </div>
                <div className="actionButtons">
                    <button className="btnThongKe" onClick={() => onFinish(searchParams)}>
                        <span className="icon">
                            <SearchOutlined />
                        </span>
                        <span>Thống kê</span>
                    </button>
                    <div className="btnXuatBaoCao" style={{display: items.length > 0 ? '' : 'none'}}>
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

                    <div id="ContainerSwapper" style={{ fontSize: "13px"}}  className="table-responsive">
                        <table id="tableToExcel" style={{
                            verticalAlign: "middle", borderCollapse: "collapse", width: "100%", textAlign: "center",
                            margin: "10px 0", fontSize: "13px"
                        }}
                        >
                            {/* <thead> */}
                            <tr>
                                <td colSpan={11} style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px" }} >
                                    <strong>
                                        BẢNG THỐNG KÊ THỦ TỤC HÀNH CHÍNH
                                    </strong>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={11}></td>
                            </tr>
                            <tr>
                                <td rowSpan={3} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>STT</strong>
                                </td>
                                <td rowSpan={3} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Đơn vị</strong>
                                </td>
                                <td rowSpan={3} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Lĩnh vực</strong>
                                </td>
                                <td colSpan={4} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Thủ tục hành chính</strong>
                                </td>
                                <td colSpan={4} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Thủ tục hành chính yêu cầu thu phí, lệ phí</strong>
                                </td>

                            </tr>
                            <tr>
                                <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Tổng số</strong>
                                </td>
                                <td colSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Trực tuyến</strong>
                                </td>
                                <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Còn lại</strong>
                                </td>
                                <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Tổng số</strong>
                                </td>
                                <td colSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Trực tuyến</strong>
                                </td>
                                <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Còn lại</strong>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Toàn trình</strong>
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Một phần</strong>
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Toàn trình</strong>
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Một phần</strong>
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

const ThongKeTongHopSwapper = () => {
    return ThongKeTongHop;
};
export default ThongKeTongHopSwapper();
