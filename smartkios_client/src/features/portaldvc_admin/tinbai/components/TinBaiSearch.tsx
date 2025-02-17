import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../../components/common/CollapseContent"
import { AntdButton } from "../../../../lib/antd/components"
import { useAppDispatch } from "../../../../lib/redux/Hooks"
import { ITinBai, ISearchTinBai } from "../models"
import { useCallback } from "react"
import { TinBaiDetail } from "./TinBaiDetail"
import { useTinBaiContext } from "../contexts/TinBaiContext"

export const TinBaiSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchTinBai>> }) => {
  const [form] = Form.useForm()
  const tinBaiContext = useTinBaiContext()
  const onFinish = (values: ISearchTinBai) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({  reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { tinBaiContext.setMaTinBaiModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='tinbai' layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Tiêu đề"
          name="tieuDe"
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