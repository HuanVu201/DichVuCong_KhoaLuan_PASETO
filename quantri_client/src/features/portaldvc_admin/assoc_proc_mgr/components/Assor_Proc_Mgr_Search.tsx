import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common/CollapseContent"
import { AntdButton, AntdSelect } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { IAssor_Proc_Mgr, ISearchAssor_Proc_Mgr } from "../model"
import { useCallback } from "react"
// import { Assor_Proc_MgrDetail } from "./Assor_Proc_MgrDetail"
import { useAssor_Proc_Mgr_Context } from "../contexts"

export const Assor_Proc_Mgr_Search = () => {
    const assor_Proc_MgrContext = useAssor_Proc_Mgr_Context()
    const { datas: ThuTucs, data:ThuTuc } = useAppSelector((state) => state.thutuc);
    const [form] = Form.useForm()
    const onFinish = (values: ISearchAssor_Proc_Mgr) => {
        assor_Proc_MgrContext.setSearchParams((curr) => ({ ...curr, ...values }))
        

    }
    const resetSearchParams = useCallback(() => {
        assor_Proc_MgrContext.setSearchParams({ pageNumber: 1, pageSize: 200, reFetch: true })
        form.resetFields()
    }, [])

    return (
        <CollapseContent
            extraButtons={[<AntdButton onClick={() => { assor_Proc_MgrContext.setAssor_Proc_Mgr_ModalVisible(true) }}>Thêm mới</AntdButton>]}
        >
            <Form name='Assor_Proc_MgrSearch' layout="vertical" onFinish={onFinish} form={form}>
                <Row gutter={[8, 8]}>

                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tên thủ tục"
                            name="thuTucid"
                        >
                             <AntdSelect
                            placeholder="Chọn thủ tục"
                            allowClear
                            generateOptions={{ model: ThuTucs, label: 'tenTTHC', value: 'id' }}
                            style={{ width: '100%' }}
                        />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tên thủ tục liên quan"
                            name="thuTucLienQuanId"
                        >
                            <AntdSelect
                            placeholder="Chọn thủ tục liên quan"
                            allowClear
                            generateOptions={{ model: ThuTucs, label: 'tenTTHC', value: 'id' }}
                            style={{ width: '100%' }} 
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