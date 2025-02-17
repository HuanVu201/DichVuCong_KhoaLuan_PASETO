import "./Sidebar.scss"
import avataDefault from "../../../../assets/images/user-avatar.png"
import iconThongTinDinhDanh from "../../../../assets/images/iconThongTinDinhDanh.svg"
import iconDVC from "../../../../assets/images/iconDVC.svg"
import iconTaiLieuDienTu from "../../../../assets/images/documentIcon.svg"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { IUser } from "@/features/user/models";
import { IUserPortal } from "../../UserPortal/models/UserPortal";
import { Link } from "react-router-dom";
import { Service } from "@/services";
import { useEffect, useState } from "react";
import { ThongKeHoSoNguoiDung } from "@/features/hoso/redux/action";
import { DollarOutlined, ExceptionOutlined, FileDoneOutlined, FileSearchOutlined, HighlightOutlined, SnippetsOutlined, SolutionOutlined, UserOutlined } from "@ant-design/icons"
import { PORTAL_PRIMARY_COLOR } from "@/data"


function SidebarProfileComponent() {
    const dispatch = useAppDispatch()
    const { data: user } = useAppSelector(state => state.user)
    const { hoSoNguoiDung } = useAppSelector(state => state.hoso)
    const [khoTaiLieuCongDanVisible, setKhoTaiLieuCongDanVisible] = useState<boolean>(false)
    const [khoTaiLieuDienTuVisible, setKhoTaiLieuDienTuVisible] = useState<boolean>(false)
    const [chuKySoCaNhanVisible, setChuKySoCaNhanVisible] = useState<boolean>(false)
    const { publicModule: config } = useAppSelector(state => state.config)
    useEffect(() => {
        config?.map((item: any) => {
            if (item.code == 'quan-ly-kho-tai-lieu-cong-dan' && item.content == '1')
                setKhoTaiLieuCongDanVisible(true)
            if (item.code == 'quan-ly-kho-tai-lieu-dien-tu' && item.content == '1')
                setKhoTaiLieuDienTuVisible(true)
            if (item.code == 'quan-ly-chu-ky-so-ca-nhan' && item.content == '1')
                setChuKySoCaNhanVisible(true)
        })
    }, [config])
    useEffect(() => {
        if (hoSoNguoiDung === undefined) {
            dispatch(ThongKeHoSoNguoiDung())
        }
    }, [hoSoNguoiDung])

    return (
        <div className="sidebarProfile">
            <div className="user sidebarProfile_item">
                <div className="avatar" >
                    <img src={user?.imageUrl || avataDefault} />
                </div>
                <div className="username">
                    {user?.fullName || user?.userName}
                </div>
            </div>
            <div className="box-info sidebarProfile_item">
                <div className="info">
                    <div className="value" id="finishNumber" style={{ color: "#36B37E" }}>
                        {hoSoNguoiDung?.tongSoHoSoDaHoanThanh ?? 0}
                    </div>
                    <p className="key">
                        Hồ sơ đã hoàn thành
                    </p>
                </div>
                <div className="info">
                    <div className="value" id="processingNumber" style={{ color: "#FFAB00" }}>
                        {hoSoNguoiDung?.tongSoHoSoDangXuLy ?? 0}
                    </div>
                    <p className="key">
                        Hồ sơ đang xử lý
                    </p>
                </div>
            </div>

            <div className="list-menus sidebarProfile_item">
                <Link to={Service.primaryRoutes.portaldvc.hosocanhan.thongTinDinhDanh} className="list-menus_item">
                    <div className="icon">
                        <UserOutlined style={{ color: PORTAL_PRIMARY_COLOR }} />
                    </div>
                    <span className="title">
                        Thông tin tài khoản
                    </span>
                </Link>
                <Link to={Service.primaryRoutes.portaldvc.hosocanhan.dichVuCongCuaToi} className="list-menus_item">
                    <div className="icon">
                        <FileSearchOutlined style={{ color: PORTAL_PRIMARY_COLOR }} />
                    </div>
                    <span className="title">
                        Quản lý dịch vụ công
                    </span>
                </Link>
                <Link to={Service.primaryRoutes.portaldvc.hosocanhan.thanhToanPhiLePhi} className="list-menus_item">
                    <div className="icon">
                        <DollarOutlined style={{ color: PORTAL_PRIMARY_COLOR }} />
                    </div>
                    <span className="title">
                        Thanh toán phí, lệ phí
                    </span>
                </Link>
                <Link to={Service.primaryRoutes.portaldvc.hosocanhan.taiLieuDienTu} className="list-menus_item">
                    <div className="icon">
                        <FileDoneOutlined style={{ color: PORTAL_PRIMARY_COLOR }} />
                    </div>
                    <span className="title">
                        Tài liệu điện tử
                    </span>
                </Link>
                <Link to={Service.primaryRoutes.portaldvc.hosocanhan.hoSoLuuTru} className="list-menus_item">
                    <div className="icon">
                        <SolutionOutlined style={{ color: PORTAL_PRIMARY_COLOR }} />
                    </div>
                    <span className="title">
                        Hồ sơ chưa gửi
                    </span>
                </Link>
                {
                    khoTaiLieuCongDanVisible && user?.soDinhDanh ?
                        <Link to={Service.primaryRoutes.portaldvc.hosocanhan.taiLieuCongDan} className="list-menus_item">
                            <div className="icon">
                                <SnippetsOutlined style={{ color: PORTAL_PRIMARY_COLOR }} />
                            </div>
                            <span className="title">
                                Kho tài liệu cá nhân
                            </span>
                        </Link>
                        : null
                }
                {
                    khoTaiLieuDienTuVisible && user?.soDinhDanh ?
                        <Link to={Service.primaryRoutes.portaldvc.hosocanhan.khoTaiLieuDienTu} className="list-menus_item">
                            <div className="icon">
                                <SnippetsOutlined style={{ color: PORTAL_PRIMARY_COLOR }} />
                            </div>
                            <span className="title">
                                Kho tài liệu điện tử
                            </span>
                        </Link>
                        : null
                }
                {
                    chuKySoCaNhanVisible && user?.soDinhDanh ?
                        <Link to={Service.primaryRoutes.portaldvc.hosocanhan.chuKyDienTu} className="list-menus_item">
                            <div className="icon">
                                <HighlightOutlined style={{ color: PORTAL_PRIMARY_COLOR }} />
                            </div>
                            <span className="title">
                                Chữ ký số cá nhân
                            </span>
                        </Link>
                        : null
                }
            </div>

        </div>
    );
}

export default SidebarProfileComponent;