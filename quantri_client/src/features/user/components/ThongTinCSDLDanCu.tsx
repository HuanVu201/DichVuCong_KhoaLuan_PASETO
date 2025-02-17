import { RenderTitle } from "@/components/common"
import { IHoSo } from "@/features/hoso/models"
import { AntdAutoComplete, AntdButton, AntdDivider, AntdSelect } from "@/lib/antd/components"
import { Col, DatePicker, Form, Input, Row, Select } from "antd"
import { GetCSDLDanCuResponse, IUser, ThongTinCSDLDanCuSearchParams } from "../models"
import { userService } from "../services"
import { toast } from "react-toastify"
// import {XMLParser,} from 'fast-xml-parser'
import { normalizeVN2ENString } from "@/utils/common"
import { FORMAT_DATE_WITHOUT_TIME, getYearsFrom } from "@/data"
import { ChiTietNguoiDung } from "./ChiTietNguoiDung"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { GetUserFromCSDLDanCu } from "../redux/Actions"
import { useEffect, useState } from "react"
import { resetUserCSDLDanCu } from "../redux/Slice"
import { TSTypeHelpers } from "@/lib/typescripts"
import dayjs from 'dayjs'
import { DinhDanhOTP } from "@/features/hoso/components/actions/themMoiHoSo/DinhDanhOTP"
import { IResult } from "@/models"

export const ThongTinCSDLDanCu = () => {
    const [searchForm] = Form.useForm<ThongTinCSDLDanCuSearchParams>()
    const [dataForm] = Form.useForm<ChiTietNguoiDung>()
    const {userCDSLDanCu} = useAppSelector(state => state.user)
    const [loading, setLoading] = useState(false)
    const [showOTPModal, setShowOTPModal] = useState(false)
    const dispatch = useAppDispatch()
    useEffect(() => {
        return () => {
            dispatch(resetUserCSDLDanCu())
        }
    }, [])
    useEffect(() => {
        if(userCDSLDanCu != undefined){
            dataForm.setFieldsValue({
                soDinhDanh: userCDSLDanCu.soDinhDanh,
                soCMND: userCDSLDanCu.soCMND,
                firstName: userCDSLDanCu.firstName,
                lastName: userCDSLDanCu.lastName,
                fullName: userCDSLDanCu.fullName,
                tinhTrangHonNhan: userCDSLDanCu.tinhTrangHonNhan,
                nhomMau: userCDSLDanCu.nhomMau,
                tonGiao: userCDSLDanCu.tonGiao,
                quocTich: userCDSLDanCu.quocTich,
                gioiTinh: userCDSLDanCu.gioiTinh,
                danToc: userCDSLDanCu.danToc,
                namSinh: userCDSLDanCu.namSinh,
                ngayThangNamSinh: (userCDSLDanCu.ngayThangNamSinh != null && userCDSLDanCu.ngayThangNamSinh.ngayThangNam) ? dayjs(userCDSLDanCu.ngayThangNamSinh.ngayThangNam).format(FORMAT_DATE_WITHOUT_TIME) : "",
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
        }
    }, [userCDSLDanCu])
    const onFinishSearch = async (otp: string | undefined = undefined) => {
        const values = searchForm.getFieldsValue() as ThongTinCSDLDanCuSearchParams;
        const formData: ThongTinCSDLDanCuSearchParams = {...values, HoVaTen: normalizeVN2ENString(values.HoVaTen), OTP: otp}
        if(values.LoaiGiayTo == "CCCD"){
            formData.SoDinhDanh = values.SoDinhDanh
            formData.SoCMND = ""
        }else if (values.LoaiGiayTo == "CMND"){
            formData.SoCMND = values.SoDinhDanh
            formData.SoDinhDanh = ""
        }
        try {
            setLoading(true)
            await dispatch(GetUserFromCSDLDanCu({...formData, Nam: "", NgayThangNam: dayjs(formData.NgayThangNam).format("YYYYMMDD"), UpdateEntity: true})).unwrap()
            setLoading(false)
        } catch (error) {
            if((error as IResult<string>).message == "00"){
                setShowOTPModal(true);
                return;
            } else if((error as IResult<string>).message == "01"){
                toast.warn("Sai mã OTP, vui lòng thử lại");
                return;
            }
            setLoading(false)
        }
    }
    return <>
    <Form form={searchForm} name="ThongTinCSDLDanCuSearch" layout="vertical" initialValues={{ LoaiGiayTo: "CCCD" }} onFinish={() => onFinishSearch()}>
        <Row gutter={8} justify="center" align="middle">
            <Col span={24}>
                <RenderTitle title="THÔNG TIN XÁC THỰC BẮT BUỘC" level={4} />
            </Col>
            <Col md={12} span={24}>
                <Form.Item name="HoVaTen" label="Họ và tên" rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}>
                    <Input ></Input>
                </Form.Item>
            </Col>
            <Col md={12} span={24}>
                {/* <Form.Item name="NgayThangNam" label="Năm sinh" rules={[{ required: true, message: "Vui lòng nhập năm sinh" }]}>
                    <DatePicker format={"DD/MM/YYYY"}/>
                </Form.Item> */}
                <Form.Item name="NgayThangNam" label="Ngày tháng năm sinh" rules={[{ required: true, message: "Vui lòng nhập ngày tháng năm sinh" }]}>
                    <DatePicker format={{
                        format: 'DD/MM/YYYY',
                        type: 'mask',
                    }}/>
                </Form.Item>
            </Col>
            <Col md={12} span={24}>
                <Form.Item name="LoaiGiayTo" label="Loại giấy tờ" rules={[{ required: true, message: "Vui lòng chọn loại giấy tờ" }]}>
                    <Select options={[{ value: "CCCD", label: "Căn cước công dân" }, { value: "CMND", label: "Chứng minh nhân dân" }]} />
                </Form.Item>
            </Col>
            <Col md={12} span={24}>
                <Form.Item name="SoDinhDanh" label="Số giấy tờ" rules={[{ required: true, message: "Vui lòng nhập số giấy tờ" }]}>
                    <Input ></Input>
                </Form.Item>
            </Col>
            <Col span={1}>
                <AntdButton type="primary" htmlType="submit" loading={loading}>Kiểm tra</AntdButton>
            </Col>
        </Row>
    </Form>
    <ChiTietNguoiDung form={dataForm}/>
    {showOTPModal ? <DinhDanhOTP onOk={(otp) => onFinishSearch(otp)} onClose={() => setShowOTPModal(false)}/>: null}

    </>
}

