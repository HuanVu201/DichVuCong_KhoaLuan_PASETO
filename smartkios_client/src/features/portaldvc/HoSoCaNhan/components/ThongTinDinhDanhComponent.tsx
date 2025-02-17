import "./ThongTinDinhDanhComponent.scss"
import iconDVC from "../../../../assets/images/info-white.svg"
import { DiaChi, IUser } from "@/features/user/models";
import { IUserPortal } from "../../UserPortal/models/UserPortal";
import { useAppSelector } from "@/lib/redux/Hooks";
import dayjs from 'dayjs'
import { FORMAT_DATE_WITHOUT_TIME } from "@/data";
import { useMemo } from "react";
import { TSTypeHelpers } from "@/lib/typescripts";

function ThongTinDinhDanhComponent() {
    const { data: user } = useAppSelector(state => state.user)
    const { diaChiKhaiSinh, diaChiThuongTru, diaChiQueQuan } = useMemo(() => {
        let diaChiKhaiSinh = user?.noiDangKyKhaiSinh ? JSON.parse(user.noiDangKyKhaiSinh) : ""
        let diaChiThuongTru = user?.thuongTru ? JSON.parse(user.thuongTru) : ""
        let diaChiQueQuan = user?.queQuan ? JSON.parse(user.queQuan) : ""

        if (diaChiKhaiSinh) {
            diaChiKhaiSinh = (diaChiKhaiSinh as TSTypeHelpers.CapitalizeAllKeys<DiaChi>).ChiTiet + ", " + (diaChiKhaiSinh as TSTypeHelpers.CapitalizeAllKeys<DiaChi>).TenPhuongXa + ", " + (diaChiKhaiSinh as TSTypeHelpers.CapitalizeAllKeys<DiaChi>).TenQuanHuyen + ", " + (diaChiKhaiSinh as TSTypeHelpers.CapitalizeAllKeys<DiaChi>).TenTinhThanh
            diaChiKhaiSinh = diaChiKhaiSinh.replace(null, "")
        }
        if (diaChiThuongTru) {
            diaChiThuongTru = (diaChiThuongTru as TSTypeHelpers.CapitalizeAllKeys<DiaChi>).ChiTiet + ", " + (diaChiThuongTru as TSTypeHelpers.CapitalizeAllKeys<DiaChi>).TenPhuongXa + ", " + (diaChiThuongTru as TSTypeHelpers.CapitalizeAllKeys<DiaChi>).TenQuanHuyen + ", " + (diaChiThuongTru as TSTypeHelpers.CapitalizeAllKeys<DiaChi>).TenTinhThanh
            diaChiThuongTru = diaChiThuongTru.replace(null, "")
        }
        if (diaChiQueQuan) {
            diaChiQueQuan = (diaChiQueQuan as TSTypeHelpers.CapitalizeAllKeys<DiaChi>).ChiTiet + ", " + (diaChiQueQuan as TSTypeHelpers.CapitalizeAllKeys<DiaChi>).TenPhuongXa + ", " + (diaChiQueQuan as TSTypeHelpers.CapitalizeAllKeys<DiaChi>).TenQuanHuyen + ", " + (diaChiQueQuan as TSTypeHelpers.CapitalizeAllKeys<DiaChi>).TenTinhThanh
            diaChiQueQuan = diaChiQueQuan.replace(null, "")
        }
        return {
            diaChiKhaiSinh, diaChiThuongTru, diaChiQueQuan
        }
    }, [user])
    return (
        <div className="thongTinDinhDanh">
            <div className="main-title">
                <div className="icon">
                    <img src={iconDVC} />
                </div>
                <div className="title">Thông tin định danh</div>
            </div>

            <div className="infoUser">
                
                <div className="content">
                    <div className="row">
                        <div className="col-sm-4 title">
                            <label>Họ tên</label>
                        </div>
                        <div className="col-sm-8 data">
                            <label className="font-weight-bold">
                                {user?.fullName || user?.userName}
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 title">
                            <label>Số CMT (9 số)</label>
                        </div>
                        <div className="col-sm-8 data">
                            <label className="font-weight-bold">
                                {user?.soCMND}
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 title">
                            <label>Số CMT/CCCD (12 số)</label>
                        </div>
                        <div className="col-sm-8 data">
                            <label className="font-weight-bold">
                                {user?.soDinhDanh}
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 title">
                            <label>Ngày sinh</label>
                        </div>
                        <div className="col-sm-8 data">
                            <label className="font-weight-bold">
                                {user?.ngayThangNamSinh ? dayjs(JSON.parse(user.ngayThangNamSinh as unknown as string).NgayThangNam).format(FORMAT_DATE_WITHOUT_TIME) : user?.namSinh}
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 title">
                            <label>Số điện thoại</label>
                        </div>
                        <div className="col-sm-8 data">
                            <label className="font-weight-bold">
                                {user?.phoneNumber}
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 title">
                            <label>Giới tính</label>
                        </div>
                        <div className="col-sm-8 data">
                            <label className="font-weight-bold">
                                {user?.gioiTinh == "1" ? "Nam" : (user?.gioiTinh == "0" ? "Nữ" : "Khác")}
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 title">
                            <label>Nơi sinh</label>
                        </div>
                        <div className="col-sm-8 data">
                            <label className="font-weight-bold">
                                {diaChiKhaiSinh.startsWith(",") ? diaChiKhaiSinh?.substring(1) || "" : diaChiKhaiSinh}
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 title">
                            <label>Email</label>
                        </div>
                        <div className="col-sm-8 data">
                            <label className="font-weight-bold">
                                {user?.email}
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 title">
                            <label>Quê quán</label>
                        </div>
                        <div className="col-sm-8 data">
                            <label className="font-weight-bold">
                                {diaChiQueQuan.startsWith(",") ? diaChiQueQuan?.substring(1) || "" : diaChiQueQuan}
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 title">
                            <label>Địa chỉ thường trú</label>
                        </div>
                        <div className="col-sm-8 data">
                            <label className="font-weight-bold">
                                {diaChiThuongTru.startsWith(",") ? diaChiThuongTru.substring(1) || "" : diaChiThuongTru}
                            </label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ThongTinDinhDanhComponent;