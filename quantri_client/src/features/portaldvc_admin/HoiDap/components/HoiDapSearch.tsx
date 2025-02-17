import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../../components/common/CollapseContent"
import { AntdButton } from "../../../../lib/antd/components"
import { IHoiDap, ISearchHoiDap } from "../../../portaldvc/HoiDap/models"
import { useCallback } from "react"
import { useHoiDapContext } from "../contexts/HoiDapContext"

export const HoiDapSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchHoiDap>> }) => {
  const HoiDapContext = useHoiDapContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchHoiDap) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({  reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => {HoiDapContext.setHoiDapVisible(true)}}>Thêm mới</AntdButton>]}
    >
      <Form name='BannerSearch' layout="vertical" onFinish={onFinish} form={form}>
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