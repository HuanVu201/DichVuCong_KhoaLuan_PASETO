import { Form, Input, Space, Row, Col, Dropdown, MenuProps } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { IQuanLyTaiNguyen, ISearchQuanLyTaiNguyen } from "../models"
import { useCallback } from "react"
import { QuanLyTaiNguyenDetail } from "./QuanLyTaiNguyenDetail"
import { useQuanLyTaiNguyenContext } from "../contexts/QuanLyTaiNguyenProvider"
import Search from "antd/es/input/Search"
import { PlusCircleFilled } from "@ant-design/icons"


export const QuanLyTaiNguyenSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchQuanLyTaiNguyen>> }) => {
  const QuanLyTaiNguyenContext = useQuanLyTaiNguyenContext()
  const onSearch = (value: string) => {
    setSearchParams((curr) => ({ ...curr, ten: value }))
  }
  return (
      <Row gutter={[8, 8]} style={{marginBottom:12}} justify="space-between">
        <Col md={8} span={24}>
          <Search onSearch={onSearch} placeholder="Tìm kiếm theo tên"/>
        </Col>
        <Col>
          <AntdButton onClick={() => QuanLyTaiNguyenContext.setQuanLyTaiNguyenModalVisible(true)} icon={<PlusCircleFilled style={{color: "#2C62B9"}}/>}>Thêm mới</AntdButton>
        </Col>
      </Row>
  )
}