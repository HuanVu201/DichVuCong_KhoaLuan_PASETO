
import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common"
import { AntdButton, AntdSelect } from "@/lib/antd/components"
import { useCallback } from "react"
import { PlusOutlined } from "@ant-design/icons"
import { useAppSelector } from "@/lib/redux/Hooks"
import { useKhoTaiLieuCongDanNamDinhContext } from "../contexts"
import { ISearchTaiLieuGiayToCaNhan } from "../models"
import { toast } from "react-toastify"


export default function SearchTaiLieuCaNhan({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchTaiLieuGiayToCaNhan>> }) {
    const khoTaiLieuContext = useKhoTaiLieuCongDanNamDinhContext()
    const [form] = Form.useForm()
    const { data: user } = useAppSelector(state => state.user)
    const onFinish = (values: ISearchTaiLieuGiayToCaNhan) => {
        setSearchParams((curr) => ({
            ...curr,
            ...values,
            loaiNhomGiayToCaNhanId: form.getFieldValue('loaiGiayToCaNhan') || form.getFieldValue('nhomGiayToCaNhan')
        }))
    }
    const resetSearchParams = useCallback(() => {
        setSearchParams({ pageNumber: 1, pageSize: 10, reFetch: true })
        form.resetFields()
    }, [])

    return (
        <CollapseContent
            extraButtons={[
                <div style={{ margin: '10px 0', display: 'flex', justifyContent: 'right', gap: 10 }}
                    hidden={user?.soDinhDanh ? false : true}
                >
                    <div className="buttonAddKho" onClick={() => {
                        khoTaiLieuContext.setAddGiayToModalVisible(true)
                    }}>
                        <PlusOutlined style={{ marginRight: "5px", fontSize: "14px" }} />Thêm mới
                    </div>
                </div>
            ]}
        >
            <Form name='KhoTaiLieuSearch' layout="vertical" onFinish={onFinish} form={form}>
                <Row gutter={[8, 8]}>
                    <Col md={8} span={24}>
                        <Form.Item
                            label={`Tên giấy tờ`}
                            name="tenGiayTo"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={8} span={24}>
                        <Form.Item
                            label="Loại giấy tờ"
                            name="loaiGiayToCaNhan"
                        >
                            <AntdSelect
                                virtual={true}
                                generateOptions={{
                                    model: khoTaiLieuContext.loaiGiayTos,
                                    label: "ten",
                                    value: "id",
                                }}
                                onChange={(e) => {
                                    form.setFieldValue('nhomGiayToCaNhan', undefined)
                                }}
                                placeholder="Chọn loại/nhóm giấy tờ của tài liệu"
                                allowClear
                            />
                        </Form.Item>
                    </Col>
                    <Col md={8} span={24}>
                        <Form.Item
                            label="Nhóm giấy tờ"
                            name="nhomGiayToCaNhan"
                        >
                            <AntdSelect
                                virtual={true}
                                generateOptions={{
                                    model: khoTaiLieuContext.nhomGiayTos,
                                    label: "ten",
                                    value: "id",
                                }}
                                onChange={(e) => {
                                    form.setFieldValue('loaiGiayToCaNhan', undefined)
                                }}
                                placeholder="Chọn loại/nhóm giấy tờ của tài liệu"
                                allowClear
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