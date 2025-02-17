import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { AntdButton, AntdDivider, AntdModal, AntdSpace } from "@/lib/antd/components"
import { Checkbox, Col, Form, Input, InputNumber, Switch, Typography } from "antd"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { AddHoSoTrucTiep } from "@/features/hoso/redux/action"
import dayjs from 'dayjs'
import { deleteObjectKeyValues, toUpperCase } from "@/utils/common"
import { DinhDanhSection } from "./DinhDanhSection"
import { LuaChonThuTucSectionWrapper } from "./LuaChonThuTucSection"
import { RenderTitle } from "@/components/common"
import { CheckOutlined, CloseOutlined } from "@ant-design/icons"
import { UyQuyen } from "../../UyQuyen"
import { DangKyNhanKetQua } from "./DangKyNhanKetQua"
import { SwitchChangeEventHandler } from "antd/es/switch"
import { ToKhaiDienTu } from "../../ToKhaiDienTu"
import { TepDinhKem } from "./TepDinhKem"
import { PhiLePhi } from "../../PhiLePhi"
import { LOAIPHILEPHI_OPTIONS } from "@/features/hoso/data/formData"
import React, { ComponentProps, useCallback, useEffect, useRef, useState } from "react"
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
import { resetDatas as resetThuTucs  } from "@/features/thutuc/redux/slice"
import { IGetDuLieuThemHoSo } from "@/features/truonghopthutuc/models"
import { IPhiLePhi } from "@/features/philephi/models"
import { DefaultOptionType } from "antd/es/select"
import { IThanhPhanHoSo } from "@/features/thanhphanhoso/models"

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
    tepDinhKemElement?:  (form: FormInstance<any>, fetchedData: IGetDuLieuThemHoSo | undefined) => React.ReactNode; 
    setSearchParams : React.Dispatch<React.SetStateAction<ISearchHoSo>>;
    handlerCloseModal?: () => void;
    modalTitle?: React.ReactNode;
    phiLePhiOptions?: DefaultOptionType[];
    defaultSelectedPhiLePhi?: string;
    remove?: boolean;
    validateFilesOnSubmit?: (thanhPhanHoSos: IThanhPhanHoSo[] | undefined) => boolean;
} & Pick<ComponentProps<typeof LuaChonThuTucSectionWrapper>,  "extraSearchThuTuc">

