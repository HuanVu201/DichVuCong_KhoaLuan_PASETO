import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton, AntdSelect } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IThanhPhanThuTuc, ISearchThanhPhanThuTuc } from "../models"
import { useCallback } from "react"
import { ThanhPhanThuTucDetail } from "./ThanhPhanThuTucDetail"
import { useThanhPhanThuTucContext } from "../contexts/ThanhPhanThuTucContext"

export const ThanhPhanThuTucSearch = () => {
  const thanhPhanThuTucContext = useThanhPhanThuTucContext()
  return (
    <>
      <AntdButton style={{marginRight : '10px'}} onClick={() => { thanhPhanThuTucContext.setThanhPhanThuTucModalVisible(true) }}>Thêm mới</AntdButton>
      <AntdButton style={{backgroundColor : '#91f991',color : '#000'}} onClick={() => { thanhPhanThuTucContext.setCapNhatThanhPhanThuTucCSDLTTHCModalVisible(true) }}>Cập nhật từ CSDL TTHC</AntdButton>
    </>

  )
}