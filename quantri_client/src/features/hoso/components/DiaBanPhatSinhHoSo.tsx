import { RenderTitle } from "@/components/common"
import { Col, Form, Input, Select } from "antd"
import { FormInstance } from "antd/lib"
import { IHoSo } from "../models"
import { ISearchDanhMucDiaBan } from "../../danhmucdiaban/models"
import { useEffect, useMemo, useState } from "react"
import { DiaBanChuHoSo } from "../../portaldvc/NopHoSoTrucTuyen/components"
import { AntdSelect } from "@/lib/antd/components"
import { danhMucDiaBanApi } from "../../danhmucdiaban/services"
import { useAppSelector } from "@/lib/redux/Hooks"
import { DefaultOptionType } from "antd/es/select"
import { filterOptions } from "@/utils"

export const DiaBanPhatSinhHoSo = ({form, tinhThanhDiaBan, quanHuyenDiaBan, xaPhuongDiaBan, mergeStr} : {form: FormInstance<IHoSo>; tinhThanhDiaBan: string | undefined; quanHuyenDiaBan: string | undefined; xaPhuongDiaBan: string | undefined; mergeStr: boolean}) => {
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
   const {publicModule} = useAppSelector(state => state.config)
   const maTinh = useMemo(() => {
      return publicModule?.find(x => x.code == "ma-tinh")?.content
   }, [publicModule])
   const tenTinh = useMemo(() => {
      return publicModule?.find(x => x.code == "ten-don-vi")?.content
   }, [publicModule])

   useEffect(() => {
      form.setFieldValue("tenDiaBan", JSON.stringify(tenDiaBan))
   }, [tenDiaBan])

   useEffect(() => {
      (async () => {
         const maTinhCauHinh = tinhThanhDiaBan || maTinh
         form.setFieldValue("tinhThanhDiaBan", maTinhCauHinh)
         const res = await danhMucDiaBanApi.Search({Loai: "Tinh"})
         setDiaBan((curr) => ({...curr, maTinh: res.data.data}))

         const tenTinhRes = res.data.data.find(x => x.maDiaBan === maTinhCauHinh)?.tenDiaBan || tenTinh || ""
         
         setTenDiaBan((curr) => ({...curr, tenTinh: tenTinhRes}))
         const searchXa = mergeStr ? maTinhCauHinh+ "."+quanHuyenDiaBan : quanHuyenDiaBan;
         const mergeQuanHuyen = mergeStr ? searchXa : quanHuyenDiaBan
         const mergeXaPhuong = mergeStr ? maTinhCauHinh+ "."+ quanHuyenDiaBan + "."+xaPhuongDiaBan : xaPhuongDiaBan
         if(maTinhCauHinh){
            form.setFieldValue("tinhThanhDiaBan", maTinhCauHinh)
            if(!quanHuyenDiaBan){
               const resQuan = await danhMucDiaBanApi.Search({Loai: "Huyen",maDiaBan: maTinhCauHinh})
               setDiaBan((curr) => ({...curr, maHuyen: resQuan.data.data}))
            }
         }
         // onChangeMaDonVi(tinhThanhDiaBan, "Huyen", "Tinh")
         if(quanHuyenDiaBan){
            form.setFieldValue("quanHuyenDiaBan", mergeQuanHuyen)
            const resQuan = await danhMucDiaBanApi.Search({Loai: "Huyen",maDiaBan: maTinhCauHinh})
            setDiaBan((curr) => ({...curr, maHuyen: resQuan.data.data}))
            const resXa = await danhMucDiaBanApi.Search({Loai: "Xa",maDiaBan: searchXa})
            setDiaBan((curr) => ({...curr, maXa: resXa.data.data}))
         }
         if(xaPhuongDiaBan && !quanHuyenDiaBan){
            form.setFieldValue("xaPhuongDiaBan", mergeXaPhuong)
            const res = await danhMucDiaBanApi.Search({Loai: "Xa",maDiaBan: searchXa})
            setDiaBan((curr) => ({...curr, maXa: res.data.data}))
         }
      })()
   }, [quanHuyenDiaBan, tinhThanhDiaBan, xaPhuongDiaBan, maTinh, tenTinh])
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
      const label = opt.label
      
      
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
      <Col span={24}>
         <RenderTitle title="Địa bàn phát sinh hồ sơ" />
      </Col>
      <Form.Item name="tenDiaBan" hidden><Input/></Form.Item>
      <Col md={8} span={24}>
         <Form.Item name="tinhThanhDiaBan" >
            {/* <Select placeholder="Tỉnh thành" showSearch allowClear  onChange={(value, opt) => onChangeMaDonVi(value, "Huyen", "Tinh", opt)}>
               {diaBan.maTinh.map((item, index) => {
                  return <Select.Option value={item.maDiaBan} key={index}>{item.tenDiaBan}</Select.Option>
               })}
            </Select> */}
            <AntdSelect placeholder="Tỉnh thành" generateOptions={{model: diaBan.maTinh, value: "maDiaBan" , label: "tenDiaBan"}} showSearch allowClear 
            onChange={(value, opt) => onChangeMaDonVi(value, "Huyen", "Tinh", opt)} filterOption={filterOptions}/>
         </Form.Item>
      </Col>
      <Col md={8} span={24}>
         <Form.Item name="quanHuyenDiaBan">
            {/* <Select placeholder="Quận, huyện" showSearch allowClear onChange={(value, opt) => onChangeMaDonVi(value, "Xa", "Huyen", opt)}>
               {diaBan.maHuyen.map((item, index) => {
                  return <Select.Option value={item.maDiaBan} key={index}>{item.tenDiaBan}</Select.Option>
               })}
            </Select> */}
            <AntdSelect generateOptions={diaBan.maHuyen ? {model: diaBan.maHuyen, value: "maDiaBan", label: "tenDiaBan"} : undefined} placeholder="Quận, huyện" 
            showSearch allowClear  onChange={(value, opt) => onChangeMaDonVi(value, "Xa", "Huyen", opt)} filterOption={filterOptions}/>
         </Form.Item>
      </Col>
      <Col md={8} span={24}>
         <Form.Item name="xaPhuongDiaBan" >
            {/* <Select placeholder="Xã, phường, thị trấn" showSearch allowClear onChange={(value, opt) => onChangeMaDonVi(value, "Xa", "Xa", opt)}>
               {diaBan.maXa.map((item, index) => {
                  return <Select.Option value={item.maDiaBan} key={index}>{item.tenDiaBan}</Select.Option>
               })}
            </Select> */}
            <AntdSelect generateOptions={diaBan.maXa ? {model: diaBan.maXa , value: "maDiaBan", label: "tenDiaBan"} : undefined}
            placeholder="Xã, phường, thị trấn" showSearch allowClear  onChange={(value, opt) => onChangeMaDonVi(value, "Xa", "Xa", opt)} filterOption={filterOptions}/>
         </Form.Item>
      </Col>
   </>
}