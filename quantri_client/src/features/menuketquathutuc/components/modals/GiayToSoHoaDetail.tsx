import { AntdModal, AntdSelect } from "@/lib/antd/components"
import { MenuKetQuaThuTucViewMode, useMenuKetQuaThuTucContext } from "../../contexts/MenuKetQuaThuTucContext"
import { useForm } from "antd/es/form/Form"
import { IGiayToSoHoa, ISearchGiayToSoHoa } from "@/features/giaytosohoa/models"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Checkbox, CheckboxProps, Col, DatePicker, Form, Input, Row, Typography } from "antd"
import { FORMAT_DATE_ISO, FORMAT_DATE_WITHOUT_TIME } from "@/data"
import ReactJson from "react-json-view";
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import React, { useEffect, useState } from "react"
import { AddGiayToSoHoa, GetGiayToSoHoa, UpdateGiayToSoHoa } from "@/features/giaytosohoa/redux/action"
import dayjs from 'dayjs'
import { giayToSoHoaApi } from "@/features/giaytosohoa/services"
import { resetData } from "@/features/giaytosohoa/redux/slice"
import { toast } from "react-toastify"
import { Rule } from "antd/lib/form"
import { useSearchParams } from "react-router-dom"
import { formatISOtoDate } from "@/utils"
import { DatePickerProps } from "antd/lib"


