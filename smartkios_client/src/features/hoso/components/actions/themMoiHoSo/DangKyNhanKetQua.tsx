import { Col, Form, Input, Row, Switch, Typography } from "antd"
import { RenderTitle } from "../../../../../components/common/RenderTitle"
import { CheckOutlined, CloseOutlined } from "@ant-design/icons"
import { AntdDivider, AntdSelect } from "@/lib/antd/components"
import { filterOptions } from "@/utils"
import { useEffect } from "react"
import { FormInstance } from "antd/lib"
import { IHoSo } from "@/features/hoso/models"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { DefaultOptionType } from "antd/es/select"
import { SearchDanhMucDiaBan } from "@/features/danhmucdiaban/redux/action"
import { ISearchDanhMucDiaBan } from "@/features/danhmucdiaban/models"
import { SwitchChangeEventHandler } from "antd/es/switch"

export const DangKyNhanKetQua = ({ form }: { form: FormInstance<IHoSo> }) => {
    const { maHuyen, maTinh, maXa } = useAppSelector(state => state.danhmucdiaban)
    const uyQuyenHoSo = Form.useWatch("uyQuyen", form)
    const hinhThucTra = Form.useWatch("hinhThucTra", form)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (hinhThucTra != "1") {
            form.setFieldValue("bcci_hoVaTen", undefined)
            form.setFieldValue("bcci_soDienThoai", undefined)
            form.setFieldValue("bcci_email", undefined)
            form.setFieldValue("bcci_tinhThanh", undefined)
            form.setFieldValue("bcci_quanHuyen", undefined)
            form.setFieldValue("bcci_xaPhuong", undefined)
            form.setFieldValue("bcci_tenTinhThanh", undefined)
            form.setFieldValue("bcci_tenQuanHuyen", undefined)
            form.setFieldValue("bcci_tenXaPhuong", undefined)
        } else {
            const maTinhThanh =  window.objDataCSDLDanCu?.ThuongTru.MaTinhThanh
            const maQuanhHuyen =  window.objDataCSDLDanCu?.ThuongTru.MaQuanHuyen
            const maPhuongXa =  window.objDataCSDLDanCu?.ThuongTru.MaPhuongXa
            if (uyQuyenHoSo) {
                form.setFieldValue("bcci_hoVaTen", form.getFieldValue("nguoiUyQuyen"))
                form.setFieldValue("bcci_soDienThoai", form.getFieldValue("soDienThoaiNguoiUyQuyen"))
                form.setFieldValue("bcci_tinhThanh", maTinhThanh)
                form.setFieldValue("bcci_quanHuyen", maTinhThanh + "." +maQuanhHuyen)
                form.setFieldValue("bcci_xaPhuong", maTinhThanh + "."+maQuanhHuyen+"."+maPhuongXa)
            } else {
                form.setFieldValue("bcci_hoVaTen", form.getFieldValue("chuHoSo"))
                form.setFieldValue("bcci_soDienThoai", form.getFieldValue("soDienThoaiChuHoSo"))
                form.setFieldValue("bcci_email", form.getFieldValue("emailChuHoSo"))
                form.setFieldValue("bcci_tinhThanh",maTinhThanh)
                form.setFieldValue("bcci_quanHuyen", maTinhThanh + "." +maQuanhHuyen)
                form.setFieldValue("bcci_xaPhuong", maTinhThanh + "."+maQuanhHuyen+"."+maPhuongXa)
            }
            let diaChiChiTiet = window.objDataCSDLDanCu?.ThuongTru.ChiTiet +" ," + window.objDataCSDLDanCu?.ThuongTru.TenPhuongXa +
            ", " + window.objDataCSDLDanCu?.ThuongTru.TenQuanHuyen + " ,"+ window.objDataCSDLDanCu?.ThuongTru.TenTinhThanh
            form.setFieldValue("bcci_diaChi", diaChiChiTiet.trimStart().startsWith("?") ? diaChiChiTiet.substring(1) : diaChiChiTiet)
        }
    }, [hinhThucTra, uyQuyenHoSo])

    useEffect(() => {
        if (hinhThucTra === "1") {
            if (!maTinh?.length && (maTinh === undefined || maTinh === null)) {// 
                dispatch(SearchDanhMucDiaBan({ Loai: "Tinh" }))
            }
        }
    }, [maTinh, hinhThucTra])

    const onChangeMaDonVi = (data: DefaultOptionType, Loai: ISearchDanhMucDiaBan["Loai"], currentSelect: ISearchDanhMucDiaBan["Loai"]) => {
        if(data?.value){
            if (currentSelect != "Xa") {
                dispatch(SearchDanhMucDiaBan({ Loai: Loai, maDiaBan: data.value as string }),)
            }
            if (currentSelect == "Tinh") {
                form.setFieldValue("bcci_tenTinhThanh", data.label)
                form.setFieldValue("bcci_tinhThanh", data.value as string)
                form.resetFields(["bcci_quanHuyen", "bcci_xaPhuong", "bcci_tenQuanHuyen", "bcci_tenXaPhuong"])
            }
            if (currentSelect == "Huyen") {
                form.setFieldValue("bcci_quanHuyen", data.value as string)
                form.setFieldValue("bcci_tenQuanHuyen", data.label)
                form.resetFields(["bcci_xaPhuong", "bcci_tenXaPhuong"])
            }
            if (currentSelect == 'Xa') {
                form.setFieldValue("bcci_xaPhuong", data.value as string)
                form.setFieldValue("bcci_tenXaPhuong", data.label)
            }
        }
        
    }
    

    return <>
        {hinhThucTra === "1" ? <Row gutter={[8, 0]}>
            <Col span={8}>
                <Form.Item name="bcci_hoVaTen" label="Họ và tên:">
                    <Input placeholder="Nhập họ và tên" />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item name="bcci_soDienThoai" label="Số điện thoại:">
                    <Input placeholder="Nhập số điện thoại" maxLength={13}/>
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item name="bcci_email" label="Email:">
                    <Input placeholder="Nhập email" />
                </Form.Item>
            </Col>
            
            <Col span={8}>
                <Form.Item name="bcci_tinhThanh" label="Tỉnh/thành:">
                    <AntdSelect labelInValue onChange={(value) => onChangeMaDonVi(value, "Huyen", "Tinh")} showSearch allowClear filterOption={filterOptions} generateOptions={{ model: maTinh, label: "tenDiaBan", value: "maDiaBan" }} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item name="bcci_quanHuyen" label="Quận/huyện:">
                    <AntdSelect labelInValue onChange={(value) => onChangeMaDonVi(value, "Xa", "Huyen")} showSearch allowClear filterOption={filterOptions} generateOptions={{ model: maHuyen, label: "tenDiaBan", value: "maDiaBan" }} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item name="bcci_xaPhuong" label="Xã/phường:">
                    <AntdSelect labelInValue onChange={(value) => onChangeMaDonVi(value, "Xa", "Xa")} showSearch allowClear filterOption={filterOptions} generateOptions={{ model: maXa, label: "tenDiaBan", value: "maDiaBan" }} />
                </Form.Item>
            </Col>
            <Col md={24}>
                <Form.Item name="bcci_diaChi" label="Địa chỉ chi tiết:">
                    <Input.TextArea rows={1} autoSize/>
                </Form.Item>
            </Col>
            {/* <Col md={6} >
                <Form.Item name="bcci_ghiChu" label="Ghi chú">
                    <Input.TextArea rows={1} />
                </Form.Item>
            </Col> */}

        </Row> : null}
        <AntdDivider />
    </>
}