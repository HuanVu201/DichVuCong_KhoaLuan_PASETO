import './FormNopHoSo.scss'
import { Button, Checkbox, Col, Form, Input, Radio, Row, Space, Spin, Tag, Typography } from "antd"
import { NguoiUyQuyen } from "./NguoiUyQuyen"
import { useEffect, useMemo, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { AddHoSoTrucTuyen } from "@/features/hoso/redux/action"
import { GetDuLieuThemHoSo } from "@/features/truonghopthutuc/redux/action"
import { TepTinDinhKem } from "./TepTinDinhKem"
import { DiaChi } from "@/features/user/models"
import { TSTypeHelpers } from "@/lib/typescripts"
import { toast } from "react-toastify"
import { deleteObjectKeyValues } from "@/utils/common"
import { IThemHoSo } from "@/features/hoso/components/actions/themMoiHoSo/ThemMoiTiepNhanHoSoModal"
import dayjs from 'dayjs'
import { SetURLSearchParams } from "react-router-dom"
import { resetDuLieuThemHoSo } from "@/features/truonghopthutuc/redux/slice"
import { SearchDanhMucDiaBan } from "@/features/danhmucdiaban/redux/action"
import { ThongTinHoSo } from "./ThongTinHoSo"
import { IDanhMucDiaBan } from "@/features/danhmucdiaban/models"
import { NopThanhCongModal } from "./NopThanhCongModal"
import { sendEMCAction } from "@/utils/emc"
import { IDeleteFiles } from '@/models'
import { FormHeader } from './FormHeader'
import { MUCDO_THUTUC } from '@/features/thutuc/data'
import { NopHoSoStep } from './NopHoSoStep'
import { FORMAT_DATE_FORMIO } from '@/data'
import { useWindowSizeChange } from '@/hooks/useWindowSizeChange'
import { allItemHasFile } from '@/features/hoso/components/actions/themMoiHoSoChungThuc/utils/validate'
import { POST_CREATE_HOSO } from '@/features/hoso/data/formData'
import { AddHoSoNhap } from '@/features/hosonhap/redux/action'
import { NopThanhCongHoSoNhapModal } from './NopThanhCongHoSoNhapModal'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import VideoPlayerTutorialFormNopHoSo from './VideoPlayerTutorialFormNopHoSo'
import { App } from 'antd';
import { AntdButton, AntdSpace } from '@/lib/antd/components'
import { getFileExt } from '@/utils'

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

export const FormNopHoSo = ({ searchParams, setSearchParams }: { searchParams?: URLSearchParams; setSearchParams?: SetURLSearchParams; }) => {
    const [form] = Form.useForm<IThemHoSo & IDeleteFiles>()
    const dispatch = useAppDispatch()
    const { modal } = App.useApp()
    const [btnLoading, setBtnLoading] = useState(false)
    const { duLieuThemHoSo } = useAppSelector(state => state.truonghopthutuc)
    const { publicModule } = useAppSelector(state => state.config)
    const { data: user } = useAppSelector(state => state.user)
    const [showModal, setShowModal] = useState(false)
    const [showModalHoSoNhap, setShowModalHoSoNhap] = useState(false)
    const [showModalVideoTutorial, setShowModalVideoTutorial] = useState(false)
    const [submittedHoSo, setSubmitedHoSo] = useState<React.ComponentProps<typeof NopThanhCongModal>["hoSo"]>()
    const stepRef = useRef<HTMLDivElement[]>([])
    const anThongTinLienHeNopTrucTuyen = duLieuThemHoSo?.truongHopthuTuc.anThongTinLienHeNopTrucTuyen
    const hasEFormData = duLieuThemHoSo?.truongHopthuTuc.eForm != null && duLieuThemHoSo?.truongHopthuTuc.eForm != ""
    const { isMobile, isTablet } = useWindowSizeChange()
    const uyQuyen = Form.useWatch("uyQuyen", form)
    const loaiDoiTuong = Form.useWatch("loaiDoiTuong", form)
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

    const postUploadConfig = useMemo(() => {
        const postUpload = publicModule?.find(x => x.code == "post_create_hoso")?.content
        try {
            const parsed: POST_CREATE_HOSO = postUpload ? JSON.parse(postUpload) : undefined
            return parsed
        } catch (error) {
            console.log(error)
        }
    }, [publicModule])



    const onFinish = async () => {
        const formData = await form.validateFields() as any

        if (showModal) {
            return;
        }
        const cloneFormData: IThemHoSo & IDeleteFiles = { ...formData, thuTucId: undefined }
        if (!formData.eFormDataValid) {
            toast.error("Vui lòng điền các trường thông tin còn thiếu trong tờ khai")
            return;
        }
        if (cloneFormData.thanhPhanHoSos && cloneFormData.thanhPhanHoSos.length == 0) {
            toast.warn("Vui lòng thêm ít nhất một thành phần hồ sơ")
            return
        }
        if (cloneFormData.thanhPhanHoSos?.findIndex(thanhPhan => thanhPhan.dinhKem) == -1) {
            toast.warn("Vui lòng đính kèm đầy đủ thành phần hồ sơ (trường hợp có thành phần hồ sơ không bắt buộc phải nộp, đề nghị Ông/bà chọn thao tác Xoá thành phần hồ sơ đó)")
            stepRef.current[3]?.scrollIntoView({ behavior: "smooth", block: "start" })
            return
        }

        if (cloneFormData.laHoSoChungThuc || postUploadConfig?.uploadSignedFile == true) {
            if (!allItemHasFile(cloneFormData.thanhPhanHoSos, "dinhKem")) {
                toast.warn("Vui lòng đính kèm đầy đủ thành phần hồ sơ (trường hợp có thành phần hồ sơ không bắt buộc phải nộp, đề nghị Ông/bà chọn thao tác Xoá thành phần hồ sơ đó)")
                console.log(stepRef.current[3]);
                stepRef.current[3]?.scrollIntoView({ behavior: "smooth", block: "start" })
                return
            }
        }
        if (cloneFormData.laHoSoChungThuc) {
            const chuaChonLoaiGiayTo = cloneFormData.thanhPhanHoSos?.findIndex(x => !x.maGiayTo || !x.ten)
            if (chuaChonLoaiGiayTo != -1) {
                toast.warn("Có thành phần hồ sơ chưa chọn nội dung/ tên giấy tờ")
                return;
            }
            const confirmed = await modal.confirm({
                title: <Typography.Title level={4}>Vui lòng xác nhận</Typography.Title>,
                content: <Typography.Title level={5}>Nếu trong 08 giờ ông/bà không mang giấy tờ (bản gốc) đến Bộ phận tiếp nhận và Trả kết quả, hồ sơ sẽ bị trả lại.</Typography.Title>,
                okText: "Đồng ý",
                cancelText: "Hủy bỏ",
                type: "info",
            })
            if (!confirmed) {
                return;
            }
        }
        delete cloneFormData.eFormDataValid
        if (cloneFormData.hinhThucTra == "1") { // trả qua bưu điện
            cloneFormData.dangKyNhanHoSoQuaBCCIData = JSON.stringify({
                hoVaTen: formData.bcci_hoVaTen,
                soDienThoai: formData.bcci_soDienThoai,
                email: formData.bcci_email,
                diaChi: formData.bcci_diaChi ? `${formData.bcci_diaChi}, ${formData.bcci_tenXaPhuong}, ${formData.bcci_tenQuanHuyen}, ${formData.bcci_tenTinhThanh}` :
                    `${formData.bcci_tenXaPhuong}, ${formData.bcci_tenQuanHuyen}, ${formData.bcci_tenTinhThanh}`,
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
        if(cloneFormData.ngaySinhChuHoSo?.length > 4 && dayjs(cloneFormData.ngaySinhChuHoSo).isValid()){
            cloneFormData.ngaySinhChuHoSo = dayjs(cloneFormData.ngaySinhChuHoSo).year().toString()
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
            
            try {
                if(toKhaiData.noiOHienTai){
                    cloneFormData.diaChiChuHoSo = toKhaiData.NoiOHienTai
                } else if(toKhaiData.NoiThuongTru || toKhaiData.NoiThuongTruTinhThanh || toKhaiData.NoiThuongTruQuanHuyen || toKhaiData.NoiThuongTruXaPhuong){
                    cloneFormData.diaChiChuHoSo = [toKhaiData.NoiThuongTru, toKhaiData.NoiThuongTruXaPhuong.tenDiaBan, toKhaiData.NoiThuongTruQuanHuyen.tenDiaBan, toKhaiData.NoiThuongTruTinhThanh.tenDiaBan].filter(x => x).join(", ")
                } else if(toKhaiData.DiaChiTamTru || toKhaiData.DiaChiTamTruTinhThanh || toKhaiData.DiaChiTamTruQuanHuyen || toKhaiData.DiaChiTamTruXaPhuong){
                    cloneFormData.diaChiChuHoSo = [toKhaiData.DiaChiTamTru, toKhaiData.DiaChiTamTruXaPhuong.tenDiaBan, toKhaiData.DiaChiTamTruQuanHuyen.tenDiaBan, toKhaiData.DiaChiTamTruTinhThanh.tenDiaBan].filter(x => x).join(", ")
                }
            } catch (error) {
            }
        } else {
            const mergedDiaChiUyQuyen: IDanhMucDiaBan[] = [...diaBanChuHoSo.maTinh, ...diaBanUyQuyen.maHuyen, ...diaBanUyQuyen.maXa]
            const mergedDiaChiChuHoSo: IDanhMucDiaBan[] = [...diaBanChuHoSo.maHuyen, ...diaBanChuHoSo.maTinh, ...diaBanChuHoSo.maXa]
            if (cloneFormData.uyQuyen) {
                cloneFormData.diaChiNguoiUyQuyen = getDiaChi(cloneFormData.tinhThanhNguoiUyQuyen, cloneFormData.quanHuyenNguoiUyQuyen, cloneFormData.xaPhuongNguoiUyQuyen, cloneFormData.diaChiNguoiUyQuyen, mergedDiaChiUyQuyen)
            }
            cloneFormData.diaChiChuHoSo = getDiaChi(cloneFormData.tinhThanhChuHoSo, cloneFormData.quanHuyenChuHoSo, cloneFormData.xaPhuongChuHoSo, cloneFormData.diaChiChuHoSo, mergedDiaChiChuHoSo)
        }
        try {
            setBtnLoading(true)
            const res = await dispatch(AddHoSoTrucTuyen(cloneFormData)).unwrap()
            if (res.succeeded) {
                setSubmitedHoSo({ maHoSo: res.data, chuHoSo: cloneFormData.chuHoSo, thoiGianThucHien: cloneFormData.thoiGianThucHien, tenTTHC: duLieuThemHoSo?.tenTTHC, groupName: duLieuThemHoSo?.tenDonVi })
                // setSearchParams ? setSearchParams((curr) => ({ ...curr })) : null
                sendEMCAction(cloneFormData.maTTHC)
                form.resetFields()
                setShowModal(true)
            }
            setBtnLoading(false)
        } catch {
            setBtnLoading(false)
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
            dispatch(GetDuLieuThemHoSo({ thuTucId: maTTHC, truongHopId: truongHopId, returnUserInfo: true, returnPhiLePhi: true, userId: user.id, returnDonVi: true, returnThuTuc: true, donViId: donVi }))
        }
    }, [searchParams, user])

    useEffect(() => {
        return () => {
            dispatch(resetDuLieuThemHoSo())
        }
    }, [])

    useEffect(() => {
        if (loaiDoiTuong) {
            form.setFieldValue("loaiDoiTuong", loaiDoiTuong)
        }
        else {
            form.setFieldValue("loaiDoiTuong", "Công dân")

        }
    }, [loaiDoiTuong])
    
    const onSubmitHoSoNhap = async () => {
        const formData = await form.getFieldsValue() as any;

        const cloneFormData: IThemHoSo & IDeleteFiles = { ...formData, thuTucId: undefined }
        if (cloneFormData.hinhThucTra == "1") { // trả qua bưu điện
            cloneFormData.dangKyNhanHoSoQuaBCCIData = JSON.stringify({
                hoVaTen: formData.bcci_hoVaTen,
                soDienThoai: formData.bcci_soDienThoai,
                email: formData.bcci_email,
                diaChi: formData.bcci_diaChi ? `${formData.bcci_diaChi}, ${formData.bcci_tenXaPhuong}, ${formData.bcci_tenQuanHuyen}, ${formData.bcci_tenTinhThanh}` :
                    `${formData.bcci_tenXaPhuong}, ${formData.bcci_tenQuanHuyen}, ${formData.bcci_tenTinhThanh}`,
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
            // deleteObjectKeyValues(cloneFormData, ["nguoiUyQuyen", "soGiayToNguoiUyQuyen", "soDienThoaiNguoiUyQuyen", "emailNguoiUyQuyen", "tinhThanhNguoiUyQuyen", "quanHuyenNguoiUyQuyen", "xaPhuongNguoiUyQuyen", "diaChiNguoiUyQuyen"])
        } else {
            cloneFormData.uyQuyen = true;
        }
        if(cloneFormData.ngaySinhChuHoSo?.length > 4 && dayjs(cloneFormData.ngaySinhChuHoSo).isValid()){
            cloneFormData.ngaySinhChuHoSo = dayjs(cloneFormData.ngaySinhChuHoSo).year().toString()
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
            try {
                if(toKhaiData.noiOHienTai){
                    cloneFormData.diaChiChuHoSo = toKhaiData.NoiOHienTai
                } else if(toKhaiData.NoiThuongTru || toKhaiData.NoiThuongTruTinhThanh || toKhaiData.NoiThuongTruQuanHuyen || toKhaiData.NoiThuongTruXaPhuong){
                    cloneFormData.diaChiChuHoSo = [toKhaiData.NoiThuongTru, toKhaiData.NoiThuongTruXaPhuong.tenDiaBan, toKhaiData.NoiThuongTruQuanHuyen.tenDiaBan, toKhaiData.NoiThuongTruTinhThanh.tenDiaBan].filter(x => x).join(", ")
                } else if(toKhaiData.DiaChiTamTru || toKhaiData.DiaChiTamTruTinhThanh || toKhaiData.DiaChiTamTruQuanHuyen || toKhaiData.DiaChiTamTruXaPhuong){
                    cloneFormData.diaChiChuHoSo = [toKhaiData.DiaChiTamTru, toKhaiData.DiaChiTamTruXaPhuong.tenDiaBan, toKhaiData.DiaChiTamTruQuanHuyen.tenDiaBan, toKhaiData.DiaChiTamTruTinhThanh.tenDiaBan].filter(x => x).join(", ")
                }
            } catch (error) {
            }
        } else {
            const mergedDiaChiUyQuyen: IDanhMucDiaBan[] = [...diaBanChuHoSo.maTinh, ...diaBanUyQuyen.maHuyen, ...diaBanUyQuyen.maXa]
            const mergedDiaChiChuHoSo: IDanhMucDiaBan[] = [...diaBanChuHoSo.maHuyen, ...diaBanChuHoSo.maTinh, ...diaBanChuHoSo.maXa]
            if (cloneFormData.uyQuyen) {
                cloneFormData.diaChiNguoiUyQuyen = getDiaChi(cloneFormData.tinhThanhNguoiUyQuyen, cloneFormData.quanHuyenNguoiUyQuyen, cloneFormData.xaPhuongNguoiUyQuyen, cloneFormData.diaChiNguoiUyQuyen, mergedDiaChiUyQuyen)
            }
            cloneFormData.diaChiChuHoSo = getDiaChi(cloneFormData.tinhThanhChuHoSo, cloneFormData.quanHuyenChuHoSo, cloneFormData.xaPhuongChuHoSo, cloneFormData.diaChiChuHoSo, mergedDiaChiChuHoSo)
        }

        try {
            setBtnLoading(true)
            const resHoSoNhap = await dispatch(AddHoSoNhap(cloneFormData)).unwrap()
            if (resHoSoNhap.succeeded) {
                setShowModalHoSoNhap(true)

            }
            setBtnLoading(false)

        } catch {
            setBtnLoading(false)
        }
    }

    useEffect(() => {
        if (duLieuThemHoSo !== undefined) {

            const data = duLieuThemHoSo.taiKhoan
            let ngayThangNamSinh = data?.ngayThangNamSinh ? (JSON.parse(data.ngayThangNamSinh as unknown as string)) : undefined
            let thuongTru, cha, chuHo, hoVaTen, me, nguoiDaiDien, noiDangKyKhaiSinh, noiOHienTai, queQuan, voChong
            try {
                thuongTru = data.thuongTru ? (JSON.parse(data.thuongTru as unknown as string)) : undefined
            } catch (error) {
            }
            try {
                cha = data?.cha ? (JSON.parse(data.cha as unknown as string)) : undefined

            } catch (error) {

            }
            try {
                chuHo = data?.chuHo ? (JSON.parse(data.chuHo as unknown as string)) : undefined

            } catch (error) {

            }
            try {
                hoVaTen = data?.hoVaTen ? (JSON.parse(data.hoVaTen as unknown as string)) : undefined

            } catch (error) {

            }
            try {
                me = data?.me ? (JSON.parse(data.me as unknown as string)) : undefined

            } catch (error) {

            }
            try {
                nguoiDaiDien = data?.nguoiDaiDien ? (JSON.parse(data.nguoiDaiDien as unknown as string)) : undefined

            } catch (error) {

            }
            try {
                noiDangKyKhaiSinh = data?.noiDangKyKhaiSinh ? (JSON.parse(data.noiDangKyKhaiSinh as unknown as string)) : undefined

            } catch (error) {

            }
            try {
                noiOHienTai = data?.noiOHienTai ? (JSON.parse(data.noiOHienTai as unknown as string)) : undefined

            } catch (error) {

            }
            try {
                queQuan = data?.queQuan ? (JSON.parse(data.queQuan as unknown as string)) : undefined
            } catch (error) {

            }
            try {
                voChong = data?.voChong ? (JSON.parse(data.voChong as unknown as string)) : undefined

            } catch (error) {

            }
            const taiKhoan = {
                Cha: cha,
                ChuHo: chuHo,
                HoVaTen: hoVaTen,
                DanToc: data?.danToc || "",
                DiaChiThuongTru: data?.diaChiThuongTru || "",
                FullName: data?.fullName || "",
                GioiTinh: data?.gioiTinh || "",
                Me: me,
                NgayThangNamSinh: {
                    NgayThangNam: ngayThangNamSinh?.NgayThangNam ? dayjs(ngayThangNamSinh.NgayThangNam).format(FORMAT_DATE_FORMIO) : undefined,
                    Nam: ngayThangNamSinh?.Nam || ""
                },
                NguoiDaiDien: nguoiDaiDien,
                NoiDangKyKhaiSinh: noiDangKyKhaiSinh,
                NoiOHienTai: noiOHienTai,
                QueQuan: queQuan,
                SoDinhDanh: data?.soDinhDanh || "",
                ThuongTru: thuongTru,
                TinhTrangHonNhan: data?.tinhTrangHonNhan || "",
                TonGiao: data?.tonGiao || "",
                VoChong: voChong,
            }
            const maTinhThanh = (taiKhoan?.ThuongTru as TSTypeHelpers.CapitalizeAllKeys<DiaChi>)?.MaTinhThanh || ""
            const maQuanHuyen = (taiKhoan?.ThuongTru as TSTypeHelpers.CapitalizeAllKeys<DiaChi>)?.MaQuanHuyen || ""
            const maPhuongXa = (taiKhoan?.ThuongTru as TSTypeHelpers.CapitalizeAllKeys<DiaChi>)?.MaPhuongXa || ""
            const tenQuanHuyen = (maTinhThanh + '.' + maQuanHuyen)
            const tenXaPhuong = maTinhThanh + '.' + maQuanHuyen + '.' + maPhuongXa
            form.setFieldsValue({
                chuHoSo: taiKhoan.FullName || "",
                soGiayToChuHoSo: taiKhoan.SoDinhDanh || "",
                tinhThanhChuHoSo: maTinhThanh,
                quanHuyenChuHoSo: tenQuanHuyen == "." ? "" : tenQuanHuyen,
                xaPhuongChuHoSo: tenXaPhuong == ".." ? "" : tenXaPhuong,
                tinhThanhDiaBan: duLieuThemHoSo.tinhThanhDiaBan || "",
                quanHuyenDiaBan: duLieuThemHoSo.quanHuyenDiaBan || "",
                xaPhuongDiaBan: duLieuThemHoSo.xaPhuongDiaBan || "",
                diaChiChuHoSo: taiKhoan.NoiOHienTai?.ChiTiet || "",
                ngaySinhChuHoSo: taiKhoan.NgayThangNamSinh?.Nam || taiKhoan.NgayThangNamSinh?.NgayThangNam?.slice(0,4) || "",
                nguoiUyQuyen: taiKhoan.FullName || "",
                soGiayToNguoiUyQuyen: taiKhoan.SoDinhDanh || "",
                tinhThanhNguoiUyQuyen: maTinhThanh || "",
                quanHuyenNguoiUyQuyen: tenQuanHuyen == "." ? "" : tenQuanHuyen,
                xaPhuongNguoiUyQuyen: tenXaPhuong == ".." ? "" : tenXaPhuong,
                diaChiNguoiUyQuyen: taiKhoan.NoiOHienTai?.ChiTiet || "",
                trichYeuHoSo: duLieuThemHoSo.tenTTHC || "",
                soDienThoaiChuHoSo: duLieuThemHoSo.taiKhoan?.phoneNumber || "",
                emailChuHoSo: duLieuThemHoSo.taiKhoan?.email == taiKhoan.SoDinhDanh + "@dichvucong.gov.vn" ? "" : duLieuThemHoSo.taiKhoan?.email,
                soDienThoaiNguoiUyQuyen: duLieuThemHoSo.taiKhoan?.phoneNumber || "",
                emailNguoiUyQuyen: duLieuThemHoSo.taiKhoan?.email == taiKhoan.SoDinhDanh + "@dichvucong.gov.vn" ? "" : duLieuThemHoSo.taiKhoan?.email,
                tenTTHC: duLieuThemHoSo.tenTTHC || "",
                mucDo: duLieuThemHoSo.mucDo,
                laHoSoChungThuc: duLieuThemHoSo.laThuTucChungThuc,
            })
            form.setFieldValue("eFormDataValid", duLieuThemHoSo.truongHopthuTuc?.eForm ? false : true)
            window.objDataCSDLDanCu = taiKhoan
            window.objDataNopHoSo = {
                MucDo: duLieuThemHoSo.mucDo ? (MUCDO_THUTUC as any)[duLieuThemHoSo.mucDo] : "",
                TenDonVi: duLieuThemHoSo.tenDonVi,
                MaDonVi: searchParams?.get("donVi"),
                TaiKhoan: {
                    DiDong: "",
                    DongBoCSDLDanCu: "",
                    Email: "",
                    HoVaTen: taiKhoan.HoVaTen?.Ten || "",
                    LoaiTaiKhoan: "",
                    MaSoThue: taiKhoan.SoDinhDanh || "",
                    NgaySinh: taiKhoan.NgayThangNamSinh?.NgayThangNam || "",
                    SoCMND: taiKhoan.SoDinhDanh || "",
                    TaiKhoan: user?.userName || "",
                    ThongTinCSDLDanCu: JSON.stringify(taiKhoan),
                    isTaiKhoanDVCQuocGia: "",
                },
                ThuTuc: {
                    ChoPhepNopTTDoanhNghiep: "",
                    FormData: duLieuThemHoSo?.truongHopthuTuc?.eForm,
                    IDTruongHop: duLieuThemHoSo?.truongHopthuTuc?.ma,
                    LaFormIO: hasEFormData,
                    LoaiThoiHanXuLy: "",
                    Ma: duLieuThemHoSo?.maTTHC || "",
                    RequireFormData: "",
                    TemplateExportFormData: "",
                    Ten: duLieuThemHoSo?.tenTTHC || "",
                    ThanhPhan: duLieuThemHoSo?.thanhPhanThuTucs,
                    ThoiHanXuLy: duLieuThemHoSo?.truongHopthuTuc.thoiGianThucHien,
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
    const [phiThuTuc, lePhiThuTuc] = useMemo(() => {
        return [duLieuThemHoSo?.phiLePhis.find((x: any) => x.ten == "Phí"), duLieuThemHoSo?.phiLePhis.find((x: any) => x.ten == "Lệ phí")]
    }, [duLieuThemHoSo])

    return (
        <div className='commonBackgroundTrongDong'>
            <Spin spinning={duLieuThemHoSo == null}>

                <Form name="NopHoSoTrucTuyen" layout="vertical" scrollToFirstError form={form} initialValues={{ removeFiles: [], uyQuyen: true, hinhThucTra: "0" }} style={{ margin: "1rem 0 4.5rem 0" }}>
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
                    <Form.Item name="currentSelectedMaKetQuaTPTT" hidden><Input /></Form.Item>
                    <div className="container">

                        <Row >
                            <Col span={24}>
                                {/* <Tag color="orange">{}</Tag> */}
                                <div >
                                    <Tag color="gold-inverse"> {duLieuThemHoSo?.mucDo ? (MUCDO_THUTUC as any)[duLieuThemHoSo?.mucDo] : ""}</Tag>
                                    <b className='titleForm'>{duLieuThemHoSo?.tenTTHC} - {duLieuThemHoSo?.tenDonVi}</b>
                                </div>
                            </Col>
                            {isMobile || isTablet ? null : <Col span={24}>
                                <NopHoSoStep stepRef={stepRef} anThongTinLienHeNopTrucTuyen={anThongTinLienHeNopTrucTuyen} form={form} />
                            </Col>}

                            <Col span={24}>
                                <div data-icon={`FileSearchOutlined`} data-active={searchParams?.get("maTTHC")} data-description={"Chọn dịch vụ công"} ref={(el) => el && stepRef.current[0] == null ? stepRef.current[0] = el : null} data-disabledstep={true}>
                                    {/* chọn dvc */}
                                </div>
                            </Col>
                            <div style={{ marginLeft: 'auto' }} hidden={duLieuThemHoSo?.urlVideoTutorial ? false : true}>
                                <div
                                    style={{
                                        backgroundColor: '#008b72', color: '#fff', padding: '5px 10px',
                                        borderRadius: '5px',

                                    }}
                                    onClick={() => {
                                        setShowModalVideoTutorial(!showModalVideoTutorial)
                                        //   thuTucPortalContext.setViewTutorialModal(true)
                                        //   thuTucPortalContext.setUrlVideoTutorial(thuTuc?.urlVideoTutorial || '')
                                    }}
                                >
                                    {showModalVideoTutorial ?
                                        <span><EyeInvisibleFilled style={{ marginRight: "10px", fontSize: "16px" }} />
                                            Đóng hướng dẫn
                                        </span>
                                        :
                                        <span><EyeFilled style={{ marginRight: "10px", fontSize: "16px" }} />
                                            Xem hướng dẫn
                                        </span>
                                    }

                                </div>
                            </div>
                            <Col span={24} hidden={showModalVideoTutorial ? false : true}>
                                <VideoPlayerTutorialFormNopHoSo videoTutorial={duLieuThemHoSo?.urlVideoTutorial || ''}
                                    showModalVideoTutorial={showModalVideoTutorial}
                                    setShowModalVideoTutorial={setShowModalVideoTutorial}
                                />
                            </Col>

                            <div data-icon={`UserOutlined`} data-description={"Nhập thông tin hồ sơ"} style={{ scrollMargin: 110, display: `${anThongTinLienHeNopTrucTuyen && hasEFormData ? "none" : "block"}` }} ref={(el) => el && stepRef.current[1] == null ? stepRef.current[1] = el : null}>
                                <Col span={24}>
                                    <Space style={{ display: 'flex', alignItems: 'center' }}>
                                        <h3 className="fw-bold mb-0 pb-1" style={{ fontSize: 17, marginRight: 24, }}>
                                            Loại chủ hồ sơ
                                        </h3>
                                        <Form.Item name="loaiDoiTuong" style={{ marginBottom: 0 }}>
                                            <Radio.Group
                                                name="loaiDoiTuong"
                                                style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
                                                defaultValue={"Công dân"}
                                            >
                                                <Radio value={"Công dân"}>
                                                    <span style={{ fontSize: "16px", color: "#595959" }}>
                                                        Công dân
                                                    </span>
                                                </Radio>
                                                <Radio value={"Doanh nghiệp"}>
                                                    <span style={{ fontSize: "16px", color: "#595959" }}>
                                                        Doanh nghiệp
                                                    </span>
                                                </Radio>
                                                <Radio value={"Cơ quan nhà nước"}>
                                                    <span style={{ fontSize: "16px", color: "#595959" }}>
                                                        Cơ quan nhà nước
                                                    </span>
                                                </Radio>
                                                <Radio value={"Tổ chức"}>
                                                    <span style={{ fontSize: "16px", color: "#595959" }}>
                                                        Tổ chức
                                                    </span>
                                                </Radio>
                                                <Radio value={"Khác"}>
                                                    <span style={{ fontSize: "16px", color: "#595959" }}>
                                                        Khác
                                                    </span>
                                                </Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Space>
                                </Col>
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
                            <TepTinDinhKem stepRef={stepRef} form={form}/>
                            {/* <Col span={24}>
                                <FormHeader>Thông tin phí, lệ phí thủ tục</FormHeader>
                                <ThongTinPhiLePhiThuTucTrucTuyen form={form}></ThongTinPhiLePhiThuTucTrucTuyen>
                            </Col> */}

                            {showModal ? null :
                                <div style={{ display: "flex", justifyContent: "center", width: "100%", padding: "1rem 0", gap: "1rem" }}>
                                    <div style={{ display: "flex", justifyContent: "end", width: "auto", }}>
                                        <Button style={{ fontWeight: 600, color: '#222' }} onClick={onSubmitHoSoNhap} size="large" loading={btnLoading} htmlType="submit" block={isMobile || isTablet ? true : undefined} >
                                            Lưu hồ sơ
                                        </Button>
                                    </div>

                                    <div style={{ display: "flex", justifyContent: "end", width: "auto" }}>
                                        <Button style={{ fontWeight: 600, color: '#222' }} onClick={onFinish} size="large" loading={btnLoading} htmlType="submit" block={isMobile || isTablet ? true : undefined} >
                                            Gửi hồ sơ
                                        </Button>
                                    </div>
                                </div>
                            }

                        </Row>
                    </div>
                </Form>
                {showModal ? <NopThanhCongModal hoSo={submittedHoSo} handlerClose={() => setShowModal(false)} /> : null}
                {showModalHoSoNhap ? <NopThanhCongHoSoNhapModal hoSo={submittedHoSo} handlerClose={() => setShowModalHoSoNhap(false)} /> : null}

            </Spin>
        </div>

    )
}

export default FormNopHoSo