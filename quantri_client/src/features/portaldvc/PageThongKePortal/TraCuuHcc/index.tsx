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
import FormTraCuu from "./components/FormTraCuu";
import HuongDanTraCuu from "./components/HuongDanTraCuu";
import { ThongTinHoSoSwapper } from "./components/ThongTinHoSoSwapper";
import { TraCuuHccProvider, useTraCuuHccContext } from "./contexts";
import DanhSachHoSoTraCuu from "./components/DanhSachHoSo";

const TraCuuHcc = () => {
    const dispatch = useAppDispatch()
    const traCuuContext = useTraCuuHccContext()
    const { publicModule: config } = useAppSelector(state => state.config)
    const [tenTinh, setTenTinh] = useState<string>();

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
    
    return (
        <div className="TraCuuHCCTelevisonSwapper commonBackgroundTrongDong">
            <Spin spinning={traCuuContext.loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <div className="container-fluid header">
                    <img src="/images/logo-quoc-huy-2.png" alt="QuocHuy" id="imgQuocHuy" />
                    <h3>TRUNG TÂM PHỤC VỤ HÀNH CHÍNH CÔNG TỈNH {tenTinh?.toUpperCase()}</h3>
                </div>


                <div className="container-fluid body" style={{ minHeight: '80vh' }}>
                    <Row gutter={[24, 24]}>
                        <Col md={8} span={24}>
                            <FormTraCuu />
                        </Col>
                        {traCuuContext.datas || traCuuContext.data
                            ? null :
                            <Col md={16} span={24}>
                                <HuongDanTraCuu />
                            </Col>
                        }
                        {traCuuContext.data
                            ?
                            <Col md={16} span={24}>
                                <ThongTinHoSoSwapper />
                            </Col>
                            :
                            traCuuContext.datas ?
                                <Col md={16} span={24}>
                                    <DanhSachHoSoTraCuu />
                                </Col> : null
                        }
                    </Row>

                </div>
            </Spin >
        </div>
    )
}
export default function TraCuuHccSwapper() {
    return (
        <TraCuuHccProvider>
            <TraCuuHcc />
        </TraCuuHccProvider>
    );
}