import { IHoSo } from "@/features/hoso/models";
import { Col, Form, FormInstance, Input, Row, Select, Switch, Typography } from "antd";
import { useEffect, useState, useMemo } from "react";

import { AntdDivider, AntdSelect } from "@/lib/antd/components";
import { INPUT_RULES } from "../data/formRules";
import { ISearchDanhMucDiaBan } from "@/features/danhmucdiaban/models";
import { DiaBanChuHoSo } from "@/features/portaldvc/NopHoSoTrucTuyen/components";
import { danhMucDiaBanApi } from "@/features/danhmucdiaban/services";
import { useAppSelector } from "@/lib/redux/Hooks";
import { filterOptions, filterOptionsWithChildren } from "@/utils";

export const UyQuyen = ({form, tinhThanhDiaBan, quanHuyenDiaBan, xaPhuongDiaBan, diaChiNguoiUyQuyen, mergeStr} : {form: FormInstance<IHoSo>;diaChiNguoiUyQuyen?:string; tinhThanhDiaBan?: string; quanHuyenDiaBan?: string; xaPhuongDiaBan?: string; mergeStr?: boolean}) => {
    const uyQuyenHoSo = Form.useWatch("uyQuyen", form)
    const [diaBan, setDiaBan] = useState<DiaBanChuHoSo>({
        maTinh: [],
        maHuyen: [],
        maXa: [],
     })
     const [tenDiaBan, setTenDiaBan] = useState({
        tenTinh: "",
        tenHuyen: "",
        tenXa: "",
     })
     useEffect(() => {
        form.setFieldValue("diaChiNguoiUyQuyenText", JSON.stringify(tenDiaBan))
     }, [tenDiaBan])
     
     useEffect(() => {
        (async () => {
           const maTinhCauHinh = tinhThanhDiaBan 
           
           form.setFieldValue("tinhThanhNguoiUyQuyen", maTinhCauHinh)
           const res = await danhMucDiaBanApi.Search({Loai: "Tinh"})
           setDiaBan((curr) => ({...curr, maTinh: res.data.data}))
  
           const tenTinhRes = res.data.data.find(x => x.maDiaBan === maTinhCauHinh)?.tenDiaBan || ""
           
           setTenDiaBan((curr) => ({...curr, tenTinh: tenTinhRes}))
           const searchXa = mergeStr ? maTinhCauHinh+ "."+quanHuyenDiaBan : quanHuyenDiaBan;
           const mergeQuanHuyen = mergeStr ? searchXa : quanHuyenDiaBan
           const mergeXaPhuong = mergeStr ? maTinhCauHinh+ "."+ quanHuyenDiaBan + "."+xaPhuongDiaBan : xaPhuongDiaBan
           if(maTinhCauHinh){
              form.setFieldValue("tinhThanhNguoiUyQuyen", maTinhCauHinh)
              if(!quanHuyenDiaBan){
                 const resQuan = await danhMucDiaBanApi.Search({Loai: "Huyen",maDiaBan: maTinhCauHinh})
                 setDiaBan((curr) => ({...curr, maHuyen: resQuan.data.data}))
              }
           }
           if(quanHuyenDiaBan){
              form.setFieldValue("quanHuyenNguoiUyQuyen", mergeQuanHuyen)
              const resQuan = await danhMucDiaBanApi.Search({Loai: "Huyen",maDiaBan: maTinhCauHinh})
              setDiaBan((curr) => ({...curr, maHuyen: resQuan.data.data}))
              const resXa = await danhMucDiaBanApi.Search({Loai: "Xa",maDiaBan: searchXa})
              setDiaBan((curr) => ({...curr, maXa: resXa.data.data}))
           }
           if(xaPhuongDiaBan && !quanHuyenDiaBan){
              form.setFieldValue("xaPhuongNguoiUyQuyen", mergeXaPhuong)
              const res = await danhMucDiaBanApi.Search({Loai: "Xa",maDiaBan: searchXa})
              setDiaBan((curr) => ({...curr, maXa: res.data.data}))
           }
           form.setFieldValue("diaChiNguoiUyQuyen", diaChiNguoiUyQuyen)
        })()
     }, [quanHuyenDiaBan, tinhThanhDiaBan, xaPhuongDiaBan, diaChiNguoiUyQuyen])
     // useEffect(() => {
     //    (async () => {
     //       const res = await danhMucDiaBanApi.Search({Loai: "Tinh"})
     //       setDiaBan((curr) => ({...curr, maTinh: res.data.data}))
     //    })()
     // }, [])
     const onChangeMaDonVi = async (value: string, Loai: ISearchDanhMucDiaBan["Loai"], currentSelect: ISearchDanhMucDiaBan["Loai"], opt: any ) => {
        if(!value){
           return 
        }
        const label = opt.children
        
        
        if(value){
           if (currentSelect != "Xa") {
              const diabanRes = await danhMucDiaBanApi.Search({ Loai: Loai, maDiaBan: value })
              if(currentSelect == "Tinh"){
                 setDiaBan((curr) => ({...curr, maHuyen: diabanRes.data.data}))
                 form.resetFields(["quanHuyenDiaBan","xaPhuongDiaBan"])
              }
              if(currentSelect == "Huyen"){
                 setDiaBan((curr) => ({...curr, maXa: diabanRes.data.data}))
                 form.resetFields(["xaPhuongDiaBan"])
              }
           }
        }
        if(currentSelect == "Tinh"){
           setTenDiaBan((curr) => ({...curr, tenTinh: label as any}))
        }
        if(currentSelect == "Huyen"){
           setTenDiaBan((curr) => ({...curr, tenHuyen: label as any}))
        }
        if(currentSelect == "Xa"){
           setTenDiaBan((curr) => ({...curr, tenXa: label as any}))
        }
    }
    return <>
    {uyQuyenHoSo ? <Row gutter={[8, 0]}>
    <Form.Item name="diaChiNguoiUyQuyenText" hidden><Input/></Form.Item>
        <Col md={6} span={24}>
            <Form.Item name="nguoiUyQuyen" label="Họ và tên"
                rules={uyQuyenHoSo ? INPUT_RULES.chuHoSo : []}
                hasFeedback={uyQuyenHoSo}
                required={uyQuyenHoSo}>
                <Input placeholder="Nhập họ và tên" />
            </Form.Item>
        </Col>
        <Col md={6} span={24}>
            <Form.Item name="soGiayToNguoiUyQuyen" label="Số căn cước công dân"
                rules={uyQuyenHoSo ? INPUT_RULES.soGiayToChuHoSo : []}
                hasFeedback={uyQuyenHoSo}
                required={uyQuyenHoSo}>
                <Input placeholder="Nhập số căn cước công dân" />
            </Form.Item>
        </Col>
        <Col md={6} span={24}>
            <Form.Item name="soDienThoaiNguoiUyQuyen" label="Số điện thoại"
                rules={uyQuyenHoSo ? INPUT_RULES.soDienThoaiChuHoSo : []}
                hasFeedback={uyQuyenHoSo}
                required={uyQuyenHoSo}>
                <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
        </Col>
        <Col md={6} span={24}>
            <Form.Item name="emailNguoiUyQuyen" label="Email"
                rules={uyQuyenHoSo ? INPUT_RULES.emailChuHoSo : []}
                hasFeedback={uyQuyenHoSo}
                required={uyQuyenHoSo}>
                <Input placeholder="Nhập Email" />
            </Form.Item>
        </Col>
        <Col md={6} span={24}>
            <Form.Item name="tinhThanhNguoiUyQuyen" label="Tỉnh thành">
                <Select showSearch allowClear filterOption={filterOptionsWithChildren} onChange={(value, opt) => onChangeMaDonVi(value, "Huyen", "Tinh", opt)}>
                {diaBan.maTinh?.map((item, index) => {
                    return <Select.Option value={item.maDiaBan} key={index}>{item.tenDiaBan}</Select.Option>
                })}
                </Select>
            </Form.Item>
        </Col>
        <Col md={6} span={24}>
            <Form.Item name="quanHuyenNguoiUyQuyen" label="Quận, huyện">
                <Select showSearch allowClear filterOption={filterOptionsWithChildren} onChange={(value, opt) => onChangeMaDonVi(value, "Xa", "Huyen", opt)}>
                {diaBan.maHuyen?.map((item, index) => {
                    return <Select.Option value={item.maDiaBan} key={index}>{item.tenDiaBan}</Select.Option>
                })}
                </Select>
            </Form.Item>
        </Col>
        <Col md={6} span={24}>
            <Form.Item name="xaPhuongNguoiUyQuyen" label="Xã, phường, thị trấn">
                <Select  showSearch allowClear filterOption={filterOptionsWithChildren} onChange={(value, opt) => onChangeMaDonVi(value, "Xa", "Xa", opt)}>
                {diaBan.maXa?.map((item, index) => {
                    return <Select.Option value={item.maDiaBan} key={index}>{item.tenDiaBan}</Select.Option>
                })}
                </Select>
            </Form.Item>
        </Col>
        <Col span={24} lg={6} md={12}>
            <Form.Item name="diaChiNguoiUyQuyen" label="Địa chỉ chi tiết:">
                <Input.TextArea rows={1} autoSize/>
            </Form.Item>
        </Col>
    </Row> : null}
    <AntdDivider />
</>
}