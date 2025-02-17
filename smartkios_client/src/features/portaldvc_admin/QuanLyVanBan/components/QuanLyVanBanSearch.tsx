import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../../components/common/CollapseContent"
import { AntdButton } from "../../../../lib/antd/components"
import { useAppDispatch } from "../../../../lib/redux/Hooks"
import { IQuanLyVanBan, ISearchQuanLyVanBan } from "../models"
import { useCallback } from "react"
import { useQuanLyVanBanContext } from "../contexts/QuanLyVanBanContext"

export const QuanLyVanBanSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchQuanLyVanBan>> }) => {
  const QuanLyVanBanContext = useQuanLyVanBanContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchQuanLyVanBan) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({  reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => {QuanLyVanBanContext.setMaQuanLyVanBanModalVisible(true)}}>Thêm mới</AntdButton>]}
    >
      <Form name='QuanLyVanBanSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Tên quản trị liên kết"
          name="ten"
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