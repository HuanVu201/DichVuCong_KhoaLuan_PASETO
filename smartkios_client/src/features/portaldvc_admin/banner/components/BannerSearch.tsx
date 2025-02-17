import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../../components/common/CollapseContent"
import { AntdButton } from "../../../../lib/antd/components"
import { useAppDispatch } from "../../../../lib/redux/Hooks"
import { IBanner, ISearchBanner } from "../models"
import { useCallback } from "react"
import { useBannerContext } from "../contexts/BannerContext"

export const BannerSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchBanner>> }) => {
  const BannerContext = useBannerContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchBanner) => {
    setSearchParams((curr) => ({ ...curr, ...values }))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { BannerContext.setMaBannerModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='BannerSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Đường dẫn ảnh"
          name="imageUrl"
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