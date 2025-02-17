import { IDanhMucDiaBan, ISearchDanhMucDiaBan } from "@/features/danhmucdiaban/models"
import { danhMucDiaBanApi } from "@/features/danhmucdiaban/services"
import { IHoSo } from "@/features/hoso/models"
import { AntdSelect } from "@/lib/antd/components"
import { useAppSelector } from "@/lib/redux/Hooks"
import { Form, Input, Col, Row } from "antd"
import { FormInstance } from "antd/lib"
import React, { useEffect, useMemo, useState } from "react"
import { DiaBanUyQuyen } from "."

export const NguoiUyQuyen = ({form, setDiaBan, diaBan, hideRule}: {hideRule: boolean | undefined; form: FormInstance<IHoSo>; diaBan: DiaBanUyQuyen; setDiaBan: React.Dispatch<React.SetStateAction<DiaBanUyQuyen>> }) => {
    
    const {maTinh} = useAppSelector(state => state.danhmucdiaban)
    
    const onChangeMaDonVi = async (value: string, Loai: ISearchDanhMucDiaBan["Loai"], currentSelect: ISearchDanhMucDiaBan["Loai"]) => {
        if(value){
            if (currentSelect != "Xa") {
                const diabanRes = await danhMucDiaBanApi.Search({ Loai: Loai, maDiaBan: value as string })
                if(currentSelect == "Huyen"){
                    setDiaBan((curr) => ({...curr, maXa: diabanRes.data.data}))
                    form.resetFields(["xaPhuongNguoiUyQuyen"])
                }
            }
        }
    }
    return (
        <Row gutter={8}>
            <Col span={24} lg={6} md={12}>
                <Form.Item name="nguoiUyQuyen" label="Họ và tên:" rules={hideRule ? undefined : [{ required: true, message: "Vui lòng nhập thông tin" }]}>
                    <Input disabled />
                </Form.Item>
            </Col>
            <Col span={24} lg={6} md={12}>
                <Form.Item name="soGiayToNguoiUyQuyen" label="CMND/CCCD:" rules={hideRule ? undefined : [{ required: true, message: "Vui lòng nhập thông tin" }]}>
                    <Input disabled />
                </Form.Item>
            </Col>
            <Col span={24} lg={6} md={12}>
                <Form.Item name="soDienThoaiNguoiUyQuyen" label="Số điện thoại:" rules={hideRule ? undefined : [{ required: true, message: "Vui lòng nhập số điện thoại" }]}>
                    <Input />
                </Form.Item>
            </Col>
            <Col span={24} lg={6} md={12}>
                <Form.Item name="emailNguoiUyQuyen" label="Email:">
                    <Input />
                </Form.Item>
            </Col>
            <Col span={24} lg={6} md={12}>
                <Form.Item name="tinhThanhNguoiUyQuyen" label="Tỉnh/thành:" rules={hideRule ? undefined : [{ required: true, message: "Vui lòng nhập thông tin" }]}>
                    <AntdSelect disabled={maTinh !== undefined}  generateOptions={{model: maTinh, value: "maDiaBan" , label: "tenDiaBan"}} showSearch allowClear  onChange={(value) => onChangeMaDonVi(value, "Huyen", "Tinh")}/>
                </Form.Item>
            </Col>
            <Col span={24} lg={6} md={12}>
                <Form.Item name="quanHuyenNguoiUyQuyen" label="Quận/huyện:" rules={hideRule ? undefined : [{ required: true, message: "Vui lòng nhập thông tin" }]}>
                    <AntdSelect  generateOptions={diaBan.maHuyen ? {model: diaBan.maHuyen, value: "maDiaBan", label: "tenDiaBan"} : undefined}   showSearch allowClear onChange={(value) => onChangeMaDonVi(value, "Xa", "Huyen")}/>
                </Form.Item>
            </Col>
            <Col span={24} lg={6} md={12}>
                <Form.Item name="xaPhuongNguoiUyQuyen" label="Xã/phường:" rules={hideRule ? undefined : [{ required: true, message: "Vui lòng nhập thông tin" }]}>
                    <AntdSelect  generateOptions={diaBan.maXa ? {model: diaBan.maXa , value: "maDiaBan", label: "tenDiaBan"} : undefined}  showSearch allowClear onChange={(value) => onChangeMaDonVi(value, "Xa", "Xa")}/>
                </Form.Item>
            </Col>
            <Col span={24} lg={6} md={12}>
                <Form.Item name="diaChiNguoiUyQuyen" label="Địa chỉ chi tiết:" rules={hideRule ? undefined : [{ required: true, message: "Vui lòng nhập thông tin" }]}>
                    <Input.TextArea rows={1} autoSize/>
                </Form.Item>
            </Col>
        </Row>

    )
}