import { AntdButton, AntdSelect, AntdTable } from "@/lib/antd/components"
import { Col, Form, FormInstance, InputNumber, Row, SelectProps } from "antd"
import { filterOptions } from "@/utils/select"
import { IHoSo } from "@/features/hoso/models"
import { useAppSelector } from "@/lib/redux/Hooks"
import { IPhiLePhi, ISearchPhiLePhi } from "@/features/philephi/models"
import { useEffect, useMemo, useState } from "react"
import { usePhiLePhiColumn } from "@/features/hoso/hooks/usePhiLePhiColumn"
import { PlusCircleOutlined } from "@ant-design/icons"
import { v4 as uuid } from 'uuid'
import { getCurrency } from "@/utils"
import { YeuCauThuPhiParams } from "../services"


export const PhiLePhi = ({ form, hinhThucThuOptions, phiLePhis, hasCharge, defaultSelected, overrideUpdateSoTien, updateSoTienDeps }: {updateSoTienDeps?: React.DependencyList; overrideUpdateSoTien?: (data: IPhiLePhi[]) => void; defaultSelected?: string; hasCharge:string[]; form: FormInstance<any>, hinhThucThuOptions: SelectProps["options"], phiLePhis: IPhiLePhi[] | undefined }) => {
    // const { duLieuThemHoSo } = useAppSelector(state => state.truonghopthutuc)
    const [searchParams, setSearchParams] = useState<ISearchPhiLePhi>({ pageNumber: 1, pageSize: 100, reFetch: true })
    const [dataSource, setDataSource] = useState<IPhiLePhi[]>([])
    const hinhThucThu = Form.useWatch("hinhThucThu", form)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const columns = usePhiLePhiColumn({ setDataSource, dataSource})

    const updateSoTien = (datas: IPhiLePhi[]) => {
        let tongPhi = 0
        let tongLePhi = 0
        datas.forEach(row => {
            if (row.loai == "Lệ phí") {
                tongLePhi += row.soTien
            } else if (row.loai == "Phí") {
                tongPhi += row.soTien
            }
        })
        form.setFieldValue("phiThu", tongPhi)
        form.setFieldValue("lePhiThu", tongLePhi)
        form.setFieldValue("tongTien", tongPhi + tongLePhi)
    }
    useEffect(() => {
        if (phiLePhis && phiLePhis.length) {
            setDataSource(phiLePhis)
            form.setFieldValue("hinhThucThu", "Thu trước")
        } else {
            form.setFieldValue("hinhThucThu", "Không thu phí")
        }
        if(defaultSelected) {
            form.setFieldValue("hinhThucThu", defaultSelected)
        }
        return () => {
            setDataSource([])
            form.setFieldValue("chiTietPhiLePhi", undefined)
        }
    }, [phiLePhis, defaultSelected,])

    useEffect(() => {
        if(hinhThucThu === "Không thu phí" || hinhThucThu === "Đối tượng miễn phí"){
            form.setFieldValue("chiTietPhiLePhi", undefined)
            setSelectedRowKeys([])
        }
    }, [hinhThucThu])

    useEffect(() => { // tính tổng tiền
        const selectedRows = dataSource.filter(x => selectedRowKeys.includes(x.id))
        overrideUpdateSoTien ? overrideUpdateSoTien(selectedRows) : updateSoTien(selectedRows)
        // updateSoTien(selectedRows)
    }, [dataSource, selectedRowKeys, updateSoTienDeps])

    const onAddRow = () => {
        const newRow: any = {
            id: uuid(),
            ten: "",
            loai: "Lệ phí",
            soTien: 0
        }
        setDataSource([...dataSource, newRow])
        setSelectedRowKeys((curr) => [...curr, newRow.id])
    }
    
    const rowSelection = useMemo(() => ({
        onChange: async (selectedKeys: React.Key[], datas: IPhiLePhi[]) => {
            updateSoTien(datas)
            const chiTiet = dataSource.map((item) => {
                if (selectedKeys.includes(item.id)) {
                    return { ...item, selected: true }
                }
                return item
            })
            form.setFieldValue("chiTietPhiLePhi", JSON.stringify(chiTiet))
            setSelectedRowKeys(selectedKeys)
        },
        selectedRowKeys
    }), [dataSource, selectedRowKeys])
    const formatter = (value: number | undefined) => value ? getCurrency(value) : "0"
    {/* ? */ }

    return <>
        <Row gutter={[8, 0]}>
            <Col md={6} span={24}>
                <Form.Item name="hinhThucThu" label="Loại">
                    <AntdSelect options={hinhThucThuOptions} showSearch filterOption={filterOptions} />
                </Form.Item>
            </Col>
            {hasCharge.includes(hinhThucThu) ? <>
                <Col md={6} span={24}>
                    <Form.Item name="phiThu" label="Phí thu" >
                        <InputNumber style={{ width: "100%" }} disabled defaultValue={0} formatter={formatter} />
                    </Form.Item>
                </Col>
                <Col md={6} span={24}>
                    <Form.Item name="lePhiThu" label="Lệ phí thu">
                        <InputNumber style={{ width: "100%" }} disabled defaultValue={0} formatter={formatter} />
                    </Form.Item>
                </Col>
                <Col md={6} span={24}>
                    <Form.Item name="tongTien" label="Tổng tiền" rules={hasCharge.includes(hinhThucThu) ?[{ required: true, message: 'Tổng tiền phải lớn hơn 1000' }, {validator(rule, value, callback) {
                        if(value < 1000){
                            return Promise.reject("Tổng tiền phải lớn hơn 1000")
                        }
                        return Promise.resolve();
                    },}] : undefined}>
                        <InputNumber style={{ width: "100%" }} disabled defaultValue={0} formatter={formatter} />
                    </Form.Item>
                </Col>
            </> : null}

        </Row>
        {hasCharge.includes(hinhThucThu) ?
            <AntdTable
                columns={columns as any}
                dataSource={dataSource}
                footer={() => <AntdButton icon={<PlusCircleOutlined />} type="primary" onClick={onAddRow}>Thêm phí, lệ phí</AntdButton>}
                searchParams={searchParams}
                pagination={false}
                rowSelection={rowSelection}
                setSearchParams={setSearchParams}
                // onRow={onRow}
                onSearch={(params) => { }} />
       : null}
    </>
}