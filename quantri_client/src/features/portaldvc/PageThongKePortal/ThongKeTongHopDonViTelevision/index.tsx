import { CURRENTTIME, FORMAT_DATE_WITHOUT_TIME, YEAR } from "@/data";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs"
import { tiepNhanHoSoTrucTuyenApi } from "@/features/thongKe/thongKeHoSoTrucTuyen/services/TiepNhanHoSoTrucTuyenServices";
import { IThongKeHoSoTrangChu } from "@/features/thongKe/thongKeHoSoTrucTuyen/models/TiepNhanHoSoTrucTuyen";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SearchPublicConfig } from "@/features/config/redux/action";
import { toast } from "react-toastify";
import './index.scss'
import { getCurrencyThongKe } from "@/utils";
import { IBaoCaoDonVi } from "@/features/baocaotonghop/model";
import { HoSoTheoBaoCaoTongHopProvider, useHoSoTheoBaoCaoTongHopContext } from "@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext";
import { BaoCaoTongHopProvider, useBaoCaoTongHopContext } from "@/features/thongKe/ThongKeTheoDonVi/context/BaoCaoTongHopContext";
import { BaoCaoTongHopDonViAction } from "@/features/baocaotonghop/redux/action";
import { SO_BAN_NGANH } from "../../DanhMucThuTuc/components/HeaderContainerTTHC";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const ThongKeTongHopDonViHCCTelevision = () => {
    const now = new Date()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { publicModule: config } = useAppSelector(state => state.config)
    const [tenTinh, setTenTinh] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
    const thongKeHoSoContext = useBaoCaoTongHopContext();
    var [data, setData] = useState<IBaoCaoDonVi[]>([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const maDinhDanhCha = searchParams.get('MaDinhDanh');
    const catalog = searchParams.get('Catalog');

    useEffect(() => {
        if (!config)
            dispatch(SearchPublicConfig())
    }, [])
    useEffect(() => {
        config?.map((item: any) => {
            if (item.code == 'ten-don-vi-lowercase') {
                setTenTinh(item.content)
            }
        })
    }, [config])
    useEffect(() => {
        const eleEMC: any = document.querySelector('#yhy-append')
        if (eleEMC) {
            eleEMC.style.display = 'none'
        }
    }, [])
    const handleLoadHoSo = (item: any, tieuChi?: string) => {
        hoSoTheoBaoCaoTongHopContext.setHoSoTheoBaoCaoTongHopModalVisible(true);
        hoSoTheoBaoCaoTongHopContext.setSearchParams({
            pageNumber: 1,
            pageSize: 20,
            MaDonVi: item.maThongKe,
            // MaDinhDanh: thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh,
            TuNgay: thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay,
            DenNgay: thongKeHoSoContext.searchBaoCaoThuTuc.denNgay,
            kenhThucHien: thongKeHoSoContext.searchBaoCaoThuTuc.kenhThucHien,
            mucDo: thongKeHoSoContext.searchBaoCaoThuTuc.mucDo,
            loaiDoiTuong: thongKeHoSoContext.searchBaoCaoThuTuc.loaiDoiTuong,
            tieuChi: tieuChi,
        });
    }; const countSumary = () => {
        let tongTiepNhan: number = 0
        let tiepNhanKyTruoc: number = 0
        let tiepNhanTrongKy: number = 0
        let tiepNhanTrucTiep: number = 0
        let tiepNhanQuaMang: number = 0
        let tiepNhanQuaBCCI: number = 0
        let daXuLyTruocHan: number = 0
        let daXuLyDungHan: number = 0
        let daXuLyQuaHan: number = 0
        let dangXuLyTrongHan: number = 0
        let dangXuLyQuaHan: number = 0
        let boSung: number = 0
        let rutTraLai: number = 0

        data.forEach(item => {
            tongTiepNhan += item.tongSo
            tiepNhanKyTruoc += item.tiepNhanKyTruoc
            tiepNhanTrongKy += item.tiepNhanTrongKy
            tiepNhanTrucTiep += item.tiepNhanTrucTiep
            tiepNhanQuaMang += item.tiepNhanQuaMang
            tiepNhanQuaBCCI += item.tiepNhanQuaBCCI
            daXuLyTruocHan += item.daXuLyTruocHan
            daXuLyDungHan += item.daXuLyDungHan
            daXuLyQuaHan += item.daXuLyQuaHan
            dangXuLyTrongHan += item.dangXuLyTrongHan
            dangXuLyQuaHan += item.dangXuLyQuaHan
            boSung += item.tongBoSung
            rutTraLai += item.tongTraLai
        })
        return (
            <tr className={data.length % 2 ? "rowChan" : "rowLe"}>
                <td className="blueText"
                ></td>
                <td className="blueText" style={{
                    verticalAlign: "middle", textAlign: "left", padding: "5px", minWidth: "500px", fontWeight: 600
                }}
                >
                    TỔNG SỐ
                </td>
                <td className="blueText"
                    style={{
                        verticalAlign: "middle", textAlign: "center", padding: "5px", fontWeight: 600
                    }}
                >
                    {getCurrencyThongKe(tongTiepNhan)}
                </td>
                <td className="blueText"
                    style={{
                        verticalAlign: "middle", textAlign: "center", padding: "5px", fontWeight: 600
                    }}
                >
                    {getCurrencyThongKe(tiepNhanKyTruoc)}
                </td>
                <td className="blueText"
                    style={{
                        verticalAlign: "middle", textAlign: "center", padding: "5px", fontWeight: 600
                    }}
                >
                    {getCurrencyThongKe(tiepNhanTrongKy)}
                </td>
                <td className="blueText"
                    style={{
                        verticalAlign: "middle", textAlign: "center", padding: "5px", fontWeight: 600
                    }}
                >
                    {getCurrencyThongKe(daXuLyTruocHan)}
                </td>
                <td className="blueText"
                    style={{
                        verticalAlign: "middle", textAlign: "center", padding: "5px", fontWeight: 600
                    }}
                >
                    {getCurrencyThongKe(daXuLyDungHan)}
                </td>
                <td className="blueText"
                    style={{
                        verticalAlign: "middle", textAlign: "center", padding: "5px", fontWeight: 600
                    }}
                >
                    {getCurrencyThongKe(daXuLyQuaHan)}
                </td>
                <td className="blueText"
                    style={{
                        verticalAlign: "middle", textAlign: "center", padding: "5px", fontWeight: 600
                    }}
                >
                    {(daXuLyDungHan + daXuLyTruocHan) /
                        (daXuLyDungHan + daXuLyTruocHan + daXuLyQuaHan)
                        ? Math.round(
                            ((daXuLyDungHan + daXuLyTruocHan) /
                                (daXuLyDungHan +
                                    daXuLyTruocHan +
                                    daXuLyQuaHan)) *
                            100 *
                            100
                        ) /
                        100 +
                        "%"
                        : "0"}
                </td>
                <td className="blueText"
                    style={{
                        verticalAlign: "middle", textAlign: "center", padding: "5px", fontWeight: 600
                    }}
                >
                    {getCurrencyThongKe(dangXuLyTrongHan)}
                </td>
                <td className="blueText"
                    style={{
                        verticalAlign: "middle", textAlign: "center", padding: "5px", fontWeight: 600
                    }}
                >
                    {getCurrencyThongKe(dangXuLyQuaHan)}
                </td>
                <td className="blueText"
                    style={{
                        verticalAlign: "middle", textAlign: "center", padding: "5px", fontWeight: 600
                    }}
                >
                    {getCurrencyThongKe(boSung)}
                </td>
                <td className="blueText"
                    style={{
                        verticalAlign: "middle", textAlign: "center", padding: "5px", fontWeight: 600
                    }}
                >
                    {getCurrencyThongKe(rutTraLai)}
                </td>
            </tr>
        );
    };
    const getElementThongKe = (item: any, index: number) => {
        return (
            <tr className={index % 2 ? "rowLe" : "rowChan"}>
                <td
                    style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        padding: "5px",
                    }}
                >
                    {index}
                </td>
                <td className="blueText"
                    style={{
                        verticalAlign: "middle",
                        textAlign: "left",
                        padding: "5px",
                    }}
                >
                    {item.tenThongKe}
                </td>
                <td
                    style={{
                        verticalAlign: "middle",
                        padding: "5px",
                    }}
                >
                    {item.tongSo ? getCurrencyThongKe(item.tongSo) : 0}
                </td>
                <td
                    style={{
                        verticalAlign: "middle",
                        padding: "5px",
                    }}
                >
                    {item.tiepNhanKyTruoc ? getCurrencyThongKe(item.tiepNhanKyTruoc) : 0}
                </td>
                <td
                    style={{
                        verticalAlign: "middle",
                        padding: "5px",
                    }}
                >
                    {
                        item.tiepNhanTrongKy ? getCurrencyThongKe(item.tiepNhanTrongKy) : 0
                    }
                </td>
                <td
                    style={{
                        verticalAlign: "middle",
                        padding: "5px",
                    }}
                >
                    {item.daXuLyTruocHan ? getCurrencyThongKe(item.daXuLyTruocHan) : 0}
                </td>
                <td
                    style={{
                        verticalAlign: "middle",
                        padding: "5px",
                    }}
                >
                    {item.daXuLyDungHan ? getCurrencyThongKe(item.daXuLyDungHan) : 0}
                </td>
                <td
                    style={{
                        verticalAlign: "middle",
                        padding: "5px",
                    }}
                >
                    {item.daXuLyQuaHan ? getCurrencyThongKe(item.daXuLyQuaHan) : 0}
                </td>
                <td
                    style={{
                        verticalAlign: "middle",
                        padding: "5px",
                    }}
                >
                    {(item.daXuLyDungHan + item.daXuLyTruocHan) /
                        (item.daXuLyDungHan + item.daXuLyTruocHan + item.daXuLyQuaHan)
                        ? Math.round(
                            ((item.daXuLyDungHan + item.daXuLyTruocHan) /
                                (item.daXuLyDungHan +
                                    item.daXuLyTruocHan +
                                    item.daXuLyQuaHan)) *
                            100 *
                            100
                        ) /
                        100 +
                        "%"
                        : "0"}
                </td>
                <td
                    style={{
                        verticalAlign: "middle",
                        padding: "5px",
                    }}
                >
                    {item.dangXuLyTrongHan ? getCurrencyThongKe(item.dangXuLyTrongHan) : 0}
                </td>
                <td
                    style={{
                        verticalAlign: "middle",
                        padding: "5px",
                    }}
                >
                    {item.dangXuLyQuaHan ? getCurrencyThongKe(item.dangXuLyQuaHan) : 0}
                </td>
                <td
                    style={{
                        verticalAlign: "middle",
                        padding: "5px",
                    }}
                >
                    {item.tongBoSung ? getCurrencyThongKe(item.tongBoSung) : 0}
                </td>
                <td
                    style={{
                        verticalAlign: "middle",
                        padding: "5px",
                    }}
                >
                    {item.tongTraLai ? getCurrencyThongKe(item.tongTraLai) : 0}
                </td>
            </tr>
        );
    };

    const getYesterdayDate = () => {
        const yesterday = new Date(Date.now() - 864e5);
        return yesterday.toISOString().split('T')[0];
    };
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await dispatch(
                    BaoCaoTongHopDonViAction({
                        tuNgay: `${YEAR}-01-01`,
                        denNgay: getYesterdayDate(),
                        catalog: catalog ?? undefined,
                        maDinhDanhCha: maDinhDanhCha ?? undefined,
                        cache: true
                    })
                ).unwrap();
                setData(res?.data ?? []);
            } catch (error) {
                toast.error("Lỗi lấy thông tin: " + error)
                console.error("Failed to fetch data:", error);
            }
            setLoading(false)
        };

        fetchData();
    }, []);

    return (
        <div className="ThongKeTongHopDonViHCCTelevisonSwapper">
            <Spin spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <div className="container-fluid header">
                    <img src="/images/logo-quoc-huy-2.png" alt="QuocHuy" id="imgQuocHuy" />
                    <h3>TRUNG TÂM PHỤC VỤ HÀNH CHÍNH CÔNG TỈNH {tenTinh?.toUpperCase()}</h3>
                </div>

                <div className="container-fluid body">
                    <div className="title-form">
                        <strong className="title-form-banner">
                            BẢNG TÌNH HÌNH TIẾP NHẬN VÀ GIẢI QUYẾT THỦ TỤC HÀNH CHÍNH NĂM {YEAR}
                        </strong><br />
                        <i className="title-bottom-form-banner">(Số liệu tự động cập nhật đến 00:00 ngày {dayjs().format(FORMAT_DATE_WITHOUT_TIME)})</i>
                        <br />
                    </div>
                    <table
                        id="table"
                        style={{
                            verticalAlign: "middle",
                            borderCollapse: "collapse",
                            width: "100%",
                            textAlign: "center",
                            margin: "10px 0",
                        }}
                    >
                        <thead>
                            <tr>
                                <td
                                    rowSpan={2}
                                    style={{
                                        verticalAlign: "middle",
                                        padding: "5px",
                                        border: "1px solid #fff",
                                        width: "1%",
                                        textAlign: 'center'
                                    }}
                                >
                                    <strong>STT</strong>
                                </td>
                                <td
                                    rowSpan={2}
                                    style={{
                                        verticalAlign: "middle",
                                        padding: "5px",
                                        border: "1px solid #fff",
                                        width: "15%",
                                        textAlign: 'center'
                                    }}
                                >
                                    <strong>Đơn vị</strong>
                                </td>
                                <td
                                    colSpan={3}
                                    // colSpan={3}
                                    style={{
                                        verticalAlign: "middle",
                                        padding: "5px",
                                        border: "1px solid #fff",
                                        textAlign: 'center'
                                    }}
                                >
                                    <strong>Tiếp nhận</strong>
                                </td>
                                <td
                                    colSpan={4}
                                    style={{
                                        verticalAlign: "middle",
                                        padding: "5px",
                                        border: "1px solid #fff",
                                        textAlign: 'center'
                                    }}
                                >
                                    <strong>Đã xử lý</strong>
                                </td>
                                <td
                                    colSpan={2}
                                    style={{
                                        verticalAlign: "middle",
                                        padding: "5px",
                                        border: "1px solid #fff",
                                        textAlign: 'center'
                                    }}
                                >
                                    <strong>Đang xử lý</strong>
                                </td>
                                <td
                                    rowSpan={2}
                                    style={{
                                        verticalAlign: "middle",
                                        padding: "5px",
                                        border: "1px solid #fff",
                                        textAlign: 'center',
                                        width: "7%",
                                    }}
                                >
                                    <strong>Bổ sung</strong>
                                </td>
                                <td
                                    rowSpan={2}
                                    style={{
                                        verticalAlign: "middle",
                                        padding: "5px",
                                        border: "1px solid #fff",
                                        width: "7%",
                                        textAlign: 'center'
                                    }}
                                >
                                    <strong>Trả lại/ Rút HS</strong>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style={{
                                        verticalAlign: "middle",
                                        padding: "5px",
                                        border: "1px solid #fff",
                                        width: "7%",
                                        textAlign: 'center'
                                    }}
                                >
                                    <strong>Tổng số</strong>
                                </td>
                                <td
                                    style={{
                                        verticalAlign: "middle",
                                        padding: "5px",
                                        border: "1px solid #fff",
                                        width: "7%",
                                        textAlign: 'center'
                                    }}
                                >
                                    <strong>Kỳ trước</strong>
                                </td>

                                <td
                                    style={{
                                        verticalAlign: "middle",
                                        padding: "5px",
                                        border: "1px solid #fff",
                                        width: "7%",
                                        textAlign: 'center'
                                    }}
                                >
                                    <strong>Trong kỳ</strong>
                                </td>

                                <td
                                    style={{
                                        verticalAlign: "middle",
                                        padding: "5px",
                                        border: "1px solid #fff",
                                        width: "7%",
                                        textAlign: 'center'
                                    }}
                                >
                                    <strong>Trước hạn</strong>
                                </td>
                                <td
                                    style={{
                                        verticalAlign: "middle",
                                        padding: "5px",
                                        border: "1px solid #fff",
                                        width: "7%",
                                        textAlign: 'center'
                                    }}
                                >
                                    <strong>Đúng hạn</strong>
                                </td>
                                <td
                                    style={{
                                        verticalAlign: "middle",
                                        padding: "5px",
                                        border: "1px solid #fff",
                                        width: "7%",
                                        textAlign: 'center'
                                    }}
                                >
                                    <strong>Quá hạn</strong>
                                </td>
                                <td
                                    style={{
                                        verticalAlign: "middle",
                                        padding: "5px",
                                        border: "1px solid #fff",
                                        width: "7%",
                                        textAlign: 'center'
                                    }}
                                >
                                    <strong>Tỷ lệ trước hạn, đúng hạn</strong>
                                </td>
                                <td
                                    style={{
                                        verticalAlign: "middle",
                                        padding: "5px",
                                        border: "1px solid #fff",
                                        width: "7%",
                                        textAlign: 'center'
                                    }}
                                >
                                    <strong>Trong hạn</strong>
                                </td>
                                <td
                                    style={{
                                        verticalAlign: "middle",
                                        padding: "5px",
                                        border: "1px solid #fff",
                                        width: "7%",
                                        textAlign: 'center'
                                    }}
                                >
                                    <strong>Quá hạn</strong>
                                </td>
                            </tr>
                        </thead>
                        <tbody id="data">
                            {data && data.length > 0
                                ? data.map((item: any, index: number) =>
                                    getElementThongKe(item, index + 1)
                                )
                                : null}
                            {
                                countSumary()
                            }
                        </tbody>
                    </table>
                </div>
            </Spin >
        </div>
    )
}
export default function ThongKeTongHopDonViHCCTelevisionSwapper() {
    return (
        <BaoCaoTongHopProvider>
            <HoSoTheoBaoCaoTongHopProvider>
                <ThongKeTongHopDonViHCCTelevision />
            </HoSoTheoBaoCaoTongHopProvider>
        </BaoCaoTongHopProvider>
    );
}