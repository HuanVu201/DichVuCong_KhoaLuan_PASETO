import { Form, Input, Space, Row, Col, Dropdown, MenuProps, DatePicker, Select } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { IGiayToSoHoa, ISearchGiayToSoHoa } from "../models"
import { useGiayToSoHoaContext } from "../contexts/GiayToSoHoaProvider"
import Search from "antd/es/input/Search"
import { PlusCircleFilled } from "@ant-design/icons"
import { FORMAT_DATE_WITHOUT_TIME } from "@/data"
import { filterOptions } from "@/utils"
import { useCallback } from "react"


export const GiayToSoHoaSearch = ({ setSearchParams, resetSearch }: {resetSearch: () => void; setSearchParams: React.Dispatch<React.SetStateAction<ISearchGiayToSoHoa>> }) => {
  const GiayToSoHoaContext = useGiayToSoHoaContext()
  const [form] = Form.useForm()

  const onFinish = (values: ISearchGiayToSoHoa) => {
    setSearchParams((curr) => ({ ...curr, ...values }))
  }
  const resetSearchParams = useCallback(() => {
    resetSearch()
    form.resetFields()
  }, [])

  return (
    <CollapseContent
    defaultVisible
    extraButtons={[
      <AntdButton onClick={() => GiayToSoHoaContext.setViewMode("add")}>Thêm mới</AntdButton>
    ]}
    >
    <Form className='search-form' name='GiayToSoHoaActionSearch' layout="vertical" onFinish={onFinish} form={form} initialValues={{ daHetHan: undefined }}>
        <div className="search-form-content">
            <Row gutter={[16, 5]}>
                <Col md={12} span={24}>
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
                        <Select options={[{ value: undefined, label: "--Chọn loại thời hạn--" }, { value: true, label: "Đã hết hạn" }, { value: false, label: "Còn hạn" }] as any} showSearch allowClear filterOption={filterOptions} />
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Số định danh"
                        name="maDinhDanh"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Mã giấy tờ"
                        name="ma"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Từ ngày"
                        name="tuNgay"
                    >
                        <DatePicker style={{ width: '300px' }} format={FORMAT_DATE_WITHOUT_TIME} ></DatePicker>
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Đến ngày"
                        name="denNgay"
                    >
                        <DatePicker style={{ width: '300px' }} format={FORMAT_DATE_WITHOUT_TIME}  ></DatePicker>
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
        </div>
    </Form>
  </CollapseContent>
  )
}