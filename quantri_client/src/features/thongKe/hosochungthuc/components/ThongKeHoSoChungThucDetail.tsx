import { AntdModal, AntdSpace, AntdTable } from "@/lib/antd/components"
import { useThongKeHoSoChungThucContext } from "../contexts/ThongKeHSCTContext"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useState } from "react"
import { StatisticChiTietHoSoChungThuc } from "../redux/action"
import { useColumnChiTiet } from "../column.tsx/useColumnChiTiet"
import { ISearchThongKeHoSoChungThuc } from "@/features/sochungthuc/models"
import { Table } from "antd"

export const ThongKeHoSoChungThucDetail = ({ searchParamTable }: { searchParamTable: ISearchThongKeHoSoChungThuc }) => {
    const dispatch = useAppDispatch()

    const thongKeHoSoChungThucContext = useThongKeHoSoChungThucContext()
    const { datasChiTietStatisticHSCT, loading, count } = useAppSelector(state => state.hosochungthuc)
    const [searchParams, setSearchParams] = useState<ISearchThongKeHoSoChungThuc>({ pageNumber: 1, pageSize: 100 })

    const handleCancel = () => {
        thongKeHoSoChungThucContext.setThongKeHoSoChungThucModalVisible(false)
        thongKeHoSoChungThucContext.setMaThongKeHoSoChungThuc(undefined)
    };
    const { columns } = useColumnChiTiet({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })

    useEffect(() => {
        if (thongKeHoSoChungThucContext.laHoSoDienTu)
            dispatch(StatisticChiTietHoSoChungThuc({ donViId: thongKeHoSoChungThucContext.maThongKeHoSoChungThuc, kySoDienTu: true, pageSize: 50, tuNgay: searchParamTable.tuNgay, denNgay: searchParamTable.denNgay }))
        else
            dispatch(StatisticChiTietHoSoChungThuc({ donViId: thongKeHoSoChungThucContext.maThongKeHoSoChungThuc, tuNgay: searchParamTable.tuNgay, denNgay: searchParamTable.denNgay }))
    }, [thongKeHoSoChungThucContext.maThongKeHoSoChungThuc])
    return (
        <AntdModal fullsize title={thongKeHoSoChungThucContext.laHoSoDienTu ? "Danh Sách hồ sơ chứng thực bản điện tử" : "Danh sách hồ sơ chứng thực bản giấy"} visible={true} handlerCancel={handleCancel} footer={null}>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <Table
                    bordered
                    columns={columns as any}
                    loading={loading}
                    dataSource={datasChiTietStatisticHSCT}
                    pagination={{
                        total: count,
                    }}
                // searchParams={searchParams}
                // setSearchParams={setSearchParams}
                // onSearch={(params) => dispatch(StatisticChiTietHoSoChungThuc(params))}
                />
            </AntdSpace>
        </AntdModal>
    )
}