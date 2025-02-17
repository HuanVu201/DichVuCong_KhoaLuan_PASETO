import { Checkbox, CheckboxProps, Col, DatePicker, DatePickerProps, Form, Input, Row, Typography } from "antd"
import { IGiayToSoHoa, ISearchGiayToSoHoa } from "../models"
import React, { useEffect, useState } from "react"
import { AntdAutoComplete, AntdModal, AntdSelect } from "../../../lib/antd/components"
import { useGiayToSoHoaContext } from "../contexts/GiayToSoHoaProvider"
import { giayToSoHoaApi } from "../services"
import { FORMAT_DATE_WITHOUT_TIME } from "@/data"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import dayjs from 'dayjs'
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { formatISOtoDate } from "@/utils"
import { LOAI_KET_QUA_OPTIONS } from "@/features/hoso/data/formData"
import { DefaultOptionType } from "antd/es/select"
import { userService } from "@/features/user/services"
import ReactJson from "react-json-view"
import { AddGiayToSoHoa, GetGiayToSoHoa, UpdateGiayToSoHoa } from "../redux/action"
import { resetData } from "@/features/giaytosohoa/redux/slice"
import { toast } from "react-toastify"

export const GiayToSoHoaDetail = ({ searchParams, setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchGiayToSoHoa>>; searchParams: ISearchGiayToSoHoa }) => {
    const { data: giayToSoHoa, loading } = useAppSelector(state => state.giaytosohoa)
    const { data: user } = useAppSelector(state => state.user)
    const [form] = Form.useForm<IGiayToSoHoa>()
    const dispatch = useAppDispatch()
    const GiayToSoHoaContext = useGiayToSoHoaContext()
    const dinhKem = Form.useWatch("dinhKem", form)
    const thoiHanVinhVien = Form.useWatch("thoiHanVinhVien", form)
    const handlerCancel = () => {
        form.resetFields()
        dispatch(resetData())
        GiayToSoHoaContext.setViewMode(undefined)
        GiayToSoHoaContext.setGiayToSoHoaId(undefined)
    }

    const onOk = async () => {
        if(GiayToSoHoaContext.viewMode == "view"){
            return;
        }
        try {
            const formData = await form.validateFields()
            const data = {
                thoiGianSoHoa: formData.thoiGianSoHoa ? formatISOtoDate(formData.thoiGianSoHoa) : undefined,
                ngayBanHanh: formData.ngayBanHanh ? formatISOtoDate(formData.ngayBanHanh) : undefined,
                thoiHanHieuLuc: formData.thoiHanHieuLuc ? formatISOtoDate(formData.thoiHanHieuLuc) : undefined,
            }
            if(GiayToSoHoaContext.giayToSoHoaId && GiayToSoHoaContext.viewMode == "edit") {
                const res = await dispatch(UpdateGiayToSoHoa({id: GiayToSoHoaContext.giayToSoHoaId, data: {...formData, ...data}})).unwrap()
                if(res.succeeded){
                    setSearchParams((curr) => ({...curr}))
                }

            } else if(!GiayToSoHoaContext.giayToSoHoaId && GiayToSoHoaContext.viewMode == "add") {
                const res = await dispatch(AddGiayToSoHoa({...formData, 
                    ...data,
                    // maGiayTo: maKetQuaTTHC, maTTHC,
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
        if(GiayToSoHoaContext.giayToSoHoaId !== undefined) {
            dispatch(GetGiayToSoHoa({id: GiayToSoHoaContext.giayToSoHoaId}))
        }
    }, [GiayToSoHoaContext.giayToSoHoaId])

    useEffect(() => {
        if(GiayToSoHoaContext.viewMode == "add"){
            form.setFieldsValue({
                thoiGianSoHoa: dayjs(),
                fullName: user?.fullName,
                coQuanBanHanh: user?.officeName
            } as any)
        }
    }, [GiayToSoHoaContext.viewMode])

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
    const requiredRule = GiayToSoHoaContext.viewMode == "add" || GiayToSoHoaContext.viewMode == "edit" ? [{message: "Vui lòng nhập thông tin", required: true}] : undefined
    const modalTitle = `${GiayToSoHoaContext.viewMode == "view" ? 'CHI TIẾT' : GiayToSoHoaContext.viewMode == "edit" ? "CẬP NHẬT" : GiayToSoHoaContext.viewMode == "add" ? "THÊM MỚI" : "" } GIẤY TỜ SỐ HÓA`
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
        <AntdModal title={modalTitle} width={1200} confirmLoading={loading} visible={true} handlerCancel={handlerCancel} okText="Xác nhận" onOk={onOk} footer={GiayToSoHoaContext.viewMode == "view" ? null : undefined}>
            <Form name='GiayToSoHoa' layout="vertical" form={form} requiredMark={GiayToSoHoaContext.viewMode != "view"} disabled={GiayToSoHoaContext.viewMode == "view"} >
                <Form.Item hidden name="maHoSo"><Input /></Form.Item>
                <Row gutter={[8, 0]}>
                    <Col md={12} span={24}>
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
                    {GiayToSoHoaContext.viewMode == "view" ? <Col md={12} span={24}>
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
                            <RegularUpload fieldName="dinhKem" folderName="" form={form} dinhKem={dinhKem} hideUpload={GiayToSoHoaContext.viewMode != "add"} />
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