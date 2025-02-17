
import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common"
import { AntdButton, AntdSelect } from "@/lib/antd/components"
import { useCallback } from "react"
import { PlusOutlined } from "@ant-design/icons"
import { useAppSelector } from "@/lib/redux/Hooks"
import { useKhoTaiLieuCongDanNamDinhContext } from "../contexts"
import { ISearchLoaiNhomGiayToCaNhan } from "../models"
import { useKhoTaiLieuCongDanContext } from "../../KhoTaiLieuCongDan/contexts/KhoTaiLieuCongDanContext"


export default function SearchLoaiNhomGiayToCaNhan({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchLoaiNhomGiayToCaNhan>> }) {
    const khoTaiLieuContext = useKhoTaiLieuCongDanContext()
    const [form] = Form.useForm()
    const { data: user } = useAppSelector(state => state.user)
    const onFinish = (values: ISearchLoaiNhomGiayToCaNhan) => {
        setSearchParams((curr) => ({ ...curr, ...values }))
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
                        khoTaiLieuContext.setDetailLoaiNhomGiayToModalVisible(true)
                    }}>
                        <PlusOutlined style={{ marginRight: "5px", fontSize: "14px" }} />Thêm mới
                    </div>
                </div>
            ]}
        >
            <Form name='KhoTaiLieuSearch' layout="horizontal" onFinish={onFinish} form={form}>
                <Row gutter={[8, 8]}>
                    <Col span={6} />
                    <Col md={12} span={24}>
                        <Form.Item
                            label={`Tên ${khoTaiLieuContext.typeLoaiNhom}`}
                            name="ten"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6} />
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