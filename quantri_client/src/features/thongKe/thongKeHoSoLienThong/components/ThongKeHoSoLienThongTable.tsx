import { useEffect, useMemo, useState } from "react"
import { Table, TableProps } from "antd"
import { TableRowSelection } from "antd/es/table/interface"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ISearchAction } from "@/features/action/models"
import { useColumnThongKeHSLT } from "../hooks/useColumnThongKeHSLT"
import { AntdSpace, AntdTable } from "@/lib/antd/components"
import { ActionSearch } from "@/features/action/components/ActionSearch"
import { ThongKeHSLTParams } from "@/features/hoso/services"
import { ThongKeHSLTSearch } from "./ThongKeHoSoLienThongSearch"
import { SearchThongKeHSLT } from "@/features/hoso/redux/action"
import { BaoCaoTongHopProvider, useBaoCaoTongHopContext } from "../../ThongKeTheoDonVi/context/BaoCaoTongHopContext"
import { HoSoTheoBaoCaoTongHopProvider, useHoSoTheoBaoCaoTongHopContext } from "@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext"
import HoSoTheoBaoCaoLienThongWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoThongKeLienThong"
import { XuatDanhSachHoSoTheoBaoCaoTongHopModal } from "@/features/hoSoTheoBaoCaoTongHop/exportElements/XuatDanhSachHoSoTheoBaoCaoTongHop"
import { XuatDanhSachHoSoLienThong } from "@/features/hoSoTheoBaoCaoTongHop/exportElements/XuatDanhSachThongKeHSLT"
import dayjs from 'dayjs'
import { getCurrencyThongKe } from "@/utils"

export const ThongKeHSLT = () => {
    const dispatch = useAppDispatch()
    const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
    const thongKeHoSoContext = useBaoCaoTongHopContext();
    const { hoSoLienThongs, countHoSoLienThongs } = useAppSelector(state => state.hoso)
    const { data: user } = useAppSelector(state => state.user)
    const [searchParams, setSearchParams] = useState<ThongKeHSLTParams>({ pageNumber: 1, pageSize: 50, reFetch: true, maDinhDanhCha: user?.maDinhDanh })
    const { columns } = useColumnThongKeHSLT({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize }, searchParams)

    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <ThongKeHSLTSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={hoSoLienThongs}
                    pagination={{
                        total: countHoSoLienThongs
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchThongKeHSLT(params))}
                    summary={() => (
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0}></Table.Summary.Cell>
                            <Table.Summary.Cell index={1}><span style={{ fontWeight: '600', fontSize: '15px' }}>Tổng số</span></Table.Summary.Cell>
                            <Table.Summary.Cell index={2} align="right">
                                <span style={{ fontWeight: '600', fontSize: '15px' }} >
                                    {getCurrencyThongKe(hoSoLienThongs?.reduce((total, record) => total + parseFloat(record.tongSoLuongHoSo) || 0, 0) as any)}
                                </span>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={3} align="right">
                                <span style={{ fontWeight: '600', fontSize: '15px' }} >
                                    {getCurrencyThongKe(hoSoLienThongs?.reduce((total, record) => total + parseFloat(record.soLuongHoSoKS) || 0, 0) as any)}
                                </span>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={4} align="right">
                                <span style={{ fontWeight: '600', fontSize: '15px' }} >
                                    {getCurrencyThongKe(hoSoLienThongs?.reduce((total, record) => total + parseFloat(record.soLuongHoSoKT) || 0, 0) as any)}
                                </span>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    )}
                />
                {
                    hoSoTheoBaoCaoTongHopContext.thongKeHSLTModalVisible ? (
                        <HoSoTheoBaoCaoLienThongWrapper />
                    ) : null
                }
                <XuatDanhSachHoSoLienThong
                    tuNgay={searchParams.tuNgay ? dayjs(searchParams.tuNgay).format('DD/MM/YYYY') : undefined}
                    denNgay={searchParams.denNgay ? dayjs(searchParams.denNgay).format('DD/MM/YYYY') : undefined}
                    data={hoSoLienThongs} />
            </AntdSpace>
        </>
    )
}
const ThongKeHSLTWrapper = () => (
    <BaoCaoTongHopProvider>
        <HoSoTheoBaoCaoTongHopProvider>
            <ThongKeHSLT />
        </HoSoTheoBaoCaoTongHopProvider>
    </BaoCaoTongHopProvider>
)
export default ThongKeHSLTWrapper