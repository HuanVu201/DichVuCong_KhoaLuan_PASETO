import { Form, Input, Space, Row, Col } from "antd"
import { AntdButton, AntdSelect } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useCallback } from "react"
import { useLienThongQLVBContext } from "../../context"
import { IQLVBSearchParams } from "../../models"

export const HoSoLienThongQLVBSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<IQLVBSearchParams>> }) => {
    const qlvbContext = useLienThongQLVBContext()
    const { datas: danhMucChungs } = useAppSelector((state) => state.danhmucdungchung);
    const [form] = Form.useForm()
    const onFinish = (values: IQLVBSearchParams) => {
        setSearchParams((curr) => ({ ...curr, search: { value: form.getFieldValue('tuKhoa') } }))
    }

    const resetSearchParams = useCallback(() => {
        setSearchParams({ ...qlvbContext.searchParams, LoaiGoiTin: 'Hồ sơ', search: { value: '' } })
        form.resetFields()
    }, [])
    return (

        <Form name='HoSoSearch' layout="vertical" onFinish={onFinish} form={form}>
            <Row gutter={[8, 8]}>

                <Col md={24} span={24}>
                    <Form.Item
                        label="Từ khóa"
                        name="tuKhoa"
                    >
                        <Input />
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
    )
}