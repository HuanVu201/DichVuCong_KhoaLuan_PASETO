import { IHoSo } from '@/features/hoso/models'
import { AntdTable } from '@/lib/antd/components'
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks'
import { FormInstance } from 'antd'
import { useEffect, useState } from 'react'
import { TRANGTHAISOHOA, TRANGTHAISOHOA_VALUE } from '@/features/hoso/data/formData'
import { useReadOnlyThanhPhanThuTucColumn } from '@/features/hoso/hooks/useReadOnlyThanhPhanThuTucColumn'
import { IThanhPhanThuTuc } from '@/features/thanhphanthutuc/models'
import {
    ISearchThanhPhanHoSo,
    IThanhPhanHoSo,
} from '@/features/thanhphanhoso/models'
import { IThanhPhanHoSoWithSoHoa } from '@/features/hoso/components/actions/suaHoSo/TepDinhKemHoSo'
import { useReadOnlyThanhPhanChungThuc } from '@/features/hoso/hooks/useReadOnlyThanhPhanChungThuc'
import { SearchThanhPhanHoSo } from '@/features/thanhphanhoso/redux/action'
import { useReadOnlyThanhPhanThuTucPortalColumn } from './useReadOnlyThanhPhanThuTucPortalColumn'

export interface IThanhPhanThuTucWithSoHoa extends IThanhPhanThuTuc {
    trangThaiSoHoa: keyof typeof TRANGTHAISOHOA_VALUE
    maGiayTo?: string
    fileSoHoa?: string;
    mauDinhKem?: string;
}

export const ReadOnLyTepDinhKemPortal = ({ form, addKhoTaiLieuCaNhanVisible = false, maLinhVuc = '' }: { form: FormInstance<IHoSo>, addKhoTaiLieuCaNhanVisible: boolean, maLinhVuc?: string }) => {
    const dispatch = useAppDispatch()
    const { datas: thanhPhanHoSos, count } = useAppSelector(
        (state) => state.thanhphanhoso
    )
    const { data: hoSo } = useAppSelector((state) => state.hoso)
    const [searchParams, setSearchParams] = useState<ISearchThanhPhanHoSo>({
        pageNumber: 1,
        pageSize: 10,
        reFetch: true,
    })
    const [dataSource, setDataSource] = useState<IThanhPhanHoSoWithSoHoa[]>([])
    const columns = useReadOnlyThanhPhanThuTucPortalColumn({ dataSource, setDataSource, addKhoTaiLieuCaNhanVisible: addKhoTaiLieuCaNhanVisible, maLinhVuc: maLinhVuc })

    useEffect(() => {
        if (hoSo) {
            setSearchParams((curr) => ({ ...curr, hoSo: hoSo.maHoSo }))
        }
    }, [hoSo])

    useEffect(() => {
        form.setFieldValue('thanhPhanHoSos', dataSource) // có thể sẽ chậm
    }, [dataSource])

    useEffect(() => {
        if (thanhPhanHoSos) {
            setDataSource(
                thanhPhanHoSos.map((x) => ({
                    ...x,
                    trangThaiSoHoa: TRANGTHAISOHOA['Chưa số hóa'],
                }))
            )
        }
        return () => {
            setDataSource([])
        }
    }, [thanhPhanHoSos])
    return (
        <>
            {searchParams.hoSo ? <AntdTable
                columns={columns as any}
                dataSource={dataSource}
                pagination={{
                    total: count
                }}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                onSearch={(params) => dispatch(SearchThanhPhanHoSo(params))}
            /> : null}
        </>
    )
}
