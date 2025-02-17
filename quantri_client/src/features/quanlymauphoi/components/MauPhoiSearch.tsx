import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton, AntdSelect } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IMauPhoi, ISearchMauPhoi } from "../models"
import { useCallback } from "react"
// import { MauPhoiDetail } from "./MauPhoiDetail"
import { useMauPhoiContext } from "../context/MauPhoiContext"
import { loaiPhois } from "./MauPhoiDetail"

export const MauPhoiSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchMauPhoi>> }) => {
  const MauPhoiContext = useMauPhoiContext()
  const { datas: danhMucChungs } = useAppSelector((state) => state.danhmucdungchung);
  const [form] = Form.useForm()
  const onFinish = (values: ISearchMauPhoi) => {
    setSearchParams((curr) => ({ ...curr, ...values }))
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
          <Col md={8} span={24}>
            <Form.Item
              label="Loại phôi"
              name="loaiPhoi"

            >
              <AntdSelect
                virtual={true}
                generateOptions={{
                  model: loaiPhois,
                  label: "label",
                  value: "value",
                }}
              />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item
              label="Mã phôi"
              name="code"
            >
              <AntdSelect
                virtual={true}
                generateOptions={{
                  model: danhMucChungs,
                  label: "tenDanhMuc",
                  value: "code",
                }}
              />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
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