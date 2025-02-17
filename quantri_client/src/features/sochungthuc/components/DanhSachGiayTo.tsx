import { HoSoChungThucResponse, hoSoApi } from "@/features/hoso/services"
import { useEffect, useState } from "react"
import { useSoChungThucContext } from "../contexts/SoChungThucContext"
import { AntdModal, AntdTable } from "@/lib/antd/components"
import { ISearchSoChungThuc } from "../models"
import { useDanhSachGiayToColumn } from "../hooks/useDanhSachGiayToColumn"

export const DanhSachGiayToModal = () => {
   const [danhSachGiayTos, setDanhSachGiayTos] = useState<HoSoChungThucResponse[]>()
   const [count, setCount] = useState<number>(0)
   const [searchParams, setSearchParams] = useState<ISearchSoChungThuc>({pageNumber:1})
   const {maSoChungThuc, setMaSoChungThuc, setDanhSachGiayToModalVisible} = useSoChungThucContext()
   const {columns} = useDanhSachGiayToColumn() 

   useEffect(() => {
      (async () => {
         if(maSoChungThuc){
            const res = await hoSoApi.SearchHoSoChungThuc({soChungThucId: maSoChungThuc})
            setDanhSachGiayTos(res.data.data)
            setCount(res.data.totalCount)
         }
      })()
   }, [maSoChungThuc])

   const handlerCancel = () => {
      setMaSoChungThuc(undefined)
      setDanhSachGiayToModalVisible(false)
   }
  return (
    <AntdModal visible={true} title="Danh sách giấy tờ" handlerCancel={handlerCancel} footer={null} fullsizeScrollable>
      <AntdTable 
      bordered
      searchParams={searchParams} 
      setSearchParams={setSearchParams}
      pagination= {{
         total: count
      }}
      columns={columns as any}
      dataSource={danhSachGiayTos as any}
      onSearch={() => {}}/>
    </AntdModal>
  )
}