const ThemMoiTiepNhanHoSoModal = ({validateFilesOnSubmit, phiLePhiOptions, defaultSelectedPhiLePhi, setSearchParams, tepDinhKemElement, submitHandler, handlerCloseModal, modalTitle, remove, extraSearchThuTuc}: ThemMoiTiepNhanHoSoModalProps) => {
    const [form] = Form.useForm<IThemHoSo & IDeleteFiles>()
    const {loading} = useAppSelector(state => state.hoso)
    const { duLieuThemHoSo } = useAppSelector(state => state.truonghopthutuc)
    const { maHuyen, maTinh, maXa } = useAppSelector(state => state.danhmucdiaban)
    const { datas: thuTucs } = useAppSelector(state => state.thutuc)
    const buttonActionContext = useButtonActionContext()
    const hinhThucTra = Form.useWatch("hinhThucTra", form)
    const tepDinhKemContainerRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()
    // const [eFormData, setEformData] = useState<{submission: object, isValid?: boolean}>()
    const handleCancel = () => {
        form.resetFields()
        if(handlerCloseModal){
            handlerCloseModal()
        }
        buttonActionContext.setThemMoiTiepNhanHoSoModalVisible(false)
        dispatch(resetUserCSDLDanCu())
        dispatch(resetThuTucs())
    }

    const onFinish = async () => {
        try {
            const formData = await form.validateFields() as IThemHoSo & IDeleteFiles
            const cloneFormData: IThemHoSo = {...formData, thuTucId: undefined}
            if(form.getFieldValue("daDinhDanh") !== true){
                toast.warn("Vui lòng định danh chủ hồ sơ")
                return;
            }
            if(!cloneFormData.truongHopId){
                return;
            }
            if(validateFilesOnSubmit){
                if(!validateFilesOnSubmit(cloneFormData.thanhPhanHoSos)){
                    toast.warn("Vui lòng đính kèm tệp vào thành phần hồ sơ")
                    tepDinhKemContainerRef.current?.scrollIntoView()
                    return
                }
            } else {
                if(cloneFormData.thanhPhanHoSos?.findIndex(thanhPhan => thanhPhan.dinhKem) == -1){
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
            if(cloneFormData.hinhThucTra == "1"){ // trả qua bưu điện
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
            }else {
                cloneFormData.dangKyNhanHoSoQuaBCCIData = ""
            }

            cloneFormData.eFormData = JSON.stringify(formData.eFormData)
            cloneFormData.ngayTiepNhan = dayjs(cloneFormData.ngayTiepNhan).format()
            cloneFormData.ngayHenTra = dayjs(cloneFormData.ngayHenTra).format()
            
            if(submitHandler){
                const res = await submitHandler(cloneFormData)
                if(res?.succeeded){
                    setSearchParams((curr) => ({...curr}))
                    handleCancel()
                }
            } else {
                const res = await dispatch(AddHoSoTrucTiep(cloneFormData)).unwrap()
                if(res.succeeded){
                    setSearchParams((curr) => ({...curr}))
                    handleCancel()
                }
            }
            
        } catch (errorInfo: any){
            if(errorInfo?.errorFields?.length){
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
        if(window.objDataCSDLDanCu !== undefined && Object.keys(window.objDataCSDLDanCu).length && duLieuThemHoSo?.truongHopthuTuc.eForm){
            form.setFieldValue("eFormData", window.objDataCSDLDanCu)
        }
        form.setFieldValue("mucDo", duLieuThemHoSo?.mucDo ? duLieuThemHoSo.mucDo : "")
    }, [duLieuThemHoSo,])
    return (
        <AntdModal confirmLoading={loading} title={modalTitle ? modalTitle : <><span>Tiếp nhận hồ sơ</span><AntdDivider /></>} handlerCancel={handleCancel} bodyStyle={{ padding:"0 50px 50px 50px" }}
         fullsizeScrollable visible={true} destroyOnClose okText="Lưu hồ sơ" onOk={onFinish}>
            <Form form={form} name="tiepnhanhoso" layout="vertical" 
                 onFinish={onFinish}
                 scrollToFirstError
                //    onFinishFailed={onFinishFailed} 
                initialValues={{kenhThucHien: "1",removeFiles: [], loaiDoiTuong : "Công dân",thongBaoZalo: true, thongBaoEmail: true, uyQuyen: false, maTrangThaiHoSo: "2", soBoHoSo: 1, hinhThucTra: "0" }}>
                <Form.Item name="truongHopId" hidden 
                // rules={[{required : true, message : "Không được để trống!"}]}
                ><Input/></Form.Item>
                <Form.Item name="maTruongHop" hidden><Input/></Form.Item>
                <Form.Item name="tenTruongHop" hidden><Input/></Form.Item>
                <Form.Item name="maTTHC" hidden><Input/></Form.Item>
                <Form.Item name="tenTTHC" hidden><Input/></Form.Item>
                <Form.Item name="mucDo" hidden><Input/></Form.Item>
                <Form.Item name="maTrangThaiHoSo" hidden><Input/></Form.Item>
                <Form.Item name="linhVucId" hidden><Input/></Form.Item>
                <Form.Item name="hinhThucTra" hidden><Input/></Form.Item>
                <Form.Item name="nodeQuyTrinh" hidden><Input/></Form.Item>
                <Form.Item name="chiTietPhiLePhi" hidden><Input/></Form.Item>
                <Form.Item name="thoiHanBuocXuLy" hidden><InputNumber/></Form.Item>
                <Form.Item name="loaiThoiHanBuocXuLy" hidden><Input/></Form.Item>
                <Form.Item name="buocXuLyTiep" hidden><Input/></Form.Item>
                <Form.Item name="nguoiXuLyTiep" hidden><Input/></Form.Item>
                <Form.Item name="tenBuocHienTai" hidden><Input/></Form.Item>
                <Form.Item name="buocHienTai" hidden><Input/></Form.Item>
                <Form.Item name="nguoiNhanHoSo" hidden><Input/></Form.Item>
                <Form.Item name="nguoiDaXuLy" hidden><Input/></Form.Item>
                <Form.Item name="dangKyNhanHoSoQuaBCCIData" hidden><Input/></Form.Item>
                <Form.Item name="thanhPhanHoSos" hidden><Input/></Form.Item>
                <Form.Item name="daDinhDanh" hidden valuePropName="checked"><Checkbox/></Form.Item>
                <Form.Item name="bcci_tenTinhThanh" hidden><Input/></Form.Item>
                <Form.Item name="bcci_tenQuanHuyen" hidden><Input/></Form.Item>
                <Form.Item name="bcci_tenXaPhuong" hidden><Input/></Form.Item>
                <Form.Item name="nguoiGui" hidden><Input/></Form.Item>
                <Form.Item name="eFormData" hidden><Input/></Form.Item>
                <Form.Item name="eFormDataValid" hidden><Input/></Form.Item>
                <Form.Item name="removeFiles" hidden><Input/></Form.Item>
                <Form.Item name="soDinhDanh" hidden><Input/></Form.Item>
                <DinhDanhSection form={form}/>
                <LuaChonThuTucSectionWrapper form={form} extraSearchThuTuc={extraSearchThuTuc}/>

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

                {remove ? null :  <DangKyNhanKetQuaTrucTiep form={form}/>}
               

                {duLieuThemHoSo?.truongHopthuTuc.eForm ? <Col span={24}>
                    <RenderTitle title="Tờ khai điện tử" />
                    <ToKhaiDienTu form={duLieuThemHoSo.truongHopthuTuc.eForm} antdForm={form} onChange={onChangeToKhai}/>
                </Col> : null}
                <AntdDivider />
                
                <div ref={tepDinhKemContainerRef}>
                    {remove ? null : <>
                        <RenderTitle title="Tệp tin đính kèm"/>
                        <TepDinhKem form={form} thanhPhanThuTucs={duLieuThemHoSo?.thanhPhanThuTucs}/>
                        <AntdDivider />
                    </>}
                    {tepDinhKemElement && duLieuThemHoSo ? tepDinhKemElement(form, duLieuThemHoSo) : null}
                </div>

                <RenderTitle title="Thu phí, lệ phí" />
                <PhiLePhi defaultSelected={defaultSelectedPhiLePhi} hasCharge={ ["Thu trước"]} form={form} hinhThucThuOptions={phiLePhiOptions ? phiLePhiOptions : LOAIPHILEPHI_OPTIONS} phiLePhis={duLieuThemHoSo?.phiLePhis}/>
                
                <PhuongThucNhanThongBao/>

                <RenderTitle title="Người xử lý tiếp theo" />
                <NguoiXuLyTiepTheo form={form} truongHopThuTuc={duLieuThemHoSo?.truongHopthuTuc}/>
                {/* <AntdSpace direction="horizontal" style={{display:"flex", justifyContent:"end"}}>
                    <AntdButton onClick={handleCancel}>Đóng</AntdButton>
                    <AntdButton type="primary" onClick={onFinish} loading={loading}>Lưu hồ sơ</AntdButton>
                </AntdSpace> */}
            </Form>
        </AntdModal>
    )
}
export default ThemMoiTiepNhanHoSoModal