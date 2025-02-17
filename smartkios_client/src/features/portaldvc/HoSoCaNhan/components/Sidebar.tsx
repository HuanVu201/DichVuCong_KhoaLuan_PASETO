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
import { useEffect } from "react";
import { ThongKeHoSoNguoiDung } from "@/features/hoso/redux/action";
import { DollarOutlined, FileDoneOutlined, FileSearchOutlined, UserOutlined } from "@ant-design/icons"
import { PORTAL_PRIMARY_COLOR } from "@/data"


function SidebarProfileComponent() {
    const dispatch = useAppDispatch()
    const { data: user } = useAppSelector(state => state.user)
    const { hoSoNguoiDung } = useAppSelector(state => state.hoso)

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
                        <UserOutlined style={{color: PORTAL_PRIMARY_COLOR}}/>
                    </div>
                    <span className="title">
                        Thông tin tài khoản
                    </span>
                </Link>
                <Link to={Service.primaryRoutes.portaldvc.hosocanhan.dichVuCongCuaToi} className="list-menus_item">
                    <div className="icon">
                        <FileSearchOutlined style={{color: PORTAL_PRIMARY_COLOR}}/>
                    </div>
                    <span className="title">
                        Quản lý dịch vụ công
                    </span>
                </Link>
                <Link to={Service.primaryRoutes.portaldvc.hosocanhan.thanhToanPhiLePhi} className="list-menus_item">
                    <div className="icon">
                        <DollarOutlined style={{color: PORTAL_PRIMARY_COLOR}}/>
                    </div>
                    <span className="title">
                        Thanh toán phí, lệ phí
                    </span>
                </Link>
                <Link to={Service.primaryRoutes.portaldvc.hosocanhan.taiLieuDienTu} className="list-menus_item">
                    <div className="icon">
                        <FileDoneOutlined style={{color: PORTAL_PRIMARY_COLOR}}/>
                    </div>
                    <span className="title">
                        Tài liệu điện tử
                    </span>
                </Link>
            </div>

        </div>
    );
}

export default SidebarProfileComponent;