import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton, AntdSelect } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IQuyTrinhXuLy, ISearchQuyTrinhXuLy } from "../models"
import { useCallback } from "react"
import { QuyTrinhXuLyDetail } from "./QuyTrinhXuLyDetail"
import { useQuyTrinhXuLyContext } from "../contexts/QuyTrinhXuLyContext"

export const QuyTrinhXuLySearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchQuyTrinhXuLy>> }) => {
  const QuyTrinhXuLyContext = useQuyTrinhXuLyContext()
  const {datas: linhvucs} = useAppSelector(state => state.linhvuc)
  const [form] = Form.useForm()
  const onFinish = (values: ISearchQuyTrinhXuLy) => {
    console.log(values);
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 0, pageSize: 10, reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => {QuyTrinhXuLyContext.setQuyTrinhXuLyModalVisible(true)}}>Thêm mới</AntdButton>]}
    >
      <Form name='QuyTrinhXuLySearch' layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Tên lĩnh vực"
          name="linhVucThucHien"
        >
          <AntdSelect generateOptions={{model: linhvucs, label: "ten", value:"id"}} />
        </Form.Item>
        <Form.Item
          label="Tên thủ tục"
          name="tenTTHC"
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Tên thủ tục"
          name="maTTHC"
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Trường hợp thủ tục"
          name="loaiTTHC"
        >
          <Input/>
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