export const GiayToSoHoaDetail = ({setSearchParams} : {setSearchParams: React.Dispatch<React.SetStateAction<ISearchGiayToSoHoa>>}) => {
    const { data: giayToSoHoa } = useAppSelector(state => state.giaytosohoa)
    const { data: user } = useAppSelector(state => state.user)
    const [form] = useForm<IGiayToSoHoa>()
    const dispatch = useAppDispatch()
    const menuKetQuaThuTucContext = useMenuKetQuaThuTucContext()
    const dinhKem = Form.useWatch("dinhKem", form)
    const [urlSearchParams] = useSearchParams()
    const thoiHanVinhVien = Form.useWatch("thoiHanVinhVien", form)
    const handlerCancel = () => {
        form.resetFields()
        dispatch(resetData())
        menuKetQuaThuTucContext.setViewMode(undefined)
        menuKetQuaThuTucContext.setGiayToSoHoaId(undefined)
    }

    const onOk = async () => {
        if(menuKetQuaThuTucContext.viewMode == "view"){
            return;
        }
        try {
            const formData = await form.validateFields()
            const data = {
                thoiGianSoHoa: formData.thoiGianSoHoa ? formatISOtoDate(formData.thoiGianSoHoa) : undefined,
                ngayBanHanh: formData.ngayBanHanh ? formatISOtoDate(formData.ngayBanHanh) : undefined,
                thoiHanHieuLuc: formData.thoiHanHieuLuc ? formatISOtoDate(formData.thoiHanHieuLuc) : undefined,
            }
            if(menuKetQuaThuTucContext.giayToSoHoaId && menuKetQuaThuTucContext.viewMode == "edit") {
                const res = await dispatch(UpdateGiayToSoHoa({id: menuKetQuaThuTucContext.giayToSoHoaId, 
                    data: {...formData, ...data}} as any)).unwrap()
                if(res.succeeded){
                    setSearchParams((curr) => ({...curr}))
                }

            } else if(!menuKetQuaThuTucContext.giayToSoHoaId && menuKetQuaThuTucContext.viewMode == "add") {
                const maKetQuaTTHC = urlSearchParams.get("MaKetQuaTTHC");
                const maTTHC = urlSearchParams.get("MaTTHC");
                if(!maKetQuaTTHC || !maTTHC){
                    toast.success("Không có dữ liệu Mã thủ tục, mã kết quả")
                    return;
                }
                const res = await dispatch(AddGiayToSoHoa({...formData, ...data, maGiayTo: maKetQuaTTHC, maTTHC,
                    dinhKemSoHoa: formData.dinhKem
                })).unwrap()
                if(res.succeeded){
                    toast.success("Thêm mới thành công")
                    setSearchParams((curr) => ({...curr}))
                }
            } 
            handlerCancel()
        } catch (error) {
            console.error(error)
        }
        
    }

    useEffect(() => {
        if(menuKetQuaThuTucContext.giayToSoHoaId !== undefined) {
            dispatch(GetGiayToSoHoa({id: menuKetQuaThuTucContext.giayToSoHoaId}))
        }
    }, [menuKetQuaThuTucContext.giayToSoHoaId])

    useEffect(() => {
        if(menuKetQuaThuTucContext.viewMode == "add"){
            form.setFieldsValue({
                thoiGianSoHoa: dayjs(),
                fullName: user?.fullName,
                coQuanBanHanh: user?.officeName
            } as any)
        }
    }, [menuKetQuaThuTucContext.viewMode])

    useEffect(() => {
        if(giayToSoHoa){
            form.setFieldsValue({
                ...giayToSoHoa,
                thoiGianSoHoa: giayToSoHoa.thoiGianSoHoa ? dayjs(giayToSoHoa.thoiGianSoHoa) : undefined,
                ngayBanHanh: giayToSoHoa.ngayBanHanh ? dayjs(giayToSoHoa.ngayBanHanh) : undefined,
                thoiHanHieuLuc: giayToSoHoa.thoiHanHieuLuc ? dayjs(giayToSoHoa.thoiHanHieuLuc) : undefined,
            } as any)
        }
    }, [giayToSoHoa])

    const requiredRule = menuKetQuaThuTucContext.viewMode == "add" || menuKetQuaThuTucContext.viewMode == "edit" ? [{message: "Vui lòng nhập thông tin", required: true}] : undefined
    
    const modalTitle = `${menuKetQuaThuTucContext.viewMode == "view" ? 'CHI TIẾT' : menuKetQuaThuTucContext.viewMode == "edit" ? "CẬP NHẬT" : menuKetQuaThuTucContext.viewMode == "add" ? "THÊM MỚI" : "" } GIẤY TỜ SỐ HÓA`
    const onChangThoiHanVinhVien: CheckboxProps["onChange"] = (e) => {
        e.target.checked ? form.setFieldValue("thoiHanHieuLuc",  undefined) : form.setFieldValue("thoiHanHieuLuc",  dayjs(form.getFieldValue("ngayBanHanh")).add(6, 'month'))
    }

    const disabledNgayHetHanDate: DatePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        const ngayBanHanh = form.getFieldValue("ngayBanHanh")
        return current && current < dayjs(ngayBanHanh).endOf('day');
    };

    const onChangeNgayBanHanh : DatePickerProps["onChange"] = (value) => {
        if(value > form.getFieldValue("thoiHanHieuLuc")){
            form.setFieldValue("thoiHanHieuLuc", undefined)
        }
    }

    return (
        <AntdModal visible={true} title={modalTitle}
         okText={"Xác nhận"}
         handlerCancel={handlerCancel} fullsizeScrollable onOk={onOk} footer={menuKetQuaThuTucContext.viewMode == "view" ? null : undefined}>
            <Form name="GiayToSoHoaDetail" form={form} layout="vertical" disabled={menuKetQuaThuTucContext.viewMode == "view"}>
                <Row gutter={[8, 0]}>
                    <Col md={menuKetQuaThuTucContext.viewMode == "view" ? 24 : 12} span={24}>
                        <Form.Item name="ten" label="Tên giấy tờ số hóa" rules={requiredRule}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item name="ma" label="Mã giấy tờ số hóa" 
                        // tooltip={"<Số định danh công dân>.<Mã thành phần thủ tục>.<Số ký hiệu>.<Số thứ tự>"}
                        rules={requiredRule}>
                            <Input />
                        </Form.Item>
                    </Col>
                    {menuKetQuaThuTucContext.viewMode == "view" ? <Col md={12} span={24}>
                        <Form.Item name="fullName" label="Người số hóa" rules={requiredRule}>
                            <Input />
                        </Form.Item>
                    </Col> : null}
                    <Col md={12} span={24}>
                        <Form.Item name="loaiSoHoa" label="Loại số hóa" rules={requiredRule}>
                            <AntdSelect options={[{value: "1", label: "Kết quả"}, {value: "0", label: "Thành phần"}]}/>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item name="coQuanBanHanh" label="Cơ quan ban hành" rules={requiredRule}>
                            <Input />
                        </Form.Item>
                    </Col>


                    <Col md={8} span={24}>
                        <Form.Item name="chuGiayTo" label="Chủ giấy tờ" rules={requiredRule}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={8} span={24}>
                        <Form.Item name="maDinhDanh" label="Số giấy tờ chủ hồ sơ" rules={requiredRule}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={8} span={24}>
                        <Form.Item name="maHoSo" label="Mã hồ sơ" tooltip="Thông tin giấy tờ số hóa cho chủ hồ sơ">
                            <Input />
                        </Form.Item>
                    </Col>


                    <Col md={6} span={24}>
                        <Form.Item name="thoiGianSoHoa" label="Ngày số hóa" rules={requiredRule}>
                            <DatePicker format={FORMAT_DATE_WITHOUT_TIME} />
                        </Form.Item>
                    </Col>
                    
                    <Col md={6} span={24}>
                        <Form.Item valuePropName="checked" name="thoiHanVinhVien" label="Giấy tờ vô thời hạn">
                            <Checkbox onChange={onChangThoiHanVinhVien}/>
                        </Form.Item>
                    </Col>
                    <Col md={6} span={24}>
                        <Form.Item name="ngayBanHanh" label="Ngày ban hành" rules={requiredRule}>
                            <DatePicker format={FORMAT_DATE_WITHOUT_TIME} onChange={onChangeNgayBanHanh}/>
                        </Form.Item>
                    </Col>
                    <Col md={6} span={24}>
                        <Form.Item name="thoiHanHieuLuc" label="Ngày hết hạn">
                            <DatePicker format={FORMAT_DATE_WITHOUT_TIME} disabled={thoiHanVinhVien} 
                            disabledDate={disabledNgayHetHanDate}/>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item name="phamViHieuLuc" label="Phạm vi hiệu lực">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item name="trichYeuNoiDung" label="Trích yếu nội dung">
                            <Input.TextArea />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item name="nguoiKy" label="Người ký">
                            <Input />
                        </Form.Item>
                    </Col>
                    
                    <Col md={12} span={24}>
                        <Form.Item name="dinhKem" label="Đính kèm" rules={requiredRule}>
                            <RegularUpload fieldName="dinhKem" folderName="" form={form} dinhKem={dinhKem} hideUpload={menuKetQuaThuTucContext.viewMode != "add"} />
                        </Form.Item>
                    </Col>
                    
                    <Col span={24}>
                        <Typography.Title level={5}>Dữ liệu trích xuất</Typography.Title>
                        <ReactJson
                            src={
                                giayToSoHoa?.jsonOcr != undefined
                                    ? JSON.parse(giayToSoHoa.jsonOcr)
                                    : {}
                            }
                        />
                    </Col>
                </Row>
            </Form>
        </AntdModal>
    )
}