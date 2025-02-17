import { useEffect, useState } from "react"
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useColumn } from "../column.tsx/useColumn"
import { ThongKeHoSoChungThucProvider, useThongKeHoSoChungThucContext } from "../contexts/ThongKeHSCTContext"
import { ISearchSoChungThuc, ISearchThongKeHoSoChungThuc, IThongKeHoSoChungThuc } from "@/features/sochungthuc/models"
import { AntdSpace, AntdTable } from "@/lib/antd/components"
import { ThongKeHoSoChungThucSearch } from "./ThongKeHoSoChungThucSearch"
import { StatisticHoSoChungThuc } from "../redux/action"
import { ThongKeHoSoChungThucDetail } from "./ThongKeHoSoChungThucDetail"
import { XuatDanhSachHoSoChungThuc } from "@/features/hoSoTheoBaoCaoTongHop/exportElements/XuatDanhSachThongKeHoSoChungThuc"
import dayjs from 'dayjs'
import { Table } from "antd"
import { getCurrencyThongKe } from "@/utils"

const ThongKeHoSoChungThucTable = () => {
    const dispatch = useAppDispatch()
    const { datas: hosochungthucs, count, loading } = useAppSelector(state => state.hosochungthuc)
    const { data: user } = useAppSelector(state => state.user)

    const thongKeHoSoChungThucContext = useThongKeHoSoChungThucContext()
    const [searchParams, setSearchParams] = useState<ISearchThongKeHoSoChungThuc>({ pageNumber: 1, pageSize: 2000, maDinhDanhCha: user?.maDinhDanh })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })

    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <ThongKeHoSoChungThucSearch setSearchParams={setSearchParams} />
                <div className="table-responsive">
                <AntdTable
                    bordered
                    columns={columns as any}
                    loading={loading}
                    dataSource={hosochungthucs as any}
                    pagination={{
                        total: count,
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(StatisticHoSoChungThuc(params))}
                    summary={() => (
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0}></Table.Summary.Cell>
                            <Table.Summary.Cell index={1}><span style={{ fontWeight: '600', fontSize: '15px' }}>Tổng số</span></Table.Summary.Cell>
                            <Table.Summary.Cell index={2} align="center">
                                <span style={{ fontWeight: '600', fontSize: '15px' }} >
                                    {getCurrencyThongKe(hosochungthucs?.reduce((total, record) => total + parseFloat(record.tongSoHoSo as any) || 0, 0) as any)}
                                </span>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={3} align="center">
                                <span style={{ fontWeight: '600', fontSize: '15px' }} >
                                    {getCurrencyThongKe(hosochungthucs?.reduce((total, record) => total + parseFloat(record.banGiay as any) || 0, 0) as any)}
                                </span>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={4} align="center">
                                <span style={{ fontWeight: '600', fontSize: '15px' }} >
                                    {getCurrencyThongKe(hosochungthucs?.reduce((total, record) => total + parseFloat(record.banDienTu as any) || 0, 0) as any)}
                                </span>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    )}
                    />
                </div>
            </AntdSpace>
            {thongKeHoSoChungThucContext.ThongKeHoSoChungThucModalVisible ? <ThongKeHoSoChungThucDetail searchParamTable={searchParams}></ThongKeHoSoChungThucDetail> : <></>}
            <XuatDanhSachHoSoChungThuc
                tuNgay={searchParams.tuNgay ? dayjs(searchParams.tuNgay).format('DD/MM/YYYY') : undefined}
                denNgay={searchParams.denNgay ? dayjs(searchParams.denNgay).format('DD/MM/YYYY') : undefined}
                data={hosochungthucs} />
        </>
    )
}
const SoChungThucTableWrapper = () => (<ThongKeHoSoChungThucProvider>
    <ThongKeHoSoChungThucTable />
</ThongKeHoSoChungThucProvider>)
export default SoChungThucTableWrapper