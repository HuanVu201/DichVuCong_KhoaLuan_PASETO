import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { IBuocXuLy, ISearchBuocXuLy } from "../models"
import { useCallback } from "react"
import { useBuocXuLyContext } from "../contexts/BuocXuLyContext"

export const BuocXuLySearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchBuocXuLy>> }) => {
  const buocXuLyContext = useBuocXuLyContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchBuocXuLy) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({  reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => {buocXuLyContext.setBuocXuLiModalVisibleModalVisible(true)}}>Thêm mới</AntdButton>]}
    >
      <Form name='dichVuSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Tên bước xử lí"
          name="tenBuoc"
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