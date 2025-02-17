import { Col, DatePicker, Form, Input, Modal, Row, Typography } from "antd"
import { AntdAutoComplete, AntdButton, AntdDivider, AntdModal, AntdSelect, AntdSpace } from "@/lib/antd/components"
import { FORMAT_SOGIAYTO_LABEL, LOAICHUHOSO_OPTIONS } from "@/features/hoso/data/formData"
import { filterOptions } from "@/utils/select"
import { RenderTitle } from "../../../../../components/common/RenderTitle"
import { FormInstance } from "antd/lib"
import { IHoSo } from "@/features/hoso/models"
import { toast } from "react-toastify"
import { INPUT_RULES } from "@/features/hoso/data/formRules"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { GetUserBySoDinhDanh, GetUserFromCSDLDanCu } from "@/features/user/redux/Actions"
import { useDeferredValue, useEffect, useRef, useState } from "react"
import { ChiTietNguoiDung } from "@/features/user/components/ChiTietNguoiDung"
import { ChiTietChuHoSoModal } from "./ChiTietChuHoSoModal"
import { normalizeVN2ENString, toUpperCase } from "@/utils/common"
import { resetUserCSDLDanCu, toggleLoading } from "@/features/user/redux/Slice"
import type { InputProps, InputRef } from 'antd';
import { SearchProps } from "antd/es/input"
import { SearchOutlined } from "@ant-design/icons"
import { FORMAT_DATE, FORMAT_DATE_FORMIO, getYearsFrom } from "@/data"
import { SearchDanhMucDiaBan } from "@/features/danhmucdiaban/redux/action"
import dayjs from "dayjs"
import { IResult } from "@/models"
import { DinhDanhOTP } from "./DinhDanhOTP"



