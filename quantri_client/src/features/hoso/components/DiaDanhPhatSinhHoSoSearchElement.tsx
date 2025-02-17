import { RenderTitle } from "@/components/common"
import { ISearchDanhMucDiaBan } from "@/features/danhmucdiaban/models"
import { danhMucDiaBanApi } from "@/features/danhmucdiaban/services"
import { DiaBanChuHoSo } from "@/features/portaldvc/NopHoSoTrucTuyen/components"
import { AntdSelect } from "@/lib/antd/components"
import { filterOptions } from "@/utils"
import { Col, Form } from "antd"
import { FormInstance } from "antd/lib"
import { useState } from "react"

export const DiaDanhPhatSinhHoSoSearchElement = ({form} : {form: FormInstance<any>}) => {
   const [diaBan, setDiaBan] = useState<DiaBanChuHoSo>({
      maTinh: [],
      maHuyen: [],
      maXa: [],
   })
   const tinhThanhDiaBan = Form.useWatch("tinhThanhDiaBan",form)
   const quanHuyenDiaBan = Form.useWatch("quanHuyenDiaBan",form)
   const xaPhuongDiaBan = Form.useWatch("xaPhuongDiaBan",form)
   const onChangeMaDonVi = async (value: string, Loai: ISearchDanhMucDiaBan["Loai"], currentSelect: ISearchDanhMucDiaBan["Loai"]) => {
      if(value){
          if (currentSelect != "Xa") {
              const diabanRes = await danhMucDiaBanApi.Search({ Loai: Loai, maDiaBan: value as string })
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
   return 
   }
   const searchTinh = async () => {
      const res = await danhMucDiaBanApi.Search({Loai: "Tinh"})
      setDiaBan((curr) => ({...curr, maTinh: res.data.data}))
   }
   const searchQuan = async () => {
      if(tinhThanhDiaBan){
         const res = await danhMucDiaBanApi.Search({Loai: "Huyen", maDiaBan: tinhThanhDiaBan})
         setDiaBan((curr) => ({...curr, maHuyen: res.data.data}))
      }
   }
   const searchXa = async () => {
      if(quanHuyenDiaBan && tinhThanhDiaBan){
         const res = await danhMucDiaBanApi.Search({Loai: "Xa", maDiaBan: tinhThanhDiaBan + '.' + quanHuyenDiaBan})
         setDiaBan((curr) => ({...curr, maXa: res.data.data}))
      }
   }
   return <>
   <Col span={24}>
      <RenderTitle title="Địa bàn phát sinh hồ sơ"/>
   </Col>
   <Col md={8} span={24}>
         <Form.Item  name="tinhThanhDiaBan">
              <AntdSelect
                generateOptions={{ model: diaBan.maTinh?.map(x => ({
                  label: x.tenDiaBan,
                  value: x.maTinh
                })), label: "label", value: "value" }}
                allowClear
                showSearch
                filterOption={filterOptions}
                onFocus={async () => {
                  await searchTinh()
                }}
                placeholder="Tỉnh thành" 
              />
            </Form.Item>
      </Col>
      <Col md={8} span={24}>
         <Form.Item name="quanHuyenDiaBan" >
         <AntdSelect
                generateOptions={{ model: diaBan.maHuyen?.map(x => ({
                  label: x.tenDiaBan,
                  value: x.maHuyen
                })), label: "label", value: "value" }}
                allowClear
                showSearch
                filterOption={filterOptions}
                onFocus={async () => {
                  await searchQuan()
                }}
                placeholder="Quận, huyện"
              />
         </Form.Item>
      </Col>
      <Col md={8} span={24}>
         <Form.Item name="xaPhuongDiaBan" >
         <AntdSelect
                generateOptions={{ model: diaBan.maXa?.map(x => ({
                  label: x.tenDiaBan,
                  value: x.maXa
                })), label: "label", value: "value" }}
                allowClear
                showSearch
                filterOption={filterOptions}
                placeholder="Xã, phường, thị trấn"
                onFocus={async () => {
                  await searchXa()
                }}
              />
         </Form.Item>
      </Col>
   </>
}