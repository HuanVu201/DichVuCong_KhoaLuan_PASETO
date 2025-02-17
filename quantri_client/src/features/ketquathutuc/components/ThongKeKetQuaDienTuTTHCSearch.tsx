import { Form, Input, Space, Row, Col, Select, DatePicker, Checkbox } from "antd"
import { useCallback, useEffect, useMemo } from "react"
import { ISearchThuTuc, IThuTuc } from "@/features/thutuc/models"
import { IGiayToSoHoa, ISearchGiayToSoHoa } from "@/features/giaytosohoa/models"
import { CollapseContent } from "@/components/common"
import { AntdButton } from "@/lib/antd/components"
import { ExportExcel } from "@/lib/xlsx/ExportExcel"
import { useAppSelector } from "@/lib/redux/Hooks"
import { GIAYTOSOHOA_LOAISOHOA } from "@/features/hoso/data/formData"
import dayjs from 'dayjs'
import { filterOptions } from "@/utils"
import { FORMAT_DATE_WITHOUT_TIME, FORMAT_ISO_DATE } from "@/data"

export const ThongKeKetQuaDienTuTTHCSearch = ({ setSearchParams, resetSearch }: { resetSearch: () => void; setSearchParams: React.Dispatch<React.SetStateAction<ISearchGiayToSoHoa>> }) => {
  const [form] = Form.useForm()
  const onFinish = (values: ISearchGiayToSoHoa) => {
    setSearchParams((curr) => ({
      ...curr, ...values,
      tuNgay: values.tuNgay ? dayjs(values.tuNgay).format(FORMAT_ISO_DATE) : undefined,
      denNgay: values.denNgay ? dayjs(values.denNgay).format(FORMAT_ISO_DATE) : undefined
    }))
  }
  const resetSearchParams = () => {
    resetSearch()
    form.resetFields()
  }

  return (
    <CollapseContent

    >
      <Form name='GiayToSoHoaActionSearch' layout="vertical" onFinish={onFinish} form={form} initialValues={{ daHetHan: undefined }}>
        <Row gutter={[8, 8]}>
          <Col md={8} span={24}>
            <Form.Item
              label="Từ khóa"
              name="searchKeys"
            >
              <Input placeholder="Nhập mã hồ sơ hoặc tên chủ hồ sơ" />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item
              label="Thời hạn giấy tờ"
              name="daHetHan"
            >
              <Select options={[{ value: true, label: "Đã hết hạn" }, { value: false, label: "Còn hạn" }] as any} showSearch allowClear filterOption={filterOptions} />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item
              label="Số định danh"
              name="maDinhDanh"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item
              label="Mã giấy tờ"
              name="ma"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item
              label="Từ ngày"
              name="tuNgay"
            >
              <DatePicker style={{ width: '100%' }} format={FORMAT_DATE_WITHOUT_TIME} ></DatePicker>
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item
              label="Đến ngày"
              name="denNgay"
            >
              <DatePicker style={{ width: '100%' }} format={FORMAT_DATE_WITHOUT_TIME}  ></DatePicker>
            </Form.Item>
          </Col>

        </Row>
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