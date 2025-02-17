import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { IPhiLePhi, ISearchPhiLePhi } from "../models"
import { useCallback } from "react"
import { PhiLePhiDetail } from "./phiLePhiDetail"
import { usePhiLePhiContext } from "../contexts/PhiLePhiContext"

export const PhiLePhiSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchPhiLePhi>> }) => {
  const phiLePhiContext = usePhiLePhiContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchPhiLePhi) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 0, pageSize: 50, reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => {phiLePhiContext.setPhiLePhiModalVisible(true)}}>Thêm mới</AntdButton>]}
    >
      <Form name='phiLePhiSearch' layout="vertical" onFinish={onFinish} form={form}>
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