import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../../components/common/CollapseContent"
import { AntdButton } from "../../../../lib/antd/components"
import { useAppDispatch } from "../../../../lib/redux/Hooks"
import { IHuongDanSuDung, ISearchHuongDanSuDung } from "../models"
import { useCallback } from "react"
import { useHuongDanSuDungContext } from "../context/HuongDanSuDungContext"

export const HuongDanSuDungSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchHuongDanSuDung>> }) => {
  const HuongDanSuDungContext = useHuongDanSuDungContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchHuongDanSuDung) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({  reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => {HuongDanSuDungContext.setHuongDanSuDungVisible(true)}}>Thêm mới</AntdButton>]}
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