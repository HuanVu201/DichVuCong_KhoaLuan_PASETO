import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton, AntdSelect } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useCallback } from "react"
import { MenuKetQuaThuTucDetail } from "./MenuKetQuaThuTucDetail"
import { useMenuKetQuaThuTucContext } from "../contexts/MenuKetQuaThuTucContext"
import { ISearchThuTuc, IThuTuc } from "@/features/thutuc/models"
import { IMenuKetQuaThuTuc, ISearchMenuKetQuaThuTuc } from "../models"

export const MenuKetQuaThuTucSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchMenuKetQuaThuTuc>> }) => {
  const menuKetQuaThuTucContext = useMenuKetQuaThuTucContext()
  const [form] = Form.useForm()
  const onFinish = (values: IMenuKetQuaThuTuc) => {
    setSearchParams(values)
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 0, pageSize: 50, reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => {menuKetQuaThuTucContext.setMenuKetQuaThuTucModalVisible(true)}}>Thêm mới</AntdButton>]}
    >
      <Form name='MenuKetQuaThuTucSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={8}>
          <Col md={12} span={24}>
            <Form.Item
              label="Tên menu"
              name="tenMenu"
            >
              <Input/>
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Mã TTHC"
              name="maTTHC"
            >
              <Input/>
            </Form.Item>
          </Col>
          {/* <Form.Item
            label="Thuộc đơn vị"
            name="maDonVi"
          >
            <Input/>
          </Form.Item> */}
          
        </Row>
        <Form.Item>
          <Row justify="space-around">
            <Space size="large">
              <AntdButton type="primary" htmlType="submit" >
                Xác nhận
              </AntdButton>
              <AntdButton type="default" onClick={resetSearchParams}>
                Tải lại
              </AntdButton>
            </Space>
          </Row>
        </Form.Item>
      </Form>
    </CollapseContent>
  )
}