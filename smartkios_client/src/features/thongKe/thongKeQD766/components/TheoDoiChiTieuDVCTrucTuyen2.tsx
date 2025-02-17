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
import { useAppDispatch } from "@/lib/redux/Hooks";
import { IThongKeChiTieuDVCResponse } from "../models/ThongKe766Response";
import { SearchChiTieuDVCTrucTuyenNew } from "../redux/action";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel"

const TheoDoiChiTieuDVCTrucTuyen2 = () => {
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
    const [dataThongKe, setDataThongKe] = useState<IThongKeChiTieuDVCResponse>({
        data: [],
    });
    const [searchParams, setSearchParams] = useState<ISearchThongKeParams>({});
    const [loading, setLoading] = useState<boolean>(false);
    const onFinish = async (value: ISearchThongKeParams) => {
        setLoading(true)
        var res: any = await dispatch(SearchChiTieuDVCTrucTuyenNew(value)).unwrap();

        if (res) {
            setDataThongKe(res);
            setLoading(false)
        }
    };


    return (
        <div className="thongKeSwapper">
            <div className="headerThongKe">
                <div className="title">
                    <h6>THEO DÕI CHỈ TIÊU DVC TRỰC TUYẾN CÁC ĐƠN VỊ</h6>
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
                        <table id="tableToExcel" style={{ verticalAlign: 'middle', borderCollapse: 'collapse', width: '100%', textAlign: 'center', margin: '10px 0', fontSize: '13px', fontFamily: "'Times New Roman', Times, serif" }}>
                            {/* <thead> */}
                            <tr>
                                <td colSpan={20} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px' }}>
                                    <strong>THEO DÕI CHỈ TIÊU DVC TRỰC TUYẾN CÁC ĐƠN VỊ - THEO QUYẾT ĐỊNH SỐ 766/QĐ-TTG NGÀY 23/06/2022</strong>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={20} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px' }}>
                                    <strong>(Thống kê hàng tháng, quý, 6 tháng, 9 tháng, năm, hàng năm)</strong>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={20} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px' }}>
                                    <strong></strong>
                                </td>
                            </tr>
                            <tr>
                                <td rowSpan={3} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>STT</strong>
                                </td>
                                <td rowSpan={3} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Đơn vị</strong>
                                </td>
                                <td rowSpan={1} colSpan={4} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Cung cấp DVC trực tuyến</strong>
                                </td>
                                <td rowSpan={1} colSpan={14} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Phát sinh hồ sơ</strong>
                                </td>
                            </tr>
                            <tr>
                                <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Tổng số thủ tục</strong>
                                </td>
                                <td colSpan={3} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>DVC trực tuyến</strong>
                                </td>
                                <td colSpan={5} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Tổng</strong>
                                </td>
                                <td colSpan={3} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Toàn trình</strong>
                                </td>
                                <td colSpan={3} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Một phần</strong>
                                </td>
                                <td colSpan={3} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Dịch vụ công</strong>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Tổng số</strong>
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Toàn trình</strong>
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Một phần</strong>
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Số thủ tục phát sinh hồ sơ</strong>
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Số hồ sơ phát sinh cả trực tuyến và trực tiếp</strong>
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Số thủ tục trực tuyến phát sinh hồ sơ</strong>
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Số hồ sơ phát sinh cả trực tuyến và trực tiếp trong các thủ tục trực tuyến</strong>
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Số hồ sơ phát sinh trực tuyến</strong>
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Số thủ tục</strong>
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Số hồ sơ phát sinh cả trực tuyến và trực tiếp</strong>
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Số hồ sơ phát sinh trực tuyến</strong>
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Số thủ tục</strong>
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Số hồ sơ phát sinh cả trực tuyến và trực tiếp</strong>
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Số hồ sơ phát sinh trực tuyến</strong>
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Số thủ tục</strong>
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Số thủ tục phát sinh hồ sơ</strong>
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                    <strong>Số hồ sơ phát sinh</strong>
                                </td>

                            </tr>

                            <tbody>
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
                                                {item.tongSoThuTuc}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.thuTucDvcTrucTuyen}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.thuTucDvcTrucTuyenToanTrinh}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.thuTucDvcTrucTuyenMotPhan}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.thuTucPhatSinhHoSo}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.tongHoSoPhatSinh}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.thuTucTrucTuyenPhatSinhHoSo}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.hoSoPhatSinhTrongThuTucTrucTuyen}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.hoSoPhatSinhTrucTuyenTrongThuTucTrucTuyen}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.thuTucToanTrinh}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.hoSoPhatSinhTrongThuTucToanTrinh}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.hoSoPhatSinhTrucTuyenTrongThuTucToanTrinh}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.thuTucMotPhan}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.hoSoPhatSinhTrongThuTucMotPhan}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.hoSoPhatSinhTrucTuyenTrongThuTucMotPhan}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.thuTucDvc}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.thuTucDvcPhatSinhHoSo}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'center', padding: "5px", border: "1px solid #333", }}>
                                                {item.hoSoPhatSinhTrongThuTucDvc}
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

const TheoDoiChiTieuDVCTrucTuyen2Swapper = () => {
    return TheoDoiChiTieuDVCTrucTuyen2;
};

export default TheoDoiChiTieuDVCTrucTuyen2Swapper()
