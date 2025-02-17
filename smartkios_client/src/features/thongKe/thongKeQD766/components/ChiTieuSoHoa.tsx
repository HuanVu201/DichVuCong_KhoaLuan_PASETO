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
import { IThongKeChiTieuSoHoaResponse } from "../models/ThongKe766Response";
import { SearchChiTieuSoHoaNew } from "../redux/action";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel"

const MucDoSoHoa = () => {
    const items: MenuProps["items"] = [
        {
            label: (
                <button
                    style={{ border: "none", background: "inherit" }}
                    onClick={() => downloadPhieuExcel("Bảng thống kê tiếp nhận hồ sơ trực tuyến trên địa bàn tỉnh")}
                >
                    <FileExcelOutlined style={{ color: "green" }} /> In file excel
                </button>
            ),
            key: "excel",
        },
    ];

    const dispatch = useAppDispatch();
    const [dataThongKe, setDataThongKe] = useState<IThongKeChiTieuSoHoaResponse>({
        data: [],
    });
    const [searchParams, setSearchParams] = useState<ISearchThongKeParams>({});
    const [loading, setLoading] = useState<boolean>(false);
    const onFinish = async (value: ISearchThongKeParams) => {
        setLoading(true)
        var res: any = await dispatch(SearchChiTieuSoHoaNew(value)).unwrap();
        if (res) {
            setDataThongKe(res);
            setLoading(false)
        }
    };

    return (
        <div className="thongKeSwapper">
            <div className="headerThongKe">
                <div className="title">
                    <h6>THEO DÕI CHỈ TIÊU SỐ HÓA HỒ SƠ CÁC ĐƠN VỊ</h6>
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
                        <table
                            id="tableToExcel" style={{ verticalAlign: "middle", borderCollapse: "collapse", width: "100%", textAlign: "center", margin: "10px 0", fontFamily: "'Times New Roman', Times, serif", }}>
                            <thead id='headerTable'>

                                <tr>
                                    <td colSpan={10} style={{ verticalAlign: "middle", padding: "5px", textAlign: "center", fontFamily: "'Times New Roman', Times, serif", fontSize: "17px", }} >
                                        <strong>
                                            THEO DÕI MỨC ĐỘ SỐ HÓA CÁC ĐƠN VỊ - THEO QUYẾT ĐỊNH
                                            SỐ 766/QĐ-TTg ngày 23/06/2022
                                        </strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={10}
                                        style={{ verticalAlign: "middle", padding: "5px", textAlign: "center", fontFamily: "'Times New Roman', Times, serif", fontSize: "15px", }} >
                                        <strong>
                                            (Thống kê hàng tháng, quý, 6 tháng, 9 tháng, năm, hàng năm)
                                        </strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={10}></td>
                                </tr>
                                <tr>
                                    <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                        <strong>STT</strong>
                                    </td>
                                    <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                        <strong>Đơn vị</strong>
                                    </td>
                                    <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                        <strong>Tiếp nhận</strong>
                                    </td>
                                    <td colSpan={4} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                        <strong>Số hóa hồ sơ TTHC khi tiếp nhận</strong>
                                    </td>
                                    <td rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                        <strong>Đã giải quyết</strong>
                                    </td>
                                    <td colSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                        <strong>Số hóa kết quả giải quyết</strong>
                                    </td>

                                </tr>
                                <tr>
                                    <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                        <strong>Chưa số hóa TPHS</strong>
                                    </td>
                                    <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                        <strong>Có số hóa TPHS</strong>
                                    </td>
                                    <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                        <strong>Có tái sử dụng thành phần</strong>
                                    </td>
                                    <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                        <strong>Có tái sử dụng thành phần từ cổng DVC quốc gia</strong>
                                    </td>
                                    <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                        <strong>Chưa số hóa</strong>
                                    </td>
                                    <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '5px', border: '1px solid #333' }}>
                                        <strong>Đã số hóa</strong>
                                    </td>

                                </tr>

                            </thead>

                            <tbody id="data">
                                {dataThongKe?.data.filter(x => x.catalog).map((item, index) => {
                                    return (
                                        <tr>
                                            <td
                                                style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #333", }}>
                                                {index + 1}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", textAlign: 'left', padding: "5px", border: "1px solid #333", }}>
                                                {item.tenThongKe}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #333", }}>
                                                {item.tiepNhan}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #333", }}>
                                                {item.chuaSoHoaTPHS}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #333", }}>
                                                {item.coSoHoaTPHS}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #333", }}>
                                                {item.coTaiSuDungTPHS}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #333", }}>
                                                {item.coTaiSuDungTPHSTuDvcQg}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #333", }}>
                                                {item.daGiaiQuyet}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #333", }}>
                                                {item.daGiaiQuyetChuaSoHoa}
                                            </td>
                                            <td
                                                style={{ verticalAlign: "middle", padding: "5px", border: "1px solid #333", }}>
                                                {item.daGiaiQuyetDaSoHoa}
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

const MucDoSoHoaSwapper = () => {
    return MucDoSoHoa;
};
export default MucDoSoHoaSwapper();
