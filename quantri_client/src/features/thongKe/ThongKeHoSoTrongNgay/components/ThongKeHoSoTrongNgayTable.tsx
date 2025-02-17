import { useEffect, useMemo, useState } from "react"
import { Table, TableProps } from "antd"
import { TableRowSelection } from "antd/es/table/interface"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ISearchAction } from "@/features/action/models"
import { AntdSpace, AntdTable } from "@/lib/antd/components"
import { ActionSearch } from "@/features/action/components/ActionSearch"
import { ThongKeHSLTParams } from "@/features/hoso/services"
import { SearchThongKeHSLT, ThongKeHoSoTrongNgayAction } from "@/features/hoso/redux/action"
import { BaoCaoTongHopProvider, useBaoCaoTongHopContext } from "../../ThongKeTheoDonVi/context/BaoCaoTongHopContext"
import { HoSoTheoBaoCaoTongHopProvider, useHoSoTheoBaoCaoTongHopContext } from "@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext"
import HoSoTheoBaoCaoLienThongWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoThongKeLienThong"
import { XuatDanhSachHoSoTheoBaoCaoTongHopModal } from "@/features/hoSoTheoBaoCaoTongHop/exportElements/XuatDanhSachHoSoTheoBaoCaoTongHop"
import { XuatDanhSachHoSoLienThong } from "@/features/hoSoTheoBaoCaoTongHop/exportElements/XuatDanhSachThongKeHSLT"
import dayjs from 'dayjs'
import { ThongKeHoSoTrongNgaySearch } from "./ThongKeHoSoTrongNgaySearch"
import { useColumnThongKeHSLT } from "../../thongKeHoSoLienThong/hooks/useColumnThongKeHSLT"
import { useColumnThongKeHoSoTrongNgay } from "../hooks/useThongKeHoSoTrongNgayColumn"
import HoSoTheoThongKeTrongNgayWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoThongKeTrongNgay"
import { XuatDanhSachHoSoTrongNgay } from "@/features/hoSoTheoBaoCaoTongHop/exportElements/XuatDanhSachThongKeHoSoTrongNgay"
import { getCurrencyThongKe } from "@/utils"

export const ThongKeHoSoTrongNgayTable = () => {
    const dispatch = useAppDispatch()
    const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
    const thongKeHoSoContext = useBaoCaoTongHopContext();
    const { thongKeHoSotrongNgay, countThongKeTrongNgays } = useAppSelector(state => state.hoso)
    const { data: user } = useAppSelector(state => state.user)
    const [searchParams, setSearchParams] = useState<ThongKeHSLTParams>({ pageNumber: 1, pageSize: 50, reFetch: true, maDinhDanhCha: user?.maDinhDanh,coThongKe : true })
    const { columns } = useColumnThongKeHoSoTrongNgay({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    console.log(thongKeHoSotrongNgay?.reduce((total, record) => total + parseFloat(record.tiepNhanTrongNgay) || 0, 0));

    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <ThongKeHoSoTrongNgaySearch onFinish={() => { }} setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={thongKeHoSotrongNgay}
                    pagination={{
                        total: countThongKeTrongNgays
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(ThongKeHoSoTrongNgayAction(params))}
                    summary={() => (
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0}></Table.Summary.Cell>
                            <Table.Summary.Cell index={1}><span style={{ fontWeight: '600', fontSize: '15px' }}>Tổng số</span></Table.Summary.Cell>
                            <Table.Summary.Cell index={2} colSpan={3} align="right">
                                <span style={{ fontWeight: '600', fontSize: '15px' }} >
                                    {getCurrencyThongKe(thongKeHoSotrongNgay?.reduce((total, record) => total + parseFloat(record.tiepNhanTrongNgay) || 0, 0) as any)}
                                </span>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={3} align="right">
                                <span style={{ fontWeight: '600', fontSize: '15px' }} >
                                    {getCurrencyThongKe(thongKeHoSotrongNgay?.reduce((total, record) => total + parseFloat(record.coKetQuaTrongNgay) || 0, 0) as any)}
                                </span>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={4} align="right">
                                <span style={{ fontWeight: '600', fontSize: '15px' }} >
                                    {getCurrencyThongKe(thongKeHoSotrongNgay?.reduce((total, record) => total + parseFloat(record.daTraCongDanTrongNgay) || 0, 0) as any)}
                                </span>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={5} align="right">
                                <span style={{ fontWeight: '600', fontSize: '15px' }} >
                                    {getCurrencyThongKe(thongKeHoSotrongNgay?.reduce((total, record) => total + parseFloat(record.thuPhiLePhiTrongNgay) || 0, 0) as any)}
                                </span>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={6} align="right">
                                <span style={{ fontWeight: '600', fontSize: '15px' }} >
                                    {getCurrencyThongKe(thongKeHoSotrongNgay?.reduce((total, record) => total + parseFloat(record.yeuCauBoSungTrongNgay) || 0, 0) as any)}
                                </span>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={7} align="right">
                                <span style={{ fontWeight: '600', fontSize: '15px' }} >
                                    {getCurrencyThongKe(thongKeHoSotrongNgay?.reduce((total, record) => total + parseFloat(record.yeuCauTraLaiXinRutTrongNgay) || 0, 0) as any)}
                                </span>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    )}
                />
                {
                    hoSoTheoBaoCaoTongHopContext.thongKeHoSoTrongNgayModalVisible ? (
                        <HoSoTheoThongKeTrongNgayWrapper />
                    ) : null
                }
                <XuatDanhSachHoSoTrongNgay
                    tuNgay={searchParams.tuNgay ? dayjs(searchParams.tuNgay).format('DD/MM/YYYY') : undefined}
                    denNgay={searchParams.denNgay ? dayjs(searchParams.denNgay).format('DD/MM/YYYY') : undefined}
                    data={thongKeHoSotrongNgay} />
            </AntdSpace>
        </>
    )
}
const ThongKeHoSoTrongNgayWrapper = () => (
    <BaoCaoTongHopProvider>
        <HoSoTheoBaoCaoTongHopProvider>
            <ThongKeHoSoTrongNgayTable />
        </HoSoTheoBaoCaoTongHopProvider>
    </BaoCaoTongHopProvider>
)
export default ThongKeHoSoTrongNgayWrapper