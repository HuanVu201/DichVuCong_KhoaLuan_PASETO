import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { ISearchHoSo } from "@/features/hoso/models"
import { AntdButton, AntdDivider, AntdModal, AntdSelect } from "@/lib/antd/components"
import { Col, Form, Input, Row, Switch, Typography } from "antd"
import { RenderTitle } from "../../../../../components/common/RenderTitle"
import { filterOptions, getFileName } from "@/utils"
import { CheckOutlined, CloseOutlined } from "@ant-design/icons"
import { UyQuyen } from "../../UyQuyen"
import { PhuongThucNhanThongBao } from "../themMoiHoSo/PhuongThucNhanThongBao"
import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { resetData } from "@/features/hoso/redux/slice"
import { GetHoSo, UpdateHoSo } from "@/features/hoso/redux/action"
import dayjs from 'dayjs'
import { useTiepNhanHoSoContext } from "../../../../../pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"
import { FORMAT_SOGIAYTO_LABEL, LOAICHUHOSO_OPTIONS } from "../../../data/formData"
import { SearchDanhMucDiaBan } from "@/features/danhmucdiaban/redux/action"
import { resetMaHuyen, resetMaTinh, resetMaXa } from "@/features/danhmucdiaban/redux/slice"
import { deleteObjectKeyValues } from "@/utils/common"
import { TepDinhKem } from "../themMoiHoSo/TepDinhKem"
import { IThemHoSo } from "../themMoiHoSo/ThemMoiTiepNhanHoSoModal"
import { INPUT_RULES, hasDuplicateValue } from "@/features/hoso/data/formRules"
import { ToKhaiDienTu } from "../../ToKhaiDienTu"
import { toast } from "react-toastify"
import { SwitchChangeEventHandler } from "antd/es/switch"
import { SearchThanhPhanHoSo } from "@/features/thanhphanhoso/redux/action"
import { TepDinhKemSuaHoSo } from "./TepDinhKemHoSo"
import { resetDatas } from "@/features/thanhphanhoso/redux/slice"
import { DiaBanPhatSinhHoSo } from "@/features/hoso/components/DiaBanPhatSinhHoSo"
import { allItemHasFile } from "../themMoiHoSoChungThuc/utils/validate"
import { ThanhPhanChungThucHoSo } from "./ThanhPhanChungThuc"
import { DangKyNhanKetQua } from "./DangKyNhanKetQua"

