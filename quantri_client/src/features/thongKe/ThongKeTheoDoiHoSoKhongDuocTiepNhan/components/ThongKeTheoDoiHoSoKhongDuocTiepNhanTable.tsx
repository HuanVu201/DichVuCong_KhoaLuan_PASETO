import { useEffect, useMemo, useState } from "react"
import { Table, TableProps } from "antd"
import { TableRowSelection } from "antd/es/table/interface"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ISearchAction } from "@/features/action/models"
import { AntdSpace, AntdTable } from "@/lib/antd/components"
import { ActionSearch } from "@/features/action/components/ActionSearch"
import { ThongKeHSLTParams } from "@/features/hoso/services"
import { SearchThongKeHSLT, TheoDoiHoSoKhongDuocTiepNhanAction, ThongKeHoSoTrongNgayAction } from "@/features/hoso/redux/action"
import { BaoCaoTongHopProvider, useBaoCaoTongHopContext } from "../../ThongKeTheoDonVi/context/BaoCaoTongHopContext"
import { HoSoTheoBaoCaoTongHopProvider, useHoSoTheoBaoCaoTongHopContext } from "@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext"
import HoSoTheoBaoCaoLienThongWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoThongKeLienThong"
import { XuatDanhSachHoSoTheoBaoCaoTongHopModal } from "@/features/hoSoTheoBaoCaoTongHop/exportElements/XuatDanhSachHoSoTheoBaoCaoTongHop"
import { XuatDanhSachHoSoLienThong } from "@/features/hoSoTheoBaoCaoTongHop/exportElements/XuatDanhSachThongKeHSLT"
import dayjs from 'dayjs'
import { useColumnThongKeHSLT } from "../../thongKeHoSoLienThong/hooks/useColumnThongKeHSLT"
import HoSoTheoThongKeTrongNgayWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoThongKeTrongNgay"
import { XuatDanhSachHoSoTrongNgay } from "@/features/hoSoTheoBaoCaoTongHop/exportElements/XuatDanhSachThongKeHoSoTrongNgay"
import { useColumnThongKeHoSoTrongNgay } from "../../ThongKeHoSoTrongNgay/hooks/useThongKeHoSoTrongNgayColumn"
import { ThongKeTheoDoiHoSoKhongDuocTiepNhanSearch } from "./ThongKeTheoDoiHoSoKhongDuocTiepNhanSearch"
import { useTheoDoiHoSoKhongDuocTiepNhanColumn } from "../hooks/useTheoDoiHoSoKhongDuocTiepNhanColumn"
import HoSoKhongDuocTiepNhanWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoKhongDuocTiepNhan"

export const ThongKeHoSoTrongNgayTable = () => {
    const dispatch = useAppDispatch()
    const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
    const thongKeHoSoContext = useBaoCaoTongHopContext();
    const { theoDoiHoSoKhongDuocTiepNhan,countHoSoKhongDuocTiepNhan } = useAppSelector(state => state.hoso)
    const { data: user } = useAppSelector(state => state.user)
    const [searchParams, setSearchParams] = useState<ThongKeHSLTParams>({ pageNumber: 1, pageSize: 50, reFetch: true, maDinhDanhCha: user?.maDinhDanh })
    const { columns } = useTheoDoiHoSoKhongDuocTiepNhanColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize },searchParams)

    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <ThongKeTheoDoiHoSoKhongDuocTiepNhanSearch onFinish={() => {}} setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={theoDoiHoSoKhongDuocTiepNhan}
                    pagination={{
                        total: countHoSoKhongDuocTiepNhan
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(TheoDoiHoSoKhongDuocTiepNhanAction(params))}
                />
                {
                    hoSoTheoBaoCaoTongHopContext.theoDoiHoSoKhongDuocTiepNhanModalVisible ? (
                        <HoSoKhongDuocTiepNhanWrapper />
                    ) : null
                }
                {/* <XuatDanhSachHoSoTrongNgay
                    tuNgay={searchParams.tuNgay ? dayjs(searchParams.tuNgay).format('DD/MM/YYYY') : undefined}
                    denNgay={searchParams.denNgay ? dayjs(searchParams.denNgay).format('DD/MM/YYYY') : undefined}
                    data={thongKeHoSotrongNgay} /> */}
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