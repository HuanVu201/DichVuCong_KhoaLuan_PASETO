import { Form, Input, Space, Row, Col } from "antd"
import { useCallback } from "react"
import { CollapseContent } from "@/components/common"
import { AntdButton, AntdSelect } from "@/lib/antd/components"
import { DownloadOutlined, FileExcelFilled, FileExcelOutlined } from "@ant-design/icons"
import { ISearchThongKeKhoTaiLieuDienTuParams } from "../../models"
import { useThongKeKhoTaiLieuContext } from "../../contexts"
import { thongKeKhoTaiLieuApi } from "../../services"
import { KhoTaiLieuDienTuApi } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuDienTu/services/KhoTaiLieuDienTuService"

export const ThongKeKhoTaiLieuSearch = () => {
    const thongKeKhoTaiLieuContext = useThongKeKhoTaiLieuContext()
    const [form] = Form.useForm()
    const onFinish = (values: ISearchThongKeKhoTaiLieuDienTuParams) => {
        thongKeKhoTaiLieuContext.setFilterThongKeKhoTaiLieuParams((curr) => ({ ...curr, ...values }))
    }
    const resetSearchParams = useCallback(() => {
        thongKeKhoTaiLieuContext.setFilterThongKeKhoTaiLieuParams({
            ...thongKeKhoTaiLieuContext.filterThongKeKhoTaiLieuParams,
            pageNumber: 1, pageSize: 10, reFetch: true,
            fullName: undefined,
            userName: undefined,
            soDinhDanh: undefined,
            phoneNumber: undefined,
        })
        form.resetFields()
    }, [])

    const exportExcel = async () => {
        const resExcel = await thongKeKhoTaiLieuApi.ExportExcelThongKeKhoTaiLieu(thongKeKhoTaiLieuContext.filterThongKeKhoTaiLieuParams)
        var blob = new Blob([resExcel.data as any], {
          type: resExcel.headers["content-type"],
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `Thống kê sử dụng kho tài liệu điện tử.xlsx`;
        link.click();
    }

    return (
        <CollapseContent
            extraButtons={[
                <AntdButton
                    style={{ backgroundColor: 'green', color: '#fff', display: 'flex', alignItems: 'center' }}
                    onClick={() => exportExcel()}><FileExcelOutlined /> Xuất excel
                </AntdButton>
            ]}
        >
            <Form name='ThongKeSuDungKhoSearch' layout="vertical" onFinish={onFinish} form={form}>
                <Row gutter={[8, 8]}>
                    <Col md={6} span={24}>
                        <Form.Item
                            label="Họ tên:"
                            name="fullName"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={6} span={24}>
                        <Form.Item
                            label="Tài khoản:"
                            name="userName"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={6} span={24}>
                        <Form.Item
                            label="Số định danh"
                            name="soDinhDanh"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={6} span={24}>
                        <Form.Item
                            label="Số điện thoại:"
                            name="phoneNumber"
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
        </CollapseContent>
    )
}