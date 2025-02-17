import { ID_SEPARATE } from "@/data"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useChonTepThanhPhanHoSoColumn } from "@/features/hoso/hooks/useChonTepThanhPhanHoSo"
import { ISearchThanhPhanHoSo, IThanhPhanHoSo } from "@/features/thanhphanhoso/models"
import { thanhPhanHoSoApi } from "@/features/thanhphanhoso/services"
import { AntdModal, AntdTable } from "@/lib/antd/components"
import { useUploadTable } from "@/lib/antd/components/upload/hooks/useUploadTable"
import { useEffect, useMemo, useState } from "react"

export const ChonTepThanhPhanHoSo = ({maHoSo, onSubmit, selectType} : {selectType?: 'checkbox' | 'radio';maHoSo: string; onSubmit: (value: string) => void}) => {
    const [thanhPhanHoSos, setThanhPhanHoSos] = useState<IThanhPhanHoSo[]>([])
    const {columns} = useChonTepThanhPhanHoSoColumn({dataSource: thanhPhanHoSos})
    const [count, setCount] = useState<number>()
    const [searchParams, setSearchParams] = useState<ISearchThanhPhanHoSo>({pageNumber: 1, pageSize: 50})
    const buttonActionContext = useButtonActionContext()
    const [selectedThanhPhanHoSos, setSelectedThanhPhanHoSos] =  useState<string[]>([])
    const onSearch = async (values: ISearchThanhPhanHoSo) => {
        if(maHoSo){
            const res = await thanhPhanHoSoApi.Search({hoSo: maHoSo})
            setThanhPhanHoSos(res.data.data)
            setCount(res.data.totalCount)
        }
    }

    const handlerCancel = () => {
        buttonActionContext.setChonTepTuThanhPhanHoSoVisible(false)
    }

    const onOk = () => {
        if(thanhPhanHoSos){
            const dinhKems = thanhPhanHoSos.filter(thanhPhanHoSo => selectedThanhPhanHoSos.includes(thanhPhanHoSo.id)).map(x => x.dinhKem).filter(x => x).join(ID_SEPARATE)
            onSubmit(dinhKems)
            handlerCancel()
        }
    }
    const rowSelection = useMemo(() =>({
        onChange: (selectedRowKeys: React.Key[]) => {
            setSelectedThanhPhanHoSos(selectedRowKeys.map(x => x as string))
        },
    }), [])
    



    return <AntdModal visible={true} title="CHỌN TỆP ĐÍNH KÈM" onOk={onOk} width={1400} handlerCancel={handlerCancel}>
        <AntdTable 
            columns={columns} 
            dataSource={thanhPhanHoSos}
            searchParams={searchParams}
            pagination={{
                total:count
            }}
            rowSelection={{
                type: selectType,
                ...rowSelection
            }}
            setSearchParams={setSearchParams}
            onSearch={async (values) => await onSearch(values)}
        />
    </AntdModal>
}