import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { IMauPhoi, ISearchMauPhoi } from "../models"
import { useCallback } from "react"
// import { MauPhoiDetail } from "./MauPhoiDetail"
import { useMauPhoiContext } from "../context/MauPhoiContext"

export const MauPhoiSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchMauPhoi>> }) => {
  const MauPhoiContext = useMauPhoiContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchMauPhoi) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 10, reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { MauPhoiContext.setMauPhoiModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='MauPhoiSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[8, 8]}>
          <Col md={12} span={24}>
            <Form.Item
              label="Loại phôi"
              name="loaiPhoi"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Tên mẫu phôi"
              name="tenMauPhoi"
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