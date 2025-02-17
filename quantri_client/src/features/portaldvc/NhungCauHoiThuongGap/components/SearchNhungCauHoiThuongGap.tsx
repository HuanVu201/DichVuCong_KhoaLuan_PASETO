import { SearchCauHoiPhoBien } from "@/features/portaldvc_admin/CauHoiPhoBien/redux/action"
import { AntdButton } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { Form, Input, Row, Space } from "antd"
import { useNhungCauHoiThuongGapContext } from "../contexts/NhungCauHoiThuongGapContext"

export const SearchNhungCauHoiThuongGap = () => {
    const dispatch = useAppDispatch()
    const nhungCauHoiThuongGapContext = useNhungCauHoiThuongGapContext()
    const [form] = Form.useForm()

    const onFinish = () => {
        const formData = form.getFieldsValue()
        dispatch(SearchCauHoiPhoBien({ ...formData, reFetch: true, type: nhungCauHoiThuongGapContext.NhungCauHoiThuongGapType ? nhungCauHoiThuongGapContext.NhungCauHoiThuongGapType : "cong-dan" }) as any)

    }
    return (
        <Form name='loaiPhiLePhiSearch ' layout="vertical" onFinish={onFinish} form={form}>
            <Row justify="center">
                <Form.Item
                    name="noiDungCauHoi"
                    style={{ width: '600px', marginRight: '15px' }}
                >
                    <Input placeholder="Nhập nội dung câu hỏi cần tìm" />
                </Form.Item>
                <Form.Item
                    name="tieuDe"
                    style={{ width: '300px', marginRight: '15px' }}
                >
                    <Input placeholder="Nhập tiêu đề câu hỏi cần tìm" />
                </Form.Item>
                <Form.Item >
                    <Space size="large" >
                        <AntdButton htmlType="submit" style={{ backgroundColor: '#ce7a58', color: '#fff' }}>
                            Tìm kiếm
                        </AntdButton>
                    </Space>
                </Form.Item>
            </Row>

        </Form>
    )
}