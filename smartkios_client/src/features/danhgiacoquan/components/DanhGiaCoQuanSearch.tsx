import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton, AntdSelect } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IDanhGiaCoQuan, ISearchDanhGiaCoQuan } from "../models"
import { useCallback } from "react"
import { useDanhGiaCoQuanContext } from "../contexts/DanhGiaCoQuanContext"

export const DanhGiaCoQuanSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhGiaCoQuan>> }) => {
    const DanhGiaCoQuanContext = useDanhGiaCoQuanContext()
    const [form] = Form.useForm()
    const { data: user, } = useAppSelector(state => state.user)
    const onFinish = (values: ISearchDanhGiaCoQuan) => {
        setSearchParams((curr) => ({ ...curr, ...values,donVi : user?.officeCode }))
    }
    const resetSearchParams = useCallback(() => {
        setSearchParams({ reFetch: true, pageSize: 50, pageNumber: 1, donVi: user?.officeCode })
        form.resetFields()
    }, [])
    
    return (
        <CollapseContent
        >
            <Form name='danhGiaCoQuan' layout="vertical" onFinish={onFinish} form={form}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Row style={{ alignItems: 'inherit', }}>
                        <span style={{ fontSize: '16px', fontWeight: '700', marginRight: '10px' }}>Quý :</span>
                        <Form.Item
                            name="quy"
                        >
                            <AntdSelect allowClear style={{ width: '200px' }}
                                options={[
                                    { value: '1', label: '1' },
                                    { value: '2', label: '2' },
                                    { value: '3', label: '3' },
                                    { value: '4', label: '4' },
                                ]}>

                            </AntdSelect>
                        </Form.Item>
                    </Row>
                    <Row style={{ alignItems: 'inherit', }}>
                        <span style={{ fontSize: '16px', fontWeight: '700', marginRight: '10px' }}>Năm :</span>
                        <Form.Item
                            name="nam"
                        >
                            <AntdSelect allowClear style={{ width: '200px' }}
                                options={[
                                    { value: '2021', label: '2021' },
                                    { value: '2022', label: '2022' },
                                    { value: '2023', label: '2023' },
                                    { value: '2024', label: '2024' },
                                ]}>

                            </AntdSelect>
                        </Form.Item>
                    </Row>
                </div>
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