import { IHoSo } from "@/features/hoso/models"
import { ISearchThanhPhanThuTuc, IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models"
import { useThanhPhanThuTucColumn } from "@/features/hoso/hooks/useThanhPhanThuTucColumn"
import { AntdButton, AntdTable } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { PlusCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons"
import { FormInstance, Tooltip } from "antd"
import { useEffect, useState } from "react"
import { v4 as uuid } from 'uuid'
// import { DanhSachGiayToSoHoaModal } from "./DanhSachGiayToSoHoaModal"
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"
// import { GiayToSoHoaModal } from "./GiayToSoHoaModal"
import { TRANGTHAISOHOA, TRANGTHAISOHOA_VALUE } from '../../../data/formData'
import { IKetQuaThuTuc, ISearchKetQuaThuTuc } from "@/features/ketquathutuc/models"
import { IThanhPhanHoSo } from "@/features/thanhphanhoso/models"
import { useThanhPhanHoSos } from "./hooks/useThanhPhanHoSos"
import { RenderTitle } from "@/components/common"
import { IDanhMucGiayToChungThuc } from "@/features/danhmucgiaytochungthuc/models"
import { SearchDanhMucGiayToChungThuc } from "@/features/danhmucgiaytochungthuc/redux/action"
import { DanhMucGiayToChungThucApi } from "@/features/danhmucgiaytochungthuc/services"
interface HeaderCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
    id: string;
}
export type KetQuaThuTucChungThuc = Pick<IThanhPhanHoSo, "soTrang" | "soBanGiay" | "kyDienTuBanGiay" | "dinhKem" | "id" | "ten" | "maGiayTo" | "trangThaiDuyet">

export const ThanhPhanChungThucHoSo = ({ form, useKySoNEAC }: { useKySoNEAC?: boolean, form: FormInstance<IHoSo> }) => {
    const [searchParams, setSearchParams] = useState<ISearchKetQuaThuTuc>({ pageNumber: 1, pageSize: 100, laGiayToThongDung: true })
    const [dataSource, setDataSource] = useState<KetQuaThuTucChungThuc[]>([])
    const [danhMucGiayToChungThucs, setDanhMucGiayToChungThucs] = useState<IDanhMucGiayToChungThuc[]>()
    const { columns } = useThanhPhanHoSos({ dataSource, setDataSource, form, danhMucGiayToChungThucs, useKySoNEAC, pagination: { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize } })
    const dispatch = useAppDispatch()
    const { data: hoSoNhapData } = useAppSelector(state => state.hosonhap)


    useEffect(() => {
        form.setFieldValue("thanhPhanHoSos", dataSource) // có thể sẽ chậm
    }, [dataSource])

    useEffect(() => {
        (async () => {
            if (danhMucGiayToChungThucs === undefined) {
                const res = await DanhMucGiayToChungThucApi.Search({ pageNumber: 1, pageSize: 50, suDung: true, reFetch: true })
                setDanhMucGiayToChungThucs(res.data.data)
            }
        })()
    }, [danhMucGiayToChungThucs])

    useEffect(() => {
        if (hoSoNhapData && hoSoNhapData.thanhPhanHoSos) {
            const data = hoSoNhapData.thanhPhanHoSos.map((x): KetQuaThuTucChungThuc => ({
                ten: x.ten,
                maGiayTo: x.maGiayTo,
                dinhKem: x.dinhKem,
                id: x.id,
                kyDienTuBanGiay: x.kyDienTuBanGiay,
                soBanGiay: x.soBanGiay,
                soTrang: x.soTrang,
                
                // trangThaiDuyet: "Chưa ký"
            }))            
            setDataSource(data)
        }
        else if (danhMucGiayToChungThucs) {
            const data = danhMucGiayToChungThucs.map((x): KetQuaThuTucChungThuc => ({
                ten: "",
                maGiayTo: "",
                dinhKem: "",
                id: uuid(),
                kyDienTuBanGiay: false,
                soBanGiay: 1,
                soTrang: 1,
                // trangThaiDuyet: "Chưa ký"
            }))
            setDataSource(data.slice(0, 1))
        }
        return () => {
            setDataSource([])
        }
    }, [danhMucGiayToChungThucs, hoSoNhapData])

    const onAddRow = () => {
        const newRow: any = {
            id: uuid(),
            ten: "",
            dinhKem: "",
            soBanGiay: 1,
            soTrang: 1,
            kyDienTuBanGiay: false,
        }
        setDataSource([...dataSource, newRow])
    }

    return <>
        <RenderTitle title={"Thành phần hồ sơ chứng thực"} />
        <div style={{overflow:"auto"}}>
        <AntdTable
            columns={columns as any}
            dataSource={dataSource as any}
            footer={() => <AntdButton icon={<PlusCircleOutlined />} onClick={onAddRow}>Thêm giấy tờ</AntdButton>}
            pagination={false}
            searchParams={searchParams}
            components={{header: {
                cell: (props: HeaderCellProps ) => {
                    if((props.children as Array<string>)?.includes("Số bản giấy")){
                        return <th {...props}>{props.children} <Tooltip title="Nhập số bản giấy đăng ký nhận"><QuestionCircleOutlined /></Tooltip></th>
                    }
                    if((props.children as Array<string>)?.includes("Bản điện tử")){
                        return <th {...props}>{props.children} <Tooltip title="Chọn để đăng ký nhận bản điện tử"><QuestionCircleOutlined /></Tooltip></th>
                    }
                    return <th {...props}/>
                }
            }}}
            setSearchParams={setSearchParams}
            onSearch={() => { }}
        />
        </div>
    </>

}

