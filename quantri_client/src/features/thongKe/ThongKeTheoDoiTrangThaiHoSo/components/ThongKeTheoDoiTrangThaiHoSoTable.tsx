import { useEffect, useMemo, useState } from "react"
import { TableProps } from "antd"
import { TableRowSelection } from "antd/es/table/interface"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ISearchAction } from "@/features/action/models"
import { AntdSpace, AntdTable } from "@/lib/antd/components"
import { ActionSearch } from "@/features/action/components/ActionSearch"
import { ThongKeHSLTParams } from "@/features/hoso/services"
import { SearchThongKeHSLT, ThongKeTheoDoiTrangThaiHSAction } from "@/features/hoso/redux/action"
import { ThongKeTheoDoiTrangThaiHoSoSearch } from "./ThongKeTheoDoiTrangThaiHoSoSearch"
import { useThongKeTheoDoiTrangThaiHSColumn } from "../hooks/useThongKeTheoDoiTrangThaiHoSoColumn"
import { BaoCaoTongHopProvider, useBaoCaoTongHopContext } from "../../ThongKeTheoDonVi/context/BaoCaoTongHopContext"
import { HoSoTheoBaoCaoTongHopProvider, useHoSoTheoBaoCaoTongHopContext } from "@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext"
import HoSoThongKeTheoDoiTrangThaiWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/HoSoThongKeTheoDoiTrangThai"

export const ThongKeTheoDoiTrangThaiHoSo = () => {
    const dispatch = useAppDispatch()
    const { thongKeTheoDoiTrangThaiHS, count } = useAppSelector(state => state.hoso)
    const { data: user } = useAppSelector(state => state.user)
    const [searchParams, setSearchParams] = useState<ThongKeHSLTParams>({ pageNumber: 1, pageSize: 50, reFetch: true, maDinhDanhCha: user?.maDinhDanh })
    const [firstAccess, setFirstAccess] = useState<boolean>(true);
    const { columns } = useThongKeTheoDoiTrangThaiHSColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize }, searchParams)
    const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
    const thongKeHoSoContext = useBaoCaoTongHopContext();
    const onFinsh = async (value: ThongKeHSLTParams) => {
        setFirstAccess(false);
    };
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <ThongKeTheoDoiTrangThaiHoSoSearch onFinish={onFinsh} searchParams={searchParams} setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={thongKeTheoDoiTrangThaiHS}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => {
                        if (!firstAccess) dispatch(ThongKeTheoDoiTrangThaiHSAction(params));
                    }}
                />
            </AntdSpace>
            {hoSoTheoBaoCaoTongHopContext.thongKeTheoDoiTrangThaiHoSoModalVisible ? (
                <HoSoThongKeTheoDoiTrangThaiWrapper />
            ) : null}
        </>
    )
}
const ThongKeHSLTWrapper = () => (
    <BaoCaoTongHopProvider>
        <HoSoTheoBaoCaoTongHopProvider>
            <ThongKeTheoDoiTrangThaiHoSo />
        </HoSoTheoBaoCaoTongHopProvider>
    </BaoCaoTongHopProvider>
)
export default ThongKeHSLTWrapper