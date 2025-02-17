
import { Form, Input, Space, Row, Col } from "antd"
import { ISearchTaiLieuLuuTruCongDan, Nguon_CongDanTaiLen, Nguon_KetQuaGiaiQuyetHoSo, Nguon_ThanhPhanHoSo } from "../models"
import { CollapseContent } from "@/components/common"
import { AntdButton, AntdSelect } from "@/lib/antd/components"
import { useKhoTaiLieuCongDanContext } from "../contexts/KhoTaiLieuCongDanContext"
import { useCallback } from "react"
import { PlusOutlined } from "@ant-design/icons"
import { useAppSelector } from "@/lib/redux/Hooks"

const loaiNguons = [
    { label: Nguon_CongDanTaiLen, value: Nguon_CongDanTaiLen },
    { label: Nguon_KetQuaGiaiQuyetHoSo, value: Nguon_KetQuaGiaiQuyetHoSo },
    { label: Nguon_ThanhPhanHoSo, value: Nguon_ThanhPhanHoSo },
]

export default function SearchKhoTaiLieu({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchTaiLieuLuuTruCongDan>> }) {
    const khoTaiLieuContext = useKhoTaiLieuCongDanContext()
    const [form] = Form.useForm()
    const { data: user } = useAppSelector(state => state.user)
    const onFinish = (values: ISearchTaiLieuLuuTruCongDan) => {
          setSearchParams((curr) => ({ ...curr, ...values }))
    }
    const resetSearchParams = useCallback(() => {
        setSearchParams({ pageNumber: 1, pageSize: 10, reFetch: true })
        form.resetFields()
    }, [])

    return (
        <CollapseContent
            extraButtons={[

                // <AntdButton onClick={() => { khoTaiLieuContext.setAddTaiLieuModalVisible(true) }}>Thêm mới</AntdButton>
                <div style={{ margin: '10px 0', display: 'flex', justifyContent: 'right', gap: 10 }}
                    hidden={user?.soDinhDanh ? false : true}
                >
                    <div className="buttonAddKho" onClick={() => khoTaiLieuContext.setDetailTaiLieuCongDanModalVisible(true)}>
                        <PlusOutlined style={{ marginRight: "5px", fontSize: "14px" }} />Thêm mới
                    </div>
                </div>
            ]}
        >
            <Form name='KhoTaiLieuSearch' layout="vertical" onFinish={onFinish} form={form}>
                <Row gutter={[8, 8]}>

                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tên giấy tờ"
                            name="tenGiayTo"
                        >
                            <Input placeholder="Nhập tên giấy tờ"/>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Nguồn"
                            name="nguon"
                        >
                            <AntdSelect
                                virtual={true}
                                generateOptions={{
                                    model: loaiNguons,
                                    label: "label",
                                    value: "value",
                                }}
                                placeholder="Chọn nguồn giấy tờ"
                            />
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