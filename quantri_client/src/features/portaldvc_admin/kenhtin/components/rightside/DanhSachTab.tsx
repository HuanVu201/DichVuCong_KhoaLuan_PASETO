import { AntdTab, IAntdTabsProps } from '@/lib/antd/components'
import { ZoomComponent } from '@/components/common'
import { KenhTinChiTiet } from '../modals/KenhTinChiTiet'
import { IKenhTin } from '../../models'
import TinBaiTable from '@/features/portaldvc_admin/tinbai/components/TinBaiTable'
import { useKenhTinContext } from '../../contexts/KenhTinContext'
import { useEffect } from 'react'
import { GetKenhTin } from '../../redux/action'
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks'
import TinBaiWrapper from '@/pages/portaldvc_admin/TinBai'

interface kenhTinProps {
  kenhtin: IKenhTin | undefined
}
export const DanhSachTab = () => {
  const dispatch = useAppDispatch()
  const kenhTinContext = useKenhTinContext()
  const { data: KenhTin } = useAppSelector((state: { kenhtin: any }) => state.kenhtin)
  useEffect(() => {
    if (kenhTinContext.maKenhTin)
      dispatch(GetKenhTin(kenhTinContext.maKenhTin))

  }, [kenhTinContext.maKenhTin])
  return <ZoomComponent onRefresh={() => { }}>
    <AntdTab>
      <AntdTab.TabPane tab='Thông tin kênh tin' key='2'>
        <KenhTinChiTiet></KenhTinChiTiet>
      </AntdTab.TabPane>
      {KenhTin?.kieuNoiDung?.tenNoiDung == 'Danh sách tin bài' ?
        <AntdTab.TabPane tab='Danh sách tin bài' key='1'>
          <TinBaiWrapper ></TinBaiWrapper>
        </AntdTab.TabPane> : <></>
      }
    </AntdTab>

  </ZoomComponent>
}