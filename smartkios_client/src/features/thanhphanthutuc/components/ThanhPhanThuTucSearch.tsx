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
    <AntdButton onClick={() => {thanhPhanThuTucContext.setThanhPhanThuTucModalVisible(true)}}>Thêm mới</AntdButton>
  )
}