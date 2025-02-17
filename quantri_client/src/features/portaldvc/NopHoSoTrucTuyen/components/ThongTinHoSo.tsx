import { IDanhMucDiaBan, ISearchDanhMucDiaBan } from "@/features/danhmucdiaban/models"
import { SearchDanhMucDiaBan } from "@/features/danhmucdiaban/redux/action"
import { danhMucDiaBanApi } from "@/features/danhmucdiaban/services"
import { IHoSo } from "@/features/hoso/models"
import { AntdSelect } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Form, Input, Col, Row } from "antd"
import { DefaultOptionType } from "antd/es/select"
import { FormInstance } from "antd/lib"
import { useEffect, useMemo, useState } from "react"
import { DiaBanChuHoSo } from "."
import { INPUT_RULES } from "@/features/hoso/data/formRules"

export const ThongTinHoSo = ({form, setDiaBan, diaBan, hideRule}: {hideRule: boolean | undefined; form: FormInstance<IHoSo>; diaBan: DiaBanChuHoSo; setDiaBan: React.Dispatch<React.SetStateAction<DiaBanChuHoSo>> }) => {
    const uyQuyen = Form.useWatch("uyQuyen", form)
    const {maTinh} = useAppSelector(state => state.danhmucdiaban)
    const soGiayToChuHoSo = Form.useWatch("soGiayToChuHoSo", form)

    const onChangeMaDonVi = async (value: string, Loai: ISearchDanhMucDiaBan["Loai"], currentSelect: ISearchDanhMucDiaBan["Loai"]) => {
        if(value){
            if (currentSelect != "Xa") {
                const diabanRes = await danhMucDiaBanApi.Search({ Loai: Loai, maDiaBan: value as string })
                if(currentSelect == "Tinh"){
                    setDiaBan((curr) => ({...curr, maHuyen: diabanRes.data.data}))
                    form.resetFields(["quanHuyenChuHoSo","xaPhuongChuHoSo"])
                }
                if(currentSelect == "Huyen"){
                    setDiaBan((curr) => ({...curr, maXa: diabanRes.data.data}))
                    form.resetFields(["xaPhuongChuHoSo"])
                }
            }
        }
    }
    return (
        <Row gutter={8}>
            <Col span={24} lg={6} md={12}>
                <Form.Item name="chuHoSo" label="Tên/Doanh nghiệp/Tổ chức:" rules={hideRule ? undefined : [{ required: true, message: "Vui lòng nhập thông tin" }]}>
                    <Input  disabled={uyQuyen} />
                </Form.Item>
            </Col>
            <Col span={24} lg={6} md={12}>
                <Form.Item name="soGiayToChuHoSo" label="Số giấy tờ (CCCD/CMND/MST/MĐD):" rules={hideRule ? undefined : [{ required: true, message: "Vui lòng nhập thông tin" }]}>
                    <Input  disabled={uyQuyen && soGiayToChuHoSo ? true : false} />
                </Form.Item>
            </Col>
            <Col span={24} lg={6} md={12}>
                <Form.Item name="soDienThoaiChuHoSo" label="Số điện thoại:" rules={hideRule ? undefined :  INPUT_RULES.soDienThoaiChuHoSo}>
                    <Input minLength={10} maxLength={13}/>
                </Form.Item>
            </Col>
            <Col span={24} lg={6} md={12}>
                <Form.Item name="emailChuHoSo" label="Email:" rules={INPUT_RULES.emailChuHoSo}>
                    <Input />
                </Form.Item>
            </Col>
            <Col span={24} lg={6} md={12}>
                <Form.Item name="tinhThanhChuHoSo" label="Tỉnh/thành:" rules={hideRule ? undefined : [{ required: true, message: "Vui lòng nhập thông tin" }]}>
                    <AntdSelect  generateOptions={{model: maTinh, value: "maDiaBan" , label: "tenDiaBan"}} showSearch allowClear  onChange={(value) => onChangeMaDonVi(value, "Huyen", "Tinh")}/>
                </Form.Item>
            </Col>
            <Col span={24} lg={6} md={12}>
                <Form.Item name="quanHuyenChuHoSo" label="Quận/huyện:" rules={hideRule ? undefined : [{ required: true, message: "Vui lòng nhập thông tin" }]}>
                    <AntdSelect  generateOptions={diaBan.maHuyen ? {model: diaBan.maHuyen, value: "maDiaBan", label: "tenDiaBan"} : undefined}   showSearch allowClear onChange={(value) => onChangeMaDonVi(value, "Xa", "Huyen")}/>
                </Form.Item>
            </Col>
            <Col span={24} lg={6} md={12}>
                <Form.Item name="xaPhuongChuHoSo" label="Xã/phường:" rules={hideRule ? undefined : [{ required: true, message: "Vui lòng nhập thông tin" }]}>
                    <AntdSelect  generateOptions={diaBan.maXa ? {model: diaBan.maXa , value: "maDiaBan", label: "tenDiaBan"} : undefined}  showSearch allowClear onChange={(value) => onChangeMaDonVi(value, "Xa", "Xa")}/>
                </Form.Item>
            </Col>
            <Col span={24} lg={6} md={12}>
                <Form.Item name="diaChiChuHoSo" label="Địa chỉ chi tiết:" rules={hideRule ? undefined : [{ required: true, message: "Vui lòng nhập thông tin" }]}>
                    <Input.TextArea rows={1} autoSize/>
                </Form.Item>
            </Col>
        </Row>

    )
}