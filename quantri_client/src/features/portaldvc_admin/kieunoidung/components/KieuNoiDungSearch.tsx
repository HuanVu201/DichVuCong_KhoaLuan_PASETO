import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../../components/common/CollapseContent"
import { AntdButton } from "../../../../lib/antd/components"
import { useAppDispatch } from "../../../../lib/redux/Hooks"
import { IKieuNoiDung, ISearchKieuNoiDung } from "../models"
import { useCallback } from "react"
import { useKieuNoiDungContext } from "../contexts/KieuNoiDungContext"

export const KieuNoiDungSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchKieuNoiDung>> }) => {
  const kieuNoiDungContext = useKieuNoiDungContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchKieuNoiDung) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({  reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => {kieuNoiDungContext.setMaKieuNoiDungModalVisible(true)}}>Thêm mới</AntdButton>]}
    >
      <Form name='BannerSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Tên phí,lệ phí"
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