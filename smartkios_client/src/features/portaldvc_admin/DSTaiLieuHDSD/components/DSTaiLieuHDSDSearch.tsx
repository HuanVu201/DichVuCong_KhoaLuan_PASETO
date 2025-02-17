import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../../components/common/CollapseContent"
import { AntdButton } from "../../../../lib/antd/components"
import { useAppDispatch } from "../../../../lib/redux/Hooks"
import { IDSTaiLieuHDSD, ISearchDSTaiLieuHDSD } from "../models"
import { useCallback } from "react"
import { useDSTaiLieuHDSDContext } from "../contexts/DSTaiLieuHDSDContext"

export const DSTaiLieuHDSDSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDSTaiLieuHDSD>> }) => {
  const DSTaiLieuHDSDContext = useDSTaiLieuHDSDContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchDSTaiLieuHDSD) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({  reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => {DSTaiLieuHDSDContext.setDSTaiLieuHDSDVisible(true)}}>Thêm mới</AntdButton>]}
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