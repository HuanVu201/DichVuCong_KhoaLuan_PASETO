import { useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ButtonActionProvider, useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions"
import { ScreenType, screenType } from "@/features/hoso/data"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { AntdButton, AntdSpace, AntdTable } from "@/lib/antd/components"
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
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/ExportExcel/exportTableToExcel"
import { XuatDanhSachHoSoTheoBaoCaoTongHopModal } from "@/features/hoSoTheoBaoCaoTongHop/exportElements/XuatDanhSachHoSoTheoBaoCaoTongHop"

export const DangXuLyTable = ({ maScreen, extraSearchParams }: { maScreen: ScreenType; extraSearchParams?: ISearchHoSo }) => {
  const dispatch = useAppDispatch()
  const buttonActionContext = useButtonActionContext()
  const { datas: hoSos, count, loading } = useAppSelector(state => state.hoso)
  const { btnElememts } = useButtonActions({ maScreen: maScreen })
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({ pageNumber: 1, pageSize: 50, reFetch: true, byCurrentUser: true, maTrangThai: "4", hienThiTrangThaiThanhToan : false, ...extraSearchParams })
  const { publicModule } = useAppSelector(state => state.config)

  const items: HoSoTableActions[] = useMemo(
    () => [
      {
        icon: <EyeOutlined title="Xem chi tiết" onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)} />
      },
      // {
      //   icon: <PrinterOutlined title="Xuất phiếu tiếp nhận" onClick={() => buttonActionContext.setInPhieuTiepNhanHoSoModalVisible(true)} />
      // },
      // {
      //   icon: <FileTextOutlined title="Xuất phiếu kiểm soát" onClick={() => buttonActionContext.setInPhieuKiemSoatModalVisible(true)} />
      // },
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
    const hanXuLyCaNhan = record.ngayHenTra ? dayjs(record.ngayHenTra) : null;
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
    <LazyActions setSearchParams={setSearchParams} >
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        {btnElememts}
        <SearchHoSoComp btnComfirmLoading={loading} setSearchParams={setSearchParams} extraElement={(form) => (<>
          <DiaDanhPhatSinhHoSoSearchElement form={form} />
        </>)} defaultVisible={false} showAdvanceSearchBtn extraButtons={maScreen === "dang-xu-ly-phi-dia-gioi" ? <AntdButton
              type="primary"
              onClick={() => {
                downloadPhieuExcel("Danh sách hồ sơ", "danhSachHoSoTable");
              }}
            >
               In danh sách
            </AntdButton> : undefined}/>
        <AntdTable
          bordered
          loading={loading}
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
      {hoSos ? <XuatDanhSachHoSoTheoBaoCaoTongHopModal data={hoSos} /> : null}
    </LazyActions>

  )
}
const HoSoTableWrapper = () => (<DangXuLyProvider>
  <ButtonActionProvider>
    <DangXuLyTable maScreen="dang-xu-ly-ho-so" />
  </ButtonActionProvider>
</DangXuLyProvider>)
export default HoSoTableWrapper