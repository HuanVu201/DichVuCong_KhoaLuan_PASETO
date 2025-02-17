import { Affix, App, Button, Checkbox, Col, Form, Input, Row, Spin, Tag, Typography } from "antd"
import { ComponentProps, ElementRef, useEffect, useMemo, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { AddHoSoTrucTuyen } from "@/features/hoso/redux/action"
import { GetDuLieuThemHoSo } from "@/features/truonghopthutuc/redux/action"
import { AntdButton, AntdStep, AntdStepProps } from "@/lib/antd/components"
import { DiaChi } from "@/features/user/models"
import { TSTypeHelpers } from "@/lib/typescripts"
import { toast } from "react-toastify"
import { deleteObjectKeyValues } from "@/utils/common"
import { IThemHoSo } from "@/features/hoso/components/actions/themMoiHoSo/ThemMoiTiepNhanHoSoModal"
import dayjs from 'dayjs'
import { SetURLSearchParams, useLocation, useSearchParams } from "react-router-dom"
import { resetDuLieuThemHoSo } from "@/features/truonghopthutuc/redux/slice"
import { resetData } from "@/features/hosonhap/redux/slice"
import { SearchDanhMucDiaBan } from "@/features/danhmucdiaban/redux/action"
import { IDanhMucDiaBan } from "@/features/danhmucdiaban/models"
import { sendEMCAction } from "@/utils/emc"
import { IDeleteFiles } from '@/models'
import { MUCDO_THUTUC } from '@/features/thutuc/data'
import { StepProps, StepsProps } from 'antd/lib'
import { FORMAT_DATE, FORMAT_DATE_FORMIO, PORTAL_PRIMARY_COLOR } from '@/data'
import { useWindowSizeChange } from '@/hooks/useWindowSizeChange'
import { allItemHasFile } from '@/features/hoso/components/actions/themMoiHoSoChungThuc/utils/validate'
import { POST_CREATE_HOSO } from '@/features/hoso/data/formData'
import { AddHoSoNhap, DeleteHoSoNhap, GetHoSoNhap, UpdateHoSoNhap } from '@/features/hosonhap/redux/action'
import { useHoSoLuuTruContext } from '../contexts/HoSoLuuTruContext'
import { NopThanhCongModal } from '@/features/portaldvc/NopHoSoTrucTuyen/components/NopThanhCongModal'
import { NopHoSoStep } from '@/features/portaldvc/NopHoSoTrucTuyen/components/NopHoSoStep'
import { FormHeader } from '@/features/portaldvc/NopHoSoTrucTuyen/components/FormHeader'
import { ThongTinHoSo } from '@/features/portaldvc/NopHoSoTrucTuyen/components/ThongTinHoSo'
import { NguoiUyQuyen } from '@/features/portaldvc/NopHoSoTrucTuyen/components/NguoiUyQuyen'
import { TepTinDinhKem } from '@/features/portaldvc/NopHoSoTrucTuyen/components/TepTinDinhKem'
import { danhMucDiaBanApi } from "@/features/danhmucdiaban/services"
import { TepTinDinhKemHoSoNhap } from "./TepTinDinhKemHoSoNhap"

export type DiaBanUyQuyen = { maHuyen: IDanhMucDiaBan[]; maXa: IDanhMucDiaBan[] }
export type DiaBanChuHoSo = { maTinh: IDanhMucDiaBan[]; maHuyen: IDanhMucDiaBan[]; maXa: IDanhMucDiaBan[] }
interface UserDataBCCI {
    hoVaTen: string;
    soDienThoai: string;
    email: string;
    diaChi: string;
    tinhThanh: string;
    quanHuyen: string;
    xaPhuong: string;
    tenTinhThanh: string;
    tenQuanHuyen: string;
    tenXaPhuong: string;
}

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

export const FormNopHoSoLuuTru = () => {
    const [form] = Form.useForm<IThemHoSo & IDeleteFiles>()
    const dispatch = useAppDispatch()
    const [searchParams] = useSearchParams()
    const location = useLocation()
    const [btnLoading, setBtnLoading] = useState(false)
    const { duLieuThemHoSo } = useAppSelector(state => state.truonghopthutuc)
    const { publicModule } = useAppSelector(state => state.config)
    const { data: user } = useAppSelector(state => state.user)
    const { data: hoSoNhapData } = useAppSelector(state => state.hosonhap)
    const [showModal, setShowModal] = useState(false)
    const hoSoLuuTruContext = useHoSoLuuTruContext()
    const [submittedHoSo, setSubmitedHoSo] = useState<React.ComponentProps<typeof NopThanhCongModal>["hoSo"]>()
    const stepRef = useRef<HTMLDivElement[]>([])
    const anThongTinLienHeNopTrucTuyen = duLieuThemHoSo?.truongHopthuTuc.anThongTinLienHeNopTrucTuyen
    const hasEFormData = duLieuThemHoSo?.truongHopthuTuc.eForm != null && duLieuThemHoSo?.truongHopthuTuc.eForm != ""
    const { isMobile, isTablet } = useWindowSizeChange()
    const id = searchParams.get("id")
    const maTTHC = searchParams.get("maTTHC")
    const maTruongHop = searchParams.get("maTruongHop")
    const donViId = searchParams.get("donViId")
    const uyQuyen = Form.useWatch("uyQuyen", form)
    const {modal} = App.useApp()

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
        window.objDataCSDLDanCu = undefined
        window.objDataNopHoSo = undefined
        if (maTTHC || maTruongHop || donViId) {
            dispatch(
                GetDuLieuThemHoSo({
                    thuTucId: searchParams.get("maTTHC") as any,
                    truongHopId: searchParams.get("maTruongHop") as any,
                    returnPhiLePhi: true,
                    returnDonVi: true,
                    returnUserInfo: true,
                    donViId: searchParams.get("donViId") as any,
                    userId: user?.id
                })
            )
        }

    }, [maTTHC, maTruongHop, donViId])


    useEffect(() => {
        (async () => {

            if (id) {
                const { data: hoSoNhap } = await dispatch(GetHoSoNhap({
                    id: id as any,
                })).unwrap()
                if (hoSoNhap) {
                    const maTinhThanhChuHoSo = hoSoNhap?.tinhThanhChuHoSo;
                    const maQuanHuyenChuHoSo = hoSoNhap?.quanHuyenChuHoSo;
                    const maXaPhuongChuHoSo = hoSoNhap?.xaPhuongChuHoSo;
                    const maXaPhuongNguoiUyQuyen = hoSoNhap?.xaPhuongNguoiUyQuyen;
                    const maQuanHuyenNguoiUyQuyen = hoSoNhap?.quanHuyenNguoiUyQuyen;
                    const maTinhThanhNguoiUyQuyen = hoSoNhap?.tinhThanhNguoiUyQuyen;

                    dispatch(SearchDanhMucDiaBan({ Loai: "Tinh" }));

                    if (hoSoNhap?.uyQuyen) {
                        const resQuanHuyenChuHoSo = await danhMucDiaBanApi.Search({ Loai: "Huyen", maDiaBan: maTinhThanhChuHoSo });
                        const resQuanHuyenNguoiUyQuyen = await danhMucDiaBanApi.Search({ Loai: "Huyen", maDiaBan: maTinhThanhNguoiUyQuyen });
                        setDiaBanChuHoSo((curr) => ({ ...curr, maHuyen: resQuanHuyenChuHoSo.data.data }))
                        setDiaBanUyQuyen((curr) => ({ ...curr, maHuyen: resQuanHuyenNguoiUyQuyen.data.data }))
                        const resXaPhuongChuHoSo = await danhMucDiaBanApi.Search({ Loai: "Xa", maDiaBan: maQuanHuyenChuHoSo });
                        const resXaPhuongNguoiUyQuyen = await danhMucDiaBanApi.Search({ Loai: "Xa", maDiaBan: maQuanHuyenNguoiUyQuyen });
                        setDiaBanChuHoSo((curr) => ({ ...curr, maXa: resXaPhuongChuHoSo.data.data }))
                        setDiaBanUyQuyen((curr) => ({ ...curr, maXa: resXaPhuongNguoiUyQuyen.data.data }))

                    } else if (!hoSoNhap?.uyQuyen) {
                        const resQuanHuyen = await danhMucDiaBanApi.Search({ Loai: "Huyen", maDiaBan: maTinhThanhChuHoSo });
                        const resXaPhuong = await danhMucDiaBanApi.Search({ Loai: "Xa", maDiaBan: maQuanHuyenChuHoSo });
                        setDiaBanUyQuyen((curr) => ({ ...curr, maHuyen: resQuanHuyen.data.data }))
                        setDiaBanUyQuyen((curr) => ({ ...curr, maXa: resXaPhuong.data.data }))
                        setDiaBanChuHoSo((curr) => ({ ...curr, maHuyen: resQuanHuyen.data.data }))
                        setDiaBanChuHoSo((curr) => ({ ...curr, maXa: resXaPhuong.data.data }))
                        form.setFieldsValue({
                            nguoiUyQuyen: hoSoNhap.chuHoSo || "",
                            soGiayToNguoiUyQuyen: hoSoNhap.soGiayToChuHoSo || "",
                            tinhThanhNguoiUyQuyen: hoSoNhap.tinhThanhChuHoSo || "",
                            quanHuyenNguoiUyQuyen: hoSoNhap.quanHuyenChuHoSo,
                            xaPhuongNguoiUyQuyen: hoSoNhap.xaPhuongChuHoSo,
                            diaChiNguoiUyQuyen: hoSoNhap.diaChiChuHoSo,
                            emailNguoiUyQuyen: hoSoNhap.emailNguoiUyQuyen,
                            soDienThoaiChuHoSo: hoSoNhap.soDienThoaiChuHoSo,
                            soDienThoaiNguoiUyQuyen: hoSoNhap.soDienThoaiNguoiUyQuyen,
                            // tenTTHC: duLieuThemHoSo.tenTTHC || "",
                            // mucDo: duLieuThemHoSo.mucDo,
                            // laHoSoChungThuc: duLieuThemHoSo.laThuTucChungThuc,
                        })
                        form.setFieldValue("eFormData", hoSoNhap.eFormData)

                    }
                }
            }
        })()

        return () => {
            dispatch(resetData())
        }

    }, [id])

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

    useEffect(() => {
        if (hoSoNhapData) {
            form.setFieldsValue({ ...hoSoNhapData })
            form.setFieldValue("uyQuyen", !hoSoNhapData?.uyQuyen)
        }
    }, [hoSoNhapData])

    useEffect(() => {
        if (duLieuThemHoSo !== undefined) {
            form.setFieldValue("eFormDataValid", duLieuThemHoSo.truongHopthuTuc?.eForm ? false : true)
        }
    }, [duLieuThemHoSo])

    const onFinish = async () => {
        const formData = await form.validateFields() as any;

        if (showModal) {
            return;
        }
        const cloneFormData: IThemHoSo & IDeleteFiles = { ...formData, thuTucId: undefined }
        cloneFormData.mucDo = duLieuThemHoSo?.mucDo as any

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
        if(cloneFormData.laHoSoChungThuc){
            const chuaChonLoaiGiayTo = cloneFormData.thanhPhanHoSos?.findIndex(x => !x.maGiayTo || !x.ten)
                    
            if(chuaChonLoaiGiayTo != -1){
                toast.warn("Có thành phần hồ sơ chưa chọn nội dung/ tên giấy tờ")
                return;
            }
            const confirmed = await modal.confirm({
                title: <Typography.Title level={4}>Vui lòng xác nhận</Typography.Title>,
                content: <Typography.Title level={5}>Nếu trong 08 giờ ông/bà không mang giấy tờ (bản gốc) đến Bộ phận tiếp nhận và Trả kết quả, hồ sơ sẽ bị trả lại.</Typography.Title>,
                okText: "Đồng ý",
                cancelText: "Hủy bỏ",
                type:"info",
            })
            if(!confirmed){
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
            // deleteObjectKeyValues(cloneFormData, ["bcci_hoVaTen", "bcci_soDienThoai", "bcci_soDienThoai", "bcci_email",
            //     "bcci_diaChi", "bcci_tinhThanh", "bcci_quanHuyen", "bcci_xaPhuong", "bcci_ghiChu", "bcci_tenTinhThanh",
            //     "bcci_tenQuanHuyen", "bcci_tenXaPhuong", "thuTucId"])
        }
        else {
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

        try {
            setBtnLoading(true)
            const res = await dispatch(AddHoSoTrucTuyen(cloneFormData)).unwrap()
            if (res.succeeded) {
                setSubmitedHoSo({ maHoSo: res.data, chuHoSo: cloneFormData.chuHoSo, thoiGianThucHien: cloneFormData.thoiGianThucHien, tenTTHC: duLieuThemHoSo?.tenTTHC, groupName: duLieuThemHoSo?.tenDonVi })
                // setSearchParams ? setSearchParams((curr) => ({ ...curr })) : null
                form.resetFields()
                dispatch(DeleteHoSoNhap({ ids: [id as any], lyDoXoa: "", forceDelete: false }))
                setShowModal(true)
            }
            setBtnLoading(false)
        } catch {
            setBtnLoading(false)
        }
    }


    useEffect(() => {
        // const chatBotElement = document.getElementById("chatbot");
        // const socialWidget = document.getElementById("chatBotWidgets");
        // if (chatBotElement && socialWidget) {
        //     socialWidget.style.bottom = "40px"
        //     chatBotElement.style.display = "none"
        // }
        return () => {
            // if (socialWidget) {
            //     socialWidget.style.bottom = "90px"
            // }
            // if (chatBotElement) {
            //     chatBotElement.style.display = "block"
            // }
            dispatch(resetDuLieuThemHoSo())
        }
    }, [])

    const onChangeUyQuyen = (e: React.ChangeEvent<HTMLInputElement>) => {
        form.setFieldValue("uyQuyen", e.target.checked)
    }

    const onUpdateHoSoNhap = async () => {
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

        try {
            setBtnLoading(true)
            const res = await dispatch(UpdateHoSoNhap({ id: id as any, data: cloneFormData })).unwrap()
            if (res)
                hoSoLuuTruContext.setHoSoLuuTruModalVisible(false)
            setBtnLoading(false)

        } catch {
            setBtnLoading(false)
        }
    }


    return (
        <>
            <Spin spinning={duLieuThemHoSo == null}>
                <Form noValidate name="NopHoSoTrucTuyen" layout="vertical" scrollToFirstError form={form} initialValues={{ removeFiles: [], uyQuyen: true, hinhThucTra: "0" }} style={{ margin: "1rem 0 4.5rem 0" }}>
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
                    <div className="container commonBackgroundTrongDong">
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
                            <TepTinDinhKemHoSoNhap stepRef={stepRef} form={form} />
                            {showModal ? null :
                                <div style={{ display: "flex", justifyContent: "center", width: "100%", padding: "1rem 0", gap: "1rem" }}>
                                    <div style={{ display: "flex", justifyContent: "end", width: "auto", }}>
                                        <Button style={{ fontWeight: 600, color: '#222' }} onClick={onUpdateHoSoNhap} size="large" loading={btnLoading} htmlType="submit" block={isMobile || isTablet ? true : undefined} >
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

            </Spin>
        </>

    )
}