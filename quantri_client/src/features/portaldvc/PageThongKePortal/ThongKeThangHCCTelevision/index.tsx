import { MONTH, YEAR } from "@/data";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SearchPublicConfig } from "@/features/config/redux/action";
import { toast } from "react-toastify";
import './index.scss'
import { getCurrencyThongKe } from "@/utils";
import { IBaoCaoDonVi } from "@/features/baocaotonghop/model";
import { HoSoTheoBaoCaoTongHopProvider } from "@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext";
import { BaoCaoTongHopProvider } from "@/features/thongKe/ThongKeTheoDonVi/context/BaoCaoTongHopContext";
import { BaoCaoTongHopDonViAction } from "@/features/baocaotonghop/redux/action";
import { Col, Row, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { BannerService } from "@/lib/antd/components/BothLayout/Services/banner";
import { Service } from "@/services";
import LogoTTHCThanhHoa from "../../../../assets/images/logo-TTHC_ThanhHoa.svg"

const ThongKeThangHCCTelevision = () => {
    const dispatch = useAppDispatch()
    const { publicModule: config } = useAppSelector(state => state.config)
    const [loading, setLoading] = useState<boolean>(false);
    var bannerServices = new BannerService();
    const [banner, setBanner] = useState<string>("");
    var [data, setData] = useState<IBaoCaoDonVi[]>([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const maDinhDanhCha = searchParams.get('MaDinhDanh');
    const catalog = searchParams.get('Catalog');
    const thangParams: any = searchParams.get('Thang');
    const namParams: any = searchParams.get('Nam');


    useEffect(() => {
        if (!config)
            dispatch(SearchPublicConfig())
    }, [])

    useEffect(() => {
        (async () => {
            let resBanners = await bannerServices.Search({});
            if (resBanners?.data?.data) {
                let resBanner = resBanners.data.data.filter((x) => x.suDung);
                let tmp = resBanner[0];
                setBanner(tmp.imageUrl);
            }
        })();
    }, []);

    useEffect(() => {
        const eleEMC: any = document.querySelector('#yhy-append')
        if (eleEMC)
            eleEMC.style.display = 'none'
    }, [])

    function getFirstAndLastDayOfMonth() {
        let month: number, year: number

        if (thangParams && !isNaN(thangParams)) month = thangParams as any
        else month = new Date().getMonth() + 1

        if (namParams && !isNaN(namParams)) year = namParams as any
        else year = new Date().getFullYear()

        const firstDay = new Date(year, month - 1, 2);
        const lastDay = new Date(year, month, 1);
        const formatDate = (date: Date) => date.toISOString().split('T')[0];

        return {
            firstDay: formatDate(firstDay),
            lastDay: formatDate(lastDay)
        };
    }


    const getElementThongKe = (item: IBaoCaoDonVi, index: number) => {
        return (
            <Col md={12} lg={6} span={12} className="statisticItem" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="infoStatistic" >
                    <div className="leftSide">
                        <p>Tiếp nhận: {getCurrencyThongKe(item.tongSo)} hồ sơ</p>
                        <p>Tiếp nhận kỳ trước: {getCurrencyThongKe(item.tiepNhanKyTruoc)} hồ sơ</p>
                        <p>Đã xử lý: {getCurrencyThongKe(item.daXuLyTruocHan + item.daXuLyDungHan + item.daXuLyQuaHan)} hồ sơ</p>
                        <p>Trước hạn, đúng hạn: {getCurrencyThongKe(item.daXuLyTruocHan + item.daXuLyDungHan)} hồ sơ</p>
                    </div>
                    <div className="rightSide">
                        <p className="tyLeDungHan">
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
                                : "-%"}
                        </p>
                        <p>Trước hạn, đúng hạn</p>
                    </div>
                </div>
                <div className="nameItem" style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <p>{item.tenThongKe}</p>
                </div>
            </Col>
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await dispatch(
                    BaoCaoTongHopDonViAction({
                        tuNgay: getFirstAndLastDayOfMonth().firstDay,
                        denNgay: getFirstAndLastDayOfMonth().lastDay,
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
        <div className="ThongKeThangHCCTelevisonSwapper">
            <Spin spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <div className="container-fluid header">
                    <div className="bannerTelevision">
                        <Link to={Service.primaryRoutes.portaldvc.home}>
                            <img
                                className="logo"
                                src={banner}
                            // src={LogoTTHCThanhHoa}
                            />

                        </Link>
                    </div>

                </div>

                <div className="container-fluid body">
                    <div className="title-form">
                        <strong className="title-form-banner">
                            Tình hình xử lý hồ sơ tháng {thangParams ?? MONTH} năm {namParams ?? YEAR}
                        </strong><br />
                    </div>
                    <div className="body-content">
                        <Row gutter={[16, 16]} className="listStatisticItem" style={{ display: 'flex', alignItems: 'stretch' }}>
                            {data && data.length > 0
                                ? data.map((item: any, index: number) =>
                                    getElementThongKe(item, index + 1)
                                )
                                : null}
                        </Row>
                    </div>

                </div>
            </Spin >
        </div>
    )
}
export default function ThongKeThangHCCTelevisionSwapper() {
    return (
        <BaoCaoTongHopProvider>
            <HoSoTheoBaoCaoTongHopProvider>
                <ThongKeThangHCCTelevision />
            </HoSoTheoBaoCaoTongHopProvider>
        </BaoCaoTongHopProvider>
    );
}