import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { AntdButton, AntdDivider, AntdModal, AntdSpace } from "@/lib/antd/components"
import { Button, Checkbox, Col, Form, Input, InputNumber, Spin, Switch, Typography } from "antd"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { AddHoSoTrucTiep } from "@/features/hoso/redux/action"
import dayjs from 'dayjs'
import { deleteObjectKeyValues, toUpperCase } from "@/utils/common"
import { DinhDanhSection } from "./DinhDanhSection"
import { LuaChonThuTucSectionWrapper } from "./LuaChonThuTucSection"
import { RenderTitle } from "@/components/common"
import { CheckOutlined, CloseOutlined, LoadingOutlined } from "@ant-design/icons"
import { UyQuyen } from "../../UyQuyen"
import { DangKyNhanKetQua } from "./DangKyNhanKetQua"
import { SwitchChangeEventHandler } from "antd/es/switch"
import { ToKhaiDienTu } from "../../ToKhaiDienTu"
import { TepDinhKem } from "./TepDinhKem"
import { PhiLePhi } from "../../PhiLePhi"
import { COPHILEPHI_OPTIONS, KHONGCOPHILEPHI_OPTIONS, LOAICHUHOSO_OPTIONS, LOAICHUHOSO_OPTIONS_OBJ, LOAIPHILEPHI_OPTIONS } from "@/features/hoso/data/formData"
import React, { ComponentProps, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { FormProps } from "@formio/react/lib/components/Form"
import { PhuongThucNhanThongBao } from "./PhuongThucNhanThongBao"
import { NguoiXuLyTiepTheo } from "../../NguoiXuLyTiepTheo"
import { toast } from "react-toastify"
import { DangKyNhanKetQuaTrucTuyen } from "@/features/portaldvc/NopHoSoTrucTuyen/components/DangKyNhanKetQuaTrucTuyen"
import { DangKyNhanKetQuaTrucTiep } from "./DangKyNhanKetQuaTrucTiep"
import { resetUserCSDLDanCu } from "@/features/user/redux/Slice"
import { IDeleteFiles, IResult } from "@/models"
import { SearchDanhMucDiaBan } from "@/features/danhmucdiaban/redux/action"
import { FormInstance } from "antd/lib"
import { Component } from "formiojs/types/components/_classes/component/component"
import { resetDatas as resetThuTucs } from "@/features/thutuc/redux/slice"
import { IGetDuLieuThemHoSo } from "@/features/truonghopthutuc/models"
import { IPhiLePhi } from "@/features/philephi/models"
import { DefaultOptionType } from "antd/es/select"
import { IThanhPhanHoSo } from "@/features/thanhphanhoso/models"
import { getFileName } from "@/utils"
import { hasDuplicateValue } from "@/features/hoso/data/formRules"
import { allItemHasFile } from "../themMoiHoSoChungThuc/utils/validate"
import { PhieuHuongDanNopTrucTiep } from "@/pages/dvc/MauPhieu/documents/pdf/PhieuHuongDanNopTrucTiep/PhieuHuongDanNopTrucTiep"
import PhieuHuongDanNopTrucTiepModal from "../../documentActions/PhieuHuongDanNopTrucTiepModal"

export type IThemHoSo = IHoSo & {
    bcci_hoVaTen?: string,
    bcci_soDienThoai?: string,
    bcci_email?: string,
    bcci_diaChi?: string,
    bcci_tinhThanh?: string,
    bcci_quanHuyen?: string,
    bcci_xaPhuong?: string,
    bcci_ghiChu?: string,
    bcci_tenTinhThanh?: string,
    bcci_tenQuanHuyen?: string,
    bcci_tenXaPhuong?: string,
    eFormDataValid?: boolean,
}
type ThemMoiTiepNhanHoSoModalProps = {
    submitHandler?: (formData: any) => Promise<IResult<any> | undefined>;
    tepDinhKemElement?: (form: FormInstance<any>, fetchedData: IGetDuLieuThemHoSo | undefined) => React.ReactNode;
    setSearchParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
    handlerCloseModal?: () => void;
    modalTitle?: React.ReactNode;
    phiLePhiOptions?: DefaultOptionType[];
    defaultSelectedPhiLePhi?: string;
    remove?: boolean;
    donViPhiDiaGioiElement?: (form: FormInstance<any>) => React.JSX.Element;
    validateFilesOnSubmit?: (thanhPhanHoSos: IThanhPhanHoSo[] | undefined) => {
        state: boolean;
        message: string;
    };
} & Pick<ComponentProps<typeof LuaChonThuTucSectionWrapper>, "extraSearchThuTuc">

const ThemMoiTiepNhanHoSoModal = ({ donViPhiDiaGioiElement, validateFilesOnSubmit, phiLePhiOptions, defaultSelectedPhiLePhi, setSearchParams, tepDinhKemElement, submitHandler, handlerCloseModal, modalTitle, remove, extraSearchThuTuc }: ThemMoiTiepNhanHoSoModalProps) => {
    const [form] = Form.useForm<IThemHoSo & IDeleteFiles>()
    const { loading } = useAppSelector(state => state.hoso)
    const { duLieuThemHoSo } = useAppSelector(state => state.truonghopthutuc)
    const { publicModule } = useAppSelector(state => state.config)
    const buttonActionContext = useButtonActionContext()
    const tepDinhKemContainerRef = useRef<HTMLDivElement>(null)
    const [noiDungHuongDanModalVisible, setNoiDungHuongDanModalVisible] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    // const [eFormData, setEformData] = useState<{submission: object, isValid?: boolean}>()

    const uploadFileConfig = useMemo(() => {
        return publicModule?.find(x => x.code == "post_create_hoso")?.content
    }, [publicModule])

    const handleCancel = () => {
        form.resetFields()
        if (handlerCloseModal) {
            handlerCloseModal()
        }
        buttonActionContext.setThemMoiTiepNhanHoSoModalVisible(false)
        dispatch(resetUserCSDLDanCu())
        dispatch(resetThuTucs())
    }

    const onFinish = async () => {
        try {
            const formData = await form.validateFields() as IThemHoSo & IDeleteFiles
            console.log(formData);

            const cloneFormData: IThemHoSo = { ...formData, thuTucId: undefined }
            // if (form.getFieldValue("daDinhDanh") !== true && formData.loaiDoiTuong == LOAICHUHOSO_OPTIONS_OBJ["Công dân"]) {
            //     toast.warn("Vui lòng định danh chủ hồ sơ")
            //     return;
            // }
            if (!cloneFormData.truongHopId) {
                return;
            }
            if (cloneFormData.thanhPhanHoSos && cloneFormData.thanhPhanHoSos.length == 0) {
                toast.warn(<span>Vui lòng thêm <strong>ít nhất một</strong> thành phần hồ sơ</span>)
                return
            }
            console.log(uploadFileConfig);
            
            if (uploadFileConfig) {
                try {
                    const uploadFileConfigParsed: { uploadSignedFile: boolean; allowSameFileName: boolean } = JSON.parse(uploadFileConfig)
                    if (uploadFileConfigParsed.uploadSignedFile && !allItemHasFile(cloneFormData.thanhPhanHoSos, "dinhKem")) {
                        toast.warn("Vui lòng đính kèm tệp vào từng thành phần hồ sơ")
                        tepDinhKemContainerRef.current?.scrollIntoView()
                        return;
                    }
                    if (!uploadFileConfigParsed.allowSameFileName) {
                        const tphsFileName = cloneFormData.thanhPhanHoSos?.flatMap(x => getFileName(x.dinhKem))
                        if (hasDuplicateValue(tphsFileName)) {
                            toast.warn(<span>Vui lòng <strong>không</strong> đính kèm các tệp <strong>trùng tên</strong></span>)
                            tepDinhKemContainerRef.current?.scrollIntoView()
                            return;
                        }
                    }
                } catch { }
            }

            if (validateFilesOnSubmit) {
                const res = validateFilesOnSubmit(cloneFormData.thanhPhanHoSos)
                if (!res.state) {
                    toast.warn(res.message)
                    tepDinhKemContainerRef.current?.scrollIntoView()
                    return
                }
            } else {
                if (cloneFormData.thanhPhanHoSos?.findIndex(thanhPhan => thanhPhan.dinhKem) == -1) {
                    toast.warn("Vui lòng đính kèm ít nhất 1 tệp")
                    tepDinhKemContainerRef.current?.scrollIntoView()
                    return
                }
            }

            // if(!formData.eFormDataValid) {
            //     toast.warn("Vui lòng điền các trường thông tin còn thiếu trong tờ khai")
            //     return;
            // }
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

            cloneFormData.eFormData = JSON.stringify(formData.eFormData)
            cloneFormData.ngayTiepNhan = dayjs(cloneFormData.ngayTiepNhan).format()
            cloneFormData.ngayHenTra = cloneFormData.ngayHenTra ? dayjs(cloneFormData.ngayHenTra).format() : undefined
            cloneFormData.ngaySinhChuHoSo = cloneFormData.ngaySinhChuHoSo ? dayjs(cloneFormData.ngaySinhChuHoSo).year().toString() : ""
            
            if (submitHandler) {
                const res = await submitHandler(cloneFormData)
                if (res?.succeeded) {
                    setSearchParams((curr) => ({ ...curr }))
                    handleCancel()
                }
            } else {
                const res = await dispatch(AddHoSoTrucTiep(cloneFormData)).unwrap()
                if (res.succeeded) {
                    setSearchParams((curr) => ({ ...curr }))
                    handleCancel()
                }
            }

        } catch (errorInfo: any) {
            if (errorInfo?.errorFields?.length) {
                const namePath = errorInfo.errorFields[0].name;
                toast.warn(errorInfo.errorFields[0].errors[0])
                const instance = form.getFieldInstance(namePath)
                instance?.focus();
                form.scrollToField(namePath)
            }
        }

    }
    // const onFinishFailed = (errorInfo: any) => {
    //     const namePath = errorInfo.errorFields[0].name;
    //     form.getFieldInstance(namePath)?.focus();
    //     form.scrollToField(namePath)
    //   };
    const onChangeToKhai = (formData: any) => {
        form.setFieldValue("eFormData", formData.data)
        form.setFieldValue("eFormDataValid", formData.isValid)
    }
    useEffect(() => {
        form.setFieldValue("eFormDataValid", duLieuThemHoSo?.truongHopthuTuc.eForm ? false : true)
        if (window.objDataCSDLDanCu !== undefined && Object.keys(window.objDataCSDLDanCu).length && duLieuThemHoSo?.truongHopthuTuc.eForm) {
            form.setFieldValue("eFormData", window.objDataCSDLDanCu)
        }
        form.setFieldValue("mucDo", duLieuThemHoSo?.mucDo ? duLieuThemHoSo.mucDo : "")
    }, [duLieuThemHoSo,])

    const checkHuongDanNopHoSo = async () => {
        try {
            const formData = await form.validateFields() as IThemHoSo & IDeleteFiles
            const cloneFormData: IThemHoSo = { ...formData, thuTucId: undefined }

            if (!cloneFormData.truongHopId) {
                return;
            }
            if (cloneFormData.thanhPhanHoSos && cloneFormData.thanhPhanHoSos.length == 0) {
                toast.warn(<span>Vui lòng thêm <strong>ít nhất một</strong> thành phần hồ sơ</span>)
                return
            }
            
            setNoiDungHuongDanModalVisible(true)
        } catch (errorInfo: any) {
            if (errorInfo?.errorFields?.length) {
                const namePath = errorInfo.errorFields[0].name;
                toast.warn(errorInfo.errorFields[0].errors[0])
                const instance = form.getFieldInstance(namePath)
                instance?.focus();
                form.scrollToField(namePath)
            }
        }
    }

    const [huongDanData, setHuongDanData] = useState<IHoSo>()
    const [noiDungHuongDan, setNoiDungHuongDan] = useState<string>()
    const huongDanNopHoSo = async () => {
        const formData = await form.validateFields() as IThemHoSo & IDeleteFiles
        const x: any = document.getElementById('noiDungHuongDan')
        const huongDanValue = x.value

        if (huongDanValue) {
            setHuongDanData(formData)
            setNoiDungHuongDan(huongDanValue)
            buttonActionContext.setInHuongDanNopTrucTiepModalVisible(true)
        } else {
            toast.error("Nhập nội dung hướng dẫn!")
            return
        }
    }

    return (
        <>
            <AntdModal confirmLoading={loading} title={modalTitle ? modalTitle : <><span>Tiếp nhận hồ sơ</span><AntdDivider /></>} handlerCancel={handleCancel} styles={{body:{ padding: "0 50px 50px 50px" }}}
                fullsizeScrollable visible={true} destroyOnClose keyboard={false}
                maskClosable={false}
                footer={[
                    <Button
                        type="primary"
                        onClick={onFinish}
                        loading={loading}
                        disabled={loading}
                    >
                        Lưu hồ sơ
                    </Button>,
                    <Button
                        type="primary"
                        loading={loading}
                        onClick={() =>
                            checkHuongDanNopHoSo()
                        }
                        disabled={loading}
                    >
                        Hướng dẫn nộp hồ sơ
                    </Button>,
                    <Button key="back" onClick={handleCancel} disabled={loading}> 
                        Hủy
                    </Button>

                ]}

            >
                <Spin spinning={loading}
                    indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
                >
                    <Form form={form} name="tiepnhanhoso" layout="vertical"
                        onFinish={onFinish}
                        scrollToFirstError
                        //    onFinishFailed={onFinishFailed} 
                        initialValues={{ kenhThucHien: "1", removeFiles: [], loaiDoiTuong: "Công dân", thongBaoZalo: true, thongBaoEmail: true, uyQuyen: false, maTrangThaiHoSo: "2", soBoHoSo: 1, hinhThucTra: "0" }}>
                        <Form.Item name="truongHopId" hidden
                        // rules={[{required : true, message : "Không được để trống!"}]}
                        ><Input /></Form.Item>
                        <Form.Item name="maTruongHop" hidden><Input /></Form.Item>
                        <Form.Item name="currentSelectedMaKetQuaTPTT" hidden><Input /></Form.Item>
                        <Form.Item name="tenTruongHop" hidden><Input /></Form.Item>
                        <Form.Item name="maTTHC" hidden><Input /></Form.Item>
                        <Form.Item name="tenTTHC" hidden><Input /></Form.Item>
                        <Form.Item name="mucDo" hidden><Input /></Form.Item>
                        <Form.Item name="maTrangThaiHoSo" hidden><Input /></Form.Item>
                        <Form.Item name="linhVucId" hidden><Input /></Form.Item>
                        <Form.Item name="hinhThucTra" hidden><Input /></Form.Item>
                        <Form.Item name="nodeQuyTrinh" hidden><Input /></Form.Item>
                        <Form.Item name="chiTietPhiLePhi" hidden><Input /></Form.Item>
                        <Form.Item name="thoiHanBuocXuLy" hidden><InputNumber /></Form.Item>
                        <Form.Item name="loaiThoiHanBuocXuLy" hidden><Input /></Form.Item>
                        <Form.Item name="buocXuLyTiep" hidden><Input /></Form.Item>
                        <Form.Item name="nguoiXuLyTiep" hidden><Input /></Form.Item>
                        <Form.Item name="tenBuocHienTai" hidden><Input /></Form.Item>
                        <Form.Item name="buocHienTai" hidden><Input /></Form.Item>
                        <Form.Item name="nguoiNhanHoSo" hidden><Input /></Form.Item>
                        <Form.Item name="nguoiDaXuLy" hidden><Input /></Form.Item>
                        <Form.Item name="dangKyNhanHoSoQuaBCCIData" hidden><Input /></Form.Item>
                        <Form.Item name="thanhPhanHoSos" hidden><Input /></Form.Item>
                        <Form.Item name="daDinhDanh" hidden valuePropName="checked"><Checkbox /></Form.Item>
                        <Form.Item name="bcci_tenTinhThanh" hidden><Input /></Form.Item>
                        <Form.Item name="bcci_tenQuanHuyen" hidden><Input /></Form.Item>
                        <Form.Item name="bcci_tenXaPhuong" hidden><Input /></Form.Item>
                        <Form.Item name="nguoiGui" hidden><Input /></Form.Item>
                        <Form.Item name="eFormData" hidden><Input /></Form.Item>
                        <Form.Item name="eFormDataValid" hidden><Input /></Form.Item>
                        <Form.Item name="removeFiles" hidden><Input /></Form.Item>
                        <Form.Item name="soDinhDanh" hidden><Input /></Form.Item>
                        <DinhDanhSection form={form} />
                        {donViPhiDiaGioiElement ? donViPhiDiaGioiElement(form) : null}
                        <LuaChonThuTucSectionWrapper form={form} extraSearchThuTuc={extraSearchThuTuc} />

                        <RenderTitle title={<div style={{ display: 'flex', alignItems: 'center' }}>Ủy quyền nộp hồ sơ
                            <Typography.Text type="danger" italic style={{ marginInline: 4 }}>(Nếu có tích vào ô bên cạnh)</Typography.Text>
                            <Form.Item name="uyQuyen" valuePropName="checked" style={{ marginBottom: 0 }}>
                                <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                />
                            </Form.Item>
                        </div>} />
                        <UyQuyen form={form} />

                        {remove ? null : <DangKyNhanKetQuaTrucTiep form={form} />}


                        {duLieuThemHoSo?.truongHopthuTuc.eForm ? <Col span={24}>
                            <RenderTitle title="Tờ khai điện tử" />
                            <ToKhaiDienTu form={duLieuThemHoSo.truongHopthuTuc.eForm} antdForm={form} onChange={onChangeToKhai} />
                        </Col> : null}
                        <AntdDivider />


                        <div ref={tepDinhKemContainerRef}>
                            {remove ? null : <>
                                {duLieuThemHoSo?.truongHopthuTuc.khongThuBanGiay ?
                                    <div style={{ marginBottom: '5px', width: '500px', backgroundColor: '#FFFF99', fontWeight: '500', color: 'rgb(139 139 29)' }}>                                <div style={{ padding: '5px 0', marginLeft: '10px' }}>
                                        <span style={{ fontWeight: '700' }}>Lưu ý</span>: thủ tục này không yêu cầu thu bản giấy.
                                    </div>
                                    </div>
                                    : <></>
                                }
                                <RenderTitle title="Tệp tin đính kèm" />
                                <TepDinhKem form={form} thanhPhanThuTucs={duLieuThemHoSo?.thanhPhanThuTucs} />
                                <AntdDivider />
                            </>}
                            {tepDinhKemElement && duLieuThemHoSo ? tepDinhKemElement(form, duLieuThemHoSo) : null}
                        </div>

                        <RenderTitle title="Thu phí, lệ phí" />
                        <PhiLePhi defaultSelected={defaultSelectedPhiLePhi} hasCharge={["Thu trước"]} form={form} hinhThucThuOptions={phiLePhiOptions ? phiLePhiOptions : duLieuThemHoSo?.trangThaiPhiLePhi ? COPHILEPHI_OPTIONS : KHONGCOPHILEPHI_OPTIONS} phiLePhis={duLieuThemHoSo?.trangThaiPhiLePhi ? duLieuThemHoSo?.phiLePhis : undefined} />

                        <PhuongThucNhanThongBao />

                        <RenderTitle title="Người xử lý tiếp theo" />
                        <NguoiXuLyTiepTheo form={form} truongHopThuTuc={duLieuThemHoSo?.truongHopthuTuc} />
                        {/* <AntdSpace direction="horizontal" style={{display:"flex", justifyContent:"end"}}>
                    <AntdButton onClick={handleCancel}>Đóng</AntdButton>
                    <AntdButton type="primary" onClick={onFinish} loading={loading}>Lưu hồ sơ</AntdButton>
                </AntdSpace> */}
                    </Form>
                </Spin>
            </AntdModal>

            <AntdModal title="Nội dung hướng dẫn" handlerCancel={() => setNoiDungHuongDanModalVisible(false)}
                width={600} visible={noiDungHuongDanModalVisible} destroyOnClose
                footer={[
                    <Button
                        type="primary"
                        onClick={huongDanNopHoSo}
                    >
                        Xuất phiếu
                    </Button>,

                    <Button key="back" onClick={() => setNoiDungHuongDanModalVisible(false)} >
                        Hủy
                    </Button>

                ]}
            >
                <Input.TextArea id="noiDungHuongDan" maxLength={1000} rows={5} showCount style={{ marginBottom: 20 }}
                    placeholder="Nhập nội dung hướng dẫn" />
            </AntdModal>

            <PhieuHuongDanNopTrucTiepModal noiDungHuongDan={noiDungHuongDan} hoSo={huongDanData} />

        </>
    )
}
export default ThemMoiTiepNhanHoSoModal