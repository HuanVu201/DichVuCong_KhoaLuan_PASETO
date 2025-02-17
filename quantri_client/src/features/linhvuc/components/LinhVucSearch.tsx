import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { ILinhVuc, ISearchLinhVuc } from "../models"
import { useCallback } from "react"
import { LinhVucDetail } from "./LinhVucDetail"
import { useLinhVucContext } from "../contexts/LinhVucContext"

export const LinhVucSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchLinhVuc>> }) => {
  const linhVucContext = useLinhVucContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchLinhVuc) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { linhVucContext.setLinhVucModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='LinhVucSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[8, 8]}>
          <Col md={8} span={24}>
            <Form.Item
              label="Tên lĩnh vực"
              name="ten"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item
              label="Mã lĩnh vực"
              name="ma"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item
              label="Mã ngành"
              name="maNganh"
            >
              <Input />
            </Form.Item>
          </Col>
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