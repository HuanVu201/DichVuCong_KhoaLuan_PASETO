import { ISearchGiayToSoHoa } from "@/features/giaytosohoa/models"
import { SearchGiayToSoHoa } from "@/features/giaytosohoa/redux/action"
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"
import { useGiayToSoHoaColumn } from "@/features/hoso/hooks/useGiayToSoHoaColumn"
import { AntdModal, AntdTable } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useMemo, useState } from "react"
import { ID_SEPARATE } from "@/data"
import { form } from "@formio/react"
import { FormInstance } from "antd"
import { IHoSo } from "@/features/hoso/models"

export const DanhSachGiayToSoHoaModal = ({form}: {form: FormInstance<IHoSo>}) => {
    const tiepNhanHoSoContext = useTiepNhanHoSoContext()
    const {datas: giayToSoHoas, count} = useAppSelector(state => state.giaytosohoa)
    const [selectedGiayToSoHoas, setSelectedGiayToSoHoas] = useState<string[]>([])
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useState<ISearchGiayToSoHoa>({ pageNumber: 1, pageSize: 10, reFetch: true, maDinhDanh: form.getFieldValue("soGiayToChuHoSo")})
    const columns = useGiayToSoHoaColumn()
    const handleCancel = () => {
        tiepNhanHoSoContext.setDanhSachGiayToSoHoaModalVisible(false)
        tiepNhanHoSoContext.setKhoSoHoaData(undefined)
    }
    const onOk = () => {
        if(giayToSoHoas){
            const dinhKems = giayToSoHoas.filter(giayTo => selectedGiayToSoHoas.includes(giayTo.id)).map(x => x.dinhKem).join(ID_SEPARATE)
            tiepNhanHoSoContext.khoSoHoaData?.onOk(dinhKems, selectedGiayToSoHoas.join(ID_SEPARATE))
            handleCancel()
        }
    }
    const rowSelection = useMemo(() =>({
        onChange: (selectedRowKeys: React.Key[]) => {
            setSelectedGiayToSoHoas(selectedRowKeys.map(x => x as string))
        },
    }), [])
    return <AntdModal title="Chọn giấy tờ số hóa" visible={true} handlerCancel={handleCancel} onOk={onOk} width={1500}>
        {searchParams.maDinhDanh ?  <AntdTable
            columns={columns}
            dataSource={giayToSoHoas}
            pagination={{
                total: count
            }}
            rowSelection={{
                ...rowSelection,
            }}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            onSearch={(params) => dispatch(SearchGiayToSoHoa(params))}
        />: null}
    </AntdModal>
}