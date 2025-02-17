import { ISearchHoSoBoSung } from '@/features/bosunghoso/models'
import { SearchHoSoBoSung } from '@/features/bosunghoso/redux/action'
import { useBoSungHoSoColumn } from '@/features/hoso/hooks/useBoSungHoSoColumn'
import { AntdTable } from '@/lib/antd/components'
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks'
import React, { useEffect, useState } from 'react'

function BoSungHoSoTab() {
  const [searchParams, setSearchParams] = useState<ISearchHoSoBoSung>({ pageNumber: 1, pageSize: 10, reFetch: true })
  const dispatch = useAppDispatch()
  const { data: hoSo } = useAppSelector(state => state.hoso)
  const { datas: hoSoBoSungs } = useAppSelector(state => state.bosunghoso)
  const columns = useBoSungHoSoColumn()
  useEffect(() => {
      if (hoSo != undefined) {
          setSearchParams((curr) => ({ ...curr, maHoSo: hoSo.maHoSo }))
      }
  }, [hoSo])
  return <>
      {searchParams.maHoSo ? <AntdTable
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={(params) => dispatch(SearchHoSoBoSung(params))}
          columns={columns}
          dataSource={hoSoBoSungs} /> : null}
  </>
}

export default BoSungHoSoTab