import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ButtonActionProvider, useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions"
import { ScreenType, screenType } from "@/features/hoso/data"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { AntdSelect, AntdSpace, AntdTable } from "@/lib/antd/components"
import { SearchHoSo, SearchHoSoLienThong, SearchNguoiDangXuLy } from "@/features/hoso/redux/action"
import { Col, Form, MenuProps, Spin } from "antd"
import { HoSoTableActions, useHoSoColumn } from "@/features/hoso/hooks/useHoSoColumn"
import { LazyActions } from "@/features/hoso/components/actions/LazyActions"
import { EyeOutlined, FileTextOutlined, LoadingOutlined, PrinterOutlined } from "@ant-design/icons"
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp"
import { useHoSoDangXuLyColumn } from "@/features/hoso/hooks/useHoSoWithHanXuLy"
import { DiaDanhPhatSinhHoSoSearchElement } from "@/features/hoso/components/DiaDanhPhatSinhHoSoSearchElement"
import dayjs from 'dayjs'
import '../../dangxuly/components/DangXuLy.scss'
import { DangXuLyLienThongProvider } from "../contexts/DangXuLyLienThongContext"
import { useHoSoDangXuLyLienThong } from "@/features/hoso/hooks/useHoSoDangXuLyLienThongColumn"
import { resetDatas } from "@/features/hoso/redux/slice"
import { ICoCauToChuc } from "@/features/cocautochuc/models"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { filterOptions } from "@/utils"
import { toast } from "react-toastify"

export const DangXuLyLienThongTable = ({ maScreen, extraSearchParams }: { maScreen: ScreenType; extraSearchParams?: ISearchHoSo }) => {
  const dispatch = useAppDispatch()
  const buttonActionContext = useButtonActionContext()
  const { datas: hoSos, count, loading } = useAppSelector(state => state.hoso)
  const { btnElememts } = useButtonActions({ maScreen: maScreen })
  const [searchParams, setSearchParams] = useState<ISearchHoSo>({ pageNumber: 1,viewHoSo : 'dang-xu-ly-lien-thong', pageSize: 50, reFetch: true, byCurrentUser: true, maTrangThai: "4", hienThiTrangThaiThanhToan : false, ...extraSearchParams })
  const { publicModule } = useAppSelector(state => state.config)
  const [donVis, setDonVis] = useState<ICoCauToChuc[]>([])
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false)

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
  const { columns } = useHoSoDangXuLyLienThong({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize }, items)
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
  const { data: user } = useAppSelector(state => state.user)

  useEffect(() => {
    return () => {
      dispatch(resetDatas())
    }
  }, [])


  return (
    <LazyActions setSearchParams={setSearchParams}>
      <Spin spinning={loading || loadingSearch}
        indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
      >
        <AntdSpace direction="vertical" style={{ width: "100%" }}>
          {btnElememts}
          <SearchHoSoComp btnComfirmLoading={loading} setSearchParams={setSearchParams} extraElement={(form) => (<>
            <Col span={24}>
              <Form.Item label="Đơn vị" name="groupCode">
                <AntdSelect
                  generateOptions={{ model: donVis, label: "groupName", value: "groupCode" }}
                  showSearch
                  allowClear
                  filterOption={filterOptions}
                  onClick={() => {
                    if (donVis?.length == 0) {
                      (async () => {
                        setLoadingSearch(true)
                        const res = await dispatch(SearchCoCauToChuc({ pageSize: 1500,cataLog : 'so-ban-nganh'})).unwrap()

                        if (res) {
                          setDonVis(res.data)
                        } else {
                          toast.error("Lỗi lấy thông tin cơ cấu tổ chức!")
                        }
                        setLoadingSearch(false)
                      })()
                    }
                  }}
                />
              </Form.Item>
            </Col>
            <DiaDanhPhatSinhHoSoSearchElement form={form} />
          </>)} defaultVisible={false} showAdvanceSearchBtn />
          <AntdTable
            // loading={loading}
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
      </Spin>

    </LazyActions>
  )
}
const HoSoTableWrapper = () => (<DangXuLyLienThongProvider>
  <ButtonActionProvider>
    <DangXuLyLienThongTable maScreen="dang-xu-ly-ho-so" />
  </ButtonActionProvider>
</DangXuLyLienThongProvider>)
export default HoSoTableWrapper