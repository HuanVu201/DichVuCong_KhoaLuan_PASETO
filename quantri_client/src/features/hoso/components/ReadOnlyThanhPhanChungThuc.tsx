import { RenderTitle } from '@/components/common'
import {
  ISearchThanhPhanHoSo,
  IThanhPhanHoSo,
} from '@/features/thanhphanhoso/models'
import { AntdModal, AntdTable } from '@/lib/antd/components'
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks'
import { Form } from 'antd'
import { useEffect, useState } from 'react'
import { FormInstance } from 'antd/lib'
import { useReadOnlyThanhPhanChungThuc } from '@/features/hoso/hooks/useReadOnlyThanhPhanChungThuc'
import { thanhPhanHoSoApi } from '@/features/thanhphanhoso/services'

export const ReadOnlyThanhPhanChungThuc = ({
  form,
}: {
  form: FormInstance<any>
}) => {
  const [searchParams, setSearchParams] = useState<ISearchThanhPhanHoSo>({pageNumber:1, pageSize: 10})
  const { data: hoSo } = useAppSelector((state) => state.hoso)
  const [dataSource, setDataSource] = useState<IThanhPhanHoSo[]>([])
  const [thanhPhanHoSo, setThanhPhanHoSo] = useState<IThanhPhanHoSo[]>([])
  const [count, setCount] = useState<number>()
  useEffect(() => {
    if (thanhPhanHoSo?.length) {
      setDataSource(
        thanhPhanHoSo.map((x) => ({ ...x, trangThaiDuyet: 'Chưa ký' }))
      )
    }
  }, [thanhPhanHoSo])

  useEffect(() => {
    // if (hoSo) {
    //   ;(async () => {
    //     const res = await thanhPhanHoSoApi.SearchThanhPhanChungThuc({
    //       hoSo: hoSo.maHoSo,
    //     })
    //     setThanhPhanHoSo(res.data.data)
    //     setCount(res.data.totalCount)
    //   })()
    // }
    if(hoSo){
      setSearchParams((curr) => ({...curr, hoSo : hoSo?.maHoSo}))
    }
  }, [hoSo])

  const onSearch = async (params: ISearchThanhPhanHoSo) => {
      const res = await thanhPhanHoSoApi.SearchThanhPhanChungThuc({
        ...params,
      })
      setThanhPhanHoSo(res.data.data)
      setCount(res.data.totalCount)
  }

  useEffect(() => {
    form.setFieldValue('thanhPhanHoSos', dataSource) // có thể sẽ chậm
  }, [dataSource])

  const { columns } = useReadOnlyThanhPhanChungThuc({
    dataSource,
    setDataSource,
    form,
    pagination: {
      pageNumber: searchParams.pageNumber,
      pageSize: searchParams.pageSize,
    },
  })

  return (
    <div style={{ width: '100%' }}>
      <RenderTitle title="Thành phần chứng thực" />
      {searchParams.hoSo ? <AntdTable
        columns={columns}
        dataSource={dataSource}
        pagination={{
          total: count,
        }}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        onSearch={onSearch}
      />: null}
    </div>
  )
} 