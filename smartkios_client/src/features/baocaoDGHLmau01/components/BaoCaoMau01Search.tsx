import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton, AntdSelect } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useCallback, useEffect } from "react"
import { useBaoCaoMau01Context } from "../contexts/BaoCao01Context"
import { ISearchPhieuKhaoSat } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/models"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { filterOptions } from "@/utils"
import { ExportExcel } from "@/lib/xlsx/ExportExcel"
import { SearchBaoCao01 } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/redux/action"
import { PhieuKhaoSatApi } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/services"

export const BaoCao01Search = ({ setSearchParams, onUpdateDataSource }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchPhieuKhaoSat>>, onUpdateDataSource: (res: any) => void }) => {
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()

    const onFinish = async (values: ISearchPhieuKhaoSat) => {
        setSearchParams((curr) => ({ ...curr, ...values, donVi: form.getFieldValue("donVi") || user?.officeCode }))
        const res = await PhieuKhaoSatApi.SearchBaoCao01({ ...values, donVi: form.getFieldValue("donVi") || user?.officeCode, pageSize: 50, pageNumber: 1 })
        onUpdateDataSource(res.data)

    }
    const { datas: baocao01s } = useAppSelector((state) => state.phieukhaosat);
    const { data: user } = useAppSelector(state => state.user)

    return (

        <Form style={{ marginTop: '30px' }} name='baocao01' layout="vertical" onFinish={onFinish} form={form}>

            <div style={{ display: 'flex', justifyContent: 'space-evenly', }}>
                <Row style={{ alignItems: 'inherit', }}>
                    <span style={{ fontSize: '16px', fontWeight: '700', marginRight: '10px', marginTop: '3px' }}>Đơn vị : </span>
                    <Form.Item
                        name="donVi"
                    >
                        <Input style={{ width: '300px' }} disabled defaultValue={user?.officeName}></Input>
                    </Form.Item>
                </Row>
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
                <Row justify="space-around" style={{ marginTop: "10px" }}>
                    <Space size="large">
                        <AntdButton type="primary" htmlType="submit" >
                            Thống kê
                        </AntdButton>
                        <ExportExcel
                            data={baocao01s}
                            sheetName="Báo cáo mẫu 01"
                            fileName="BaoCaoMau1"
                            header={["STT", "Tên giấy tờ", "Thời gian số hóa", "Thời hạn hiệu lực", "Người số hóa", "Tên đơn vị", "Loại số hóa"]}></ExportExcel>
                    </Space>
                </Row>
            </Form.Item>
        </Form>
    )
}