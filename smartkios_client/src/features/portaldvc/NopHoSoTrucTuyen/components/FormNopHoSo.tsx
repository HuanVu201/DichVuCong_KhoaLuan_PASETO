import './FormNopHoSo.scss'
import { Affix, Checkbox, Col, Form, Input, Row, Spin, Tag } from "antd"
import { NguoiUyQuyen } from "./NguoiUyQuyen"
import { ComponentProps, ElementRef, useEffect, useMemo, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { AddHoSoTrucTuyen } from "@/features/hoso/redux/action"
import { GetDuLieuThemHoSo } from "@/features/truonghopthutuc/redux/action"
import { TepTinDinhKem } from "./TepTinDinhKem"
import { AntdButton, AntdStep, AntdStepProps } from "@/lib/antd/components"
import { DiaChi } from "@/features/user/models"
import { TSTypeHelpers } from "@/lib/typescripts"
import { toast } from "react-toastify"
import { deleteObjectKeyValues } from "@/utils/common"
import { IThemHoSo } from "@/features/hoso/components/actions/themMoiHoSo/ThemMoiTiepNhanHoSoModal"
import dayjs from 'dayjs'
import { SetURLSearchParams, useSearchParams } from "react-router-dom"
import { resetDuLieuThemHoSo } from "@/features/truonghopthutuc/redux/slice"
import { SearchDanhMucDiaBan } from "@/features/danhmucdiaban/redux/action"
import { ThongTinHoSo } from "./ThongTinHoSo"
import { IDanhMucDiaBan } from "@/features/danhmucdiaban/models"
import { NopThanhCongModal } from "./NopThanhCongModal"
import { sendEMCAction } from "@/utils/emc"
import { IDeleteFiles } from '@/models'
import { FormHeader } from './FormHeader'
import { MUCDO_THUTUC } from '@/features/thutuc/data'
import { StepProps, StepsProps } from 'antd/lib'
import { NopHoSoStep } from './NopHoSoStep'
import { FORMAT_DATE, FORMAT_DATE_FORMIO, PORTAL_PRIMARY_COLOR } from '@/data'
import { NopHoSoTheoBuoc } from './ChonDVC/NopHoSoTheoBuoc'

export type DiaBanUyQuyen = { maHuyen: IDanhMucDiaBan[]; maXa: IDanhMucDiaBan[] }
export type DiaBanChuHoSo = { maTinh: IDanhMucDiaBan[]; maHuyen: IDanhMucDiaBan[]; maXa: IDanhMucDiaBan[] }

const getDiaChi = (maTinh: string | undefined, maHuyen: string | undefined, maXa: string | undefined, prefix: string | undefined, arr: IDanhMucDiaBan[]) => {
    let tenTinh = ""
    let tenHuyen = ""
    let tenXa = ""
    arr.forEach(item => {
        if (item.maDiaBan == maTinh) {
            tenTinh = item.tenDiaBan
        } else if (item.maDiaBan == maHuyen) {
            tenHuyen = item.tenDiaBan
        } else if (item.maDiaBan == maXa) {
            tenXa = item.tenDiaBan
        }
    })
    const res = `${prefix}, ${tenXa}, ${tenHuyen}, ${tenTinh}`
    return res.startsWith(",") ? res.substring(res.indexOf(",")).trim() : res.trim()
}

export const FormNopHoSo = ({ searchParams, setSearchParams}: {searchParams?: URLSearchParams; setSearchParams?: SetURLSearchParams;}) => {
    const [form] = Form.useForm<IThemHoSo & IDeleteFiles>()
    const dispatch = useAppDispatch()
    const [btnLoading, setBtnLoading] = useState(false)
    const { duLieuThemHoSo } = useAppSelector(state => state.truonghopthutuc)
    const { data: user } = useAppSelector(state => state.user)
    const [showModal, setShowModal] = useState(false)
    const [submittedHoSo, setSubmitedHoSo] = useState<React.ComponentProps<typeof NopThanhCongModal>["hoSo"]>()
    const stepRef = useRef<HTMLDivElement[]>([])
    const anThongTinLienHeNopTrucTuyen = duLieuThemHoSo?.truongHopthuTuc.anThongTinLienHeNopTrucTuyen
    const hasEFormData = duLieuThemHoSo?.truongHopthuTuc.eForm != null && duLieuThemHoSo?.truongHopthuTuc.eForm != ""
    const uyQuyen = Form.useWatch("uyQuyen", form)
    const [diaBanUyQuyen, setDiaBanUyQuyen] = useState<DiaBanUyQuyen>({
        maHuyen: [],
        maXa: [],
    })
    const [diaBanChuHoSo, setDiaBanChuHoSo] = useState<DiaBanChuHoSo>({
        maTinh: [],
        maHuyen: [],
        maXa: [],
    })
    const { maTinh, maHuyen, maXa } = useAppSelector(state => state.danhmucdiaban)

    useEffect(() => {
        if (maTinh) {
            setDiaBanChuHoSo((curr) => ({ ...curr, maTinh: maTinh }))
        }
        if (maHuyen) {
            setDiaBanUyQuyen((curr) => ({ ...curr, maHuyen: maHuyen }))
            setDiaBanChuHoSo((curr) => ({ ...curr, maHuyen: maHuyen }))
        }
        if (maXa) {
            setDiaBanUyQuyen((curr) => ({ ...curr, maXa: maXa }))
            setDiaBanChuHoSo((curr) => ({ ...curr, maXa: maXa }))
        }
    }, [maHuyen, maXa])
    const onFinish = async (formData: any) => {
        const cloneFormData: IThemHoSo & IDeleteFiles = { ...formData, thuTucId: undefined }
        if (!formData.eFormDataValid) {
            toast.error("Vui lòng điền các trường thông tin còn thiếu trong tờ khai")
            return;
        }
        if (cloneFormData.thanhPhanHoSos?.findIndex(thanhPhan => thanhPhan.dinhKem) == -1) {
            toast.warn("Vui lòng đính kèm ít nhất 1 tệp")
            stepRef.current[stepRef.current.length - 1]?.scrollIntoView({ behavior: "smooth", block: "start" })
            return
        }
        delete cloneFormData.eFormDataValid
        if (cloneFormData.hinhThucTra == "1") { // trả qua bưu điện
            cloneFormData.dangKyNhanHoSoQuaBCCIData = JSON.stringify({
                hoVaTen: formData.bcci_hoVaTen,
                soDienThoai: formData.bcci_soDienThoai,
                email: formData.bcci_email,
                diaChi: formData.bcci_diaChi,
                tinhThanh: formData.bcci_tinhThanh,
                quanHuyen: formData.bcci_quanHuyen,
                xaPhuong: formData.bcci_xaPhuong,
                ghiChu: formData.bcci_ghiChu,
                tenTinhThanh: formData.bcci_tenTinhThanh,
                tenQuanHuyen: formData.bcci_tenQuanHuyen,
                tenXaPhuong: formData.bcci_tenXaPhuong,
            })
            deleteObjectKeyValues(cloneFormData, ["bcci_hoVaTen", "bcci_soDienThoai", "bcci_soDienThoai", "bcci_email",
                "bcci_diaChi", "bcci_tinhThanh", "bcci_quanHuyen", "bcci_xaPhuong", "bcci_ghiChu", "bcci_tenTinhThanh",
                "bcci_tenQuanHuyen", "bcci_tenXaPhuong", "thuTucId"])
        } else {
            cloneFormData.dangKyNhanHoSoQuaBCCIData = ""
        }
        if (cloneFormData.uyQuyen) {
            cloneFormData.uyQuyen = false;
            deleteObjectKeyValues(cloneFormData, ["nguoiUyQuyen", "soGiayToNguoiUyQuyen", "soDienThoaiNguoiUyQuyen", "emailNguoiUyQuyen", "tinhThanhNguoiUyQuyen", "quanHuyenNguoiUyQuyen", "xaPhuongNguoiUyQuyen", "diaChiNguoiUyQuyen"])
        } else {
            cloneFormData.uyQuyen = true;
        }
        cloneFormData.eFormData = JSON.stringify(formData.eFormData)
        cloneFormData.ngayTiepNhan = dayjs(cloneFormData.ngayTiepNhan).format()
        cloneFormData.ngayHenTra = dayjs(cloneFormData.ngayHenTra).format()
        cloneFormData.nguoiGui = user?.userName

        if (anThongTinLienHeNopTrucTuyen) {
            const toKhaiData = formData.eFormData
            if (cloneFormData.uyQuyen) {
                cloneFormData.diaChiNguoiUyQuyen = toKhaiData.nycNoiOHienTai
            }
            cloneFormData.diaChiChuHoSo = toKhaiData.NoiOHienTai
        } else {
            const mergedDiaChiUyQuyen: IDanhMucDiaBan[] = [...diaBanChuHoSo.maTinh, ...diaBanUyQuyen.maHuyen, ...diaBanUyQuyen.maXa]
            const mergedDiaChiChuHoSo: IDanhMucDiaBan[] = [...diaBanChuHoSo.maHuyen, ...diaBanChuHoSo.maTinh, ...diaBanChuHoSo.maXa]
            if (cloneFormData.uyQuyen) {
                cloneFormData.diaChiNguoiUyQuyen = getDiaChi(cloneFormData.tinhThanhNguoiUyQuyen, cloneFormData.quanHuyenNguoiUyQuyen, cloneFormData.xaPhuongNguoiUyQuyen, cloneFormData.diaChiNguoiUyQuyen, mergedDiaChiUyQuyen)
            }
            cloneFormData.diaChiChuHoSo = getDiaChi(cloneFormData.tinhThanhChuHoSo, cloneFormData.quanHuyenChuHoSo, cloneFormData.xaPhuongChuHoSo, cloneFormData.diaChiChuHoSo, mergedDiaChiChuHoSo)
        }
        setBtnLoading(true)
        const res = await dispatch(AddHoSoTrucTuyen(cloneFormData)).unwrap()
        if (res.succeeded) {
            setSubmitedHoSo({ maHoSo: res.data, chuHoSo: cloneFormData.chuHoSo, thoiGianThucHien: cloneFormData.thoiGianThucHien, tenTTHC: duLieuThemHoSo?.tenTTHC, groupName: duLieuThemHoSo?.tenDonVi })
            setSearchParams ? setSearchParams((curr) => ({ ...curr })) : null
            sendEMCAction(cloneFormData.maTTHC)
            form.resetFields()
            setBtnLoading(false)
            setShowModal(true)
        }
    }
    useEffect(() => {
        const maTTHC = searchParams?.get("maTTHC")
        const donVi = searchParams?.get("donVi")
        const truongHopId = searchParams?.get("truongHopId")
        if (maTTHC && donVi && truongHopId && user) {
            form.setFieldValue("maTTHC", maTTHC)
            form.setFieldValue("donViId", donVi)
            form.setFieldValue("maTruongHop", truongHopId)
            dispatch(GetDuLieuThemHoSo({ thuTucId: maTTHC, truongHopId: truongHopId, returnUserInfo: true, userId: user.id, returnDonVi: true, returnThuTuc: true, donViId: donVi }))
        }
    }, [searchParams, user])

    useEffect(() => {
        const chatBotElement = document.getElementById("chatbot");
        const socialWidget = document.getElementById("socialWidgets");
        if (chatBotElement && socialWidget) {
            socialWidget.style.bottom = "40px"
            chatBotElement.style.display = "none"
        }
        return () => {
            if (socialWidget) {
                socialWidget.style.bottom = "90px"
            }
            if (chatBotElement) {
                chatBotElement.style.display = "block"
            }
            dispatch(resetDuLieuThemHoSo())
        }
    }, [])

    useEffect(() => {
        if (duLieuThemHoSo !== undefined) {
            const data = duLieuThemHoSo.taiKhoan
            let ngayThangNamSinh = (JSON.parse(data.ngayThangNamSinh as unknown as string))
            const taiKhoan = {
                Cha: (JSON.parse(data.cha as unknown as string)),
                ChuHo: (JSON.parse(data.chuHo as unknown as string)),
                HoVaTen: (JSON.parse(data.hoVaTen as unknown as string)),
                DanToc: data.danToc,
                DiaChiThuongTru: data.diaChiThuongTru,
                FullName: data.fullName,
                GioiTinh: data.gioiTinh,
                Me: (JSON.parse(data.me as unknown as string)),
                NgayThangNamSinh: {
                    NgayThangNam: ngayThangNamSinh.NgayThangNam ? dayjs(ngayThangNamSinh.NgayThangNam).format(FORMAT_DATE_FORMIO) : undefined,
                    Nam: ngayThangNamSinh.Nam
                },
                NguoiDaiDien: (JSON.parse(data.nguoiDaiDien as unknown as string)),
                NoiDangKyKhaiSinh: (JSON.parse(data.noiDangKyKhaiSinh as unknown as string)),
                NoiOHienTai: (JSON.parse(data.noiOHienTai as unknown as string)),
                QueQuan: (JSON.parse(data.queQuan as unknown as string)),
                SoDinhDanh: data.soDinhDanh,
                ThuongTru: (JSON.parse(data.thuongTru as unknown as string)),
                TinhTrangHonNhan: data.tinhTrangHonNhan,
                TonGiao: data.tonGiao,
                VoChong: (JSON.parse(data.voChong as unknown as string)),
            }
            const maTinhThanh = (taiKhoan.ThuongTru as TSTypeHelpers.CapitalizeAllKeys<DiaChi>)?.MaTinhThanh || ""
            const maQuanHuyen = (taiKhoan.ThuongTru as TSTypeHelpers.CapitalizeAllKeys<DiaChi>)?.MaQuanHuyen || ""
            const maPhuongXa = (taiKhoan.ThuongTru as TSTypeHelpers.CapitalizeAllKeys<DiaChi>)?.MaPhuongXa || ""
            form.setFieldsValue({
                chuHoSo: taiKhoan.FullName,
                soGiayToChuHoSo: taiKhoan.SoDinhDanh,
                tinhThanhChuHoSo: maTinhThanh,
                quanHuyenChuHoSo: maTinhThanh + '.' + maQuanHuyen,
                xaPhuongChuHoSo: maTinhThanh + '.' + maQuanHuyen + '.' + maPhuongXa,
                diaChiChuHoSo: taiKhoan.NoiOHienTai?.ChiTiet,
                ngaySinhChuHoSo: taiKhoan.NgayThangNamSinh?.Nam || taiKhoan.NgayThangNamSinh.NgayThangNam,
                nguoiUyQuyen: taiKhoan.FullName,
                soGiayToNguoiUyQuyen: taiKhoan.SoDinhDanh,
                tinhThanhNguoiUyQuyen: maTinhThanh,
                quanHuyenNguoiUyQuyen: maTinhThanh + '.' + maQuanHuyen,
                xaPhuongNguoiUyQuyen: maTinhThanh + '.' + maQuanHuyen + '.' + maPhuongXa,
                diaChiNguoiUyQuyen: taiKhoan.NoiOHienTai?.ChiTiet,
                trichYeuHoSo: duLieuThemHoSo.tenTTHC,
                soDienThoaiChuHoSo: duLieuThemHoSo.taiKhoan?.phoneNumber,
                emailChuHoSo: duLieuThemHoSo.taiKhoan?.email == taiKhoan.SoDinhDanh + "@dichvucong.gov.vn" ? "" : duLieuThemHoSo.taiKhoan?.email,
                soDienThoaiNguoiUyQuyen: duLieuThemHoSo.taiKhoan?.phoneNumber,
                emailNguoiUyQuyen: duLieuThemHoSo.taiKhoan?.email == taiKhoan.SoDinhDanh + "@dichvucong.gov.vn" ? "" : duLieuThemHoSo.taiKhoan?.email,
                tenTTHC: duLieuThemHoSo.tenTTHC,
                mucDo: duLieuThemHoSo.mucDo,
                laHoSoChungThuc: duLieuThemHoSo.laThuTucChungThuc,
            })
            form.setFieldValue("eFormDataValid", duLieuThemHoSo.truongHopthuTuc.eForm ? false : true)
            window.objDataCSDLDanCu = taiKhoan
            window.objDataNopHoSo = {
                MucDo: duLieuThemHoSo.mucDo ? (MUCDO_THUTUC as any)[duLieuThemHoSo.mucDo] : "",
                TenDonVi: duLieuThemHoSo.tenDonVi,
                MaDonVi: searchParams?.get("donVi"),
                TaiKhoan: {
                    DiDong: "",
                    DongBoCSDLDanCu: "",
                    Email: "",
                    HoVaTen: taiKhoan.HoVaTen.Ten,
                    LoaiTaiKhoan: "",
                    MaSoThue: taiKhoan.SoDinhDanh,
                    NgaySinh: taiKhoan.NgayThangNamSinh.NgayThangNam,
                    SoCMND: taiKhoan.SoDinhDanh,
                    TaiKhoan: user?.userName,
                    ThongTinCSDLDanCu: JSON.stringify(taiKhoan),
                    isTaiKhoanDVCQuocGia: "",
                },
                ThuTuc: {
                    ChoPhepNopTTDoanhNghiep: "",
                    FormData: duLieuThemHoSo.truongHopthuTuc.eForm,
                    IDTruongHop: duLieuThemHoSo.truongHopthuTuc.ma,
                    LaFormIO: hasEFormData,
                    LoaiThoiHanXuLy: "",
                    Ma: duLieuThemHoSo.maTTHC,
                    RequireFormData: "",
                    TemplateExportFormData: "",
                    Ten: duLieuThemHoSo.tenTTHC,
                    ThanhPhan: duLieuThemHoSo.thanhPhanThuTucs,
                    ThoiHanXuLy: duLieuThemHoSo.truongHopthuTuc.thoiGianThucHien,
                    YeuCauNopPhiTrucTuyen: "",
                }
            }
            dispatch(SearchDanhMucDiaBan({ Loai: "Tinh" }))
            if (maTinhThanh && maQuanHuyen) {
                dispatch(SearchDanhMucDiaBan({ Loai: "Huyen", maDiaBan: maTinhThanh }))
                if (maPhuongXa) {
                    dispatch(SearchDanhMucDiaBan({ Loai: "Xa", maDiaBan: maTinhThanh + '.' + maQuanHuyen }))
                }
            }

        }
    }, [duLieuThemHoSo])


    const onChangeUyQuyen = (e: React.ChangeEvent<HTMLInputElement>) => {
        form.setFieldValue("uyQuyen", e.target.checked)

    }
    useEffect(() => {
        if (uyQuyen) {
            const toKhaiData = form.getFieldValue("eFormData")
            form.setFieldsValue({
                chuHoSo: form.getFieldValue("nguoiUyQuyen"),
                soGiayToChuHoSo: form.getFieldValue("soGiayToNguoiUyQuyen"),
                tinhThanhChuHoSo: form.getFieldValue("tinhThanhNguoiUyQuyen"),
                quanHuyenChuHoSo: form.getFieldValue("quanHuyenNguoiUyQuyen"),
                xaPhuongChuHoSo: form.getFieldValue("xaPhuongNguoiUyQuyen"),
                diaChiChuHoSo: form.getFieldValue("diaChiNguoiUyQuyen"),
                soDienThoaiChuHoSo: form.getFieldValue("soDienThoaiNguoiUyQuyen"),
                emailChuHoSo: form.getFieldValue("emailNguoiUyQuyen"),
            })
            if (toKhaiData && toKhaiData.LoaiToKhai == "UyQuyen") {
                if (toKhaiData.SoDienThoai) {
                    form.setFieldValue("soDienThoaiChuHoSo", toKhaiData.SoDienThoai)
                }
                if (toKhaiData.Email) {
                    form.setFieldValue("emailChuHoSo", toKhaiData.Email)
                }
            }
            setDiaBanChuHoSo((curr) => ({ ...curr, ...diaBanUyQuyen }))
        } else {
            form.resetFields(["chuHoSo", "soGiayToChuHoSo", "soDienThoaiChuHoSo", "emailChuHoSo", "tinhThanhChuHoSo", "quanHuyenChuHoSo", "xaPhuongChuHoSo", "diaChiChuHoSo"])
        }
    }, [uyQuyen])

    return (
        <>
            {duLieuThemHoSo === undefined ? null : <>
                <Form name="NopHoSoTrucTuyen" layout="vertical" onFinish={onFinish} scrollToFirstError form={form} initialValues={{ removeFiles: [], uyQuyen: true, hinhThucTra: "0" }} style={{ margin: "1rem 0 4.5rem 0" }}>
                    <Form.Item hidden name="hinhThucTra"><Input /></Form.Item>
                    <Form.Item hidden name="thanhPhanHoSos"><Input /></Form.Item>
                    <Form.Item name="eFormData" hidden><Input /></Form.Item>
                    <Form.Item name="maTTHC" hidden><Input /></Form.Item>
                    <Form.Item name="tenTTHC" hidden><Input /></Form.Item>
                    <Form.Item name="donViId" hidden><Input /></Form.Item>
                    <Form.Item name="maTruongHop" hidden><Input /></Form.Item>
                    <Form.Item name="eFormDataValid" hidden valuePropName="checked"><Checkbox /></Form.Item>
                    <Form.Item name="dangKyNhanHoSoQuaBCCIData" hidden><Input /></Form.Item>
                    <Form.Item name="bcci_tenTinhThanh" hidden><Input /></Form.Item>
                    <Form.Item name="bcci_tenQuanHuyen" hidden><Input /></Form.Item>
                    <Form.Item name="bcci_tenXaPhuong" hidden><Input /></Form.Item>
                    <Form.Item name="ngaySinhChuHoSo" hidden><Input /></Form.Item>
                    <Form.Item name="mucDo" hidden><Input /></Form.Item>
                    <Form.Item name="uyQuyen" hidden valuePropName="checked"><Checkbox /></Form.Item>
                    <Form.Item name="laHoSoChungThuc" hidden valuePropName="checked"><Checkbox /></Form.Item>
                    <Form.Item name="removeFiles" hidden><Input /></Form.Item>
                    <div className="container">
                        <Row >
                            <Col span={24}>
                                {/* <Tag color="orange">{}</Tag> */}
                                <div >
                                    <Tag  color="gold-inverse"> {duLieuThemHoSo?.mucDo ? (MUCDO_THUTUC as any)[duLieuThemHoSo?.mucDo] : ""}</Tag>
                                    <b style={{ fontSize: 18 }}>{duLieuThemHoSo?.tenTTHC} - {duLieuThemHoSo?.tenDonVi}</b>
                                </div>
                            </Col>
                            <Col span={24}>
                                <NopHoSoStep stepRef={stepRef} anThongTinLienHeNopTrucTuyen={anThongTinLienHeNopTrucTuyen} form={form} />
                            </Col>
                            <Col span={24}>
                                <div data-icon={`FileSearchOutlined`} data-active={searchParams?.get("maTTHC")} data-description={"Chọn dịch vụ công"} ref={(el) => el && stepRef.current[1] == null ? stepRef.current[1] = el : null} data-disabledstep={true}>
                                    {/* chọn dvc */}
                                </div>
                            </Col>
                            <div data-icon={`UserOutlined`} data-description={"Nhập thông tin hồ sơ"} style={{ scrollMargin: 110, display: `${anThongTinLienHeNopTrucTuyen && hasEFormData ? "none" : "block"}` }} ref={(el) => el && stepRef.current[1] == null ? stepRef.current[1] = el : null}>
                                <Col span={24}>
                                    <FormHeader>Thông tin người liên hệ</FormHeader>
                                    <NguoiUyQuyen form={form} diaBan={diaBanUyQuyen} setDiaBan={setDiaBanUyQuyen} hideRule={anThongTinLienHeNopTrucTuyen && hasEFormData} />
                                </Col>
                                <Col span={24}>
                                    <FormHeader extraInfo={
                                        <span className="ms-2 fst-italic text-primary">(Người nộp là chủ hồ sơ <input onChange={onChangeUyQuyen} checked={uyQuyen} style={{ width: 15, height: 15 }} type="checkbox" defaultChecked></input> ) </span>
                                    }>
                                        Thông tin chủ hồ sơ
                                    </FormHeader>
                                    <ThongTinHoSo form={form} diaBan={diaBanChuHoSo} setDiaBan={setDiaBanChuHoSo} hideRule={anThongTinLienHeNopTrucTuyen && hasEFormData} />
                                </Col>
                                <Col span={24}>
                                    <FormHeader>
                                        Thông tin thêm
                                    </FormHeader>
                                    <h6>Cơ quan tiếp nhận hồ sơ: <b>{duLieuThemHoSo?.tenDonVi}</b></h6>
                                    <Form.Item name="trichYeuHoSo" label="Tóm tắt nội dung hồ sơ" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}>
                                        <Input.TextArea rows={2} maxLength={500} showCount autoSize>

                                        </Input.TextArea>
                                    </Form.Item>
                                </Col>
                            </div>
                            <TepTinDinhKem stepRef={stepRef} form={form} />

                            <div style={{ display: "flex", justifyContent: "end", width: "100%", padding: "1rem 0" }}>
                                <AntdButton loading={btnLoading} htmlType="submit" >Gửi hồ sơ</AntdButton>
                            </div>

                        </Row>
                    </div>
                </Form>
                {showModal ? <NopThanhCongModal hoSo={submittedHoSo} handlerClose={() => setShowModal(false)} /> : null}

            </>}
        </>

    )
}