import { useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ButtonActionProvider, useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions"
import { ScreenType, screenType } from "@/features/hoso/data"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { AntdSpace, AntdTable } from "@/lib/antd/components"
import { VpubDangXuLySearch } from "./VpubDangXuLySearch"
import { SearchHoSo, SearchNguoiDangXuLy } from "@/features/hoso/redux/action"
import { MenuProps, Spin } from "antd"
import { DangXuLyProvider, useDangXuLyContext } from "../contexts/DangXuLyContext"
import { HoSoTableActions, useHoSoColumn } from "@/features/hoso/hooks/useHoSoColumn"
import { LazyActions } from "@/features/hoso/components/actions/LazyActions"
import { EyeOutlined, FileTextOutlined, PrinterOutlined } from "@ant-design/icons"
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp"
import { useHoSoDangXuLyColumn } from "@/features/hoso/hooks/useHoSoWithHanXuLy"
import { DiaDanhPhatSinhHoSoSearchElement } from "@/features/hoso/components/DiaDanhPhatSinhHoSoSearchElement"
import dayjs from 'dayjs'
import './DangXuLy.scss'
import  '../../../../../features/hoso/scss/SearchHoSoComp.scss'

export const VpUbDangXuLyTable = ({ maScreen, extraSearchParams }: { maScreen: ScreenType; extraSearchParams?: ISearchHoSo }) => {
  const dispatch = useAppDispatch()
  const buttonActionContext = useButtonActionContext()
  const { datas: hoSos, count, loading } = useAppSelector(state => state.hoso)
  const { btnElememts } = useButtonActions({ maScreen: maScreen })
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({
    ...extraSearchParams,
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
    byCurrentUser: true,
    maTrangThai: "4",
    orderBy: ['LastModifiedOn DESC']
  })
  const { publicModule } = useAppSelector(state => state.config)

  const items: HoSoTableActions[] = useMemo(
    () => [
      {
        icon: <EyeOutlined title="Xem chi tiết" onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)} />
      },
    ],
    []
  );
  const { columns } = useHoSoDangXuLyColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize }, items)
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      buttonActionContext.setSelectedHoSos(selectedRowKeys);
    },
    selectedRowKeys: buttonActionContext.selectedHoSos,
  }
  const [ngayQuaHanXuLyHoSo] = useMemo(() => {
    return [publicModule?.find(x => x.code == 'ngay-qua-han-xu-ly-ho-so')]
  }, [publicModule])



  const rowClassName = (record: IHoSo) => {
    const ngayHienTai = dayjs(Date.now()).startOf('day');
    const hanXuLyCaNhan = record.ngayHenTraCaNhan ? dayjs(record.ngayHenTraCaNhan) : null;
    const isAfterNow = ngayHienTai && ngayHienTai.isAfter(hanXuLyCaNhan);
    const twoDaysBefore = hanXuLyCaNhan && hanXuLyCaNhan.subtract(parseInt(ngayQuaHanXuLyHoSo?.content as any), 'day');
    const isBeforeTwoDays = hanXuLyCaNhan && hanXuLyCaNhan.isBefore(twoDaysBefore);

    if (isAfterNow) {

      return 'custom-row-style-qua-han custom-typography-qua-han';
    }
    else if (isBeforeTwoDays || (hanXuLyCaNhan && hanXuLyCaNhan.isSame(ngayHienTai, 'day'))) {

      return 'custom-row-style-toi-han';
    }

  };

  return (
    <LazyActions setSearchParams={setSearchParams}>
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        {btnElememts}
        <VpubDangXuLySearch setSearchParams={setSearchParams} extraElement={(form) => (<>
          <DiaDanhPhatSinhHoSoSearchElement form={form} />
        </>)} defaultVisible={false} />
        <AntdTable
          loading={loading}
          bordered
          rowClassName={rowClassName as any}
          columns={columns}
          dataSource={hoSos}
          pagination={{
            total: count
          }}
          rowSelection={rowSelection}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={(params) => dispatch(SearchNguoiDangXuLy(params))}
        />
      </AntdSpace>
    </LazyActions>

  )
}
const HoSoTableWrapper = () => (<DangXuLyProvider>
  <ButtonActionProvider>
    <VpUbDangXuLyTable maScreen="vpub-dang-xu-ly-ho-so" />
  </ButtonActionProvider>
</DangXuLyProvider>)
export default HoSoTableWrapper