export const DinhDanhSection = ({ form }: { form: FormInstance<IHoSo> }) => {
    const soGiayToInputRef = useRef<InputRef | null>(null)
    const daDinhDanh: boolean = Form.useWatch("daDinhDanh", form)
    const loaiDoiTuong: string = Form.useWatch("loaiDoiTuong", form)
    const hinhThucTra: string = Form.useWatch("hinhThucTra", form)
    
    const dispatch = useAppDispatch()
    const { userCDSLDanCu, loading } = useAppSelector(state => state.user)
    const [dataForm] = Form.useForm<ChiTietNguoiDung>()
    const [showUserDetail, setShowUserDetail] = useState(false)
    const [showOTPModal, setShowOTPModal] = useState(false)
    const isLoaiDoiTuongCongDan = loaiDoiTuong === "Công dân"
    useEffect(() => {
        if (userCDSLDanCu !== undefined) {
            const diaChi = [userCDSLDanCu.noiOHienTai.chiTiet, userCDSLDanCu.noiOHienTai.tenPhuongXa, userCDSLDanCu.noiOHienTai.tenQuanHuyen, userCDSLDanCu.noiOHienTai.tenTinhThanh]
            form.setFieldValue("nguoiGui", userCDSLDanCu.soDinhDanh)
            form.setFieldValue("daDinhDanh", true)
            form.setFieldValue("diaChiChuHoSo", diaChi.filter(x => x).join(", "))
            form.setFieldValue("chuHoSo", userCDSLDanCu.fullName)
            form.setFieldValue("ngaySinhChuHoSo", dayjs(userCDSLDanCu.ngayThangNamSinh.ngayThangNam))
            form.setFieldValue("soDienThoaiChuHoSo", userCDSLDanCu.phoneNumber)
            form.setFieldValue("emailChuHoSo", userCDSLDanCu.email)
            dataForm.setFieldsValue({
                soDinhDanh: userCDSLDanCu.soDinhDanh,
                soCMND: userCDSLDanCu.soCMND,
                fullName: userCDSLDanCu.fullName,
                tinhTrangHonNhan: userCDSLDanCu.tinhTrangHonNhan,
                nhomMau: userCDSLDanCu.nhomMau,
                tonGiao: userCDSLDanCu.tonGiao,
                quocTich: userCDSLDanCu.quocTich,
                gioiTinh: userCDSLDanCu.gioiTinh,
                danToc: userCDSLDanCu.danToc,
                namSinh: userCDSLDanCu.namSinh,
                ngayThangNamSinh: userCDSLDanCu.ngayThangNamSinh.ngayThangNam,
                soSoHoKhau: userCDSLDanCu.soSoHoKhau,

                c_hoVaTen: userCDSLDanCu.cha.hoVaTen,
                c_quocTich: userCDSLDanCu.cha.quocTich,
                c_soCMND: userCDSLDanCu.cha.soCMND,
                c_soDinhDanh: userCDSLDanCu.cha.soDinhDanh,

                m_hoVaTen: userCDSLDanCu.me.hoVaTen,
                m_quocTich: userCDSLDanCu.me.quocTich,
                m_soCMND: userCDSLDanCu.me.soCMND,
                m_soDinhDanh: userCDSLDanCu.me.soDinhDanh,

                dd_hoVaTen: userCDSLDanCu.nguoiDaiDien.hoVaTen,
                dd_quocTich: userCDSLDanCu.nguoiDaiDien.quocTich,
                dd_soCMND: userCDSLDanCu.nguoiDaiDien.soCMND,
                dd_soDinhDanh: userCDSLDanCu.nguoiDaiDien.soDinhDanh,

                vc_hoVaTen: userCDSLDanCu.voChong.hoVaTen,
                vc_quocTich: userCDSLDanCu.voChong.quocTich,
                vc_soCMND: userCDSLDanCu.voChong.soCMND,
                vc_soDinhDanh: userCDSLDanCu.voChong.soDinhDanh,

                ch_hoVaTen: userCDSLDanCu.chuHo.hoVaTen,
                ch_quanHe: userCDSLDanCu.chuHo.quanHe,
                ch_soCMND: userCDSLDanCu.chuHo.soCMND,
                ch_soDinhDanh: userCDSLDanCu.chuHo.soDinhDanh,

                ks_maTinhThanh: userCDSLDanCu.noiDangKyKhaiSinh.maTinhThanh,
                ks_maQuanHuyen: userCDSLDanCu.noiDangKyKhaiSinh.maQuanHuyen,
                ks_maPhuongXa: userCDSLDanCu.noiDangKyKhaiSinh.maPhuongXa,
                ks_chiTiet: userCDSLDanCu.noiDangKyKhaiSinh.chiTiet,
                ks_quocGia: userCDSLDanCu.noiDangKyKhaiSinh.quocGia,

                qq_maTinhThanh: userCDSLDanCu.queQuan.maTinhThanh,
                qq_maQuanHuyen: userCDSLDanCu.queQuan.maQuanHuyen,
                qq_maPhuongXa: userCDSLDanCu.queQuan.maPhuongXa,
                qq_chiTiet: userCDSLDanCu.queQuan.chiTiet,
                qq_quocGia: userCDSLDanCu.queQuan.quocGia,

                tt_maTinhThanh: userCDSLDanCu.thuongTru.maTinhThanh,
                tt_maQuanHuyen: userCDSLDanCu.thuongTru.maQuanHuyen,
                tt_maPhuongXa: userCDSLDanCu.thuongTru.maPhuongXa,
                tt_chiTiet: userCDSLDanCu.thuongTru.chiTiet,
                tt_quocGia: userCDSLDanCu.thuongTru.quocGia,

                ht_maTinhThanh: userCDSLDanCu.noiOHienTai.maTinhThanh,
                ht_maQuanHuyen: userCDSLDanCu.noiOHienTai.maQuanHuyen,
                ht_maPhuongXa: userCDSLDanCu.noiOHienTai.maPhuongXa,
                ht_chiTiet: userCDSLDanCu.noiOHienTai.chiTiet,
                ht_quocGia: userCDSLDanCu.noiOHienTai.quocGia,

            })
            
            const cloneUser = JSON.parse(JSON.stringify(userCDSLDanCu))
            cloneUser.hoVaTen = JSON.parse((userCDSLDanCu.hoVaTen as unknown as string))
            cloneUser.ngayThangNamSinh = userCDSLDanCu.ngayThangNamSinh ? {
                NgayThangNam : userCDSLDanCu.ngayThangNamSinh.ngayThangNam ? dayjs(userCDSLDanCu.ngayThangNamSinh.ngayThangNam).format(FORMAT_DATE_FORMIO) : undefined,
                Nam: userCDSLDanCu.ngayThangNamSinh.nam
            } : null
            window.objDataCSDLDanCu = toUpperCase(cloneUser)
        }
    }, [userCDSLDanCu])

    useEffect(() => {
        if(hinhThucTra === "1" && userCDSLDanCu !== undefined){
            const maTinhThanh = userCDSLDanCu.thuongTru.maTinhThanh
            const maQuanHuyen =  userCDSLDanCu.thuongTru.maQuanHuyen
            const maPhuongXa =  userCDSLDanCu.thuongTru.maPhuongXa
            if(maTinhThanh){
                dispatch(SearchDanhMucDiaBan({ Loai: "Tinh" }))
                if (maTinhThanh && maQuanHuyen) {
                    dispatch(SearchDanhMucDiaBan({ Loai: "Huyen", maDiaBan: maTinhThanh }))
                    if (maPhuongXa) {
                        dispatch(SearchDanhMucDiaBan({ Loai: "Xa", maDiaBan: maTinhThanh + '.' + maQuanHuyen }))
                    }
                }
            }
        }
    }, [hinhThucTra,userCDSLDanCu])

    useEffect(() => {
        soGiayToInputRef.current?.focus()
        return () => {
            dispatch(resetUserCSDLDanCu())
        }
    },[])

    const onDinhDanh = async (otp: string | undefined = undefined) => {
        const data: Pick<IHoSo, "soGiayToChuHoSo" | "ngaySinhChuHoSo" | "chuHoSo"> = form.getFieldsValue(["soGiayToChuHoSo", "ngaySinhChuHoSo", "chuHoSo"])
        
        if (Object.values(data).every(x => x)) {
            const date = dayjs(data.ngaySinhChuHoSo)
            const req = { 
                HoVaTen: normalizeVN2ENString(data.chuHoSo as string), 
                SoDinhDanh: data.soGiayToChuHoSo.length == 12 ? data.soGiayToChuHoSo : "", 
                Nam: "", 
                NgayThangNam: date.format("YYYYMMDD"), 
                SoCMND: data.soGiayToChuHoSo.length == 9 ? data.soGiayToChuHoSo : "" ,
                OTP: otp,
            }
            try {
                const res = await dispatch(GetUserFromCSDLDanCu(req)).unwrap()
                if(res.succeeded){
                    toast.success("Định danh thành công")
                    form.setFieldValue("soDinhDanh", data.soGiayToChuHoSo)
                }
            } catch (error) {
                if((error as IResult<string>).message == "00"){
                    setShowOTPModal(true);
                    return;
                } else if((error as IResult<string>).message == "01"){
                    toast.warn("Sai mã OTP, vui lòng thử lại");
                    return;
                }
            }
        } else {
            toast.info("Vui lòng nhập đầy đủ số giấy tờ, năm sinh, họ và tên")
        }

    }
    const onQuickSearch = async () => {
        if(daDinhDanh){
            toast.info("Số CMND/CCCD chưa được định danh trên hệ thống")
            return;
        }
        const soDinhDanh = form.getFieldValue("soGiayToChuHoSo")
        if (soDinhDanh) {
            try{
                const res = await dispatch(GetUserBySoDinhDanh(soDinhDanh)).unwrap()
                if(res.succeeded){
                    toast.success("Định danh thành công")
                    form.setFieldValue("soDinhDanh", soDinhDanh)
                }else {
                    toast.error("Mã chưa được định danh trên hệ thống, vui lòng nhập thêm các thông tin để định danh chủ hồ sơ!")
                }
            } catch(err){
                // toast.warn("Thông tin người dùng không hợp lệ")
            }
        } else {
            toast.info("Vui lòng nhập thông tin số giấy tờ")
        }
    }
    const onScanKeyUp: SearchProps["onKeyDown"]= async (event) => {
        
        if(event.code === "Enter" || event.code === "NumpadEnter"){
            event.stopPropagation();
            event.preventDefault();
            const soGiayToChuHoSo: string = form.getFieldValue("soGiayToChuHoSo") 
            const data = soGiayToChuHoSo.split("|")
            const soDinhDanh = data[0]
            const hoVaTen = data[2]
            const ngayThangNam = data[3]
            if(!soDinhDanh || !hoVaTen || !ngayThangNam){
                toast.error("Dữ liệu scan không hợp lệ")
                return;
            }
            form.setFieldValue("soGiayToChuHoSo", soDinhDanh)
            form.setFieldValue("ngaySinhChuHoSo", ngayThangNam.slice(4))
            form.setFieldValue("chuHoSo", hoVaTen)
            await onDinhDanh()
        }
        
    }
    return <Row gutter={[8, 0]}>
        <Col span={24}>
            <RenderTitle title={"Định danh chủ hồ sơ"} />
            <div>

            </div>
        </Col>
        {/* <Input hidden onKeyUp={onScanKeyUp} ref={soGiayToInputRef}></Input> */}
        <Col md={6} span={24}>
            {/* ? */}
            <Form.Item name="loaiDoiTuong" label="Loại chủ hồ sơ">
                <AntdSelect options={LOAICHUHOSO_OPTIONS} showSearch filterOption={filterOptions} disabled={daDinhDanh} />
            </Form.Item>
        </Col>
        <Col md={6} span={24}>
            <Form.Item name="soGiayToChuHoSo" label={(FORMAT_SOGIAYTO_LABEL as any)[loaiDoiTuong]} rules={INPUT_RULES.soGiayToChuHoSo} hasFeedback>
                <Input
                    addonAfter={<span onClick={onQuickSearch} style={{cursor:daDinhDanh ? "not-allowed": "pointer"}}><SearchOutlined/> Xác thực</span>}
                    ref={soGiayToInputRef}
                    onKeyUp={onScanKeyUp}
                    placeholder="Nhập số căn cước công dân" 
                    disabled={daDinhDanh} />
            </Form.Item>
        </Col>
        <Col md={6} span={24}>
            <Form.Item name="chuHoSo" label="Họ và tên" rules={INPUT_RULES.soGiayToChuHoSo} >
                <Input placeholder="Nhập họ và tên" disabled={daDinhDanh} />
            </Form.Item>
        </Col>
        {isLoaiDoiTuongCongDan ? <Col md={6} span={24}>
            <Form.Item name="ngaySinhChuHoSo" label="Ngày tháng năm sinh" >
                {/* <AntdAutoComplete disabled={daDinhDanh} generateOptions={{model: getYearsFrom(1900), label: "label", value: "value"}} placeholder="Nhập năm sinh VD:2000"> */}
                    {/* <Input/> */}
                {/* </AntdAutoComplete> */}
                <DatePicker format={{
                        format: 'DD/MM/YYYY',
                        type: 'mask',
                }} disabled={daDinhDanh}/>
            </Form.Item>
        </Col>: null}
        
        <Col md={6} span={24}>
            <Form.Item name="soDienThoaiChuHoSo" label="Số điện thoại" rules={INPUT_RULES.soDienThoaiChuHoSo}>
                <Input placeholder="Nhập số điện thoại" minLength={10} maxLength={13}/>
            </Form.Item>
        </Col>
        <Col md={6} span={24}>
            <Form.Item name="emailChuHoSo" label="Email" rules={INPUT_RULES.emailChuHoSo}>
                <Input placeholder="Nhập địa chỉ email" />
            </Form.Item>
        </Col>
        <Col md={isLoaiDoiTuongCongDan ? 12 : 18} span={24}>
            <Form.Item name="diaChiChuHoSo" label="Địa chỉ" rules={INPUT_RULES.diaChiChuHoSo}>
                <Input.TextArea rows={1} placeholder="Nhập địa chỉ" />
            </Form.Item>
        </Col>
        <Col span={24}>
            {daDinhDanh ? <AntdButton type="primary" onClick={() => setShowUserDetail(true)}>
                Xem chi tiết chủ hồ sơ
            </AntdButton> : isLoaiDoiTuongCongDan ? <AntdButton onClick={() => onDinhDanh()} loading={loading} type="primary">Xác thực với CSDLQG về dân cư</AntdButton> : null}

        </Col>
        <AntdDivider />
        <ChiTietChuHoSoModal visible={showUserDetail} onClose={() => setShowUserDetail(false)} form={dataForm}/>
        {showOTPModal ? <DinhDanhOTP onOk={(otp) => onDinhDanh(otp)} onClose={() => setShowOTPModal(false)}/>: null}
    </Row>
}
