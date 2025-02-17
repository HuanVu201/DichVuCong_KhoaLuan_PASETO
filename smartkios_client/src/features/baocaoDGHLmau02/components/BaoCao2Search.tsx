import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton, AntdSelect } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useCallback, useEffect, useState } from "react"
import { ISearchPhieuKhaoSat } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/models"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { filterOptions } from "@/utils"
import { ExportExcel } from "@/lib/xlsx/ExportExcel"
import { IDanhGiaCoQuan, ISearchDanhGiaCoQuan } from "@/features/danhgiacoquan/models"
import { SearchDanhGiaCoQuan } from "@/features/danhgiacoquan/redux/action"
import { DanhGiaCoQuanApi } from "@/features/danhgiacoquan/services"
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper"
import { IPaginationResponse } from "@/models"
import { coCauToChucService } from "@/features/cocautochuc/services"
import { ICoCauToChuc } from "@/features/cocautochuc/models"

export const BaoCao02Search = ({ setSearchParams, onUpdateDataSource }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhGiaCoQuan>>, onUpdateDataSource: (res: any) => void }) => {
    const [form] = Form.useForm<IDanhGiaCoQuan>()
    const dispatch = useAppDispatch()
    const [donVis, setDonVis] = useState([])

    const onFinish = async (values: ISearchDanhGiaCoQuan) => {
        setSearchParams((curr) => ({ ...values, donVi: form.getFieldValue("donVi") || user?.officeCode }))
        const res = await DanhGiaCoQuanApi.SearchBaoCao02({
            ...values, donVi: form.getFieldValue("donVi") || user?.officeCode,
            quy: form.getFieldValue("quy") || '1',
            nam: form.getFieldValue("nam") || '2024',
        })
        onUpdateDataSource(res.data)

    }

    const { datas: baocao01s } = useAppSelector((state) => state.phieukhaosat);
    const { data: user } = useAppSelector(state => state.user)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await coCauToChucService.Search({ pageSize: 1500, ofGroupCode: user?.groupCode });
                setDonVis(res.data.data as any);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); 

    }, []);


    return (

        <Form style={{ marginTop: '30px' }} name='baocao02' layout="vertical" onFinish={onFinish} form={form}>

            <div style={{ display: 'flex', justifyContent: 'space-evenly', }}>
                <Row style={{ alignItems: 'inherit', }}>
                    <span style={{ fontSize: '16px', fontWeight: '700', marginRight: '10px', marginTop: '3px' }}>Đơn vị </span>
                    <Form.Item
                        name="donVi"
                        style={{ width: '400px' }}
                    >
                        <AntdSelect
                            defaultValue={user?.officeName}
                            generateOptions={{ model: donVis, label: "groupName", value: "groupCode" }}
                            showSearch
                            allowClear
                            filterOption={filterOptions}
                        />
                    </Form.Item>
                </Row>
                <Row style={{ alignItems: 'inherit', }}>
                    <span style={{ fontSize: '16px', fontWeight: '700', marginRight: '10px' }}>Quý :</span>
                    <Form.Item
                        name="quy"
                    >
                        <AntdSelect allowClear style={{ width: '200px' }}
                            defaultValue='1'
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
                            defaultValue='2024'
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
                            sheetName="Báo cáo mẫu 02"
                            fileName="BaoCaoMau1"
                            header={["STT", "Tên giấy tờ", "Thời gian số hóa", "Thời hạn hiệu lực", "Người số hóa", "Tên đơn vị", "Loại số hóa"]}></ExportExcel>
                    </Space>
                </Row>
            </Form.Item>
        </Form>
    )
}