
import { AntdButton, AntdModal } from "../.."
import { Link, useLocation, useNavigate } from "react-router-dom";
import quocHuyVn from '../../../../../assets/images/Quoc_Huy_Viet_Nam_Chuan.png'
import logoHcc from '../../../../../assets/images/hccLogo.png'
import logoBCA from '../../../../../assets/images/logo_bca.png'
import './LoginModal.scss'
import { Service } from "@/services";
import { useEffect, useMemo, useState } from "react";
import { IQuanLyLienKet } from "@/features/portaldvc_admin/QuanLyLienKet/models";
import { CrudLocalStorage } from "@/services/localstorage";
import { ZaloQrLayout } from "./ZaloQrModal";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchPublicConfig } from "@/features/config/redux/action";


export const LoginModalLayout = ({ handlerCancel }: { handlerCancel: () => void }) => {
    const navigate = useNavigate();
    const [showZaloQrModal, setShowZaloQrModal] = useState(false)
    const [typeLogin, setTypeLogin] = useState<string>('')
    const crudLocalStorage = new CrudLocalStorage();
    const location = useLocation()
    const { publicModule: config } = useAppSelector(state => state.config)


    const CheckZaloModal: boolean = config?.find(x => x.code == "login_zalo_qr_modal")?.content ? true : false

    let quanlylienkets = crudLocalStorage.getWithExpriry('quanlylienket');

    const [linkDangNhapCanBo, linkDangNhapCongDan, linkDangNhapVNeId] = useMemo(() => {
        let linkDangNhapCongDan: string = ""
        let linkDangNhapCanBo: string = ""
        let linkDangNhapVNeId: string = ""
        quanlylienkets?.data?.forEach((item: IQuanLyLienKet) => {
            if (item.ma === "dang-nhap-can-bo") {
                linkDangNhapCanBo = item.linkLienKet
            }
            if (item.ma === "dang-nhap-cong-dan") {
                linkDangNhapCongDan = item.linkLienKet;
            }
            if (item.ma === "dang-nhap-vneid") {
                linkDangNhapVNeId = item.linkLienKet;
            }
        })
        return [linkDangNhapCanBo, linkDangNhapCongDan, linkDangNhapVNeId]
    }, [quanlylienkets])

    const loginHandler = () => {
        if (top?.window) {
            top.location = linkDangNhapCanBo;
        }
    }

    return <AntdModal visible={true} title={""} width={'fit-content'} footer={null} handlerCancel={handlerCancel}>
        <div className="loginPortal" style={{ textAlign: "center", width: '100%' }} >
            <div className="loginBlock">
                <div className="title_loginPortal">
                    <b>CÔNG DÂN/DOANH NGHIỆP ĐĂNG NHẬP</b>
                </div>
                <div className="contentBlockSwapper">
                    {CheckZaloModal
                        ?
                        <div className="contentBlock CongDan">
                            <div className="insideContent" onClick={() => {
                                setShowZaloQrModal(true)
                                setTypeLogin('Đăng nhập với DVC Quốc gia')
                            }}>
                                <div className="imgBlock">
                                    <img className="imgLogin" src='/images/Quoc_Huy_Viet_Nam_Chuan.png' alt="" />
                                </div>
                                <b>ĐĂNG NHẬP</b>
                                <span>Tài khoản cấp bởi<br />Cổng dịch vụ công quốc gia</span>
                            </div>
                            <div className="insideContent" onClick={() => {
                                setShowZaloQrModal(true)
                                setTypeLogin('Đăng nhập với VNeID')
                            }} >
                                <div className="imgBlock">
                                    <img className="imgLogin" src='/images/logo_bca.png' alt="" />
                                </div>
                                <b>ĐĂNG NHẬP</b>
                                <span>Tài khoản Định danh điện tử cấp bởi<br />Bộ Công An</span>
                            </div>
                        </div>
                        :
                        <div className="contentBlock CongDan">
                            <Link className="insideContent" to={linkDangNhapCongDan} style={{ color: '#333' }}>
                                <div className="imgBlock">
                                    <img className="imgLogin" src='/images/Quoc_Huy_Viet_Nam_Chuan.png' alt="" />
                                </div>
                                <b>ĐĂNG NHẬP</b>
                                <span>Tài khoản cấp bởi<br />Cổng dịch vụ công quốc gia</span>
                            </Link>
                            <Link to={linkDangNhapVNeId} className="insideContent" style={{ color: '#333' }}>
                                <div className="imgBlock">
                                    <img className="imgLogin" src='/images/logo_bca.png' alt="" />
                                </div>
                                <b>ĐĂNG NHẬP</b>
                                <span>Tài khoản Định danh điện tử cấp bởi<br />Bộ Công An</span>
                            </Link>
                        </div>

                    }
                </div>
            </div>
            <div className="loginBlock">
                <div className="title_loginPortal">
                    <b>CÁN BỘ ĐĂNG NHẬP</b>
                </div>
                <div className="contentBlockSwapper">
                    <div className="contentBlock CanBo">
                        <p onClick={async () => loginHandler()} className="insideContent insideContentCanBo" style={{ color: '#333' }}>
                            <div className="imgBlock">
                                <img className="imgLogin" src='/images/hccLogo.png' alt="" />
                            </div>
                            <b>ĐĂNG NHẬP</b>
                            <span>Đăng nhập dành cho công chức</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <ZaloQrLayout visible={showZaloQrModal} handlerCancel={() => setShowZaloQrModal(false)} typeLogin={typeLogin} />
    </AntdModal>
}