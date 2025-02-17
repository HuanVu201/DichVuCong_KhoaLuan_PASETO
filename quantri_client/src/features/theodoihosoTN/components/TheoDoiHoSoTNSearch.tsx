import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { IHoSo, ISearchHoSo } from "../../hoso/models"
import { useCallback } from "react"
import { TheoDoiHoSoTNDetail } from "./TheoDoiHoSoTNDetail"
import { useTheoDoiHoSoTNContext } from "../contexts/TheoDoiHoSoTNContext"

export const TheoDoiHoSoTNSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchHoSo>> }) => {
  const theoDoiHoSoTNContext = useTheoDoiHoSoTNContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchHoSo) => {
    console.log(values);
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 0, pageSize: 10, reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => {theoDoiHoSoTNContext.setDetailTheoDoiHoSoTNModalVisible(true)}}>Thêm mới</AntdButton>]}
    >
      <Form name='HoSoSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Tên hồ sơ"
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