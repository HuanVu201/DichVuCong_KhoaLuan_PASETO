import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../../components/common/CollapseContent"
import { AntdButton } from "../../../../lib/antd/components"
import { useAppDispatch } from "../../../../lib/redux/Hooks"
import { ITrangThai, ISearchTrangThai } from "../models"
import { useCallback } from "react"
import { useTrangThaiContext } from "../contexts/TrangThaiContext"

export const TrangThaiSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchTrangThai>> }) => {
  const TrangThaiContext = useTrangThaiContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchTrangThai) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({  reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => {TrangThaiContext.setMaTrangThaiModalVisible(true)}}>Thêm mới</AntdButton>]}
    >
      <Form name='BannerSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Tên trạng thái"
          name="tenTrangThai"
        >
          <Input />
        </Form.Item>
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