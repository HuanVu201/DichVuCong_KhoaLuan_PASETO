import { Form, Input, Space, Row, Col, Dropdown, MenuProps } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { IKetQuaLienQuan, ISearchKetQuaLienQuan } from "../models"
import { useCallback } from "react"
import { KetQuaLienQuanDetail } from "./KetQuaLienQuanDetail"
import { useKetQuaLienQuanContext } from "../contexts/KetQuaLienQuanProvider"
import Search from "antd/es/input/Search"
import { PlusCircleFilled } from "@ant-design/icons"


export const KetQuaLienQuanSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchKetQuaLienQuan>> }) => {
  const ketQuaLienQuanContext = useKetQuaLienQuanContext()
  const onSearch = (value: string) => {
    setSearchParams((curr) => ({ ...curr, nguoiKy: value }))
  }
  return (
      <Row gutter={[8, 8]} style={{marginBottom:12}} justify="space-between">
        <Col md={8} span={24}>
          <Search onSearch={onSearch} placeholder="Tìm kiếm theo người ký"/>
        </Col>
        <Col>
          <AntdButton onClick={() => ketQuaLienQuanContext.setKetQuaLienQuanModalVisible(true)} icon={<PlusCircleFilled style={{color: "#2C62B9"}}/>}>Thêm mới</AntdButton>
        </Col>
      </Row>
  )
}