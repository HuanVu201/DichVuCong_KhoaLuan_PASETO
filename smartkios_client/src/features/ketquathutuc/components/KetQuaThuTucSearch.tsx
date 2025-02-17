import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { IKetQuaThuTuc, ISearchKetQuaThuTuc } from "../models"
import { useCallback } from "react"
import { useKetQuaThuTucContext } from "../contexts/KetQuaThuTucProvider"

export const KetQuaThuTucSearch = ({ setSearchParams, resetSearch }: {resetSearch: () =>void; setSearchParams: React.Dispatch<React.SetStateAction<ISearchKetQuaThuTuc>> }) => {
  const ketQuaThuTucContext = useKetQuaThuTucContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchKetQuaThuTuc) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    resetSearch()
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => {ketQuaThuTucContext.setKetQuaThuTucModalVisible(true)}}>Thêm mới</AntdButton>]}
    >
      <Form name='KetQuaThuTucSearch' layout="vertical" onFinish={onFinish} form={form}>
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