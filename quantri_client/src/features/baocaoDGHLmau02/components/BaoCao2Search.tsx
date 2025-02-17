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
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/ExportExcel/exportTableToExcel"

export const BaoCao02Search = ({ setSearchParams, onUpdateDataSource }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhGiaCoQuan>>, onUpdateDataSource: (res: any) => void }) => {
    const [form] = Form.useForm<IDanhGiaCoQuan>()
    const dispatch = useAppDispatch()
    const { datas: donVis } = useAppSelector(state => state.cocautochuc)

    const currentQuarter = Math.floor((new Date().getMonth() + 3) / 3).toString()
    const currentYear = new Date().getFullYear().toString()
    const onFinish = async (values: ISearchDanhGiaCoQuan) => {
        setSearchParams((curr) => ({ ...values, donVi: form.getFieldValue("donVi") || user?.officeCode }))
        const res = await DanhGiaCoQuanApi.SearchBaoCao02({
            ...values, donVi: form.getFieldValue("donVi") ? form.getFieldValue("donVi") : user?.officeCode, pageSize: 50, pageNumber: 1, quy: form.getFieldValue("quy") || currentQuarter, nam: form.getFieldValue("nam") || currentYear
        })
        onUpdateDataSource(res.data)
    }

    const { data: user } = useAppSelector(state => state.user)
    const [years, setYears] = useState<string[]>([])
    const [quarters, setQuarters] = useState<string[]>(['1', '2', '3', '4'])
    useEffect(() => {
        const currentYear = new Date().getFullYear()
        const yearsArray = Array.from({ length: currentYear - 2020 }, (_, index) => (currentYear - index).toString())
        setYears(yearsArray)
    }, [])



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
                        <AntdSelect defaultValue={currentQuarter} allowClear style={{ width: '200px' }}
                            options={quarters.map(quarter => ({ value: quarter, label: quarter }))}>
                        </AntdSelect>
                    </Form.Item>
                </Row>
                <Row style={{ alignItems: 'inherit', }}>
                    <span style={{ fontSize: '16px', fontWeight: '700', marginRight: '10px' }}>Năm :</span>
                    <Form.Item
                        name="nam"
                    >
                        <AntdSelect defaultValue={currentYear} allowClear style={{ width: '200px' }}
                            options={years.map(year => ({ value: year, label: year }))}>
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
                        <AntdButton onClick={() => {
                            downloadPhieuExcel("Báo cáo mẫu 02", "ExportExcelBaoCao02DGHL");
                        }}
                            style={{ backgroundColor: '#23b723', color: 'white' }} htmlType="submit" >
                            Xuất danh sách
                        </AntdButton>
                    </Space>
                </Row>
            </Form.Item>
        </Form>
    )
}