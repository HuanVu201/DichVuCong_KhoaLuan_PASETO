import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { IDonVi, ISearchDonVi } from "../models"
import { useCallback } from "react"
import { DonViDetail } from "./DonViDetail"
import { useDonViContext } from "../contexts/DonViContext"

export const DonViSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDonVi>> }) => {
  const donViContext = useDonViContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchDonVi) => {
    setSearchParams((curr) => ({ ...curr, ...values }))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { donViContext.setDonViModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='donVi' layout="vertical" onFinish={onFinish} form={form}>
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