const SuaHoSoModal = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchHoSo>> }) => {
    const buttonActionContext = useButtonActionContext()
    const [form] = Form.useForm<any>()
    const dispatch = useAppDispatch()
    const { data: hoSo, loading } = useAppSelector(state => state.hoso)
    const hinhThucTra = Form.useWatch("hinhThucTra", form)
    const loaiDoiTuong: string = Form.useWatch("loaiDoiTuong", form)
    const isLoaiDoiTuongCongDan = loaiDoiTuong === "Công dân"
    const { publicModule } = useAppSelector(state => state.config)

    const uploadFileConfig = useMemo(() => {
        return publicModule?.find(x => x.code == "post_create_hoso")?.content
    }, [publicModule])

    useEffect(() => {
        if (hinhThucTra === "1" && hoSo) {
            const dangKyNoiNhan: any = hoSo.dangKyNhanHoSoQuaBCCIData ? JSON.parse(hoSo.dangKyNhanHoSoQuaBCCIData) : undefined
            if (dangKyNoiNhan) {
                if (dangKyNoiNhan.quanHuyen) {
                    dispatch(SearchDanhMucDiaBan({ Loai: "Huyen", maDiaBan: dangKyNoiNhan.tinhThanh }),)
                }
                if (dangKyNoiNhan.xaPhuong) {
                    dispatch(SearchDanhMucDiaBan({ Loai: "Xa", maDiaBan: dangKyNoiNhan.quanHuyen }),)
                }
                form.setFieldValue("bcci_hoVaTen", dangKyNoiNhan.hoVaTen)
                form.setFieldValue("bcci_soDienThoai", dangKyNoiNhan.soDienThoai)
                form.setFieldValue("bcci_email", dangKyNoiNhan.email)
                form.setFieldValue("bcci_diaChi", dangKyNoiNhan.diaChi)
                form.setFieldValue("bcci_tinhThanh", dangKyNoiNhan.tinhThanh)
                form.setFieldValue("bcci_quanHuyen", dangKyNoiNhan.quanHuyen)
                form.setFieldValue("bcci_xaPhuong", dangKyNoiNhan.xaPhuong)
                form.setFieldValue("bcci_tenTinhThanh", dangKyNoiNhan.tenTinhThanh)
                form.setFieldValue("bcci_tenQuanHuyen", dangKyNoiNhan.tenQuanHuyen)
                form.setFieldValue("bcci_tenXaPhuong", dangKyNoiNhan.tenXaPhuong)
                form.setFieldValue("bcci_ghiChu", dangKyNoiNhan.ghiChu)
            }
        }
        return () => {
            dispatch(resetMaTinh())
            dispatch(resetMaHuyen())
            dispatch(resetMaXa())
        }
    }, [hinhThucTra, hoSo])
    useEffect(() => {
        if (!hoSo) {
            dispatch(GetHoSo({ id: buttonActionContext.selectedHoSos[0] as string, returnNodeQuyTrinh: true }))
        }
    }, [buttonActionContext.selectedHoSos[0]])
    useEffect(() => {
        if (hoSo) {
            form.setFieldsValue({
                ...hoSo,
                // ngayTiepNhan: hoSo.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan) as any : undefined,
                // ngayHenTra: hoSo.ngayHenTra ? dayjs(hoSo.ngayHenTra) as any : undefined,
            })
            form.setFieldValue("eFormDataValid", hoSo.eForm ? false : true)
        }
    }, [hoSo])
    const handleCancel = () => {
        buttonActionContext.setSuaHoSoModalVisible(false)
        form.resetFields()
        dispatch(resetDatas())
        dispatch(resetData())
    }
    const onOk = async () => {
        const formData = await form.validateFields() as IThemHoSo
        
        const cloneFormData: IThemHoSo = { ...formData, thuTucId: undefined }
        if (!formData.eFormDataValid) {
            toast.error("Vui lòng điền các trường thông tin còn thiếu trong tờ khai")
            return;
        }
        if (cloneFormData.thanhPhanHoSos && cloneFormData.thanhPhanHoSos.length == 0) {
            toast.warn(<span>Vui lòng thêm <strong>ít nhất một</strong> thành phần hồ sơ</span>)
            return
        }
        if (uploadFileConfig) {
            try {
                const uploadFileConfigParsed: { uploadSignedFile: boolean; allowSameFileName: boolean } = JSON.parse(uploadFileConfig)
                if (uploadFileConfigParsed.uploadSignedFile && !allItemHasFile(cloneFormData.thanhPhanHoSos, "dinhKem")) {
                    toast.warn("Vui lòng đính kèm tệp vào từng thành phần hồ sơ")
                    return;
                }
                if (!uploadFileConfigParsed.allowSameFileName && hoSo?.kenhThucHien != "2") {
                    const tphsFileName = cloneFormData.thanhPhanHoSos?.flatMap(x => getFileName(x.dinhKem))
                    if (hasDuplicateValue(tphsFileName)) {
                        toast.warn(<span>Vui lòng <strong>không</strong> đính kèm các tệp <strong>trùng tên</strong></span>)
                        return;
                    }
                }
            } catch { }
        }

        
        if (cloneFormData.thanhPhanHoSos?.findIndex(thanhPhan => thanhPhan.dinhKem) == -1) {
            toast.warn("Vui lòng đính kèm ít nhất 1 tệp")
            return
        }
        delete cloneFormData.eFormDataValid
        if (cloneFormData.hinhThucTra == "1") { // trả qua bưu điện
            cloneFormData.dangKyNhanHoSoQuaBCCIData = JSON.stringify({
                hoVaTen: formData.bcci_hoVaTen,
                soDienThoai: formData.bcci_soDienThoai,
                email: formData.bcci_email,
                diaChi: formData.bcci_diaChi ? `${formData.bcci_diaChi}, ${formData.bcci_tenXaPhuong}, ${formData.bcci_tenQuanHuyen}, ${formData.bcci_tenTinhThanh}` : 
                `${formData.bcci_tenXaPhuong}, ${formData.bcci_tenQuanHuyen}, ${formData.bcci_tenTinhThanh}`,
                tinhThanh: formData.bcci_tinhThanh ,
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
        cloneFormData.eFormData = JSON.stringify(formData.eFormData)
        // cloneFormData.ngayTiepNhan = dayjs(cloneFormData.ngayTiepNhan).format()
        // cloneFormData.ngayHenTra = dayjs(cloneFormData.ngayHenTra).format()
        await dispatch(UpdateHoSo({ id: buttonActionContext.selectedHoSos[0] as string, data: cloneFormData })).unwrap()
        setSearchParams((curr) => ({ ...curr }))
        handleCancel()
    }
    const onChangeToKhai = (formData: any) => {
        form.setFieldValue("eFormData", formData.data)
        form.setFieldValue("eFormDataValid", formData.isValid)
    }
    const setHinhThucTra: SwitchChangeEventHandler = (value) => {
        form.setFieldValue("hinhThucTra", value ? "1" : "0")
    }
    return <AntdModal confirmLoading={loading} visible={true} title={"CHỈNH SỬA HỒ SƠ:" + ` ${hoSo?.maHoSo ?? ""} ${hoSo?.chuHoSo ? `(${hoSo.chuHoSo})` : ""}`} handlerCancel={handleCancel} fullsizeScrollable onOk={onOk} okText="Xác nhận">
        <Form name="SuaHoSoModal" form={form} layout="vertical" initialValues={{ deletedThanhPhanIds: [] }}>
            <Form.Item name="hinhThucTra" hidden><Input /></Form.Item>
            <Form.Item name="deletedThanhPhanIds" hidden><Input /></Form.Item>
            <Form.Item name="eFormData" hidden><Input /></Form.Item>
            <Form.Item name="eFormDataValid" hidden><Input /></Form.Item>
            <Form.Item name="bcci_tenTinhThanh" hidden><Input /></Form.Item>
            <Form.Item name="bcci_tenQuanHuyen" hidden><Input /></Form.Item>
            <Form.Item name="bcci_tenXaPhuong" hidden><Input /></Form.Item>
            <Form.Item name="thanhPhanHoSos" hidden><Input /></Form.Item>
            <Form.Item name="maTTHC" hidden><Input /></Form.Item>

            <Row gutter={8}>
                <>
                    <Col span={24}>
                        <RenderTitle title="Thông tin chung" />
                    </Col>
                    <Col span={24}>
                        <Form.Item name="trichYeuHoSo" label="Nội dung hồ sơ" rules={INPUT_RULES.trichYeuHoSo}>
                            <Input.TextArea rows={2} />
                        </Form.Item>
                    </Col>
                    <AntdDivider />
                </>
                <>
                    {hoSo ? <DiaBanPhatSinhHoSo form={form} quanHuyenDiaBan={hoSo?.quanHuyenDiaBan} tinhThanhDiaBan={hoSo?.tinhThanhDiaBan} xaPhuongDiaBan={hoSo?.xaPhuongDiaBan} mergeStr={false} /> : null}
                </>
                <>
                    <Col span={24}>
                        <RenderTitle title={"Định danh chủ hồ sơ"} />
                    </Col>
                    <Col md={6} span={24}>
                        <Form.Item name="loaiDoiTuong" label="Loại chủ hồ sơ">
                            <AntdSelect options={LOAICHUHOSO_OPTIONS} showSearch filterOption={filterOptions} />
                        </Form.Item>
                    </Col>
                    <Col md={6} span={24}>
                        <Form.Item name="soGiayToChuHoSo" label={(FORMAT_SOGIAYTO_LABEL as any)[loaiDoiTuong]} rules={INPUT_RULES.soGiayToChuHoSo} hasFeedback>
                            <Input placeholder="Nhập số căn cước công dân" />
                        </Form.Item>
                    </Col>
                    <Col md={6} span={24}>
                        <Form.Item name="chuHoSo" label="Họ và tên" rules={INPUT_RULES.chuHoSo} hasFeedback>
                            <Input placeholder="Nhập họ và tên" />
                        </Form.Item>
                    </Col>
                    {isLoaiDoiTuongCongDan ? <Col md={6} span={24}>
                        <Form.Item name="ngaySinhChuHoSo" label="Năm sinh" >
                            <Input placeholder="Nhập năm sinh VD:2000" />
                        </Form.Item>
                    </Col> : null}
                    <Col md={6} span={24}>
                        <Form.Item name="soDienThoaiChuHoSo" label="Số điện thoại" rules={INPUT_RULES.soDienThoaiChuHoSo} hasFeedback>
                            <Input placeholder="Nhập số điện thoại" />
                        </Form.Item>
                    </Col>
                    <Col md={6} span={24}>
                        <Form.Item name="emailChuHoSo" label="Email">
                            <Input placeholder="Nhập địa chỉ email" />
                        </Form.Item>
                    </Col>
                    <Col md={isLoaiDoiTuongCongDan ? 12 : 18} span={24}>
                        <Form.Item name="diaChiChuHoSo" label="Địa chỉ" rules={INPUT_RULES.diaChiChuHoSo} hasFeedback>
                            <Input.TextArea rows={1} placeholder="Nhập địa chỉ" />
                        </Form.Item>
                    </Col>
                    <AntdDivider />
                </>
                <>
                    <Col span={24}>
                        <RenderTitle title={<div style={{ display: 'flex', alignItems: 'center' }}>Ủy quyền nộp hồ sơ
                            <Form.Item name="uyQuyen" valuePropName="checked" style={{ marginBottom: 0 }}>
                                <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    style={{ marginLeft: 4 }}
                                />
                            </Form.Item>
                        </div>} />
                    </Col>
                    <Col span={24}>
                        {hoSo ? <UyQuyen form={form} diaChiNguoiUyQuyen={hoSo.diaChiNguoiUyQuyen} tinhThanhDiaBan={hoSo?.tinhThanhNguoiUyQuyen} quanHuyenDiaBan={hoSo?.quanHuyenNguoiUyQuyen} xaPhuongDiaBan={hoSo?.xaPhuongNguoiUyQuyen} mergeStr={false}/> : null}
                    </Col>
                </>
                {hoSo?.laHoSoChungThuc ? null : <>
                    <Col span={24}>
                        <RenderTitle title={<div style={{ display: 'flex', alignItems: 'center' }}>Đăng ký nhận kết quả hồ sơ qua BCCI
                            <Typography.Text type="danger" italic style={{ marginInline: 4 }}>(Nếu có tích vào ô bên cạnh, không tích là nhận kết quả trực tiếp)</Typography.Text>
                            <Switch
                                checked={hinhThucTra === "1"}
                                style={{ marginLeft: 4 }}
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                onChange={setHinhThucTra}
                            />
                        </div>} />
                        <DangKyNhanKetQua form={form} />
                    </Col>
                </>}
                
                <>
                    {hoSo?.eForm ? <Col span={24}>
                        <RenderTitle title="Tờ khai điện tử" />
                        <ToKhaiDienTu defaultOpen form={hoSo?.eForm} submission={hoSo?.eFormData ? { data: JSON.parse(hoSo.eFormData) } : undefined} antdForm={form} onChange={onChangeToKhai} />
                    </Col> : null}
                    <AntdDivider />
                </>
                <>
                    <Col span={24}>
                        <PhuongThucNhanThongBao />
                    </Col>
                    <AntdDivider />
                </>
                <>


                    <Col span={24}>
                        {hoSo?.laHoSoChungThuc ? (
                            <>
                                <ThanhPhanChungThucHoSo form={form} />
                            </>
                        ) : (
                            <>
                                <RenderTitle title="Tệp tin đính kèm" />
                                <TepDinhKemSuaHoSo form={form} />
                            </>
                        )}
                    </Col>
                    <AntdDivider />
                </>
            </Row>
        </Form>
    </AntdModal>
}

export default SuaHoSoModal
