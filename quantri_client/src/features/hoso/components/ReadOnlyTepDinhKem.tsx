import { IHoSo } from '@/features/hoso/models'
import { AntdTable } from '@/lib/antd/components'
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks'
import { FormInstance } from 'antd'
import { useEffect, useState } from 'react'
import { TRANGTHAISOHOA, TRANGTHAISOHOA_VALUE } from '../data/formData'
import { useReadOnlyThanhPhanThuTucColumn } from '@/features/hoso/hooks/useReadOnlyThanhPhanThuTucColumn'
import { IThanhPhanThuTuc } from '@/features/thanhphanthutuc/models'
import {
  ISearchThanhPhanHoSo,
  IThanhPhanHoSo,
} from '@/features/thanhphanhoso/models'
import { IThanhPhanHoSoWithSoHoa } from './actions/suaHoSo/TepDinhKemHoSo'
import { useReadOnlyThanhPhanChungThuc } from '../hooks/useReadOnlyThanhPhanChungThuc'
import { SearchThanhPhanHoSo } from '@/features/thanhphanhoso/redux/action'

export interface IThanhPhanThuTucWithSoHoa extends IThanhPhanThuTuc {
  trangThaiSoHoa: keyof typeof TRANGTHAISOHOA_VALUE
  maGiayTo?: string
  fileSoHoa?: string;
  mauDinhKem?:string;
}

export const ReadOnLyTepDinhKem = ({ form }: { form: FormInstance<IHoSo> }) => {
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
  const columns = useReadOnlyThanhPhanThuTucColumn({ dataSource, setDataSource })

  useEffect(() => {
    if (hoSo) {
      setSearchParams((curr) => ({...curr, hoSo : hoSo.maHoSo}))
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
    {searchParams.hoSo ?  <AntdTable
        columns={columns as any}
        dataSource={dataSource}
        pagination={{
          total: count
        }}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        onSearch={(params) => dispatch(SearchThanhPhanHoSo(params))}
      />: null}
    </>
  )
}
