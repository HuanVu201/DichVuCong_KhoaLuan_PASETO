import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../../components/common/CollapseContent"
import { AntdButton } from "../../../../lib/antd/components"
import { IPhanAnhKienNghi, ISearchPhanAnhKienNghi } from "../../../portaldvc/PhanAnhKienNghi/models"
import { useCallback } from "react"
import { usePhanAnhKienNghiContext } from "../contexts/PhanAnhKienNghiContext"

export const PhanAnhKienNghiSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchPhanAnhKienNghi>> }) => {
  const PhanAnhKienNghiContext = usePhanAnhKienNghiContext()
  const [form] = Form.useForm()
  const onFinish = (values: any) => {
    setSearchParams((curr) => ({...curr, noiDung: values.tuKhoa, tieuDe: values.tuKhoa}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({  reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent>
      <Form name='BannerSearch' layout="horizontal" onFinish={onFinish} form={form} style={{marginTop: 20}}>
        <Form.Item
          label="Từ khóa"
          name="tuKhoa"
        >
          <Input  placeholder='Nhập từ khóa cần tìm kiếm' />
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