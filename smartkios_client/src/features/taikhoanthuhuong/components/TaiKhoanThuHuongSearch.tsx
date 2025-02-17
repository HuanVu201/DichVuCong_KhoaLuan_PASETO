import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { ITaiKhoanThuHuong, ISearchTaiKhoanThuHuong } from "../models"
import { useCallback } from "react"
import { useTaiKhoanThuHuongContext } from "../contexts/TaiKhoanThuHuongContext"

export const TaiKhoanThuHuongSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchTaiKhoanThuHuong>> }) => {
  const TaiKhoanThuHuongContext = useTaiKhoanThuHuongContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchTaiKhoanThuHuong) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 0, pageSize: 10, reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => {TaiKhoanThuHuongContext.setTaiKhoanThuHuongModalVisible(true)}}>Thêm mới</AntdButton>]}
    >
      <Form name='TaiKhoanThuHuongSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Tên phí,lệ phí"
          name="loai"
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