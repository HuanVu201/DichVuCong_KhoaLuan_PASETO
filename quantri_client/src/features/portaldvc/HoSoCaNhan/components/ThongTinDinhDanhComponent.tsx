import "./ThongTinDinhDanhComponent.scss"
import iconDVC from "../../../../assets/images/info-white.svg"
import { DiaChi, IUser } from "@/features/user/models";
import { IUserPortal } from "../../UserPortal/models/UserPortal";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import dayjs from 'dayjs'
import { FORMAT_DATE_WITHOUT_TIME } from "@/data";
import { useMemo, useState } from "react";
import { TSTypeHelpers } from "@/lib/typescripts";
import { CheckCircleFilled, EditFilled, LoadingOutlined } from "@ant-design/icons";
import { Button, Spin, Tag } from "antd";
import { toast } from "react-toastify";
import { userService } from "@/features/user/services";
import { GetUser, SearchUser } from "@/features/user/redux/Actions";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { gioiTinhMap } from "@/features/user/datamap/datamap";


function ThongTinDinhDanhComponent() {
    const dispatch = useAppDispatch()
    const { data: user, loading } = useAppSelector(state => state.user)
    const { data: auth } = useAppSelector((state) => state.auth);
    const [editInfo, setEditInfo] = useState<boolean>(false)
    const [loadingEffect, setLoadingEffect] = useState<boolean>(false)
    const email: any = document.querySelector('#email')
    const soDienThoai: any = document.querySelector('#soDienThoai')
    const { executeRecaptcha } = useGoogleReCaptcha();
    const { publicModule } = useAppSelector(state => state.config)
    const recaptchaSiteKey = useMemo(() => {
        return publicModule?.find(module => module.code === "recaptcha_site_key")?.content || ""
    }, [publicModule])

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

    const turnOnEdit = () => {
        setEditInfo(true)
        soDienThoai.value = user?.phoneNumber
        email.value = user?.email == user?.soDinhDanh + "@dichvucong.gov.vn" ? "" : user?.email

    }
    const saveInfoUserHandler = () => {
        let check = true
        if (!soDienThoai.value) {
            toast.error("Hãy điền đầy đủ thông tin!")
            soDienThoai.focus()
            check = false
        }
        if (!email.value) {
            toast.error("Hãy điền đầy đủ thông tin!")
            email.focus()
            check = false
        }
        if (!check) return
        if (!isValidPhoneNumber(soDienThoai.value)) {
            toast.error("Số điện thoại không hợp lệ!")
            soDienThoai.focus()
            check = false
        }
        if (!isValidEmail(email.value)) {
            toast.error("Email không hợp lệ!")
            email.focus()
            check = false
        }

        if (!check) return

        (async () => {
            if (user?.userName && auth?.token) {
                setLoadingEffect(true)
                const res = await userService.UpdateEmailAndPhoneNumberPortal({
                    userName: user.userName,
                    email: email.value,
                    phoneNumber: soDienThoai.value,
                })

                if (res.data == true) {
                    toast.success("Cập nhật thành công!")
                    dispatch(GetUser({ token: auth.token }))
                    handlerCancel()
                } else {
                    toast.error("Thao tác thất bại!")
                }
                setLoadingEffect(false)
            }

        })()




    }

    const handlerCancel = () => {
        setEditInfo(false)
        soDienThoai.value = ''
        email.value = ''
    }


    const confirmDinhDanh = async () => {
        if (user?.userName && auth?.token) {
            if (!executeRecaptcha) {
                toast.error("Mã Recaptcha không tồn tại!")
                console.log('Execute recaptcha not yet available');
                return;
            }

            const token = await executeRecaptcha('congDanDinhDanh_portal');
            setLoadingEffect(true)
            const res = await userService.ConfirmCongDanDinhDanh({
                MaCaptCha: token
            })

            if (res.data == true) {
                toast.success("Cập nhật thành công!")
                dispatch(GetUser({ token: auth.token }))
                handlerCancel()
            } else {
                toast.error("Thao tác thất bại!")
            }
            setLoadingEffect(false)
        }
    }

    function isValidEmail(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Hàm kiểm tra định dạng số điện thoại (ví dụ: số điện thoại Việt Nam)
    function isValidPhoneNumber(phoneNumber: string) {
        const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})\b/;
        return phoneRegex.test(phoneNumber);
    }

    return (

        <Spin spinning={loading || loadingEffect}
            indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
        >
            <div className="thongTinDinhDanh">
                <div className="main-title">
                    <div className="icon">
                        <img src={iconDVC} />
                    </div>
                    <div className="title">Thông tin định danh</div>
                </div>

                <div className="infoUser">
                    <div className="editBlock"
                        style={{ position: 'absolute', right: 20 }}
                        hidden={editInfo}
                    >
                        <EditFilled className="btnEditInfo" title="Sửa thông tin cá nhân"
                            onClick={() => turnOnEdit()}


                        />
                    </div>
                    <div className="content">
                        <div className="row">
                            <div className="col-4 title">
                                <label>Họ tên</label>
                            </div>
                            <div className="col-8 data">
                                <label className="font-weight-bold">
                                    {user?.fullName || user?.userName}
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 title">
                                <label>Số CMT (9 số)</label>
                            </div>
                            <div className="col-8 data">
                                <label className="font-weight-bold">
                                    {user?.soCMND}
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 title">
                                <label>Số CMT/CCCD (12 số)</label>
                            </div>
                            <div className="col-8 data">
                                <label className="font-weight-bold">
                                    {user?.soDinhDanh}
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 title">
                                <label>Ngày sinh</label>
                            </div>
                            <div className="col-8 data">
                                <label className="font-weight-bold">
                                    {user?.ngayThangNamSinh ? dayjs(JSON.parse(user.ngayThangNamSinh as unknown as string).NgayThangNam).format(FORMAT_DATE_WITHOUT_TIME) : user?.namSinh}
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 title">
                                <label>Giới tính</label>
                            </div>
                            <div className="col-8 data">
                                <label className="font-weight-bold">
                                    {gioiTinhMap[user?.gioiTinh as any] ? gioiTinhMap[user?.gioiTinh as any] : "Khác"}
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 title">
                                <label>Số điện thoại</label>
                            </div>
                            <div className="col-8 data">
                                <label className="font-weight-bold"
                                    hidden={editInfo}
                                >
                                    {user?.phoneNumber}
                                </label>
                                <input type="text" id="soDienThoai" className="form-control" name='soDienThoai' placeholder="Nhập số điện thoại" hidden={!editInfo} />
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-4 title">
                                <label>Email</label>
                            </div>
                            <div className="col-8 data">
                                <label className="font-weight-bold" hidden={editInfo}>
                                    {user?.email == user?.soDinhDanh + "@dichvucong.gov.vn" ? "" : user?.email}
                                </label>
                                <input type="text" id="email" className="form-control" name='email' placeholder="Nhập email" hidden={!editInfo} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 title">
                                <label>Nơi sinh</label>
                            </div>
                            <div className="col-8 data">
                                <label className="font-weight-bold">
                                    {diaChiKhaiSinh.startsWith(",") ? diaChiKhaiSinh?.substring(1) || "" : diaChiKhaiSinh}
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 title">
                                <label>Quê quán</label>
                            </div>
                            <div className="col-8 data">
                                <label className="font-weight-bold">
                                    {diaChiQueQuan.startsWith(",") ? diaChiQueQuan?.substring(1) || "" : diaChiQueQuan}
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 title">
                                <label>Địa chỉ thường trú</label>
                            </div>
                            <div className="col-8 data">
                                <label className="font-weight-bold">
                                    {diaChiThuongTru.startsWith(",") ? diaChiThuongTru.substring(1) || "" : diaChiThuongTru}
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 title">
                                <label>Định danh công dân</label>
                            </div>
                            <div className="col-8 data">
                                <label className="font-weight-bold">
                                    {user?.congDanDinhDanh
                                        ?
                                        <Tag bordered={false} color="success">
                                            <CheckCircleFilled /> Đã định danh
                                        </Tag>
                                        :
                                        <Tag id="confirmDinhDanh" color="#489328" title="Nhấn để xác nhận"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => confirmDinhDanh()}
                                        >
                                            Xác nhận định danh
                                        </Tag>
                                    }


                                </label>
                            </div>
                        </div>
                        <div className="text-center col-12"
                            style={{ display: 'flex', justifyContent: 'center', gap: 10 }}
                            hidden={!editInfo}
                        >
                            <button type="button" className="btn btn-success" style={{ padding: '3px 6px' }}
                                onClick={() => saveInfoUserHandler()}
                            >
                                Lưu thông tin
                            </button>
                            <button type="button" className="btn btn-outline-secondary" style={{ padding: '3px 6px' }}
                                onClick={() => handlerCancel()}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Spin>

    );
}


export default ThongTinDinhDanhComponent;