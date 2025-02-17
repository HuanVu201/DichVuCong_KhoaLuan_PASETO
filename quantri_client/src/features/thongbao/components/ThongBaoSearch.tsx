import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { IThongBao, ISearchThongBao } from "../models"
import { useCallback } from "react"
import { ThongBaoDetail } from "./ThongBaoDetail"
import { useThongBaoContext } from "../contexts/ThongBaoContext"

export const ThongBaoSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchThongBao>> }) => {
  const ThongBaoContext = useThongBaoContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchThongBao) => {
    console.log(values);
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 0, pageSize: 10, reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => {ThongBaoContext.setThongBaoModalVisible(true)}}>Thêm mới</AntdButton>]}
    >
      <Form name='ThongBaoSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Tên dịch vụ"
          name="title"
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